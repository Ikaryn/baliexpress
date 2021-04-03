import os
from base64 import b64encode
import psycopg2

# Idk how to use it to connect to db, I just put it here lol
def connect():
    conn = None
    try:
        conn = psycopg2.connect(database="baliexpress",
            user="postgres",
            password="password"
        )
        conn.set_client_encoding('UTF8')
    except Exception as e:
        print("Unable to connect to the database")
        print(e)

    return conn


def getEncodedImage (name):

    ENCODING = 'utf-8'
    translation_table = dict.fromkeys(map(ord, '/\:*?"<>|'), None)
    image_name = name.translate(translation_table)


    dirname = os.path.dirname(__file__)
    path = os.path.join(dirname, 'product_images/' + image_name + '.jpg')
    try:
        with open(path, 'rb') as image:
            im_b64 = b64encode(image.read())
            im_b64_string = im_b64.decode(ENCODING)
            print("Image successfully encoded:", image_name + '.jpg')
    except FileNotFoundError:
        raise

    return im_b64_string


# TODO: Get list of all products in database; only needs id and product name

products = "List of products from database"

for product in products:
    try:
        encodedImage = getEncodedImage(product['name'])
        
        # TODO Query to add encoded image to database using id and encodedImage

    except FileNotFoundError:
        print('Error: Could not find', product['name'], 'in images folder, ID =', product['id'])

    
