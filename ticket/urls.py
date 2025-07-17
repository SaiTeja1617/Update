from django.urls import path
from .import views
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns=[
    path('login/',obtain_auth_token),
    path('register/',views.registeruser),
    path('getstations/',views.getstations),
    path('ticket/',views.book_ticket),
    path('bookings/<str:username>/',views.getbookings),
    path('metrocard/',views.metrocard),
    path('history/',views.history),
]