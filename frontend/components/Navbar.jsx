import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '../public/images/logo.png'
import { BsFillPersonFill } from 'react-icons/bs'
import { ToastContainer, toast } from 'react-toastify';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
export default function Navbar() {
	return (
		<>
			
			<div className='h-full w-full py-2 justify-between  items-center grid grid-cols-[auto_auto]  bg-white z-[100000000]'>

				<div className='rounded-md w-fit ml-2 font-bold text-2xl '>
					<span className='text-4xl'>C</span>onferoLive
				</div>
				<div className='lg:flex hidden items-center !w-full'>
					<div className='flex  items-center   h-full'>
						<Link className='text-xl font-bold mx-5 hover:border-t-2 border-orange-600' href="/">Home</Link>
						<Link className='text-xl font-bold mx-5 hover:border-t-2 border-orange-600' href="/LoginPage">Login</Link>
						<Link className='text-xl font-bold mx-5 hover:border-t-2 border-orange-600' href="/SignupPage">Signup</Link>
						<Link className='text-xl font-bold mx-5 hover:border-t-2 border-orange-600' href="/">Meetings</Link>
						<Link className='text-xl font-bold mx-5 hover:border-t-2 border-orange-600' href="/">Query</Link>
					</div>
					<div className=' group transition-all fade-in-out'>
						<div className='w-[50px] h-[50px] mx-5 rounded-full bg-orange-600 flex justify-center items-center'><BsFillPersonFill className='w-8 h-8 mx-auto my-auto' /></div>
						<div className=' h-[300px] w-[300px] absolute left-[-300px]  group-hover:left-0 z-[100]  transition-all fade-in-out bg-black'></div>
					</div>
				</div>
			</div>
			<ToastContainer
				
				theme="colored"
				transition={Zoom}
			/>
		</>
	)
}
