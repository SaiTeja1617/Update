from django.contrib import admin
from .models import Metrostations,Booking,metroticket_bookinghistory,Metrocard

# Register your models here.

admin.site.register(Booking)
admin.site.register(metroticket_bookinghistory)
admin.site.register(Metrostations)
admin.site.register(Metrocard)

