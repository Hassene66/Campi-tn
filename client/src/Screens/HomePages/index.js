import React, { Fragment } from "react";
import CampingList from "./CampingList";
import HeroBox from "./HeroBox";
import Slideshow from "./SlideShow";
import Navbar from "../../Components/Navbar";
import Location from "./Location";

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
    </Fragment>
  );
};

export default HomePage;
