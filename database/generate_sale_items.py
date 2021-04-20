import random

products = list(range(1, 134))
for x in range(1, 7):
    random.shuffle(products)

    for y in range(random.randint(50, 133)):
        print("(" + str(x) + ", " + str(products[y]) + ", " + str(random.randint(10,90)) + "),")
