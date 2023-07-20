import useWindowSize from "@rooks/use-window-size";
import React, { useContext, useEffect, useRef } from "react";
import Context from "../context/Context";
import { handleFullScreen, handlePinnedUser } from "../utils/prepareNewPeerConnection";
import { AiFillPushpin, AiOutlineFullscreen } from 'react-icons/ai'
export default function VideoGrid({ localStream, length, props, CamOn, MicOn, Pinned, setPinned }) {
	const { roomID, number, audio, video } = useContext(Context);

	const { innerWidth } = useWindowSize();
	const videoGridRef = useRef(null);

	useEffect(() => {
		const videoGrid = document.getElementById("VideoGrid");
		const div = document.getElementById("my_div");
		const localVideo = document.getElementById('my_video');
		const fakeVideo = document.getElementById('my_fakevideo');
		const localDiv = document.getElementById('my_video_container')


		localVideo.srcObject = localStream;

		localStream.getAudioTracks()[0].enabled = audio;
		localStream.getVideoTracks()[0].enabled = video;

		if (video === false) {
			localDiv.style.display = "none";
			fakeVideo.style.display = "block";
		} else {
			localDiv.style.display = "block";
			fakeVideo.style.display = "none";
		}


		localVideo.muted = true;
		localVideo.autoplay = true;
		localVideo.playsInline = true;
		localVideo.controls = false;
		localVideo.style.objectFit = "cover";


		
		

		//set fake video height and width


	}, [localStream]);



	return (
		<div
			id="VideoGrid"
			className={`h-full  w-full px-2  !z-[10] overflow-y-scroll  py-2 rounded-md my-auto justify-center mx-auto items-center grid gap-2 grid-cols-1 ${length === 1 || length===0 ? "grid-cols-1" : "lg:grid-cols-2"} `}
			ref={videoGridRef}
		>
			<div id="my_div" className="h-full w-full flex items-center justify-center rounded-md ">
				<div id='my_video_container' className=" rounded-md relative ">
					<div className="absolute z-[10000] rounded-md top-0 text-center  w-full h-full transition-all fade-in-out group overflow-hidden">
						<div className={` font-bold w-fit  relative rounded-b-full mx-auto px-10 py-4 bg-black bg-opacity-50 text-white `}>
							<div className={`absolute w-full px-10 py-4  h-full ${MicOn?"ring-4  ring-opacity-50 ring-orange-500 border-2 border-black animate-ping":""} rounded-b-full top-0 left-0 micsymbol`}></div>
							{props.identity}
						</div>
						<div className="">
							<div className="group-hover:flex hidden w-full h-full  " >
								<AiFillPushpin onClick={() => {
								handlePinnedUser(props.identity, 'my')
							}} className="w-10 text-white h-10 my-4 mx-2 p-2 -translate-y-9 bg-black/20  rounded-full hover:bg-black/50   transition-all fade-in-out duration-500" />

							</div>
							<div className="group-hover:flex hidden w-full h-full  " >
								<AiOutlineFullscreen onClick={() => {
								handleFullScreen(props.identity,"my")
							}} className="w-10 text-white h-10 my-4 mx-2 p-2 -translate-y-9 bg-black/20  rounded-full hover:bg-black/50   transition-all fade-in-out duration-500" />

							</div>
						</div>
					</div>
					<video id="my_video" className="h-[400px] my-auto rounded-md "></video>
					<video id='my_ss_video' className="h-[400px] my-auto rounded-md hidden"></video>
				</div>
				<div id='my_fakevideo' className="h-[400px] w-[530px] bg-[#D3D3D3] rounded-md flex justify-center relative items-center   my-auto mx-auto fake">
					<div className="top-0 absolute w-full  text-center h-full  hover:bg-opacity-50 transition-all fade-in-out group  z-[10000]">
						<div className="font-bold p-2">{props.identity}</div>
						<div className="">
							<div className="group-hover:flex hidden w-fit h-fit">
								<AiFillPushpin onClick={() => {
								handlePinnedUser(props.identity, 'my')
							}} className="w-10 text-white h-10 my-4 mx-2 p-2 -translate-y-9 bg-black/20  rounded-full hover:bg-black/50   transition-all fade-in-out duration-500" />
							</div>
							<div className="group-hover:flex hidden w-full h-full">
								<AiOutlineFullscreen onClick={() => {
								handleFullScreen(props.identity,"my")
							}} className="w-10 text-white h-10 my-4 mx-2 p-2 -translate-y-9 bg-black/20  rounded-full hover:bg-black/50   transition-all fade-in-out duration-500" />

							</div>
						</div>
					</div>
					<div className="w-[100px] h-[100px] border-2 border-orange-500 bg-orange-500 rounded-full relative mx-auto my-auto  text-center flex justify-center b items-center pb-2  text-white font-bold text-xl md:text-3xl top-[36%]">{props?.identity?.slice(0, 1)}

						<div className={`absolute w-full h-full  rounded-full  ${MicOn && "ring-8 ring-opacity-50 border-2 border-black ring-orange-500 animate-ping"}`}>

						</div>
					</div>

				</div>

			</div>
			<style jsx>
				{`
          //hide scroll bar
		  #VideoGrid::-webkit-scrollbar {
			display: none;
		  }
		  video{
			  object-fit: cover;

		  }
       `}
			</style>
		</div>
	);
}
