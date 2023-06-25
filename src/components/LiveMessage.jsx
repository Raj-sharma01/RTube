import React from 'react'
import user_icon_1 from '../assets/images/user_icon_1.png'
const LiveMessage = ({name,message,img,id }) => {
    // const { channelId, displayName, profileImageUrl } = authorDetails
    // const { displayMessage } = snippet

    return (
        <div className='flex items-center over p-2'>
            <img alt="icon" src={img} className='rounded-full h-8 m-2' />
            <div>
                <h1 className='text-sm font-bold'>{name}</h1>
                <h1 className='text-sm whitespace-pre-wrap overflow-ellipsis break-all'>{message}</h1>
            </div>
        </div>      
    )
}

export default LiveMessage
