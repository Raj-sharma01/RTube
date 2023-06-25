import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_KEY } from '../utils/Constanst'
import SearchResultCard from './SearchResultCard'

const SearchResult = () => {
    const [SearchResults,setSearchResults]=useState([])
    const { searchQuery } = useParams()
    
    const getSearchResult=async()=>{
       const data=await fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q="+searchQuery+"&key="+API_KEY)
       console.log("fetched data",searchQuery,data)
       const json=await data.json()
       setSearchResults(json.items)
       console.log("fetched",searchQuery,json.items)
    }

   useEffect(()=>{
    getSearchResult()
   },[searchQuery])

   


  return (
    // w-full overflow-y-auto
    <div className='mx-3'>
 
      {SearchResults.map((result,index)=>{return <SearchResultCard key={index} {...{...result.id,...result.snippet}}/>})}
      
    </div>
  )
}

export default SearchResult
