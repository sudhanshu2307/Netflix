import React, { useState ,useRef} from 'react'
import Header from './Header'

import { validate } from '../utils/validate';
import { auth } from '../utils/firebase';
import {  updateProfile } from "firebase/auth";
import { addUser } from '../utils/userSlice';
import {  createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { USER_AVATAR } from '../utils/constants';
import { BG_URL } from '../utils/constants';
export default function Login() {
  const dispatch=useDispatch();
  const [isSignin,setSignin]=useState(true);
  const [errorMsg,setErrorMsg]=useState(null);
 
  const email=useRef(null);
  const password=useRef(null);
  const username=useRef(null);
  const onclicks=()=>{
const message=validate(email.current.value,password.current.value)
setErrorMsg(message);

if(message){
  return;
}
if(isSignin){
  signInWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
   
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMsg(errorCode+"-"+errorMessage)
  });


  //signin logic
}
else{
  //signup logc
  createUserWithEmailAndPassword(auth,email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: username.current.value, photoURL: USER_AVATAR
    }).then(() => {
      // Profile updated!
      const {uid,email,displayName,photoUrl}=auth.currentUser;
      dispatch(addUser({
        uid:uid,
        email:email,
        displayName:displayName,
        photoUrl:photoUrl
       
      }))
    
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
      setErrorMsg(error.message);
    });
  

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMsg(errorCode+"-"+errorMessage);
    // ..
  });

}

//signin signup
  }
 
  const setToggleClick=()=>{
    setSignin(!isSignin)
  }
  return (
    <div>
  <Header></Header>
  <div className='absolute'><img src="https://assets.nflxext.com/ffe/siteui/vlv3/20bf1f4d-1c73-48fd-8689-310d6dd80efc/81bdc063-cb8f-4afe-8a02-a3131ca4ef5e/IN-en-20240812-POP_SIGNUP_TWO_WEEKS-perspective_WEB_7998f3b6-63e3-424a-8328-550cf777ddce_large.jpg "alt="bg"></img></div>
   
   <form  onSubmit={(e) => e.preventDefault()} className='absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white bg-opacity-80' > 
   <h1 className='font-bold text-3xl py-4'>{isSignin?"Sign in":"Sign up"}</h1>
   {!isSignin && (<input  ref ={username} type="text" placeholder='Full Name' className='w-full p-4 my-4 bg-gray-800 rounded-lg'></input>)}
    <input  ref ={email} type="text" placeholder='Email Address' className='w-full p-4 my-4 bg-gray-800 rounded-lg'></input>
    <input ref={password} type="text" placeholder='password' className=' w-full p-4 my-4 bg-gray-800 rounded-lg'></input>
   <p className='p-2 text-red-500 '>{errorMsg}</p>
<button onClick={onclicks} className='p-4  bg-red-600  w-full my-6'>{isSignin?"Sign in":"Sign up"} </button>
<p className=' font-bold text-lg py-2 cursor-pointer' onClick={setToggleClick}>{isSignin?"New to Netflix? Signup now":"Already a user?Sign in now"}</p>
   </form>
    </div>
  )
}
