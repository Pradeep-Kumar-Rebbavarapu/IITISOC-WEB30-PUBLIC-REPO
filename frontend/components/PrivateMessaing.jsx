import React, { useState } from 'react'
import { GrAttachment } from 'react-icons/gr';
import { BsFillSendFill } from 'react-icons/bs';
import { sendDirectMessage } from '../utils/MessageUtils';
import { useEffect } from 'react';
import EachMessage from './EachMessage';
import { useRef } from 'react';
export default function PrivateMessaing({ sendFile, Attachmentref, selectFile, socket, props, worker, peers }) {
    const [username, setusername] = useState(null)
    const [RecieverSocketId, setRecieverSocketId] = useState(null)

    const [message, setmessage] = useState(null)
    const [File, setFile] = useState(null)
    const [GotFile, setGotFile] = useState(false)
    const [Progress, setProgress] = useState(0)
    const [ChatHistory, setChatHistory] = useState([])
    const ref = useRef()
    const getDirectChatHistory = () => {
        if (RecieverSocketId) {
            const ChatHistory = props.directChatHistory
            const userChatHistory = ChatHistory.find((each) => each.socketId === RecieverSocketId)
            if (userChatHistory) {
                return userChatHistory.ChatHistory
            }
            else {
                return []
            }
        }

    }

    useEffect(() => {
        const handleClickOutsideAttachmentBtn = (e) => {
            if (Attachmentref.current && !Attachmentref.current.contains(e.target)) {
                document.getElementById('FileInputPrivate').className = "bg-white h-[30px] w-full absolute mx-auto bottom-0 top-[10px] z-[-100] transition-all fade-in-out"
            }
        }

        document.addEventListener("click", handleClickOutsideAttachmentBtn, true);
        return () => {
            document.removeEventListener('click', handleClickOutsideAttachmentBtn, true)
        }
    }, [])


    const handleToggleFileInput = () => {
        if (document.getElementById('FileInputPrivate').classList.contains('top-[10px]')) {
            document.getElementById('FileInputPrivate').className = "bg-white h-[30px] w-full absolute mx-auto bottom-0 top-[-40px]  transition-all fade-in-out"
        }
        else {
            document.getElementById('FileInputPrivate').className = "bg-white h-[30px] w-full absolute mx-auto bottom-0 top-[10px] z-[-100] transition-all fade-in-out"
        }
    }

    return (
        <div id="PrivateMessaging" className='absolute w-full  top-0 bg-white grid grid-rows-[80px_auto]  left-[-2000px] border-0 border-blue-500'>
            <div className='h-[100px] flex w-full border-0 border-black items-center text-center'>
                <button onClick={() => {
                    const PrivateMessaging = document.getElementById('PrivateMessaging')
                    PrivateMessaging.className = 'absolute w-full h-full top-0 bg-white grid grid-rows-[auto_auto] left-[-2000px] z-[10000000] transition-all fade-in-out duration-500';
                }} className='border-0 border-black h-fit p-2 mx-5 rounded-md bg-black text-white hover:scale-105 transition-all fade-in-out'>Close</button>
                <div className='text-xl font-bold text-center w-full flex justify-center'>
                    Private Chat
                </div>
            </div>
            <div className='grid grid-cols-2 h-full w-full border-0 border-red-500'>
                <div className='border-0 border-black h-full w-full p-5 '>
                    <div className="h-full w-full p-2 rounded-md bg-gray-300 grid grid-rows-[40px_auto_60px]">
                        <div className='bg-white rounded-md  font-bold text-center flex items-center justify-center'>
                            Sending Message To {username}
                        </div>
                        <div>
                            {props.directChatHistory.find((e) => e.socketId === RecieverSocketId) && props.directChatHistory.find((e) => e.socketId === RecieverSocketId).ChatHistory.map((ele, index) => {
                                return (
                                    <div key={index}>
                                        <EachMessage setProgress={setProgress} worker={worker} setGotFile={setGotFile} message={ele} />
                                    </div>
                                )
                            })}
                        </div>
                        <div className='flex  h-fit relative bg-white rounded-md'>
                            <div id="FileInputPrivate" className="bg-white border-0 border-red-500 h-[30px] w-full absolute  mx-auto bottom-0 top-[10px] z-[-100]">
                                <input type="File" id="DataInput" name='DataInput' onChange={(e) => {
                                    selectFile(setFile, e)
                                }} />
                            </div>
                            <div className="border-r-2 border-gray-300 flex justify-center items-center mx-auto my-auto px-3 py-2 cursor-pointer z-[100] transition-all fade-in-out" ref={Attachmentref} onClick={handleToggleFileInput} >
                                <GrAttachment className="w-4 h-4 lg:w-5 lg:h-5" />
                            </div>
                            <input onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    if (File && (message?.length === 0 || !message)) sendFile(File, peers, props.identity, setProgress, socket, true, RecieverSocketId, setFile)
                                    else if (!File && (message?.length > 0 || message)
                                    ) sendDirectMessage(message, socket, RecieverSocketId, props.identity, false)
                                    setFile(null)
                                    setmessage(null)
                                }
                            }} onChange={(e) => {
                                setmessage(e.target.value)
                            }} placeholder="Write a Message ..." className="w-full text-start items-center px-2 outline-none" />


                            <div onClick={() => {
                                File, peers, props.identity, setProgress
                                if (File && (message?.length === 0 || !message)) sendFile(File, peers, props.identity, setProgress, socket, true, RecieverSocketId, setFile)
                                else if (!File && (message?.length > 0 || message)
                                ) sendDirectMessage(message, socket, RecieverSocketId, props.identity, false)
                                setFile(null)
                                setmessage(null)
                            }} className="border-l-2 flex my-auto mx-auto justify-center items-center  border-gray-300 py-2 px-2">
                                <BsFillSendFill className="w-10 h-10 bg-yellow-500 p-3 text-white rounded-lg hover:bg-yellow-600/80 transition-all fade-in-out" />
                            </div>
                        </div>




                    </div>
                </div>
                <div className='p-5 grid grid-rows-[60px_auto]'>
                    <div className="bg-gray-300 p-2  text-center">
                        <div className="border-0 border-black p-2 rounded-t-md rounded-md bg-white h-fit font-bold">Select A Participant</div>
                    </div>
                    <div className='border-0 flex flex-wrap border-black h-full w-full p-2 bg-gray-300 rounded-b-md'>{props.participants.map((ele, index) => {

                        return (
                            <React.Fragment key={index}>
                                {ele.identity !== props.identity && (
                                    <div className='bg-white rounded-md h-fit w-fit p-2 cursor-pointer hover:text-orange-500 hover:border-orange-500 hover:border-0 transition-all fade-in-out mx-2 focus:ring-4 focus:ring-opacity-50 focus:ring-orange-500' onClick={() => {
                                        setusername(ele.identity)
                                        setRecieverSocketId(ele.socketId)

                                    }}>
                                        {ele.identity}
                                    </div>
                                )}
                            </React.Fragment>

                        )
                    })}

                    </div>


                </div>
            </div>
        </div>
    )
}
