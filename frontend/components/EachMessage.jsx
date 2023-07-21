import React, { useEffect } from "react";
import { download } from "../utils/ShareFileTwo";
import { AiFillTags } from 'react-icons/ai'
export default function EachMessage({
    worker,
    setGotFile,
    message,
    setProgress,
    DownlaodingText,
    UploadingText,
    props,
    TagDetails,
    setTagDetails,
}) {


    useEffect(() => {
        const Chat_Area = document.getElementById("Chat_Area");
        setTimeout(() => {
            Chat_Area.scrollTop = Chat_Area.scrollHeight - Chat_Area.clientHeight;
        }, 100);
    }, [props.messages, props.direectChatHistory]);
    return (
        <div id="EachMessage" className=" ">
            {message?.messageCreatedByMe || message.isAuthor ? (
                <>
                    <div className="grid grid-cols-[auto_50px] h-full w-full">
                        <div
                            id="User_Message_Box"
                            className="px-5 border-0 border-red-500 flex flex-col justify-end"
                        >
                            <div
                                id="UserName"
                                className="text-sm w-full font-bold text-gray-600  my-auto mt-4 border-0 border-black text-end flex justify-end"
                            >
                                {message.identity}
                            </div>
                            {message.File ? (
                                <div
                                    id="DownloadMessage"
                                    className="flex flex-col justify-center items-center text-center p-2 m-5 rounded-lg bg-gradient-to-tr from-orange-400 to-orange-600 "
                                >
                                    <div className="font-bold text-white">You Sent A File</div>
                                    <button
                                        disabled
                                        id={message.id}
                                        className="font-bold underline-offset-2 cursor-pointer border-2 p-2 rounded-md my-2 bg-white text-orange-600  break-all"
                                    >
                                        {message.content}
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {message.tagged ? (
                                        <>
                                            <div
                                                id="User_Message"
                                                className="p-2 w-full break-all text-start flex justify-start   mt-5 border-0 border-blue-500 bg-white text-black  rounded-t-md ml-auto"
                                            >
                                                {message.taggedTo} {`"${message.taggedMessage}"`}
                                            </div>
                                            <div
                                                id="User_Message"
                                                className="p-2 w-full break-all text-start flex justify-start   mb-5 border-0 border-blue-500 bg-orange-500 text-white  rounded-b-md ml-auto"
                                            >
                                                {message.content}
                                            </div>
                                        </>
                                    ) : (
                                        <div
                                            id="User_Message"
                                            className="p-2 w-fit break-all text-end flex justify-end   my-5 border-0 border-blue-500 bg-orange-500 text-white  rounded-md ml-auto"
                                        >
                                            {message.content}
                                        </div>
                                    )}

                                </>
                            )}
                        </div>
                        <div id="User_Image" className=" py-2 w-full h-full">
                            <div className="bg-orange-500 rounded-full w-[40px] h-[40px]"></div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className=" grid grid-cols-[50px_auto] h-full w-full">
                        <div id="User_Image" className="px-5 py-2 w-full h-full">
                            <div className="bg-orange-500 rounded-full w-[40px] h-[40px]"></div>
                        </div>
                        <div
                            id="User_Message_Box"
                            className="px-5 border-0 border-red-500 flex flex-col "
                        >
                            <div
                                id="UserName"
                                className="text-sm w-full font-bold text-gray-600  my-auto mt-4 border-0 border-black text-start flex justify-start"
                            >
                                {message.identity}
                            </div>
                            {message.File ? (
                                <div
                                    id="DownloadMessage"
                                    className="flex flex-col justify-center items-center text-center p-2 m-5 rounded-lg bg-gradient-to-tr bg-white "
                                >
                                    <div className="font-bold text-orange-600 ">
                                        Hey {message.identity} Has Sent You All A File
                                    </div>
                                    <button
                                        id={message.id}
                                        className="font-bold underline-offset-2 cursor-pointer border-2 p-2 rounded-md my-2 bg-gradient-to-tr from-orange-400 to-orange-600 text-white break-all"
                                        onClick={() => {
                                            download(message.id);
                                        }}
                                    >
                                        {message.content}
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {message.tagged ? (

                                        <div className="flex items-center py-5">
                                            <div>
                                                <div
                                                    id="User_Message"
                                                    className="p-2 w-full break-all   text-start flex justify-start border-0 border-blue-500 bg-orange-500 text-white rounded-tl-md"
                                                >
                                                    {message.taggedTo} {`"${message.taggedMessage}"`}
                                                </div>
                                                <div
                                                    id="User_Message"
                                                    className="p-2 w-full break-all   text-start flex justify-start border-0 border-blue-500 bg-white rounded-bl-md d"
                                                >
                                                    {message.content}
                                                </div>
                                            </div>
                                            <div onClick={() => {

                                                setTagDetails({
                                                    tagged: true,
                                                    taggedTo: message.identity,
                                                    taggedMessage: message.content,
                                                    taggedBy: props.identity,
                                                })


                                                console.log(message.identity, message.content)
                                            }} className="bg-gray-500 hover:ring-4 hover:ring-gray-500 hover:ring-opacity-50 transition-all fade-in-out cursor-pointer h-full rounded-r-md flex items-center text-white p-2"><AiFillTags className=" w-5 h-5" /></div>

                                        </div>
                                    ) : (
                                        <div className="flex items-center py-5">
                                            <div
                                                id="User_Message"
                                                className="p-2 w-fit break-all  h-full text-start flex justify-start border-0 border-blue-500 bg-white rounded-y-md rounded-l-md"
                                            >
                                                {message.content}

                                            </div>
                                            {!message.privateChat && (
                                                <div onClick={() => {

                                                    setTagDetails({
                                                        tagged: true,
                                                        taggedTo: message.identity,
                                                        taggedMessage: message.content,
                                                        taggedBy: props.identity,
                                                    })



                                                    console.log(message.identity, message.content)
                                                }} className="bg-gray-500 hover:ring-4 hover:ring-gray-500 hover:ring-opacity-50 transition-all fade-in-out cursor-pointer h-full rounded-r-md flex items-center text-white p-2"><AiFillTags className=" w-5 h-5" /></div>
                                            )}

                                        </div>
                                    )}

                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
