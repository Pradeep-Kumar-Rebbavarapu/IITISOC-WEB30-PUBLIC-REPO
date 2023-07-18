import React from "react";
import Modal from "react-modal";
import { store } from "../store/store";
import { setIdentity, setIsRoomHost, setRoomId } from "../store/actions";
import axios from "axios";
import { useContext } from "react";
import Context from "../context/Context";
export default function UserJoinModal({
	peerUserID,
	socket,
	JoinModal,
	roomID,
	setIsJoinModal,
	ConnUserIdentity,
	roomHostUsername,
	PeerUsername
}) {
	const { user, auth } = useContext(Context);
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
		<div className="!z-[10000] ">
			<Modal closeTimeoutMS={500} isOpen={JoinModal} style={customStyles}>
				<div className=" text-center">
					<div className="my-2 text-white"><span className="font-bold">{PeerUsername}</span> Want To Join Your Meeting</div>
					<div className="flex flex-col">
						<button
							id="permit-btn"
							onClick={() => {
								socket.current.send(JSON.stringify({
									"type": "ask-peer-to-prepare-conn",
									"data": {
										"connUserSocketId": peerUserID,
									}
								}))
								setIsJoinModal(false);
							}}
							className="bg-orange-500 p-2 my-2 w-fit transition-all fade-in-out  mx-auto hover:ring-4 hover:ring-opacity-50 hover:ring-white text-white"
						>
							Permit
						</button>
						<button id="reject-btn"
						className="bg-orange-500 p-2 my-2 w-fit transition-all fade-in-out hover:ring-4 hover:ring-opacity-50 hover:ring-white  mx-auto text-white"
						onClick={(()=>{
							socket.current.send(JSON.stringify({
								"type": "reject-join-request",
								"data": {
									"connUserSocketId": peerUserID,
									}
									}))
									setIsJoinModal(false);
						})}
						>Reject</button>
					</div>
				</div>

			</Modal>
		</div>
	);
}
