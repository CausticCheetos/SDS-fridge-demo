import threading
import time

def alert():
    while True:
        print("ASD")
        #collection = db['parameters']
        #data = list(collection.find())  
        #for x in data:
        #    print(x["name"])
        time.sleep(5)


t = threading.Thread(target=alert(), kwargs={})
t.setDaemon(True)
t.start()
print("x")