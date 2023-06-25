import React from 'react'
import { convertToAgo } from '../utils/Helper'
import { Link } from 'react-router-dom'

const PlaylistCard = ({ channelTitle, channelId, description, publishedAt, resourceId, thumbnails, title }) => {

    const time = convertToAgo(publishedAt)


    return (
        <Link to={"/watch/v/" + resourceId.videoId}>
            <div className='flex py-4 px-2  w-full sm:min-w-full'>
                <img src={thumbnails.medium.url} alt='thumbnail' className=' rounded-xl w-1/2' />
                <div className='w-1/2 mx-2'>
                    <h2 className='whitespace-pre-wrap overflow-ellipsis break-all font-bold h-12 overflow-hidden sm:h-auto sm:overflow-visible'>{title}</h2>

                    <h2 className='font-semibold'>{channelTitle}</h2>

                    <h2>{time}</h2>
                </div>
            </div>
        </Link>

    )
}

export default PlaylistCard
