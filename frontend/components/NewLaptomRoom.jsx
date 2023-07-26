import React from 'react';

const NewLaptopRoom = () => {
    return (
        <div className="flex">
            <div className="w-100 bg-gray-200">
                <div
                    id="Left_Nav"
                    className="hidden lg:flex  h-full flex-col items-center justify-center transition-all fade-in-out w-[100px] border-r-2"
                >
                    <div
                        onClick={() => {
                            handleToggleChatParticipantsArea("Video");
                        }}
                        id="Left_Nav_Video_Btn"
                        className="focus:bg-orange-500 cursor-pointer !h-fit my-5 p-3 rounded-lg bg-orange-500 transition-all text-orange-600 bg-opacity-20 hover:bg-opacity-20"
                    >
                        <BsCameraVideoFill className="w-7 h-7 " />
                    </div>
                    <div
                        id="Left_Nav_Message_Btn"
                        className="focus:bg-orange-500 cursor-pointer !h-fit my-5 p-3 rounded-lg hover:bg-orange-500 transition-all text-orange-600 bg-opacity-20 hover:bg-opacity-20"
                        onClick={() => {
                            handleToggleChatParticipantsArea("Chat");
                        }}
                    >
                        <BsChatLeftDots className="w-7 h-7 " />
                    </div>
                    <div
                        id="Left_Nav_Participants_Btn"
                        className="focus:bg-orange-500 cursor-pointer !h-fit my-5 p-3 rounded-lg hover:bg-orange-500 transition-all text-orange-600 bg-opacity-20 hover:bg-opacity-20"
                        onClick={() => {
                            handleToggleChatParticipantsArea("Participants");
                        }}
                    >
                        <BsPeople className="w-7 h-7 " />
                    </div>
                    <div
                        id="Left_Nav_Recordings_Btn"
                        className="focus:bg-orange-500 cursor-pointer !h-fit my-5 p-3 rounded-lg hover:bg-orange-500 transition-all text-orange-600 bg-opacity-20 hover:bg-opacity-20"
                        onClick={() => {
                            handleRecording();
                        }}
                    >
                        <BsFillRecordBtnFill className="w-7 h-7 " />
                    </div>
                    <SpeechToText
                        Transcript={Transcript}
                        speechToText={speechToText}
                        setSpeechToText={setSpeechToText}
                        resetTranscript={resetTranscript}
                        transcript={transcript}
                        peers={peers}
                        browserSupportsSpeechRecognition={
                            browserSupportsSpeechRecognition
                        }
                    />

                    <div
                        id="Left_Nav_Editor_Btn"
                        className="focus:bg-orange-500 cursor-pointer !h-fit my-5 p-3 rounded-lg hover:bg-orange-500 transition-all text-orange-600 bg-opacity-20 hover:bg-opacity-20"
                        onClick={() => {
                            OpenTextEditor();
                        }}
                    >
                        <AiFillFileText className="w-7 h-7 " />
                    </div>

                    <div
                        id="Left_Nav_Editor_Btn"
                        className="focus:bg-orange-500 cursor-pointer !h-fit my-5 p-3 rounded-lg hover:bg-orange-500 transition-all text-orange-600 bg-opacity-20 hover:bg-opacity-20"
                        onClick={() => {
                            OpenPrivateMessaging();
                        }}
                    >
                        <BiMessageAltError className="w-7 h-7" />
                    </div>
                    <div id="MeetingDetails" className="absolute w-fit p-4 h-fit bg-white font-bold text-black border-2 bottom-[100px]  z-[100] left-[-1000px] transition-all fade-in-out">
                        <div className="my-5">Room Id : {RoomDetails.roomID}</div>
                        <div className="my-5">Current Room Capacity : {RoomDetails.roomCapacity}</div>
                        <div className="my-5">Share Room : <span className="text-white border-2 bg-black p-2 rounded-md">{`http://localhost:3000/${router.asPath}`}</span></div>
                        <input min="0" onKeyPress={(event) => {
                            const charCode = event.charCode;

                            if (charCode < 48 || charCode > 57) {
                                event.preventDefault();
                            }
                        }} type="number" className="p-2 border-2  border-black text-black outline-none" placeholder='Change Room Capacity' /><button className="p-2 bg-black hover:ring-4 text-white hover:ring-opacity-50 hover:ring-black transition-all fade-in-out" onClick={() => {
                            axios.post('https://www.pradeeps-video-conferencing.store/api/v1/ChangeRoomCapacity', {
                                roomID: RoomDetails.roomID,
                                capacity: document.querySelector('input[type="number"]').value
                            }, {
                                headers: {
                                    Authorization: 'Bearer ' + auth.access
                                }
                            }).then((response) => {
                               
                                setRoomDetails({ ...RoomDetails, roomCapacity: response.data.capacity })
                                toast.success('Room Capacity Changed')
                            }).catch((err) => {
                                
                                toast.error('Some Error Occured')
                            })
                        }}>Change</button>
                    </div>
                    <div className="w-[60px] h-[60px] rounded-full bg-white border-2 border-black bottom-0 mt-auto mb-5 flex justify-center items-center " onClick={() => {
                        if (document.getElementById('MeetingDetails').classList.contains('left-[-1000px]')) {
                            document.getElementById('MeetingDetails').className = 'absolute w-fit p-4 h-fit bg-white font-bold text-black border-2 bottom-[100px]  z-[100] left-[100px] transition-all fade-in-out opacity-20 hover:opacity-100'
                        }
                        else {
                            document.getElementById('MeetingDetails').className = 'absolute w-fit p-4 h-fit bg-white font-bold text-black border-2 bottom-[100px]  z-[100] left-[-1000px] transition-all fade-in-out opacity-20 hover:opacity-100'
                        }
                    }}>
                        <TbListDetails className="w-7 h-7" />
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col">
                <div className="h-16 bg-blue-200">
                    {/* First row in the second column */}
                    <div className="h-[60px] hidden lg:flex w-full py-2">
                        <div
                            onClick={handleToggleLeftNav}
                            className="my-auto p-2 border-0 w-fit  bg-gray-300 bg-opacity-30 hover:bg-gray-400 hover:bg-opacity-20 transition-all fade-in-out cursor-pointer rounded-md "
                        >
                            {LeftNavOpen ? (
                                <AiOutlineLeft className="w-6 h-6 mx-auto my-auto text-gray-500 " />
                            ) : (
                                <AiOutlineRight className="w-6 h-6 mx-auto my-auto text-gray-500 " />
                            )}
                        </div>
                        <div className=" text-center font-bold items-center flex text-xl ml-4">
                            {title}
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-green-200">
                    <div
                        id="otherTemplate"
                        className={`p-0   border-0 border-blue-500 h-full `}
                    >
                        <div
                            id="video-section"
                            className="w-full h-full  top-0   !z-[0] transition-all fade-in-out duration-500 "
                        >
                            <VideoGrid
                                length={props.participants.length}
                                localStream={localStream.current}
                            />
                        </div>
                        <div
                            id="emoji-section"
                            className="w-[50px] h-[300px] absolute  z-[10000000000000000000000000] bottom-[250px] hidden bg-white"
                        >
                            <Emoji peers={peers} props={props} />
                        </div>
                    </div>
                </div>
                <div className="h-32 bg-pink-200">
                    {/* Third row in the second column */}
                    <div className="h-[100px]  bg-white flex justify-center border-t-2 absolute lg:relative w-full bottom-0 ">
                        <div className="grid grid-cols-5 lg:grid-cols-6 text-center items-center ">
                            <div
                                onClick={() => {
                                    const EmojiSection =
                                        document.getElementById("emoji-section");
                                    if (EmojiSection.classList.contains("hidden")) {
                                        EmojiSection.className =
                                            " absolute  z-[10] -right-5 h-fit w-fit -bottom-5 md:left-auto md:bottom-auto md:right-[20px] md:top-[110px]  bg-white";
                                    } else {
                                        EmojiSection.className =
                                            "absolute  z-[10] -right-5 h-fit w-fit -bottom-5 md:left-auto md:bottom-auto  md:right-[20px] md:top-[110px] hidden bg-white";
                                    }
                                }}
                                className="group transition-all fade-in-out mx-5 "
                            >
                                <div
                                    onClick={() => { }}
                                    id="ToggleMicBtn"
                                    className="border-0 rounded-lg p-2 w-[50px] mx-auto group-hover:bg-orange-500 group-hover:bg-opacity-20 transition-all fade-in-out group-hover:text-orange-500 "
                                >
                                    <BsFillEmojiSmileFill />
                                </div>
                                <div className="hidden md:block lg:text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500">
                                    Emoji
                                </div>
                            </div>

                            <div className="group transition-all fade-in-out mx-5">
                                <div
                                    onClick={() => {
                                        ToggleMic(MicOn);
                                    }}
                                    id="ToggleMicBtn"
                                    className="border-0 rounded-lg p-2 w-fit mx-auto group-hover:bg-orange-500 group-hover:bg-opacity-20 transition-all fade-in-out group-hover:text-orange-500 "
                                >
                                    {!MicOn ? (
                                        <BsFillMicMuteFill className="w-4 h-4 lg:w-5 lg:h-5" />
                                    ) : (
                                        <BsFillMicFill className="w-4 h-4 lg:w-5 lg:h-5" />
                                    )}
                                </div>
                                <div className="hidden md:block lg:text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500">
                                    {MicOn ? "Mic On" : "Mic Off"}
                                </div>
                            </div>

                            <div className="group transition-all fade-in-out mx-5">
                                <div
                                    onClick={() => {
                                        ToggleCamera(CamOn);
                                    }}
                                    id="ToggleVideoBtn"
                                    className="border-0 rounded-lg p-2 w-fit mx-auto group-hover:bg-orange-500 group-hover:bg-opacity-20 transition-all fade-in-out group-hover:text-orange-500 text-sm"
                                >
                                    {!CamOn ? (
                                        <BsFillCameraVideoOffFill className="w-4 h-4 lg:w-5 lg:h-5" />
                                    ) : (
                                        <BsCameraVideoFill className="w-4 h-4 lg:w-5 lg:h-5" />
                                    )}
                                </div>
                                <div className="hidden md:block lg:text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500">
                                    {CamOn ? "Cam On" : "Cam Off"}
                                </div>
                            </div>

                            <div className="group transition-all hidden lg:block fade-in-out mx-5">
                                <div
                                    onClick={() => {
                                        handleScreenShare(
                                            ScreenShareOn,
                                            ScreenSharingStream,
                                            setScreenShareOn,
                                            peers,
                                            props.socketId,
                                            localStream,
                                            socket,
                                            auth,
                                            roomID
                                        );
                                    }}
                                    className="border-0 rounded-lg p-2 w-fit mx-auto group-hover:bg-orange-500 group-hover:bg-opacity-20 transition-all fade-in-out group-hover:text-orange-500"
                                >
                                    {ScreenShareOn ? (
                                        <LuScreenShareOff className="w-4 h-4 lg:w-5 lg:h-5" />
                                    ) : (
                                        <LuScreenShare className="w-4 h-4 lg:w-5 lg:h-5" />
                                    )}
                                </div>
                                <div className="text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500">
                                    {!ScreenShareOn ? "Start Sharing" : "Stop Sharing"}
                                </div>
                            </div>

                            <div className="group transition-all hidden lg:block fade-in-out mx-5">
                                <div
                                    onClick={() => {
                                        ToggleBoard();
                                    }}
                                    className="border-0 rounded-lg p-2 w-fit mx-auto group-hover:bg-orange-500 group-hover:bg-opacity-20 transition-all fade-in-out group-hover:text-orange-500"
                                >
                                    {" "}
                                    <BsClipboard2Fill className="w-4 h-4 lg:w-5 lg:h-5" />
                                </div>
                                <div className="text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500">
                                    Open Board
                                </div>
                            </div>

                            <div
                                id="HandRaise"
                                className="group transition-all fade-in-out mx-5"
                            >
                                <div
                                    onClick={() => {
                                        const handRaiseData = {
                                            handraise: true,
                                            username: props.identity,
                                        };
                                        for (let socketId in peers.current) {
                                            let peer = peers.current[socketId];
                                            peer.send(JSON.stringify(handRaiseData));
                                        }
                                        toast(`${props.identity} has raised his hand`, {
                                            position: "bottom-center",
                                            autoClose: 800,
                                            hideProgressBar: false,
                                            closeOnClick: false,
                                            pauseOnHover: false,
                                            draggable: false,
                                            theme: "colored",

                                            style: {
                                                backgroundColor: "#ff6f00",
                                                color: "white",
                                                bottom: "120px",
                                            },
                                        });
                                    }}
                                    id="ToggleMicBtn"
                                    className="border-0 rounded-lg p-2 w-fit mx-auto group-hover:bg-orange-500 group-hover:bg-opacity-20 transition-all fade-in-out group-hover:text-orange-500 "
                                >
                                    <FaHandPaper />
                                </div>
                                <div className="hidden md:block lg:text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500">
                                    Raise Hand
                                </div>
                            </div>

                            <div
                                id="MoreBtn"
                                className="group lg:hidden transition-all fade-in-out mx-5"
                            >
                                <div
                                    onClick={() => {
                                        ToggleMoreBtn();
                                    }}
                                    id="ToggleMicBtn"
                                    className="border-0 rounded-lg p-2 w-fit mx-auto group-hover:bg-orange-500 group-hover:bg-opacity-20 transition-all fade-in-out group-hover:text-orange-500 "
                                >
                                    <FiMoreVertical className="w-4 h-4 lg:w-5 lg:h-5" />
                                </div>
                                <div className="hidden md:block lg:text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500">
                                    More
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="group transition-all fade-in-out mx-5" onClick={() => {
                                
                                localStream.current.getTracks().forEach((track) => {
                                    track.stop();
                                });
                                peers.current = {};
                                router.push('/CreateRoomPage')
                                socket.current.close()

                                store.dispatch(setIdentity(null))
                                store.dispatch(setRoomId(null))
                                store.dispatch(setMessages([]))
                                store.dispatch(setParticipants([]))

                                store.dispatch(setIsRoomHost(false))
                                store.dispatch(setActiveConversation(null))
                                store.dispatch(setDirectChatHistotry([]))
                                store.dispatch(setSocketId(null))
                                store.dispatch(setTranscript(""))
                                setRoomDetails({
                                    roomID: null,
                                    roomCapacity: null,
                                    title: null
                                })

                            }}>
                                <div className="border-0 rounded-lg text-white p-2 w-fit mx-auto bg-red-500 hover:bg-red-600 transition-all fade-in-out ">
                                    <IoExit className="w-4 h-4 lg:w-5 lg:h-5" />
                                </div>
                                <div className="hidden md:block lg:text-md transition-all fade-in-out  mt-2 text-red-500 hover:text-red-600 " >
                                    Leave Call
                                </div>
                            </div>
                        </div>
                        <div
                            id="MoreBtnMenu"
                            className="absolute w-full lg:hidden  h-[300px] bottom-[-500px] right-0 bg-white  z-[1000000000] transition-all fade-in-out duration-500"
                        >
                            <div className="w-full h-full grid grid-cols-4 justify-between items-center">
                                <div
                                    id="Left_Nav_Message_Btn"
                                    className="focus:bg-orange-500 cursor-pointer h-full w-full  p-3 rounded-lg hover:bg-orange-500 transition-all flex flex-col text-center  justify-center mx-auto text-orange-600  hover:bg-opacity-20"
                                    onClick={() => {
                                        handleToggleChatParticipantsArea("Chat");
                                    }}
                                >
                                    <BsChatLeftDots className="w-7 h-7 mx-auto" />
                                    <div className="text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500 text-center">
                                        {"Messages"}
                                    </div>
                                </div>
                                <div
                                    id="Left_Nav_Participants_Btn"
                                    className="focus:bg-orange-500 cursor-pointer h-full w-full  p-3 rounded-lg hover:bg-orange-500 transition-all flex flex-col text-center justify-center mx-auto text-orange-600 bg-opa-20 hover:bg-opacity-20"
                                    onClick={() => {
                                        handleToggleChatParticipantsArea("Participants");
                                    }}
                                >
                                    <BsPeople className="w-7 h-7 mx-auto" />
                                    <div className="text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500 text-center">
                                        {"Participants"}
                                    </div>
                                </div>

                                <SpeechToText
                                    Transcript={Transcript}
                                    speechToText={speechToText}
                                    setSpeechToText={setSpeechToText}
                                    resetTranscript={resetTranscript}
                                    peers={peers}
                                    transcript={transcript}
                                    browserSupportsSpeechRecognition={
                                        browserSupportsSpeechRecognition
                                    }
                                />

                                <div
                                    id="Left_Nav_Editor_Btn"
                                    className="focus:bg-orange-500 cursor-pointer h-full w-full  p-3 rounded-lg hover:bg-orange-500 transition-all flex flex-col text-center  justify-center mx-auto text-orange-600 bg-opa-20 hover:bg-opacity-20"
                                    onClick={() => {
                                        OpenTextEditor();
                                    }}
                                >
                                    <AiFillFileText className="w-7 h-7 mx-auto" />
                                    <div className="text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500 text-center">
                                        {"Text Editor"}
                                    </div>
                                </div>
                                <div
                                    onClick={() => {
                                        handleScreenShare(
                                            ScreenShareOn,
                                            ScreenSharingStream,
                                            setScreenShareOn,
                                            peers,
                                            props.socketId,
                                            localStream,
                                            socket,
                                            auth,
                                            roomID
                                        );
                                    }}
                                    className="group transition-all hover:bg-orange-500 flex flex-col text-center h-full w-full p-2 rounded-md justify-center mx-auto lg:hidden fade-in-out hover:bg-opacity-20"
                                >
                                    <div className="border-0 rounded-lg p-2  mx-auto text-orange-500  transition-all fade-in-out  ">
                                        {ScreenShareOn ? (
                                            <LuScreenShareOff className="w-4 h-4 lg:w-5 lg:h-5 mx-auto" />
                                        ) : (
                                            <LuScreenShare className="w-4 h-4 lg:w-5 lg:h-5 mx-auto" />
                                        )}
                                    </div>
                                    <div className="text-md transition-all fade-in-out text-gray-400 mt-2  text-center">
                                        {!ScreenShareOn ? "Start Sharing" : "Stop Sharing"}
                                    </div>
                                </div>

                                <div
                                    onClick={() => {
                                        ToggleBoard();
                                    }}
                                    className="group transition-all hover:bg-orange-500 flex flex-col text-center h-full w-full p-2 rounded-md justify-center mx-auto lg:hidden fade-in-out hover:bg-opacity-20"
                                >
                                    <div className="border-0 rounded-lg p-2 w-fit mx-auto text-orange-500  transition-all fade-in-out ">
                                        <BsClipboard2Fill className="w-4 h-4 lg:w-5 lg:h-5" />
                                    </div>
                                    <div className="text-md transition-all fade-in-out text-gray-400 mt-2 ">
                                        Open Board
                                    </div>
                                </div>
                                <div
                                    className="focus:bg-orange-500 cursor-pointer h-full w-full  p-3 rounded-lg hover:bg-orange-500 transition-all flex flex-col text-center  justify-center mx-auto text-orange-600 bg-opa-20 hover:bg-opacity-20"
                                    onClick={() => {
                                        handleRecording();
                                    }}
                                >
                                    <BsFillRecordBtnFill className="w-7 h-7 mx-auto" />
                                    <div className="text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500 text-center">
                                        {RecordingOn ? "Stop Recording" : "Start Recording"}
                                    </div>
                                </div>
                                <div
                                    id="Left_Nav_Editor_Btn"
                                    className="focus:bg-orange-500 cursor-pointer h-full w-full  p-3 rounded-lg hover:bg-orange-500 transition-all flex flex-col text-center  justify-center mx-auto text-orange-600 bg-opa-20 hover:bg-opacity-20"
                                    onClick={() => {
                                        OpenPrivateMessaging();
                                    }}
                                >
                                    <BiMessageAltError className="w-7 h-7 mx-auto" />
                                    <div className="text-md transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500 text-center">
                                        {"Private Chat"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100 bg-yellow-200">
                <div
                    id="ChatParticipantsBox"
                    className="h-full z-[10] border-0 pt-12 lg:pt-0 absolute lg:relative w-full lg:p-5 lg:w-[550px] hidden border-l-2 rounded-lg"
                >
                    <div
                        id="CloseChatParticipantsBox"
                        className=" lg:hidden absolute top-0 w-full h-12 bg-gray-200 flex items-center px-5 pt-3"
                    >
                        <AiOutlineClose
                            className="w-6 h-6 "
                            onClick={() => {
                                document
                                    .getElementById("ChatParticipantsBox")
                                    .classList.add("hidden");
                            }}
                        />
                    </div>
                    <div className="bg-gray-200 w-full h-full  grid grid-rows-[80px_auto_80px] rounded-lg">
                        <div className="w-full h-full border-0 rounded-t-xl border-black  p-3">
                            <div className="border-0 border-red-500 rounded-lg bg-gray-100 w-full h-full grid grid-cols-2 text-center p-2">
                                <div
                                    onClick={handleToggleMessageBtn}
                                    id="MessageBtn"
                                    className=""
                                >
                                    Messages
                                </div>
                                <div
                                    onClick={handleToggleParticipantsBtn}
                                    id="ParticipantsBtn"
                                >
                                    Participants({props.participants.length})
                                </div>
                            </div>
                        </div>
                        <div
                            id="Chat_Area"
                            className=" h-full border-0 border-black relative  justify-center overflow-x-hidden"
                        >
                            <div id="Messages" className="h-full w-full mx-2 relative">
                                {props.messages.map((message, index) => {
                                    return (
                                        <div key={index}>
                                            <EachMessage
                                                props={props}
                                                DownlaodingText={DownlaodingText}
                                                setProgress={setProgress}
                                                worker={worker}
                                                setGotFile={setGotFile}
                                                message={message}
                                                UploadingText={UploadingText}
                                                TagDetails={TagDetails}
                                                setTagDetails={setTagDetails}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            <div id="Participants" className="p-3 w-full h-full">
                                <ParticipantsList
                                    isRoomHost={props.isRoomHost}
                                    participants={props.participants}
                                />
                            </div>
                        </div>

                        <div
                            onClick={(event) => {
                                handleToggleMessageBtn();
                            }}
                            id="SendMessage"
                            className="w-full  border-0 border-black relative p-3 "
                        >
                            {TagDetails.tagged && (
                                <div className="absolute w-full h-fit justify-between items-center  flex text-orange-500 bg-gray-500 p-2  bottom-[80px]">
                                    Tagged {TagDetails.taggedTo} On{" "}
                                    {`"${TagDetails.taggedMessage}"`}
                                    <button
                                        className="bg-white p-2 rounded-md w-fit h-fit text-black m-2"
                                        onClick={() => {
                                            setTagDetails({
                                                tagged: false,
                                                taggedTo: null,
                                                taggedBy: null,
                                                taggedMessage: null,
                                            });
                                        }}
                                    >
                                        UnTag
                                    </button>
                                </div>
                            )}
                            <div className="bg-white rounded-lg w-full  flex justify-center ">
                                <div
                                    className="border-r-2 border-gray-300 flex justify-center items-center mx-auto my-auto px-3 py-2 cursor-pointer z-[100] transition-all fade-in-out"
                                    ref={Attachmentref}
                                    onClick={handleToggleFileInput}
                                >
                                    <GrAttachment className="w-4 h-4 lg:w-5 lg:h-5" />
                                </div>
                                <div className="relative overflow-hidden flex w-full mx-2 justify-center items-center ">
                                    <div
                                        id="FileInput"
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
                                        id="sendInput"
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter") {
                                                if (File && (message?.length === 0 || !message))
                                                    sendFile(
                                                        File,
                                                        peers,
                                                        setFile,
                                                        props.identity,
                                                        false,
                                                        null
                                                    );
                                                else if (!File && (message?.length > 0 || message))
                                                    sendMessage(
                                                        message,
                                                        peers,
                                                        "message",
                                                        TagDetails
                                                    );
                                                setmessage("");
                                                setTagDetails({
                                                    tagged: false,
                                                    taggedTo: null,
                                                    taggedBy: null,
                                                    taggedMessage: null,
                                                });
                                            }
                                        }}
                                        onChange={(e) => {
                                            setmessage(e.target.value);
                                        }}
                                        placeholder="Write a Message ..."
                                        className="w-full h-full text-start items-center px-2 outline-none "
                                    />
                                </div>

                                <div
                                    id="SendMessageBtn"
                                    onClick={() => {
                                        if (File && (message?.length === 0 || !message))
                                            sendFile(
                                                File,
                                                peers,
                                                setFile,
                                                props.identity,
                                                false,
                                                null
                                            );
                                        else if (!File && (message?.length > 0 || message))
                                            sendMessage(message, peers, "message", TagDetails);
                                        setmessage("");
                                        setTagDetails({
                                            tagged: false,
                                            taggedTo: null,
                                            taggedBy: null,
                                            taggedMessage: null,
                                        });
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
    );
};

export default NewLaptopRoom;
