import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { openMenu } from '../utils/MenuSlice'
import { YOUTUBE_API_URL } from '../utils/Constanst'
import VideoCard from './VideoCard'
import { Link } from 'react-router-dom'
import ButtonCarousel from './ButtonCarousel'

const MainContent = () => {

  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(openMenu())
  // }, [])

  const [videos, setVideos] = useState([]);

  async function getData() {
    const data = await fetch(YOUTUBE_API_URL)
    const json = await data.json()
    // console.log("json",json)
    setVideos(json.items)
  }
  useEffect(() => {
    getData()
  }, [])

  return (
// border border-red-400 w-full text-center
<>
    <div className='shadow-lg p-3  w-full '>
      
      <div className='flex justify-center'>
      <ButtonCarousel/>
      </div>
      <div className='flex flex-wrap justify-center '>

        {/*the key is passed to Link and not to the VideoCard 
        *b/c each card is wraped with link
        *so the  MainContainer has many Links as children nodes (require key to distinguish)
        *but each Link has only one VideoCard (don't require key to distinguish)
       */}

        {videos.map((video) => <Link to={"/watch/v/" + video?.id} key={video?.id}><VideoCard  {...video} /></Link>)}

      </div>
    </div>
    </>

  )
}

export default MainContent

