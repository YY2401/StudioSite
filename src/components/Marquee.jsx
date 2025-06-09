import React, { useEffect, useRef, useState } from "react";

function ImageSlider() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const images = [
    "testMov.mp4",
    "testMov_2.mp4",
    "testMov_3.mp4"
  ];
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        setIsSliding(false);
      }, 500); 
    }, 7000); 
    return () => clearInterval(interval);
  }, [images.length]);

  const nextIdx = currentImage === images.length - 1 ? 0 : currentImage + 1;
  const currentSrc = images[currentImage];
  const nextSrc = images[nextIdx];
  const isVideo = currentSrc.endsWith("mp4");
  const nextIsVideo = nextSrc.endsWith("mp4");

  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        overflow: "hidden",
        position: "relative"
      }}
      ref={sliderRef}
    >
      <div
        style={{
          display: "flex",
          width: "200%",
          transition: "transform 0.5s",
          transform: isSliding ? "translateX(-50%)" : "translateX(0%)"
        }}
      >
        <div style={{ width: "100%" }}>
          {isVideo ? (
            <video src={currentSrc} controls autoPlay loop style={{ width: "100%", height: "auto", objectFit: "cover" }} />
          ) : (
            <img src={currentSrc} alt="slider" style={{ width: "100%", height: "auto", objectFit: "cover" }} />
          )}
        </div>
        <div style={{ width: "100%" }}>
          {nextIsVideo ? (
            <video src={nextSrc} controls autoPlay loop style={{ width: "100%", height: "auto", objectFit: "cover" }} />
          ) : (
            <img src={nextSrc} alt="slider" style={{ width: "100%", height: "auto", objectFit: "cover" }} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <>
      <ImageSlider />
    </>
  );
}