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


class UserBuilds(Resource):
    def get(self):
        print("get userBuilds recieved")
        data = request.args
        userId = data.get('userId')
        builds = db.getUsersBuilds(userId)
        print(builds)
        for build in builds:
            print(build)
            for parts in build['parts']:
                print(parts)
                parts['price'] = str(parts['price'])
                releaseDate = parts['release_date'].strftime('%Y-%m-%d')
                parts['release_date'] = releaseDate
                if ('power_use' in parts['specs']):
                    parts['specs']['power_use'] = str(parts['specs']['power_use'])
                    print(parts['specs']['power_use'])
                if ('base_clock' in parts['specs']):
                    parts['specs']['base_clock'] = str(parts['specs']['base_clock'])
                if ('max_clock' in parts['specs']):
                    parts['specs']['max_clock'] = str(parts['specs']['max_clock'])
        return {'builds': builds}
        
    def delete(self):
        print("delete userBuilds recieved")
        data = request.args
        buildId = data.get('buildId')
        db.deleteBuild(buildId)
        return 'success'
class BuildPage(Resource):
    def post(self):
        print("Build post received")
        data = request.json
        buildID = db.addNewBuild(data.get('userID'), data.get('buildName'), data.get('buildDesc'))
        build = data.get('build')
        # print("build = ",build)
        for part in build['parts']:
            # if type(build[part]) is dict:
            print(part)
            if isinstance(build['parts'], dict):
                if not isinstance(build['parts'][part], str):
                    db.addPartToBuild(buildID, build['parts'][part]['id'], 1)
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
            GPUBudget = 0.5 * budget
            CPUBudget = 0.2 * budget
            MotherboardBudget = 0.06 * budget
            MemoryBudget = 0.06 * budget
            StorageBudget = 0.06 * budget
            PSUBudget = 0.04 * budget
            CaseBudget = 0.04 * budget
            CoolingBudget = 0.04 * budget
        elif usage == "Animation":
            GPUBudget = 0.5 * budget
            CPUBudget = 0.2 * budget
            MotherboardBudget = 0.06 * budget
            MemoryBudget = 0.07 * budget
            StorageBudget = 0.06 * budget
            PSUBudget = 0.05 * budget
            CaseBudget = 0.04 * budget
            CoolingBudget = 0.05 * budget
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
            GPUBudget = 0.2 * budget
            CPUBudget = 0.3 * budget
            MotherboardBudget = 0.11 * budget
            MemoryBudget = 0.11 * budget
            StorageBudget = 0.12 * budget
            PSUBudget = 0.7 * budget
            CaseBudget = 0.05 * budget
            CoolingBudget = 0.04 * budget
        elif usage == "Art":
            GPUBudget = 0.42 * budget
            CPUBudget = 0.16 * budget
            MotherboardBudget = 0.08 * budget
            MemoryBudget = 0.08 * budget
            StorageBudget = 0.8 * budget
            PSUBudget = 0.6 * budget
            CaseBudget = 0.06 * budget
            CoolingBudget = 0.06 * budget
        else:
            GPUBudget = 0.4 * budget
            CPUBudget = 0.2 * budget
            MotherboardBudget = 0.08 * budget
            MemoryBudget = 0.08 * budget
            StorageBudget = 0.09 * budget
            PSUBudget = 0.05 * budget
            CaseBudget = 0.05 * budget
            CoolingBudget = 0.05 * budget

        if overclock == "true":
            CPU_CoolingBudget = 0.05 * budget
            StorageBudget += -0.01 * budget
            PSUBudget += -0.01 * budget
            CaseBudget += -0.01 * budget
            GPUBudget += -0.02 * budget

            
        build = {
            'Cases': None,
            'Motherboards': None,
            'CPU': None,
            'Graphics_Cards': None, 
            'Memory': None,
            'Storage': None,
            'PSU': None, 
            'CPU_Cooling': ""
            }
        build['CPU'] = recommendCPU(CPUBudget, usage, overclock)
        build['Graphics_Cards'] = recommendGPU(GPUBudget, usage, overclock)
        build['Motherboards'] = recommendMotherboard(MotherboardBudget, usage, build['CPU'], build['Graphics_Cards'])
        build['Memory'] = recommendMemory(MemoryBudget, build['Motherboards'])
        build['Storage'] = recommendStorage(StorageBudget, build['Motherboards'], storage)
        build['PC_Cooling'] = recommendPC_Cooling(CoolingBudget)
        if overclock == "true":
            build["CPU_Cooling"] = recommendCPU_Cooling(CPU_CoolingBudget, build['CPU'], overclock)
        powerSum = 0
        for part in build:
            if type(build[part]) is dict:
                powerSum += build[part]['specs']['power_use'] 
        build['PSU'] = recommendPSU(PSUBudget, powerSum)
        build['Cases'] = recommendCase(CaseBudget, build['Graphics_Cards'])
        #print(build)

        #Make a helper function for this
        for part in build:
            if type(build[part]) is dict:
                releaseDate = build[part]['release_date'].strftime('%Y-%m-%d')
                build[part]['release_date'] = releaseDate
                print(part, "id = ",build[part]['id'])
        return build
        
        


    
    
def recommendCPU(budget, usage, overclock):
    CPUs = db.getAllProducts('CPU')
    if usage == "Gaming":
        coreWeight = 0.35
        clockWeight = 0.65
    elif usage == "Animation":
        coreWeight = 0.1
        clockWeight = 0.9
    elif usage == "Editing":
        coreWeight = 0.6
        clockWeight = 0.4
    elif usage == "Business":
        coreWeight = 0.5
        clockWeight = 0.5
    elif usage == "Art":
        coreWeight = 0.5
        clockWeight = 0.5
    else:
        coreWeight = 0.5
        clockWeight = 0.5
    
    highscore = 0.0
    recommendation = None
    print("CPU Budget: ",budget)
    for CPU in CPUs:
        if CPU['price'] <= budget and CPU['stock'] > 0:
            if overclock == "true":
                if CPU['specs']['overclockable'] is False:
                    continue
            averageRating = getAverageProductRating(CPU['id'])
            print("CPU Average Rating = ", averageRating)
            score = (coreWeight*CPU['specs']['cores']) + (clockWeight*CPU['specs']['max_clock']) + averageRating
            if score > highscore:
                highscore = score
                recommendation = CPU
            elif score == highscore:
                if recommendation is not None and CPU['price'] < recommendation['price']:
                    highscore = score
                    recommendation = CPU
    # print("Recommended CPU: ",recommendation)
    if recommendation is None:
        return ("")
    return(recommendation)
    


def recommendGPU(budget, usage, overclock):
    GPUs = db.getAllProducts('Graphics_Cards')
    memoryWeight = 0.3
    clockWeight = 0.5
    coreWeight = 0.2
    highscore = 0.0
    
    recommendation = None
    for GPU in GPUs:
        # print("GPU specs = ", GPU['specs'])
        if GPU['price'] <= budget and GPU['stock'] > 0:
            averageRating = getAverageProductRating(GPU['id'])
            score = memoryWeight * float(GPU['specs']['memory_size']) + clockWeight * float(GPU['specs']['clock_speed']) + coreWeight * float(GPU['specs']['cuda_cores']) + averageRating
            if score > highscore:
                highscore = score
                recommendation = GPU
            elif score == highscore:
                if recommendation is not None and GPU['price'] < recommendation['price']:
                    highscore = score
                    recommendation = GPU
    # print(recommendation)
    if recommendation is None:
        return ("")
    return(recommendation)


def recommendMotherboard(budget, usage, CPU, GPU):
    Motherboards = db.getAllProducts('Motherboards')
    currentPrice = 10000
    currentRating = -1
    GPUpcie = GPU['specs']['pcie_type']
    CPUsocket = CPU['specs']['socket']
    recommendation = None
    for motherboard in Motherboards:
        if motherboard['specs']['cpu_socket'] == CPUsocket and motherboard['stock'] > 0:
            if motherboard['specs']['pcie_type'] >= GPUpcie:
                averageRating = getAverageProductRating(motherboard['id'])
                if averageRating > currentRating:
                    recommendation = motherboard
                    currentPrice = motherboard['price']
                    currentRating = averageRating
                elif averageRating == currentRating:
                    if motherboard['price'] < currentPrice:
                        recommendation = motherboard
                        currentPrice = motherboard['price']
                        currentRating = averageRating
    
    # print(recommendation)
    if recommendation is None:
        return ("")
    return(recommendation)


def recommendCPU_Cooling(budget, CPU, overclock):
    CPUcoolers = db.getAllProducts('CPU_Cooling')
    lowestPrice = 100000.0
    currentRating = -1
    recommendation = None
    if (not CPU['specs']['cooler_included']):
        for cooler in CPUcoolers:
            if cooler['price'] <= budget and cooler['stock'] > 0:
                if cooler['specs']['socket'] == CPU['specs']['socket']:
                    averageRating = getAverageProductRating(cooler['id'])
                    if averageRating > currentRating:
                        recommendation = cooler
                        lowestPrice = cooler['price']
                        currentRating = averageRating
                    elif averageRating == currentRating:
                        if cooler['price'] < lowestPrice:
                            recommendation = cooler
                            lowestPrice = cooler['price']
                            currentRating = averageRating
    if recommendation is None:
        return ("")
    return (recommendation)


def recommendStorage(budget, Motherboard, format):
    Storages = db.getAllProducts('Storage')
    highestCapacity = 0
    currentPrice = 0
    recommendation = None

    for storage in Storages:
        if storage['price'] <= budget and storage['stock'] > 0:
            if (storage['specs']['format']).lower() == (format).lower():
                if storage['specs']['capacity'] > highestCapacity:
                    highestCapacity = storage['specs']['capacity']
                    currentPrice = storage['price']
                    recommendation = storage
                elif storage['specs']['capacity'] == highestCapacity:
                    if currentPrice > storage['price']:
                        highestCapacity = storage['specs']['capacity']
                        currentPrice = storage['price']
                        recommendation = storage
    if recommendation is None:
        return ("")        
    return(recommendation)


def recommendMemory(budget, Motherboard):
    Memorys = db.getAllProducts('Memory')
    highscore = 0
    currentPrice = 0
    recommendation = None

    for memory in Memorys:
        if memory['price'] <= budget and memory['stock'] > 0:
            averageRating = getAverageProductRating(memory['id'])
            score = memory['specs']['number_of_sticks'] * memory['specs']['capacity'] + 0.01 * memory['specs']['frequency'] + averageRating
            if score > highscore:
                highscore = score
                recommendation = memory
                currentPrice = memory['price']
            elif score == highscore:
                if memory['price'] < currentPrice:
                    highscore = score
                    recommendation = memory
                    currentPrice = memory['price']
    if recommendation is None:
        return ("")
    return(recommendation)

def recommendPSU(budget, sumPower_usage):
    PSUs = db.getAllProducts('PSU')
    currentPrice = 10000.0
    ratings = ['Certified', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Titanium']
    currentRating = -1
    recommendation = None
    for PSU in PSUs:
        if PSU['price'] <= budget and PSU['specs']['wattage'] >= sumPower_usage and PSU['stock'] > 0:
            if ratings.index(PSU['specs']['power_efficiency']) > currentRating:
                recommendation = PSU
                currentPrice = PSU['price']
                currentRating = ratings.index(PSU['specs']['power_efficiency'])
            elif ratings.index(PSU['specs']['power_efficiency']) == currentRating:
                if PSU['price'] < currentPrice:
                    recommendation = PSU
                    currentPrice = PSU['price']
                    currentRating = ratings.index(PSU['specs']['power_efficiency'])
    if recommendation is None:
        return ("")
    return(recommendation)
    
def recommendCase(budget, GPU):
    cases = db.getAllProducts('Cases')
    recommendation = None
    currentRating = -1
    currentPrice = 10000
    for case in cases:
        averageRating = getAverageProductRating(case['id'])
        if case['stock'] > 0:
            if averageRating > currentRating:
                recommendation = case
                currentRating = averageRating
                currentPrice = case['price']
            elif averageRating == currentRating:
                if case['price'] < currentPrice:
                    recommendation = case
                    currentRating = averageRating
                    currentPrice = case['price']

    if recommendation is None:
        return ("")
    return(recommendation)

def recommendPC_Cooling(budget):
    coolers = db.getAllProducts('PC_Cooling')
    recommendation = None
    currentRating = -1
    currentPrice = 10000
    for cooler in coolers:
        averageRating = getAverageProductRating(cooler['id'])
        if cooler['stock'] > 0:
            if averageRating > currentRating:
                recommendation = cooler
                currentRating = averageRating
                currentPrice = cooler['price']
            elif averageRating == currentRating:
                if cooler['price'] < currentPrice:
                    recommendation = cooler
                    currentRating = averageRating
                    currentPrice = cooler['price']

    if recommendation is None:
        return ("")
    return(recommendation)

def getAverageProductRating(productID):
    reviews = db.getProductReviews(productID)
    sumRating = 0
    nRatings = 0
    for review in reviews:
        sumRating += review['rating']
        nRatings += 1
    if nRatings == 0:
        return 0
    meanRating = sumRating/nRatings
    return (meanRating)