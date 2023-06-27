import useWindowSize from "@rooks/use-window-size"
import axios from "axios"
import { createNewRoom } from "./CreateNewRoom"
import { JoinRoom } from "./JoinRoom"
import { fetchTurnCredentials, getTurnIceServers } from "./TurnServers"
const defaultControls = {
    audio: true,
    video: {
        aspectRatio: { ideal: 2 / 1 } // Set the desired aspect ratio (width:height)
    }
};


export const getLocalPreviewAndInitRoomMobileConnection = (socket, localStream, isRoomHost, auth, roomID, setoverlay, title, IceServers, innerWidth) => {


    navigator.mediaDevices.getUserMedia(defaultControls).then((stream) => {
        var VideoTrack = stream.getVideoTracks()[0]
        var imageCapture = new ImageCapture(VideoTrack);

        // Enable torch mode
        imageCapture.track.applyConstraints({ advanced: [{ torch: false }] })
            .then(function () {
                console.log("Camera light turned on.");
            })
            .catch(function (error) {
                console.error("Failed to turn on camera light:", error);
            });

        VideoTrack.applyConstraints({
            advanced: [{ torch: false }]
        })
        console.log('getLocalPreviewAndInitRoomConnection Called')
        localStream.current = stream;
        setoverlay(false)
        axios.post('http://127.0.0.1:8000/api/v1/UserStatus/', { roomID: roomID }, {
            headers: {
                Authorization: 'Bearer ' + auth.access
            }
        }).then((response) => {
            alert(response.data)
            if (response.data === "joinroom") {
                JoinRoom(socket, auth, roomID)
            }
            else {
                createNewRoom(socket, auth, roomID, isRoomHost, title)
            }
        })

    }).catch(err => {
        console.log(err)
        alert('error in navigatore.mediaDevices')
    })

    // fetchTurnCredentials().then((response)=>{
    //     IceServers.current = response
    // })

}