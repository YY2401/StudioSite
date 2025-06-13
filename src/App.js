// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Settings from "./components/Settings";
import FeatureSection from "./components/FeatureSection";
import Contact from "./components/Contact"; 
import Home from "./components/Home.jsx"

function App() {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [themeColor, setThemeColor] = useState("#ffffff");
  const [logoUrl, setLogoUrl] = useState(null);
  const [menuConfig, setMenuConfig] = useState([
    { label: "首頁", url: "/", children: [] },
    { label: "最新消息", url: "/", children: [] },
    { label: "遊戲", url: "/", children: [] },
    { label: "商店", url: "/store", children: [] },
    { label: "聯絡", url: "/contact", children: [] }
  ]);
  const [blocksConfig, setBlocksConfig] = useState([]);

  const clearBackground = () => {
    setBackgroundImage(null);
    setVideoUrl(null);
  };

  return (
    <Router>
      {/* 背景圖/影片處理 */}
      <div
        className="min-h-screen"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {videoUrl && (
          <video
            src={videoUrl}
            autoPlay
            loop
            muted
            className="fixed top-0 left-0 w-full h-full object-cover z-0"
          />
        )}

        {/* 主內容容器 */}
        <div className="relative z-10">
          <Navbar
            themeColor={themeColor}
            logoUrl={logoUrl}
            menuConfig={menuConfig}
          />

          <Routes>
            <Route path="/" element={<Home blocks={blocksConfig} />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>

          <Settings
            setBackgroundImage={setBackgroundImage}
            setThemeColor={setThemeColor}
            setLogoUrl={setLogoUrl}
            setVideoUrl={setVideoUrl}
            clearBackground={clearBackground}
            menuConfig={menuConfig}
            setMenuConfig={setMenuConfig}
            setBlocksConfig={setBlocksConfig}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
