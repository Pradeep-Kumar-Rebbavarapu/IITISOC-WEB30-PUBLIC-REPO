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
            const BoardSection = document.getElementById('board-section')
            const TextEditor = document.getElementById("TextEditor");
            const PrivateMessaging = document.getElementById("PrivateMessaging");
            if (ChatParticipantsBox.classList.contains('hidden') || BoardSection.classList.contains('top-[0px]') || TextEditor.classList.contains('left-0') || PrivateMessaging.classList.contains('left-[0px]')) {
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
            const BoardSection = document.getElementById('board-section')
            const TextEditor = document.getElementById("TextEditor");
            const PrivateMessaging = document.getElementById("PrivateMessaging");
            if (ChatParticipantsBox.classList.contains('hidden') || BoardSection.classList.contains('top-[0px]') || TextEditor.classList.contains('left-0') || PrivateMessaging.classList.contains('left-[0px]')) {
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

const addStream = (stream, connUserSocketId, innerWidth, length_of_participants,video,peervideo) => {
    
    console.log('peervideo',peervideo.current)
    const fakevideo = document.createElement('video')
    const div = document.createElement('div')
    div.id = `div_${connUserSocketId}`
    div.style.width = "100%"
    div.style.height = "100%"
    div.style.maxWidth = "100%"
    div.style.maxHeight = "100%"
    div.style.minWidth = "100%"
    div.style.minHeight = "100%"
    div.style.backgroundColor = "#D3D3D3"
    div.style.borderRadius = "10px"
    div.append(fakevideo)
    
    fakevideo.id = `fake_${connUserSocketId}`
    fakevideo.style.width = "100%"
    fakevideo.style.height = "100%"
    fakevideo.style.maxWidth = "100%"
    fakevideo.style.maxHeight = "100%"
    fakevideo.style.minWidth = "100%"
    fakevideo.style.minHeight = "100%"
    fakevideo.style.backgroundColor = "#D3D3D3"
    fakevideo.style.borderRadius = "10px"
    fakevideo.style.display = 'none'
    fakevideo.style.objectFit = "cover"

    const remoteVideo = document.createElement('video')
    div.append(remoteVideo)
    remoteVideo.id = `v_${connUserSocketId}`
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

    if(peervideo.current === false){
        remoteVideo.style.display = 'none'
        fakevideo.style.display = 'block'
    }
    else{
        remoteVideo.style.display = 'block'
        fakevideo.style.display = 'none'
    }
    const VideoGrid = document.getElementById('VideoGrid')
    VideoGrid.append(div)


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


export const prepareNewPeerConnection = (socket, peers, connUserSocketId, isInitiator, ScreenSharingStream, localStream, isDrawing, Transcript, IceServers, innerWidth, length_of_participants, setDownloadingText,BoardMap,video,peervideo) => {
    
    let configuration = getConfiguration()
    if(IceServers.current){
        configuration = configuration.iceServers.concat(IceServers.current)
    }
    console.log('configuration',configuration)
    const streamToUse = ScreenSharingStream.current ? ScreenSharingStream.current : localStream.current;
    const peer = new Peer({
        initiator: isInitiator,
        trickle: true,
        stream: streamToUse,
        config: configuration
    })
    console.log('peer before transfer',peer)
    peers.current[connUserSocketId] = peer
    peers.current[connUserSocketId].on('signal', (data) => {
       
        console.log('signal data',data)
        const SignalData = {
            signal: data,
            connUserSocketId: connUserSocketId,
            video:video
        }
        SignalPeerData(socket, SignalData)
    })
    console.log('peer after transfer',peer)

    peers.current[connUserSocketId].on('stream', (stream) => {
        console.log(stream)
        addStream(stream, connUserSocketId, innerWidth, length_of_participants,video,peervideo);
    })
    peers.current[connUserSocketId].on('data', (peerdata) => {
        handleOnPeerData(peerdata, isDrawing, Transcript, setDownloadingText, peers,BoardMap)
    });
    peers.current[connUserSocketId].on('error', err => {
        console.error('An error occurred:', err);
    });
}





