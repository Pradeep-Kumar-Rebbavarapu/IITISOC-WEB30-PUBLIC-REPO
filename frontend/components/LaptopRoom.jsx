import React, { useContext, useEffect, useRef, useState } from "react";
import { BsCameraVideoFill, BsFillCameraVideoOffFill, BsChatLeftDots, BsPeople, BsClipboard2Fill, BsClipboard2XFill, BsFillMicFill, BsFillMicMuteFill, BsFillSendFill, BsFillEmojiSmileFill } from "react-icons/bs";

import Stack from '@mui/material/Stack';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { LuScreenShareOff, LuScreenShare } from 'react-icons/lu'
import { IoExit } from 'react-icons/io5'
import { Flip } from "react-toastify";
import { GrAttachment } from 'react-icons/gr'
import Context from "../context/Context";
import { useRouter } from "next/router";
import VideoGrid from "./VideoGrid";
import LocalScreenSharePreview from "./LocalScreenSharePreview";
import EachMessage from "./EachMessage";
import { connect } from 'react-redux';
import ParticipantsList from "./ParticipantsList";
import DownloadMessage from "./DownloadMessage";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { getLocalPreviewAndInitRoomConnection } from '../utils/GetLocalPreviewAndInitRoomConnection'
import { sendMessage } from "../utils/MessageUtils";
import { sendFile, selectFile } from "../utils/ShareFileUtils";
import { connectionWithSocketServer } from "../utils/connectionWithSocketServer";
import { handleScreenShare } from "../utils/ScreenShareUtils";
import Board from "./Board";
import SpeechToText from "../utils/SpeechToText";
import { AiFillFileText, AiOutlineFileText } from 'react-icons/ai';
import axios from "axios";
import UserJoinModal from "./UserJoinModal";
import useWindowSize from "@rooks/use-window-size";
import { getLocalPreviewAndInitRoomMobileConnection } from "../utils/GetLocalPreviewAndInitRoomMobile";
import { FiMoreVertical } from 'react-icons/fi'
import { FaHandPaper } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { toast } from 'react-toastify'

function LaptopRoom(props) {
	console.log('props', props.messages)
	const { socket } = props
	const { innerWidth } = useWindowSize()
	const router = useRouter()
	const worker = useRef()
	const roomID = router.query.EachRoom
	const [LeftNavOpen, setLeftNavOpen] = useState(true)
	const { isHost, identity, overlay, setoverlay, title, auth, localStream, video, audio } = useContext(Context)
	const [MicOn, setMicOn] = useState(audio)
	const [CamOn, setCamOn] = useState(video)
	const [ScreenShareOn, setScreenShareOn] = useState(false)
	const [BoardOn, setBoardOn] = useState(false)
	let ScreenSharingStream = useRef()
	const [message, setmessage] = useState(null)
	const [File, setFile] = useState(null)
	let peers = useRef({})
	let peersRef = useRef([])
	const [JoinModal, setIsJoinModal] = useState(false)
	const [peerUserID, setpeerUserID] = useState(null)
	const Attachmentref = useRef(null);
	const FileNameRef = useRef();
	const [GotFile, setGotFile] = useState(false);
	const FileSentBy = useRef()
	const setProgress = useRef()
	const isDrawing = useRef(false)
	const IceServers = useRef(null)
	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition
	} = useSpeechRecognition();
	const Transcript = useRef(transcript)
	if (listening) {
		Transcript.current = transcript
	}
	console.log(Transcript.current)

	const handleToggleLeftNav = () => {
		if (document.getElementById('Left_Nav').classList.contains('open')) {
			document.getElementById('Left_Nav').className = "lg:flex hidden  h-full flex-col items-center justify-center transition-all fade-in-out w-[100px] border-r-2"
			setLeftNavOpen(true)
		}
		else {
			document.getElementById('Left_Nav').className = "hidden h-full open flex-col items-center justify-center transition-all fade-in-out w-[100px] border-r-2"
			setLeftNavOpen(false)
		}
	}


	useEffect(() => {

		worker.current = new Worker('/worker.js')
		connectionWithSocketServer(socket, peers, ScreenSharingStream, localStream, worker, setGotFile, FileNameRef, FileSentBy, setProgress, isDrawing, Transcript, IceServers, setIsJoinModal, setpeerUserID, innerWidth, props.participants.length)

		getLocalPreviewAndInitRoomConnection(socket, localStream, isHost, auth, roomID, setoverlay, title, IceServers, 3)



		const handleClickOutsideAttachmentBtn = (e) => {
			if (Attachmentref.current && !Attachmentref.current.contains(e.target)) {
				document.getElementById('FileInput').className = "bg-white h-[30px] w-full absolute mx-auto bottom-0 top-[10px] z-[-100] transition-all fade-in-out"
			}
		}

		const handleClickOutsideMoreBtn = (e) => {
			if (document.getElementById('MoreBtnMenu').contains(e.target)) {
				if (MoreBtnMenu.classList.contains('bottom-[-500px]')) {
					MoreBtnMenu.className = 'absolute w-full lg:hidden  h-[300px]  bottom-[100px] right-0 bg-white border-2 border-blue-500 z-[100] transition-all fade-in-out duration-500'
				}
				else {
					MoreBtnMenu.className = 'absolute w-full lg:hidden  h-[300px]  bottom-[-500px] right-0 bg-white border-2 border-blue-500 z-[100] transition-all fade-in-out duration-500'
				}
			}
			if (document.getElementById('MoreBtn').contains(e.target)) {
				return
			}
			if (document.getElementById('MoreBtnMenu').classList.contains('bottom-[-500px]')) {
				return
			}
			else {
				const MoreBtnMenu = document.getElementById('MoreBtnMenu')
				if (MoreBtnMenu.classList.contains('bottom-[-500px]')) {
					MoreBtnMenu.className = 'absolute w-full lg:hidden  h-[300px]  bottom-[100px] right-0 bg-white border-2 border-blue-500 z-[1000000000] transition-all fade-in-out duration-500'
				}
				else {
					MoreBtnMenu.className = 'absolute w-full lg:hidden  h-[300px]  bottom-[-500px] right-0 bg-white border-2 border-blue-500 z-[1000000000] transition-all fade-in-out duration-500'
				}
			}
		}
		document.addEventListener('click', handleClickOutsideMoreBtn, true)
		document.addEventListener("click", handleClickOutsideAttachmentBtn, true);
		// return () => {
		// 	worker.current?.terminate()
		// 	LeaveRoom(peers, localStream)
		// }

	}, [])









	const ToggleMic = (MicOn) => {
		if (MicOn) {
			localStream.current.getAudioTracks()[0].enabled = false
			setMicOn(false)
		}
		else {
			localStream.current.getAudioTracks()[0].enabled = true
			setMicOn(true)
		}
	}











	// const ToggleCamera = (CamOn) => {
	// 	const localVideo = document.getElementById('my_video')
	// 	const fakeVideo = document.getElementById('fake_video')
	// 	if (CamOn) {
	// 		localVideo.classList.add('hidden')
	// 		fakeVideo.classList.remove('hidden')
	// 		localStream.current.getVideoTracks()[0].stop()

	// 		for(let socketId in peers.current){
	// 			let peer = peers.current[socketId]
	// 			const data = {videostopped:true,socketId:props.socketId}
	// 			peer.send(JSON.stringify(data))
	// 		}
	// 		setCamOn(false)
	// 	}
	// 	else {
	// 		navigator.mediaDevices.getUserMedia({
	// 			video: true,
	// 			audio: MicOn
	// 		}).then((stream) => {
	// 			localVideo.classList.remove('hidden')
	// 			fakeVideo.classList.add('hidden')
	// 			localStream.current = stream;
	// 			localVideo.srcObject = stream
	// 			localVideo.play()
	// 			for (let socketId in peers.current) {
	// 				let peer = peers.current[socketId];
	// 				const data = {videostarted:true,socketId:props.socketId}
	// 				peer.send(JSON.stringify(data))
	// 				const sender = peer._pc.getSenders().find(s => s.track.kind === 'video');
	// 				if (sender) {
	// 					sender.replaceTrack(stream.getVideoTracks()[0]); // Replace the old track with the new track
	// 				}
	// 			}

	// 		})
	// 		setCamOn(true)
	// 	}
	// }




	const ToggleCamera = (CamOn) => {

		if (CamOn) {
			localStream.current.getVideoTracks()[0].enabled = false
			setCamOn(false)
		}
		else {

			localStream.current.getVideoTracks()[0].enabled = true
			setCamOn(true)
		}
	}






























	const handleToggleChatParticipantsArea = (mode) => {
		const Chat_Area = document.getElementById('Chat_Area')
		setTimeout(() => {
			Chat_Area.scrollTop = Chat_Area.scrollHeight - Chat_Area.clientHeight;
		}, 100);
		const ChatParticipantsBox = document.getElementById('ChatParticipantsBox')
		let Left_Nav_Message_Btn = document.getElementById('Left_Nav_Message_Btn')
		let Left_Nav_Participants_Btn = document.getElementById('Left_Nav_Participants_Btn')
		let Left_Nav_Video_Btn = document.getElementById('Left_Nav_Video_Btn')

		if (mode === "Chat") {
			if (ChatParticipantsBox.classList.contains('hidden')) {
				ChatParticipantsBox.classList.remove('hidden')
			}
			Left_Nav_Video_Btn.className = "focus:bg-orange-500 cursor-pointer !h-fit my-5 p-3 rounded-lg hover:bg-orange-500 transition-all text-orange-600 bg-opacity-20 hover:bg-opacity-20"
			Left_Nav_Message_Btn.className = "focus:bg-orange-500 cursor-pointer !h-fit my-5 p-3 rounded-lg bg-orange-500 transition-all text-orange-600 bg-opacity-20 hover:bg-opacity-20"
			Left_Nav_Participants_Btn.className = "focus:bg-orange-500 cursor-pointer !h-fit my-5 p-3 rounded-lg hover:bg-orange-500 transition-all text-orange-600 bg-opacity-20 hover:bg-opacity-20"
			handleToggleMessageBtn()
		}
		else if (mode === "Participants") {
			if (ChatParticipantsBox.classList.contains('hidden')) {
				ChatParticipantsBox.classList.remove('hidden')
			}
			Left_Nav_Video_Btn.className = "focus:bg-orange-500 cursor-pointer !h-fit my-5 p-3 rounded-lg hover:bg-orange-500 transition-all text-orange-600 bg-opacity-20 hover:bg-opacity-20"
			Left_Nav_Message_Btn.className = "focus:bg-orange-500 cursor-pointer !h-fit my-5 p-3 rounded-lg hover:bg-orange-500 transition-all text-orange-600 bg-opacity-20 hover:bg-opacity-20"
			Left_Nav_Participants_Btn.className = "focus:bg-orange-500 cursor-pointer !h-fit my-5 p-3 rounded-lg bg-orange-500 transition-all text-orange-600 bg-opacity-20 hover:bg-opacity-20"
			handleToggleParticipantsBtn()
		}
		else if (mode === "Video") {
			Left_Nav_Video_Btn.className = "focus:bg-orange-500 cursor-pointer !h-fit my-5 p-3 rounded-lg bg-orange-500 transition-all text-orange-600 bg-opacity-20 hover:bg-opacity-20"
			Left_Nav_Message_Btn.className = "focus:bg-orange-500 cursor-pointer !h-fit my-5 p-3 rounded-lg hover:bg-orange-500 transition-all text-orange-600 bg-opacity-20 hover:bg-opacity-20"
			Left_Nav_Participants_Btn.className = "focus:bg-orange-500 cursor-pointer !h-fit my-5 p-3 rounded-lg hover:bg-orange-500 transition-all text-orange-600 bg-opacity-20 hover:bg-opacity-20"
			handleToggleLeftNav()
			ChatParticipantsBox.classList.add('hidden')

		}

	}














	const handleOpenMessage = () => {
		const ParticipantsBox = document.getElementById('Participants')
		const MessageBox = document.getElementById('Messages')
		MessageBox.className = "absolute h-full border-0 border-red-500 w-full right-0 transition-all fade-in-out"
		ParticipantsBox.className = "absolute h-full border-0 border-blue-500 w-full right-[1000px] transition-all fade-in-out"

	}











	const handleOpenParticipants = () => {
		const ParticipantsBox = document.getElementById('Participants')
		const MessageBox = document.getElementById('Messages')
		MessageBox.className = "absolute h-full border-0 border-red-500 w-full right-[1000px] transition-all fade-in-out"
		ParticipantsBox.className = "absolute h-full border-0 border-blue-500 w-full right-0 transition-all fade-in-out"
	}












	const handleToggleMessageBtn = () => {
		const MessageBtn = document.getElementById('MessageBtn')
		const ParticipantsBtn = document.getElementById('ParticipantsBtn')
		MessageBtn.className = "flex items-center justify-center border-0 border-red-500 rounded-lg bg-gray-200 bg-opacity-50 font-bold hover:text-orange-600  text-orange-600 transition-all fade-in-out"
		ParticipantsBtn.className = "flex items-center justify-center border-0 border-red-500 rounded-lg bg-gray-200 bg-opacity-0 font-bold hover:text-orange-600  text-gray-800 transition-all fade-in-out"
		handleOpenMessage()
	}










	const handleToggleParticipantsBtn = () => {
		const MessageBtn = document.getElementById('MessageBtn')
		const ParticipantsBtn = document.getElementById('ParticipantsBtn')
		ParticipantsBtn.className = "flex items-center justify-center border-0 border-red-500 rounded-lg bg-gray-200 bg-opacity-50 font-bold hover:text-orange-600  text-orange-600 transition-all fade-in-out"
		MessageBtn.className = "flex items-center justify-center border-0 border-red-500 rounded-lg bg-gray-200 bg-opacity-0 font-bold hover:text-orange-600  text-gray-800 transition-all fade-in-out"
		handleOpenParticipants()
	}



	const ToggleBoard = () => {
		const BoardSection = document.getElementById('board-section')
		const VideoSection = document.getElementById('video-section')
		const TextEditor = document.getElementById('TextEditor')
		
			BoardSection.className = "w-full h-full top-[0px] absolute z-[1000000000000000]  transition-all fade-in-out duration-500"
			VideoSection.className = "w-full h-full absolute left-[2000px] z-[100] transition-all fade-in-out duration-500"
			TextEditor.className = "w-full h-full absolute left-[-2000px] z-[100] transition-all fade-in-out duration-500"


		
	}




	if (overlay) {
		return <h1 className="py-20 text-center font-bold text-5xl">Loading...</h1>
	}










	const handleToggleFileInput = () => {
		if (document.getElementById('FileInput').classList.contains('top-[10px]')) {
			document.getElementById('FileInput').className = "bg-white h-[30px] w-full absolute mx-auto bottom-0 top-[-40px]  transition-all fade-in-out"
		}
		else {
			document.getElementById('FileInput').className = "bg-white h-[30px] w-full absolute mx-auto bottom-0 top-[10px] z-[-100] transition-all fade-in-out"
		}
	}














	const OpenTextEditor = () => {
		const TextEditor = document.getElementById('TextEditor')
		const BoardSection = document.getElementById('board-section')
		const VideoSection = document.getElementById('video-section')
		if (TextEditor.classList.contains('left-[-2000px]')) {

			TextEditor.className = "w-full h-full absolute left-[0] z-[100] transition-all fade-in-out duration-500 border-2 border-black"
			VideoSection.className = "w-full h-full absolute left-[2000px] z-[0] transition-all fade-in-out duration-500"
			BoardSection.className = "w-full h-full top-[-1000px] absolute z-[10] transition-all fade-in-out duration-500"
		}
		else {
			TextEditor.className = "w-full h-full absolute left-[-2000px] z-[0] transition-all fade-in-out duration-500"
			VideoSection.className = "w-full h-full absolute left-[0px] z-[100] transition-all fade-in-out duration-500"

		}
	}




	const ToggleMoreBtn = () => {
		const MoreBtnMenu = document.getElementById('MoreBtnMenu')
		if (MoreBtnMenu.classList.contains('bottom-[-500px]')) {
			MoreBtnMenu.className = 'absolute w-full lg:hidden  h-[300px]  bottom-[100px] right-0 bg-white border-2 border-blue-500 z-[1000000000]  transition-all fade-in-out duration-500'
		}
		else {
			MoreBtnMenu.className = 'absolute w-full lg:hidden  h-[300px]  bottom-[-500px] right-0 bg-white border-2 border-blue-500 z-[1000000000]  transition-all fade-in-out duration-500'
		}
	}














	return (
		<div>
		<div className="w-full h-screen bg-white absolute top-0  border-2 border-red-500">
			
			<UserJoinModal peerUserID={peerUserID} socket={socket} JoinModal={JoinModal} setIsJoinModal={setIsJoinModal} />
			<div className="flex w-full h-full ">
				{<LocalScreenSharePreview socketId={props.socketId} screenShareStream={ScreenSharingStream.current} />}
				
				<div
					id="Left_Nav"
					className="hidden lg:flex  h-full flex-col items-center justify-center transition-all fade-in-out w-[100px] border-r-2"
				>
					<div onClick={() => {
						handleToggleChatParticipantsArea('Video')
					}} id="Left_Nav_Video_Btn" className="focus:bg-orange-500 cursor-pointer !h-fit my-5 p-3 rounded-lg bg-orange-500 transition-all text-orange-600 bg-opacity-20 hover:bg-opacity-20" >
						<BsCameraVideoFill className="w-7 h-7 " />
					</div>
					<div id="Left_Nav_Message_Btn" className="focus:bg-orange-500 cursor-pointer !h-fit my-5 p-3 rounded-lg hover:bg-orange-500 transition-all text-orange-600 bg-opacity-20 hover:bg-opacity-20" onClick={() => {
						handleToggleChatParticipantsArea('Chat')
					}} >
						<BsChatLeftDots className="w-7 h-7 " />
					</div>
					<div id="Left_Nav_Participants_Btn" className="focus:bg-orange-500 cursor-pointer !h-fit my-5 p-3 rounded-lg hover:bg-orange-500 transition-all text-orange-600 bg-opacity-20 hover:bg-opacity-20" onClick={() => {
						handleToggleChatParticipantsArea('Participants')
					}} >
						<BsPeople className="w-7 h-7 " />
					</div>
					<SpeechToText peers={peers} transcript={transcript} browserSupportsSpeechRecognition={browserSupportsSpeechRecognition} />
					<div id="Left_Nav_Editor_Btn" className="focus:bg-orange-500 cursor-pointer !h-fit my-5 p-3 rounded-lg hover:bg-orange-500 transition-all text-orange-600 bg-opacity-20 hover:bg-opacity-20" onClick={() => {
						OpenTextEditor()
					}} >
						<AiFillFileText className="w-7 h-7 " />
					</div>

					<div className="w-[60px] h-[60px] rounded-full bg-orange-600 bottom-0 mt-auto mb-5"></div>
				</div>

				<div className="border-0 border-black flex w-full h-full overflow-x-hidden lg:py-auto">
					<div
						id="Video_Element"
						className="w-full border-0 border-red-500 mx-auto grid grid-rows-[auto_100px] lg:grid-rows-[60px_auto_100px] px-5 py-5 lg:py-0 relative overflow-hidden"
					>
						<div id="MoreBtnMenu" className="absolute w-full lg:hidden  h-[200px] bottom-[-500px] right-0 bg-white border-2 border-blue-500 z-[1000000000] transition-all fade-in-out duration-500">
							<div className="w-full h-full grid grid-cols-3 justify-between flex-wrap items-center">
								<div id="Left_Nav_Message_Btn" className="focus:bg-orange-500 cursor-pointer  my-5 p-3 rounded-lg hover:bg-orange-500 transition-all flex flex-col text-center w-full h-full justify-center mx-auto text-orange-600 bg-opa-20 hover:bg-opacity-20" onClick={() => {
									handleToggleChatParticipantsArea('Chat')
								}} >
									<BsChatLeftDots className="w-7 h-7 mx-auto" />
									<div className="text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500 text-center">{"Messages"}</div>
								</div>
								<div id="Left_Nav_Participants_Btn" className="focus:bg-orange-500 cursor-pointer  my-5 p-3 rounded-lg hover:bg-orange-500 transition-all flex flex-col text-center w-full h-full justify-center mx-auto text-orange-600 bg-opa-20 hover:bg-opacity-20" onClick={() => {
									handleToggleChatParticipantsArea('Participants')
								}} >
									<BsPeople className="w-7 h-7 mx-auto" />
									<div className="text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500 text-center">{"Participants"}</div>
								</div>
								<SpeechToText peers={peers} transcript={transcript} browserSupportsSpeechRecognition={browserSupportsSpeechRecognition} />
								<div id="Left_Nav_Editor_Btn" className="focus:bg-orange-500 cursor-pointer  my-5 p-3 rounded-lg hover:bg-orange-500 transition-all flex flex-col text-center w-full h-full justify-center mx-auto text-orange-600 bg-opa-20 hover:bg-opacity-20" onClick={() => {
									OpenTextEditor()
								}} >
									<AiFillFileText className="w-7 h-7 mx-auto" />
									<div className="text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500 text-center">{"Text Editor"}</div>
								</div>
								<div className="group transition-all hover:bg-orange-500 flex flex-col text-center w-full h-full justify-center mx-auto lg:hidden fade-in-out hover:bg-opacity-20">
									<div onClick={() => {
										handleScreenShare(ScreenShareOn, ScreenSharingStream, setScreenShareOn, peers, props.socketId, localStream, socket, auth, roomID)
									}} className="border-0 rounded-lg p-2 w-fit mx-auto text-orange-500  transition-all fade-in-out  " >{ScreenShareOn ? (<LuScreenShareOff className="w-4 h-4 lg:w-5 lg:h-5 mx-auto" />) : (<LuScreenShare className="w-4 h-4 lg:w-5 lg:h-5 mx-auto" />)}</div>
									<div className="text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500 text-center">{!ScreenShareOn ? "Start Sharing" : "Stop Sharing"}</div>
								</div>


								<div className="group transition-all hover:bg-orange-500 flex flex-col text-center w-full h-full justify-center mx-auto lg:hidden fade-in-out hover:bg-opacity-20">
									<div onClick={() => {
										ToggleBoard()
									}} className="border-0 rounded-lg p-2 w-fit mx-auto text-orange-500  transition-all fade-in-out " ><BsClipboard2Fill className="w-4 h-4 lg:w-5 lg:h-5" /></div>
									<div className="text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500">Open Board</div>
								</div>
							</div>
						</div>
						<div className="h-[60px] hidden lg:flex w-full  border-b-2 py-3">
							<div
								onClick={handleToggleLeftNav}
								className="my-auto p-2 border-0 w-fit ml-5 bg-gray-300 bg-opacity-30 hover:bg-gray-400 hover:bg-opacity-20 transition-all fade-in-out cursor-pointer rounded-md"

							>
								{LeftNavOpen ? (
									<AiOutlineLeft className="w-6 h-6 mx-auto my-auto text-gray-500 " />

								) : (
									<AiOutlineRight className="w-6 h-6 mx-auto my-auto text-gray-500 " />
								)}
							</div>
							<div className=" text-center font-bold items-center flex text-xl ml-4">
								{title}
							</div>
						</div>

						<div id="otherTemplate" className={`p-0 relative  border-0 border-blue-500 h-full `}>


							<div id='video-section' className="w-full h-full top-0  absolute z-[0] transition-all fade-in-out duration-500">
								<VideoGrid length={props.participants.length} localStream={localStream.current} />
							</div>
							<div>
								<div id='TextEditor' className="w-full h-full absolute z-[10000] left-[-2000px] transition-all fade-in-out duration-500 border-2 border-black"  >{transcript}</div>
							</div>

						</div>


						<div className="h-[100px] z-[100000000] bg-white   pt-2 flex justify-center border-t-2 absolute lg:relative w-full bottom-0">

							<div className="grid grid-cols-5 lg:grid-cols-6 text-center items-center ">


								<div className="group transition-all fade-in-out mx-5">
									<div onClick={() => {
									}} id="ToggleMicBtn" className="border-0 rounded-lg p-2 w-fit mx-auto group-hover:bg-orange-500 group-hover:bg-opacity-20 transition-all fade-in-out group-hover:text-orange-500 " ><BsFillEmojiSmileFill /></div>
									<div className="hidden md:block lg:text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500">Emoji</div>
								</div>

								<div className="group transition-all fade-in-out mx-5">
									<div onClick={() => {
										ToggleMic(MicOn)
									}} id="ToggleMicBtn" className="border-0 rounded-lg p-2 w-fit mx-auto group-hover:bg-orange-500 group-hover:bg-opacity-20 transition-all fade-in-out group-hover:text-orange-500 " >{!MicOn ? (<BsFillMicMuteFill className="w-4 h-4 lg:w-5 lg:h-5" />) : (<BsFillMicFill className="w-4 h-4 lg:w-5 lg:h-5" />)}</div>
									<div className="hidden md:block lg:text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500">{MicOn ? "Mic On" : "Mic Off"}</div>
								</div>


								<div className="group transition-all fade-in-out mx-5">
									<div onClick={() => {
										ToggleCamera(CamOn)
									}} id="ToggleVideoBtn" className="border-0 rounded-lg p-2 w-fit mx-auto group-hover:bg-orange-500 group-hover:bg-opacity-20 transition-all fade-in-out group-hover:text-orange-500 text-sm" >{!CamOn ? (<BsFillCameraVideoOffFill className="w-4 h-4 lg:w-5 lg:h-5" />) : (<BsCameraVideoFill className="w-4 h-4 lg:w-5 lg:h-5" />)}</div>
									<div className="hidden md:block lg:text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500">{CamOn ? "Cam On" : "Cam Off"}</div>
								</div>

								<div className="group transition-all hidden lg:block fade-in-out mx-5">
									<div onClick={() => {
										handleScreenShare(ScreenShareOn, ScreenSharingStream, setScreenShareOn, peers, props.socketId, localStream, socket, auth, roomID)
									}} className="border-0 rounded-lg p-2 w-fit mx-auto group-hover:bg-orange-500 group-hover:bg-opacity-20 transition-all fade-in-out group-hover:text-orange-500" >{ScreenShareOn ? (<LuScreenShareOff className="w-4 h-4 lg:w-5 lg:h-5" />) : (<LuScreenShare className="w-4 h-4 lg:w-5 lg:h-5" />)}</div>
									<div className="text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500">{!ScreenShareOn ? "Start Sharing" : "Stop Sharing"}</div>
								</div>


								<div className="group transition-all hidden lg:block fade-in-out mx-5">
									<div onClick={() => {
										ToggleBoard()
									}} className="border-0 rounded-lg p-2 w-fit mx-auto group-hover:bg-orange-500 group-hover:bg-opacity-20 transition-all fade-in-out group-hover:text-orange-500" > <BsClipboard2Fill className="w-4 h-4 lg:w-5 lg:h-5" /></div>
									<div className="text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500">Open Board</div>
								</div>


								<div id="HandRaise" className="group transition-all fade-in-out mx-5">
									<div onClick={() => {
										console.log('clicked')
										const handRaiseData = {
											handraise: true,
											username: props.identity
										}
										for (let socketId in peers.current) {
											let peer = peers.current[socketId];
											peer.send(JSON.stringify(handRaiseData))
										}
										toast(`${props.identity} has raised his hand`, {
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


									}} id="ToggleMicBtn" className="border-0 rounded-lg p-2 w-fit mx-auto group-hover:bg-orange-500 group-hover:bg-opacity-20 transition-all fade-in-out group-hover:text-orange-500 " ><FaHandPaper /></div>
									<div className="hidden md:block lg:text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500">Raise Hand</div>
								</div>



								<div id="MoreBtn" className="group lg:hidden transition-all fade-in-out mx-5">
									<div onClick={() => {
										ToggleMoreBtn()
									}} id="ToggleMicBtn" className="border-0 rounded-lg p-2 w-fit mx-auto group-hover:bg-orange-500 group-hover:bg-opacity-20 transition-all fade-in-out group-hover:text-orange-500 " ><FiMoreVertical className="w-4 h-4 lg:w-5 lg:h-5" /></div>
									<div className="hidden md:block lg:text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500">More</div>
								</div>

							</div>
							<div className="flex justify-center items-center">
								<div className="group transition-all fade-in-out mx-5">
									<div className="border-0 rounded-lg text-white p-2 w-fit mx-auto bg-red-500 hover:bg-red-600 transition-all fade-in-out "><IoExit className="w-4 h-4 lg:w-5 lg:h-5" /></div>
									<div className="hidden md:block lg:text-md transition-all fade-in-out  mt-2 text-red-500 hover:text-red-600 ">Leave Call</div>
								</div>
							</div>


						</div>
					</div>
					<div
						id="ChatParticipantsBox"
						className="h-full z-[10000000000] border-0 pt-12 lg:pt-0 absolute lg:relative w-full lg:p-5 lg:w-[550px] hidden border-l-2 rounded-lg"
					>
						<div id="CloseChatParticipantsBox" className=" lg:hidden absolute top-0 w-full h-12 bg-gray-200 flex items-center px-5 pt-3">
							<AiOutlineClose className='w-6 h-6 ' onClick={() => {
								document.getElementById('ChatParticipantsBox').classList.add('hidden')
							}} />
						</div>
						<div className="bg-gray-200 w-full h-full  grid grid-rows-[80px_auto_80px] rounded-lg">
							<div className="w-full h-full border-0 rounded-t-xl border-black  p-3">
								<div className="border-0 border-red-500 rounded-lg bg-gray-100 w-full h-full grid grid-cols-2 text-center p-2">
									<div onClick={handleToggleMessageBtn} id="MessageBtn" className="" >Messages</div>
									<div onClick={handleToggleParticipantsBtn} id="ParticipantsBtn"  >Participants({props.participants.length})</div>
								</div>
							</div>
							<div id="Chat_Area" className=" h-full border-0 border-black relative flex justify-center overflow-x-hidden">

								<div id="Messages" className="h-full w-full mx-2">


									{props.messages.map((message, index) => {
										return (
											<div key={index}>
												<EachMessage setProgress={setProgress} worker={worker} setGotFile={setGotFile} message={message} />
											</div>
										)
									})}


								</div>
								<div id="Participants" className="p-3 w-full h-full">
									<ParticipantsList isRoomHost={props.isRoomHost} participants={props.participants} />
								</div>
							</div>

							<div onClick={(event) => {

								handleToggleMessageBtn()
							}} id="SendMessage" className="w-full  border-0 border-black p-3 ">

								<div className="bg-white rounded-lg w-full  flex relative justify-center ">



									<div id="FileInput" className="bg-white border-2 border-red-500 h-[30px] w-full absolute  mx-auto bottom-0 top-[10px] z-[-100]">
										<input type="File" id="DataInput" name='DataInput' onChange={(e) => {
											selectFile(setFile, e)
										}} />
									</div>

									<div className="border-r-2 border-gray-300 flex justify-center items-center mx-auto my-auto px-3 py-2 cursor-pointer z-[100] transition-all fade-in-out" ref={Attachmentref} onClick={handleToggleFileInput} >
										<GrAttachment className="w-4 h-4 lg:w-5 lg:h-5" />
									</div>
									<input id="sendInput" onKeyDown={(event) => {
										if (event.key === 'Enter') {
											if (File && (message?.length === 0 || !message)) sendFile(File, peers, props.identity, setProgress, setFile)
											else if (!File && (message?.length > 0 || message)
											) sendMessage(message, setmessage, peers)
											setFile(null)
											setmessage(null)
										}
									}} onChange={(e) => {
										setmessage(e.target.value)
									}} placeholder="Write a Message ..." className="w-full text-start items-center px-2 outline-none" />


									<div id="SendMessageBtn" onClick={() => {

										if (File && (message?.length === 0 || !message)) sendFile(File, peers, props.identity, setProgress, setFile)
										else if (!File && (message?.length > 0 || message)
										) sendMessage(message, setmessage, peers)
										setFile(null)
										setmessage(null)
									}} className="border-l-2 flex my-auto mx-auto justify-center items-center  border-gray-300 py-2 px-2">
										<BsFillSendFill className="w-10 h-10 bg-yellow-500 p-3 text-white rounded-lg hover:bg-yellow-600/80 transition-all fade-in-out" />
									</div>
								</div>
							</div>
						</div>

					</div>



				</div>
			</div>
		</div>
		<div id="board-section" className="w-full h-full top-[-1000px] absolute z-[1000000000000000] transition-all fade-in-out duration-500">
				<Board peers={peers} />
			</div>
		</div>
	);
}


function mapStateToProps(state) {
	return {
		...state
	};
}

export default connect(mapStateToProps)(LaptopRoom);