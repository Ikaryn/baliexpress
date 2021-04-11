import { matchPath } from "react-router";

const normalise = (value, max, min) => (value - min) * 100 / (max - min);

// calculate the performance values of the PSU
const weightPSU = (specs) => {
    
    let efficiency = 80;
    
    if(specs['Bronze']){
        efficiency = 82;
    } else if (specs['Gold']){
        efficiency = 87;
    } else if (specs['Platinum']){
        efficiency = 89;
    } else if (specs['Titanium']){
        efficiency = 94;
    }
 
    return {'Max Wattage': specs.wattage, 'Efficiency at 100% load': efficiency}
}

// To create a summarised performance values to CPU's we need to give each component weighting
const weightCPU = (specs) => {
    
    const mcp = (specs.cores/specs['threads']) * specs['base_clock'];
    const acp = ((specs['cores'] * 1.2)/specs['threads']) * specs['base_clock'];
    const mup = specs['cores'] + specs['threads'];
    const og = specs['max_clock'] - specs['base_clock'];
    
    return {'Max Computational Power': normalise(mcp, 2, 1), 'Average Computational Power': normalise(acp, 3, 1), 'Multi-use Performace': normalise(mup,100, 5), 'Overclocking Gains': normalise(og,3,0)}
}

const weightGPU = (specs) => {
    const performance = (specs['clock_speed'] * specs['cuda_cores']);
    return {'performance': normalise(performance, 17581120,100000), 'storage': normalise(specs['memory_size'], 12, 0)}
}

export default class dataVis {

    generateProductPerformance(product) {
        switch(product.category) {
            case 'PSU':
                return weightPSU(product.specs);
            case 'CPU':
                return weightCPU(product.specs);
            case 'Graphics_Cards':
                return weightGPU(product.specs);
        default:
            return;
        }
    }

}