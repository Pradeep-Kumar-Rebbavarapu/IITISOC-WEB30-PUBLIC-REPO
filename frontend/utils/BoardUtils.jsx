import { store } from "../store/store"

const state = store.getState()
export const SendImageDataToPeers = (base64,peers) =>{
    
    for(let socketId in peers.current){
        let peer = peers.current[socketId]
        peer.send(JSON.stringify({base64:base64,identity:state.identity,image:true}))
    }
}


export const UpdateBoardCanvas = (data,isDrawing,BoardMap) =>{
    const {base64,identity,PageNumber} = data
    const image = new Image()
    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d')
    image.onload = () =>{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image,0,0)
    }
    image.src = base64
}