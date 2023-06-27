import React from 'react'
import VideoGrid from './VideoGrid'
import { useEffect, useState, useRef, useContext } from 'react'
import Context from '../context/Context'
import { useRouter } from 'next/router'
import { connectionWithSocketServer } from '../utils/connectionWithSocketServer'
import { getLocalPreviewAndInitRoomConnection } from '../utils/GetLocalPreviewAndInitRoomConnection'
import { connect } from 'react-redux'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';



const MobileRoom = (props) => {
	const { socket } = props
	const router = useRouter()
	const worker = useRef()
	const roomID = router.query.EachRoom
	const [LeftNavOpen, setLeftNavOpen] = useState(true)
	const { isHost, identity, overlay, setoverlay, title, auth, localStream, video, audio } = useContext(Context)
	const [MicOn, setMicOn] = useState(audio)
	const [CamOn, setCamOn] = useState(video)
	const [ScreenShareOn, setScreenShareOn] = useState(false)
	const [BoardOn, setBoardOn] = useState(false)
	const ScreenSharingStream = useRef()
	const [message, setmessage] = useState(null)
	const [File, setFile] = useState(null)
	const peers = useRef({})
	const peersRef = useRef([])
	const [JoinModal, setIsJoinModal] = useState(false)
	const [peerUserID, setpeerUserID] = useState(null)
	const Attachmentref = useRef(null);
	const FileNameRef = useRef();
	const [GotFile, setGotFile] = useState(false);
	const FileSentBy = useRef()
	const setProgress = useRef()
	const isDrawing = useRef(false)
	const IceServers = useRef(null)
	const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
	const Transcript = useRef(transcript)

	useEffect(() => {

		worker.current = new Worker('/worker.js')
		connectionWithSocketServer(socket, peers, ScreenSharingStream, localStream, worker, setGotFile, FileNameRef, FileSentBy, setProgress, isDrawing, Transcript, IceServers, setIsJoinModal, setpeerUserID)

		getLocalPreviewAndInitRoomConnection(socket, localStream, isHost, auth, roomID, setoverlay, title, IceServers)
	}, [])



	return (
		<div className='border-t-2'>
			<div className='grid grid-rows-2'>

				<div>
					<VideoGrid localStream={localStream.current} />
				</div>
				<div>Buttons</div>
			</div>
		</div>
	)
}



function mapStateToProps(state) {
	return {
		...state
	};
}

export default connect(mapStateToProps)(MobileRoom);