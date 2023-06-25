import React from 'react'
import { convertToAgo } from '../utils/Helper'
import { Link } from 'react-router-dom'


const SearchResultCard = ({ channelId, videoId, playlistId, publishedAt, title, description, channelTitle, liveBroadcastContent, thumbnails }) => {

    const time = convertToAgo(publishedAt)
    console.log("videoo id from search res card", videoId)
    return (

        <div className='sm:mx-5'>
            {/* <div > */}
            {videoId ?
                // video Card
                <Link to={"/watch/v/" + videoId}>
                    <div className='flex'>
                        <img src={thumbnails.medium.url} alt='thumbnail' className='w-2/5 sm:w-auto m-2 rounded-xl' />
                        <div className='p-4'>
                            <h2 className='text-sm sm:text-lg h-10 overflow-hidden sm:overflow-visible sm:h-auto font-bold mb-1'>{title}</h2>

                            <h2 className=' text-sm hidden sm:block'>{description}</h2>

                            {/* <h2>video</h2> */}
                            <h2 className=' font-bold text-xs sm:text-base'>{channelTitle}</h2>

                            {liveBroadcastContent == 'live' ? <h2 className='bg-red-500 inline-block  px-3 pb-1 rounded-md'>{liveBroadcastContent}</h2> : null}

                            <h2 className='text-xs sm:text-base'>{time}</h2>
                        </div>
                    </div>
                </Link>
                : playlistId ?
                    // playlist Card
                    <Link to={"/playlist/" + playlistId}><div className='flex'>
                        <img src={thumbnails.medium.url} alt='thumbnail' className='w-2/5 sm:w-auto m-2 rounded-xl' />
                        <div  className='p-4'>
                            <h2 className='text-sm sm:text-lg h-10 overflow-hidden sm:overflow-visible sm:h-auto font-bold mb-1'>{title}</h2>
                            <h2 className=' text-sm hidden sm:block'>{description}</h2>
                            {/* <h2>Playlist</h2> */}
                            <h2 className=' font-bold text-xs sm:text-base'>{channelTitle}</h2>
                           
                            <h2 className='text-xs sm:text-base'>{time}</h2>
                        </div>
                    </div>
                    </Link>
                    :
                    // channel Card
                    <Link to={"/channel/" + channelId}> 
                    <div className=' flex' >
                        {/* sm:w-auto  */}
                        <div className='w-2/5 flex m-2 sm:w-80'>
                        <img src={thumbnails.medium.url} alt='thumbnail' className='self-center rounded-full m-auto' />
                        </div>
                        <div className='p-4'>
                            <h2 className='text-sm sm:text-lg  overflow-hidden sm:overflow-visible sm:h-auto font-bold mb-1'>{title}</h2>
                            <h2 className='text-sm hidden sm:block'>{description}</h2>
                            <h2>channel</h2>
                            <h2 className='  font-bold text-xs sm:text-base'>{channelTitle}</h2>

                            <h2 className='text-xs sm:text-base'>{time}</h2>
                        </div>
                    </div>
                    </Link>
            }


            {/* </div> */}
        </div>

    )
}

export default SearchResultCard
