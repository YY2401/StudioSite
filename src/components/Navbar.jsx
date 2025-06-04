import React, { useState } from "react";
import logo from "../logo.svg";

export default function Navbar({ themeColor }) {
  const [isOpen, setIsOpen] = useState(false);

  const isColorDark = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
  };

  const textColorClass = isColorDark(themeColor) ? "text-white" : "text-gray-900";

  return (
    <nav
      className="w-full shadow-md"
      style={{ backgroundColor: themeColor }}
    >
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        {/* 主區塊:左右兩邊自行撐滿 */}
        <div className="flex items-center justify-between h-16">
          {/* 左側:LOGO + 品牌名稱 */}
          <button
            onClick={() => window.location.href = "#"} 
            className=
            "flex items-center space-x-2 transition hover:bg-gray-200 hover:opacity-75 px-3 py-2 rounded-md text-sm font-medium focus:outLine-none"
            style={{ backgroundColor: themeColor }}
            >
            <img
              src={logo}
              alt="Logo"
              className="h-8 w-8"
            />
            <span className={`text-lg font-semibold ${textColorClass}`}>
              Studio
            </span>
            
          </button>

          {/* 桌面選單 */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <a
              href="#"
              className={`${textColorClass} hover:opacity-75 px-3 py-2 rounded-md text-sm font-medium`}
            >
              首頁
            </a>
            <a
              href="#"
              className={`${textColorClass} hover:opacity-75 px-3 py-2 rounded-md text-sm font-medium`}
            >
              關於
            </a>
            <a
              href="#"
              className={`${textColorClass} hover:opacity-75 px-3 py-2 rounded-md text-sm font-medium`}
            >
              服務
            </a>
            <a
              href="#"
              className={`${textColorClass} hover:opacity-75 px-3 py-2 rounded-md text-sm font-medium`}
            >
              聯絡
            </a>
          </div>

          {/* {按鈕:小螢幕時顯示} */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-900 hover:text-gray-700 focus:outline-none focus:text-gray-700"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}