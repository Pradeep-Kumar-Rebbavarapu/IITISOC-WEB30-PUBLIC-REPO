import { store } from "@/store/store"
import { useEffect, useRef } from "react"
import { createContext,useState } from "react"
import Cookies from 'js-cookie'
import axios from "axios"
import {toast} from 'react-toastify'
import PageLoadingIndicator from "@/components/PageLoadingIndicator"
import cookie from 'cookie'
const Context = createContext()

export const ContextProvider = ({ children }) => {
    
  
    const [number,setnumber] = useState(typeof window!=="undefined" && localStorage.getItem('participants_length')?localStorage.getItem('participants_length'):1)
    const [title,settitle] = useState(typeof window!=="undefined" && localStorage.getItem('title')?localStorage.getItem('title'):null) 
    const [identity,setidentity] = useState(typeof window!=="undefined" && localStorage.getItem('identity')?localStorage.getItem('identity'):null)
    const [isHost,setisHost] = useState(false)
    const [overlay,setoverlay] = useState(true)
    const [joinroom,setjoinroom] = useState(true)
    const [user,setuser] = useState(Cookies.get('user')?JSON.parse(Cookies.get('user')):null)
    const [auth,setauth] = useState(()=>Cookies.get('auth')?JSON.parse(Cookies.get('auth')):null)
    const [roomID,setroomID] = useState(typeof window!=="undefined" && localStorage.getItem('roomID')?localStorage.getItem('roomID'):null)
    const [VideoGrid,setVideoGrid] = useState(typeof window!=="undefined"?document.getElementById('VideoGrid'):null)
    const [RoomCapacity,setRoomCapacity] = useState(0)
    const [connectedUsers,setconnectedUsers] = useState(null)
    const [video, setvideo] = useState(true)
    const [audio, setaudio] = useState(true)
    const localStream = useRef()
    const [JoinRoomID,setJoinRoomID] = useState(null)
    const [PageLoading,setPageLoading] = useState(true)
    const Logout = () => {
		setauth(null)
		Cookies.remove('user')
		Cookies.remove('auth')
		localStorage.clear()
	}

    
    useEffect(()=>{
        if(PageLoading){
            updateToken()
        }
        let fourMinutes = 1000*60*4
        let interval = setInterval(()=>{
            if(auth){
                
                updateToken();
            }
            
        },fourMinutes)
        return () => clearInterval(interval)
    },[auth])

    const updateToken = async () => {
        await axios.post('https://www.pradeeps-video-conferencing.store/dj-rest-auth/token/refresh/',{refresh:Cookies.get('auth')?JSON.parse(Cookies.get('auth')).refresh:null}).then((response)=>{
            setauth(response.data)
            Cookies.set('auth',JSON.stringify(response.data),{expires: 365,path:"/"})
        }).catch((err)=>{
            console.log(err)
            Logout()
        })

        if(PageLoading){
            setPageLoading(false)
        }
    }
    
    const ContextData = {
        title:title,
        settitle:settitle,
        auth:auth,
        setauth:setauth,
        roomID:roomID,
        setroomID:setroomID,
        identity:identity,
        setidentity:setidentity,
        isHost:isHost,
        setisHost:setisHost,
        overlay:overlay,
        setoverlay:setoverlay,
        connectedUsers:connectedUsers,
        setconnectedUsers:setconnectedUsers,
        VideoGrid:VideoGrid,
        setVideoGrid:setVideoGrid,
        number:number,
        setnumber:setnumber,
        joinroom:joinroom,
        setjoinroom:setjoinroom,
        localStream:localStream,
        video:video,
        setvideo:setvideo,
        audio:audio,
        setaudio:setaudio,
        JoinRoomID:JoinRoomID,
        setJoinRoomID:setJoinRoomID,
        setuser:setuser,
        user:user,
        Logout:Logout,
        RoomCapacity:RoomCapacity,
        setRoomCapacity:setRoomCapacity
    }
    return <Context.Provider value={ContextData}>{PageLoading ? null : children}</Context.Provider>
}

export default Context;