from django.contrib import admin
from django.urls import path, include  # Add include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('account/', include('account_app.urls')),  # Include the SOAP API URLs
]
