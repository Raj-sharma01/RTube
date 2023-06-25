import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_KEY } from '../utils/Constanst'
import { formatter } from '../utils/Helper'
import SearchResultCard
    from './SearchResultCard'
import ChannelVideoCard from './ChannelVideoCard'

const ChannelPage = () => {
    const { channelId } = useParams()
    const [channelDetails, setChannelDetails] = useState({})
    // const [videosDetails, setVideoDetails] = useState([])
    const [channelVideos, setChannelVideos] = useState([])
    const [isReadMore, setIsReadMore] = useState(false)

    const getChannelDetails = async () => {
        const data = await fetch("https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=" + channelId + "&key=" + API_KEY)
        const json = await data.json()
        console.log("channel detail", json.items[0])
        setChannelDetails(json.items[0])
    }

    // const getVideosDetails = async () => {
    //     const data = await fetch("https://www.googleapis.com/youtube/v3/search?key=" + API_KEY + "&channelId=" + channelId + "&part=snippet,id&order=date&maxResults=20")
    //     const json = await data.json()
    //     console.log("videos details", json.items)
    //     setVideoDetails(json.items)
    // }
    const getvideosByChannel = async () => {
        const data = await fetch('https://www.googleapis.com/youtube/v3/search?key=' + API_KEY + '&channelId=' + channelId + '&part=snippet,id&order=date&maxResults=20')
        const json = await data.json()
        console.log("video by channel id", json.items)
        setChannelVideos(json.items)

    }

    useEffect(() => {
        getChannelDetails()
        // getVideosDetails()
        getvideosByChannel()

    }, [channelId])

    return (
        <div className='flex flex-col w-full'>
            <div className='flex flex-col items-center px-10 pt-5  w-full '>
                <img src={channelDetails?.snippet?.thumbnails?.high?.url} className='h-52 rounded-full' />
                <h1 className='font-bold text-2xl p-5'>{channelDetails?.snippet?.title}</h1>
                <div className='flex  pb-4'>
                    <h1 className='px-4 font-semibold'>{formatter(channelDetails?.statistics?.subscriberCount)} Subscribers</h1>
                    <h1 className='px-4 font-semibold' >{channelDetails?.statistics?.videoCount} Videos</h1>
                    <h1 className='px-4 font-semibold'>{formatter(channelDetails?.statistics?.viewCount)} Views</h1>
                </div>

                <div>
                    <button className=" px-10 py-2 text-lg bg-black text-white font-semibold   rounded-3xl cursor-pointer mx-auto mb-4">

                        Subscribe
                    </button>
                </div>
                 {/* start */}
                 <div>
                    {isReadMore ? <span className=' whitespace-pre-wrap leading-6'>{channelDetails?.snippet?.description}  </span> : <span className=' whitespace-pre-wrap leading-6'>{channelDetails?.snippet?.description.substring(0, 300) } ...</span>}


                    {/* {isReadMore ? <span>Readless</span> : <span>Readmore</span>} */}

                    <button onClick={() => setIsReadMore(!isReadMore)}>{isReadMore ? "  Readless" : "  Readmore"}</button>
                </div>
                {/* end */}
                {/* <h1 className=' whitespace-pre-wrap leading-5'>{channelDetails?.snippet?.description}</h1> */}

            </div>
            <br/>
         <hr/>
            {/* <div>
                {videosDetails.map((result, index) => { return <SearchResultCard key={index} {...{ ...result.id, ...result.snippet }} /> })}
            </div> */}
            <div className='block'>
                <h1>Videos</h1>
                <div className='flex flex-wrap justify-center'>
                {
                    channelVideos?.map((channelVIdeo, index) => {
                        return (<ChannelVideoCard key={index}  {...channelVIdeo} />)
                    })


                }</div>
                
                    {/* <SearchResultCard key={index}  {...{ ...channelVIdeo.id, ...channelVIdeo.snippet }} /> */}
            </div>

        </div>
    )
}

export default ChannelPage
