import useWindowSize from "@rooks/use-window-size"
import axios from "axios"
import { createNewRoom } from "./CreateNewRoom"
import { JoinRoom } from "./JoinRoom"
const defaultControls = {
    audio: true,
    video: {
        aspectRatio: { ideal: 3 / 1 } // Set the desired aspect ratio (width:height)
    }
};


export const getLocalPreviewAndInitRoomConnection = (socket, localStream, isRoomHost, auth, roomID, setoverlay, title, IceServers,number) => {
    
    
    navigator.mediaDevices.getUserMedia(defaultControls).then((stream) => {
        localStream.current = stream;
        setoverlay(false)
        axios.post('https://www.pradeeps-video-conferencing.store/api/v1/UserStatus/', { roomID: roomID }, {
            headers: {
                Authorization: 'Bearer ' + auth.access
            }
        }).then((response) => {
            alert(response.data)
            if (response.data === "joinroom") {
                JoinRoom(socket, auth, roomID)
            }
            else {
                createNewRoom(socket, auth, roomID,true,title)
            }
        })

    }).catch(err => {
        console.log(err)
        alert(err)
    })

    // fetchTurnCredentials().then((response)=>{
    //     IceServers.current = response
    // })

}