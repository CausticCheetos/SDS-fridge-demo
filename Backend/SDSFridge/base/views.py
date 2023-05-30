from django.shortcuts import render
from django.http import HttpResponse, response, HttpRequest
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from twilio.rest import Client
from django.utils import timezone
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from base.models import Flow, Notification, UserEmail
from base.serializers import FlowSerializer, NotificationSerializer, ENotificationSerializer,SMSNotificationSerializer, EmailSerializer, UserEmailSerializer
from django.conf import settings
from pymongo import MongoClient
from bson import ObjectId
import json, vonage

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

def get_parameters_BE(request):
    collection = db['parameters']
    data = list(collection.find())  
    return data

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


#For Email
class UserEmailDetailView(generics.RetrieveAPIView):
    queryset = UserEmail.objects.all()
    serializer_class = UserEmailSerializer

class UserEmailCreateView(generics.CreateAPIView):
    queryset = UserEmail.objects.all()
    serializer_class = UserEmailSerializer

class UserEmailUpdateView(generics.UpdateAPIView):
    queryset = UserEmail.objects.all()
    serializer_class = UserEmailSerializer

class UserEmailDeleteView(generics.DestroyAPIView):
    queryset = UserEmail.objects.all()

def get_emails(request):
    emails = UserEmail.objects.values_list('EmailAddress', flat=True)
    email_list = list(emails)
    return JsonResponse(email_list, encoder=CustomJSONEncoder, safe=False)

def get_emails_BE(request):
    emails = UserEmail.objects.values_list('EmailAddress', flat=True)
    email_list = list(emails)
    return email_list

class SendNotificationEmailView(APIView):
    serializer_class = ENotificationSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            notifications = Notification.objects.all()
            message = ""
            for notification in notifications:
                message += f"Notification Id: {notification.NotificationId}\n"
                message += f"Param Name: {notification.ParamName}\n"
                message += f"Param Description: {notification.ParamDescription}\n"
                message += f"Param Type: {notification.ParamType}\n"
                message += f"Param Start Range: {notification.ParamStartRange}\n"
                message += f"Param End Range: {notification.ParamEndRange}\n\n"

            mail_subject = 'User Warning Parameter Notifications'
            to_email = email
            email = EmailMessage(mail_subject, message, to=[to_email])
            email.send()
            return Response({"message": "Email sent successfully."}, status=200)
        return Response(serializer.errors, status=400)


class SendSpecificNotificationEmailView(APIView):

    def post(self, request, format=None):
            request = HttpRequest()
            emails = get_emails_BE(request)
            notifications = get_parameters_BE(request)
            print(notifications)
            message = "Detected Parameter Overflow."
            for notification in notifications:
                message += f"{notification}\n\n\n\n"

            mail_subject = 'User Warning Parameter Notifications'
            for email in emails:
                email_message = EmailMessage(mail_subject, message, to=[email])
                email_message.send()
            return Response({"message": "Email sent successfully."}, status=200)

    
class SendNotificationSMSView(APIView):
    serializer_class = SMSNotificationSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            phone_number = serializer.validated_data.get('phone_number')
            notification_id = serializer.validated_data.get('notification_id')

            try:
                notification = Notification.objects.get(NotificationId=notification_id)
            except Notification.DoesNotExist:
                return Response({"error": "Notification with given id does not exist."}, status=400)

            message = f"""
                Notification Id: {notification.NotificationId}\n
                Param Name: {notification.ParamName}\n
                Param Description: {notification.ParamDescription}\n
                Param Type: {notification.ParamType}\n
                Param Start Range: {notification.ParamStartRange}\n
                Param End Range: {notification.ParamEndRange}\n\n
            """

            client = vonage.Client(key=settings.VON_KEY, secret=settings.VON_SECRET)
            sms = vonage.Sms(client)
            sms.send_message({
                'from': 'UTS Fridge Monitor',
                'to': phone_number,
                'text': message,
            })
            return Response({"message": "SMS sent successfully."}, status=200)
        return Response(serializer.errors, status=400)
    

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