import React, { useEffect, useRef, useState } from "react";

function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const [sliding, setSliding] = useState(false);
  const images = ["testMov.mp4", "testMov_2.mp4", "testMov_3.mp4"];
  const nextIdx = (current + 1) % images.length;
  const sliderRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setSliding(true), 7000);
    return () => clearInterval(id);
  }, [current]);

  const onTransitionEnd = () => {
    if (sliding) {
      setSliding(false);
      setCurrent(nextIdx);
    }
  };

  const prevSlide = () => {
    const prevIdx = (current - 1 + images.length) % images.length;
    setCurrent(prevIdx);
  };

  const nextSlide = () => {
    setSliding(true);
  };

  const goToSlide = (idx) => {
    setSliding(false);
    setCurrent(idx);
  };

  const getSlideStyle = () => ({
    display: "flex",
    width: "200%",
    transform: sliding
      ? "translate3d(-50%,0,0)"
      : "translate3d(0,0,0)",
    transition: sliding ? "transform .5s ease-in-out" : "none",
    willChange: "transform",
  });

  return (
    <div
      ref={sliderRef}
      style={{
        position: "relative",  
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* 左箭頭 */}
      <button
        onClick={prevSlide}
        style={{
          position: "absolute",
          top: "50%",
          left: "16px",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          border: "none",
          padding: "8px",
          borderRadius: "50%",
          color: "#fff",
          fontSize: "20px",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        &#9664;
      </button>

      {/* 輪播內容 */}
      <div style={getSlideStyle()} onTransitionEnd={onTransitionEnd}>
        {[current, nextIdx].map((idx, slot) => (
          <div
            key={slot}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {images[idx].endsWith(".mp4") ? (
              <video
                src={images[idx]}
                preload="auto"
                muted
                autoPlay
                loop
                style={{
                  width: "80%",
                  maxWidth: "1200px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <img
                src={images[idx]}
                alt={`slide-${idx}`}
                style={{
                  width: "80%",
                  maxWidth: "1200px",
                  objectFit: "cover",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* 右箭頭 */}
      <button
        onClick={nextSlide}
        style={{
          position: "absolute",
          top: "50%",
          right: "16px",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          border: "none",
          padding: "8px",
          borderRadius: "50%",
          color: "#fff",
          fontSize: "20px",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        &#9654;
      </button>

      {/* 分頁圓點*/}
      <div
        style={{
          position: "absolute",
          bottom: "16px",               
          left: "50%",                  
          transform: "translateX(-50%)",
          display: "flex",
          zIndex: 10,
        }}
      >
        {images.map((_, idx) => (
          <div
            key={idx}
            onClick={() => goToSlide(idx)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#ddd",
              margin: "0 6px",
              cursor: "pointer",
              opacity:idx === current?"1":".3"
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return <ImageSlider />;
}
