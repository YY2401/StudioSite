import React, { useState } from "react";
import NavBar from "../components/Navbar";
import Carousel from "~/components/Carousel";
import IndexIntro from "~/components/IndexIntro";
export default function Home() {
  return (
    <div>
      <NavBar />
      <Carousel
        sources={[
          "/Product_1.mp4",
          "/Product_2.mp4",
          "/Product_3.mp4",
          "/Product_4.mp4",
        ]}
        controls={false}
      />

      <IndexIntro />
    </div>
  );
}
