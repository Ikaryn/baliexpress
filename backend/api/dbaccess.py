import psycopg2
from psycopg2.extensions import AsIs
import psycopg2.extras

def connect():
    conn = None
    try:
        conn = psycopg2.connect(database="baliexpress",
            user="postgres",
            password="iloverice12345"
        )
        conn.set_client_encoding('UTF8')
    except Exception as e:
        print("Unable to connect to the database")

    return conn

# "Users" table functions
# returns all db info for a given id
# TODO: make less hard coded, tidy up
def getUserInfo(id):
    conn = connect()
    cur = conn.cursor()

    print('id:', id)

    cur.execute(
    	"SELECT * FROM Users WHERE id = %s", [id]
    )

    try:
        tuple = cur.fetchall()[0]
        info = {
            "id": tuple[0],
            "name": tuple[1],
            "email": tuple[2],
            "password": tuple[3],
            "phone": tuple[4],
            "streetAddress": tuple[5],
            "city": tuple[6],
            "state": tuple[7],
            "country": tuple[8],
            "postcode": tuple[9],
            "admin": tuple[10]
        }
    except IndexError:
        info = None

    cur.close()
    conn.close()
    return info

#TODO: make less hard coded, tidy up
def getAllUsers():
    conn = connect()
    cur = conn.cursor()
    cur.execute(
        "SELECT * FROM Users"
    )

    users = []
    while True:
        tuple = cur.fetchone()
        if tuple == None:
            break
        info = {
            "id": tuple[0],
            "name": tuple[1],
            "email": tuple[2],
            "password": tuple[3],
            "phone": tuple[4],
            "streetAddress": tuple[5],
            "city": tuple[6],
            "state": tuple[7],
            "country": tuple[8],
            "pCode": tuple[9],
            "admin": tuple[10]
        }
        users.append(info)

    cur.close()
    conn.close()
    return users



# returns the corresponding password for a given user ID
# NOTE: likely a very insecure way of doing this
def getPassword(id):
    conn = connect()
    cur = conn.cursor()

    cur.execute(
    	"SELECT password FROM Users WHERE id = %s", [id]
    )
    password = cur.fetchall()[0][0]
    cur.close()
    conn.close()
    return password

# returns the corresponding email for a given user id
def getEmail(id):
    conn = connect()
    cur = conn.cursor()

    cur.execute(
    	"SELECT email FROM Users WHERE id = %s", [id]
    )
    email = cur.fetchall()[0][0]
    cur.close()
    conn.close()
    return email

# returns the corresponding user id for a given email
def getUserIDFromEmail(email):
    conn = connect()
    cur = conn.cursor()

    cur.execute(
    	"SELECT id FROM Users WHERE email = %s", [email]
    )

    try:
        id = cur.fetchall()[0][0]
    except IndexError:
        id = None
    cur.close()
    conn.close()
    return id

# returns the corresponding address for a given user id
def getAddress(id):
    conn = connect()
    cur = conn.cursor()

    cur.execute(
    	"SELECT streetaddress, city, country, postcode FROM Users WHERE id = %s", [id]
    )
    address = cur.fetchall()[0]
    cur.close()
    conn.close()
    return address

# returns whether or not a given user is an admin
def getAdminStatus(id):
    conn = connect()
    cur = conn.cursor()

    cur.execute(
    	"SELECT admin FROM Users WHERE id = %s", [id]
    )
    admin = cur.fetchall()[0][0]
    cur.close()
    conn.close()
    return admin

# creates a new user from given paramters
# Note: id does not need to be specified, database generates it automatically
def addUser(name, password, email, phonenumber):
    conn = connect()
    cur = conn.cursor()

    query =  """INSERT INTO Users (id, name, email, password, phonenumber, admin) VALUES (DEFAULT, %s, %s, %s, %s, 'f');"""
    values = (name, password, email, phonenumber)

    cur.execute(query, values)
    conn.commit()
    cur.close()
    conn.close()
    #TODO: error handling

# creates a new user with admin permissions from given parameters
# NOTE: id does not need to be specified, database generates it automatically
def addAdmin(name, password, email, phonenumber):
    conn = connect()
    cur = conn.cursor()

    query =  """INSERT INTO Users (id, name,  email, password, phonenumber, admin) VALUES (DEFAULT, %s, %s, %s, %s, 't');"""
    values = (name, password, email, phonenumber)

    cur.execute(query, values)
    conn.commit()
    cur.close()
    conn.close()
    print("Admin succesfully added")
    #TODO: error handling

def updateUser(id, newName, newEmail, newPassword, newPhoneNumber, newStreetAddress, newCity, newState, newCountry, newPostcode):
    conn = connect()
    cur = conn.cursor()

    query =  """UPDATE Users SET name = %s, email = %s, password = %s, phonenumber = %s, streetaddress = %s, city = %s, state = %s, country = %s, postcode = %s WHERE id = %s;"""
    values = (newName, newEmail, newPassword, newPhoneNumber, newStreetAddress, newCity, newState, newCountry, newPostcode, id)

    cur.execute(query, values)
    conn.commit()
    cur.close()
    conn.close()
    print("User succesfully updated")
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

    cur.close()
    conn.close()
    return categories



# get all products of a specific category
# returns a dictionary that stores all product information as a dictionary
# specs are stored in a dictionary within the dictionary with the key "specs"
# TODO: tidy
def getAllProducts(*args):

    decimalToFloat = psycopg2.extensions.new_type(
        psycopg2.extensions.DECIMAL.values,
        'decimalToFloat',
        lambda num, cur: float(num) if num is not None else None
    )
    psycopg2.extensions.register_type(decimalToFloat)

    # get all products of all categories
    if not args:
        try:
            conn = connect()
            cur = conn.cursor()
            # get product table column names
            productColumns = getColumns(cur, 'Products')

            #get get category table column names
            categories = getCategories()
            categoryColumns = {}
            for category in categories:
                columns = getColumns(cur, category)
                categoryColumns[category] = columns

            # get product details from Products table
            cur.execute(
            	"SELECT * from Products;"
            )

            products = []
            tuple = cur.fetchone()
            while tuple != None:
                info = {}
                for i in range(0, len(productColumns)):
                    info[productColumns[i]] = tuple[i]
                products.append(info)
                tuple = cur.fetchone()

            # get product specs from individual category tables
            for i in range(0, len(products)):
                product = products[i]
                id = product['id']
                category = product['category']
                query = "SELECT * FROM " + category + " WHERE id = %s;"
                cur.execute(query, [id])
                tuple = cur.fetchone()
                # create dictionary of specs
                specs = {}
                for j in range(1, len(tuple)):
                    columns = categoryColumns[category]
                    specs[columns[j]] = tuple[j]
                product['specs'] = specs
                products[i] = product
            conn.commit()
            cur.close()

        except (Exception, psycopg2.DatabaseError) as error:
            products = None
            print ("An error has occured: ")
            print (error)
        finally:
            conn.close()
            return products
    elif len(args) == 1:
        try:
            category = args[0]
            print('finding category:', category)
            conn = connect()
            cur = conn.cursor()
            # get column names
            cur.execute(
                "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'products' ORDER BY ORDINAL_POSITION"
            )
            productColumns = []
            t = cur.fetchone()
            while t != None:
                productColumns.append(t[0])
                t = cur.fetchone()

            cur.execute(
                "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = %s ORDER BY ORDINAL_POSITION", [category.lower()]
            )
            categoryColumns = []
            t = cur.fetchone()
            while t != None:
                categoryColumns.append(t[0])
                t = cur.fetchone()


            # get product details from Products table
            cur.execute(
            	"SELECT * FROM Products WHERE category = %s;", [category]
            )

            products = []
            tuple = cur.fetchone()
            while tuple != None:
                info = {}

                for i in range(0, len(productColumns)):
                    info[productColumns[i]] = tuple[i]
                products.append(info)
                tuple = cur.fetchone()

            # get product specs from individual category tables

            for i in range(0, len(products)):
                product = products[i]
                id = product['id']
                category = product['category']
                query = "SELECT * FROM " + category + " WHERE id = %s;"
                cur.execute(query, [id])
                tuple = cur.fetchone()
                # create dictionary of specs
                specs = {}
                for j in range(1, len(tuple)):
                    specs[categoryColumns[j]] = tuple[j]
                product['specs'] = specs
                products[i] = product
            conn.commit()
            cur.close()

        except (Exception, psycopg2.DatabaseError) as error:
            deleted = 0
            print ("An error has occured in getAllProducts")
            print (error)
        finally:
            conn.close()
            return products
    else:
        print('incorrect number of function arguments')
        return None

#TODO: tidy
def getProduct(id):
    try:
        conn = connect()
        cur = conn.cursor()

        productColumns = getColumns(cur, "products")
        cur.execute(
        	"SELECT * FROM Products WHERE id = %s", [id]
        )
        product = {}

        t = cur.fetchone()

        for i in range(0, len(productColumns)):
            product[productColumns[i]] = t[i]

        # get category COLUMNS
        categoryColumns = getColumns(cur, product['category'])
        query = "SELECT * FROM " + product['category'] + " WHERE id = %s"
        cur.execute(query, [id])
        t = cur.fetchone()
        specs = {}
        for i in range(0, len(categoryColumns)):
            specs[categoryColumns[i]] = t[i]
        product['specs'] = specs
    except (Exception, psycopg2.DatabaseError) as error:
        print ("An error has occured in getProduct")
        print (error)
        product = None
    finally:
        cur.close()
        conn.close()
        return product

# adds a product to the Database
# returns the productId if successful, 0 otherwise
# item should be passed in as a dictionary
# eg {name: "product name", price: "666.66",  type: "CPU", image: "whatever we're doing for images", description: "description text", stock: "500", specs: {manufacturer: "whoever", corecount:"6"}}
# please do not pass in an id, it is generated automatically
def addProduct(newProduct):
    try:
        conn = connect()
        cur = conn.cursor()

        # extract specs from dictionary
        specs = newProduct['specs']
        newProduct.pop('specs')

        # insert into product table
        columns = newProduct.keys()
        values = [newProduct[column] for column in columns]
        query = 'INSERT INTO Products (%s) values %s RETURNING id'
        cur.execute(query, (AsIs(','.join(columns)), tuple(values)))

        # get generated id of added item
        id = cur.fetchone()[0]
        specs['id'] = id

        # insert into category table
        category = newProduct['category']
        columns = specs.keys()
        values = [specs[column] for column in columns]
        query = 'INSERT INTO %s (%s) values %s RETURNING id'
        cur.execute(query, (AsIs(category), AsIs(','.join(columns)), tuple(values)))



        conn.commit()
        cur.close()
        added = 1

    except (Exception, psycopg2.DatabaseError) as error:
        print("An error has occured in addProduct")
        print (error)
        id = None
        added = 0

    finally:
        print("Item successfully added")
        conn.close()
        return id

# pass in the id and a dictionary of column:vallue pairs. Any columsn not
# included will be unchanged. Cannot be used to update id or category
# returns 1 on successful edit, 0 on failure
#TODO: prevent from updating category and id, tidy
def editProduct(id, editedProduct):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor()

        # extract product id and specs from dictionary
        specs = None
        if 'specs' in editedProduct:
            specs = editedProduct.pop('specs')

        # update Products table
        query = "UPDATE Products SET %s WHERE id = %s" % (', '.join("%s = %%s" % col for col in editedProduct.keys()), id)
        cur.execute(query, (tuple(editedProduct.values())))

        # update category table
        category = getCategoryFromID(cur, id)
        if specs != None:
            query = "UPDATE %s SET %s WHERE id = %s" % (category, ', '.join("%s = %%s" % col for col in specs.keys()), id)
            cur.execute(query, (tuple(specs.values())))

        status = 1
    except (Exception, psycopg2.DatabaseError) as error:
        print("An error has occured in editProduct")
        print(error)
        status = 0
    finally:
        conn.commit()
        conn.close()
        return status

# returns 1 if successful, 0 if unsuccessful. If it returns something greater
# than 1, something has gone seriously wrong
def deleteProduct(id):
    try:
        conn = connect()
        cur = conn.cursor()

        cur.execute(
        	"DELETE FROM Products WHERE id = %s", [id]
        )
        deleted = cur.rowcount

        conn.commit()
        cur.close()

    except (Exception, psycopg2.DatabaseError) as error:
        deleted = 0
        print("An error has occured in deleteProduct")
        print (error)
    finally:
        conn.close()
        return deleted

# ~~~~~~~~~~ BULD A PC FUNCTIONS ~~~~~~~~~~

# create a new, empty build
# returns id of new buiid if successful, None otherwise
def addNewBuild(userid, buildName, buildDescription):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor()

        # insert into builds tables
        query = "INSERT INTO Builds (userid, buildname, description) VALUES (%s, %s, %s) RETURNING buildid"
        cur.execute(query, (userid, buildName, buildDescription))

        # get generated build id
        buildID = cur.fetchone()[0]
        # commit and close database
        conn.commit()
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        buildID = None
        print ("An error has occured in addNewBuild()")
        print(error)
    finally:
        conn.close()
        return buildID

# adds a part to an existing build
# returns 1 if successful. 0 otherwise
# TODO: check that quantity is greater than 0
def addPartToBuild(buildID, productID, quantity):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor()

        # insert into builds tables
        query = "INSERT INTO BuildParts (buildid, productid, quantity) VALUES (%s, %s, %s) RETURNING buildid"
        cur.execute(query, (buildID, productID, quantity))

        # get generated build id
        status = 1
        # commit and close database
        conn.commit()
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        status = 1
        print ("An error has occured in addPartToBuild()")
        print(error)
    finally:
        conn.close()
        return status

# gets a specific build
# if successful, returns a dictionary otherwise, returns None
# {id, name, description, parts:({productID, quantity}, etc)}
def getBuild(buildID):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor(cursor_factory = psycopg2.extras.DictCursor)

        # get build
        query = "SELECT * FROM Builds WHERE buildid = %s"
        cur.execute(query, [buildID])

        # convert row to dictionary
        record = cur.fetchone()
        build = {column:data for column, data in record.items()}

        # get build parts
        query = "SELECT productid, quantity FROM BuildParts WHERE buildid = %s"
        cur.execute(query, [buildID])
        rows = cur.fetchall()
        build['parts'] = [{column:data for column, data in record.items()} for record in rows]

        # commit and close database
        conn.commit()
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        build = None
        print ("An error has occured in getBuild()")
        print(error)
    finally:
        conn.close()
        return build

# gets all builds by a specific user
# if successful, returns a list of dictionaries. If user has no builds, will
# return an empty list. if an error has occured, returns None.
# build dictionary: {id, name, description, parts:({productID, quantity}, etc)}
def getUsersBuilds(userID):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor(cursor_factory = psycopg2.extras.DictCursor)

        # get builds
        builds = []
        query = "SELECT * FROM Builds WHERE userid = %s"
        cur.execute(query, [userID])

        # convert rows to list of dictionaries
        rows = cur.fetchall()
        builds = [{column:data for column, data in record.items()} for record in rows]

        # get parts for each build and add to build's dictionary
        for build in builds:
            query = "SELECT productid, quantity FROM BuildParts WHERE buildid = %s"
            cur.execute(query, [build['buildid']])
            rows = cur.fetchall()
            build['parts'] = [{column:data for column, data in record.items()} for record in rows]

        # commit and close database
        conn.commit()
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        builds = None
        print ("An error has occured in getUsersBuilds()")
        print(error)
    finally:
        conn.close()
        return builds

# deletes a part from a build
# returns 1 if successful, 0 otherwise
def removePartFromBuild(buildID, productID):
    try:
        conn = connect()
        cur = conn.cursor()

        query = "DELETE FROM BuildParts WHERE buildid = %s AND productid = %s"
        cur.execute(query, (buildID, productID))
        deleted = cur.rowcount

        conn.commit()
        cur.close()

    except (Exception, psycopg2.DatabaseError) as error:
        deleted = 0
        print("An error occured in removePartFromBuild")
        print (error)
    finally:
        conn.close()
        return deleted

# deletes a build entirely
# returns 1 if successful, 0 otherwise
def deleteBuild(buildID):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor()

        # delete build from database
        query = "DELETE FROM Builds WHERE buildid = %s"
        cur.execute(query, [buildID])
        deleted = cur.rowcount

        # commit changes and close connection
        conn.commit()
        cur.close()

    except (Exception, psycopg2.DatabaseError) as error:
        deleted = 0
        print("An error occured in deleteBuild()")
        print (error)
    finally:
        conn.close()
        return deleted

# updates the quantity of a part in a given build
# returns 1 if successful, 0 otherwise
# TODO: check that newQuantity is greater than 0
def updatePartQuantity(buildID, productID, newQuantity):
    try:
        conn = connect()
        cur = conn.cursor()

        query = "UPDATE BuildParts SET quantity = %s WHERE buildid = %s AND productid = %s"
        cur.execute(query, (newQuantity, buildID, productID))

        status = 1
        conn.commit()
        cur.close()

    except (Exception, psycopg2.DatabaseError) as error:
        status = 0
        print("An error occured in updatePartQuantity()")
        print (error)
    finally:
        conn.close()
        return status

# ~~~~~~~~~~ REVIEW FUNCTIONS ~~~~~~~~~~
# adds a review to a product
# returns generated id of review if successful, None otherwise
# reviewDate must be in format yyyy-mm-dd
# TODO: check that rating is between 0 and 5, check that reviewDate is in correct format
def addReview(productID, userID, rating, reviewText, reviewDate):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor()

        # insert into reviews table
        query = "INSERT INTO Reviews (productid, userid, rating, reviewtext, reviewdate) VALUES (%s, %s, %s, %s, %s) RETURNING reviewid"
        cur.execute(query, (productID, userID, rating, reviewText, reviewDate))

        # get generated review id
        reviewID = cur.fetchone()[0]
        # commit and close database
        conn.commit()
        cur.close()

    except (Exception, psycopg2.DatabaseError) as error:
        reviewID = None
        print ("An error has occured in addReview()")
        print(error)

    finally:
        conn.close()
        return reviewID

# gets all reviews for a specific product
# if successful, returns a list of dictionaries. If a product has no reviews,
# returns an empty list. If an error has occured, returns none
# review dictionary: {reviewid, productid, userid, rating, reviewtext, reviewdate}
def getProductReviews(productID):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor(cursor_factory = psycopg2.extras.DictCursor)

        # get reviews
        reviews = []
        query = "SELECT * FROM Reviews WHERE productid = %s"
        cur.execute(query, [productID])

        # convert rows to list of dictionaries
        rows = cur.fetchall()
        reviews = [{column:data for column, data in record.items()} for record in rows]

        # commit and close database
        conn.commit()
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        reviews = None
        print ("An error has occured in getProductReviews()")
        print(error)
    finally:
        conn.close()
        return reviews

# ~~~~~~~~~~ HELPER FUNCTIONS ~~~~~~~~~~

def getColumns(cur, table):
    cur.execute(
        "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = %s ORDER BY ORDINAL_POSITION", [table.lower()]
    )
    columns = []
    t = cur.fetchone()
    while t != None:
        columns.append(t[0])
        t = cur.fetchone()
    return columns

def getCategoryFromID(cur, id):
    query = "SELECT Category FROM Products WHERE id = %s"
    cur.execute(query, [id])
    return cur.fetchone()[0]


print(getAllUsers())
print(getAllProducts())
# cpu = { 'name': 'fuly sick cpu',
#         'category': 'CPU',
#         'brand': 'supreme',
#         'price': 199.99,
#         'image': '',
#         'warranty': '1 year',
#         'description': 'lit',
#         'stock': 525,
#         'specs': {  'cores': 8,
#                     'threads': 16,
#                     'base_clock': 6.0,
#                     'max_clock': 6.4,
#                     'socket': 'your mum',
#                     'cooler_included': True,
#                     'overclockable': True,
#                     'power_use': 100.2,
#         }}
