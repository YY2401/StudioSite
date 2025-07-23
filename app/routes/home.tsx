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
          "/ProductSample_1.jpg",
          "/ProductSample_2.jpg",
          "/ProductSample_3.jpg",
          "/ProductSample_4.jpg",
        ]}
        controls={false}
      />

      <IndexIntro />
    </div>
  );
}
