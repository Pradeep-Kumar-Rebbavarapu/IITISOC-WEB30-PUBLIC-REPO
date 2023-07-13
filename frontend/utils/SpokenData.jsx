export const SendYourSpokenDataToOtherPeers = async (transcript,peers) =>{
    
    for(let socketId in peers.current){
        let peer = peers.current[socketId]
        await peer.send(JSON.stringify({SpokenData:true,transcript:transcript}))
    }
}


export const updateTranscript = (transcript,Transcript,newTranscript,setnewTranscript) =>{
    alert(transcript)
    
}