import { store } from "../store/store"
import { setIdentity,setIsRoomHost, setRoomCapacity, setRoomId, setTitle } from "../store/actions"

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
    store.dispatch(setRoomCapacity(RoomCapacity))
    store.dispatch(setTitle(title))
    socket.current.send(JSON.stringify({
        "type":"create-new-room",
        "data":data
    }))
}