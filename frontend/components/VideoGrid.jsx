import useWindowSize from "@rooks/use-window-size";
import React, { useContext, useEffect } from "react";
import Context from "../context/Context";
export default function VideoGrid({ localStream, length }) {
    const { roomID, number, audio, video } = useContext(Context)
    const { innerWidth } = useWindowSize()
    console.log(length)
    useEffect(() => {



        const localVideo = document.getElementById('my_video')
        localVideo.srcObject = localStream;

        localStream.getAudioTracks()[0].enabled = audio;
        localStream.getVideoTracks()[0].enabled = video;





        localVideo.style.borderRadius = "10px";
        localVideo.style.objectFit = "cover"
        localVideo.id = "my_video";

        const VideoGrid = document.getElementById('VideoGrid');


        VideoGrid.append(localVideo);
        localVideo.onloadedmetadata = () => {
            localVideo.play();
        };




    }, [])

    useEffect(() => {
        const numVideos = length;
        const VideoGrid = document.getElementById('VideoGrid');


        if (innerWidth < 1000) {
            let columns = 1;
            if (numVideos <= 2) columns = 1
            if (numVideos > 2 && numVideos <= 4) columns = 2;
            else if (numVideos > 4 && numVideos <= 8) columns = 3;
            else if (numVideos > 8 && numVideos <= 16) columns = 3;
            else if (numVideos > 16 && numVideos <= 35) columns = 4;
            VideoGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        }
        else if (innerWidth > 1000) {
            let columns = 1;
            if (numVideos === 1) columns = 1
            else if (numVideos > 1 && numVideos <= 4) columns = 2;
            else if (numVideos > 4 && numVideos <= 9) columns = 3;
            else if (numVideos > 9 && numVideos <= 16) columns = 4;
            else if (numVideos > 16 && numVideos <= 25) columns = 5;
            VideoGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        }
    }, [innerWidth, length])


    return (
        <div id="VideoGrid" className={`h-full w-full border-0  border-green-500 rounded-md my-auto items-center grid gap-4`}>

            <video id="my_video"></video>

            <style jsx>
                {`
                #VideoGrid {
                height:100%;
                }

                #VideoGrid video {
                width: 100%;
                height: 100%;
                padding:0%;
                border-radius:10px;
                border: 1px solid #ccc;
                }
                `}

            </style>
        </div>
    )
}