import { NextResponse } from "next/dist/server/web/spec-extension/response";
import axios from "axios";
export default function middleware(req){
    const verify = req.cookies.get('auth')
    const {isRedirected, url} = req
    if(!verify && url.includes('/RoomPage')){
        return NextResponse.redirect('http://localhost:3000/JoinUsPage')
    }
}