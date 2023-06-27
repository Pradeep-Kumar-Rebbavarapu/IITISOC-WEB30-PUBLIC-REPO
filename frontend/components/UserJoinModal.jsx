import React from 'react'
import Modal from "react-modal";
export default function UserJoinModal({peerUserID,socket,JoinModal,setIsJoinModal}) {
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
            <Modal
                closeTimeoutMS={500}
                isOpen={JoinModal}
                onRequestClose={() => {
                    setIsJoinModal(false);
                }}
                style={customStyles}
            >
                <div>username Want To Join Your Meeting</div>
                <div>
                    <button id='permit-btn' onClick={()=>{
                        
                        setIsJoinModal(false)
                    }}>Permit</button>
                    <button id="reject-btn">Reject</button>
                </div>
                
            </Modal>
        </div>
    )
}
