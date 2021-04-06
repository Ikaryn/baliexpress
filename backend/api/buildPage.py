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
    def post(self):
        print("Build post received")
        data = request.json
        buildID = db.addNewBuild(data.get('userID'), data.get('buildName'), data.get('buildDesc'))
        build = data.get('build')
        # print("build = ",build)
        for part in build:
            if type(build[part]) is dict:
                db.addPartToBuild(buildID, build[part]['id'], 1)
        saved = db.getBuild(buildID)
        # print("saved = ",saved)
            
        

    def get(self):
        print("Get recommended build")
        data = request.args
        budget = float(data.get('budget'))
        usage = data.get('usage')
        overclock = data.get('overclock')
        storage = data.get('storage')

        if usage == "Gaming":
            GPUBudget = 0.6 * budget
            CPUBudget = 0.12 * budget
            MotherboardBudget = 0.06 * budget
            MemoryBudget = 0.06 * budget
            StorageBudget = 0.06 * budget
            PSUBudget = 0.04 * budget
            CaseBudget = 0.03 * budget
            CoolingBudget = 0.03 * budget
        elif usage == "Animation":
            GPUBudget = 0.55 * budget
            CPUBudget = 0.19 * budget
            MotherboardBudget = 0.06 * budget
            MemoryBudget = 0.05 * budget
            StorageBudget = 0.06 * budget
            PSUBudget = 0.05 * budget
            CaseBudget = 0.04 * budget
            CoolingBudget = 0.03 * budget
        elif usage == "Video":
            GPUBudget = 0.32 * budget
            CPUBudget = 0.32 * budget
            MotherboardBudget = 0.08 * budget
            MemoryBudget = 0.09 * budget
            StorageBudget = 0.08 * budget
            PSUBudget = 0.06 * budget
            CaseBudget = 0.05 * budget
            CoolingBudget = 0.03 * budget
        elif usage == "Business":
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
        
        build = {}
        build['CPU'] = recommendCPU(CPUBudget, usage, overclock)
        build['GPU'] = recommendGPU(GPUBudget, usage, overclock)
        build['Motherboard'] = recommendMotherboard(MotherboardBudget, usage, build['CPU'], build['GPU'])
        build['Memory'] = recommendMemory(MemoryBudget, build['Motherboard'])
        build['Storage'] = recommendStorage(StorageBudget, build['Motherboard'], storage)
        # build['Cooling'] = recommendCooling(CoolingBudget)
        powerSum = 0
        for part in build:
            if type(build[part]) is dict:
                powerSum += build[part]['specs']['power_use'] 
        build['PSU'] = recommendPSU(PSUBudget, powerSum)
        # build['Case'] = recommendCase(CaseBudget, GPU)
        #print(build)

        #Make a helper function for this
        for part in build:
            if type(build[part]) is dict:
                    releaseDate = build[part]['release_date'].strftime('%Y-%m-%d')
                    build[part]['release_date'] = releaseDate
        return build
        
        


    
    
def recommendCPU(budget, usage, overclock):
    CPUs = db.getAllProducts('CPU')
    if usage == "Gaming":
        coreWeight = 0.4
        clockWeight = 0.6
    elif usage == "Animation":
        coreWeight = 0.1
        clockWeight = 0.9
    elif usage == "Editing":
        coreWeight = 0.6
        clockWeight = 0.4
    elif usage == "Business":
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
    # print(recommendation)
    return(recommendation)
    


def recommendGPU(budget, usage, overclock):
    GPUs = db.getAllProducts('Graphics_Cards')
    memoryWeight = 0.3
    clockWeight = 0.5
    coreWeight = 0.2
    highscore = 0.0
    
    for GPU in GPUs:
        # print("GPU specs = ", GPU['specs'])
        if GPU['price'] <= budget:
            score = memoryWeight * float(GPU['specs']['memory_size']) + clockWeight * float(GPU['specs']['clock_speed']) + coreWeight * float(GPU['specs']['cuda_cores'])
            if score > highscore:
                highscore = score
                recommendation = GPU
            elif score == highscore:
                if recommendation is not None and GPU['price'] < recommendation['price']:
                    highscore = score
                    recommendation = GPU
    # print(recommendation)
    return(recommendation)


def recommendMotherboard(budget, usage, CPU, GPU):
    Motherboards = db.getAllProducts('Motherboards')
    currentPrice = 10000
    GPUpcie = GPU['specs']['pcie_type']
    for motherboard in Motherboards:
        if motherboard['specs']['cpu_socket'] == CPU['specs']['socket']:
            if motherboard['specs']['pcie_type'] >= GPUpcie:
                if motherboard['price'] < currentPrice:
                    recommendation = motherboard
                    currentPrice = motherboard['price']
    
    # print(recommendation)
    return(recommendation)


def recommendCPUCooler(budget, CPU, overclock):
    CPUcoolers = db.getAllProducts('CPU_Coolers')
    lowestPrice = 100000.0
    if (overclock or not CPU['specs']['cooler_included']):
        for cooler in CPUcoolers:
            if (cooler['price'] <= budget and cooler['price'] < lowestPrice):
                recommendation = cooler 
    else:    
        return(None)
    return (recommendation)


def recommendStorage(budget, Motherboard, format):
    Storages = db.getAllProducts('Storage')
    highestCapacity = 0
    currentPrice = 0
    recommendation = None

    for storage in Storages:
        if storage['price'] <= budget:
            if storage['specs']['format'] == format:
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

def recommendPSU(budget, sumPower_usage):
    PSUs = db.getAllProducts('PSU')
    currentPrice = 10000.0
    ratings = ['Certified', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Titanium']
    currentRating = -1
    for PSU in PSUs:
        if PSU['price'] <= budget and PSU['specs']['wattage'] >= sumPower_usage:
            if ratings.index(PSU['specs']['power_efficiency']) > currentRating:
                recommendation = PSU
                currentPrice = PSU['price']
                currentRating = ratings.index(PSU['specs']['power_efficiency'])
            elif ratings.index(PSU['specs']['power_efficiency']) == currentRating:
                if PSU['price'] < currentPrice:
                    recommendation = PSU
                    currentPrice = PSU['price']
                    currentRating = ratings.index(PSU['specs']['power_efficiency'])
    return(recommendation)
    
# def recommendCase(budget, GPU):
#     db.getAllProducts('Case')
    
#     return(case)

# def recommendCooling(budget)
#     return(Cooling)