# myapp/consumers.py

import json
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async
from .models import Room, User
from uuid import uuid4
import json
connectedUsers = []
rooms = []
array = []


class ChatConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        print(self.channel_name)
        self.test = []
        self.room_id = None
        await self.accept()

    async def disconnect(self, close_code):
        await self.leave_room()

    async def receive_json(self, text_data):

        data = text_data['data']
        if text_data['type'] == 'create-new-room':
            await self.create_new_room(data)
        elif text_data['type'] == 'join-room':
            await self.join_user_to_room(data)
        elif text_data['type'] == "conn-signal":
            await self.SignallingHandler(data)
        elif text_data['type'] == "conn-init":
            await self.InitialConnectionHandler(data)
        elif text_data['type'] == 'init-user':
            await self.InitUser(data)
        elif text_data['type'] == "get-socket-id":
            await self.SendSocketId()
        elif text_data['type'] == "direct-message":
            await self.sendDirectMessage(data)
        elif text_data['type'] == "send-acceptance-letter":
            await self.sendAcceptanceLetter(data)
        elif text_data['type'] == "ask-peer-to-prepare-conn":
            await self.askPeerToPrepareConn(data)
        elif text_data['type'] == "reject-join-request":
            await self.rejectJoinRequest(data)
        elif text_data['type'] == "block-user":
            await self.BlockUser(data)

    async def BlockUser(self, data):
        connUserSocketId = data['connUserSocketId']
        roomID = data['roomID']
        connUserIdentity = data['connUserIdentity']
        #get the room associated with the above user and block him
        #get old room
        userInstance = await self.get_user_instance(connUserIdentity)
        room = await self.get_old_room(userInstance, roomID)
        if room is not None:
            room.blocked = True
            await database_sync_to_async(room.save)()
        response = {
            "username": connUserIdentity,
            "type": "user-disconnected",
            "socketId": connUserSocketId,
            "blocked":True
        }
        await self.send_json_to_room(roomID, response)
        response = {
            "type": "user-blocked",
            "socketId": connUserSocketId,
            "blocked":True
        }
        await self.send_json_to_user(connUserSocketId, response)
        
    async def rejectJoinRequest(self, data):
        connUserSocketId = data['connUserSocketId']
        response = {
            "type": "reject-join-request",
            "connUserSocketId": self.channel_name
        }
        await self.send_json_to_user(connUserSocketId, response)
    
    async def askPeerToPrepareConn(self, data):
        connUserSocketId = data['connUserSocketId']
        response = {
            "type": "ask-peer-to-prepare-conn",
            "connUserSocketId": self.channel_name
        }
        await self.send_json_to_user(connUserSocketId, response)

    
    async def sendAcceptanceLetter(self, data):
        print('data',data)
        roomID = data['roomID']
        PeerUsername = data['PeerUsername']
        RoomHostUsername = data['RoomHostUsername']
        AuthorSocketId = None
        for user in connectedUsers:
            if user['roomID'] == roomID and user['identity'] == RoomHostUsername and user['isRoomHost'] == True:
                AuthorSocketId = user['socketId']
                break
        print('connectedUser',connectedUsers)
        print(AuthorSocketId)
        response = {
            "type": "acceptance-letter",
            "PeerUsername": PeerUsername,
            "RoomHostUsername":RoomHostUsername,
            "AuthorSocketId": AuthorSocketId,
            'connUserSocketId': self.channel_name
        }
        await self.send_json_to_user(AuthorSocketId, response)
                    

    async def sendDirectMessage(self, data):
        RecieverSocketId = data['RecieverSocketId']
        message = data['messageContent']
        AuthorIdentity = data['OurIdentity']
        File = data['File']
        id = data['id']
        
        response = {
            "type": "direct-message",
            "message": message,
            "id": id,
            "isAuthor": False,
            "File":File,
            "AuthorSocketID": self.channel_name,
            "RecieverSocketId": RecieverSocketId,
            "AuthorIdentity": AuthorIdentity,
            
        }
        await self.send_json_to_user(RecieverSocketId, response)
        AuthorData = {
            "type": "direct-message",
            "message": message,
            "isAuthor": True,
            "id": id,
            "File":File,
            "RecieverSocketId": RecieverSocketId,
            "AuthorSocketID": self.channel_name,
            "AuthorIdentity": AuthorIdentity,
            
        }
        await self.send_json({
            "type": "direct-message",
            "data": AuthorData
        })

    async def SendSocketId(self):
        response = {
            "type": "get-socket-id",
            "socketId": self.channel_name
        }
        await self.send_json_to_user(self.channel_name, response)

    async def InitUser(self, data):
        roomID = data['roomID']
        room = await self.get_created_room(roomID)
        if room is not None:
            self.send_json_to_user(self.channel_name, "create-room")
        else:
            self.send_json_to_user(self.channel_name, 'join-room')

    async def create_new_room(self, data):
        RoomCapacity = data['RoomCapacity']
        username = data['username']
        title = data['title']
        user = self.get_user(username)
        if user is not None:
            userInstance = await self.get_user_instance(username)
            room_id = data['roomID']
            room_name = room_id

            newUser = {
                "identity": username,
                "id": userInstance.id,
                "socketId": self.channel_name,
                "isRoomHost": True,
                "roomID": room_id
            }

            connectedUsers.append(newUser)

            self.test.append(newUser)
            newRoom = {
                "id": room_id,
                "connectedUsers": self.test
            }
            await self.join_room(room_id)

            rooms.append(newRoom)

            response = {
                'type': 'room-id',
                'roomID': room_id,
            }
            await self.send_json_to_room(room_id, response)

            response = {
                'type': 'room-update',
                'RoomCapacity': RoomCapacity,
                'title':title,
                'roomID': room_id,
                'connectedUsers': newRoom["connectedUsers"],
            }
            room = await self.save_room_and_user(room_id,title, userInstance, userInstance,RoomCapacity)
            await database_sync_to_async(room.save)()
            await self.send_json_to_room(room_id, response)
    @database_sync_to_async
    def save_participants(self,created_room):
        created_room.participants = created_room.participants + 1
        return created_room

    async def join_user_to_room(self, data):

        username = data['username']
        user = self.get_user(username)
        
        
        if user is not None:
            room_id = data['roomID']
            

            JoineduserInstance = await self.get_user_instance(username)
            created_room = await self.get_created_room(room_id)
            CreatedUserInstance = await self.get_user_of_created_room(room_id)
            old_room = await self.get_old_room(JoineduserInstance, room_id)
            if old_room is not None:
                newUser = {
                    "identity": username,
                    "id":  CreatedUserInstance.id,
                    "socketId": self.channel_name,
                    "isRoomHost": True,
                    "roomID": room_id
                }
                #set room is active as true
                
            else:
                newUser = {
                    "identity": username,
                    "id":  JoineduserInstance.id,
                    "socketId": self.channel_name,
                    "isRoomHost": False,
                    "roomID": room_id
                }
            room = [r for r in rooms if r['id'] == room_id][0]
            #need to check the room capacity if room capacity is lesser than number of participants in the room then its fine else send error message

            
            if room:
                
                
                if len(room['connectedUsers']) >= created_room.capacity:
                    response = {
                        'type': 'room-full',
                        'message': 'Room is full'
                    }
                    await self.send_json_to_user(self.channel_name, response)
                else:
                    print('room inside', room)
                    print(created_room)
                    room['connectedUsers'].append(newUser)
                    await self.join_room(room_id)
                    print(room['connectedUsers'])
                    for user in room['connectedUsers']:
                        if user['socketId'] != self.channel_name:
                            data = {
                                "type": "conn-prepare",
                                'connUserSocketId': self.channel_name,
                                'connUserIdentity': newUser['identity'],
                                'connUserId': newUser['id']
                            }
                            await self.send_json_to_user(user['socketId'], data)
                    connectedUsers.append(newUser)
                if old_room is None:
                    #update participants in host room
                    new_room = await self.save_room_and_user(room_id,created_room.name, CreatedUserInstance, JoineduserInstance,created_room.capacity)
                    await database_sync_to_async(new_room.save)()
                else:
                    room2 = await self.save_participants(old_room)
                    await database_sync_to_async(room2.save)()
                response = {
                    'type': 'room-update',
                    'RoomCapacity': created_room.capacity,
                    'roomID': room_id,
                    'title':created_room.name,
                    'connectedUsers': room["connectedUsers"],
                }
                await self.send_json_to_room(room_id, response)

    @database_sync_to_async
    def get_user_of_created_room(self, room_id):
        return Room.objects.filter(room_id=room_id).first().created_by

    
    
    @database_sync_to_async
    def get_created_room(self, room_id):
        return Room.objects.filter(room_id=room_id).first()

    @database_sync_to_async
    def get_old_room(self, userInstance, room_id):
        return Room.objects.filter(room_id=room_id).filter(joined_by=userInstance).first()
    @database_sync_to_async
    def get_new_room(self,userInstance,room_id):
        return Room.objects.filter(joined_by=userInstance).filter(room_id=room_id).first()
    @database_sync_to_async
    def remove_user_from_database(self, userInstance):
        return Room.objects.filter(joined_by=userInstance).delete()
    async def leave_room(self):
        print('room leaved')

        user = list(
            filter(lambda user: user['socketId'] == self.channel_name, connectedUsers))[0]
        print(user)
        if user:
            
            userInstance = await self.get_user_instance(user['identity'])
            #make the is_Active flag of that particluar user to False
            #get the room with the help of joined_by and room id flag both
            room = await self.get_new_room(userInstance, user['roomID'])
            if room is not None:
                #check if multiple same hosts are there in the room
                if room.participants == 1:
                    room.is_active = False
                room.participants = room.participants - 1
                await database_sync_to_async(room.save)()
            #remove the user from the connected users list
            connectedUsers.remove(user)
            #remove the user from the room
            room = list(
                filter(lambda room: room['id'] == user['roomID'], rooms))[0]
            room['connectedUsers'] = list(filter(
                lambda user: user["socketId"] != self.channel_name, room['connectedUsers']))

            response = {
                'type': 'room-update',
                'connectedUsers': room['connectedUsers'],
            }
            await self.send_json_to_room(user['roomID'], response)

            # send the socket id of the disconnected user
            response = {
                "type": "user-disconnected",
                "socketId": self.channel_name,
                "username": user['identity']
            }
            await self.send_json_to_room(user['roomID'], response)
            await self.channel_layer.group_discard(user['roomID'], self.channel_name)

    async def SignallingHandler(self, data):
        signal = data['signal']
        connUserSocketId = data['connUserSocketId']
        video = data['video']
        response = {
            "type": "conn-signal",
            "signal": signal,
            "video":video,
            "connUserSocketId": self.channel_name
        }
        await self.send_json_to_user(connUserSocketId, response)

    async def InitialConnectionHandler(self, data):
        connUserSocketId = data['connUserSocketId']
        connUserIdentity = data['connUserIdentity']
        response = {
            "type": "conn-init",
            "connUserSocketId": self.channel_name,
            "connUserIdentity":connUserIdentity
        }
        await self.send_json_to_user(connUserSocketId, response)

    @database_sync_to_async
    def get_connected_users(self, room_id):
        # Perform database operations or any other async operations here
        return []

    @database_sync_to_async
    def get_user(self, username):
        return User.objects.filter(username=username).first()

    @database_sync_to_async
    def get_user_instance(self, username):
        return User.objects.get(username=username)

    @database_sync_to_async
    def save_room_and_user(self, room_id, room_name, created_user, joined_user,RoomCapacity):
        room = Room.objects.create(
            room_id=room_id,
            name=room_name,
            capacity=RoomCapacity,
            is_active=True,
            created_by=created_user,
            participants=1,
            joined_by=joined_user
        )
        return room

    @database_sync_to_async
    def get_connectedUsers(self, room_id):
        pass

    @database_sync_to_async
    def get_rooms(self, room_id):
        pass

    async def join_room(self, room_id):

        self.room_name = room_id
        await self.channel_layer.group_add(self.room_name, self.channel_name)

    async def room_update(self, event):
        connected_users = event['connectedUsers']
        response = {
            'type': 'room-update',
            'connectedUsers': connected_users,
        }
        await self.send_json(response)

    async def send_json_to_room(self, room_id, data):
        await self.channel_layer.group_send(
            room_id,
            {
                'type': 'send_json',
                'data': data
            }
        )

    async def send_json_to_user(self, socket_id, data):
        await self.channel_layer.send(
            socket_id,
            {
                'type': 'send_json',
                'data': data
            }
        )

    async def send_json(self, event):
        data = event['data']
        await self.send(text_data=json.dumps(data))
