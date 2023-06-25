/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
// import { convertToAgo } from "../utils/helperFunction";
import {convertToAgo} from '../utils/Helper'

const ChannelVideoCard = ({ id, snippet, statistics }) => {
    // console.log("snippet", snippet)

    const image = snippet?.thumbnails?.medium.url;
    const title = snippet?.title;
    const channelName = snippet?.channelTitle
    const time=snippet?.publishTime
    const view = statistics?.viewCount
    return (
        <div >
            <Link to={`/watch/v/${id.videoId}`} >
                <div className="m-3 w-80 shadow-lg hover:shadow-2xl rounded-lg">
                    <img className="rounded-lg" src={image} alt="image" />
                    <div className="ml-2 py-2">
                        <h1 className="font-bold  h-12 overflow-hidden text-ellipsis">{title}</h1>
                        <div className="flex  ">
                        <h1 className="text-lg  pr-5">{channelName}</h1>
                        <h1>{convertToAgo(`${time}`)}</h1>
                        </div>
                        

                        {/* <h1 className="inline h-14"></h1> */}
                        
                        {/* <h1 className="inline "> {Intl.NumberFormat('en-US', {
                            notation: "compact",
                            maximumFractionDigits: 1
                        }).format(`${view}`)} views</h1> */}
                    </div>
                    
                </div>

            </Link>
        </div>
    )
}

export default ChannelVideoCard
