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


export const getLocalPreviewAndInitRoomConnection = (socket, localStream, isRoomHost, auth,user, roomID, setoverlay, title, IceServers, RoomCapacity,length_of_participants,setRoomDetails) => {
    

    navigator.mediaDevices.getUserMedia(defaultControls).then((stream) => {
        localStream.current = stream;
        isRoomHost?createNewRoom(socket,auth,user, roomID, isRoomHost,title,RoomCapacity):JoinRoom(socket, auth,user, roomID,length_of_participants)
        const delayTime = 0;
		setTimeout(() => {
            setoverlay(false);
        }, delayTime);
    }).catch(err => {
        if (localStream.current) {
            localStream.current.getTracks().forEach(t => t.stop())
        }
        
        
        alert(err)
    })
}