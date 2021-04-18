from flask import Flask, request, Response
from flask_restful import Resource
from flask_cors import CORS
from flask_restful import Api
from . import dbaccess as db
from datetime import datetime
from .helpers import *
from datetime import date
from datetime import timedelta

class Stats(Resource):

    # Getting sale statistics
    # Url formats: 
    # For a single product: `stats?productId=${productId}`
    # For a specific sale: `stats?saleId=${saleId}`
    def get(self):

        productId = request.args.get('productId')
        saleId = request.args.get('saleId')

        if productId is not None:

            print('Getting product stats attempt received')
            productId = int(productId)
            productStats = {}

            # Beginning and end date to start getting all sales from
            startDate = date(2020, 1, 1)
            endDate = date.today()
            curDate = startDate

            while curDate <= endDate:
                dateString = curDate.strftime('%Y-%m-%d')
                productStats[dateString] = [0, '', '']
                curDate += timedelta(days=1)
            
            sales = db.getAllSales()
            for sale in sales:
                saleInfo = db.getSale(sale['id'])
                for product in saleInfo['products']:
                    if product['productid'] == productId:
                        start = sale['startdate']
                        end = sale['enddate']
                        cur = start
                        while cur <= end:
                            dateString = cur.strftime('%Y-%m-%d')
                            if dateString in productStats:
                                productStats[dateString] = [0, sale['name'], product['salepercent']]

            orders = db.getAllOrders()       
            for order in orders:
                for product in order['products']:
                    if product['productid'] == productId:

                        orderDate = order['date'].strftime('%Y-%m-%d')
                        if orderDate in productStats and order['date'] >= startDate:
                            productStats[orderDate][0] += product['quantity']
                        else:
                            productStats[orderDate][0] = product['quantity']
            
            stats = []

            for key in productStats:
                entry = productStats[key]
                stats.append({'date': key, 'sold': entry[0], 'saleName': entry[1], 'salePercent': entry[2]})

            return {'stats': stats}

        else:
            print('Getting sale stats attempt received')
            saleId = int(saleId)
            sale = db.getSale(saleId)

            saleStats = {}

            startDate = sale['startdate']
            endDate = sale['enddate']
            curDate = startDate
            while curDate <= endDate:
                saleStats[curDate.strftime('%Y-%m-%d')] = 0

            saleProducts = []
            for product in sale['products']:
                saleProducts.append(product['productid'])

            orders = db.getAllOrders()
            for order in orders:
                if order['date'] >= startDate and order['date'] <= endDate:
                    for product in order['products']:
                        if product['productid'] in saleProducts:
                            saleStats[order['date'].strftime('%Y-%m-%d')] += product['quantity']
            
            stats = []
            for key in saleStats:
                stats.append({'date': key, 'sold': saleStats[key]})
            
            return {'stats': stats}