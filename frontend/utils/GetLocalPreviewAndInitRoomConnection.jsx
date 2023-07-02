import useWindowSize from "@rooks/use-window-size"
import axios from "axios"
import { createNewRoom } from "./CreateNewRoom"
import { JoinRoom } from "./JoinRoom"
import { toast } from 'react-toastify'
const defaultControls = {
    audio: true,
    video: {
        echoCancellation: true,
		noiseSuppression: true
    }
};


export const getLocalPreviewAndInitRoomConnection = (socket, localStream, isRoomHost, auth, roomID, setoverlay, title, IceServers, number) => {
    

    navigator.mediaDevices.getUserMedia(defaultControls).then((stream) => {

        localStream.current = stream;
        setoverlay(false)
        isRoomHost?createNewRoom(socket,auth, roomID, isRoomHost,title):JoinRoom(socket, auth, roomID)

    }).catch(err => {
        if (localStream.current) {
            localStream.current.getTracks().forEach(t => t.stop())
        }
        
        console.log(err)
        alert(err)
    })
}