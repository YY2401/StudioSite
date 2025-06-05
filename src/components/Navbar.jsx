import React, { useState } from "react";
import defaultLogo from "../logo.svg";

export default function Navbar({ themeColor,logoUrl,menuConfig }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdownIndex,setOpenDropdownIndex]= useState(null);
  //紀錄哪一個選項目前點開(使用)

  //判斷文字顏色
  const isColorDark = (hex) => {
    if(!hex.startsWith("#") || hex.length !== 7)return false;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
  };

  const textColorClass = isColorDark(themeColor) ? "text-white" : "text-gray-900";

  return (
    <nav
      className="w-full shadow-md relative z-20"
      style={{ backgroundColor: themeColor }}
    >
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        {/* 主區塊:左右兩邊自行撐滿 */}
        <div className="flex items-center justify-between h-16">
          {/* 左側:LOGO + 品牌名稱 */}
          <div className="flex items-center space-x-2">
            <image 
              src={logoUrl || defaultLogo}
              alt="Logo"
              className="h-8 w-8 auto">
            </image>
            <span className={`${textColorClass}font-sembold text-xl`}>
              Studio
            </span>
          </div>

          {/* 大螢幕主選單 */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {menuConfig.map((item,idx) => {
              // 主選單若有選項，做下拉選單
              const hasChildren = Array.isArray(item.children) && item.children.length > 0;
              return(
                <div
                  key={idx}
                  className="relative"
                  onMouseEnter={() => hasChildren && setOpenDropdownIndex(idx)}
                  onMouseLeave={() => hasChildren && setOpenDropdownIndex(null)}
                  >

                  {/* 主選單文字 */}
                  <a
                    herf={item.url}
                    className={`${textColorClass} hover:opacity-75 px-3 py-2 rounded-md text-sm font-medium`}
                    onClick={(e) => {
                      if (hasChildren) {
                        e.preventDefault(); // 阻止連結跳轉
                        setOpenDropdownIndex(openDropdownIndex === idx ? null : idx);
                      }
                    }}
                    >

                    {item.label}
                    {hasChildren && (
                      <svg
                        className={`ml-1 h-4 w-4 transition-transform ${
                          openDropdownIndex === idx ? "transform rotate-180" : ""}`}x
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7">
                      </path>
                      </svg>
                    )}
                  </a>

                  {/* 子選單:滑鼠滑入或點選後顯示 */}
                  {hasChildren && openDropdownIndex === idx && (
                    <div
                      className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg overflow-hidden z-10"
                      style={{ backgroundColor: themeColor }}>
                      {item.children.map(sub,sidx)(
                        <a
                          key={sidx}
                          href={sub.url}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-sm"
                          >
                          
                        </a>
                      )}
                    </div>
                  )}

                </div>
              )
            })}
          </div>

          <button
            onClick={() => window.location.href = "#"} 
            className=
            "flex items-center space-x-2 transition hover:bg-gray-200 hover:opacity-75 px-3 py-2 rounded-md text-sm font-medium focus:outLine-none"
            style={{ backgroundColor: themeColor }}
            >
            <img
              src={defaultLogo}
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