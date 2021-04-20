import sys
import random
import datetime
import psycopg2
import psycopg2.extras


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

start = datetime.datetime.strptime(sys.argv[1], "%Y-%m-%d")
end = datetime.datetime.strptime(sys.argv[2], "%Y-%m-%d")
date_generated = [start + datetime.timedelta(days=x) for x in range(0, (end-start).days)]

conn = connect()
cur = conn.cursor(cursor_factory = psycopg2.extras.DictCursor)


query = "select * from Users where admin = 'f'"
cur.execute(query)
rows = cur.fetchall()
users = [{column:data for column, data in record.items()} for record in rows]

orders = ""
current_order = 1
products = list(range(1, 134))
for date in date_generated:
    random.shuffle(users)
    for x in range(random.randint(0, 5)):
        # generate products dictionary
        order_items = {}
        random.shuffle(products)
        for y in range(random.randint(1, 10)):
            order_items[products[y]] = random.randint(1, 5)
        orders = orders + "addOrder(" +  str(users[x]['id']) + ", '" + date.strftime("%Y-%m-%d") + "', " + str(order_items) + ", '" + "', '".join((users[x]['streetaddress'], users[x]['city'], users[x]['state'], users[x]['country'], users[x]['postcode'])) + "')\n"

print(orders)
