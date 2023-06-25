import React from 'react'

const VideoCard = ({ snippet, statistics }) => {
  const img = snippet?.thumbnails?.medium?.url
  const title = snippet?.title
  const channel = snippet?.channelTitle
  const views = statistics?.viewCount
  return (
    <div className='m-3 w-80 shadow-lg hover:shadow-2xl rounded-lg dark:bg-black'>
      <img src={img} className='rounded-lg' alt='thumbnail' />
      <div className="ml-2">
        <h1 className='font-bold  h-12 overflow-hidden text-ellipsis'>{title}</h1>
        <h1 className='text-lg'>{channel}</h1>
        <h1>{Intl.NumberFormat('en-US', {
          notation: "compact",
          maximumFractionDigits: 1
        }).format(`${views}`)} views</h1>
      </div>
    </div>
  )
}

export default VideoCard
