import React from 'react'
import { convertToAgo } from '../utils/Helper'
import { Link } from 'react-router-dom'


const RelatedVideoCard = ({ channelId, videoId, playlistId, publishedAt, title, description, channelTitle, liveBroadcastContent, thumbnails }) => {

  const time = convertToAgo(publishedAt)

  return (
    <Link to={"/watch/v/" + videoId}>
      <div className='p-1'>
        <div className='flex'>
          {videoId ?
            <img src={thumbnails.medium.url} alt='thumbnail' className='mx-5 rounded-xl w-44 h-24' />
            : playlistId ?
              <img src={thumbnails.medium.url} alt='thumbnail' className='mx-5 rounded-xl w-44 h-24' />
              : <div className=' mx-5 flex justify-center' >
                <img src={thumbnails.medium.url} alt='thumbnail' className='rounded-full' />
              </div>
          }

          <div>
            <h2 className=' font-semibold h-10 m-1 overflow-hidden text-ellipsis text-sm '>{title}</h2>

            {playlistId ? <h2 className='text-xs'>playlist</h2> : null}
            <h2 className=' font-semibold text-xs'>{channelTitle}</h2>
            {liveBroadcastContent == 'live' ? <h2 className='bg-red-500 text-white inline-block  px-3 pb-1 rounded-md text-xs'>{liveBroadcastContent}</h2> : null}
            <h2 className='text-xs'>{time}</h2>
          </div>
        </div>
      </div>
    </Link>
  )

}

export default RelatedVideoCard

