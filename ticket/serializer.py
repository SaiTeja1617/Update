from rest_framework import serializers;
from django.contrib.auth.models import User
from .models import Booking
from ticket.models import Metrostations,Metrocard,metroticket_bookinghistory

class MetroSerializer(serializers.Serializer):
    name=serializers.CharField(max_length=20)
    age=serializers.IntegerField()
    from_station=serializers.CharField(max_length=20)
    to_station=serializers.CharField(max_length=20)
    tktno=serializers.IntegerField(read_only=True)
    fare=serializers.IntegerField(read_only=True)

def validate_age(self,age):
    try:
        age = int(age)
    except (TypeError, ValueError):
        raise serializers.ValidationError("Age must be a valid number.")
    if age is None  :
        raise serializers.erros.validationError('Age can not be empty ')
    if not isinstance(age, int):  
        raise serializers.ValidationError("Age must be a number.")
    if age>100:
        raise serializers.ValidationError('Age should be less than 100')
    return age

def validate_from_station(self,from_station):
    station=Metrostations.objects.filter(stdname=from_station) 
    if len(station)==0:
        raise serializers.ValidationError(str(from_station)+"station is not available") 
    return from_station

def validate_tstation(self,to_station):
    station=Metrostations.objects.filter(stdname=to_station)
    if len(station)==0:
        raise serializers.ValidationError(str(to_station)+"station is not available")
    return to_station
def create(self, validated_data):  
        bobj=Booking.objects.create(tktno=validated_data['tktno'],\
        pname=validated_data['name'],from_station=validated_data['from_station'],\
            age=validated_data['age'],\
            to_station=validated_data['to_station'],fare=validated_data['fare'])
        return bobj
def create(self, validated_data):  

        booking = Booking.objects.create(
            tktno=validated_data['tktno'],
            pname=validated_data['name'],
            from_station=validated_data['from_station'],
            to_station=validated_data['to_station'],
            age=validated_data['age'],
            fare=validated_data['fare']
        )
        return booking

    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['username','password','email']
class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Metrostations
        fields=['stid','stdname']

class metrocardserializer(serializers.ModelSerializer):
     class Meta:    
          model=Metrocard
          fields=['card_number','expiry','balance'] 



class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model=metroticket_bookinghistory
        fields='__all__'