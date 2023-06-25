import React, { useEffect, useState } from 'react'
import LiveMessage from './LiveMessage'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../utils/ChatSlice'
import { useParams } from 'react-router-dom'
import { API_KEY } from '../utils/Constanst'
import user_icon_1 from '../assets/images/user_icon_1.png'

const LiveChat = () => {

  const { videoId } = useParams()
  const dispatch = useDispatch()
  const messages = useSelector((Store) => Store.Chat.messages)
  const [liveChatId, setLiveChatId] = useState("")
  const [liveChats, setLiveChats] = useState([])
  const [myMessage, setMyMessage] = useState("")


  const getLiveChatId = async () => {
    const data = await fetch("https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics,liveStreamingDetails&id=" + videoId + "&key=" + API_KEY)
    const json = await data.json()
    console.log("from glci", json.items[0]?.liveStreamingDetails?.activeLiveChatId)
    setLiveChatId(json.items[0]?.liveStreamingDetails?.activeLiveChatId)
  }

  const getLiveChats = async () => {
    console.log("lci in glc", liveChatId)
    const data = await fetch("https://youtube.googleapis.com/youtube/v3/liveChat/messages?liveChatId=" + liveChatId + "&part=snippet%2CauthorDetails&key=" + API_KEY)
    const json = await data.json()
    console.log("liveChats", json.items)

    setLiveChats(json.items)
    json.items.map((item, index) => {
      console.log("inside map")
      dispatch(
        addMessage({
          id: [item.id],
          name: [item?.authorDetails?.displayName],
          message: [item?.snippet?.displayMessage],
          img: [item?.authorDetails?.profileImageUrl],
          offset: [json.items.length]
        })
      )
    })
  }
  console.log("outside map")
  console.log(liveChatId)

  useEffect(() => {

    getLiveChatId()

  }, [])

  useEffect(() => {

    const i = setInterval(() => {
      getLiveChats()
      console.log("getting chat messages")
    }, 2000)


    return () => { clearInterval(i) }

  }, [liveChatId])


  return (
    <div className=' mr-4'>
      {/*   */}
      <div className=' w-full h-96 overflow-y-scroll flex flex-col-reverse p-2 border border-gray-400 rounded-t-xl'>
        {liveChats ? messages.map((message) => <LiveMessage key={message.id} id={message.id} name={message.name} message={message.message} img={message.img} />) : null}
      </div>
      <div className='border border-gray-400 rounded-b-xl p-2'>
        <form onSubmit={(e) => {
          e.preventDefault()
          dispatch(addMessage({
            img: [user_icon_1],
            name: "Raj",
            message: [myMessage]
          }))
          setMyMessage("")
        }} className=' '>
          <input type="text" className='w-3/4 border-b-2 text-base border-gray-400 outline-none'
            value={myMessage} onChange={(e) => { setMyMessage(e.target.value) }} 
            placeholder='Message'
            />

          <button className='m-1 p-1 text-xl bg-gray-300 rounded-xl'>send</button>
        </form>
      </div>
    </div>
  )
}

export default LiveChat
