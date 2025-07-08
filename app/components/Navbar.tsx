import React from "react";
import logo from "./ui/logoSample.jpg";
type MenuItem = {
  label: string;
  link: string;
  subMenu?: { label: string; link: string }[];
};

const menuItem: MenuItem[] = [
  { label: "首頁", link: "" },
  { label: "最新動態", link: "" },
  { label: "主要服務內容", link: "" },
  {
    label: "遊戲",
    link: "/",
    subMenu: [
      { label: "遊戲列表", link: "" },
      { label: "最新活動", link: "" },
    ],
  },
  {
    label: "美術",
    link: "/",
    subMenu: [
      { label: "插畫", link: "" },
      { label: "動畫", link: "" },
    ],
  },
  {
    label: "平台",
    link: "/",
    subMenu: [
      { label: "下載中心", link: "" },
      { label: "教學文檔", link: "" },
    ],
  },
  { label: "商店", link: "/Store" },
  { label: "聯絡", link: "" },
];

const NavBar: React.FC = () => (
  <nav className="bg-white shadow">
    <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
      {/* 左側LOGO */}
      <a href="/" className="inline-block">
        <img src={logo} alt="logo" className="h-8 w-auto" />
      </a>

      {/* 右側選單 */}
      <ul className="flex items-center space-x-6 text-gray-700">
        {menuItem.map((item) => (
          <li key={item.label} className="relative group">
            <a
              href={item.link}
              className="flex items-center hover:text-red-600"
            >
              <span>{item.label}</span>
              {item.subMenu && <span className="ml-1 text-sm">▼</span>}
            </a>

            {/* 子選單 */}
            {item.subMenu && (
              <ul
                className={`absolute left-0 mt-2 w-40 bg-white border rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration`}
              >
                {item.subMenu.map((sub) => (
                  <li key={sub.label}>
                    <a
                      href={sub.link}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {sub.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

export default NavBar;
