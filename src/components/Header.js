import React from 'react'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRef } from 'react';
import {LOGO} from "../utils/constants" 
import {  onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux'
import { changeLanguage } from "../utils/configSlice";
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { addUser, removeUser } from '../utils/userSlice'
import { toggleGptSearchView } from '../utils/gptSlice';
function Header() {
  const searchText = useRef(null);
  const dispatch=useDispatch();
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  const user=useSelector(store=>store.user)
  const navigate=useNavigate();
  const signout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };
  useEffect(()=>{
    const unsubscribe =onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid,email,displayName,photoUrl} = user.uid;
        dispatch(addUser({
          uid:uid,
          email:email,
          displayName:displayName,
          photoUrl:photoUrl
         
        }))
    navigate("/browse")
        // ...
      } else {
        // User is signed out
        dispatch(removeUser)
        navigate("/")
        // ...
      }
    });
    //unsubscribe when component unbounds
    return ()=>{
      unsubscribe();
    }
  },[])
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleGptSearch=()=>{
dispatch(toggleGptSearchView())
  }
  
  return (
    <div className=' w-screen absolute px-8 py-1 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img  className="w-44"src={LOGO} alt="logo"></img>
      {user && (<div className='flex p-2'>
        {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
      <button className='py-2 px-4 mx-4 mt-2 bg-purple-800 text-white rounded-lg ' onClick={handleGptSearch}>{!showGptSearch?"Gpt Search":"HomePage"}</button>
        <img
            className="hidden md:block w-12 h-12"
            alt="usericon"
            src={user?.photoURL}></img>
      <button  onClick={signout}  className='font-bold text-white'>(SignOut)</button>
      </div>)
      }
    </div>
  )
}

export default Header
