import psycopg2

def connect():
    conn = None
    try:
        conn = psycopg2.connect(database="baliexpress",
      user="postgres",
      host="/tmp/",
      password="jlk1njk2"
    )
        conn.set_client_encoding('UTF8')
    except Exception as e:
        print("Unable to connect to the database")

    return conn
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
