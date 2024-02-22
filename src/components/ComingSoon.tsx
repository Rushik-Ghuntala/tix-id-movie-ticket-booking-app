// import React from 'react'
import { Link } from "react-router-dom";
// import { comingSoonMovies } from "../data-API/coming-soon-movies";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { showComingSoonMovie } from "../redux/Thunk/ComingSoonMovie";
import { ComingSoonMovies } from "../data";

const ComingSoon = () => {

    const login = useSelector((state: any) => state.login)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(showComingSoonMovie() as any)
    },[])

    const {comingSoonMovieData, loading} = useSelector((state: {comingSoonMovie: {comingSoonMovieData: ComingSoonMovies[], loading: boolean, error: string}}) => state.comingSoonMovie)

    // console.log("NewsData form Thunk: " , newsData)


  return (
    <div className='mx-auto mt-[3rem] mb-[2rem]'>
        <div>
            {/* Upper section  */}
            <div className='w-11/12 mx-auto flex justify-between items-start mb-[2rem]'>
                <div className="flex flex-col gap-2">
                    <div className='text-2xl font-medium text-[--Shade-900]'>Coming Soon</div>
                    <div className='font-normal text-sm leading-3 text-[--Shade-600]'>Wait for its arrival at your favorite cinema!</div>
                </div>
                <div className='text-2xl font-medium text-[--Sky-Blue]'>
                {
                        // login.isLoggedIn && 
                        login.isLoggedIn ?  <Link to={'/coming-soon'}>View All</Link> : <div className="cursor-pointer" onClick={() => toast.error("Please Login!")}>View All</div>
                        // <Link to={'/news'}>
                        //     View All
                        // </Link>
                    }
                </div>
            </div>

            {/* Main section  */}
            <div className='flex  overflow-scroll scroll_none'>
                {   
                    comingSoonMovieData.map( (comingSoonMovie) => (
                        <div key={comingSoonMovie.id} className='min-w-[420px] mx-7 '>
                            <div className='flex justify-between'>
                                <div className='mb-[2.5rem]'>
                                    <img src={comingSoonMovie.image} loading='lazy' className='w-[360px] h-[519px] rounded-xl'/>
                                </div>
                            </div>
                            <div className='flex flex-col gap-y-5 w-10/12 px-1'>
                                
                                <div className='font-bold text-2xl text-[--Shade-900]'>
                                    <p>{comingSoonMovie.title}</p>
                                </div>
                                <div className='flex gap-x-5'>
                                    <div className='w-9 h-7 rounded flex items-center justify-center bg-[--XXI-Gradient1] text-[--White] font-bold text-xs'>XXI</div>
                                    <div className='w-10 h-7 rounded flex items-center justify-center bg-[--CGV-Red] text-[--White] font-bold text-xs'>CGV</div>
                                    <div className='w-20 h-7 rounded flex items-center justify-center bg-[--Cenepolis-Blue] text-[--White] font-bold text-xs'>Cinépolis</div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default ComingSoon