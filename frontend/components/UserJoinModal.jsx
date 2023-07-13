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
    content: {
      top: "50%",
      left: "50%",
      height: "fit-content",
      transform: "translate(-50%, -50%)",
      background: "white",
      overflow: "hidden",
      border: "0px",
    },
  };
  return (
    <div>
      <Modal closeTimeoutMS={500} isOpen={JoinModal} style={customStyles}>
        <div>{PeerUsername} Want To Join Your Meeting</div>
        <div>
          <button
            id="permit-btn"
            onClick={() => {
				socket.current.send(JSON.stringify({
					"type":"ask-peer-to-prepare-conn",
					"data":{
						"connUserSocketId":peerUserID,
					}
				}))
              setIsJoinModal(false);
            }}
          >
            Permit
          </button>
          <button id="reject-btn">Reject</button>
        </div>
      </Modal>
    </div>
  );
}
