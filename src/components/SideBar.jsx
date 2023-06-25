import React from 'react'
import { useSelector } from 'react-redux'

const SideBar = () => {

  const isOpen = useSelector(Store => Store.Menu.isMenuOpen)

  return (
    <>
      {
        !isOpen ?

          null :
          <div className=''>
            <ul className="ml-2 shadow-lg   w-80 h-full  fixed  bg-white dark:bg-slate-900 text-black dark:text-white  overflow-scroll text-lg font-semibold ">
              <li className="py-1 px-3 hover:bg-gray-200 dark:hover:text-black hover:cursor-pointer">Home </li>
              <li className="py-1 px-3 hover:bg-gray-200 dark:hover:text-black hover:cursor-pointer">Shorts </li>
              <li className="py-1 px-3 hover:bg-gray-200 dark:hover:text-black hover:cursor-pointer">Subscribe </li>

              <hr className="my-2 w-4/5 mx-auto h-0.5 bg-gray-300" />

              <li className="py-1 px-3 hover:bg-gray-200 dark:hover:text-black hover:cursor-pointer">Live </li>
              <li className="py-1 px-3 hover:bg-gray-200 dark:hover:text-black hover:cursor-pointer">Code </li>
              <li className="py-1 px-3 hover:bg-gray-200 dark:hover:text-black hover:cursor-pointer">Movies</li>
              <li className="py-1 px-3 hover:bg-gray-200 dark:hover:text-black hover:cursor-pointer">Music</li>
              <hr className="my-2 w-4/5 mx-auto h-0.5 bg-gray-300" />

              <li className="py-1 px-3 hover:bg-gray-200 dark:hover:text-black hover:cursor-pointer">Gaming</li>
              <li className="py-1 px-3 hover:bg-gray-200 dark:hover:text-black hover:cursor-pointer">News</li>
              <li className="py-1 px-3 hover:bg-gray-200 dark:hover:text-black hover:cursor-pointer">Sports </li>
              <li className="py-1 px-3 hover:bg-gray-200 dark:hover:text-black hover:cursor-pointer">Fashion & Beauty</li>
              <li className="py-1 px-3 hover:bg-gray-200 dark:hover:text-black hover:cursor-pointer">Cooking</li>
              <hr className="my-2 w-4/5 mx-auto h-0.5 bg-gray-300" />

              <li className="py-1 px-3 hover:bg-gray-200 dark:hover:text-black hover:cursor-pointer">Tending</li>
              <li className="py-1 px-3 hover:bg-gray-200 dark:hover:text-black hover:cursor-pointer">Suprprise Me</li>
              <li className="py-1 px-3 hover:bg-gray-200 dark:hover:text-black hover:cursor-pointer">Favourite</li>

              <hr className="my-2 w-4/5 mx-auto h-0.5 bg-gray-300" />

              <li className="py-1 px-3 hover:bg-gray-200 dark:hover:text-black hover:cursor-pointer">History</li>
              <li className="py-1 px-3 hover:bg-gray-200 dark:hover:text-black hover:cursor-pointer">Settings</li>
            </ul>

          </div>

      }
    </>
  )

}

export default SideBar
