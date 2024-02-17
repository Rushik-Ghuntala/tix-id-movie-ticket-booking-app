// components/NewsPost.tsx
import React, { useState } from 'react';
import { newsData, NewsPostsData } from '../data-API/news-data';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const NewsPost: React.FC = () => {
  const [visiblePosts, setVisiblePosts] = useState<number>(3);
  const [selectedCategory, setSelectedCategory] = useState<string>('all'); // Default to show all categories
  const [searchText, setSearchText] = useState<string>('');
  const [list, setList] = useState<NewsPostsData[]>();

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    const l:NewsPostsData[] = newsData.filter((post) => post.title.toLowerCase().includes(searchText.toLowerCase()));
    if(event.target.value !== ''){
        setList(l);
    }
    else{
        setList([]);
    }
  };

  const sortNewsDataDescending = (data: NewsPostsData[]) => {
    return data.slice().sort((a, b) => {
      const dateA = new Date(a.dates);
      const dateB = new Date(b.dates);
      return dateB.getTime() - dateA.getTime();
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  const handleReadMore = () => {
    setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 3);
  };

  const renderSubSection = () => {
    const filteredData = sortNewsDataDescending(newsData).filter(post => post.category !== selectedCategory);
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
      <div className=' w-11/12 mx-auto flex flex-col gap-5 my-9'>
        <div className='text-4xl font-bold text-[--Shade-900]'>TIX ID News</div>
        <p className='text-sm font-normal'>Latest News about the world of cinema for you!</p>
        {/* FORM */}
        <form>
            <label htmlFor="search">Search:</label>
            <input type="text" id="search" name="search" value={searchText} onChange={handleSearchInputChange} />
            <div className="list-container">
                {
                    list?.map(item => (<div>{item.title}</div>))
                }
            </div>
            <label htmlFor="category">Select Category:</label>
            <select id="category" name="category" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="all">All</option>
                <option value="spotlight">Spotlight</option>
                <option value="news">News</option>
                <option value="video">Video</option>
            </select>
        </form>
        <div className='flex gap-5'>
          <p className='border w-32 h-[2.5rem] flex justify-center items-center rounded-3xl'>Spider Man</p>
          <p className='border w-32 h-[2.5rem] flex justify-center items-center rounded-3xl'>Gucci</p>
          <p className='border w-32 h-[2.5rem] flex justify-center items-center rounded-3xl'>Marvel</p>
          <p className='border w-32 h-[2.5rem] flex justify-center items-center rounded-3xl'>Peter Parker</p>
          <p className='border w-32 h-[2.5rem] flex justify-center items-center rounded-3xl'>Ghostbuster</p>
        </div>
      </div>
      {/* MAIN SECTION */}
      <div className='w-11/12 mx-auto'>
        {/* Render first 'visiblePosts' number of news data */}
        <div>
          {sortNewsDataDescending(newsData)
            .filter(post => {
                if (selectedCategory === 'all') {
                  return post.title.toLowerCase().includes(searchText.toLowerCase());
                } else {
                  return post.category === selectedCategory && post.title.toLowerCase().includes(searchText.toLowerCase());
                }
              })
            .slice(0, visiblePosts)
            .map((post,index) => (
                <div key={post.id} className='my-[4rem]'>
                {
                (index % 2 === 0) ? (<div>
                    <div className=' flex w-11/12 justify-between items-center mx-auto'>
                        <div className='flex justify-between'>
                            <div>
                                <Link to={`/news-post?id=${post.id}`}>
                                <img src={post.image} loading='lazy' alt={post.title}  className='w-[30rem] h-[20rem] rounded-xl'/>
                                </Link>
                            </div>
                        </div>
                        <div className='flex flex-col gap-y-5 w-[28rem] px-1'>
                            <div className='w-24 h-9 border flex justify-center items-center font-normal text-sm text-[--Shade-900] capitalize'>{post.category}</div>
                            <div className='font-medium w-11/12 text-2xl text-[--Shade-900]'>{post.title}</div>
                            <div>{post.description[0].substring(0, 100)}...</div>
                            <div>{formatDate(post.dates)} | TIX ID</div>
                        </div>
                    </div>
                </div>) 
                : (<div> 
                    <div className=' flex w-10/12 justify-between items-center mx-auto'>
                    <div className='flex flex-col gap-y-5 w-[28rem] px-1'>
                        <div className='w-24 h-9 border flex justify-center items-center font-normal text-sm text-[--Shade-900] capitalize'>{post.category}</div>
                        <div className='font-medium w-11/12 text-2xl text-[--Shade-900]'>{post.title}</div>
                        <div>{post.description[0].substring(0, 100)}...</div>
                        <div>{formatDate(post.dates)} | TIX ID</div>
                    </div>
                    <div className='flex justify-between'>
                        <div>
                          <Link to={`/news-post?id=${post.id}`}>
                            <img src={post.image} loading='lazy' alt={post.title}  className='w-[30rem] h-[20rem] rounded-xl'/>
                          </Link>
                        </div>
                    </div>
                    </div>
                </div>)
                }
              </div>
            ))}
        </div>
        {/* Button to load more news data */}
        {visiblePosts < newsData.length && (
          <div className='flex justify-center items-center my-[4rem]'>
            <button onClick={handleReadMore}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-md font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            ><span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Read More</span></button>
          </div>
        )}
      </div>
      {/* SUB SECTION */}
      <div className='w-[100vw] mt-[8rem] mb-[4rem]'>
        {selectedCategory !== 'all' && renderSubSection()}
      </div>

      {/* FOOTER  */}
      <Footer/>
    </div>
  );
};

export default NewsPost;
