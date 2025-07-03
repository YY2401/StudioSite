import React, { useState } from "react";
import NavBar from "../components/Navbar";
import Carousel from "~/components/Carousel";
import IndexIntro from "~/components/IndexIntro";
import Store from "~/components/Store";
import { CartProvider } from "~/components/CartContext";
export default function Home() {
  return (
    <div>
      <NavBar />
      <Carousel
        sources={[
          "/CarouselTest_1.mp4",
          "/CarouselTest_2.mp4",
          "/CarouselTest_3.mp4",
          "/CarouselTest_4.mp4",
        ]}
        controls={false}
      />
      
      <IndexIntro />
    </div>
  );
}
