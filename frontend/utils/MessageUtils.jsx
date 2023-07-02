import { setDirectChatHistotry, setMessages } from "../store/actions"
import { store } from "../store/store"

export const sendDirectMessage = (message,socket, RecieverSocketId, OurIdentity,File) => {
    socket.current.send(JSON.stringify({
        type: 'direct-message',
        data: {
            File:File,
            RecieverSocketId: RecieverSocketId,
            OurIdentity: OurIdentity,
            messageContent: message,
        }

    }))
}


export const appendNewMessageToChatHistory = (data) => {
    const { isAuthor, RecieverSocketId, AuthorSocketID } = data

    if (isAuthor) {
        addMessageToChatHistory(RecieverSocketId, data)
    }
    else {
        addMessageToChatHistory(AuthorSocketID, data)
    }
}

const addMessageToChatHistory = (userSocketId, data) => {
    const ChatHistory = [...store.getState().directChatHistory]
    const userChatHistory = ChatHistory.find((each) => each.socketId === userSocketId)

    if (userChatHistory) {
        const newDirectMessage = {
            isAuthor: data.isAuthor,
            content: data.message,
            identity: data.AuthorIdentity,
            File:data.File,
        }

        const newUserChatHistory = {
            ...userChatHistory,
            ChatHistory: [...userChatHistory.ChatHistory, newDirectMessage]
        }

        const newChatHistory = [
            ...ChatHistory.filter((each) => each.socketId !== userSocketId),
            newUserChatHistory

        ]
        store.dispatch(setDirectChatHistotry(newChatHistory))
    }
    else {
        const newUserChatHistory = {
            socketId: userSocketId,
            ChatHistory: [{
                isAuthor: data.isAuthor,
                content: data.message,
                identity: data.AuthorIdentity,
                File:data.File,
            }]
        }

        const newChatHistory = [...ChatHistory, newUserChatHistory]
        store.dispatch(setDirectChatHistotry(newChatHistory))
    }
}



export const sendMessage = (message, peers,type) => {
    if (message.length > 0) {

        sendMessageUsingDataChannel(message, peers,type)
        document.getElementById('sendInput').value = null
    }
}

export const appendNewMessage = async (message) => {
    const messages = store.getState().messages
    store.dispatch(setMessages([...messages, message]))
}


const sendMessageUsingDataChannel = (messageContent, peers,type) => {
    
    const identity = store.getState().identity
    let localMessageData;
    let messageData;
    if(type === "message"){
        localMessageData = {
            content: messageContent,
            identity: identity,
            messageCreatedByMe: true
        }
    
        messageData = {
    
            content: messageContent,
            identity: identity,
        }
    }
    else if(type === "file"){
        
    }
    
    
    appendNewMessage(localMessageData)
    const Chat_Area = document.getElementById('Chat_Area')
    setTimeout(() => {
        Chat_Area.scrollTop = Chat_Area.scrollHeight - Chat_Area.clientHeight;
    }, 100);
    const stringifiedMessageData = JSON.stringify({ message: true, messageData: messageData })

    for (let socketId in peers.current) {
        const peer = peers.current[socketId]
        peer.send(stringifiedMessageData)
    }
}
