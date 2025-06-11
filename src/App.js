// src/App.js
import React, { useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Settings from "./components/Settings";
import Marquee from "./components/Marquee";
import FeatureSection from "./components/FeatureSection";
import BlockSetting from "./components/BlockSetting";
import "./App.css";



export default function App() {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [themeColor, setThemeColor] = useState("#ffffff");
  const [logoUrl, setLogoUrl] = useState(null);


  const [menuConfig, setMenuConfig] = useState([
    { label: "首頁", url: "/" },
    { label: "最新消息", url: "/news" },
    {
      label: "遊戲",
      url: "/about",
      children: [
        { label: "遊戲介紹", url: "/about/team" },
        { label: "美術背景", url: "/about/vision" },
      ],
    },
    { label: "商店", url: "/portfolio" },
    { label: "聯絡", url: "/contact" },
  ]);

  const [blocksConfig,setBlocksConfig] = useState([
    //樣本舉例
    // {ImageUrl:'./public/logo192.png',title:'遊戲',description:'提供放置有關遊戲說明的相關文字，測試每行長度與間距如目前顯示結果，長度達標會換行'},
    // {ImageUrl:'./logo512.png',title:'美術',description:'提供放置有關美術說明的相關文字，測試每行長度與間距如目前顯示結果，長度達標會換行'}

  ])


  return (
    <div className="relative min-h-screen flex flex-col">
      {/* 動態影片背景（若有上傳） */}
      {videoUrl && (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={videoUrl}
          autoPlay
          loop
          muted
        />
      )}

      {/* 背景圖片 / 色彩 / 半透明遮罩 */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: videoUrl
            ? "none"
            : backgroundImage
            ? `url(${backgroundImage})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: videoUrl
            ? "rgba(0,0,0,0.3)"
            : themeColor,
        }}
      ></div>

      {/* 內容層 */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          themeColor={themeColor}
          logoUrl={logoUrl}
          menuConfig={menuConfig}
        />
        
        <Marquee>
          
        </Marquee>

        <div className="text-center text-5xl font-bold my-8 text-black">
          簡介
        </div>

        <div className="App">
          <BlockSetting
          blocksConfig={blocksConfig}
          setBlocksConfig={setBlocksConfig}
          />
        <FeatureSection blocks={blocksConfig}/>
        </div>

        <main className="flex-1 p-4 text-gray-800">
          <h1 className="text-3xl font-bold mb-4">SITE</h1>
          <p className="mb-4">
          </p>
          <p className="text-gray-600">
          </p>
        </main>

        {/* 設定介面*/}
        <Settings
          setBackgroundImage={setBackgroundImage}
          setThemeColor={setThemeColor}
          setLogoUrl={setLogoUrl}
          setVideoUrl={setVideoUrl}
          clearBackground={() => {
            setBackgroundImage(null);
            setVideoUrl(null);
          }}
          menuConfig={menuConfig}
          setMenuConfig={setMenuConfig}
        />

        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>© 2025 測試</p>
        </footer>
      </div>
    </div>
  );
}
