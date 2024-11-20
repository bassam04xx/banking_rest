from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.generic import TemplateView
from rest_framework import status
from .models import Account, Client
from .serializers import AccountSerializer, ClientSerializer


class RestPageView(TemplateView):
    template_name = 'rest-page.html'
class AddAccountView(APIView):
    def post(self, request):
        data = request.data
        # Check if account already exists
        if Account.objects.filter(rib=data.get('rib')).exists():
            return Response({'error': 'This account already exists'}, status=status.HTTP_400_BAD_REQUEST)

        # Handle client creation
        client_data = data.get('client')
        client, created = Client.objects.get_or_create(
            cin=client_data['cin'],
            defaults={
                'name': client_data['name'],
                'familyName': client_data['familyName'],
                'email': client_data['email']
            }
        )

        # Create the account
        account = Account(
            rib=data['rib'],
            client=client,
            balance=data['balance']
        )
        account.save()

        return Response({'message': f'The account with RIB {account.rib} is successfully created.'}, status=status.HTTP_201_CREATED)


class GetAccountDetailsView(APIView):
    def get(self, request, email):
        account = Account.objects.filter(client__email__iexact=email).first()
        if not account:
            return Response({'error': f'There is no account for email {email}'}, status=status.HTTP_404_NOT_FOUND)

        serializer = AccountSerializer(account)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetAllAccountsView(APIView):
    def get(self, request):
        accounts = Account.objects.all()
        serializer = AccountSerializer(accounts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
