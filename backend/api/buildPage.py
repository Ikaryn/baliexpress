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
        # print(builds)
        for build in builds:
            # print(build)
            for parts in build['parts']:
                # print(parts)
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
    # Saving a build created by a user
    def post(self):
        data = request.json
        build = data.get('build')

        buildID = db.addNewBuild(data.get('userID'), data.get('buildName'), data.get('buildDesc'))
        
        for part in build['parts']:
            # print(part)
            if isinstance(build['parts'], dict):
                if not isinstance(build['parts'][part], str):
                    db.addPartToBuild(buildID, build['parts'][part]['id'], 1)
        saved = db.getBuild(buildID)
            
    # Making a change to an existing build
    def put(self):
        print("Build put recieved")
        data = request.json
        newBuild = data.get('build')
        buildID = newBuild['id']
        buildName = data.get('buildName')
        buildDescription = data.get('buildDesc')

        savedBuild = db.getBuild(buildID)

        # Extract the names of the parts in the saved build and the new build
        savedPartNames = []
        for part in savedBuild['parts']:
            savedPartNames.append(part['name'])

        newPartNames = []
        for part in newBuild['parts']:
            if type(newBuild['parts'][part]) is dict:
                newPartNames.append(newBuild['parts'][part]['name'])

        # This section handles removing parts
        for savedPart in savedBuild['parts']:
            if savedPart['name'] not in newPartNames:
                db.removePartFromBuild(buildID, savedPart['productid'])
        
        # This section handles swapping parts and adding new parts
        # Remove any parts that are not in the updated build from the saved build
        # and add any parts to the build that are in the updated build to the saved build
        for part in newBuild['parts']:
            # Since components that are not selected are empty strings we check our part is a dict before attempting to save it
            if type(newBuild['parts'][part]) is dict:
                category = newBuild['parts'][part]['category']
                
                # Check if the new build part is in the saved build by comparing the names
                if newBuild['parts'][part]['name'] not in savedPartNames:
                    
                    # Match the category to find the part to remove and remove it
                    for savedPart in savedBuild['parts']:
                        if savedPart['category'] == category:
                            db.removePartFromBuild(buildID, savedPart['productid'])
                    
                    # Add the new part to the build
                    db.addPartToBuild(buildID, newBuild['parts'][part]['id'], 1)
        
        db.updateBuildDetails(buildID, buildName, buildDescription)

    # Takes input from a build form to determine the usage, budget,
    # preferred storage format, and whether the user wants to overclock.
    def get(self):
        print("Get recommended build")
        data = request.args
        budget = float(data.get('budget'))
        usage = data.get('usage')
        overclock = data.get('overclock')
        storage = data.get('storage')

        # The budget is broken up into segments for the various components
        # the split is defined by the intended usage for the computer as these
        # activities have different needs
        if usage == "gaming":
            # Gaming heavily prioritises the GPU and the CPU
            GPUBudget = 0.4 * budget
            CPUBudget = 0.2 * budget
            MotherboardBudget = 0.1 * budget
            MemoryBudget = 0.08 * budget
            StorageBudget = 0.06 * budget
            PSUBudget = 0.06 * budget
            CaseBudget = 0.06 * budget
            CoolingBudget = 0.04 * budget
        elif usage == "animation":
            # Animation also heavily prioritiese the CPU and GPU but has more interest in RAM
            GPUBudget = 0.5 * budget
            CPUBudget = 0.2 * budget
            MotherboardBudget = 0.06 * budget
            MemoryBudget = 0.07 * budget
            StorageBudget = 0.06 * budget
            PSUBudget = 0.05 * budget
            CaseBudget = 0.04 * budget
            CoolingBudget = 0.05 * budget
        elif usage == "video":
            # Video work requires a stronger CPU and has less emphasis on a Graphics Card
            GPUBudget = 0.32 * budget
            CPUBudget = 0.32 * budget
            MotherboardBudget = 0.08 * budget
            MemoryBudget = 0.09 * budget
            StorageBudget = 0.08 * budget
            PSUBudget = 0.06 * budget
            CaseBudget = 0.05 * budget
            CoolingBudget = 0.03 * budget
        elif usage == "business":
            # Business PC's are typically lower budget and therefore have a more even spread
            # accross the various parts
            GPUBudget = 0.2 * budget
            CPUBudget = 0.3 * budget
            MotherboardBudget = 0.11 * budget
            MemoryBudget = 0.11 * budget
            StorageBudget = 0.12 * budget
            PSUBudget = 0.7 * budget
            CaseBudget = 0.05 * budget
            CoolingBudget = 0.04 * budget
        elif usage == "art":
            # Art requires a strong GPU but has less need for a CPU and more need for RAM
            GPUBudget = 0.42 * budget
            CPUBudget = 0.16 * budget
            MotherboardBudget = 0.08 * budget
            MemoryBudget = 0.08 * budget
            StorageBudget = 0.8 * budget
            PSUBudget = 0.6 * budget
            CaseBudget = 0.06 * budget
            CoolingBudget = 0.06 * budget
        else:
            # Catch all of a generic balanced PC build
            GPUBudget = 0.4 * budget
            CPUBudget = 0.2 * budget
            MotherboardBudget = 0.08 * budget
            MemoryBudget = 0.08 * budget
            StorageBudget = 0.09 * budget
            PSUBudget = 0.05 * budget
            CaseBudget = 0.05 * budget
            CoolingBudget = 0.05 * budget

        # The computer has different requirements if overclocking namely
        # a separate CPU Cooler
        if overclock == "true":
            CPU_CoolingBudget = 0.05 * budget
            StorageBudget += -0.01 * budget
            PSUBudget += -0.01 * budget
            CaseBudget += -0.01 * budget
            GPUBudget += -0.02 * budget

        # The build's parts are defined and then fed into recommender helper functions
        # The functions give a score based upon the suitability for the usage and the product's reviews,
        # where the product with the highest score is selected
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
        
        # If the user wants to overclock a CPU cooling system is recommended which is not necessary in more standard builds
        if overclock == "true":
            build["CPU_Cooling"] = recommendCPU_Cooling(CPU_CoolingBudget, build['CPU'], overclock)
        
        # Finally the PSU requires the sum of all the power needs of the parts to ensure it can meet the requirement
        powerSum = 0
        for part in build:
            if type(build[part]) is dict:
                powerSum += build[part]['specs']['power_use'] 
        build['PSU'] = recommendPSU(PSUBudget, powerSum)
        build['Cases'] = recommendCase(CaseBudget, build['Graphics_Cards'])

        # The product release dates are converted into a format accepted by the API before the build is pushed
        for part in build:
            if type(build[part]) is dict:
                releaseDate = build[part]['release_date'].strftime('%Y-%m-%d')
                build[part]['release_date'] = releaseDate
                print(part, "id = ",build[part]['id'])
        return build
        
        


    
# The CPUs are assessed based upon the needs of the various uses by changing the weights that affect their scores
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
    
    for CPU in CPUs:
        # Check that the price of the CPU is in stock and the price is under the budget
        if CPU['price'] <= budget and CPU['stock'] > 0:
            if overclock == "true":
                # If the user wants to overclock, the CPU must be overclockable
                if CPU['specs']['overclockable'] is False:
                    continue
            
            averageRating = getAverageProductRating(CPU['id'])
            
            # The CPU is then given a score based upon its specs and its average review
            score = (coreWeight*CPU['specs']['cores']) + (clockWeight*CPU['specs']['max_clock']) + averageRating
            
            # A Higher scoring CPU will always be chosen
            if score > highscore:
                highscore = score
                recommendation = CPU
            # If 2 CPUs get the same score, choose the cheaper option
            elif score == highscore:
                if recommendation is not None and CPU['price'] < recommendation['price']:
                    highscore = score
                    recommendation = CPU
    
    # If a suitable product cannot be found, the function returns an empty string which the frontend deals with
    if recommendation is None:
        return ("")
    return(recommendation)
    

# This function recommends the strongest GPU available, all usages have similar needs for GPUs so they are all weighted the same
def recommendGPU(budget, usage, overclock):
    GPUs = db.getAllProducts('Graphics_Cards')
    
    memoryWeight = 0.3
    clockWeight = 0.5
    coreWeight = 0.2
    highscore = 0.0
    
    recommendation = None
    for GPU in GPUs:
        # Check that GPU is in stock and priced under the budget for the part
        if GPU['price'] <= budget and GPU['stock'] > 0:
            averageRating = getAverageProductRating(GPU['id'])

            # The score is based upon the GPU's memory, clock speed, the number of cuda cores, and the average review score
            score = memoryWeight * float(GPU['specs']['memory_size']) + clockWeight * float(GPU['specs']['clock_speed']) + coreWeight * float(GPU['specs']['cuda_cores']) + averageRating
            
            # Again the highest score is chosen or in the case of a match the lower price is chosen
            if score > highscore:
                highscore = score
                recommendation = GPU
            elif score == highscore:
                if recommendation is not None and GPU['price'] < recommendation['price']:
                    highscore = score
                    recommendation = GPU
    
    if recommendation is None:
        return ("")
    return(recommendation)


def recommendMotherboard(budget, usage, CPU, GPU):
    Motherboards = db.getAllProducts('Motherboards')
    print("Motherboard budget: ", budget)
    currentPrice = 10000
    currentRating = -1
    
    # In order for the Motherboard to be compatible with the build, we need to compare it's sockets to the interfaces needed by the GPU and the CPU
    GPUpcie = GPU['specs']['pcie_type']
    CPUsocket = CPU['specs']['socket']
    
    recommendation = None
    for motherboard in Motherboards:
        # First we check if the is compatible with CPU and GPU, is in stock, and is within the budget
        if motherboard['specs']['cpu_socket'] == CPUsocket and motherboard['stock'] > 0 and motherboard['price'] <= budget:
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
    
    if recommendation is None:
        return ("")
    return(recommendation)

# Function recommends CPU Cooling 
def recommendCPU_Cooling(budget, CPU, overclock):
    CPUcoolers = db.getAllProducts('CPU_Cooling')
    lowestPrice = 100000.0
    currentRating = -1
    recommendation = None
    # Check if the CPU in the build has a cooler included
    if (not CPU['specs']['cooler_included']):
        for cooler in CPUcoolers:
            # Check the cooler is in the budget and in stock
            if cooler['price'] <= budget and cooler['stock'] > 0:
                if cooler['specs']['socket'] == CPU['specs']['socket']:
                    # Because the specs for the cooling don't affect the recommendation, we just use the rating
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

# Recommend a storage absed upon the users preferred format and budget
def recommendStorage(budget, Motherboard, format):
    Storages = db.getAllProducts('Storage')
    highestCapacity = 0
    currentPrice = 0
    recommendation = None

    for storage in Storages:
        # Check the storage is in budget and in stock
        if storage['price'] <= budget and storage['stock'] > 0:
            # Check that the storage is of the specified format
            if (storage['specs']['format']).lower() == (format).lower():
                # Choose the storage with the highest capacity
                if storage['specs']['capacity'] > highestCapacity:
                    highestCapacity = storage['specs']['capacity']
                    recommendation = storage
                
                # If two storages have the same capacity, choose the one with better reviews
                elif storage['specs']['capacity'] == highestCapacity:
                    currentRating = getAverageProductRating(recommendation['id'])
                    newRating = getAverageProductRating(storage['id'])
                    if newRating > currentRating:
                        highestCapacity = storage['specs']['capacity']
                        recommendation = storage
    
    if recommendation is None:
        return ("")        
    return(recommendation)

# Recommend memory (RAM) based upon the specs of the RAM
def recommendMemory(budget, Motherboard):
    Memorys = db.getAllProducts('Memory')
    highscore = 0.0
    currentPrice = 0
    recommendation = None

    for memory in Memorys:
        # Check the memory is within the budget and in stock
        if memory['price'] <= budget and memory['stock'] > 0:
            averageRating = getAverageProductRating(memory['id'])
            
            # The score is calculated by finding the overall capacity based on the number of sticks and the capacity of each stick
            # summed with a fraction of the frequency to evaluate speed, and the average review score
            score = memory['specs']['number_of_sticks'] * memory['specs']['capacity'] + 0.01 * memory['specs']['frequency'] + averageRating
            
            # Choose the memory with the highest score and in the case of a match, take the lowest price
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

# Recommend a PSU that meets the builds power requirements
def recommendPSU(budget, sumPower_usage):
    PSUs = db.getAllProducts('PSU')
    currentPrice = 10000.0
    
    # PSUs are rated with the following ratings based on their power efficiency
    efficiencies = ['Certified', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Titanium']
    currentEfficiency= -1
    recommendation = None

    for PSU in PSUs:
        # Check that the PSU is within budget, in stock, and has the wattage to meet the systems power needs
        if PSU['price'] <= budget and PSU['specs']['wattage'] >= sumPower_usage and PSU['stock'] > 0:
            # Choose the PSU with the highest power efficiency 
            if efficiencies.index(PSU['specs']['power_efficiency']) > currentEfficiency:
                recommendation = PSU
                currentPrice = PSU['price']
                currentEfficiency = efficiencies.index(PSU['specs']['power_efficiency'])
            elif efficiencies.index(PSU['specs']['power_efficiency']) == currentEfficiency:
                # If two PSU's have the same efficiency choose the better reviewed
                currentRating = getAverageProductRating(recommendation['id'])
                newRating = getAverageProductRating(PSU['id'])

                if newRating > currentRating:
                    recommendation = PSU
                    currentPrice = PSU['price']
                    currentEfficiency = efficiencies.index(PSU['specs']['power_efficiency'])
    
    if recommendation is None:
        return ("")
    return(recommendation)

# Recommends a case based upon the reviews and in the case of a match score, recommends the lowest price    
def recommendCase(budget, GPU):
    cases = db.getAllProducts('Cases')
    
    recommendation = None
    currentRating = -1
    currentPrice = 10000
    
    for case in cases:
        # Check the case is in stock and in the budget
        if case['stock'] > 0 and case['price'] <= budget:
            
            averageRating = getAverageProductRating(case['id'])

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

# Recommends the highest rating PC Cooler for the lowest price in the case of a match
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

# Returns the average review score for a product
def getAverageProductRating(productID):
    reviews = db.getProductReviews(productID)
    sumRating = 0
    nRatings = 0
    
    # Sum all review ratings and count the number of reviews
    for review in reviews:
        sumRating += review['rating']
        nRatings += 1
    # If there are no reviews, avoid dividing by zero and return 0
    if nRatings == 0:
        return 0
    
    # Get the average 
    averageRating = sumRating/nRatings
    return (averageRating)