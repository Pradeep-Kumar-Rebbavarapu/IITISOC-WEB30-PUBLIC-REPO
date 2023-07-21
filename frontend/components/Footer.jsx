import { useRouter } from 'next/router'
import React from 'react'
import Logo from '../public/images/logo.png'
import Image from 'next/image'
export default function Footer() {
    const router = useRouter()
    return (
        <div className={`${router.pathname.includes("/RoomPage")? "hidden" : ""}`}>
            <footer className="text-gray-600 body-font">
                <div className=" px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                    
                    <div className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                        <div id="logo">
                        <Image src={Logo} alt="logo" width={50} height={50} className='rounded-md' />
                        </div>
                        <span className="ml-3 text-xl">ConferoLive</span>
                    </div>
                    <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2023 India —
                        <span  className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">@All Rights Reserved </span>
                    </p>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                     
                    </span>
                </div>
            </footer>
        </div>
    )
}
