import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { API_KEY } from '../utils/Constanst'
import SearchResultCard from './SearchResultCard'
import PlaylistCard from './PlaylistCard'



const PlaylistPage = () => {

    const [videos, setVideos] = useState([])
    const { playlistId } = useParams()
   const [isReadMore,setIsReadMore]=useState(false)
    const getVideos = async () => {
        const data = await fetch("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=" + playlistId + "&key=" + API_KEY)
        const json = await data.json()
        console.log("playlist videos", json.items)
        setVideos(json.items)
    }

    useEffect(() => {
        getVideos()
    }, [playlistId])


    return (
        // flex
        <div className='sm:flex sm:ml-5  '>
            {/*  h-full my-3 rounded-3xl w-fit max-w-lg p-3 bg-black */}
            <div className='sm:w-1/2 sm:h-full sm:fixed sm:overflow-y-scroll bg-slate-300 my-3 rounded-3xl w-fit max-w-lg p-2 pb-24'>
                {/* rounded-x w-full rounded-t-3xl pb-3 */}
                {/* h-full my-3 rounded-3xl w-fit max-w-lg p-3 bg-black */}
                <img src={videos[0]?.snippet?.thumbnails?.medium?.url} className='rounded-x w-full rounded-t-3xl pb-3 ' />
                <Link to={"/channel/" + videos[0]?.snippet?.channelId}> <h1 className='text-2xl font-semibold pb-3 text-black'>{videos[0]?.snippet?.channelTitle}</h1></Link>

                {/* <h1 className=' whitespace-break-spaces text-sm '> {videos[0]?.snippet?.description.substring(0, 300)}</h1> */}


                <div className='text-black'>
                    {isReadMore ? <span className=' whitespace-pre-wrap leading-6 overflow-ellipsis break-all'>{videos[0]?.snippet?.description}  </span> : <span className=' leading-6 whitespace-pre-wrap overflow-ellipsis break-all'>{videos[0]?.snippet?.description.substring(0, 300) } ...</span>}


                    {/* {isReadMore ? <span>Readless</span> : <span>Readmore</span>} */}

                    <button onClick={() => setIsReadMore(!isReadMore)}>{isReadMore ? "  Readless" : "  Readmore"}</button>
                </div>


            </div>
            <div className=' sm:w-1/2 w-full mx-1 md:ml-1 lg:w-9/12 lg:ml-[30%] lg:pl-48 '>
                {videos.map((video) => <PlaylistCard key={video.id} {...video.snippet} />)}
            </div>
        </div>
    )
}

export default PlaylistPage
