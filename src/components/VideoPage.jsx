import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { API_KEY } from '../utils/Constanst';
import RelatedVideoCard from './RelatedVideoCard';
import DescriptionBox from './DescriptionBox';
import CommentsSection from './CommentsSection';
import LiveChatSection from './LiveChatSection';

const VideoPage = () => {

    const [relatedVideos, setRelatedVideos] = useState([])
    const { videoId } = useParams()
    const dispatch = useDispatch();
    const [videoDetails, setVideoDetails] = useState({})
    const [comments, setComments] = useState([])

    const getRelatedVideos = async () => {
        const data = await fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&relatedToVideoId=" + videoId + "&type=video&key=" + API_KEY)
        const json = await data.json()
        setRelatedVideos(json.items)
        console.log("related videos", json.items)

    }

    const getVideoDetails = async () => {
        const data = await fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=" + videoId + "&key=" + API_KEY)
        const json = await data.json()
        console.log("video detail", json)
        setVideoDetails(json.items[0])
    }

    const getComments = async () => {
        const data = await fetch("https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=" + videoId + "&key=" + API_KEY)
        const json = await data.json()
        console.log("comments", json.items)
        setComments(json.items)
    }

    useEffect(() => {
        // dispatch(closeMenu())
        getRelatedVideos()
        getVideoDetails()
        getComments()
    }, [videoId])

    return (
        // flex
        <div className='shadow-lg  w-full  sm:flex'>
            {/* ml-12 */}
            <div className='w-full sm:w-3/4'>

                {/*  width="640" height="380"  */}
                <iframe src={`https://www.youtube.com/embed/${videoId}`} className=" sm:pt-6 w-full aspect-video" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

                <div className="p-1">
                    {/* description box (accordian) */}
                    <DescriptionBox {...{ ...videoDetails?.snippet, ...videoDetails?.statistics }} />
                </div>
                {/* <div className='w-[640px] pr-10 bg-orange-50'>
                    {comments.map((comment) => <CommenstsSec key={comment.id} {...comment} />)}
                </div> */}


                {/* comment section */}
                <div className="pt-5 p-1">

                    <hr className='m-4' />
                    {comments ?
                        <div className='w-full px-5 '>
                            {comments?.map((comment) => { return <CommentsSection key={comment.id} {...{ ...comment?.snippet, ...comment?.replies }} /> })}
                        </div> : null
                    }
                    <hr />
                </div>


            </div>
            <div className='ml-4 pt-6 max-w-xl'>
                {/* live chat */}
                {videoDetails?.snippet?.liveBroadcastContent !== 'none' ?
                    <div className=' '>
                        <LiveChatSection />
                    </div> : null
                }


                {/* <h2>related videos </h2> */}
                {relatedVideos.map((result, index) => { return <RelatedVideoCard key={index} {...{ ...result.id, ...result.snippet }} /> })}
            </div>
        </div>
    )
}

export default VideoPage
