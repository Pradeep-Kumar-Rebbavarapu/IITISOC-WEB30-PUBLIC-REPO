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
const EachRoom = () => {
    const { auth, joinroom, localStream, setJoinRoomID } = useContext(Context);
    const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
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

    if (joinroom && auth) {
        return <AreYouReady roomID={router.query.EachRoom} localStream={localStream} socket={socket} />
    }
    if (auth && !joinroom) {
        return <div className=''><LaptopRoom socket={socket} /></div>
    }
    else {
        return;
    }


}



export default EachRoom