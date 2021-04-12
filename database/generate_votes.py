import sys
import random



start = int(sys.argv[1])
end = int(sys.argv[2]) + 1
users = list(range(2, 22))
for x in range(start, end):
    string = ""
    z = 0
    random.shuffle(users)
    for y in range(random.randrange(10)):
        user = users[z]
        int = random.randint(0, 1)
        if int == 0:
            int = -1
        string = string + "({}, {}, {}), ".format(x, user, int)
        z = z + 1
    print(string)
