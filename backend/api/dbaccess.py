import psycopg2

def connect():
    conn = None
    try:
        conn = psycopg2.connect(database="baliexpress",
        user="postgres",
        password="<INSERT YOUR POSTGRESQL PASSWORD HERE"
    )
        conn.set_client_encoding('UTF8')
    except Exception as e:
        print("Unable to connect to the database")

    return conn

# "Users" table functions

# returns the corresponding ID number for a given username
def getUserIDFromUsername(username):
    conn = connect()
    cur = conn.cursor()

    cur.execute(
    	"SELECT id FROM Users WHERE username = %s", [username]
    )
    id = cur.fetchall()[0][0]
    return id

# returns the corresponding username for a given user ID
def getUsernameFromUserID(id):
    conn = connect()
    cur = conn.cursor()

    cur.execute(
    	"SELECT username FROM Users WHERE id = %s", [id]
    )
    username = cur.fetchall()[0][0]
    return username

# returns the corresponding password for a given user ID
# NOTE: likely a very insecure way of doing this
def getPassword(id):
    conn = connect()
    cur = conn.cursor()

    cur.execute(
    	"SELECT password FROM Users WHERE id = %s", [id]
    )
    password = cur.fetchall()[0][0]
    return password

# returns the corresponding email for a given user id
def getEmail(id):
    conn = connect()
    cur = conn.cursor()

    cur.execute(
    	"SELECT email FROM Users WHERE id = %s", [id]
    )
    email = cur.fetchall()[0][0]
    return email

# returns the corresponding address for a given user id
def getAddress(id):
    conn = connect()
    cur = conn.cursor()

    cur.execute(
    	"SELECT streetaddress, city, country, postcode FROM Users WHERE id = %s", [id]
    )
    address = cur.fetchall()[0]
    return address

# returns whether or not a given user is an admin
def getAdminStatus(id):
    conn = connect()
    cur = conn.cursor()

    cur.execute(
    	"SELECT admin FROM Users WHERE id = %s", [id]
    )
    admin = cur.fetchall()[0][0]
    return admin

# creates a new user from given paramters
# Note: id does not need to be specified, database generates it automatically
def addUser(username, password, email):
    conn = connect()
    cur = conn.cursor()

    query =  """INSERT INTO Users (username, password, email, admin) VALUES (%s, %s, %s, 'f');"""
    values = (username, password, email)

    cur.execute(query, values)
    conn.commit()
    cur.close()
    conn.close()
    #TODO: error handling

# creates a new user with admin permissions from given parameters
# NOTE: id does not need to be specified, database generates it automatically
def addAdmin(username, password, email):
    conn = connect()
    cur = conn.cursor()

    query =  """INSERT INTO Users (username, password, email, admin) VALUES (%s, %s, %s, 't');"""
    values = (username, password, email)

    cur.execute(query, values)
    conn.commit()
    cur.close()
    conn.close()
    #TODO: error handling

# updates password of user with given id
def updatePassword(id, newPassword):
    conn = connect()
    cur = conn.cursor()

    query =  """UPDATE Users SET password = %s WHERE id = %s;"""
    values = (newPassword, id)

    cur.execute(query, values)
    conn.commit()
    cur.close()
    conn.close()

# updates email of user with given id
def updateEmail(id, newEmail):
    conn = connect()
    cur = conn.cursor()

    query =  """UPDATE Users SET email = %s WHERE id = %s;"""
    values = (newEmail, id)

    cur.execute(query, values)
    conn.commit()
    cur.close()
    conn.close()

# updates address of user with given id
# TODO: allow update of individual elements of address
def updateAddress(id, streetAddress, city, country, postcode):
    conn = connect()
    cur = conn.cursor()

    query =  """UPDATE Users SET streetaddress = %s, city = %s, country = %s, postcode = %s WHERE id = %s;"""
    values = (streetAddress, city, country, postcode, id)

    cur.execute(query, values)
    conn.commit()
    cur.close()
    conn.close()

# product functions
# get all product categories
def getCategories():
    conn = connect()
    cur = conn.cursor()

    cur.execute(
    	"SELECT unnest(enum_range(NULL::Categories));"
    )

    categories = []
    while True:
        t = cur.fetchone()
        if t == None:
            break
        categories.append(t[0])

    print (categories)
    cur.close()
    conn.close()
    return categories

# get all products
def getProducts():
    conn = connect()
    cur = conn.cursor()

    cur.execute(
    	"SELECT id, name, price from Products;"
    )
    products = cur.fetchall()
    print (products)
    cur.close()
    conn.close()
    return products

# get all products of a specific type
def getProducts(type):
    conn = connect()
    cur = conn.cursor()

    cur.execute(
    	"SELECT id, name, price from Products where type = %s;", [type]
    )
    products = cur.fetchall()
    print (products)
    cur.close()
    conn.close()
    return products
