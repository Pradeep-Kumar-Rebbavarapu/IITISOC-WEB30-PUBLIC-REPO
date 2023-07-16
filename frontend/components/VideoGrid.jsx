import useWindowSize from "@rooks/use-window-size";
import React, { useContext, useEffect, useRef } from "react";
import Context from "../context/Context";

export default function VideoGrid({ localStream, length }) {
  const { roomID, number, audio, video } = useContext(Context);
  const { innerWidth } = useWindowSize();
  const videoGridRef = useRef(null);

  useEffect(() => {
    const localVideo = document.createElement("video");
    const fakeVideo = document.createElement('video')
	fakeVideo.id = "my_fakevideo";
	const div = document.createElement("div");
	div.id = "my_div";
	div.append(localVideo)
	div.append(fakeVideo)
	const videoGrid = document.getElementById("VideoGrid");
	videoGrid.append(div)
	localVideo.id = "my_video";
	localVideo.muted = true;
	localVideo.autoplay = true;
	localVideo.playsInline = true;
    if (video === false) {
      localVideo.style.display = "none";
      fakeVideo.style.display = "block";
    } else {
      localVideo.style.display = "block";
      fakeVideo.style.display = "none";
    }

    localStream.getAudioTracks()[0].enabled = audio;
    localStream.getVideoTracks()[0].enabled = video;

    localVideo.srcObject = localStream;
    fakeVideo.style.width = "100%";
    fakeVideo.style.height = "100%";
    fakeVideo.style.maxWidth = "100%";
    fakeVideo.style.maxHeight = "100%";
    fakeVideo.style.minWidth = "100%";
    fakeVideo.style.minHeight = "100%";
    fakeVideo.style.backgroundColor = "#D3D3D3";
    fakeVideo.style.objectFit = "cover";
    fakeVideo.style.borderRadius = "10px";

    localVideo.style.borderRadius = "10px";
    localVideo.style.objectFit = "cover";
    localVideo.autoplay = true;
    localVideo.playsInline = true;
    localVideo.style.width = "100%";
    localVideo.style.height = "100%";
    localVideo.style.maxWidth = "100%";
    localVideo.style.backgroundColor = "#D3D3D3";
    localVideo.style.maxHeight = "100%";
    localVideo.style.minWidth = "100%";
    localVideo.style.minHeight = "100%";

    localVideo.onloadedmetadata = () => {
      localVideo.play();
    };
  }, [localStream]);

  useEffect(() => {
    // Your logic here for handling length
  }, [length]);

  return (
    <div
      id="VideoGrid"
      className={`h-full w-full rounded-md my-auto justify-center mx-auto items-center grid gap-4 overflow-x-scroll ${
        length === 1 ? "grid-cols-1" : length === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-2"
      }`}
      ref={videoGridRef}
    >
      
      
	  

      <style jsx>
        {`
          /* Additional styles for video container */
          #my_video {
            width: 100%;
            height: 100%;
            max-width: 100%;
            max-height: 100%;
            min-width: 100%;
            min-height: 100%;
            border-radius: 10px;
            object-fit: cover;
            background-color: #d3d3d3;
          }

          /* Additional styles for fake video container */
          #my_fakevideo {
            width: 100%;
            height: 100%;
            max-width: 100%;
            max-height: 100%;
            min-width: 100%;
            min-height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          /* Additional styles for photo element (video) */
          #photo {
            width: 100%;
            height: 100%;
            max-width: 100%;
            max-height: 100%;
            min-width: 100%;
            min-height: 100%;
            border: 2px solid black;
            border-radius: 50%;
            margin: auto;
            padding: 32px;
          }
        `}
      </style>
    </div>
  );
}
