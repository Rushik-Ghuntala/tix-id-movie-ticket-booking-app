// import React from 'react'
import { movies } from '../data-API/movies-data'

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';


import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const Movies = () => {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
    };

    const slider = useRef<Slider>(null); // Specify Slider type here



  return (
        <div className='w-11/12 mx-auto flex items-center mt-[4rem] mb-[2rem]'>
        <button 
            onClick={() => slider?.current?.slickPrev()}
            className='w-[72px] h-[72px] z-10 flex justify-center items-center rounded-full border bg-white drop-shadow-2xl'
            
        >
            <AiOutlineLeft/>
        </button>
        <div className='w-[85%] mx-auto flex flex-col'>
        
            <Slider ref={slider} {...settings}>
            
            {
                movies.map( (movie) => (
                    <div key={movie.id}  className='flex'>
                    <div className='w-[500px] h-[851px] mx-auto flex flex-col justify-between items-center'>
                        <div className='w-[500px] h-[707px]'>
                            <Link to={`/movie-schedule?id=${movie.id}`}>
                            <img src={movie.image} className='w-[500px] h-[707px] rounded-2xl bg-cover'/>
                            </Link>
                        </div>
                        <div className='w-[500px] h-[97px] flex flex-col justify-between items-center'>
                            <div className='font-bold text-4xl text-[--Shade-900]'>
                                <p>{movie.name}</p>
                            </div>
                            <div className='flex gap-x-5'>
                                <div className='w-9 h-7 rounded flex items-center justify-center bg-[--XXI-Gradient1] text-[--White] font-bold text-xs'>XXI</div>
                                <div className='w-10 h-7 rounded flex items-center justify-center bg-[--CGV-Red] text-[--White] font-bold text-xs'>CGV</div>
                                <div className='w-20 h-7 rounded flex items-center justify-center bg-[--Cenepolis-Blue] text-[--White] font-bold text-xs'>Cinépolis</div>
                            </div>
                        </div>
                    </div>
                    </div>
                ))
            }
            
            </Slider>
            
        </div>
        <button 
            onClick={() => slider?.current?.slickNext()}
            className='w-[72px] h-[72px] z-10 flex justify-center items-center rounded-full border bg-white drop-shadow-2xl'
        >
            <AiOutlineRight/>
        </button>
      
    </div>
  )
}

export default Movies