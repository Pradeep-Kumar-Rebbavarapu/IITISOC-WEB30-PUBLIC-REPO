import os
from twilio.rest import Client

account_sid = 'AC09019a6abb7df7a930d28f477076e602'
auth_token = '18137cf86c37d776986910eba2670e90'
client = Client(account_sid, auth_token)

token = client.tokens.create()

print(token.username)