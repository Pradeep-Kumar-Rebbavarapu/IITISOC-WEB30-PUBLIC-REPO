import React, { useContext, useState } from 'react'
import Context from '../../context/Context'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import CreateRoomPage1 from '../../public/images/CreateRoomPage1.png'
import { IoCreateSharp } from 'react-icons/io5'
import Image from 'next/image'
import { toast } from 'react-toastify';
export default function index() {
	const {setroomID,roomID,title,settitle,setjoinroom,auth,JoinRoomID,setJoinRoomID,setisHost,setRoomCapacity,RoomCapacity } = useContext(Context)
	
	const router = useRouter()
	useEffect(() => {

		setroomID(uuidv4())
	}, [])
	return (
		<div>
			<div className='  lg:grid md:grid-cols-2 tracking-wide'>
			<div className='mx-10 my-20 flex lg:hidden  justify-center items-center '>
					<Image src={CreateRoomPage1}  placeholder="blur mx-auto " />
				</div>
				<div className='mx-10 lg:ml-32 '>
					<div className='text-xl lg:text-3xl text-center lg:text-start font-semibold lg:font-bold  my-20 '>
						Simplify Meetings: Seamlessly Initiate, Schedule, or Join for Streamlined Collaboration and Enhanced Productivity.</div>
					<div className='flex flex-col lg:flex-row justify-center lg:justify-start my-10 w-full mx-auto '>
						<button onClick={()=>{
							if (!auth) {
								router.push('/JoinUsPage')
								toast.warning('Login To Start A Meet',{position: toast.POSITION.TOP_LEFT })
								return;
							}
							else{
								if(title === '' || title === undefined){
									toast.warning('Please Enter The Title Of Your Room',{position: toast.POSITION.TOP_LEFT })
									return;
								}
								if(RoomCapacity === '' || RoomCapacity === undefined || RoomCapacity == 0){
									toast.warning('Please Enter The Capacity Of Your Room',{position: toast.POSITION.TOP_LEFT })
									return;
								}
								setisHost(true)
								setjoinroom(false)
								router.push(`/RoomPage/${roomID}`)
							}
							
						}} className='border-2 border-orange-500 p-3 hover:ring-4 hover:ring-opacity-50 hover:ring-orange-600 z-[100] bg-gradient-to-tr from-amber-400 to-orange-600 text-white flex items-center lg:w-[290px] lg:rounded-l-full  transition-all fade-in-out cursor-pointer hover:font-bold w-full '><IoCreateSharp className="w-7 h-7 mr-2"  /> Start Instant Meeting</button>
						<div>
							<input onChange={(e)=>{
								
								localStorage.setItem('title',e.target.value)
								settitle(e.target.value)
								
							}} id="title" name='title' type="text" placeholder='Title Of Your Room' className='w-full h-full px-2 border-2 focus:border-orange-600 py-4 lg:py-auto  outline-none   z-1 transition-all fade-in-out duration-500' />
						</div>
						<div>
							<input min="0" onChange={(e)=>{
								
								localStorage.setItem('roomcapacity',e.target.value)
								setRoomCapacity(e.target.value)
								
							}} onKeyPress={(event) => {
								const charCode = event.charCode;

								if (charCode < 48 || charCode > 57) {
									event.preventDefault();
								}
							}} id="RoomCapacity" name='RoomCapacity' type="number" placeholder='Room Capacity' className='w-full h-full px-2 border-2 focus:border-orange-600 py-4 lg:py-auto lg:rounded-r-full outline-none   z-1 transition-all fade-in-out duration-500' />
						</div>
					</div>
					<div className='flex flex-col lg:flex-row justify-center lg:justify-start my-10 w-full mx-auto '>
						<button className='border-2 border-orange-500 p-3 hover:ring-4 hover:ring-opacity-50 hover:ring-orange-600 z-[100] bg-gradient-to-tr from-amber-400 to-orange-600 text-white flex items-center lg:rounded-l-full lg:w-[250px]  transition-all fade-in-out cursor-pointer hover:font-bold w-full ' onClick={()=>{	
							setJoinRoomID(JoinRoomID)
							setisHost(false)
							localStorage.setItem('roomID',JoinRoomID)
							router.push(`/RoomPage/${JoinRoomID}`)
							
						}}><IoCreateSharp className="w-7 h-7 mr-2" />Join A Room</button>
						<div>
							<input onChange={(e)=>{
								setJoinRoomID(e.target.value)
							}} id="roomID" name="roomID" type="text" placeholder='Enter The Room ID' className=' h-full px-2 border-2 focus:border-orange-600 py-4 lg:py-auto lg:rounded-r-full outline-none z-1 w-full lg:w-[250px] transition-all fade-in-out duration-500' />
						</div>
					</div>
					<div className='flex flex-col lg:flex-row justify-center lg:justify-start my-10 w-full mx-auto '>
						<button className='border-2 border-orange-500 p-3 hover:ring-4 hover:ring-opacity-50 hover:ring-orange-600 z-[100] bg-gradient-to-tr from-amber-400 to-orange-600 text-white flex items-center lg:rounded-l-full  transition-all fade-in-out cursor-pointer hover:font-bold w-full lg:w-[250px]'><IoCreateSharp className="w-7 h-7 mr-2" />Schedule A Meeting</button>
						<div>
							<input id="title" name='title' type="date"  className='w-full h-full px-2 border-2 focus:border-orange-600 py-4 lg:py-auto lg:rounded-r-full outline-none w-full lg:w-[250px] z-1 transition-all fade-in-out duration-500' />
						</div>
					</div>
				</div>
				<div className='mx-10 my-20 hidden lg:flex -skew-x-12 translate-x-[-50px] justify-center items-center '>
					<Image src={CreateRoomPage1} width="500" placeholder="blur mx-auto " />
				</div>
			</div>
		</div>
	)
}
