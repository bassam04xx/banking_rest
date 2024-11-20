from rest_framework import serializers
from .models import Client, Account, Transaction

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['cin', 'name', 'familyName', 'email']

class AccountSerializer(serializers.ModelSerializer):
    client = ClientSerializer()  # Nested serializer

    class Meta:
        model = Account
        fields = ['rib', 'client', 'balance', 'creation_date']

class TransactionSerializer(serializers.ModelSerializer):
    account = AccountSerializer()

    class Meta:
        model = Transaction
        fields = ['id', 'transactionType', 'account', 'amount', 'date', 'transfer_to_account']
