import React, { useEffect } from 'react'
import Header from './Header'
import { API_OPTIONS } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addNowPlayingMovies } from '../utils/movieSlice'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer'
import useTopRatedMovies from "../hooks/useTopRatedMovies"
import SecondaryContainer from './SecondaryContainer'
import usePopularMovies from '../hooks/usePopularMovies'
import useUpComingMovies from '../hooks/useUpcomingMovies'
import GptSearch from './GptSearch'
const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
 useUpComingMovies();
 const shoowGptSearch=useSelector(store=>store.gpt.showGptSearch)
  return (
    <div>
   <Header></Header>
   {shoowGptSearch?<GptSearch></GptSearch>:<>  <MainContainer ></MainContainer>
    <SecondaryContainer></SecondaryContainer></>}
   
 
    </div>
  )
}

export default Browse
