import React, { useEffect, useMemo, useState } from 'react'
import { convertToAgo } from '../utils/Helper'
import { API_KEY } from '../utils/Constanst'
import { Link } from 'react-router-dom'

const DescriptionBox = ({ channelId, channelTitle, description, publishedAt, title, thumbnails, tags, commentCount, likeCount, viewCount }) => {

    const time = useMemo(() => convertToAgo(publishedAt), [publishedAt])
    // const [isOpen, setIsOpen] = useState(false)
    const [channelData, setChannelData] = useState({})
    const [isReadMore, setIsReadMore] = useState(false)

    const getChannelData = async () => {
        const data = await fetch("https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=" + channelId + "&key=" + API_KEY)
        const json = await data.json()
        console.log("channel data", json.items[0])
        setChannelData(json.items[0])
    }

    useEffect(() => {
        getChannelData()
    }, [channelId])

    return (
        // w-[640px]  py-5 rounded-lg
        <div className='w-fit'>
            <h2 className='font-semibold text-2xl'>{title}</h2>
            <div className='flex justify-between py-5'>
                <div className='flex'>
                    <Link to={"/channel/" + channelId}>
                        <img alt="profilePic" src={channelData?.snippet?.thumbnails?.default?.url} className='w-11 rounded-full' />
                    </Link>
                    <div className='flex flex-col ml-4'>
                        {/* <div className='flex flex-col'> */}
                        <Link to={"/channel/" + channelId}>
                            <h2 className='font-bold'>{channelTitle}</h2>
                        </Link>
                        <div className="  text-sm  "> {Intl.NumberFormat('en-US', {
                            notation: "compact",
                            maximumFractionDigits: 1
                        }).format(`${channelData?.statistics?.subscriberCount}`)} Subscribers </div>
                        {/* </div> */}
                    </div>
                    {/* px-3 m-3 py-2 bg-slate-900 rounded-3xl  */}
                    <div>
                        <button className='px-2 sm:px-4  py-2 sm:text-lg  bg-black text-white font-semibold   rounded-3xl cursor-pointer sm:ml-8 mx-2 text-sm'>Subscribe</button>
                    </div>
                </div>

                <div className="flex w-24 h-10 sm:h-auto sm:w-auto">
                    {/* px-3 ml-3 py-2 rounded-l-3xl bg-gray-400  hover:bg-gray-500 cursor-pointer */}
                    <button className="rounded-l-3xl  text-sm px-1  sm:text-sm bg-gray-600  hover:bg-gray-700 sm:px-2 cursor-pointer text-white">👍🏼   {Intl.NumberFormat('en-US', {
                        notation: "compact",
                        maximumFractionDigits: 1
                    }).format(`${likeCount}`)} </button>
                    {/* px-3 mr-3 py-2 rounded-r-3xl bg-gray-400  hover:bg-gray-500 cursor-pointer */}
                    <button className=" rounded-r-3xl sm:text-sm bg-gray-600  hover:bg-gray-700 sm:px-2 cursor-pointer text-white">👎🏼</button>
                </div>
            </div>
            <div className='flex'>
                <span className='font-semibold'>{Intl.NumberFormat('en-US', {
                    notation: "compact",
                    maximumFractionDigits: 1
                }).format(`${viewCount}`)} views</span>

                <span className=' font-semibold ml-4'>{time}</span>

            </div>

            {/* <div className=' p-5  '>
                <h2>Description</h2>
                <button className='underline' onClick={() => setIsOpen(!isOpen)}>{isOpen ? "hide" : "show"}</button>
                <h2 className=' whitespace-pre-wrap'>{isOpen ? description : null}</h2>
            </div> */}


            <div className='p-2 mt-2 bg-stone-200 dark:bg-gray-950 rounded-lg'>
                {isReadMore ? <span className=' whitespace-pre-wrap leading-6 break-all'>{description}  </span> : <span className=' whitespace-pre-wrap leading-6 break-all'>{description?.substring(0, 100)} ...</span>}


                {/* {isReadMore ? <span>Readless</span> : <span>Readmore</span>} */}

                <button onClick={() => setIsReadMore(!isReadMore)}>{isReadMore ? "  Readless" : "  Readmore"}</button>
            </div>


        </div>
    )
}

export default DescriptionBox
