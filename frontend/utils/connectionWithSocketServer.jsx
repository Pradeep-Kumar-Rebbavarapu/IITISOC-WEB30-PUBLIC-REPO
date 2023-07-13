import { store } from "../store/store"
import { setSocketId, setRoomId, setParticipants, setIdentity, setIsRoomHost } from "../store/actions"
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

export const connectionWithSocketServer = (socket, peers, ScreenSharingStream, localStream, worker, setGotFile, FileNameRef, FileSentBy, setProgress, isDrawing, Transcript, IceServers, setIsJoinModal, setpeerUserID, innerWidth, length_of_participants, isHost, auth,user, roomID, setoverlay, title,setDownloadingText,BoardMap,setroomHostUsername,roomHostUsername,setPeerUsername,PeerUsername,RoomCapacity) => {
    socket.current = new WebSocket(`wss://www.pradeeps-video-conferencing.store/ws/chat/${roomID}`)

    socket.current.onopen = () => {
        socket.current.send(JSON.stringify({
            "type": "get-socket-id",
            data: {}
        }))
        getLocalPreviewAndInitRoomConnection(socket, localStream, isHost, auth,user, roomID, setoverlay, title, IceServers, RoomCapacity,length_of_participants)
    }

    socket.current.onmessage = (message) => {
        
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
            const { connUserSocketId,connUserIdentity } = data
            toast.info(`${connUserIdentity} has joined the meeting`,{position:toast.POSITION.TOP_LEFT})
            prepareNewPeerConnection(socket, peers, connUserSocketId, false, ScreenSharingStream, localStream, isDrawing, Transcript, IceServers, innerWidth, length_of_participants,setDownloadingText,BoardMap)
            socket.current.send(JSON.stringify({
                "type": 'conn-init',
                data: {
                    connUserSocketId: connUserSocketId,
                    connUserIdentity:connUserIdentity
                }
            }))
        }
        else if (type == "conn-signal") {


            const { signal, connUserSocketId } = data
            handleSignallingData(peers, data)
        }
        else if (type === "conn-init") {
            const { connUserSocketId,connUserIdentity } = data
            prepareNewPeerConnection(socket, peers, connUserSocketId, true, ScreenSharingStream, localStream, isDrawing, Transcript, IceServers, innerWidth, length_of_participants,setDownloadingText,BoardMap)
            
        }
        else if (type === "user-disconnected") {
            toast.warning(`${data.username} has left the meeting`,{position:toast.POSITION.TOP_LEFT})
            handleDisconnectedUser(peers, data['socketId'], length_of_participants, innerWidth)
        }
        else if (type === 'direct-message') {
            appendNewMessageToChatHistory(data)
        }
        else if(type==="acceptance-letter"){
            setroomHostUsername(data.RoomHostUsername)
            setPeerUsername(data.PeerUsername)
            setpeerUserID(data.connUserSocketId)
            setIsJoinModal(true)
        }
        else if(type === "ask-peer-to-prepare-conn"){
            
            store.dispatch(setIdentity(user.username));
            user.username === roomHostUsername
                ? store.dispatch(setIsRoomHost(true))
                : store.dispatch(setIsRoomHost(false));
              store.dispatch(setRoomId(roomID));
              const data = {
                roomID: roomID,
                username: user.username,
              };
              socket.current.send(
                JSON.stringify({
                  type: "join-room",
                  data: data,
                })
              );
        }
        

    }

    socket.current.onerror = () => {

    }
}


