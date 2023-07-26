import React, { useEffect } from 'react'

export default function LocalScreenSharePreview({ screenShareStream, socketId,loading }) {
    useEffect(() => {
       
            const my_ss_video = document.getElementById('my_ss_video')
        const my_video = document.getElementById('my_video')
        if (screenShareStream) {
            my_ss_video.srcObject = screenShareStream
            my_ss_video.autoplay = true
            my_ss_video.muted = true
            my_ss_video.onloadedmetadata = () => {
                my_ss_video.play()
            }
            my_ss_video.classList.remove('hidden')
            my_video.classList.add('hidden')
            
        }
        else{
            my_ss_video.classList.add('hidden')
            my_video.classList.remove('hidden')
        }

        
        
    }, [screenShareStream])
    return (
        <>
            <div>

            </div>
        </>
    )
}
