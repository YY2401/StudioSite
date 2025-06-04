import React,{useState} from 'react';
import Navbar from './components/Navbar';
import Settings from './components/Settings';
import './App.css';
export default function App(){
  const [backgroundImage,setbackgroundImage] = useState(null);

  const [videoUrl,setVideoUrl] = useState(null);

  const [themeColor,setThemeColor] = useState('#ffffff');

  const [logoUrl,setLogoUrl] = useState(null);

  return(

    <div
      className="relative min-h-screen flex-col"      
      style={{
        backgroundImage:backgroundImage? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: themeColor
      }}
    >
      {/* 如果有設定影片，則顯示影片背景 */} 
      {videoUrl && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={videoUrl}
          autoPlay
          loop
          muted
        />
      )}

      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage:videoUrl ? 'none' : `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: videoUrl? "rgba(0,0,0,0.3)":themeColor,

        }}
      ></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar themeColor={themeColor} logoUrl={logoUrl}/>
        <main className="flex-1 p-4 text-gray-800">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            示意網站
          </h1>
          <p className="text-gray-700">
            這是一個使用 React 和 Tailwind CSS 建立的示意網站。您可以在這裡展示您的作品、服務和聯絡資訊。
          </p>
          {/* 其他網站內容 */}
        </main>
      </div>

      x
      {/* 放在最下面或是側邊，請使用者開始設定介面 */}
      <Settings 
        setBackgroundImage={setbackgroundImage} 
        setThemeColor={setThemeColor}
      />
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© 202501 示意網站</p>
      </footer>
    </div>
  )
};
