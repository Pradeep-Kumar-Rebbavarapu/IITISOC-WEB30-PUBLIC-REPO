import { store } from "../store/store"
import { setSocketId, setRoomId, setParticipants } from "../store/actions"
import { prepareNewPeerConnection } from "./prepareNewPeerConnection"
import { w3cwebsocket as W3CWebSocket } from "websocket"
import axios from 'axios'
import { toast } from "react-toastify"
import { getLocalPreviewAndInitRoomConnection } from "./GetLocalPreviewAndInitRoomConnection"
import { appendNewMessageToChatHistory } from "./MessageUtils"
import { handleReceiveData } from "./ShareFileUtils"
import MessageToast from "../components/MessageToast"
export const handleDisconnectedUser = (peers, socketId) => {
    const VideoGrid = document.getElementById('VideoGrid')


    const remotevideo = document.getElementById(`v_${socketId}`)
    if (remotevideo) {
        const tracks = remotevideo.srcObject.getTracks()
        tracks.forEach(t => t.stop())

        remotevideo.srcObject = null
        remotevideo.muted = true
        VideoGrid.removeChild(remotevideo)
    }
    if (peers.current[socketId]) {
        peers.current[socketId].destroy();
    }
    delete peers.current[socketId]

}



const handleSignallingData = (peers, data) => {
    peers.current[data.connUserSocketId].signal(data.signal)
}

let array = []

export const connectionWithSocketServer = (socket, peers, ScreenSharingStream, localStream, worker, setGotFile, FileNameRef, FileSentBy, setProgress, isDrawing, Transcript, IceServers, setIsJoinModal, setpeerUserID, innerWidth, length_of_participants, isHost, auth, roomID, setoverlay, title,setDownloadingText) => {
    socket.current = new WebSocket(`wss://www.pradeeps-video-conferencing.store/ws/chat/${roomID}`)

    socket.current.onopen = () => {
        socket.current.send(JSON.stringify({
            "type": "get-socket-id",
            data: {}
        }))
        getLocalPreviewAndInitRoomConnection(socket, localStream, isHost, auth, roomID, setoverlay, title, IceServers, 3)
    }

    socket.current.onmessage = (message) => {
        console.log(message)
        const data = JSON.parse(message.data)
        const type = data['type']
        if (type === "get-socket-id") {
            store.dispatch(setSocketId(data.socketId))
        }
        else if (type === "room-update") {

            const { connectedUsers } = data;

            localStorage.setItem('participants_length', connectedUsers.length)
            store.dispatch(setParticipants(connectedUsers))
        }
        else if (type == "conn-prepare") {


            const { connUserSocketId } = data
            setpeerUserID(connUserSocketId)

            prepareNewPeerConnection(socket, peers, connUserSocketId, false, ScreenSharingStream, localStream, isDrawing, Transcript, IceServers, innerWidth, length_of_participants,setDownloadingText)
            socket.current.send(JSON.stringify({
                "type": 'conn-init',
                data: {
                    connUserSocketId: connUserSocketId
                }
            }))
        }
        else if (type == "conn-signal") {


            const { signal, connUserSocketId } = data
            handleSignallingData(peers, data)
        }
        else if (type === "conn-init") {

            const { connUserSocketId } = data
            prepareNewPeerConnection(socket, peers, connUserSocketId, true, ScreenSharingStream, localStream, isDrawing, Transcript, IceServers, innerWidth, length_of_participants,setDownloadingText)
        }
        else if (type === "user-disconnected") {
            handleDisconnectedUser(peers, data['socketId'], length_of_participants, innerWidth)
        }
        else if (type === 'direct-message') {
            appendNewMessageToChatHistory(data)
        }
        else if (type === "file-transfering") {
            handleReceiveData(worker.current,data)
            if(data.done===true){
                toast(<MessageToast identity={data.identity} content={data.fileName}/>,{position:toast.POSITION.TOP_RIGHT})
                console.log(data.senderSocketId)
                socket.current.send(JSON.stringify({
                    type:'file-transfered',
                    data:{
                        senderSocketId:data.senderSocketId,
                        fileName:data.fileName
                    }
                }))
            }
        }

        else if(type === "file-transfered"){
            document.getElementById(`fileMsgBox${data.fileName}`).innerHTML = data.fileName
            
            
        }

    }

    socket.current.onerror = () => {

    }
}


