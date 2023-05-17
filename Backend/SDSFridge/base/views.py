from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from django.utils import timezone

from base.models import Flow
from base.serializers import FlowSerializer

from pymongo import MongoClient
from bson import ObjectId
import json

class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super().default(obj)

client = MongoClient('mongodb+srv://andie:phT2kDLvOQz7I7dI@cluster0.cumzmxd.mongodb.net/test')
db = client['fridge']



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