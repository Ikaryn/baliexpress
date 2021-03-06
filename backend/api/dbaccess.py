import psycopg2
import psycopg2.extras
from psycopg2.extensions import AsIs
from datetime import datetime
from . import credentials

# creates a connection to the database
def connect():
    conn = None
    #user=credentials.user,
    #        password=credentials.password
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
        print(email)

        # query Users table for ID
        query = "SELECT id, admin FROM Users WHERE email = %s"
        cur.execute(query, [email])
        id, admin = cur.fetchone()
    except (Exception, psycopg2.DatabaseError) as error:
        id = None
        admin = None
        print("An error has occured in getUserIDFromEmail")
        print(error)
    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return id, admin

# creates a new user from given paramters
# Note: id does not need to be specified, database generates it automatically
# returns users ID if successful, None otherwise
def addUser(name, password, email, phonenumber):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor()

        # insert new user into Users table
        query =  "INSERT INTO Users (name, password, email, phonenumber, admin) VALUES (%s, %s, %s, %s, 'f') RETURNING id"
        cur.execute(query, (name, password, email, phonenumber))

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

# place all fields that you would like to be edited in the editedUser dictionary
def updateUser(id, editedUser):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor()

        # update Users table
        query = "UPDATE Users SET %s WHERE id = %s" % (', '.join("%s = %%s" % col for col in editedUser.keys()), id)
        cur.execute(query, (tuple(editedUser.values())))

        # commit changes
        conn.commit()
        status = 1
    except (Exception, psycopg2.DatabaseError) as error:
        print("An error has occured in updateUser")
        print(error)
        status = 0
    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return status

# updates password of user with given id
# returns 1 if successful, 0 otherwise
def updatePassword(id, newPassword):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor()

        # update password in Users table
        query = "UPDATE Users SET password = %s WHERE id = %s;"
        cur.execute(query, (newPassword, id))

        # commit changes to database
        conn.commit()

        status = 1

    except (Exception, psycopg2.DatabaseError) as error:
        print("An error has occured in addUser")
        print(error)

        status = 0

    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return status

# ~~~~~~~~~~ PRODUCT FUNCTIONS ~~~~~~~~~~

# get all products. If category is specified, only get products from that category
# returns a list containting a dictionary for each product
# specs are stored in a dictionary within the dictionary with the key "specs"
def getAllProducts(*args):

    # create function to convert decimal type numbers to floats
    decimalToFloat = psycopg2.extensions.new_type(
        psycopg2.extensions.DECIMAL.values,
        'decimalToFloat',
        lambda num, cur: float(num) if num is not None else None
    )
    psycopg2.extensions.register_type(decimalToFloat)

    try:
        # connect to database
        conn = connect()
        cur = conn.cursor(cursor_factory = psycopg2.extras.DictCursor)

        # create list of categories to return
        if not args:
            categories = getCategories(cur)
        else:
            categories = args

        # check for current sales
        sales = getCurrentSales(cur)

        # get product information
        products = []
        productsQuery = "SELECT * FROM Products WHERE category = %s AND discontinued = 'f'"
        specsQuery = "SELECT * FROM %s WHERE id = %s"
        for category in categories:
            # get information from Products table
            cur.execute(productsQuery, [category])
            rows = cur.fetchall()

            # convert to dictionary
            newProducts = [{column:data for column, data in record.items()} for record in rows]

            for product in newProducts:
                # get specs for each product from relevant category table

                cur.execute(specsQuery, (AsIs(category), product['id']))
                record = cur.fetchone()
                specs = {column:data for column, data in record.items()}
                specs.pop('id')
                product['specs'] = specs

                # get sales data for each product from Sale_Products table
                product['sale'] = None
                for sale in sales:
                    query = "SELECT salepercent, sold FROM Sale_Products WHERE saleid = %s AND productid = %s"
                    cur.execute(query, (sale['id'], product['id']))
                    record = cur.fetchone()
                    if record:
                        saleInfo = {'saleid': sale['id'], 'salename': sale['name'], 'salepercent': record['salepercent'], 'sold': record['sold'] }
                        product['sale'] = saleInfo
            products.extend(newProducts)

    except (Exception, psycopg2.DatabaseError) as error:
        products = None
        print("An error has occured in getAllProducts")
        print(error)

    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return products

# gets product information for a single products
# returns dictionary containing product information if successful, None otherwise
def getProduct(id):

    # create function to convert decimal type numbers to floats
    decimalToFloat = psycopg2.extensions.new_type(
        psycopg2.extensions.DECIMAL.values,
        'decimalToFloat',
        lambda num, cur: float(num) if num is not None else None
    )
    psycopg2.extensions.register_type(decimalToFloat)

    try:
        # connect to database
        conn = connect()
        cur = conn.cursor(cursor_factory = psycopg2.extras.DictCursor)

        # get product information from Products table
        query = "SELECT * FROM Products WHERE id = %s AND discontinued = 'f'"
        cur.execute(query, [id])

        # convert to dictionary
        record = cur.fetchone()
        product = {column:data for column, data in record.items()}

        # get specs
        category = product['category']
        query = "SELECT * FROM %s WHERE id = %s"
        cur.execute(query, (AsIs(category), id))

        # convert to dictionary
        record = cur.fetchone()
        specs = {column:data for column, data in record.items()}

        # remove redundant information and add to product dictionary
        specs.pop('id')
        product['specs'] = specs

        # get sale information
        sales = getCurrentSales(cur)
        product['sale'] = None
        for sale in sales:
            query = "SELECT salepercent, sold FROM Sale_Products WHERE saleid = %s AND productid = %s"
            cur.execute(query, (sale['id'], product['id']))
            record = cur.fetchone()
            if record:
                saleInfo = {'saleid': sale['id'], 'salename': sale['name'], 'salepercent': record['salepercent'], 'sold': record['sold'] }
                product['sale'] = saleInfo

    except (Exception, psycopg2.DatabaseError) as error:
        print ("An error has occured in getProduct")
        print (error)
        product = None
    finally:
        # close connecction to database
        if (conn):
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
        # connect to database
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

        # commit chagnes to database
        conn.commit()

        added = 1

    except (Exception, psycopg2.DatabaseError) as error:
        print("An error has occured in addProduct")
        print (error)
        id = None

    finally:
        # close connecction to database
        if (conn):
            cur.close()
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

        # commit changes to database
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print("An error has occured in editProduct")
        print(error)
        status = 0
    finally:
        if (conn):
            cur.close()
            conn.close()
        return status

# changes the "discontinued" field for a product from False to True
# returns 1 if successful, 0 otherewise
# does not check if a product is already discontinued
def discontinueProduct(id):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor()

        # update "discontinued" field to True
        query = "UPDATE Products SET discontinued = 't' WHERE id = %s"
        cur.execute(query, [id])
        status = 1

        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        status = 0
        print("An error has occured in deleteProduct")
        print (error)
    finally:
        if (conn):
            cur.close()
            conn.close()
        return status
# returns 1 if successful, 0 if unsuccessful. If it returns something greater
# than 1, something has gone seriously wrong
def deleteProduct(id):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor()

        # delete product from Products table
        query = "DELETE FROM Products WHERE id = %s"
        cur.execute(query, [id])
        deleted = cur.rowcount

        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        deleted = 0
        print("An error has occured in deleteProduct")
        print (error)
    finally:
        if (conn):
            cur.close()
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
    except (Exception, psycopg2.DatabaseError) as error:
        buildID = None
        print ("An error has occured in addNewBuild()")
        print(error)
    finally:
        if (conn):
            cur.close()
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
    except (Exception, psycopg2.DatabaseError) as error:
        status = 0
        print ("An error has occured in addPartToBuild()")
        print(error)
    finally:
        # close connecction to database
        if (conn):
            cur.close()
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
    except (Exception, psycopg2.DatabaseError) as error:
        build = None
        print ("An error has occured in getBuild()")
        print(error)
    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return build

# gets all builds by a specific user
# if successful, returns a list of dictionaries. If user has no builds, will
# return an empty list. if an error has occured, returns None.
# build dictionary: {id, name, description, parts:({productID, quantity}, etc)}
def getUsersBuilds(userID):
    # create function to convert decimal type numbers to floats
    decimalToFloat = psycopg2.extensions.new_type(
        psycopg2.extensions.DECIMAL.values,
        'decimalToFloat',
        lambda num, cur: float(num) if num is not None else None
    )
    psycopg2.extensions.register_type(decimalToFloat)

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
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return builds

# deletes a part from a build
# returns 1 if successful, 0 otherwise
def removePartFromBuild(buildID, productID):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor()

        # delete part from BuildParts table
        query = "DELETE FROM BuildParts WHERE buildid = %s AND productid = %s"
        cur.execute(query, (buildID, productID))
        deleted = cur.rowcount

        conn.commit()

    except (Exception, psycopg2.DatabaseError) as error:
        deleted = 0
        print("An error occured in removePartFromBuild")
        print (error)
    finally:
        # close connecction to database
        if (conn):
            cur.close()
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

    except (Exception, psycopg2.DatabaseError) as error:
        deleted = 0
        print("An error occured in deleteBuild()")
        print (error)
    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return deleted


# updates the name and description of a build
# returns 1 if successful, 0 otherwise
def updateBuildDetails(buildID, buildName, buildDescription):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor()

        query = "UPDATE Builds SET buildname=%s, description=%s WHERE buildid=%s"
        cur.execute(query, (buildName, buildDescription, buildID))

        status = 1
        conn.commit()

    except (Exception, psycopg2.DatabaseError) as error:
        status = 0
        print("An error occured in updatePartQuantity()")
        print (error)
    finally:
        # close connecction to database
        if (conn):
            cur.close()
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

    except (Exception, psycopg2.DatabaseError) as error:
        reviewID = None
        print ("An error has occured in addReview()")
        print(error)

    finally:
        # close connecction to database
        if (conn):
            cur.close()
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

    except (Exception, psycopg2.DatabaseError) as error:
        deleted = 0
        print("An error occured in deleteReview()")
        print (error)
    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return deleted

# gets a single review with the specified ID
def getReview(reviewID):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor(cursor_factory = psycopg2.extras.DictCursor)

        # get review and convert to dictionary
        query = "SELECT * FROM Reviews WHERE reviewid = %s"
        cur.execute(query, [reviewID])

        row = cur.fetchone()
        review = {column:data for column, data in row.items()}

        # get votes and convert to dictionary
        query = "SELECT voterid, vote FROM Review_Votes WHERE reviewid = %s"
        cur.execute(query, [review['reviewid']])

        rows = cur.fetchall()
        votes = {}
        for row in rows:
            votes[row['voterid']] = row['vote']
        review['votes'] = votes

    except (Exception, psycopg2.DatabaseError) as error:
        review = None
        print ("An error has occured in getReview()")
        print(error)
    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return review

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

    except (Exception, psycopg2.DatabaseError) as error:
        reviews = None
        print ("An error has occured in getProductReviews()")
        print(error)
    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return reviews

# adds a report to the Report table
# returns report id if successful, None otherwise
def reportReview(reviewID, reason):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor()

        # insert report into Reports table
        query = "INSERT INTO Reports (reviewid, reason) VALUES (%s, %s) RETURNING reportid"
        cur.execute(query, (reviewID, reason))

        # get generated report id and commit changes to database
        reportID = cur.fetchone()[0]
        conn.commit()

    except (Exception, psycopg2.DatabaseError) as error:
        reportID = None
        print("An error occured in reportReview()")
        print (error)
    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return reportID

# return all reports
def getReports():
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor(cursor_factory = psycopg2.extras.DictCursor)

        # get all reports from Reports table
        query = "SELECT * FROM reports"
        cur.execute(query)

        rows = cur.fetchall()
        reports = [{column:data for column, data in record.items()} for record in rows]

    except (Exception, psycopg2.DatabaseError) as error:
        reports = None
        print("An error occured in getReports()")
        print (error)
    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return reports

# return all reports for a single review
# returns a list of reports if successful, None otherwise.
# if the review has no reports, an empty list will be returned
def getReviewReports(reviewID):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor(cursor_factory = psycopg2.extras.DictCursor)

        # get all reports from Reports table
        query = "SELECT * FROM reports WHERE reviewid = %s"
        cur.execute(query, [reviewID])

        rows = cur.fetchall()
        reports = [{column:data for column, data in record.items()} for record in rows]

    except (Exception, psycopg2.DatabaseError) as error:
        reports = None
        print("An error occured in getReviewReports()")
        print (error)
    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return reports

# returns number of reports deleted if successful, 0 otherwise
def deleteReports(reviewID):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor()

        # delete reports from database
        query = "DELETE FROM Reports WHERE reviewid = %s"
        cur.execute(query, [reviewID])
        deleted = cur.rowcount

        # commit changes and close connection
        conn.commit()

    except (Exception, psycopg2.DatabaseError) as error:
        deleted = 0
        print("An error occured in deleteReports()")
        print (error)
    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return deleted

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

    except (Exception, psycopg2.DatabaseError) as error:
        status = 0
        print ("An error has occured in addVote()")
        print(error)

    finally:
        # close connecction to database
        if (conn):
            cur.close()
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

    except (Exception, psycopg2.DatabaseError) as error:
        status = 0
        print ("An error has occured in editVote()")
        print(error)

    finally:
        # close connecction to database
        if (conn):
            cur.close()
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

    except (Exception, psycopg2.DatabaseError) as error:
        deleted = 0
        print("An error occured in deleteVote()")
        print (error)
    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return deleted

# ~~~~~~~~~~ ORDER FUNCTIONS ~~~~~~~~~~

# creates a new order
# please pass products as a dictionary, with productid as the key and quantity as the value
# date should be in the format yyyy-mm-dd
# returns order id if successful, None otherwise
def addOrder(userID, date, total, products, streetaddress, city, state, country, postcode):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor(cursor_factory = psycopg2.extras.DictCursor)

        # insert into Orders table
        query = "INSERT INTO Orders (userid, date, total, streetaddress, city, state, country, postcode) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)  RETURNING id"
        cur.execute(query, (userID, date, total, streetaddress, city, state, country, postcode))

        # get order id generated by database
        orderID = cur.fetchone()[0]

        orderItemsQuery = "INSERT INTO Order_Items (orderid, productid, quantity) VALUES (%s, %s, %s)"
        soldQuery = "UPDATE Products SET sold = sold + %s WHERE id = %s"
        salesSoldQuery = "UPDATE Sale_Products SET sold = SOLD + %s WHERE saleid = %s AND productid = %s"
        stockQuery = "UPDATE Products SET stock = stock - %s WHERE id = %s"
        currentSales = getSalesForDate(cur, date)
        print('Current sales are')
        print(currentSales)
        for productID, quantity in products.items():
            # insert products into Order_Items table
            cur.execute(orderItemsQuery, (orderID, productID, quantity))

            # increase sold count
            cur.execute(soldQuery, (quantity, productID))

            # update sale Sold count if product is on sale
            for sale in currentSales:
                saleID = sale['id']
                cur.execute(salesSoldQuery, (quantity, saleID, productID))

            # decrease product stock
            cur.execute(stockQuery, (quantity, productID))

        # commit changes to database
        conn.commit()

    except (Exception, psycopg2.DatabaseError) as error:
        orderID = None
        print ("An error has occured in addOrder()")
        print(error)

    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return orderID

def getOrder(orderID):

    # create function to convert decimal type numbers to floats
    decimalToFloat = psycopg2.extensions.new_type(
        psycopg2.extensions.DECIMAL.values,
        'decimalToFloat',
        lambda num, cur: float(num) if num is not None else None
    )
    psycopg2.extensions.register_type(decimalToFloat)

    try:
        # connect to database
        conn = connect()
        cur = conn.cursor(cursor_factory = psycopg2.extras.DictCursor)

        # get order information from Orders
        query = "SELECT * FROM Orders WHERE id = %s"
        cur.execute(query, [orderID])

        # convert to dictionary
        row = cur.fetchone()
        order = {column:data for column, data in row.items()}

        # get order items from Order_Items table
        query = "SELECT * FROM Order_Items WHERE orderID = %s"
        cur.execute(query, [orderID])
        rows = cur.fetchall()
        order['products'] = [{column:data for column, data in record.items()} for record in rows]

    except (Exception, psycopg2.DatabaseError) as error:
        order = None
        print ("An error has occured in getOrder()")
        print(error)

    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return order

def getUsersOrders(userID):

    # create function to convert decimal type numbers to floats
    decimalToFloat = psycopg2.extensions.new_type(
        psycopg2.extensions.DECIMAL.values,
        'decimalToFloat',
        lambda num, cur: float(num) if num is not None else None
    )
    psycopg2.extensions.register_type(decimalToFloat)

    try:
        # connect to database
        conn = connect()
        cur = conn.cursor(cursor_factory = psycopg2.extras.DictCursor)

        # get orders from Orders table
        query = "SELECT * FROM Orders WHERE userid = %s"
        cur.execute(query, [userID])

        # convert to dictionary
        rows = cur.fetchall()
        orders = [{column:data for column, data in record.items()} for record in rows]

        # get order items from Order_Items table
        query = "SELECT * FROM Order_Items WHERE orderID = %s"
        for order in orders:
            cur.execute(query, [order['id']])
            rows = cur.fetchall()
            order['products'] = [{column:data for column, data in record.items()} for record in rows]

    except (Exception, psycopg2.DatabaseError) as error:
        orders = None
        print ("An error has occured in getUsersOrders()")
        print(error)

    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return orders

def getAllOrders():

    # create function to convert decimal type numbers to floats
    decimalToFloat = psycopg2.extensions.new_type(
        psycopg2.extensions.DECIMAL.values,
        'decimalToFloat',
        lambda num, cur: float(num) if num is not None else None
    )
    psycopg2.extensions.register_type(decimalToFloat)

    try:
        # connect to database
        conn = connect()
        cur = conn.cursor(cursor_factory = psycopg2.extras.DictCursor)

        # get orders from Orders table
        query = "SELECT * FROM Orders"
        cur.execute(query)

        # convert to dictionary
        rows = cur.fetchall()
        orders = [{column:data for column, data in record.items()} for record in rows]

        # get order items from Order_Items table
        query = "SELECT * FROM Order_Items WHERE orderID = %s"
        for order in orders:
            cur.execute(query, [order['id']])
            rows = cur.fetchall()
            order['products'] = [{column:data for column, data in record.items()} for record in rows]

    except (Exception, psycopg2.DatabaseError) as error:
        orders = None
        print ("An error has occured in getAllOrders()")
        print(error)

    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return orders

# ~~~~~~~~~~ SALES FUNCTIONS ~~~~~~~~~~
#TODO: ensure that a product can't be on two sales at the same time
# creates a new sale
# returns sale id if successful, None otherwise
# dates should be in the format 'YYYY-MM-DD'
# products should be in the format [{productid, salepercent}, {productid, salepercent}, etc]
def addSale(name, startDate, endDate, products, image):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor()

        # insert into Sales table
        query = "INSERT INTO Sales (name, startdate, enddate, image) VALUES (%s, %s, %s, %s) RETURNING id"
        cur.execute(query, (name, startDate, endDate, image))

        # get sale id generated by database
        saleID = cur.fetchone()[0]

        # insert products into Sale_Products table
        query = "INSERT INTO Sale_Products(saleid, productid, salepercent) VALUES (%s, %s, %s)"
        for product in products:
            cur.execute(query, (saleID, product['productId'], product['sale %']))

        # commit changes to database
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        saleID = None
        print("An error occured in addSale()")
        print (error)
    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return saleID

# gets all information and products for a given sale
def getSale(saleID):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor(cursor_factory = psycopg2.extras.DictCursor)

        # get sales information from Sales table
        query = "SELECT * FROM Sales WHERE id = %s"
        cur.execute(query, [saleID])

        # convert to dictionary
        record = cur.fetchone()
        sale = {column:data for column, data in record.items()}

        # get product information from Sale_Products
        query = "SELECT * FROM Sale_Products WHERE saleid = %s"
        cur.execute(query, [saleID])

        # convert to dictionary and add to sale dictionary
        rows = cur.fetchall()

        sale['products'] = [{column:data for column, data in record.items()} for record in rows]
    except (Exception, psycopg2.DatabaseError) as error:
        sale = None
        print("An error occured in getSale()")
        print(error)

    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return sale

def getAllCurrentSales():
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor(cursor_factory = psycopg2.extras.DictCursor)

        # get the current sales from the database
        today = datetime.today().strftime('%Y-%m-%d')
        query = "SELECT * FROM Sales WHERE startdate <= %s AND enddate >= %s"
        cur.execute(query, (today, today))
        rows = cur.fetchall()
        currentSales = [{column:data for column, data in record.items()} for record in rows]

    except (Exception, psycopg2.DatabaseError) as error:
        currentSales = None
        print("An error occured in getAllCurrentSales()")
        print(error)

    finally:
        # close connection to database
        if (conn):
            cur.close()
            conn.close()
        return currentSales

def getAllSales():
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor(cursor_factory = psycopg2.extras.DictCursor)

        # get sales information from Sales table
        query = "SELECT * FROM Sales"
        cur.execute(query)

        # convert to dictionary
        rows = cur.fetchall()
        sales = [{column:data for column, data in record.items()} for record in rows]

    except (Exception, psycopg2.DatabaseError) as error:
        sale = None
        print("An error occured in getAllSales()")
        print(error)

    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return sales

# changes the sale percent for a given product in a given sale
# returns 1 if successful, 0 otherwise
def updateSalePercent(saleID, productID, newPercent):
    try:
        # connect to database
        conn = connect()
        cur = conn.cursor()

        # update percent
        query = "UPDATE Sale_Products SET salepercent = %s WHERE saleid = %s AND productid = %s"
        cur.execute(query, (AsIs(newPercent), saleID, productID))

        status = 1

    except (Exception, psycopg2.DatabaseError) as error:

        print ("An error has occured in updateSalePercent()")
        print(error)
        status = 0
    finally:
        # close connecction to database
        if (conn):
            cur.close()
            conn.close()
        return status


# ~~~~~~~~~~ HELPER FUNCTIONS ~~~~~~~~~~

def getCategoryFromID(cur, id):
    query = "SELECT Category FROM Products WHERE id = %s"
    cur.execute(query, [id])
    return cur.fetchone()[0]


# get all product categories
def getCategories(cur):
    cur.execute(
    	"SELECT unnest(enum_range(NULL::Categories));"
    )

    categories = []
    while True:
        t = cur.fetchone()
        if t == None:
            break
        categories.append(t[0])
    return categories

def getCurrentSales(cur):
    today = datetime.today().strftime('%Y-%m-%d')
    query = "SELECT id, name FROM Sales WHERE startdate <= %s AND enddate >= %s"
    cur.execute(query, (today, today))
    rows = cur.fetchall()
    sales = [{column:data for column, data in record.items()} for record in rows]
    return sales

def getSalesForDate(cur, date):
    query = "SELECT id, name FROM Sales WHERE startdate <= %s AND enddate >= %s"
    cur.execute(query, (date, date))
    rows = cur.fetchall()
    sales = [{column:data for column, data in record.items()} for record in rows]
    return sales
