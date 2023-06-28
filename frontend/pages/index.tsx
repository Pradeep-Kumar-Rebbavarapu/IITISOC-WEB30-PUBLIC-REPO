import React, { useRef, useEffect, useState } from 'react'
import Modal from '../components/Modal'
import BlobText from '../components/BlobText'
import HomePage2 from '../components/HomePage2'
import Link from 'next/link'
export default function index() {
  
  return (
    <div className='h-full w-full'>
      <div className='lg:grid lg:grid-cols-[30px_auto_auto] w-screen h-full   bg-white '>
        <div id='side-btn' className='w-[30px] h-screen hidden lg:block mx-auto my-auto  rounded-r-full bg-transparent'></div>
        <div className='flex justify-center items-center  lg:items-start flex-col text absolute lg:relative  z-[100] top-[50%] lg:top-0 mx-auto w-full lg:pl-10 text-center  lg:text-start  lg:translate-x-[50px] bg-transparent'>

          <div className='text-6xl lg:text-8xl font-bold '>Confero<span className=''>Live</span></div>

          <div className='lg:text-4xl text-2xl my-2  '>See, Speak, Share - Without Boundaries
          </div>
          <Link href='/CreateRoomPage' className='border-2 border-orange-500 p-4 bg-orange-500 hover:bg-orange-600 cursor-pointer text-2xl my-3 text-white rounded-md transition-all fade-in-out hover:ring-4 hover:ring-opacity-50 hover:ring-orange-500'>
            Start a Live Call Now
          </Link>
        </div>
        <div className='h-full w-full blur-md  backdrop-blur-3xl lg:blur-0 lg:backdrop-blur-0'><Modal /></div>


      </div>
      <div className='text-4xl lg:text-6xl font-bold text-center my-10'>Know What Our Website Does</div>
      <div className=' h-full my-10 relative'>

        <HomePage2 />
        <div id='side-btn' className='w-[30px] absolute top-0 right-0 h-full hidden lg:block  rounded-l-full bg-transparent'></div>
      </div>
      <style jsx>
        {`
            #side-btn{
              background-image:linear-gradient(147deg, #fe8a39 0%, #fd3838 74%);
            }
          `}
      </style>
    </div>
  )
}
