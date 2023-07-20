import { NextResponse } from "next/dist/server/web/spec-extension/response";
import axios from "axios";
export default function middleware(req){
    const verify = req.cookies.get('auth')
    const {isRedirected, url} = req
    if(!verify && url.includes('/RoomPage')){
        return NextResponse.redirect('https://iiti-so-c-23-web-40-video-conferencing-1xdm.vercel.app/JoinUsPage')
    }
}