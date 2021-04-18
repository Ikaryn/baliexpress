from datetime import datetime

# Converting release date in products from a date object and booleans to string for JSON serialization
def boolDateToString(products):

    for product in products:
        for field in product['specs']:
            if (isinstance(product['specs'][field], bool)):
                product['specs'][field] = 'Yes' if product['specs'][field] else 'No'
        releaseDate = product['release_date'].strftime('%Y-%m-%d')
        product['release_date'] = releaseDate
    
    return products