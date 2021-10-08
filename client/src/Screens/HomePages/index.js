import React, { Fragment } from "react";
import CampingList from "./CampingList";
import HeroBox from "./HeroBox";
import Slideshow from "./SlideShow";
import Navbar from "../../Components/Navbar";

const HomePage = () => {
  return (
    <Fragment>
      <header>
        <Navbar className="menu" />
        <HeroBox />
      </header>
      <CampingList />
      <Slideshow />
    </Fragment>
  );
};

export default HomePage;
