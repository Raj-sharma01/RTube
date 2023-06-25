import React from 'react'
import Replies from './Replies'
import { Link } from 'react-router-dom'
import user_icon_1 from '../assets/images/user_icon_1.png'
//here comments are replies to the comment
const CommentsSection = ({ topLevelComment, totalReplyCount, comments }) => {

  const { authorChannelId, authorChannelUrl, authorDisplayName, authorProfileImageUrl, textOriginal, likeCount, publishedAt } = topLevelComment.snippet
  console.log("author channel id", authorChannelId)
  return (
    <>
      <div className='w-full  sm:w-full '>
        <div className='flex p-4'>

          <div>
            <Link to={"/channel/" + authorChannelId.value}>
              <img alt='icon' src={authorProfileImageUrl} className='rounded-full  h-10 w-10 ' /></Link>
          </div>
          <div className='ml-4 max-w-max'>
            <h1 className='text-sm font-semibold'>{authorDisplayName}</h1>
            <h1 className='text-sm whitespace-pre-wrap overflow-ellipsis break-all'>{textOriginal}</h1>
          </div>
        </div>
        <h1 className=' pl-20'>{likeCount} 👍🏻  👎🏻</h1>
        {totalReplyCount ? comments.map((reply) => <Replies key={reply.id} {...reply.snippet} />) : null}
      </div>
    </>

  )
}

export default CommentsSection

