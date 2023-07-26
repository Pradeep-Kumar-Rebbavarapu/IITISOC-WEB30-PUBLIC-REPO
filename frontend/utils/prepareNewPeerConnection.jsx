import Peer from 'simple-peer'
import { handleReceiveData } from './ShareFileUtils'
import { appendNewMessage } from './MessageUtils'
import { UpdateBoardCanvas } from './BoardUtils'
import { updateTranscript } from './SpokenData'
import { toast } from 'react-toastify'
import { handleData } from './ShareFileTwo'
import { store } from '../store/store'
import { AiFillPushpin, AiOutlineFullscreen } from 'react-icons/ai'
import MessageToast from '../components/MessageToast'
import { setTranscript } from '../store/actions'
import EmojiToast from '../components/EmojiToast'
import reactElementToJSXString from 'react-element-to-jsx-string';
import React from 'react'
import ReactDOM from "react-dom";
export default function PrePare() {
    return (
        <></>
    )
}
const getConfiguration = () => {
    return {
        iceServers: [
            { urls: 'stun:stun.www.pradeeps-video-conferencing.store' },
            
        ]
    }
}



const handleOnPeerData = async (peerdata, isDrawing, Transcript, setDownloadingText, BoardMap) => {
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
        const RemoteVideo = document.getElementById(`video_container_${data.socketId}`);
        const fakeRemoteVideo = document.getElementById(`fake_${data.socketId}`)
        fakeRemoteVideo.style.display = 'none'
        RemoteVideo.style.display = 'block'
    }
    else if (peerdata.toString().includes('videostopped')) {
        const data = JSON.parse(peerdata)
        const RemoteVideo = document.getElementById(`video_container_${data.socketId}`);
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

            style:{
                maxWidth: 'fit-content',
                maxHeight: 'fit-content',
                backgroundColor: '#ff6f00',
                color: 'white',
                top: '-120px'
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
        UpdateBoardCanvas(data, isDrawing, BoardMap)
    }
    else if (peerdata.toString().includes('SpokenData')) {
        const data = JSON.parse(peerdata);
        const transcript = data.transcript;
        const oldTranscript = store.getState().Transcript
        store.dispatch(setTranscript(`<div>${oldTranscript} ${transcript}</div>`))
    }
    else if (peerdata.toString().includes('emoji')) {
        const data = JSON.parse(peerdata);
        
        toast(<EmojiToast emoji={data.data} name={data.identity} />, {
            position: "bottom-left",
            autoClose: 800,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
            closeButton: false,
            style: {
                maxWidth: 'fit-content',
                maxHeight: 'fit-content',
                backgroundColor: 'transparent',
                left: '30%',
                bottom: '120px',
                border: 'none',
                boxShadow: 'none',
            }

        });
    }
    else if (peerdata.toString().includes('micon')) {
        const data = JSON.parse(peerdata);
  
            document.getElementById('MicSymbol_' + data.socketId).className = "absolute w-full h-full  rounded-full ring-8 ring-opacity-50 border-2 border-black ring-orange-500 animate-ping"
            document.getElementById('Mic_Symbol_Real_' + data.socketId).className = 'absolute w-full px-10 py-4  h-full ring-4  ring-opacity-50 ring-orange-500 border-2 border-black animate-ping rounded-b-full top-0 left-0 '
        
        
    }
    else if (peerdata.toString().includes('micoff')) {
        const data = JSON.parse(peerdata);
        document.getElementById('MicSymbol_' + data.socketId).className = 'absolute w-full h-full  rounded-full'
        document.getElementById('Mic_Symbol_Real_' + data.socketId).className = 'absolute w-full px-10 py-4  h-full rounded-b-full top-0 left-0'
    }
    else if(peerdata.toString().includes('screen-share-on')){
        const data = JSON.parse(peerdata);
        toast(`${data.identity} has started screen sharing`, {
            position: "bottom-center",
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
            style:{
                maxWidth: 'fit-content',
                maxHeight: 'fit-content',
                backgroundColor: '#ff6f00',
                color: 'white',
                top: '-120px'
            }
        })
    }
    else if(peerdata.toString().includes('screen-share-off')){
        const data = JSON.parse(peerdata);
        toast(`${data.identity} has stopped screen sharing`, {
            position: "bottom-center",
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
            style:{
                maxWidth: 'fit-content',
                maxHeight: 'fit-content',
                backgroundColor: '#ff6f00',
                color: 'white',
                top: '-120px'
            }
        })
    }
}

export const handlePinnedUser = (connUserIdentity, connUserSocketId) => {
    const videoContainer = document.getElementById(`${connUserSocketId}_div`);
    const videoGrid = document.getElementById('VideoGrid');
    const firstVideo = videoGrid.children[0];
    videoContainer.classList.add('pinned');
    videoGrid.insertBefore(videoContainer, firstVideo);
};


export const handleFullScreen = (connUserIdentity, connUserSocketId) => {
    const videoContainer = document.getElementById(`${connUserSocketId}_div`);
    const fakeVideo = videoContainer.children[1];
   
    const video = videoContainer.children[0];
    
    if (videoContainer.classList.contains('full-screen')) {
        videoContainer.classList.remove('full-screen');
        fakeVideo.classList.remove('fullscreen-fake');
        video.children[1].classList.remove('fullscreen-video');
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        
    } else {
        videoContainer.classList.add('full-screen');
        fakeVideo.classList.add('fullscreen-fake');
        video.children[1].classList.add('fullscreen-video');
        if (videoContainer.requestFullscreen) {
            videoContainer.requestFullscreen();
        } else if (videoContainer.mozRequestFullScreen) {
            videoContainer.mozRequestFullScreen();
        } else if (videoContainer.webkitRequestFullscreen) {
            videoContainer.webkitRequestFullscreen();
        } else if (videoContainer.msRequestFullscreen) {
            videoContainer.msRequestFullscreen();
        }
        
    }




}


const PinBtn = () => {
    return (
        <AiFillPushpin className="w-10 text-white h-10 my-4 mx-2 p-2 -translate-y-9 bg-black/20  rounded-full hover:bg-black/50   transition-all fade-in-out duration-500" />
    )
}

const FullScreenBtn = () => {
    return (
        <AiOutlineFullscreen className="w-10 text-white h-10 my-4 mx-2 p-2 -translate-y-9 bg-black/20  rounded-full hover:bg-black/50   transition-all fade-in-out duration-500" />
    )
}



const addStream = (stream, connUserSocketId, innerWidth, length_of_participants, video, peervideo) => {
    const participants = store.getState().participants
    const connUserIdentity = participants.filter(participant => participant.socketId === connUserSocketId)[0].identity
    const div = document.createElement('div')
    const VideoGrid = document.getElementById('VideoGrid')
    div.id = `${connUserSocketId}_div`
    const htmlString = `<div id='video_container_${connUserSocketId}' class="rounded-md relative">
                        <div class="absolute z-[10000] rounded-md top-0 text-center  w-full h-full transition-all fade-in-out group overflow-hidden">
                            <div class="font-bold w-fit  relative rounded-b-full mx-auto px-10 py-4 bg-black bg-opacity-50 text-white">
                                <div id="Mic_Symbol_Real_${connUserSocketId}" class="absolute w-full px-10 py-4  h-full rounded-b-full top-0 left-0 micsymbol"></div>
                                ${connUserIdentity}
                            </div>
                            <div class="">
                                    <div id="PinBtn_${connUserSocketId}" class="group-hover:flex hidden w-fit h-fit"></div>
                                    <div id="Full_Screen_${connUserSocketId}" class="group-hover:flex hidden w-fit h-fit"></div>
                            </div>
                        </div>
                    <video id="v_${connUserSocketId}" class="h-[400px] my-auto rounded-md"></video>
                    <video id='${connUserSocketId}_ss_video' class="h-[400px] my-auto rounded-md hidden"></video>
                </div>
                <div id='fake_${connUserSocketId}' class="h-full w-full rounded-md flex justify-center relative items-center my-auto mx-auto fake">
                    <div class="top-0 absolute w-full  text-center h-full  hover:bg-opacity-50 transition-all fade-in-out group  z-[10000]">
                    <div class="font-bold p-2">${connUserIdentity}</div>
                    <div class="">
							<div id="PinBtn_${connUserSocketId}_fake" class="group-hover:flex hidden w-fit h-fit"></div>
							<div id="Full_Screen_${connUserSocketId}_fake" class="group-hover:flex hidden w-fit h-fit"></div>
						</div>
                    </div>
                    <div class="w-[100px] h-[100px] border-2 border-orange-500 bg-orange-500 rounded-full relative mx-auto my-auto  text-center flex justify-center items-center pb-2  text-white font-bold text-xl md:text-3xl top-[36%]">${connUserIdentity.slice(0, 1)}
                    
                        <div id="MicSymbol_${connUserSocketId}" class="absolute w-full h-full rounded-full"></div>
                        
                    </div>
                </div>`;
    div.innerHTML = htmlString

    VideoGrid.append(div)
    div.className = "h-full w-full flex items-center justify-center rounded-md "

    const remoteVideoContainer = document.getElementById(`video_container_${connUserSocketId}`)
    const remoteVideo = document.getElementById('v_' + connUserSocketId)
    const fakevideo = document.getElementById('fake_' + connUserSocketId)
    fakevideo.style.backgroundColor = "#D3D3D3"
    fakevideo.style.width = `530px`
    fakevideo.style.height = `400px`;
    remoteVideo.autoplay = true;
    remoteVideo.playsInline = true
    remoteVideo.srcObject = stream;


    if (peervideo.current === false) {
        remoteVideoContainer.style.display = 'none'
        fakevideo.style.display = 'block'
    }
    else {
        remoteVideoContainer.style.display = 'block'
        fakevideo.style.display = 'none'
    }


    const pinBtnFakeElement = document.getElementById(`PinBtn_${connUserSocketId}_fake`);
    const fullScreenBtnFakeElement = document.getElementById(`Full_Screen_${connUserSocketId}_fake`);
    const pinBtnElement = document.getElementById(`PinBtn_${connUserSocketId}`);
    const fullScreenBtnElement = document.getElementById(`Full_Screen_${connUserSocketId}`);
    ReactDOM.render(PinBtn(), pinBtnElement);
    ReactDOM.render(FullScreenBtn(), fullScreenBtnElement);
    ReactDOM.render(PinBtn(), pinBtnFakeElement);
    ReactDOM.render(FullScreenBtn(), fullScreenBtnFakeElement);
    remoteVideo.onloadedmetadata = () => {
        remoteVideo.play()
    }

    document.getElementById('Full_Screen_' + connUserSocketId + "_fake").addEventListener('click', () => {
        handleFullScreen(connUserIdentity, connUserSocketId)
    })
    document.getElementById('PinBtn_' + connUserSocketId + "_fake").addEventListener('click', () => {
        handlePinnedUser(connUserIdentity, connUserSocketId)
    })
    document.getElementById('Full_Screen_' + connUserSocketId).addEventListener('click', () => {
        handleFullScreen(connUserIdentity, connUserSocketId)
    })
    document.getElementById('PinBtn_' + connUserSocketId).addEventListener('click', () => {
        handlePinnedUser(connUserIdentity, connUserSocketId)
    })


}



const SignalPeerData = (socket, data) => {
    socket.current.send(JSON.stringify({ type: 'conn-signal', data: data }))
}


export const prepareNewPeerConnection = (socket, peers, connUserSocketId, isInitiator, ScreenSharingStream, localStream, isDrawing, Transcript, IceServers, innerWidth, length_of_participants, setDownloadingText, BoardMap, video, peervideo) => {

    let configuration = getConfiguration()
    if (IceServers.current) {
        configuration = configuration.iceServers.concat(IceServers.current)
    }
    
    const streamToUse = ScreenSharingStream.current ? ScreenSharingStream.current : localStream.current;
    const peer = new Peer({
        initiator: isInitiator,
        trickle: true,
        stream: streamToUse,
        config: configuration
    })
    
    peers.current[connUserSocketId] = peer
    peers.current[connUserSocketId].on('signal', (data) => {

        
        const SignalData = {
            signal: data,
            connUserSocketId: connUserSocketId,
            video: video
        }
        SignalPeerData(socket, SignalData)
    })
    

    peers.current[connUserSocketId].on('stream', (stream) => {
        
        addStream(stream, connUserSocketId, innerWidth, length_of_participants, video, peervideo);
    })
    peers.current[connUserSocketId].on('data', (peerdata) => {
        handleOnPeerData(peerdata, isDrawing, Transcript, setDownloadingText, peers, BoardMap)
    });
    peers.current[connUserSocketId].on('error', err => {
        console.error('An error occurred:', err);
    });
}





