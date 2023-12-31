
import { store } from "../store/store";
import { JoinRoom } from "./JoinRoom";
const ScreenShareConstraints = {
    audio: false,
    video: true,
    selfBrowserSurface: "exclude",
    surfaceSwitching: "include",
    systemAudio: "include"
};

// export const handleScreenShare = async (ScreenShareOn,ScreenSharingStream,setScreenShareOn,peers,socketId,localStream,socket,auth,roomID) => {
//     const my_video = document.getElementById('my_video')
//     if (ScreenShareOn === false) {
//         try {

//             const stream = await navigator.mediaDevices.getDisplayMedia(ScreenShareConstraints);
//             ScreenSharingStream.current = stream
//             JoinRoom(socket,auth,roomID)
//             setScreenShareOn(true);

//         } catch (err) {
//             
//             alert('Screen Share Error');
//         }

//     } else {

//     }
// };

export const handleScreenShare = async (ScreenShareOn, ScreenSharingStream, setScreenShareOn, peers, props, localStream) => {
    const my_video = document.getElementById('my_video')
    if (!ScreenSharingStream.current || ScreenShareOn === false) {
        try {
            for (let socketId in peers.current) {
                const peer = peers.current[socketId]
                peer.send(JSON.stringify({ type: 'screen-share-on', identity: props.identity }))
            }
            const stream = await navigator.mediaDevices.getDisplayMedia(ScreenShareConstraints);
            ScreenSharingStream.current = stream
            ToggleScreenShare(true, stream, peers, localStream); // Activate screen sharing for all peers.current
            setScreenShareOn(true);
            stream.getVideoTracks()[0].onended = () => {
                setScreenShareOn(false);
                for (let socketId in peers.current) {
                    const peer = peers.current[socketId]
                    peer.send(JSON.stringify({ type: 'screen-share-off', identity: props.identity }))
                }
                ScreenSharingStream.current = null
                ToggleScreenShare(false, null, peers, localStream); // Deactivate screen sharing for all peers.current
                if (ScreenSharingStream.current) {
                    ScreenSharingStream.current.getTracks().forEach((track) => track.stop());
                }
            }

        } catch (err) {
            setScreenShareOn(false);
            

        }

    } else {
        setScreenShareOn(false);
        for (let socketId in peers.current) {
            const peer = peers.current[socketId]
            peer.send(JSON.stringify({ type: 'screen-share-off', identity: props.identity }))
        }
        ScreenSharingStream.current = null
        ToggleScreenShare(false, null, peers, localStream); // Deactivate screen sharing for all peers.current
        if (ScreenSharingStream.current) {
            ScreenSharingStream.current.getTracks().forEach((track) => track.stop());
        }


    }
};



const ToggleScreenShare = (isScreenSharingActive, screenSharingStream = null, peers, localStream) => {
    for (let socketId in peers.current) {
        const peer = peers.current[socketId];
        const videoTracks = peer.streams[0].getVideoTracks();

        if (isScreenSharingActive) {

            // Switch to screen sharing stream
            if (screenSharingStream) {
                const screenSharingVideoTrack = screenSharingStream.getVideoTracks()[0];
                if (videoTracks.length > 0 && screenSharingVideoTrack && peer) {
                    switchVideoTracks(peer, videoTracks[0], screenSharingVideoTrack);
                }
            }
        } else {
            // Switch back to local stream
            const localVideoTrack = localStream.current.getVideoTracks()[0];
            if (videoTracks.length > 0 && localVideoTrack && peer) {
                switchVideoTracks(peer, videoTracks[0], localVideoTrack);
            }
        }
    }
};


const switchVideoTracks = (peer, currentTrack, newTrack) => {
    if (peer && currentTrack && newTrack) {
        peer.replaceTrack(currentTrack, newTrack, peer.streams[0]);
    }
};