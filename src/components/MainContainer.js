import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'

const MainContainer = () => {
    const movies=useSelector(Store=>Store.movies?.nowPlayingMovies)
    if(movies===null){
        return;
    }
    const mainMovies=movies[0];
    const {original_title,overview,id}=mainMovies
  return (
    <div className="pt-[30%] bg-black md:pt-0">
      <VideoTitle title={original_title} overview={overview}>

      </VideoTitle>
      <VideoBackground movieId={id}></VideoBackground>
    </div>
  )
}

export default MainContainer
