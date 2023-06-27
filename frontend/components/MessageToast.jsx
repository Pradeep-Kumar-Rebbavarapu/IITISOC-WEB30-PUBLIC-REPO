import React from 'react'

export default function MessageToast({ identity, content }) {

    return (
        <div className=''>
            <div className='text-orange-500  top-0 left-0 font-bold'>{identity}</div>
            <div className='text-black mt-5'>{content}</div>
           
        </div>
    )
}
