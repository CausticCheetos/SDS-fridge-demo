import tracemalloc
from django.shortcuts import render
from django.http import HttpResponse, response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework import generics

from django.utils import timezone

from base.models import Flow, Notification
from base.serializers import FlowSerializer, NotificationSerializer

from pymongo import MongoClient
from bson import ObjectId
import json
import time
import threading
import operator
class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super().default(obj)

client = MongoClient('mongodb+srv://andie:phT2kDLvOQz7I7dI@cluster0.cumzmxd.mongodb.net/test')
db = client['fridge']

paramsList = {
    "p1" : "maxigauge",
    "p2" : "maxigauge",
    "p3" : "maxigauge",
    "p4" : "maxigauge",
    "p5" : "maxigauge",
    "p6" : "maxigauge",
    "scroll1" : "valves",
    "scroll2": "valves",
    "turbo1": "valves",
    "turbo2": "valves",
    "pulsetube": "valves",
    "hs-still": "valves",
    "hs-mc": "valves",
    "ext": "valves",
    "compressor": "valves",
    "v1": "valves",
    "v2": "valves",
    "v3": "valves",
    "v4": "valves",
    "v5": "valves",
    "v6": "valves",
    "v7": "valves",
    "v8": "valves",
    "v9": "valves",
    "v10": "valves",
    "v11": "valves",
    "v12": "valves",
    "v13": "valves",
    "v14": "valves",
    "v15": "valves",
    "v16": "valves",
    "v17": "valves",
    "v18": "valves",
    "v19": "valves",
    "v20": "valves",
    "v21": "valves",
    "v22": "valves",
    "v23": "valves",
    "flow": "flow",
    "channel1" :"rtp",
    "channel2" :"rtp",
    "channel3" :"rtp",
    "channel4" :"rtp",
    "channel5" :"rtp",
    "channel6" :"rtp",
    "channel7" :"rtp",
    "channel8" :"rtp",
    "warning_state" : "Pulsetube",
    "warning_state_text" : "Pulsetube",
    "alarm_state" : "Pulsetube",
    "alarm_state_text" : "Pulsetube",
    "coolant_in_temperature" : "Pulsetube",
    "coolant_out_temperature" : "Pulsetube",
    "oil_temperature" : "Pulsetube",
    "helium_temperature" : "Pulsetube",
    "low_pressure" : "Pulsetube",
    "low_pressure_average" : "Pulsetube",
    "high_pressure": "Pulsetube",
    "high_pressure_average" : "Pulsetube",
    "delta_pressure_average" : "Pulsetube",
    "motor_current": "Pulsetube",
    "active_rotational_speed": "turbo1",
    "drive_power": "turbo1",
    "driver_temperature_too_high": "turbo1",
    "pump_temperature_too_high": "turbo1",
    "pump_accelerates": "turbo1",
    "rotation_speed_switch_point_attained": "turbo1",
    "setting_speed_attained": "turbo1",
    "active_rotational_speed": "turbo2",
    "drive_power": "turbo2",
    "driver_temperature_too_high": "turbo2",
    "pump_temperature_too_high": "turbo2",
    "pump_accelerates": "turbo2",
    "rotation_speed_switch_point_attained": "turbo2",
    "setting_speed_attained": "turbo2",
    "stillenabled" : "heater",
    "sampleenabled" : "heater",
    "stilloutput_power" : "heater",
    "sampleoutput_power" : "heater",
}

ops = {
    "+": operator.add,
    "-": operator.sub,
    "*": operator.mul,
    "<": operator.lt,
    ">": operator.gt,
    "=": operator.eq
} 

"""""
def alert():
    while True:
        collection = db['parameters']
        data = list(collection.find())  
        for x in data:
            #times needs to be implemented on front end 
            times = x["times"]
            collectionName = paramsList[x["paramType"]]
            #times needs to be implemented on front end 
            threshold = x["threshold"]
            #times needs to be implemented on front end 
            operator = ops[x['operator']]
            #rtp need another variable just for resistance, power, temperature
            rtp = x['rtp']
            innerCollection = db[collectionName]
            #check the latest numbers of log 
            warning = list(innerCollection.find({"id":x["paramType"]}).limit(times).sort("date",-1)) 
            #return true if they are above/below threshold value
            if rtp == "null":
                search = "value"
            else:
                search = rtp;
            sent = all( operator(y[search],threshold) for y in warning)
            #if sent:
                #implemet sending email
                #sent emails
        #time.sleep(60) #check everyminute 


t = threading.Thread(target=alert, kwargs={})
t.setDaemon(True)
t.start()
"""

def actualTimeToUnixTime(time):
    unixTimestamp = 1622095790 # replace with your Unix timestamp
    myTimezone = 'Australia/Sydney' # replace with your timezone

    actualTime = timezone.localtime(timezone.datetime.fromtimestamp(unixTimestamp), timezone.pytz.timezone(myTimezone))
    print("Actual time:", actualTime)
    return 0

def unixTimeToActualTime(unixTimeStamp):
    myTimezone = 'Australia/Sydney' # replace with your timezone

    actualTime = timezone.localtime(timezone.datetime.fromtimestamp(unixTimeStamp), timezone.pytz.timezone(myTimezone))
    print("Actual time:", actualTime)
    return actualTime

def get_flow(request):
    collection = db['flow']
    data = list(collection.find())
    return JsonResponse(data,encoder=CustomJSONEncoder, safe=False)

def get_pulsetube(request):
    collection = db['Pulsetube']
    data = list(collection.find())
    return JsonResponse(data,encoder=CustomJSONEncoder, safe=False)

def get_heater(request):
    collection = db['heater']
    data = list(collection.find())
    return JsonResponse(data,encoder=CustomJSONEncoder, safe=False)

def get_maxigauge(request):
    collection = db['maxigauge']
    data = list(collection.find())
    return JsonResponse(data,encoder=CustomJSONEncoder, safe=False)

def getActualFlow(request):
    collection = db['flow']
    data = list(collection.find())
    dates = [d['date'] for d in data]
    return JsonResponse(dates,encoder=CustomJSONEncoder, safe=False)

def get_past_rtp(request, greater,lesser):
    collection = db['rtp']
    data = list(collection.find({"date":{"$gt":greater , "$lt": lesser}}))    
    return JsonResponse(data,encoder=CustomJSONEncoder, safe=False)

def get_rtp(request):
    collection = db['rtp']
    data = list(collection.find().limit(50).sort("date",-1))
    return JsonResponse(data,encoder=CustomJSONEncoder, safe=False)

def get_maxigauge_latest(request):
    collection = db['maxigauge']
    data1 = list(collection.find({"id":"p1"}).limit(1).sort("date",-1))
    data2 = list(collection.find({"id":"p2"}).limit(1).sort("date",-1))
    data3 = list(collection.find({"id":"p3"}).limit(1).sort("date",-1))
    data4 = list(collection.find({"id":"p4"}).limit(1).sort("date",-1))
    data5 = list(collection.find({"id":"p5"}).limit(1).sort("date",-1))
    data6 = list(collection.find({"id":"p6"}).limit(1).sort("date",-1))
    data = data1 + data2+ data3+ data4 + data5 +data6
    return JsonResponse(data,encoder=CustomJSONEncoder, safe=False)

def get_flow_latest(request):
    collection = db['flow']
    data = list(collection.find({"id":"flow"}).limit(1).sort("date",-1))
    return JsonResponse(data,encoder=CustomJSONEncoder, safe=False)

def get_valves(request):
    collection = db['valves']
    data = []
    for i in range(1,24):
        name = "v" + str(i)
        data.append(list(collection.find({"id":name}).limit(1).sort("date",-1)))
    data.append(list(collection.find({"id":"scroll1"}).limit(1).sort("date",-1)))
    data.append(list(collection.find({"id":"scroll2"}).limit(1).sort("date",-1)))
    data.append(list(collection.find({"id":"turbo1"}).limit(1).sort("date",-1)))
    data.append(list(collection.find({"id":"turbo2"}).limit(1).sort("date",-1)))
    data.append(list(collection.find({"id":"pulsetube"}).limit(1).sort("date",-1)))
    data.append(list(collection.find({"id":"hs-still"}).limit(1).sort("date",-1)))
    data.append(list(collection.find({"id":"hs-mc"}).limit(1).sort("date",-1)))
    data.append(list(collection.find({"id":"ext"}).limit(1).sort("date",-1)))
    data.append(list(collection.find({"id":"compressor"}).limit(1).sort("date",-1)))
    return JsonResponse(data,encoder=CustomJSONEncoder, safe=False)


def post_parameters(request):
    collection = db['parameters']
    if request.method == "POST":
        data = json.loads(request.body)
        item = {
            "name" : data["name"],
            "description": data["description"],
            "paramType" : data["paramType"],
            "start": data["start"],
            "end": data["end"]
        }
        collection.insert_one(item)
        return HttpResponse(200)
    return HttpResponse(404)

def get_parameters(request):
    collection = db['parameters']
    data = list(collection.find())  
    return JsonResponse(data,encoder=CustomJSONEncoder, safe=False)

def delete_parameters(request,call):
    if request.method == "DELETE":
        collection = db['parameters']
        query = str(call)
        test = {"_id" : ObjectId(query)}
        collection.delete_one(test)
        return HttpResponse(200)
    
def login(request):
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')
        if email and password:
            collection = db['user']
            data = list(collection.find())
            user = data.find({}, {'email': email, 'password': password})
            if user:
                response.set_cookie('email', email, 3600)
                return JsonResponse(user, encoder=CustomJSONEncoder, safe=False)
    return JsonResponse('',encoder=CustomJSONEncoder, safe=False)

def registe(request):
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')
        firstname = request.POST.get('firstname')
        lastname = request.POST.get('lastname')

        if email and password and firstname and lastname:
            collection = db['user']
            data = list(collection.find())
            mydict = {"firstname": firstname, "lastname": lastname, "email": email,"password":password}
            result=data.insert_one(mydict)
            return JsonResponse(result, encoder=CustomJSONEncoder, safe=False)
    return JsonResponse('',encoder=CustomJSONEncoder, safe=False)

def logout(request):
    if request.method == "GET":
        response.delete_cookie('email')
        return JsonResponse('ok', encoder=CustomJSONEncoder, safe=False)
    return JsonResponse('',encoder=CustomJSONEncoder, safe=False)

class NotificationDetailView(generics.RetrieveAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

class NotificationCreateView(generics.CreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

class NotificationUpdateView(generics.UpdateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

class NotificationDeleteView(generics.DestroyAPIView):
    queryset = Notification.objects.all()
# Create your views here.

# @csrf_exempt
# def FlowApi(request, id=0):
#     if(request.method == 'GET'):
#         flow = flow.objects.all()
#         flow_serializer = FlowSerializer(flow, many = True)
#         return JsonResponse(flow_serializer.data, safe= False)


fridges = [
    {'id': 1, 'des': 'a dummy frontend'},
    {'id': 2, 'des': 'Create a new directory in your Django app directory to hold your React.js files. You can name this directory anything you want, but a common convention is to name it static/react.Create your React.js files in the static/react directory. This typically includes an index.html file that references your index.js file, which is where your React code will live.Use a module bundler such as Webpack to bundle your React.js files into a single bundle.js file that can be loaded by your Django app. You will need to configure Webpack to output the bundle.js file to a directory that your Django app can access, such as static/js.In your Django app''s views.py file, define a view function that renders your React.js index.html file.Create a URL pattern in your Django app' + 's urls.py file that maps to your React.js view function.Finally, in your Django app' + 's template file that corresponds to your React.js view, add a <script> tag that loads the bundle.js file and any other necessary dependencies. '},
]


def home(request):
    context = {'fridges': fridges}
    return render(request, 'base/home.html', context)

def fridge(request, pk):
    fridge = None
    for n in fridges:
        if n['id'] == int(pk):
            fridge = n
    context = {'fridge': fridge}
    return render(request, 'base/fridge.html', context)

