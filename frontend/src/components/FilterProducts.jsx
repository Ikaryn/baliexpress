import { string } from "prop-types"

function filterProducts (fields, queries, products) {

    let filtered = products;

    for (let i in fields) {

        // For when no filter was selected for a certain type
        if (queries[i].length === 0) continue;

        switch (fields[i]) {
            case 'brand':
                filtered = [...filtered].filter(product => {
                    for (let j in queries[i]) {
                        if (product.name.toUpperCase().includes(queries[i][j].toUpperCase())) {
                            return true;
                        }
                    }
                    return false;
                });
                break;
            case 'category':
                filtered = [...filtered].filter(product => {
                    for (let j in queries[i]) {
                        if (product.category.toUpperCase().includes(queries[i][j].toUpperCase())) {
                            return true;
                        }
                    }
                    return false;
                });
                break;
            case 'stock':
                filtered = [...filtered].filter(product => {
                    for (let j in queries[i]) {
                        if (queries[i][j] === 'In stock' && product.stock > 0) return true;
                        if (queries[i][j] === 'Out of stock' && product.stock === 0) return true;
                        return false;
                    }
                });
                break;
            case 'price':
                filtered = [...filtered].filter(product => {
                    for (let j in queries[i]) {
                        let keywords = queries[i][j].split(' ');
                        let lower = Number(keywords[0]);
                        let upper = keywords[2];
                        if (product.price >= lower) {
                            if (upper === 'more') return true;
                            else if (product.price <= Number(upper)) return true;
                        }
                        return false;
                    }
                });
                break;
            default:
                filtered = [...filtered].filter(product => {
                    if (queries[i].includes(String(product.specs[fields[i]]))) return true;
                    return false;
                });
                break;

        }
    }


    return filtered;

}

function categoryFilters (category) {

    let filters = { 'CPU':              {
                                        'price': ['0 - 500', '500 - 1000', '1000 or more'],
                                        'specs': ['cores', 'socket', 'overclockable'],
                                        'names': ['Core Count', 'Socket', 'Overclockable']
                                        },
                    'Motherboards':     {
                                        'price': ['0 - 200', '200 - 500', '500 or more'],
                                        'specs': ['cpu_socket', 'wifi', 'form_factor_supported'],
                                        'names': ['CPU Socket', 'Wifi Included', 'Form Factor']
                                        },
                    'Storage':          {
                                        'price': ['0 - 100', '100 - 500', '500 or more'],
                                        'specs': ['format', 'form_factor'],
                                        'names': ['Format', 'Form Factor (Inches)']
                                        },
                    'PSU':              {
                                        'price': ['0 - 200', '200 - 500', '500 or more'],
                                        'specs': ['wattage', 'power_efficiency', 'modularity'],
                                        'names': ['Wattage (W)', 'Power Efficiency', 'Modularity']
                                        },
                    'CPU_Cooling':      {
                                        'price': ['0 - 100', '100 or more'],
                                        'specs': [],
                                        'names': []
                                        },
                    'PC_Cooling':       {
                                        'price': ['0 - 50', '50 or more'],
                                        'specs': [],
                                        'names': []
                                        },
                    'Memory':           {
                                        'price': ['0 - 200', '200 - 500', '500 or more'],
                                        'specs': ['frequency', 'capacity'],
                                        'names': ['Frequency (MHz)', 'Capacity (GB)']
                                        },
                    'Graphics_Cards':   {
                                        'price': ['0 - 500', '500 - 1000', '1000 or more'],
                                        'specs': ['memory_size', 'memory_type'],
                                        'names': ['Memory Size (GB)', 'Memory Type']
                                        },
                    'Cases':            {
                                        'price': ['0 - 100', '100 or more'],
                                        'specs': ['colour', 'size'],
                                        'names': ['Colour', 'Size']
                                        },
                    'Monitors':         {
                                        'price': ['0 - 250', '250 or more'],
                                        'specs': ['size', 'resolution', 'refresh_rate', 'panel_type'],
                                        'names': ['Size (Inches)', 'Resolution', 'Refresh Rate', 'Panel Type']
                                        },
                    'Mouses':           {
                                        'price': ['0 - 50', '50 or more'],
                                        'specs': ['connectivity', 'ambidextrous'],
                                        'names': ['Connectivity', 'Ambidextrous']
                                        },
                    'Keyboards':        {
                                        'price': ['0 - 50', '50 or more'],
                                        'specs': ['mechanical', 'connectivity', 'backlight'],
                                        'names': ['Mechanical Switches', 'Connectivity', 'Backlight']
                                        },
                    'Wifi_Adapters':    {
                                        'price': ['0 -50', '50 or more'],
                                        'specs': [],
                                        'names': []
                                        },
                    'Sales':            {
                                        'price': ['0 - 500', '500 - 1000', '1000 or more'],
                                        'specs': ['category'],
                                        'names': ['Category']
                                        }

                    }

    return filters[category];
}


export {filterProducts, categoryFilters};
