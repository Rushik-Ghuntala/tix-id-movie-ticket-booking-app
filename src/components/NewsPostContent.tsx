// import React from 'react'

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// import { NewsPostsData, newsData } from "../data-API/news-data";
import { FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { showNewsData } from "../redux/Thunk/NewsThunk";
import { NewsData } from "../data";


const NewsContent = () => {

  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(showNewsData() as any)
  },[])

  const {newsData, loading} = useSelector((state: {news: {newsData: NewsData[], loading: boolean}}) => state.news)

  // console.log("NewsData form Thunk: " , newsData)

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('en-GB', options);
    };

    const [searchParams] = useSearchParams();
    const [data, setData] = useState<NewsData>();

    const getId = () => {
        const id = searchParams.get("id");
        if(id) {
          const d = newsData.filter( data => data.id === +id)
          console.log(d[0]);
          setData(d[0]);
        }
    }

    useEffect(() => {
        window.scrollTo(0,0)
        getId();
    }, [])


    const renderSubSection = () => {
      const filteredData = newsData.filter(post => post.category !== data?.category);
      return (
        <div className='flex overflow-scroll scroll_none w-[100vw]'>
          {/* <h2>Other Categories</h2> */}
          {filteredData.map(post => (
            <div key={post.id} className='min-w-[420px] mx-7 '>
              <div>
                  <div className='flex justify-between'>
                      <div className='mb-[2.5rem]'>
                          <img src={post.image} loading='lazy' alt={post.title}  className='w-[420px] h-[240px] rounded-xl'/>
                      </div>
                  </div>
                  <div className='flex flex-col gap-y-5 w-11/12 px-1'>
                  <div className='w-20 h-8 border flex justify-center items-center font-normal text-sm text-[--Shade-900] capitalize'>{post.category}</div>
                  <div className='font-medium w-11/12 text-2xl text-[--Shade-900]'>{post.title}</div>
                  {/* <div>{post.description.substring(0, 100)}</div> */}
                  <div>{formatDate(post.dates)} | TIX ID</div>
                  </div>
              </div>
            </div>
          ))}
        </div>
      );
    };



  return (
    <div>

      <div className="w-8/12 mx-auto mt-[7rem] my-10 flex flex-col gap-y-12">
        <div >
          <div className="flex flex-col gap-y-5 my-10">
            <div className="font-bold text-5xl text-[--Shade-900]">{data?.title}</div>
            <div className="font-normal text-xl text-[--Shade-600]">{formatDate(data?.dates || "")} | TIX ID</div>
          </div>
  
          {
            data?.category !== 'video' ? (<div>
              <div className="flex flex-col gap-y-10">
                <div><img src= {data?.image} alt='image' className="w-full rounded-xl" /></div>
                <div className="">
                  {
                    data?.description.map((item, index) => <div key={index} className="my-5 text-lg font-normal text-justify text-[--Shade-900]">{item}</div>)
                  }
                </div>
              </div>
            </div>) 
            : 
            (<div>
              {/* <iframe src={data?.source} width={500} height={300} /> */}
              <iframe className="w-full h-[35rem] rounded-xl"  src="https://www.youtube.com/embed/JfVOs4VSpmA?si=XTOZIIQpnYZMHzMJ" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
              <div className="flex items-center gap-x-4 mt-12">
                <div className="font-bold text-2xl my-4">Source: </div>
                <div className="font-medium text-2xl my-4">{data?.source}</div>
              </div>
            </div>) 
          }
        </div>

        <div className="flex flex-col gap-y-5">
          <div className="text-2xl font-medium text-[--Shade-900]">Share this article</div>
          <div className='flex gap-5'>
            <div><FaInstagram size={25}/></div>
            <div><FaTwitter size={25}/></div>
            <div><FaFacebookSquare size={25}/></div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <div className="w-20 h-8 border border-[--Shade-800] rounded-3xl flex items-center justify-center">
            <div className="flex items-center gap-x-1">
              <div><FcLikePlaceholder size={20}/></div>
              <div className="font-normal text-xl">500</div>
            </div>
          </div>
        </div>
      
      </div>

        <div>
          <div className="w-full font-bold text-4xl flex items-center justify-center">See Other Articles</div>

          <div className='w-[100vw] mt-[8rem] mb-[4rem]'>
            {data?.category !== 'all' && renderSubSection()}
          </div>
        </div>
        
    </div>
  )
}

export default NewsContent