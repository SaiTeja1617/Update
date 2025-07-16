from decimal import Decimal
from django.shortcuts import render

from rest_framework.generics import ListAPIView,ListCreateAPIView,RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework import status
from .serializer import UserSerializer,MetroSerializer,StationSerializer,metrocardserializer,HistorySerializer
from rest_framework.authtoken.models import Token

from ticket.models import Booking, Metrostations, metroticket_bookinghistory,Metrocard
import random
import qrcode 
import io
import base64
import json

from ticket import serializer
# Create your views here.
@api_view(['GET','POST'])
def registeruser(request):
    if request.method == 'GET':
        return Response({"message": "Please use POST method to register a user."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    if request.method =='POST':    
        s_obj=UserSerializer(data=request.data)
        print(s_obj)
        if s_obj.is_valid()== True:
            user_obj=s_obj.save()
            user_obj.set_password(s_obj.validated_data['password'])
            user_obj.save()
            token_obj=Token.objects.create(user=user_obj)
            credentials={
                'Username':user_obj.username,
                'Token':token_obj.key
            }
            return Response(credentials,status=status.HTTP_201_CREATED)
        else:
            print("Serializer Errors:", serializer.errors)
            return Response(s_obj.errors,status=status.HTTP_400_BAD_REQUEST)
    
def generate_ticket(validated_data):
    print(validated_data)
    f_stid_obj = Metrostations.objects.get(stdname=validated_data['from_station']).stid
    print(f_stid_obj)
    t_stid_obj = Metrostations.objects.get(stdname=validated_data['to_station']).stid
    print(t_stid_obj) 
    color1=f_stid_obj[0]
    stid1=int(f_stid_obj[1:])
    color2=t_stid_obj[0]
    stid2=int(t_stid_obj[1:])
    if color1 == color2:
        fare=abs((stid1)-(stid2))*10
    elif color1 == 'I' or color2 =='I':
        fare=abs((stid2)-(stid1))*10
    elif color1 != color2:
        fare=(abs(stid1-5)+abs(5-stid2))*10
    
    
    age=validated_data.get('age')
    if age<=14:
        fare=fare*0.25
    elif age>=50:
        fare=fare*0.5
    else:
        fare=fare
    
    tktno=random.randint(11111,99999)
    qr_data=f"Name:{validated_data['name']},Age:{validated_data['age']},From:{validated_data['from_station']},TO:{validated_data['to_station']},Fare:{fare},Ticketno:{tktno}"
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=3,
        border=4,
    )
    qr.add_data(qr_data)
    qr.make(fit=True)
    img = qr.make_image(fill="blue", back_color="white")
    buffered = io.BytesIO()
    img.save(buffered)
    qr_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
    return fare,tktno,qr_base64


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def book_ticket(request):
    print(request.data)
    metro_obj=MetroSerializer(data=request.data)
    # print(metro_obj)
    if metro_obj.is_valid()==True:
        
        username=request.user.username
        from_station = metro_obj.validated_data['from_station']
        to_station = metro_obj.validated_data['to_station']  
        existing_ticket = Booking.objects.filter(
            p_name=metro_obj.validated_data['name'],
            age=metro_obj.validated_data['age'],
            f_station=from_station,
            to_station=to_station
        ).first()

        if existing_ticket:
            
            response_data = {
                'fare': existing_ticket.fare,
                'tktno': existing_ticket.tktno,
                'qr_code': None 
            }
            return Response(response_data, status=status.HTTP_200_OK)      
        
        fare, tktno, qrcode = generate_ticket(metro_obj.validated_data)
        
        
        if fare is None or tktno is None:
            return Response({"error": "Invalid station name."}, status=status.HTTP_400_BAD_REQUEST)
        newtkt_no=random.randint(11111,99999)
        metroticket_bookinghistory.objects.create(
            user_name=username,
            f_station=metro_obj.validated_data['from_station'],
            t_station=metro_obj.validated_data['to_station'],
            booking_id=newtkt_no
        )
        booking_obj = Booking.objects.create(
            tktno=tktno,
            p_name=metro_obj.validated_data['name'],
            age=metro_obj.validated_data['age'],
            f_station=metro_obj.validated_data['from_station'],
            to_station=metro_obj.validated_data['to_station'],
            fare=fare
        )
        response_data = metro_obj.validated_data .copy()
        
        response_data['fare'] = fare
        response_data['tktno'] = tktno
        response_data['qr_code'] = qrcode

                        
        
        return Response(response_data,status=status.HTTP_201_CREATED)
        

    return Response(metro_obj.errors,status=status.HTTP_400_BAD_REQUEST)  
    


@api_view(['GET'])
def getstations(request):
    if request.method=='GET':
        station_names=Metrostations.objects.all()
        metro_obj=StationSerializer(station_names,many=True)
        return Response(metro_obj.data,status=status.HTTP_200_OK)
@api_view(['GET'])    
def getbookings(request,username):
    if not username:
        return Response({"error": "Username is required"}, status=status.HTTP_400_BAD_REQUEST)
    Bookings= metroticket_bookinghistory.objects.filter(user_name=username).order_by('id')[:10]
    if not Bookings:
        return Response({"error": "No bookings found for the user"}, status=status.HTTP_404_NOT_FOUND)
    Booking_list=[
        {
            "name":Booking.user_name,
            "from_station":Booking.f_station,
            "to_station":Booking.to_station,
            "tktno":Booking.tktno
        }
        for booking in Bookings
        
    ]
    return Response(Booking_list,status=status.HTTP_200_OK)
    
@api_view(["POST"])
def metrocard(request):
    print(request.data)
    Mc_obj=metrocardserializer(data=request.data)
    
    if Mc_obj.is_valid():
        Mc_obj.save()
    try:
        card_number=request.data.get("card_number")
        amount=request.data.get('amount')
        if not card_number:
            return Response({'message':'card_number is required'},status=400)
        card=Metrocard.objects.filter(card_number=card_number).first()
        
        if amount is None or Decimal(amount)<0:
            return Response({'message':"amount is required and amount must be greater trhan Zero(0)"},status=400)
        
        card.balance += Decimal(str(amount))
        card.save()
        return Response({'message':"Recharge Succefull",'updated_balance':str(card.balance)})
    except Exception as e:
        return Response({'message':f'Error:{str(e)}'},status=500)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def history(request):
    print("Logged-in user:", request.user) 
    username = request.user.username
    print("Logged.in user:", username) 
    
    history = metroticket_bookinghistory.objects.filter(user_name=username)
    print("Queryset result:", history)  
    
    if not history:
        return Response({"message": "No history found for this user."}, status=404)
    
    serializer = HistorySerializer(history, many=True)
    return Response(serializer.data)
