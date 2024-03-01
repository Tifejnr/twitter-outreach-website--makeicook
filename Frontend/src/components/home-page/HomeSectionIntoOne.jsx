"use client";

import NavBarHomePage from "./sections/nav-bar/NavBarHomePage";
import BodyHomePage from "./sections/body/BodyHomePage";
import Slogan from "./sections/slogan/Slogan";
import Footer from "./sections/footer/Footer";
import JssAlert from "./sections/Jss-alert/JssAlert";

export default function HomeSectionIntoOne() {
  return (
    <>
      <NavBarHomePage />
      <BodyHomePage />
      <JssAlert />
      <Slogan />
      <Footer />
    </>
  );
}
