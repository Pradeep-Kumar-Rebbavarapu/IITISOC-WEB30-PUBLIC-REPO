import React from 'react'
import { useState } from 'react'
import { AiFillPushpin } from 'react-icons/ai'
import { BiBlock, BiMessageAltDetail } from 'react-icons/bi'
import Modal from 'react-modal'
import { handlePinnedUser } from '../utils/prepareNewPeerConnection'
export default function ParticipantsList({ participants, isRoomHost,peers,roomID,socket,props }) {
    const [BlockModal,setBlockModal] = useState(false)
    const [BlockedData,setBlockedData] = useState({socketId:null,identity:null})
    const customStyles = {
        overlay: {
            
            zIndex: 10000,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        content: {
            top: "50%",
            left: "50%",
			Width: "100%",
            height: "fit-content",
            transform: "translate(-50%, -50%)",
            background: "gray",
            overflow: "hidden",
            border: "0px",
			zIndex: 10000,
        },
    };
    return (
        <div className='m-2'>
            {participants.map((ele, index) => {
                return (
                    <div key={index} className="my-2">
                        <Modal closeTimeoutMS={500} onRequestClose={()=>setBlockModal(false)} isOpen={BlockModal} style={customStyles}>
                            <div className='sm:text-xl break-all font-bold text-black text-center my-2'>Do You Want To Block The User {ele.identity}</div>
                            <div className='text-center'>He Will No More Be Able To Join The Meeting</div>
                            <div className='w-full flex justify-center items-center my-2'><button className='bg-orange-500 w-fit mx-auto text-black p-2 rounded-md my-2' onClick={()=>{
                                
                                socket.current.send(JSON.stringify({
                                    "type": "block-user",
                                    "data": {
                                        "roomID":roomID,
                                        "connUserIdentity": BlockedData.identity,
                                        "connUserSocketId": BlockedData.socketId,
                                    }
                                }))
                            }}>Block</button></div>

			            </Modal>
                        {isRoomHost ? (
                            <div>
                                {props.identity !== ele.identity ?(<div className='bg-white p-2 grid grid-cols-[auto_30px_30px] w-full gap-x-4 rounded-lg'>
                                <div>{ele.identity}  </div>
                                
                                <div className='w-full flex justify-center items-center  my-auto rounded-full hover:bg-gray-200 hover:bg-opacity-50 cursor-pointer ' onClick={()=>{
                                    handlePinnedUser(ele.identity,ele.socketId)
                                }}><AiFillPushpin className='mx-auto my-auto w-7 h-7 p-1' /></div>
                                
                                <div className='w-full flex justify-center items-center  my-auto rounded-full hover:bg-gray-200 hover:bg-opacity-50 cursor-pointer' onClick={()=>{
                                        setBlockedData({socketId:ele.socketId,identity:ele.identity})
                                        setBlockModal(true)
                                    }}><BiBlock className='mx-auto my-auto w-7 h-7 p-1' /></div>
                                
                                
                                
                            </div>):(<div className='bg-white p-2 grid grid-cols-[auto_30px] w-full gap-x-4 rounded-lg'>
                                <div>{ele.identity} <span className='font-bold'>(You)</span> </div>
                               
                                <div className='w-full flex justify-center items-center  my-auto rounded-full hover:bg-gray-200 hover:bg-opacity-50 cursor-pointer' onClick={()=>{
                                    handlePinnedUser(ele.identity,"my")
                                }}><AiFillPushpin className='mx-auto my-auto w-7 h-7 p-1' /></div>
                                
                                    
                                
                                
                                
                            </div>)}
                            </div>
                            
                        ) : (
                            <div className='bg-white p-2 grid grid-cols-[auto_30px_30px] w-full gap-x-4 rounded-lg'>
                                <div>{ele.identity}</div>
                                <div className='w-full flex justify-center items-center  my-auto rounded-full hover:bg-gray-200 hover:bg-opacity-50 cursor-pointer' onClick={()=>{
                                    handlePinnedUser(ele.identity,ele.socketId)
                                }}><AiFillPushpin className='mx-auto my-auto w-7 h-7 p-1' /></div>
                                
                            </div>
                        )}
                    </div>

                )
            })}


        </div>
    )
}
