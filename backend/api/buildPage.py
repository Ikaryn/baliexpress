from flask_restplus import Namespace, Resource, fields
from flask import Flask, request, Response
from flask_restful import Resource
# from app import api
import secrets, random
import os
from base64 import b64encode
from flask_cors import CORS
from flask_restful import Api
#from PIL import Image
from io import BytesIO
from . import dbaccess as db

class BuildPage(Resource):
    def get(self):
        data = request.args
        budget = data.get('budget')
        use = data.get('use')
        overclock = data.get('overclock')

        if use == "Gaming":
            GPUBudget = 0.6 * budget
            CPUBudget = 0.12 * budget
            MotherboardBudget = 0.06 * budget
            MemoryBudget = 0.06 * budget
            StorageBudget = 0.06 * budget
            PSUBudget = 0.04 * budget
            CaseBudget = 0.03 * budget
            CoolingBudget = 0.03 * budget
        elif use == "Animation":
            GPUBudget = 0.55 * budget
            CPUBudget = 0.19 * budget
            MotherboardBudget = 0.06 * budget
            MemoryBudget = 0.05 * budget
            StorageBudget = 0.06 * budget
            PSUBudget = 0.05 * budget
            CaseBudget = 0.04 * budget
            CoolingBudget = 0.03 * budget
        elif use == "Editing":
            GPUBudget = 0.32 * budget
            CPUBudget = 0.32 * budget
            MotherboardBudget = 0.08 * budget
            MemoryBudget = 0.09 * budget
            StorageBudget = 0.08 * budget
            PSUBudget = 0.06 * budget
            CaseBudget = 0.05 * budget
            CoolingBudget = 0.03 * budget
        elif use == "Business":
            GPUBudget = 0 * budget
            CPUBudget = 0.45 * budget
            MotherboardBudget = 0.12 * budget
            MemoryBudget = 0.12 * budget
            StorageBudget = 0.13 * budget
            PSUBudget = 0.8 * budget
            CaseBudget = 0.06 * budget
            CoolingBudget = 0.04 * budget
        else:
            GPUBudget = 0.6 * budget
            CPUBudget = 0.12 * budget
            MotherboardBudget = 0.06 * budget
            MemoryBudget = 0.07 * budget
            StorageBudget = 0.06 * budget
            PSUBudget = 0.05 * budget
            CaseBudget = 0.04 * budget
            CoolingBudget = 0.03 * budget

        build['CPU'] = recommendCPU(CPUBudget, use, overclock)
        build['GPU'] = recommendGPU(GPUBudget, use, overclock)
        build['Motherboard'] = recommendMotherboard(MotherboardBudget, use, CPU, GPU)
        build['Memory'] = recommendMemory(MemoryBudget, Mb)
        build['Storage'] = recommendStorage(StorageBudget, Mb)
        # build['Cooling'] = recommendCooling(CoolingBudget)
        powerSum = 0
        for item in build:
            powerSum += build[item][power_use] 
        build['PSU'] = recommendPSU(PSUBudget, powerSum)
        # build['Case'] = recommendCase(CaseBudget, GPU)
        
        


    
    
def recommendCPU(budget, use, overclock):
    CPUs = db.getAllProducts('CPU')
    if use == "Gaming":
        coreWeight = 0.4
        clockWeight = 0.6
    elif use == "Animation":
        coreWeight = 0.1
        clockWeight = 0.9
    elif use == "Editing":
        coreWeight = 0.6
        clockWeight = 0.4
    elif use == "Business":
        coreWeight = 0.5
        clockWeight = 0.5
    else:
        coreWeight = 0.5
        clockWeight = 0.5
    
    highscore = 0.0
    for CPU in CPUs:
        if CPU['price'] <= budget:
            if overclock == True:
                if CPU['specs']['overclockable'] == False:
                    continue
            score = coreWeight*CPU['specs']['cores']+clockWeight*CPU['specs']['max_clock']
            if score > highscore:
                highscore = score
                recommendation = CPU
    return(recommendation)
    


def recommendGPU(budget, use, overclock):
    GPUs = db.getAllProducts('Graphics_Cards')
    memoryWeight = 0.3
    clockWeight = 0.5
    coreWeight = 0.2
    highscore = 0.0

    for GPU in GPUs:
        if GPU['price'] <= budget:
            score = memoryWeight * GPU['specs']['memory'] + clockWeight * GPU['specs']['clock'] + coreWeight * GPU['specs']['cuda_cores']
            if score > highscore:
                highscore = score
                recommendation = GPU
            elif score == highscore:
                if recommendation is not None and GPU['price'] < recommendation['price']:
                    highscore = score
                    recommendation = GPU
    return(recommendation)


def recommendMotherboard(budget, CPU, GPU):
    Motherboards = db.getAllProducts('Motherboards')
    currentPrice = 10000
    for motherboard in Motherboards:
        if motherboard['specs']['cpu_socket'] == CPU['specs']['socket']:
            if motherboard['specs']['pcie'] >= GPU['specs']['pcie']:
                if motherboard['price'] < currentPrice:
                    recommendation = motherboard
                    currentPrice = motherboard['price']
    
    return(recommendation)


def recommendCPUCooler(budget, CPU, overclock):
    CPUcoolers = db.getAllProducts('CPU_Coolers')
    lowestPrice = 100000.0
    if (overclock or not CPU['specs']['cooler_included']:
        for cooler in CPUcoolers:
            if cooler['price'] <= budget and cooler['price'] < lowestPrice
                recommendation = cooler 
    else:    
        return(None)
    return (recommendation)


def recommendStorage(budget, Motherboard):
    Storages = db.getAllProducts('Storage')
    highestCapacity = 0
    currentPrice = 0
    recommendation = None

    for storage in Storages:
        if storage['price'] <= budget:
            if storage['specs']['capacity'] > highestCapacity:
                highestCapacity = storage['specs']['capacity']
                currentPrice = storage['price']
                recommendation = storage
            elif storage['specs']['capacity'] == highestCapacity:
                if currentPrice > storage['price']:
                    highestCapacity = storage['specs']['capacity']
                    currentPrice = storage['price']
                    recommendation = storage
            
    return(recommendation)


def recommendMemory(budget, Motherboard):
    Memorys = db.getAllProducts('Memory')
    highscore = 0
    currentPrice = 0
    recommendation = None

    for memory in Memorys:
        if memory['price'] <= budget:
            score = memory['specs']['number_of_sticks'] * memory['specs']['capacity'] + 0.01 * memory['specs']['frequency']
            if score > highscore:
                highscore = score
                recommendation = memory
                currentPrice = memory['price']
            elif score == highscore:
                if memory['price'] < currentPrice:
                    highscore = score
                    recommendation = memory
                    currentPrice = memory['price']

    return(recommendation)

def recommendPSU(budget, sumPower_use):
    PSUs = db.getAllProducts('PSU')
    currentPrice = 10000.0
    ratings = ['Certified', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Titanium']
    currentRating = -1
    for PSU in PSUs:
        if PSU['price'] <= budget and PSU['specs']['wattage'] >= sumPower_use:
            if ratings.index(PSU['specs']['power_efficiency']) > currentRating:
                recommendation = PSU
                currentPrice = PSU['price']
                currentRating = ratings.index(PSU['specs']['power_efficiency'])
            elif ratings.index(PSU['specs']['power_efficiency']) == currentRating:
                if PSU['price'] < currentPrice:
                    recommendation = PSU
                    currentPrice = PSU['price']
                    currentRating = ratings.index(PSU['specs']['power_efficiency'])
    return(PSU)
    
# def recommendCase(budget, GPU):
#     db.getAllProducts('Case')
    
#     return(case)

# def recommendCooling(budget)
#     return(Cooling)