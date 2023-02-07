import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const MovieList = (props) => {
    const FavouriteComponent=props.favouriteComponent
    return (
    <div className='container'>
    <Swiper
      spaceBetween={50}
      slidesPerView={5}
      className='all-movie-list'
    >
  
        {
             props.movies.map((movie,i)=>(
                <SwiperSlide className='slider-box'> 
                <div className='image-box'>
                <img src={movie.Poster} alt='movie'></img>
				

                <div onClick={() => props.handleFavouriteMovie(movie)} className='favorite'>
                   <FavouriteComponent/>
                </div>
				
                </div>
                
                

                
                 <div className='movie-name' >
                      <h4>{movie.Title}</h4>
                 </div>
                </SwiperSlide>
                ))
            }   
    
      
    </Swiper>
     </div>

   
  )
}
export default MovieList


