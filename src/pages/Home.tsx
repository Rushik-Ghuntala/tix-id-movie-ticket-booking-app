// import React from 'react'
import Navbar from "../components/Navbar/Navbar";
import Movies from "../components/Movies/index";
import Advertisment from "../components/Advertisment/Advertisment";
import News from "../components/News/News";
import ComingSoon from "../components/ComingSoon/ComingSoon";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Movies />
      <Advertisment />
      <News />
      <ComingSoon />
      <Footer />
    </div>
  );
};

export default Home;
