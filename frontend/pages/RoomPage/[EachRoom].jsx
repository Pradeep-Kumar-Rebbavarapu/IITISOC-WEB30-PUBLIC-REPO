import React, { useContext, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import LaptopRoom from '../../components/LaptopRoom'
import MobileRoom from '../../components/MobileRoom'
import Context from '../../context/Context'
import AreYouReady from '../../components/AreYouReady'
import axios from 'axios'
import useWindowSize from "@rooks/use-window-size"
import { toast } from 'react-toastify'
import { data } from 'jquery'
import { NextSeo } from 'next-seo';
const EachRoom = (props) => {
    const { auth, joinroom, localStream, setJoinRoomID } = useContext(Context);
    const socket = useRef()
    const router = useRouter();
    useEffect(() => {
        setJoinRoomID(router.query.EachRoom)
        localStorage.setItem('roomID', router.query.EachRoom)
        if (!auth) {
            router.push('/JoinUsPage')
            toast.warning('Login To Start A Meet', { position: toast.POSITION.TOP_LEFT })
            return;
        }

    }, [])
    if (joinroom===true && props.data===true && auth) {
        return <AreYouReady roomID={router.query.EachRoom} localStream={localStream} socket={socket} />
    }
    if (auth && joinroom === false) {
        return <div className=''><LaptopRoom socket={socket} /></div>
    }
    if(auth && joinroom === true && props.data === false){
        toast.error('Room Does Not Exist',{position:toast.POSITION.TOP_LEFT})
        router.push('/CreateRoomPage')
        return
    }
    else {
        router.push('/CreateRoomPage')
        return
    }


}



export default EachRoom


export async function getServerSideProps({req, params}) {
    const EachRoom = params.EachRoom
    const access = JSON.parse(req.cookies.auth).access
    const response = await axios.post('https://www.pradeeps-video-conferencing.store/api/v1/CheckIfRoomExists/',{roomID:EachRoom})
    const data = response.data
    return {
        props: {
            data:data
        }
    }
}
