import React, { useEffect } from "react";
import Modal from "react-modal";
import { store } from "../store/store";
import { setIdentity, setIsRoomHost, setRoomId } from "../store/actions";
import axios from "axios";
import { useContext } from "react";
export default function UserJoinModal({
	peerUserID,
	socket,
	JoinModal,
	roomID,
	setIsJoinModal,
	ConnUserIdentity,
	roomHostUsername,
	PeerUsername,
	setOpenModals,
	OpenModals,
	user,
	auth,
	Toasts,
	toast
}) {
	
	console.log('toasts',Toasts)
	return (
		<div id={`UserJoinModal-${peerUserID}`}  className="!z-[10000]  ">
			<div id="popup-modal" tabindex="-1" class="z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full  ">
				<div class="relative w-full max-w-md max-h-full">
					<div class="relative bg-white rounded-lg shadow dark:bg-gray-200">
						<div class="p-6 text-center">
							<svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
								<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
							</svg>
							<h3 class="mb-5 text-lg font-normal text-gray-700 dark:text-gray-600">"{PeerUsername}" wants to join the meet</h3>
							<button onClick={(e)=>{
								
								socket.current.send(JSON.stringify({
									"type": "ask-peer-to-prepare-conn",
									"data": {
										"connUserSocketId":e.target.id.slice(11),
									}
								}))

								//close the Toasts
								toast.dismiss(Toasts.current.get(e.target.id.slice(11)))

							}} id={`permit-btn-${peerUserID}`} data-modal-hide="popup-modal" type="button" class="text-white bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-orange-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
								Accept
							</button>
							<button onClick={(e)=>{
								socket.current.send(JSON.stringify({
									"type": "reject-join-request",
									"data": {
										"connUserSocketId":e.target.id.slice(11),
										}
										}))
										toast.dismiss(Toasts.current.get(e.target.id.slice(11)))
							}} id={`reject-btn-${peerUserID}`} data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
