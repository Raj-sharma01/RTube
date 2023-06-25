import React from 'react'
import Catagories from '../assets/CatagoryList'
import { Link } from 'react-router-dom'

const ButtonCarousel = () => {
    return (
        <div className='carousel carousel-center w-3/4 p-4 space-x-4  rounded-box ' >
            {
                Catagories.map((Catagory, index) => {
                    return (
                       <div  className="carousel-item" key={index}>
                           <Link to={'/result/'+Catagory}><button className=' bg-slate-600 p-1 rounded-lg text-slate-100'>{Catagory}</button></Link> 
                        </div>
                    )
                })
            }
        </div>


    )
}

export default ButtonCarousel
