from django.urls import path
from .views import RestPageView, AddAccountView, GetAccountDetailsView, GetAllAccountsView

urlpatterns = [
    path('', RestPageView.as_view(), name='rest-page'),  # Render the rest-page.html
    path('api/accounts/add/', AddAccountView.as_view(), name='add_account'),  # API to add an account
    path('api/accounts/<str:email>/', GetAccountDetailsView.as_view(), name='get_account_details'),  # API to get account details
    path('api/accounts/', GetAllAccountsView.as_view(), name='get_all_accounts'),  # API to get all accounts
]
