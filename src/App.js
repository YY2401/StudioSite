import React,{useState} from 'react';
import Navbar from './components/Navbar';
import Settings from './components/Settings';
import logo from './logo.svg';
import './App.css';
export default function App(){
  const [backgroundImage,setbackgroundImage] = useState(null);

  const [themeColor,setThemeColor] = useState('#ffffff');

  return(
    <div
      className="min-h-screen flex flex col"
      style={{
        backgroundImage:backgroundImage? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: themeColor
      }}
    >
      <Navbar themeColor={themeColor}/>
      <main className="flex-1 p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          示意網站
        </h1>
        <p className="text-gray-700">
          這是一個使用 React 和 Tailwind CSS 建立的工作室示意網站。您可以在這裡展示您的作品、服務和聯絡資訊。
        </p>
        {/* 其他網站內容 */}
      </main>
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
