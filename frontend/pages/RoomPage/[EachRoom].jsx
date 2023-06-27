import React, { useContext, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import LaptopRoom from '../../components/LaptopRoom'
import MobileRoom from '../../components/MobileRoom'
import Context from '../../context/Context'
import AreYouReady from '../../components/AreYouReady'

import useWindowSize from "@rooks/use-window-size"
const EachRoom = () => {
    const { auth, joinroom, localStream } = useContext(Context);
    const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
    const socket = useRef()
    const router = useRouter();
    useEffect(() => {
        if (!auth) {
            router.push('/LoginPage')
            return;
        }
        localStorage.setItem('roomID', router.query.EachRoom)
    })

    if (joinroom) {
        return <AreYouReady localStream={localStream} socket={socket} />
    }
    return <div className=''><LaptopRoom socket={socket} /></div>

}



export default EachRoom