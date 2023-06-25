import React from 'react'
import { Link } from 'react-router-dom'
const Replies = ({ authorChannelId, authorChannelUrl, authorDisplayName, authorProfileImageUrl, likeCount, publishedAt, textOriginal }) => {

  // console.log("reply",props)
  return (
    <>
      <div className='flex p-4 pl-16 '>
        <div className='w-14 h-14'>
          <Link to={"/channel/" + authorChannelId.value}>
            {/* mx-3 */}
            <img alt='Pic' src={authorProfileImageUrl} className='rounded-full  h-10' />
          </Link>
        </div>

        <div>
          <h1 className='text-sm font-semibold'>{authorDisplayName}</h1>
          <h1 className='text-sm whitespace-pre-wrap'>{textOriginal}</h1>
        </div>

      </div>
      <h1 className='pl-32 mx-3'>{likeCount} 👍🏻  👎🏻</h1>
    </>
  )
}

export default Replies
