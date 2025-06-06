// src/App.js
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Settings from "./components/Settings";
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

        <main className="flex-1 p-4 text-gray-800">
          <h1 className="text-3xl font-bold mb-4">工作室示範網站</h1>
          <p className="mb-4">
            這是一個整合「動態 NavBar 設定」以及「背景/LOGO/影片」的範本。
          </p>
          <p className="text-gray-600">
            透過右下角設定，您可以修改「導航選單」的項目名稱、URL，以及新增「下拉子選單」。  
            也能上傳新的背景圖片、背景影片、或是自訂 Logo，甚至選擇主題色。
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
          <p>© 2025 工作室示範網站</p>
        </footer>
      </div>
    </div>
  );
}
