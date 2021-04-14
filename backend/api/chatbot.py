from flask_restplus import Namespace, Resource, fields
from flask import Flask, request, Response
from flask_restful import Resource
import secrets, random
import os
from base64 import b64encode
from flask_cors import CORS
from flask_restful import Api
from io import BytesIO
from . import dbaccess as db

class Chatbot(Resource):
    def post(self):
        data = request.json
        product1 = data['product1']
        product2 = data['product2']
        
        if product1['category'] == 'CPU':
            if product2['category'] == 'Motherboard':
                # Compare CPU socket in both motherboard and CPU
                if product1['specs']['socket'] == product2['specs']['cpu_socket']:
                    return True
                else:
                    return False
                
            elif product2['category'] == 'CPU_Cooling':
                # Compare socket for CPU_Cooling and CPU
                if product1['specs']['socket'] == product2['specs']['socket']:
                    return True
                else:
                    return False
            else:
                # If the products are not of the categories listed above
                # they have no direct interaction and are therefore compatible
                return True
        elif product1['category'] == 'Motherboard':
            if product2['category'] == 'CPU':
                # Compare Motherboard socket to CPU socket/interface
                if product1['specs']['cpu_socket'] == product2['specs']['socket']:
                    return True
                else:
                    return False
            elif product2['category'] == 'Graphics_Cards':
                # Compare pcie slot types
                if product1['specs']['pcie_type'] >= product2['specs']['pcie_type']:
                    return True
                else:
                    return False
            else:
                return True
        elif product1['category'] == 'Graphics_Cards':
            if product2['category'] == 'Motherboards':
                # Compare pcie slot types
                if product1['specs']['pcie_type'] >= product2['specs']['pcie_type']:
                    return True
                else:
                    return False
            else:
                return True
        elif product1['category'] == 'CPU_Cooling':
            if product2['category'] == 'CPU':
                # Compare interfaces
                if product1['specs']['socket'] == product2['specs']['socket']:
                    return True
                else:
                    return False
            else:
                return True
        else:
            # The other components have no direct interaction/no compatibility requirements
            # and are therefore compastible with each other 
            return True
