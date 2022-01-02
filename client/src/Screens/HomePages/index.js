import React, { Fragment } from "react";
import CampingList from "./CampingList";
import HeroBox from "./HeroBox";
import Slideshow from "./SlideShow";
import Navbar from "../../Components/Navbar";
import Location from "./Location";
import Publication from "./fileUpload";

const HomePage = () => {
  return (
    <Fragment>
      <header>
        <Navbar className="menu" />
        <HeroBox />
      </header>
      <CampingList />
      <Slideshow />
      <Location />
      <Publication />
    </Fragment>
  );
};

export default HomePage;
