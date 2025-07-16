from django.db import models
class Metrostations(models.Model):
    stid=models.CharField(max_length=5,primary_key=True)
    stdname=models.CharField(max_length=30)
    def __str__(self):
        return f'name : {str(self.stdname)}-id :{str(self.stid)}'
    
class Booking(models.Model):
    tktno=models.IntegerField(primary_key=True)
    p_name=models.CharField(max_length=20)
    age=models.IntegerField()
    f_station=models.CharField(max_length=20)
    to_station=models.CharField(max_length=20)
    fare=models.IntegerField()
    booking_date=models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"Ticket {self.tktno} - {self.p_name}"
    
class metroticket_bookinghistory(models.Model):
    booking_id=models.IntegerField(primary_key=True)
    f_station=models.CharField(max_length=20)
    t_station=models.CharField(max_length=20)
    user_name=models.CharField(max_length=20)
    def __str__(self):
        return f"{self.booking_id} - {self.user_name}"


class Metrocard(models.Model):
    card_number=models.BigIntegerField(primary_key=True)
    expiry=models.DateField()
    balance=models.DecimalField(max_digits=10 , decimal_places =2)
    def __str__(self):
        return f"{self.card_number}-{self.balance}"
    
