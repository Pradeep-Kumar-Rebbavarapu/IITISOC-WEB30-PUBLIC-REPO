import axios from "axios";
import { setIdentity, setRoomCapacity, setRoomId } from "../store/actions";
import { setIsRoomHost,setTitle } from "../store/actions";
import { store } from "../store/store";
import { toast } from "react-toastify";
export const JoinRoom = (
	socket,
	auth,
	user,
	roomID,
	length_of_participants
) => {
	axios
		.post(
			"https://www.pradeeps-video-conferencing.store/api/v1/GetRoomDetails/",
			{ roomID: roomID, length_of_participants: length_of_participants },
			{
				headers: {
					Authorization: "Bearer " + auth.access,
				},
			}
		)
		.then((response) => {

			if (user.username === response.data.created_by) {
				store.dispatch(setIdentity(user.username));
				store.dispatch(setIsRoomHost(true));
				store.dispatch(setRoomId(response.data.room_id));
				store.dispatch(setTitle(response.data.name))
				store.dispatch(setRoomCapacity(response.data.capacity))
				const data = {
					roomID: roomID,
					username: user.username,
				};
				socket.current.send(
					JSON.stringify({
						type: "join-room",
						data: data,
			
					})
				);
			} else {
				socket.current.send(
					JSON.stringify({
						type: "send-acceptance-letter",
						data: {
							roomID: response.data.room_id,
							PeerUsername: user.username,
							RoomHostUsername: response.data.created_by,
						},
					})
				);
			}

		})
		.catch((err) => {
			console.log(err)
			toast.error("Some Error Occured", {
				position: toast.POSITION.TOP_LEFT,
			});
		});
};
