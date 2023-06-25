import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/MenuSlice";
import { SEARCH_SUGGESTION_API_URL } from "../utils/Constanst";
import { addSuggestion } from '../utils/SuggestionSlice'
import SuggestionSlice from "../utils/SuggestionSlice";
import Store from "../utils/Store";
import { Link, useNavigate } from "react-router-dom";

import user_icon_1 from '../assets/images/user_icon_1.png'
import Rtube_logo from '../assets/images/Rtube_logo.png'
import Rtube_logo_small from '../assets/images/Rtube_logo_small.png'


const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestion, setSearchSuggestion] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false)
  const CacheSuggestion = useSelector((Store) => Store.Suggestion.suggestionCache)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light')
  const element = document.documentElement
  const [defaultChecked, setDefaultChecked] = useState(null)


  useEffect(() => {
    localStorage.setItem('theme', theme)
    const localTheme = localStorage.getItem('theme')
    document.querySelector('html').setAttribute('data-theme', localTheme)
    if (theme === 'light') {
      element.classList.remove('dark')
      setDefaultChecked(false)
    }
    else {
      element.classList.add('dark')
      setDefaultChecked(true)
    }
  }, [theme])

  const handleTheme = (e) => {
    if (e.target.checked) {
      setTheme('night')

    }
    else {
      setTheme('light')
    }

  }


  const handleClick = () => {
    dispatch(toggleMenu());
  };



  const getSuggestion = async () => {
    const data = await fetch(SEARCH_SUGGESTION_API_URL + searchQuery);
    const json = await data.json();

    setSearchSuggestion(json[1]);
    //searchQuery is a string can't be passed as  key directly
    dispatch(addSuggestion({ [searchQuery]: json[1] }))
  };

  useEffect(() => {
    //caching
    if (CacheSuggestion[searchQuery]) {
      //we can't write Object."string" but we can write Object["string"]
      setSearchSuggestion(CacheSuggestion[searchQuery])

    }

    //Debouncing
    /*
     *if there comes another api call
     *in the time interval of 200ms
     * the earlier one will be terminated on the go
     * and then the newer api call will be done
     */

    else {
      const timer = setTimeout(() => getSuggestion(), 200);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);




  return (
    <>
    {/*  grid  grid-flow-col   py-3 shadow-lg  sticky top-0 bg-white z-30 */}
      <div className="flex p-4 sticky top-0 bg-white dark:bg-slate-900 justify-between items-center shadow-md">

        {/* ham + logo */}
        <div className="flex items-center">
          <img className="h-6 m-2 " src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/2048px-Hamburger_icon.svg.png" onClick={handleClick} />
          <Link to={'/'}>
            <img
              className="hidden  w-28 sm:block sm:w-36"
              src={Rtube_logo}
              alt="Large logo"
            />
            <img
              className="w-9   sm:hidden "
              src={Rtube_logo_small}
              alt="small logo "
            />
          </Link>
        </div>

        {/* searchBar + button + suggestion list */}
        <div className="relative mx-1 w-1/2">

          {/* searchBar +button */}
          <form className="flex " onSubmit={(e) => {
            e.preventDefault()
            searchQuery ? navigate("result/" + searchQuery) : navigate('/')
            setShowSuggestion(false)
          }}>
            <input
              type="search"
              placeholder="Search"
              className="w-4/5  px-3 py-1  border-2 border-gray-400 rounded-l-2xl"
              onChange={(e) => {
                setSearchQuery(e.target.value);

              }}
              onFocus={() => setShowSuggestion(true)}
              onBlur={() => setShowSuggestion(false)}
              value={searchQuery}
            />
            <button className="bg-slate-600 h-9  w-20 rounded-r-2xl text-white">
              {window.innerWidth >= 400 ? 'search' : '🔍'}
            </button>
          </form>

          {/* suggestion List  */}
          {showSuggestion && Boolean(searchSuggestion.length) &&
            <ul className="  bg-white w-4/5 absolute rounded-2xl shadow-2xl py-3 dark:bg-black">
              {searchSuggestion.map((suggestion) => {
                return <li key={suggestion} onMouseDown={
                  () => {
                    setSearchQuery(suggestion)
                    navigate("result/" + suggestion)
                  }} className="pl-3 py-1 hover:bg-gray-300 dark: hover:text-black cursor-pointer">{suggestion}</li>
              })}
            </ul>
          }
        </div>


        {/* dark mode toggler */}
        <label className="swap swap-rotate ">

          {/* this hidden checkbox controls the state */}
          <input type="checkbox" onChange={handleTheme} defaultChecked={defaultChecked} />

          {/* sun icon */}
          <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

          {/* moon icon */}
          <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

        </label>

        {/* <input type="checkbox" onChange={handleTheme} defaultChecked={defaultChecked}></input> */}
        {/* user icon */}
        <img alt="profileImg" src={user_icon_1} className=" sm:relative sm:right-4 h-7 ml-1" />
      </div>
    </>
  );
};

export default Header;
