import React, { useContext, useEffect, useRef, useState } from "react";
import Emoji from "./Emoji";
import {
	BsCameraVideoFill,
	BsFillCameraVideoOffFill,
	BsChatLeftDots,
	BsPeople,
	BsClipboard2Fill,
	BsClipboard2XFill,
	BsFillMicFill,
	BsFillMicMuteFill,
	BsFillSendFill,
	BsFillEmojiSmileFill,
	BsFillRecordBtnFill,
} from "react-icons/bs";
import {
	EmailShareButton,
	FacebookShareButton,
	InstapaperShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	EmailIcon,
	FacebookIcon,
	FacebookMessengerIcon,
	HatenaIcon,
	InstapaperIcon,
	LineIcon,
	LinkedinIcon,
	LivejournalIcon,
	MailruIcon,
	OKIcon,
	PinterestIcon,
	PocketIcon,
	RedditIcon,
	TelegramIcon,
	TumblrIcon,
	TwitterIcon,
	ViberIcon,
	VKIcon,
	WeiboIcon,
	WhatsappIcon,
	WorkplaceIcon
} from "react-share";
import { TbListDetails } from 'react-icons/tb'
import parse from "html-react-parser";
import Stack from "@mui/material/Stack";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { LuScreenShareOff, LuScreenShare } from "react-icons/lu";
import { IoExit } from "react-icons/io5";
import { Flip } from "react-toastify";
import { GrAttachment } from "react-icons/gr";
import Context from "../context/Context";
import { useRouter } from "next/router";
import VideoGrid from "./VideoGrid";
import LocalScreenSharePreview from "./LocalScreenSharePreview";
import EachMessage from "./EachMessage";
import { connect } from "react-redux";
import ParticipantsList from "./ParticipantsList";
import DownloadMessage from "./DownloadMessage";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";

import { getLocalPreviewAndInitRoomConnection } from "../utils/GetLocalPreviewAndInitRoomConnection";
import { sendMessage } from "../utils/MessageUtils";
import { selectFile } from "../utils/ShareFileUtils";
import { sendFile } from "../utils/ShareFileTwo";
import {
	connectionWithSocketServer,
	handleDisconnectedUser,
} from "../utils/connectionWithSocketServer";
import { handleScreenShare } from "../utils/ScreenShareUtils";
import Board from "./Board";
import SpeechToText from "../utils/SpeechToText";
import { AiFillFileText, AiOutlineFileText } from "react-icons/ai";
import axios from "axios";
import UserJoinModal from "./UserJoinModal";
import useWindowSize from "@rooks/use-window-size";

import { FiMoreVertical } from "react-icons/fi";
import { FaHandPaper } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { LeaveRoom } from "../utils/LeaveRoom";
import { BiMessageAltError } from "react-icons/bi";
import PrivateMessaing from "./PrivateMessaing";
import SpeechToTextEditor from "./SpeechToTextEditor";
import Link from "next/link";
import { setActiveConversation, setDirectChatHistotry, setIdentity, setIsRoomHost, setMessages, setParticipants, setRoomCapacity, setRoomId, setSocketId, setTranscript } from "../store/actions";
import { store } from "../store/store";
import NewLaptopRoom from "./NewLaptomRoom";
import EmailBody from "./EmailBody";

function LaptopRoom(props) {
	const { socket } = props;
	const { innerWidth } = useWindowSize();
	const router = useRouter();
	const worker = useRef();
	const [loading,setloading] = useState(true)
	const roomID = router.query.EachRoom;
	const [LeftNavOpen, setLeftNavOpen] = useState(true);
	const [roomHostUsername, setroomHostUsername] = useState(null);
	const {
		isHost,
		identity,
		overlay,
		setoverlay,
		title,
		auth,
		localStream,
		video,
		audio,
		user,
		RoomCapacity,
		setjoinroom,
		setvideo,
	} = useContext(Context);
	
	const [MicOn, setMicOn] = useState(audio);
	const [CamOn, setCamOn] = useState(video);
	const [ScreenShareOn, setScreenShareOn] = useState(false);
	const [BoardOn, setBoardOn] = useState(false);
	let ScreenSharingStream = useRef();
	const [message, setmessage] = useState(null);
	const [File, setFile] = useState(null);
	let peers = useRef({});
	let peersRef = useRef([]);
	const [JoinModal, setIsJoinModal] = useState(false);
	const [peerUserID, setpeerUserID] = useState(null);
	const Attachmentref = useRef(null);
	const FileNameRef = useRef();
	const [GotFile, setGotFile] = useState(false);
	const FileSentBy = useRef();
	const setProgress = useRef();
	const isDrawing = useRef(false);
	const IceServers = useRef(null);
	const [RecordingOn, setRecordingOn] = useState(false);
	const mediaRecorder = useRef();
	const [DownlaodingText, setDownloadingText] = useState(0);
	const [UploadingText, setUploadingText] = useState(0);
	const BoardMap = useRef(new Map());
	const [speechToText, setSpeechToText] = useState(false);
	const [newTranscript, setnewTranscript] = useState("");
	const [ConnUserIdentity, setConnUserIdentity] = useState(null);
	const [PeerUsername, setPeerUsername] = useState(null);
	const [RoomDetails, setRoomDetails] = useState({ roomID: roomID, roomCapacity: null, roomTitle: null });
	const peervideo = useRef(false)
	const [Pinned, setPinned] = useState(false)
	const [TagDetails, setTagDetails] = useState({
		tagged: false,
		taggedBy: null,
		taggedTo: null,
		taggedMessage: null,
	});
	const Toasts = useRef(new Map())
	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition,
	} = useSpeechRecognition();
	let Transcript = useRef("");


	const handleToggleLeftNav = () => {
		if (document.getElementById("Left_Nav").classList.contains("lg:flex")) {

			document.getElementById("Left_Nav").className =
				"hidden bg-[#D3D3D3] lg:hidden  h-full flex-col items-center justify-center transition-all fade-in-out w-[80px] ";
			setLeftNavOpen(true);
		} else {
			document.getElementById("Left_Nav").className =
				"hidden bg-[#D3D3D3] lg:flex  h-full flex-col items-center justify-center transition-all fade-in-out w-[80px] ";
			setLeftNavOpen(false);
		}
	};
	const [OpenModals, setOpenModals] = useState(new Map());
	useEffect(() => {
		worker.current = new Worker("/worker.js");
		connectionWithSocketServer(
			socket,
			peers,
			ScreenSharingStream,
			localStream,
			worker,
			setGotFile,
			FileNameRef,
			FileSentBy,
			setProgress,
			isDrawing,
			Transcript,
			IceServers,
			setIsJoinModal,
			setpeerUserID,
			innerWidth,
			props.participants.length,
			isHost,
			auth,
			user,
			roomID,
			setoverlay,
			title,
			setDownloadingText,
			BoardMap,
			setroomHostUsername,
			roomHostUsername,
			setPeerUsername,
			PeerUsername,
			RoomCapacity,
			setRoomDetails,
			peervideo,
			setOpenModals,
			Toasts,
			
		);
			
		const handleClickOutsideAttachmentBtn = (e) => {
			if (
				Attachmentref.current &&
				!Attachmentref.current.contains(e.target) &&
				!document.getElementById("FileInput").contains(e.target)
			) {
				document.getElementById("FileInput").className =
					"bg-white border-0  border-red-500 left-[-1000px] absolute w-full mx-auto   z-[1000] flex justify-center items-center px-2 py-2 rounded-lg transition-all fade-in-out duration-500 mx-auto my-auto";
				document.getElementById("sendInput").style.display = "block";
			}
		};

		const handleClickOutsideMoreBtn = (e) => {
			const MoreBtnMenu = document.getElementById("MoreBtnMenu");
			if (document.getElementById("MoreBtnMenu")?.contains(e.target)) {
				if (MoreBtnMenu.classList.contains("bottom-[-500px]")) {
					MoreBtnMenu.className =
						"absolute w-full lg:hidden  h-[300px] bottom-[100px] right-0 bg-white  !z-[1000] transition-all fade-in-out duration-500";
				} else {
					MoreBtnMenu.className =
						"absolute w-full lg:hidden  h-[300px] bottom-[-500px] right-0 bg-white  !z-[1000] transition-all fade-in-out duration-500";
				}
			}
			if (document.getElementById("MoreBtn").contains(e.target)) {
				return;
			}
			if (
				document.getElementById("MoreBtnMenu").classList.contains("bottom-[-500px]")
			) {
				return;
			} else {
				if (MoreBtnMenu.classList.contains("bottom-[-500px]")) {
					MoreBtnMenu.className =
						"absolute w-full lg:hidden  h-[300px] bottom-[100px] right-0 bg-white  !z-[1000] transition-all fade-in-out duration-500";
				} else {
					MoreBtnMenu.className =
						"absolute w-full lg:hidden  h-[300px] bottom-[-500px] right-0 bg-white  !z-[1000] transition-all fade-in-out duration-500";
				}
			}
		};

		const handleClickOutsideEmojiButton = (e) => {
			if (document.getElementById("emoji-section").contains(e.target)) {
				return
			}
			else if (document.getElementById("EmojiBtn").contains(e.target)) {
				const EmojiSection =
					document.getElementById("emoji-section");
				if (EmojiSection.classList.contains("top-[-1000px]")) {
					EmojiSection.className =
						" absolute  z-[100] top-0 h-fit w-fit  md:left-auto md:bottom-auto  bg-white  transition-all fade-in-out  ";
				} else {
					EmojiSection.className =
						"absolute  z-[100] top-[-1000px]  h-fit w-fit  md:left-auto md:bottom-auto  bg-white  transition-all fade-in-out  ";
				}
			}
			else {
				const EmojiSection = document.getElementById("emoji-section");
				EmojiSection.className =
					"absolute  z-[100] top-[-1000px]   h-fit w-fit  md:left-auto md:bottom-auto  bg-white  transition-all fade-in-out  ";
			}
		}
		document.addEventListener("click", handleClickOutsideMoreBtn, true);
		document.addEventListener("click", handleClickOutsideAttachmentBtn, true);
		document.addEventListener("click", handleClickOutsideEmojiButton, true);
		return () => {
			document.removeEventListener("click", handleClickOutsideMoreBtn, true);
			document.removeEventListener("click", handleClickOutsideAttachmentBtn, true);
			document.removeEventListener("click", handleClickOutsideEmojiButton, true);
			worker.current?.terminate();
			handleDisconnectedUser(peers, props.socketId, setjoinroom);
			setjoinroom(true)
		};
	}, []);

	const ToggleMic = (MicOn) => {
		if (MicOn) {
			localStream.current.getAudioTracks()[0].enabled = false;
			for (let socketId in peers.current) {
				let peer = peers.current[socketId]
				const data = { micoff: true, socketId: props.socketId }
				peer.send(JSON.stringify(data))
			}
			setMicOn(false);
		} else {
			localStream.current.getAudioTracks()[0].enabled = true;
			for (let socketId in peers.current) {
				let peer = peers.current[socketId]
				const data = { micon: true, socketId: props.socketId }
				peer.send(JSON.stringify(data))
			}
			setMicOn(true);
		}
	};

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

	const ToggleCamera = async (CamOn) => {
		const localVideo = document.getElementById('my_video_container');
		const fakeVideo = document.getElementById('my_fakevideo');

		console.log(fakeVideo)
		if (localStream.current.getVideoTracks()[0].enabled) {

			localVideo.style.display = "none"
			fakeVideo.style.display = "block"
			localStream.current.getVideoTracks()[0].enabled = false



			for (let socketId in peers.current) {
				let peer = peers.current[socketId]
				const data = { videostopped: true, socketId: props.socketId }
				peer.send(JSON.stringify(data))
			}

			setCamOn(false)
		}
		else {

			localStream.current.getVideoTracks()[0].enabled = true
			localVideo.style.display = "block"
			fakeVideo.style.display = "none"
			for (let socketId in peers.current) {
				let peer = peers.current[socketId]
				const data = { videostarted: true, socketId: props.socketId }
				peer.send(JSON.stringify(data))
			}

			setCamOn(true)
		}

	};

	const handleToggleChatParticipantsArea = (mode) => {
		const Chat_Area = document.getElementById("Chat_Area");
		setTimeout(() => {
			Chat_Area.scrollTop = Chat_Area.scrollHeight - Chat_Area.clientHeight;
		}, 100);
		const ChatParticipantsBox = document.getElementById("ChatParticipantsBox");
		let Left_Nav_Message_Btn = document.getElementById("Left_Nav_Message_Btn");
		let Left_Nav_Participants_Btn = document.getElementById(
			"Left_Nav_Participants_Btn"
		);
		let Left_Nav_Video_Btn = document.getElementById("Left_Nav_Video_Btn");

		if (mode === "Chat") {
			if (ChatParticipantsBox.classList.contains("hidden") || document.getElementById('Messages').classList.contains('right-[1000px]')) {
				ChatParticipantsBox.classList.remove("hidden");
			}
			else {
				ChatParticipantsBox.classList.add("hidden");
			}
			Left_Nav_Video_Btn.className =
				"focus:bg-white cursor-pointer !h-fit my-5 p-3 rounded-lg hover:bg-white transition-all text-orange-600 bg-opacity-100 hover:bg-opacity-100";
			Left_Nav_Message_Btn.className =
				"focus:bg-white cursor-pointer !h-fit my-5 p-3 rounded-lg bg-white transition-all text-orange-600 bg-opacity-100 hover:bg-opacity-100";
			Left_Nav_Participants_Btn.className =
				"focus:bg-white cursor-pointer !h-fit my-5 p-3 rounded-lg hover:bg-white transition-all text-orange-600 bg-opacity-100 hover:bg-opacity-100";
			handleToggleMessageBtn();
		} else if (mode === "Participants") {
			if (ChatParticipantsBox.classList.contains("hidden") || document.getElementById('Participants').classList.contains('right-[1000px]')) {
				ChatParticipantsBox.classList.remove("hidden");
			}
			else {
				ChatParticipantsBox.classList.add("hidden");
			}
			Left_Nav_Video_Btn.className =
				"focus:bg-white cursor-pointer !h-fit my-5 p-3 rounded-lg hover:bg-white transition-all text-orange-600 bg-opacity-100 hover:bg-opacity-100";
			Left_Nav_Message_Btn.className =
				"focus:bg-white cursor-pointer !h-fit my-5 p-3 rounded-lg hover:bg-white transition-all text-orange-600 bg-opacity-100 hover:bg-opacity-100";
			Left_Nav_Participants_Btn.className =
				"focus:bg-white cursor-pointer !h-fit my-5 p-3 rounded-lg bg-white transition-all text-orange-600 bg-opacity-100 hover:bg-opacity-100";
			handleToggleParticipantsBtn();
		} else if (mode === "Video") {
			Left_Nav_Video_Btn.className =
				"focus:bg-white cursor-pointer !h-fit my-5 p-3 rounded-lg bg-white transition-all text-orange-600 bg-opacity-100 hover:bg-opacity-100";
			Left_Nav_Message_Btn.className =
				"focus:bg-white cursor-pointer !h-fit my-5 p-3 rounded-lg hover:bg-white transition-all text-orange-600 bg-opacity-100 hover:bg-opacity-100";
			Left_Nav_Participants_Btn.className =
				"focus:bg-white cursor-pointer !h-fit my-5 p-3 rounded-lg hover:bg-white transition-all text-orange-600 bg-opacity-100 hover:bg-opacity-100";
			handleToggleLeftNav();
			ChatParticipantsBox.classList.add("hidden");
		}
	};

	const handleOpenMessage = () => {
		const ParticipantsBox = document.getElementById("Participants");
		const MessageBox = document.getElementById("Messages");
		MessageBox.className =
			"absolute h-full border-0 border-red-500 w-full right-0 transition-all fade-in-out";
		ParticipantsBox.className =
			"absolute h-full border-0 border-blue-500 w-full right-[1000px] transition-all fade-in-out";

	};

	const handleOpenParticipants = () => {
		const ParticipantsBox = document.getElementById("Participants");
		const MessageBox = document.getElementById("Messages");
		MessageBox.className =
			"absolute h-full border-0 border-red-500 w-full right-[1000px] transition-all fade-in-out";
		ParticipantsBox.className =
			"absolute h-full border-0 border-blue-500 w-full right-0 transition-all fade-in-out";

	};

	const handleToggleMessageBtn = () => {
		const MessageBtn = document.getElementById("MessageBtn");
		const ParticipantsBtn = document.getElementById("ParticipantsBtn");
		MessageBtn.className =
			"flex items-center justify-center border-0 border-red-500 rounded-lg bg-[#D3D3D3] bg-opacity-50 font-bold hover:text-orange-600  text-orange-600 transition-all fade-in-out";
		ParticipantsBtn.className =
			"flex items-center justify-center border-0 border-red-500 rounded-lg bg-[#D3D3D3] bg-opacity-0 font-bold hover:text-orange-600  text-gray-800 transition-all fade-in-out";
		handleOpenMessage();
	};

	const handleToggleParticipantsBtn = () => {
		const MessageBtn = document.getElementById("MessageBtn");
		const ParticipantsBtn = document.getElementById("ParticipantsBtn");
		ParticipantsBtn.className =
			"flex items-center justify-center border-0 border-red-500 rounded-lg bg-[#D3D3D3] bg-opacity-50 font-bold hover:text-orange-600  text-orange-600 transition-all fade-in-out";
		MessageBtn.className =
			"flex items-center justify-center border-0 border-red-500 rounded-lg bg-[#D3D3D3] bg-opacity-0 font-bold hover:text-orange-600  text-gray-800 transition-all fade-in-out";
		handleOpenParticipants();
	};

	const ToggleBoard = () => {
		const BoardSection = document.getElementById("board-section");
		const VideoSection = document.getElementById("video-section");
		const TextEditor = document.getElementById("TextEditor");
		BoardSection.className =
			"w-full h-full top-[0px] absolute z-[100]  transition-all fade-in-out duration-500";
	};

	if (overlay) {
		return <h1 className="py-20 text-center font-bold text-5xl">Loading...</h1>;
	}

	const handleToggleFileInput = () => {
		const MessageInput = document.getElementById("sendInput");
		if (
			document.getElementById("FileInput").classList.contains("left-[-1000px]")
		) {
			document.getElementById("FileInput").className =
				"bg-white border-0  border-red-500 left-0 absolute w-full mx-auto   z-[1000] flex justify-center items-center px-2 py-2 rounded-lg transition-all fade-in-out duration-500 mx-auto my-auto";
			MessageInput.style.display = "none";
		} else {
			document.getElementById("FileInput").className =
				"bg-white border-0 border-red-500  left-[-1000px] absolute w-full mx-auto   z-[1000] flex justify-center items-center px-2 py-2 rounded-lg transition-all fade-in-out duration-500 mx-auto my-auto";
			MessageInput.style.display = "block";
		}
	};

	const OpenTextEditor = () => {
		const TextEditor = document.getElementById("TextEditor");
		if (TextEditor.classList.contains("left-[-2000px]")) {
			TextEditor.className =
				"w-full h-screen absolute z-[100] bg-white left-0 transition-all fade-in-out duration-500 border-0 border-black flex flex-col top-0";
		} else {
			TextEditor.className =
				"w-full h-screen absolute z-[100] bg-white left-[-2000px] transition-all fade-in-out duration-500 border-0 border-black  top-0";
		}
	};

	const ToggleMoreBtn = () => {
		const MoreBtnMenu = document.getElementById("MoreBtnMenu");
		if (MoreBtnMenu.classList.contains("bottom-[-500px]")) {
			MoreBtnMenu.className =
				"absolute w-full lg:hidden  h-[300px]  bottom-[100px] right-0 bg-white border-0 border-blue-500 z-[10000000000]  transition-all fade-in-out duration-500";
		} else {
			MoreBtnMenu.className =
				"absolute w-full lg:hidden  h-[300px]  bottom-[-500px] right-0 bg-white border-0 border-blue-500 z-[10000000000]  transition-all fade-in-out duration-500";
		}
	};

	const CaptureScreen = async () => {
		const stream = await navigator.mediaDevices.getDisplayMedia({
			video: {
				cursor: "always",
			},
			audio: {
				echoCancellation: true,
				noiseSuppression: true,
			},
		});
		return stream;
	};
	const CaptureAudio = async () => {
		const stream = await navigator.mediaDevices.getUserMedia({
			video: false,
			audio: {
				echoCancellation: true,
				noiseSuppression: true,
			},
		});
		return stream;
	};
	const handleRecording = async () => {
		const chunks = []; // Initialize chunks as an array

		if (RecordingOn === false) {
			const RecordingStream = await CaptureScreen();
			const AudioStream = await CaptureAudio();
			RecordingStream.addTrack(AudioStream.getAudioTracks()[0]);
			mediaRecorder.current = new MediaRecorder(RecordingStream);
			mediaRecorder.current.start();

			mediaRecorder.current.onstop = () => {
				RecordingStream.getTracks().forEach((track) => track.stop());
				const blob = new Blob(chunks, { type: "video/webm" });

				const url = window.URL.createObjectURL(blob);

				const a = document.createElement("a");
				a.style.display = "none";
				a.href = url;
				a.download = "test.webm";
				document.body.appendChild(a);
				a.click();
				setTimeout(() => {
					document.body.removeChild(a);
					window.URL.revokeObjectURL(url);
				}, 100);
			};

			mediaRecorder.current.ondataavailable = (e) => {
				chunks.push(e.data); // Add the received data to the chunks array
			};

			setRecordingOn(true);
		} else {
			mediaRecorder.current.stop();
			setRecordingOn(false);
		}
	};

	const OpenPrivateMessaging = () => {
		const PrivateMessaging = document.getElementById("PrivateMessaging");
		if (PrivateMessaging.classList.contains("left-[-2000px]")) {
			PrivateMessaging.className =
				"absolute w-full h-screen  top-0 bg-white grid grid-rows-[80px_auto]  left-[0px] z-[100000] transition-all fade-in-out duration-500";
		} else {
			PrivateMessaging.className =
				"absolute w-full h-screen  top-0 bg-white grid grid-rows-[80px_auto] left-[-2000px] z-[100000] transition-all fade-in-out duration-500";
		}
	};

	const ToggleMeetingsDetails = () => {
		if (document.getElementById('MeetingDetails').classList.contains('left-[-2000px]')) {
			document.getElementById('MeetingDetails').className = 'absolute w-full lg:w-fit p-4 h-screen lg:h-fit bg-white font-bold text-black border-2 bottom-0 lg:bottom-[100px]  z-[100] left-0 md:left-[100px] transition-all fade-in-out  text-center lg:text-start flex  lg:justify-start  items-center flex-col lg:block'
		}
		else {
			document.getElementById('MeetingDetails').className = 'absolute w-full lg:w-fit p-4 h-screen lg:h-fit bg-white font-bold text-black border-2 bottom-0 lg:bottom-[100px]  z-[100]  left-[-2000px] transition-all fade-in-out  text-center lg:text-start flex lg:justify-start items-center flex-col lg:block'
		}
	}
	
	return (
		<div>

			<div className="!overflow-hidden">

				<div id="JoinModal" className="flex h-screen w-full !overflow-hidden relative">
					
					<div
						id="MoreBtnMenu"
						className="absolute w-full lg:hidden  h-[300px] bottom-[-500px] right-0 bg-white  !z-[10] transition-all fade-in-out duration-500"
					>

						<div className="w-full h-full grid grid-cols-3 justify-between items-center">
							<div
								id="Left_Nav_Message_Btn"
								className=" cursor-pointer h-full w-full  p-3 rounded-lg  transition-all flex flex-col text-center  justify-center mx-auto text-orange-600 hover:bg-orange-500 focus:bg-orange-500 bg-opacity-0 hover:bg-opacity-20"
								onClick={() => {
									handleToggleChatParticipantsArea("Chat");
								}}
							>
								<BsChatLeftDots className="w-7 h-7 mx-auto" />
								<div className="text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500 text-center">
									{"Messages"}
								</div>
							</div>
							<div
								id="Left_Nav_Participants_Btn"
								className=" cursor-pointer h-full w-full  p-3 rounded-lg  transition-all flex flex-col text-center justify-center mx-auto text-orange-600 hover:bg-orange-500 focus:bg-orange-500 bg-opacity-0 hover:bg-opacity-20"
								onClick={() => {
									handleToggleChatParticipantsArea("Participants");
								}}
							>
								<BsPeople className="w-7 h-7 mx-auto" />
								<div className="text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500 text-center">
									{"Participants"}
								</div>
							</div>

							<div
								id="Left_Nav_Editor_Btn"
								className=" cursor-pointer h-full w-full  p-3 rounded-lg  transition-all flex flex-col text-center  justify-center mx-auto text-orange-600 hover:bg-orange-500 focus:bg-orange-500 bg-opacity-0 hover:bg-opacity-20"
								onClick={() => {
									OpenTextEditor();
								}}
							>
								<AiFillFileText className="w-7 h-7 mx-auto" />
								<div className="text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500 text-center">
									{"Text Editor"}
								</div>
							</div>


							<div
								onClick={() => {
									ToggleBoard();
								}}
								className="group transition-all flex flex-col text-center h-full w-full p-2 rounded-md justify-center mx-auto lg:hidden fade-in-out  hover:bg-orange-500 focus:bg-orange-500 bg-opacity-0 cursor-pointer hover:bg-opacity-20"
							>
								<div className="border-0 rounded-lg p-2 w-fit mx-auto text-orange-500  transition-all fade-in-out ">
									<BsClipboard2Fill className="w-4 h-4 lg:w-5 lg:h-5" />
								</div>
								<div className="text-md transition-all fade-in-out text-gray-400 mt-2 ">
									Open Board
								</div>
							</div>

							<div
								id="Left_Nav_Editor_Btn"
								className=" cursor-pointer h-full w-full  p-3 rounded-lg  transition-all flex flex-col text-center  justify-center mx-auto text-orange-600 hover:bg-orange-500 focus:bg-orange-500 bg-opacity-0 hover:bg-opacity-20"
								onClick={() => {
									OpenPrivateMessaging();
								}}
							>
								<BiMessageAltError className="w-7 h-7 mx-auto" />
								<div className="text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500 text-center">
									{"Private Chat"}
								</div>
							</div>
							<div
								id="Left_Nav_Meetings_Btn"
								className=" cursor-pointer h-full w-full  p-3 rounded-lg  transition-all flex flex-col text-center  justify-center mx-auto text-orange-600 hover:bg-orange-500 focus:bg-orange-500 bg-opacity-0 hover:bg-opacity-20"
								onClick={() => {
									ToggleMeetingsDetails()
								}}
							>
								<TbListDetails className="w-7 h-7 mx-auto" />
								<div className="text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500 text-center">
									{"Meeting Details"}
								</div>
							</div>
						</div>
					</div>
					<div className="w-100  border-r-2 ">
						<div
							id="Left_Nav"
							className="hidden bg-[#D3D3D3] lg:flex  h-full flex-col items-center justify-center transition-all fade-in-out w-[80px] "
						>
							<div
								onClick={() => {
									handleToggleChatParticipantsArea("Video");
								}}
								id="Left_Nav_Video_Btn"
								className="focus:bg-white cursor-pointer !h-fit my-5 p-3 rounded-lg bg-white transition-all text-orange-600 bg-opacity-100 hover:bg-opacity-100"
							>
								<BsCameraVideoFill className="w-7 h-7 " />
							</div>
							<div
								id="Left_Nav_Message_Btn"
								className="focus:bg-white cursor-pointer !h-fit my-5 p-3 rounded-lg hover:bg-white transition-all text-orange-600 bg-opacity-100 hover:bg-opacity-100"
								onClick={() => {
									handleToggleChatParticipantsArea("Chat");
								}}
							>
								<BsChatLeftDots className="w-7 h-7 " />
							</div>
							<div
								id="Left_Nav_Participants_Btn"
								className="focus:bg-white cursor-pointer !h-fit my-5 p-3 rounded-lg hover:bg-white transition-all text-orange-600 bg-opacity-100 hover:bg-opacity-100"
								onClick={() => {
									handleToggleChatParticipantsArea("Participants");
								}}
							>
								<BsPeople className="w-7 h-7 " />
							</div>
							<div
								id="Left_Nav_Recordings_Btn"
								className={`focus:bg-white cursor-pointer w-fit h-fit my-5  flex items-center flex-col justify-center lg:block p-3 rounded-lg ${RecordingOn ? 'bg-white' : 'hover:bg-white'
                    }  transition-all text-orange-600 bg-opacity-100 hover:bg-opacity-100`}
								onClick={() => {
									handleRecording();
								}}
							>
								<BsFillRecordBtnFill className={RecordingOn?"w-7 h-7 text-[#33ffff]":"h-7 w-7"} />
							</div>
							<SpeechToText
								Transcript={Transcript}
								speechToText={speechToText}
								setSpeechToText={setSpeechToText}
								resetTranscript={resetTranscript}
								transcript={transcript}
								peers={peers}
								browserSupportsSpeechRecognition={
									browserSupportsSpeechRecognition
								}
							/>

							<div
								id="Left_Nav_Editor_Btn"
								className="focus:bg-white cursor-pointer !h-fit my-5 p-3 rounded-lg hover:bg-white transition-all text-orange-600 bg-opacity-100 hover:bg-opacity-100"
								onClick={() => {
									OpenTextEditor();
								}}
							>
								<AiFillFileText className="w-7 h-7 " />
							</div>

							<div
								id="Left_Nav_Editor_Btn"
								className="focus:bg-white cursor-pointer !h-fit my-5 p-3 rounded-lg hover:bg-white transition-all text-orange-600 bg-opacity-100 hover:bg-opacity-100"
								onClick={() => {
									OpenPrivateMessaging();
								}}
							>
								<BiMessageAltError className="w-7 h-7" />
							</div>

							<div className="w-[60px] h-[60px] rounded-full bg-white border-2 border-black bottom-0 mt-auto mb-5 flex justify-center items-center " onClick={() => {
								ToggleMeetingsDetails()
							}}>
								<TbListDetails className="w-7 h-7" />
							</div>
						</div>
						<div id="MeetingDetails" className="absolute w-fit p-4 h-fit bg-white font-bold text-black border-2 bottom-[100px]   z-[100] left-[-2000px] transition-all fade-in-out">
							<div className="p-2 cursor-pointer bg-white  text-xl lg:hidden w-fit rounded-md" onClick={()=>{
								ToggleMeetingsDetails()
							}}>Close</div>
							<div className="my-5 ">Room Id : {props.roomId}</div>
							<div className="my-5">Current Room Capacity : {props.RoomCapacity}</div>
							<div id="#shareicons" className="flex .share-icons ">
								<div className="mx-2 mb-5 .shareicons">
									<EmailShareButton url={`https://iiti-so-c-23-web-40-video-conferencing-1xdm.vercel.app${router.asPath}`} subject={`Invitation For A Video Call On ConferoLive`} body={`${props.identity} has invited you to join a meeting`} ><EmailIcon separator="-" size={50} round={true} /></EmailShareButton>
								</div>
								<div className="mx-2 mb-5">
									<WhatsappShareButton url={`https://iiti-so-c-23-web-40-video-conferencing-1xdm.vercel.app${router.asPath}`} title={`${props.identity} has Invited You To Join A Meeting`} >
										<WhatsappIcon size={50} round={true} />
									</WhatsappShareButton>
								</div>
								<div className="mx-2 mb-5">
									<FacebookShareButton url={`https://iiti-so-c-23-web-40-video-conferencing-1xdm.vercel.app${router.asPath}`}>
										<FacebookIcon quote="Join A Meet" hanging={`by #${props.identity}`} size={50} round={true} />
									</FacebookShareButton>
								</div>
								<div className="mx-2 mb-5">
									<TwitterShareButton url={`https://iiti-so-c-23-web-40-video-conferencing-1xdm.vercel.app${router.asPath}`}  >
										<TwitterIcon title={'Wanna Join A Meet'} via={`${props.identity}`} size={50} round={true} />
									</TwitterShareButton>
								</div>

							</div>
							{props.isRoomHost && (
								<>
									<input min="0" onKeyPress={(event) => {
										const charCode = event.charCode;

										if (charCode < 48 || charCode > 57) {
											event.preventDefault();
										}
									}} type="number" className="p-2 border-2  border-black text-black outline-none" placeholder='Change Room Capacity w-full lg:w-fit my-2 lg:my-auto' /><button className="p-2 bg-black hover:ring-4 text-white hover:ring-opacity-50 hover:ring-black transition-all fade-in-out my-2 lg:my-auto" onClick={() => {
										if (props.isRoomHost && document.querySelector('input[type="number"]').value > 0) {
											axios.post('https://www.pradeeps-video-conferencing.store/api/v1/ChangeRoomCapacity', {
												roomID: RoomDetails.roomID,
												capacity: document.querySelector('input[type="number"]').value
											}, {
												headers: {
													Authorization: 'Bearer ' + auth.access
												}
											}).then((response) => {
												console.log(response.data)
												store.dispatch(setRoomCapacity(response.data.capacity))
												toast.success('Room Capacity Changed')
											}).catch((err) => {
												console.log(err)
												toast.error('Some Error Occured')
											})
										}
										else {
											toast.error('You Cannot Change Room Capacity')
										}

									}}>Change</button>
								</>
							)}

						</div>
					</div>
					<div className="flex-1 flex flex-col relative  overflow-y-hidden w-full  ">
						<div className="flex justify-center items-center">
							<div
								id="emoji-section"
								className="w-[50px] h-[300px] absolute mx-auto  z-[1000000] top-[-1000px] transition-all fade-in-out  bg-white "
							>
								<Emoji peers={peers} props={props} />
							</div>
						</div>
						<div className="h-[60px] md:block hidden px-3 border-b-2">
							{/* First row in the second column */}
							<div className="h-[60px] hidden lg:flex w-full py-3 ">
								<div
									onClick={handleToggleLeftNav}
									className="my-auto p-2 border-0 w-fit  bg-[#D3D3D3] bg-opacity-30 hover:bg-[#d2d2d2] hover:bg-opacity-100 transition-all fade-in-out cursor-pointer rounded-md "
								>
									{LeftNavOpen ? (
										<AiOutlineLeft className="w-6 h-6 mx-auto my-auto text-gray-500 " />
									) : (
										<AiOutlineRight className="w-6 h-6 mx-auto my-auto text-gray-500" />
									)}
								</div>
								<div className=" text-center font-bold items-center flex text-xl ml-4">
									{props.title}
								</div>
							</div>
						</div>
						<div id="" className="flex-1   overflow-y-scroll overflow-x-overlay video-section !z-[10] mx-auto">

							<VideoGrid
								length={props.participants.length}
								localStream={localStream.current}
								props={props}
								CamOn={CamOn}
								MicOn={MicOn}
								Pinned={Pinned}
								setPinned={setPinned}
								setoverlay={setoverlay}
								loading={loading}
								setloading={setloading}
							/>



						</div>
						<div className="h-[100px]  !overflow-hidden ">
							{/* Third row in the second column */}

							<div className="h-[100px]  bg-white flex justify-center border-t-2 absolute lg:relative w-full bottom-0 !overflow-hidden ">
								<div className="grid grid-cols-5 lg:grid-cols-6 text-center items-center ">
									<div
										id="EmojiBtn"


										className="group transition-all fade-in-out mx-5 cursor-pointer"
									>
										<div
											onClick={() => { }}
											id="ToggleMicBtn"
											className="border-0 rounded-lg p-2 w-[50px] mx-auto group-hover:bg-white group-hover:bg-opacity-100 transition-all fade-in-out group-hover:text-orange-500 "
										>
											<BsFillEmojiSmileFill className="mx-auto" />
										</div>
										<div className="hidden md:block lg:text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500">
											Emoji
										</div>
									</div>

									<div className="group transition-all fade-in-out mx-5 cursor-pointer">
										<div
											onClick={() => {
												ToggleMic(MicOn);
											}}
											id="ToggleMicBtn"
											className="border-0 rounded-lg p-2 w-fit mx-auto group-hover:bg-white group-hover:bg-opacity-100 transition-all fade-in-out group-hover:text-orange-500 "
										>
											{!MicOn ? (
												<BsFillMicMuteFill className="w-4 h-4 lg:w-5 lg:h-5" />
											) : (
												<BsFillMicFill className="w-4 h-4 lg:w-5 lg:h-5" />
											)}
										</div>
										<div className="hidden md:block lg:text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500">
											{MicOn ? "Mic On" : "Mic Off"}
										</div>
									</div>

									<div className="group transition-all fade-in-out mx-5 cursor-pointer">
										<div
											onClick={() => {
												ToggleCamera(CamOn);
											}}
											id="ToggleVideoBtn"
											className="border-0 rounded-lg p-2 w-fit mx-auto group-hover:bg-white group-hover:bg-opacity-100 transition-all fade-in-out group-hover:text-orange-500 text-sm"
										>
											{!CamOn ? (
												<BsFillCameraVideoOffFill className="w-4 h-4 lg:w-5 lg:h-5" />
											) : (
												<BsCameraVideoFill className="w-4 h-4 lg:w-5 lg:h-5" />
											)}
										</div>
										<div className="hidden md:block lg:text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500">
											{CamOn ? "Cam On" : "Cam Off"}
										</div>
									</div>

									<div className="group transition-all hidden lg:block fade-in-out mx-5 cursor-pointer">
										<div
											onClick={() => {
												handleScreenShare(
													ScreenShareOn,
													ScreenSharingStream,
													setScreenShareOn,
													peers,
													props,
													localStream,
													socket,
													auth,
													roomID
												);
											}}
											className="border-0 rounded-lg p-2 w-fit mx-auto group-hover:bg-white group-hover:bg-opacity-100 transition-all fade-in-out group-hover:text-orange-500"
										>
											{ScreenShareOn ? (
												<LuScreenShareOff className="w-4 h-4 lg:w-5 lg:h-5" />
											) : (
												<LuScreenShare className="w-4 h-4 lg:w-5 lg:h-5" />
											)}
										</div>
										<div className="text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500">
											{!ScreenShareOn ? "Start Sharing" : "Stop Sharing"}
										</div>
									</div>

									<div className="group transition-all hidden lg:block fade-in-out mx-5 cursor-pointer">
										<div
											onClick={() => {
												ToggleBoard();
											}}
											className="border-0 rounded-lg p-2 w-fit mx-auto group-hover:bg-white group-hover:bg-opacity-100 transition-all fade-in-out group-hover:text-orange-500"
										>
											{" "}
											<BsClipboard2Fill className="w-4 h-4 lg:w-5 lg:h-5" />
										</div>
										<div className="text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500">
											Open Board
										</div>
									</div>

									<div
										id="HandRaise"
										className="group transition-all fade-in-out mx-5 cursor-pointer"
									>
										<div
											onClick={() => {
												const handRaiseData = {
													handraise: true,
													username: props.identity,
												};
												for (let socketId in peers.current) {
													let peer = peers.current[socketId];
													peer.send(JSON.stringify(handRaiseData));
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
														backgroundColor: "#ff6f00",
														color: "white",
														bottom: "120px",
													},
												});
											}}
											id="ToggleMicBtn"
											className="border-0 rounded-lg p-2 w-fit mx-auto group-hover:bg-white group-hover:bg-opacity-100 transition-all fade-in-out group-hover:text-orange-500 "
										>
											<FaHandPaper />
										</div>
										<div className="hidden md:block lg:text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500">
											Raise Hand
										</div>
									</div>

									<div
										id="MoreBtn"
										className="group lg:hidden transition-all fade-in-out mx-5 cursor-pointer"
									>
										<div
											onClick={() => {
												ToggleMoreBtn();
											}}
											id="ToggleMicBtn"
											className="border-0 rounded-lg p-2 w-fit mx-auto group-hover:bg-white group-hover:bg-opacity-100 transition-all fade-in-out group-hover:text-orange-500 "
										>
											<FiMoreVertical className="w-4 h-4 lg:w-5 lg:h-5" />
										</div>
										<div className="hidden md:block lg:text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500">
											More
										</div>
									</div>
								</div>
								<div id="LeaveCallBtn" className="flex justify-center items-center !overflow-hidden !z-[10] cursor-pointer">
									<div className="group transition-all fade-in-out mx-5 !z-[0]" onClick={() => {
										console.log('clicked')
										localStream.current.getTracks().forEach((track) => {
											track.stop();
										});
										peers.current = {};
										window.location.href = "/CreateRoomPage"
										

										store.dispatch(setIdentity(null))
										store.dispatch(setRoomId(null))
										store.dispatch(setMessages([]))
										store.dispatch(setParticipants([]))

										store.dispatch(setIsRoomHost(false))
										store.dispatch(setActiveConversation(null))
										store.dispatch(setDirectChatHistotry([]))
										store.dispatch(setSocketId(null))
										store.dispatch(setTranscript(""))
										setRoomDetails({
											roomID: null,
											roomCapacity: null,
											title: null
										})
										
										localStorage.clear()
									}}>
										<div className="border-0 rounded-lg text-white p-2 w-fit mx-auto bg-red-500 hover:bg-red-600 transition-all fade-in-out ">
											<IoExit className="w-4 h-4 lg:w-5 lg:h-5" />
										</div>
										<div className="hidden md:block lg:text-md transition-all fade-in-out  mt-2 text-red-500 hover:text-red-600 " >
											Leave Call
										</div>
									</div>
								</div>



							</div>
						</div>
					</div>

					<div
						id="ChatParticipantsBox"
						className="h-full z-[100]  pt-12 lg:pt-0  absolute lg:relative w-full lg:w-[360px] hidden border-l-2 lg:pl-2"
					>
						<div
							id="CloseChatParticipantsBox"
							className=" lg:hidden absolute top-0 w-full h-12 bg-[#D3D3D3] flex items-center px-5 pt-3"
						>
							<AiOutlineClose
								className="w-6 h-6 "
								onClick={() => {
									document
										.getElementById("ChatParticipantsBox")
										.classList.add("hidden");
								}}
							/>
						</div>
						<div className="bg-[#D3D3D3] w-full h-full  grid grid-rows-[80px_auto_80px] ">
							<div className="w-full h-full border-0 rounded-t-xl border-black  p-3">
								<div className="border-0 border-red-500 rounded-lg bg-gray-100 w-full h-full grid grid-cols-2 text-center p-2">
									<div
										onClick={handleToggleMessageBtn}
										id="MessageBtn"
										className=""
									>
										Messages
									</div>
									<div
										onClick={handleToggleParticipantsBtn}
										id="ParticipantsBtn"
									>
										Participants({props.participants.length})
									</div>
								</div>
							</div>
							<div
								id="Chat_Area"
								className=" h-full border-0 border-black relative  justify-center overflow-x-hidden"
							>
								<div id="Messages" className="h-full w-full mx-2 relative">
									{props.messages.map((message, index) => {
										return (
											<div key={index}>
												<EachMessage
													props={props}
													DownlaodingText={DownlaodingText}
													setProgress={setProgress}
													worker={worker}
													setGotFile={setGotFile}
													message={message}
													UploadingText={UploadingText}
													TagDetails={TagDetails}
													setTagDetails={setTagDetails}
												/>
											</div>
										);
									})}
								</div>
								<div id="Participants" className="p-3 w-full h-full">
									<ParticipantsList
										props={props}
										peers={peers}
										socket={socket}
										roomID={roomID}
										isRoomHost={props.isRoomHost}
										participants={props.participants}
									/>
								</div>
							</div>

							<div
								onClick={(event) => {
									handleToggleMessageBtn();
								}}
								id="SendMessage"
								className="w-full  border-0 border-black relative p-3 "
							>
								{TagDetails.tagged && (
									<div className="absolute w-full h-fit justify-between items-center  flex text-white bg-gray-500 p-2  bottom-[80px]">
										Tagged {TagDetails.taggedTo} On{" "}
										{`"${TagDetails.taggedMessage}"`}
										<button
											className="bg-white p-2 rounded-md w-fit h-fit text-black m-2"
											onClick={() => {
												setTagDetails({
													tagged: false,
													taggedTo: null,
													taggedBy: null,
													taggedMessage: null,
												});
											}}
										>
											UnTag
										</button>
									</div>
								)}
								<div className="bg-white rounded-lg w-full  flex justify-center ">
									<div
										className="border-r-2 border-gray-300 flex justify-center items-center mx-auto my-auto px-3 py-2 cursor-pointer z-[100] transition-all fade-in-out"
										ref={Attachmentref}
										onClick={handleToggleFileInput}
									>
										<GrAttachment className="w-4 h-4 lg:w-5 lg:h-5" />
									</div>
									<div className="relative !overflow-hidden flex w-full mx-2 justify-center items-center ">
										<div
											id="FileInput"
											className="bg-white border-0 border-red-500 left-[-1000px] absolute w-full mx-auto   z-[1000] flex justify-center items-center px-2 py-2 rounded-lg transition-all fade-in-out duration-500 mx-auto my-auto"
										>
											<input
												type="File"
												id="DataInput"
												name="DataInput"
												className="w-full mx-auto my-auto"
												onChange={(e) => {
													selectFile(setFile, e);
												}}
											/>
										</div>
										<input
											id="sendInput"
											onKeyDown={(event) => {
												if (event.key === "Enter") {
													if (File && (message?.length === 0 || !message))
														sendFile(
															File,
															peers,
															setFile,
															props.identity,
															false,
															null
														);
													else if (!File && (message?.length > 0 || message))
														sendMessage(
															message,
															peers,
															"message",
															TagDetails
														);
													setmessage("");
													setTagDetails({
														tagged: false,
														taggedTo: null,
														taggedBy: null,
														taggedMessage: null,
													});
												}
											}}
											onChange={(e) => {
												setmessage(e.target.value);
											}}
											placeholder="Write a Message ..."
											className="w-full h-full text-start items-center px-2 outline-none "
										/>
									</div>

									<div
										id="SendMessageBtn"
										onClick={() => {
											if (File && (message?.length === 0 || !message))
												sendFile(
													File,
													peers,
													setFile,
													props.identity,
													false,
													null
												);
											else if (!File && (message?.length > 0 || message))
												sendMessage(message, peers, "message", TagDetails);
											setmessage("");
											setTagDetails({
												tagged: false,
												taggedTo: null,
												taggedBy: null,
												taggedMessage: null,
											});
										}}
										className="border-l-2 flex my-auto mx-auto justify-center items-center  border-gray-300 py-2 px-2"
									>
										<BsFillSendFill className="w-10 h-10 bg-yellow-500 p-3 text-white rounded-lg hover:bg-yellow-600/80 transition-all fade-in-out" />
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>


			</div>

			<LocalScreenSharePreview
				socketId={props.socketId}
				screenShareStream={ScreenSharingStream.current}
				loading={loading}
				setloading={setloading}
			/>

			<div
				id="TextEditor"
				className="w-full h-full absolute z-[10000000000000000] bg-white left-[-2000px] transition-all fade-in-out duration-500 border-2 border-black  "
			>
				<div className="w-full h-fit md:hidden flex justify-center items-center ">
					<button
						className="bg-black p-2 rounded-md mx-auto  text-orange-500 uppercase hover:ring-4 hover:ring-opacity-50 hover:ring-black transition-all fade-in-out mt-5 mb-2"
						onClick={() => {
							OpenTextEditor();
						}}
					>
						Close
					</button>
				</div>
				<div>
					<div className="w-full h-full flex justify-center items-center  text-black text-center font-bold text-xl md:hidden my-2">
						AI SPEECH TO TEXT
					</div>
				</div>
				<SpeechToTextEditor
					speechToText={speechToText}
					props={props}
					transcript={transcript}
					OpenTextEditor={OpenTextEditor}
					listening={listening}
				/>
			</div>


			<div className="z-[10000]">
				<PrivateMessaing
					message={message}
					setmessage={setmessage}
					sendMessage={sendMessage}
					File={File}
					setFile={setFile}
					sendFile={sendFile}
					Attachmentref={Attachmentref}
					handleToggleFileInput={handleToggleFileInput}
					selectFile={selectFile}
					socket={socket}
					props={props}
					worker={worker}
					peers={peers}
					setTagDetails={setTagDetails}
				/>
			</div>


			<div
				id="board-section"
				className="w-full h-full top-[-1000px] absolute z-[1000000000000000] transition-all fade-in-out duration-500"
			>
				<Board BoardMap={BoardMap} peers={peers} />
			</div>

			<style jsx>
				{`
		.video-section::-webkit-scrollbar {
			display: none;
		  }
	`}
			</style>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		...state,
	};
}

export default connect(mapStateToProps)(LaptopRoom);
