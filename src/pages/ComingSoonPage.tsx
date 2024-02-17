// import React from 'react'
import { useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { comingSoonMovies } from '../data-API/coming-soon-movies'

const ComingSoonPage = () => {

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])


  return (
    <div>
        <Navbar/>
        <div className='mx-auto mt-[3rem] mb-[2rem]'>
        <div>

            {/* Main section  */}
            <div className='w-[100%] mx-[2rem] flex  flex-wrap gap-y-7 '>
                {   
                    comingSoonMovies.map( (comingSoonMovie) => (
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
        <Footer/>
    </div>
  )
}

export default ComingSoonPage