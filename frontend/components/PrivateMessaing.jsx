import React, { useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { BsFillSendFill } from "react-icons/bs";
import { sendDirectMessage } from "../utils/MessageUtils";
import { useEffect } from "react";
import EachMessage from "./EachMessage";
import { useRef } from "react";
import { toast } from "react-toastify";
export default function PrivateMessaing({
  sendFile,
  Attachmentref,
  selectFile,
  socket,
  props,
  worker,
  peers,
  TagDetails,
}) {
  const [username, setusername] = useState(null);
  const [RecieverSocketId, setRecieverSocketId] = useState(null);

  const [message, setmessage] = useState(null);
  const [File, setFile] = useState(null);
  const [GotFile, setGotFile] = useState(false);
  const [Progress, setProgress] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutsideAttachmentBtn = (e) => {
      if (Attachmentref.current && !Attachmentref.current.contains(e.target)) {
        document.getElementById("FileInputPrivatePrivate").className =
          "bg-white h-[30px] w-full absolute mx-auto bottom-0 top-[10px] z-[-100] transition-all fade-in-out";
      }
    };

    document.addEventListener("click", handleClickOutsideAttachmentBtn, true);
    return () => {
      document.removeEventListener(
        "click",
        handleClickOutsideAttachmentBtn,
        true
      );
    };
  }, []);
  const [chathistory,setchathistory] = useState(null)
  

  const handleToggleFileInputPrivate = () => {
		const MessageInput = document.getElementById("sendInputPrivate");
		if (
			document.getElementById("FileInputPrivate").classList.contains("left-[-1000px]")
		) {
			document.getElementById("FileInputPrivate").className =
				"bg-white border-0  border-red-500 left-0 absolute w-full mx-auto   z-[1000] flex justify-center items-center px-2 py-2 rounded-lg transition-all fade-in-out duration-500 mx-auto my-auto";
			MessageInput.style.display = "none";
		} else {
			document.getElementById("FileInputPrivate").className =
				"bg-white border-0 border-red-500  left-[-1000px] absolute w-full mx-auto   z-[1000] flex justify-center items-center px-2 py-2 rounded-lg transition-all fade-in-out duration-500 mx-auto my-auto";
			MessageInput.style.display = "block";
		}
	};

  
  return (
    <div
      id="PrivateMessaging"
      className="absolute w-full h-screen text-center top-0 bg-white grid grid-rows-[80px_auto]  left-[-2000px] border-0 border-blue-500"
    >
      <div className="h-[100px] flex w-full border-0 border-black items-center text-center">
        <button
          onClick={() => {
            const PrivateMessaging =
              document.getElementById("PrivateMessaging");
            PrivateMessaging.className =
              "absolute w-full h-full top-0 bg-white grid grid-rows-[auto_auto] left-[-2000px] z-[10000000] transition-all fade-in-out duration-500";
          }}
          className="border-0 border-black h-fit p-2 mx-5 rounded-md bg-black text-white hover:scale-105 transition-all fade-in-out"
        >
          Close
        </button>
        <div className="text-xl font-bold text-center w-full flex justify-center">
          Private Chat
        </div>
      </div>
      <div className="lg:grid lg:grid-cols-2 h-full w-full border-0 border-red-500 overflow-y-scroll">
      <div className="p-5 grid grid-rows-[60px_auto]">
          <div className="bg-[#D3D3D3] p-2  text-center">
            <div className="border-0 border-black p-2 rounded-t-md rounded-md bg-white h-fit font-bold">
              Select A Participant
            </div>
          </div>
          <div className="border-0 flex flex-wrap border-black h-full w-full p-2 bg-[#D3D3D3] rounded-b-md">
            {props.participants.map((ele, index) => {
              return (
                <React.Fragment key={index}>
                  {ele.identity !== props.identity && (
                    <div
                      className="bg-white rounded-md h-fit w-fit p-2 cursor-pointer hover:text-orange-500 hover:border-orange-500 hover:border-0 transition-all fade-in-out mx-2 focus:ring-4 focus:ring-opacity-50 focus:ring-orange-500"
                      onClick={() => {
                        setusername(ele.identity);
                        setRecieverSocketId(ele.socketId);
                      }}
                    >
                      {ele.identity}
                    </div>
                  )}
                  {ele.identity === props.identity &&
                    props.participants.length == 1 && (
                      <div className="flex items-center justify-center mx-auto my-auto text-xl font-bold  h-full w-full py-20 lg;py-auto text-center">
                        No Other Participant Has Joined The Meeting Yet
                      </div>
                    )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <div className="border-0 border-black h-full w-full p-5 overflow-y-scroll">
          <div className="h-full w-full p-2 rounded-md bg-[#D3D3D3] grid grid-rows-[40px_auto_60px] overflow-y-scroll">
            <div className="bg-white rounded-md  font-bold text-center flex items-center justify-center">
              Sending Message To {username}
            </div>
            <div className="h-full overflow-y-scroll">
              {!username && !RecieverSocketId ? (
                <div className="flex items-center text-center justify-center mx-auto my-auto text-xl font-bold  h-full w-full">
                  Select A Participant To Start A Private Chat
                </div>
              ) : (
                <div>
                  {props.directChatHistory.find(
                    (e) => e.socketId === RecieverSocketId
                  ) &&
                    props.directChatHistory
                      .find((e) => e.socketId === RecieverSocketId)
                      .ChatHistory.map((ele, index) => {
                        return (
                          <div key={index}>
                            <EachMessage
                              props={props}
                              setProgress={setProgress}
                              worker={worker}
                              setGotFile={setGotFile}
                              message={ele}
                            />
                          </div>
                        );
                      })}
                </div>
              )}
            </div>
            <div className="flex  h-fit relative bg-white rounded-md">
              <div
                id="FileInputPrivatePrivate"
                className="bg-white border-0 border-red-500 h-[30px] w-full absolute  mx-auto bottom-0 top-[10px] z-[-100]"
              >
                <input
                  type="File"
                  id="DataInput"
                  name="DataInput"
                  onChange={(e) => {
                    selectFile(setFile, e);
                  }}
                />
              </div>
              <div
                
                id="SendMessage"
                className="w-full  border-0 border-black p-0 "
              >
                <div className="bg-white rounded-lg w-full  flex justify-center ">
                  <div
                    className="border-r-2 border-gray-300 flex justify-center items-center mx-auto my-auto px-3 py-2 cursor-pointer z-[100] transition-all fade-in-out"
                    ref={Attachmentref}
                    onClick={handleToggleFileInputPrivate}
                  >
                    <GrAttachment className="w-4 h-4 lg:w-5 lg:h-5" />
                  </div>
                  <div className="relative overflow-hidden flex w-full mx-2 justify-center items-center ">
                    <div
                      id="FileInputPrivate"
                      className="bg-white border-0 border-red-500 left-[-1000px] absolute w-full mx-auto   z-[1000] flex justify-center items-center px-2 py-2 rounded-lg transition-all fade-in-out duration-500 mx-auto my-auto"
                    >
                      <input
                        type="File"
                        id="DataInput"
                        name="DataInput"
                        className="w-full mx-auto my-auto"
                        onChange={(e) => {
                          selectFile(setFile, e);
                        }}
                      />
                    </div>
                    <input
                      id="sendInputPrivate"
                      onKeyDown={(event) => {
                        if (!RecieverSocketId || !username)
                          return toast.info(
                            "Select A Participant To Start A Private Chat"
                          );
                        if (event.key === "Enter") {
                          if (File && (message?.length === 0 || !message))
                            sendFile(
                              File,
                              peers,
                              setFile,
                              props.identity,
                              true,
                              RecieverSocketId,
                              socket
                            );
                          else if (!File && (message?.length > 0 || message))
                            sendDirectMessage(
                              message,
                              socket,
                              RecieverSocketId,
                              props.identity,
                              false
                            );
                          
                        }
                        setmessage(null)
                        setFile(null)
                      }}
                      onChange={(e) => {
                        setmessage(e.target.value);
                      }}
                      placeholder="Write a Message ..."
                      className="w-full text-start items-center px-2 outline-none "
                    />
                  </div>

                  <div
                    id="SendMessageBtn"
                    onClick={() => {
                      if (!RecieverSocketId || !username)
                        return toast.info(
                          "Select A Participant To Start A Private Chat"
                        );
                      if (File && (message?.length === 0 || !message))
                      sendFile(
                        File,
                        peers,
                        setFile,
                        props.identity,
                        true,
                        RecieverSocketId,
                        socket
                      );
                      else if (!File && (message?.length > 0 || message))
                        sendDirectMessage(
                          message,
                          socket,
                          RecieverSocketId,
                          props.identity,
                          false
                        );
                        setmessage(null)
                        setFile(null)
                    }}
                    className="border-l-2 flex my-auto mx-auto justify-center items-center  border-gray-300 py-2 px-2"
                  >
                    <BsFillSendFill className="w-10 h-10 bg-yellow-500 p-3 text-white rounded-lg hover:bg-yellow-600/80 transition-all fade-in-out" />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        

      </div>
    </div>
  );
}
