// src/components/Navbar.jsx
import React, { useEffect, useRef, useState } from "react";
import defaultLogo from "../logo.svg"; // 預設 Logo

export default function Navbar({ themeColor, logoUrl, menuConfig }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function habndleClickOutside(event){
      if(
        menuRef.current && !menuRef.current.contains(event.target)
      ){
        setOpenDropdownIndex(null);
      }
    }
    document.addEventListener("mousedown",habndleClickOutside);
    return() =>{
      document.removeEventListener("mousedown",habndleClickOutside);
    }
  },[]);

  // 判斷文字顏色（深色背景要白字）
  const isColorDark = (hex) => {
    if (!hex.startsWith("#") || hex.length !== 7) return false;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq < 128;
  };
  const textColorClass = isColorDark(themeColor) ? "text-white" : "text-gray-900";

  return (
    <nav
      className="w-full shadow-md relative z-20"
      style={{ backgroundColor: themeColor }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={menuRef}>
        <div className="flex items-center justify-between h-16">
          {/* 左側：Logo + 品牌 */}
          <div className="flex items-center space-x-2">
            <img
              src={logoUrl || defaultLogo}
              alt="Logo"
              className="h-8 w-auto"
            />
            <span className={`${textColorClass} font-semibold text-xl`}>
              Studio
            </span>
          </div>

          {/* 大螢幕主選單 */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {menuConfig.map((item, idx) => {
              // 如果這個主選單有 children，就做下拉
              const hasChildren = Array.isArray(item.children) && item.children.length > 0;
              return (
                <div
                  key={idx}
                  className="relative"
                >
                  {/* 主選單文字 */}
                  <a
                    href={item.url}
                    className={`${textColorClass} hover:opacity-75 px-3 py-2 rounded-md text-sm font-medium flex items-center`}
                    onClick={(e) => {
                      if (hasChildren) {
                        e.preventDefault();
                        setOpenDropdownIndex(openDropdownIndex === idx ? null : idx);
                      }
                    }}
                  >
                    {item.label}
                    {hasChildren && (
                      <svg
                        className={`ml-1 h-4 w-4 transition-transform ${
                          openDropdownIndex === idx ? "rotate-180" : "rotate-0"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </a>

                  {/* 子選單：滑鼠滑入或點擊後顯示 */}
                  {hasChildren && openDropdownIndex === idx && (
                    <div
                      className="absolute left-0 mt-2 w-40 rounded-md shadow-lg z-90"
                    style={{
                      backgroundColor: isColorDark(themeColor) ? "#222" : "#fff"
                    }}
                    >
                      {item.children.map((sub, sidx) => (
                        <a
                          key={sidx}
                          href={sub.url}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-sm"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 漢堡按鈕：小螢幕時顯示 */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className={`focus:outline-none ${textColorClass}`}
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
                    d="M4 6h16M4 12h16M4 18h16"
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
