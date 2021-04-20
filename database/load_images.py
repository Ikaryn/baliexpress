import os
from base64 import b64encode
import psycopg2
import psycopg2.extras


# Idk how to use it to connect to db, I just put it here lol
def connect():
    conn = None
    try:
        conn = psycopg2.connect(database="baliexpress",
            user="postgres",
            password="jlk1njk2"
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

try:
    # Get list of all products in database
    conn = connect()
    cur = conn.cursor(cursor_factory = psycopg2.extras.DictCursor)

    query = "SELECT id, name FROM Products"
    cur.execute(query)
    products = cur.fetchall()

    for product in products:
        try:
            id, name = product
            encodedImage = getEncodedImage(name)

            query = "UPDATE Products SET image = %s WHERE id = %s"
            cur.execute(query, (encodedImage, id))

        except FileNotFoundError:
            print('Error: Could not find', name, 'in images folder, ID =', id)

    # commit changes to database
    conn.commit()
except (Exception, psycopg2.DatabaseError) as error:
    print("An error occured connecting to the database")
    print(error)
finally:
    # close connecction to database
    if (conn):
        cur.close()
        conn.close()
