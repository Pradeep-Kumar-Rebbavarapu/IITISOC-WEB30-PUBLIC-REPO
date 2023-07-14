import Peer from 'simple-peer'
import { handleReceiveData } from './ShareFileUtils'
import { appendNewMessage } from './MessageUtils'
import { UpdateBoardCanvas } from './BoardUtils'
import { updateTranscript } from './SpokenData'
import { toast } from 'react-toastify'
import { handleData } from './ShareFileTwo'
import { store } from '../store/store'

import MessageToast from '../components/MessageToast'
import { setTranscript } from '../store/actions'
import EmojiToast from '../components/EmojiToast'

const getConfiguration = () => {
    return {
        iceServers: [
            { url: 'stun:stun.www.pradeeps-video-conferencing.store' },
            {
                url: 'turn:turn.www.pradeeps-video-conferencing.store',
                credential: '1234',
                username: 'pradeepkumar'
            },
        ]
    }
}



const handleOnPeerData = async (peerdata, isDrawing, Transcript, setDownloadingText,BoardMap) => {
    if (peerdata.toString().includes('File')) {
        const data = JSON.parse(peerdata)
        if (data.first && !data.PrivateMessaging) {
            let messageData = {
                id: data.id,
                File: true,
                content: data.file_name,
                identity: store.getState().identity,
            }
            const ChatParticipantsBox = document.getElementById('ChatParticipantsBox')
            if (ChatParticipantsBox.classList.contains('hidden')) {
                toast(<MessageToast identity={store.getState().identity} content={data.file_name} />, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    theme: "colored",
                    style: {
                        maxWidth: 'fit-content',
                        maxHeight: 'fit-content',
                        borderRadius: '10px',
                        margin: "20px",
                        backgroundColor: '#fffffff5',
                    }

                });
            }
            await appendNewMessage(messageData)
        }
        handleData(data, setDownloadingText)

    }
    else if (peerdata.toString().includes('videostarted')) {
        const data = JSON.parse(peerdata)
        const RemoteVideo = document.getElementById(`v_${data.socketId}`);
        const fakeRemoteVideo = document.getElementById(`fake_${data.socketId}`)
        fakeRemoteVideo.style.display = 'none'
        RemoteVideo.style.display = 'block'
    }
    else if (peerdata.toString().includes('videostopped')) {
        const data = JSON.parse(peerdata)
        const RemoteVideo = document.getElementById(`v_${data.socketId}`);
        const fakeRemoteVideo = document.getElementById(`fake_${data.socketId}`)
        fakeRemoteVideo.style.display = 'block'
        RemoteVideo.style.display = 'none'

    }
    else if (peerdata.toString().includes('handraise')) {

        const data = JSON.parse(peerdata)
        toast(`${data.username} has raised his hand`, {
            position: "bottom-center",
            autoClose: 800,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",

            style: {
                backgroundColor: '#ff6f00',
                color: 'white',
                bottom: '120px'
            }

        });
    }
    else if (peerdata.toString().includes('message')) {
        const data = JSON.parse(peerdata);
        appendNewMessage(data.messageData)
        const ChatParticipantsBox = document.getElementById('ChatParticipantsBox')
        if (ChatParticipantsBox.classList.contains('hidden')) {
            toast(<MessageToast identity={data.messageData.identity} content={data.messageData.content} />, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: "colored",
                style: {
                    maxWidth: 'fit-content',
                    maxHeight: 'fit-content',
                    borderRadius: '10px',
                    margin: "20px",

                    backgroundColor: '#fffffff5',

                }

            });
        }




    }
    else if (peerdata.toString().includes('image')) {
        const data = JSON.parse(peerdata);
        UpdateBoardCanvas(data, isDrawing,BoardMap)
    }
    else if (peerdata.toString().includes('SpokenData')) {
        const data = JSON.parse(peerdata); 
        const transcript = data.transcript;
        const oldTranscript = store.getState().Transcript
        store.dispatch(setTranscript(`<div>${oldTranscript} ${transcript}</div>`))
    }
    else if(peerdata.toString().includes('emoji')){
        const data = JSON.parse(peerdata);
        console.log(data)
        toast(<EmojiToast emoji={data.data} name={data.identity}/>, {
            position: "bottom-left",
            autoClose: 800,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
            closeButton: false ,
            style: {
                maxWidth: 'fit-content',
                maxHeight: 'fit-content',
                backgroundColor: 'transparent',
                left: '30%',
                
                bottom: '120px'
            }

        });
    }
}

const addStream = (stream, connUserSocketId, innerWidth, length_of_participants) => {
    
    const remoteVideo = document.createElement('video')
    remoteVideo.id = `v_${connUserSocketId}`
    const VideoGrid = document.getElementById('VideoGrid')
    remoteVideo.autoplay = true;
    remoteVideo.playsInline = true
    remoteVideo.srcObject = stream;
    remoteVideo.style.borderRadius = "10px";
	remoteVideo.style.objectFit = "cover";
    remoteVideo.style.width = "100%";
    remoteVideo.style.height = "100%";
    remoteVideo.style.maxWidth = "100%";
    remoteVideo.style.maxHeight = "100%";
    remoteVideo.style.minWidth = "100%";
    remoteVideo.style.minHeight = "100%";

    remoteVideo.style.borderRadius = "10px"

    



    const numVideos = localStorage.getItem('participants_length');


    // if (innerWidth < 1000) {

    //     let columns = 1;
    //     if (numVideos <= 2) columns = 1
    //     if (numVideos > 2 && numVideos <= 4) columns = 2;
    //     else if (numVideos > 4 && numVideos <= 8) columns = 3;
    //     else if (numVideos > 8 && numVideos <= 16) columns = 3;
    //     else if (numVideos > 16 && numVideos <= 35) columns = 4;
    //     VideoGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    // }
    // else if (innerWidth > 1000) {

    //     let columns = 1;
    //     if (numVideos === 1) columns = 1
    //     else if (numVideos > 1 && numVideos <= 4) columns = 2;
    //     else if (numVideos > 4 && numVideos <= 9) columns = 3;
    //     else if (numVideos > 9 && numVideos <= 16) columns = 4;
    //     else if (numVideos > 16 && numVideos <= 25) columns = 5;
    //     VideoGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    // }



    VideoGrid.append(remoteVideo)

    remoteVideo.onloadedmetadata = () => {
        remoteVideo.play()
    }
    remoteVideo.addEventListener('click', () => {
        if (remoteVideo.classList.contains("full_screen")) {
            remoteVideo.classList.remove("full_screen")
        }
        else {
            remoteVideo.classList.add("full_screen")
        }
    })
}



const SignalPeerData = (socket, data) => {
    socket.current.send(JSON.stringify({ type: 'conn-signal', data: data }))
}


export const prepareNewPeerConnection = (socket, peers, connUserSocketId, isInitiator, ScreenSharingStream, localStream, isDrawing, Transcript, IceServers, innerWidth, length_of_participants, setDownloadingText,BoardMap,) => {

    const configuration = getConfiguration()

    const streamToUse = ScreenSharingStream.current ? ScreenSharingStream.current : localStream.current;
    const peer = new Peer({
        initiator: isInitiator,

        stream: streamToUse,
    })

    peers.current[connUserSocketId] = peer

    
    peers.current[connUserSocketId].on('signal', (data) => {

        const SignalData = {
            signal: data,
            connUserSocketId: connUserSocketId
        }
        SignalPeerData(socket, SignalData)
    })


    peers.current[connUserSocketId].on('stream', (stream) => {

        addStream(stream, connUserSocketId, innerWidth, length_of_participants);
    })
    peers.current[connUserSocketId].on('data', (peerdata) => {
        handleOnPeerData(peerdata, isDrawing, Transcript, setDownloadingText, peers,BoardMap)
    });
    peers.current[connUserSocketId].on('error', err => {
        console.error('An error occurred:', err);
    });
}





