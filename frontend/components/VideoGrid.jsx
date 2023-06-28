import useWindowSize from "@rooks/use-window-size";
import React, { useContext, useEffect, useRef } from "react";
import Context from "../context/Context";

export default function VideoGrid({ localStream, length }) {
	const { roomID, number, audio, video } = useContext(Context);
	const { innerWidth } = useWindowSize();
	const videoGridRef = useRef(null);

	useEffect(() => {
		const localVideo = document.getElementById("my_video");
		localVideo.srcObject = localStream;
		localStream.getAudioTracks()[0].enabled = audio;
		localStream.getVideoTracks()[0].enabled = video;

		localVideo.style.borderRadius = "10px";
		localVideo.style.objectFit = "cover";
		localVideo.id = "my_video";
		
		const VideoGrid = document.getElementById("VideoGrid");
		VideoGrid.append(localVideo);

		localVideo.onloadedmetadata = () => {
			localVideo.play();
		};
	}, []);


	return (
		<div
			id="VideoGrid"
			className={`h-full  w-full  rounded-md my-auto justify-center mx-auto items-center grid gap-4`}
			ref={videoGridRef}
		>
			<video id="my_video" muted className="mx-auto"></video>

			<style jsx>
				{`
          #VideoGrid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
			gap: 10px;
		  }
		  
		  @media (max-width: 1000px) {
			#VideoGrid {
			  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
			}
		  }
		  
		  @media (max-width: 800px) {
			#VideoGrid {
			  grid-template-columns: repeat(auto-fit, minmax(130px, 2fr));
			}
		  }
		  
		  @media (max-width: 600px) {
			
			#VideoGrid {
			  display: grid;
			  grid-template-columns: repeat(${length<=2?1:2}, 1fr);
			  grid-auto-rows: minmax(100px, auto);
			}
		  }
		  
		  
		  
        `}
			</style>
		</div>
	);
}
