import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { AiFillVideoCamera, AiFillAudio } from 'react-icons/ai'
import { BsFillCameraVideoOffFill, BsFillMicMuteFill } from 'react-icons/bs'
import { router } from 'websocket'
import Context from '../context/Context'
import { JoinRoom } from '../utils/JoinRoom'
import axios from 'axios'
import {toast} from 'react-toastify'
export default function AreYouReady({ socket}) {

    const { setJoinRoomID,JoinRoomID,localStream, auth, video, setvideo, audio, setaudio,setjoinroom } = useContext(Context)
    console.log(auth)
    const router = useRouter()
    const ReadyStream = useRef()
    const [loading,setloading] = useState(true)
    // we are going to make an api call to check if the room is present or not
    //if the room is present .filter(room_id = room_id)
    
    useEffect(() => {
                navigator.mediaDevices.getUserMedia({ video: true, audio: {echoCancellation: false } }).then((stream) => {
                    
                    ReadyStream.current = stream
                    let video = document.getElementById('my_video');
                    video.srcObject = stream;
                    video.onloadedmetadata = () => {
                        video.play()
                    }

                })
                return () =>{
                    ReadyStream.current.getTracks().forEach((track) => track.stop())
                }
    }, [])
    
    return (

        <div className='grid md:grid-cols-2 h-full z-[1]  w-full  bg-[url("/images/AreYouReady2.png")] bg-cover bg-no-repeat lg:px-32  lg:my-auto'>
            <div className='flex flex-col justify-center items-center my-auto h-full w-full backdrop-blur-[1px]'>
                <video id="my_video" className='mt-28 md:mt-10 w-[300px] lg:w-full ' />
                <div className=''>
                    <button onClick={() => {
                        ReadyStream.current.getVideoTracks()[0].enabled = !video
                        setvideo(!video)
                        
                    }}>{video ? <AiFillVideoCamera className='border-2 border-orange-600 w-10 h-10 lg:w-16 lg:h-16 hover:bg-orange-500 hover:text-white text-orange-600 p-2 lg:p-4 rounded-full transition-all fade-in-out duration-300 my-4 mx-4' /> : <BsFillCameraVideoOffFill className='border-2 border-orange-600 w-10 h-10 lg:w-16 lg:h-16 bg-orange-500 text-white  p-2 lg:p-4 rounded-full transition-all fade-in-out duration-300 my-4 mx-4' />}</button>
                    <button onClick={() => {
                        ReadyStream.current.getAudioTracks()[0].enabled = !audio
                        setaudio(!audio)
                        
                    }}>{audio ? <AiFillAudio className='border-2 border-orange-600 w-10 h-10 lg:w-16 lg:h-16 hover:bg-orange-500 hover:text-white text-orange-600 p-2 lg:p-4 rounded-full transition-all fade-in-out duration-300 my-4 mx-4' /> : <BsFillMicMuteFill className='border-2 border-orange-600 w-10 h-10 lg:w-16 lg:h-16 bg-orange-500 text-white  p-2 lg:p-4 rounded-full transition-all fade-in-out duration-300 my-4 mx-4' />}</button>
                </div>
            </div>
            <div className='backdrop-blur-[1px] w-full items-center h-full flex justify-center'>
                <button onClick={() => {
                    setjoinroom(false)
                    ReadyStream.current.getTracks().forEach(track => track.stop())
                    router.push(`/RoomPage/${router.query.EachRoom}`)
                }} className='bg-blue-600 text-lg lg:text-2xl text-white hover:bg-blue-600/90 transition-all fade-in-out px-4 p-2 lg:p-4 rounded-full  h-fit w-fit my-5  lg:my-auto hover:scale-110'>Are You Ready To Join ??</button>
            </div>
        </div>

    )
}
