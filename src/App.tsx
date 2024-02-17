// import React from 'react'

import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import ComingSoonPage from "./pages/ComingSoonPage"
import NewsPage from "./pages/NewsPage"
import AccountPage from "./pages/AccountPage"
import NewsPostPage from "./pages/NewsPostPage"
import MovieSchedulePage from "./pages/MovieSchedulePage"
import { useSelector } from "react-redux"


const App = () => {

  const login = useSelector((state:any) => state.login);



  return (
    <div className="bg-white">
      {/* <Navbar/>


      <Movies/> */}

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/movie-schedule' element={<MovieSchedulePage/>} />
        <Route path="/login" element={ !login.isLoggedIn ? <LoginPage/> : (<AccountPage />)} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/coming-soon" element={<ComingSoonPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news-post" element={<NewsPostPage />} />
        {/* <Route path="/news/:spotlight" element={} />
        <Route path="/news/:news" element={} />
        <Route path="/news/:video" element={} /> */}
      </Routes>
    </div>
  )
}

export default App