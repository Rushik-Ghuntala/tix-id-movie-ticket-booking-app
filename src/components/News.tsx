// import React from 'react'
import { Link } from 'react-router-dom'
// import { newsData } from '../data-API/news-data'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { showNewsData } from '../redux/Thunk/NewsThunk'
import { NewsData } from '../data'

const News = () => {

    const login = useSelector((state: any) => state.login)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(showNewsData() as any)
    },[])

    const {newsData, loading} = useSelector((state: {news: {newsData: NewsData[], loading: boolean}}) => state.news)

    console.log("NewsData form Thunk: " , newsData)


  return (
    <div className='mx-auto mb-[2rem]'>
        <div>
            {/* Upper section  */}
            <div className='w-11/12 mx-auto flex justify-between items-start mb-[2rem]'>
                <div className="flex flex-col gap-2">
                    <div className='text-2xl font-medium text-[--Shade-900]'>TIX ID News</div>
                    <p className='font-normal text-sm leading-3 text-[--Shade-600]'>Latest news about the film world for you!</p>
                </div>
                <div className='text-2xl font-medium text-[--Sky-Blue]'>
                    {
                        // login.isLoggedIn && 
                        login.isLoggedIn ?  <Link to={'/news'}>View All</Link> : <div className="cursor-pointer" onClick={() => toast.error("Please Login!")}>View All</div>
                        // <Link to={'/news'}>
                        //     View All
                        // </Link>
                    }
                </div>
            </div>

            {/* Main section  */}
            <div className='flex  overflow-scroll scroll_none'>
                {   
                    newsData.map((news: NewsData) => (
                        <div key={news.id} className='min-w-[420px] mx-7 '>
                            <div className='flex justify-between'>
                                <div className='mb-[2.5rem]'>
                                    <img src={news.image} loading='lazy' className='w-[420px] h-[240px] rounded-xl'/>
                                </div>
                            </div>
                            <div className='flex flex-col gap-y-5 w-11/12 px-1'>
                                <div className='w-20 h-8 border flex justify-center items-center font-normal text-sm text-[--Shade-900]'>
                                    <p>{news.category}</p>
                                </div>
                                <div className='font-medium w-11/12 text-2xl text-[--Shade-900]'>
                                    <p>{news.title}</p>
                                </div>
                                <div>
                                    <p>{news.dates} | TIX ID</p>
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

export default News