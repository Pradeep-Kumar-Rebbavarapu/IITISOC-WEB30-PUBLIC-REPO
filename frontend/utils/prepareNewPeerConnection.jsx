import Peer from 'simple-peer'
import { handleReceiveData } from './ShareFileUtils'
import { appendNewMessage } from './MessageUtils'
import { UpdateBoardCanvas } from './BoardUtils'
import { updateTranscript } from './SpokenData'
import { toast } from 'react-toastify'
import MessageToast from '../components/MessageToast'

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



const handleOnPeerData = (worker, setGotFile, FileNameRef, peerdata, FileSentBy, setProgress, isDrawing, Transcript) => {
    if (peerdata.toString().includes('file')) {

        handleReceiveData(worker, setGotFile, FileNameRef, peerdata, FileSentBy, setProgress)
        const ChatParticipantsBox = document.getElementById('ChatParticipantsBox')
        if (ChatParticipantsBox.classList.contains('hidden')) {
            toast(<MessageToast identity={FileSentBy.current} content={FileNameRef.current} />, {
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
                bottom:'120px'
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
        console.log(data)
        const base64 = data.base64;
        UpdateBoardCanvas(base64, isDrawing)
    }
    else if (peerdata.toString().includes('SpokenData')) {
        alert('spoken data')
        const data = JSON.parse(peerdata);
        console.log(data)
        const transcript = data.transcript;
        updateTranscript(transcript, Transcript)
    }
}

const addStream = (stream, connUserSocketId, innerWidth, length_of_participants) => {
    console.log('innerWidth', innerWidth)
    const remoteVideo = document.createElement('video')
    remoteVideo.id = `v_${connUserSocketId}`
    const VideoGrid = document.getElementById('VideoGrid')
    const div = document.createElement('div')
    remoteVideo.autoplay = true;
    remoteVideo.playsInline = true
    remoteVideo.srcObject = stream;
    remoteVideo.muted = true
    remoteVideo.className = 'object-cover mx-auto'
    remoteVideo.objectFit = "cover"

    remoteVideo.style.borderRadius = "10px"
    remoteVideo.style.objectFit = "cover"

    console.log('length_of_participants', localStorage.getItem('participants_length'))



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


export const prepareNewPeerConnection = (socket, peers, connUserSocketId, isInitiator, ScreenSharingStream, localStream, worker, setGotFile, FileNameRef, FileSentBy, setProgress, isDrawing, Transcript, IceServers, innerWidth, length_of_participants) => {

    const configuration = getConfiguration()

    const streamToUse = ScreenSharingStream.current ? ScreenSharingStream.current : localStream.current;
    const peer = new Peer({
        initiator: isInitiator,
        config: configuration,
        stream: streamToUse,
    })

    peers.current[connUserSocketId] = peer


    peers.current[connUserSocketId].on('signal', (data) => {
        console.log(data)
        //here we have the sdp offer,sdp answer and also the  information about the ice candidates
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

        const Chat_Area = document.getElementById('Chat_Area')
        setTimeout(() => {
            Chat_Area.scrollTop = Chat_Area.scrollHeight - Chat_Area.clientHeight;
        }, 100);
        handleOnPeerData(worker, setGotFile, FileNameRef, peerdata, FileSentBy, setProgress, isDrawing, Transcript)

    });
    peers.current[connUserSocketId].on('error', err => {
        console.error('An error occurred:', err);
    });
}





