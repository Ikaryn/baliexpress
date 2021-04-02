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


def getEncodedImage (id):

    ENCODING = 'utf-8'

    dirname = os.path.dirname(__file__)
    path = os.path.join(dirname, 'product_images/' + str(id) + '.jpg')
    with open(path, 'rb') as image:
        im_b64 = b64encode(image.read())
        im_b64_string = im_b64.decode(ENCODING)
        # print("Image successfully encoded:", str(id) + '.jpg')

    return im_b64_string


# Number of items that are pre-loaded in the database
# Need to change this when more items are added through raw data.sql
preloaded_db_items = 107

for id in range(1, preloaded_db_items + 1):
    encodedImage = getEncodedImage(id)
    if id == 100:
        print(encodedImage)

    #TODO Query to add encoded image to database using id and encodedImage
