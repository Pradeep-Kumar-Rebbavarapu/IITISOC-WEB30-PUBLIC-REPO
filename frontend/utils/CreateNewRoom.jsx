import { store } from "../store/store"
import { setIdentity,setIsRoomHost, setRoomId } from "../store/actions"

export const createNewRoom = (socket,auth,user,roomID, isRoomHost,title,RoomCapacity) => {
    const data = {
        username:user.username,
        roomID,
        isRoomHost,
        title,
        RoomCapacity
    }
    store.dispatch(setRoomId(roomID))
    store.dispatch(setIdentity(user.username))
    store.dispatch(setIsRoomHost(isRoomHost))
    socket.current.send(JSON.stringify({
        "type":"create-new-room",
        "data":data
    }))
}