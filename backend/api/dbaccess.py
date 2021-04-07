import psycopg2
from psycopg2.extensions import AsIs
import psycopg2.extras
from . import credentials

def connect():
    conn = None
    try:
        conn = psycopg2.connect(database="baliexpress",
        user=credentials.user,
        password=credentials.password
        )
        conn.set_client_encoding('UTF8')
    except Exception as e:
        print(e)
        print("Unable to connect to the database")

    return conn

# ~~~~~~~~~~ USERS FUNCTIONS ~~~~~~~~~~
# returns all information about a single user
# returns a dictionary containing information if successful, None otherwise
def getUserInfo(userID):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor(cursor_factory = psycopg2.extras.DictCursor)

        # get user information from Users table
        query = "SELECT * FROM Users WHERE id = %s"
        cur.execute(query, [userID])

        # convert to dictinoary
        record = cur.fetchone()
        user = {column:data for column, data in record.items()}

    except (Exception, psycopg2.DatabaseError) as error:
        user = None
        print("An error has occured in getUserInfo")
        print(error)

    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return user

# get information on all users
# returns a list of dictionaries if successful, None otherwise
def getAllUsers():
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor(cursor_factory = psycopg2.extras.DictCursor)

        # get all users from Users
        query = "SELECT * FROM Users"
        cur.execute(query)

        # convert into list of dictionaries
        rows = cur.fetchall()
        users = [{column:data for column, data in record.items()} for record in rows]

    except (Exception, psycopg2.DatabaseError) as error:
        users = None
        print("An error occured in getAllUsers()")
        print(error)

    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return users

# returns the corresponding password for a given user ID if successful
# None otherwise
def getPassword(id):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor()

        # get password from Users table
        query = "SELECT password FROM Users WHERE id = %s"
        cur.execute(query, [id])
        password = cur.fetchone()[0]

    except (Exception, psycopg2.DatabaseError) as error:
        password = None
        print("An error has occured in getPassword")
    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return password

# returns the corresponding user id for a given email
# returns ID if successful, None otherwise
def getUserIDFromEmail(email):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor()

        # query Users table for ID
        query = "SELECT id FROM Users WHERE email = %s"
        cur.execute(query, [email])
        id = cur.fetchone()[0]
    except (Exception, psycopg2.DatabaseError) as error:
        id = None
        print("An error has occured in getUserIDFromEmail")
        print(error)
    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return id

# creates a new user from given paramters
# Note: id does not need to be specified, database generates it automatically
# returns users ID if successful, None otherwise
#TODO: get generated ID
def addUser(name, password, email, phonenumber):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor()

        # insert new user into Users database
        query =  "INSERT INTO Users (id, name, password, email, phonenumber, admin) VALUES (DEFAULT, %s, %s, %s, %s, 'f') RETURNING id"""
        values = (name, password, email, phonenumber)
        cur.execute(query, values)

        # get generated id of added user
        id = cur.fetchone()[0]

        # commit changes to database
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        id = None
        print("An error has occured in addUser")
        print(error)
    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return id

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

# ~~~~~~~~~~ BUILD A PC FUNCTIONS ~~~~~~~~~~

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

        newParts = []
        # get specs for each part
        for part in build['parts']:
            id = part['productid']
            print(id)
            query = "SELECT * FROM Products WHERE id = %s"
            cur.execute(query, [id])
            row = cur.fetchone()
            results = {column:data for column, data in row.items()}
            part = {**part, **results}
            # get specs
            category = part['category']
            query = "SELECT * FROM %s WHERE id = %s"
            cur.execute(query, (AsIs(category), id))
            row = cur.fetchone()
            part['specs'] = {column:data for column, data in row.items()}
            part.pop('id')
            part['specs'].pop('id')
            newParts.append(part)
        build['parts'] = newParts
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
            newParts = []
            # get specs for each part
            for part in build['parts']:
                id = part['productid']
                print(id)
                query = "SELECT * FROM Products WHERE id = %s"
                cur.execute(query, [id])
                row = cur.fetchone()
                results = {column:data for column, data in row.items()}
                part = {**part, **results}
                # get specs
                category = part['category']
                query = "SELECT * FROM %s WHERE id = %s"
                cur.execute(query, (AsIs(category), id))
                row = cur.fetchone()
                part['specs'] = {column:data for column, data in row.items()}
                part.pop('id')
                part['specs'].pop('id')
                newParts.append(part)
            build['parts'] = newParts
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

# deletes a review
# returns 1 if successful, 0 otherewise
def deleteReview(reviewID):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor()

        # delete review from database
        query = "DELETE FROM Reviews WHERE reviewid = %s"
        cur.execute(query, [reviewID])
        deleted = cur.rowcount

        # commit changes and close connection
        conn.commit()
        cur.close()

    except (Exception, psycopg2.DatabaseError) as error:
        deleted = 0
        print("An error occured in deleteReview()")
        print (error)
    finally:
        conn.close()
        return deleted

# gets all reviews for a specific product
# if successful, returns a list of dictionaries. If a product has no reviews,
# returns an empty list. If an error has occured, returns none
# review dictionary: {reviewid, productid, userid, rating, reviewtext, reviewdate, votes:{voterid, vote}}
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

        # for each review, get votes
        for review in reviews:
            query = "SELECT voterid, vote FROM Review_Votes WHERE reviewid = %s"
            cur.execute(query, [review['reviewid']])

            # convert vote rows to a dictionary
            rows = cur.fetchall()
            votes = {}
            for record in rows:
                votes[record['voterid']] = record['vote']
            review['votes'] = votes

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

# adds a vote to a review
# vote should be 1 for an upvote, -1 for a downvote
# returns 1 if successful, 0 otherwise
def addVote(reviewID, voterID, vote):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor()

        # insert into Review_Votes table
        query = "INSERT INTO Review_Votes (reviewid, voterid, vote) VALUES (%s, %s, %s)"
        cur.execute(query, (reviewID, voterID, vote))

        status = 1
        # commit and close database
        conn.commit()
        cur.close()

    except (Exception, psycopg2.DatabaseError) as error:
        status = 0
        print ("An error has occured in addVote()")
        print(error)

    finally:
        conn.close()
        return status

# changes an existing vote
# returns 1 if vote was successfully upsated, 0 otherwise
# Note: does not check if the newVote is different to the existing vote
def editVote(reviewID, voterID, newVote):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor()

        # edit vote
        query = "UPDATE Review_Votes SET vote = %s WHERE reviewid = %s AND voterid = %s"
        cur.execute(query, (newVote, reviewID, voterID))

        status = 1
        # commit and close database
        conn.commit()
        cur.close()

    except (Exception, psycopg2.DatabaseError) as error:
        status = 0
        print ("An error has occured in editVote()")
        print(error)

    finally:
        conn.close()
        return status

# Deletes a vote
# returns 1 if successful, 0 otherwise
def deleteVote(reviewID, voterID):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor()

        # delete vote from database
        query = "DELETE FROM Review_Votes WHERE reviewid = %s AND voterid = %s"
        cur.execute(query, (reviewID, voterID))
        deleted = cur.rowcount

        # commit changes and close connection
        conn.commit()
        cur.close()

    except (Exception, psycopg2.DatabaseError) as error:
        deleted = 0
        print("An error occured in deleteVote()")
        print (error)
    finally:
        conn.close()
        return deleted

# ~~~~~~~~~~ ORDER FUNCTIONS ~~~~~~~~~~

# creates a new order
# please pass products as a dictionary, with productid as the key and quantity as the value
# date should be in the format yyyy-mm-dd
# returns order id if successful, None otherwise
def addOrder(userID, date, products):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor()

        # insert into Review_Votes table
        query = "INSERT INTO Orders (userid, date) VALUES (%s, %s)  RETURNING id"
        cur.execute(query, (userID, date))

        # get order id generated by database
        orderID = cur.fetchone()[0]

        # insert products into Order_Items table
        for productID, quantity in products.items():
            query = "INSERT INTO Order_Items (orderid, productid, quantity) VALUES (%s, %s, %s)"
            cur.execute(query, (orderID, productID, quantity))

        # commit and close database
        conn.commit()
        cur.close()

    except (Exception, psycopg2.DatabaseError) as error:
        orderID = None
        print ("An error has occured in addOrder()")
        print(error)

    finally:
        conn.close()
        return orderID
# deletes an order
# returns 1 if successful, 0 otherwise
def deleteOrder(orderID):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor()

        # delete order from Orders table
        query = "DELETE FROM Orders WHERE id = %s"
        cur.execute(query, [orderID])
        deleted = cur.rowcount

        # delete order items from Order_Items
        query = "DELETE FROM Order_Items WHERE orderid = %s"
        cur.execute(query, [orderID])

        # commit changes and close connection
        conn.commit()
        cur.close()

    except (Exception, psycopg2.DatabaseError) as error:
        deleted = 0
        print("An error occured in deleteOrder()")
        print (error)
    finally:
        conn.close()
        return deleted

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


# ~~~~~~~~~~ UNUSED FUNCTIONS ~~~~~~~~~~
print(getUsersBuilds(1))
# # returns the corresponding email for a given user id
# def getEmail(id):
#     conn = connect()
#     cur = conn.cursor()
#
#     cur.execute(
#     	"SELECT email FROM Users WHERE id = %s", [id]
#     )
#     email = cur.fetchall()[0][0]
#     cur.close()
#     conn.close()
#     return email

# # returns the corresponding address for a given user id
# def getAddress(id):
#     conn = connect()
#     cur = conn.cursor()
#
#     cur.execute(
#     	"SELECT streetaddress, city, country, postcode FROM Users WHERE id = %s", [id]
#     )
#     address = cur.fetchall()[0]
#     cur.close()
#     conn.close()
#     return address

# # returns whether or not a given user is an admin
# def getAdminStatus(id):
#     conn = connect()
#     cur = conn.cursor()
#
#     cur.execute(
#     	"SELECT admin FROM Users WHERE id = %s", [id]
#     )
#     admin = cur.fetchall()[0][0]
#     cur.close()
#     conn.close()
#     return admin
