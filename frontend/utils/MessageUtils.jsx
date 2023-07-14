import { setDirectChatHistotry, setMessages } from "../store/actions"
import { store } from "../store/store"

export const sendDirectMessage = (message,socket, RecieverSocketId, OurIdentity,File,id) => {
    
        socket.current.send(JSON.stringify({
            type: 'direct-message',
            data: {
                id:id?id:null,
                File:File,
                RecieverSocketId: RecieverSocketId,
                OurIdentity: OurIdentity,
                messageContent: message,
            }
    
        }))
    
    document.getElementById('sendInput').value = null
     
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
            id:data?.id,
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
                id:data?.id,
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



export const sendMessage = (message, peers,type,TagDetails) => {
    if (message.length > 0) {

        sendMessageUsingDataChannel(message, peers,type,TagDetails)
        document.getElementById('sendInput').value = null
    }
}

export const appendNewMessage = async (message) => {
    const messages = store.getState().messages
    store.dispatch(setMessages([...messages, message]))
}


const sendMessageUsingDataChannel = (messageContent, peers,type,TagDetails) => {
    
    const identity = store.getState().identity
    let localMessageData;
    let messageData;
        localMessageData = {
            content: messageContent,
            identity: identity,
            messageCreatedByMe: true,
            tagged:TagDetails?.tagged,
            taggedBy:TagDetails?.taggedBy,
            taggedTo:TagDetails?.taggedTo,
            taggedMessage:TagDetails?.taggedMessage,
        }
    
        messageData = {
            content: messageContent,
            identity: identity,
            tagged:TagDetails?.tagged,
            taggedBy:TagDetails?.taggedBy,
            taggedTo:TagDetails?.taggedTo,
            taggedMessage:TagDetails?.taggedMessage,
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
