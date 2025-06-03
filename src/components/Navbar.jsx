import React,{useState} from "react";

export default function Navbar({ themeColor }) {
  const [isOpen, setIsOpen] = useState(false);

<nav
    className="w-full"
    style={{ backgroundColor: themeColor }}
    >
    <div className="max-w-7xl ma-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            {/* Logo/品牌名稱 */}
            <div className="flex-shirk-0">
                <span className="text-lg font-semibold text-gray-900">
                    Studio
                </span>
            </div>

            {/* {按鈕:小螢幕時顯示} */}
            <div className="flex md:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className=
                    "text=gray-900 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            >
                                {isOpen?(
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ):(
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

            {/* 大螢幕時的選單 */}
            <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                    <a
                        herf="#"
                        className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            首頁
                        </a>
                    <a
                        herf="#"
                        className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            關於
                        </a>
                    <a
                        herf="#"
                        className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            服務
                        </a>
                    <a
                        herf="#"
                        className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            聯絡
                        </a>
                </div>
            </div>
        </div>
    </div>

    {/* 小螢幕選單:展開時顯示 */}
    {isOpen && (
        <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a
                    href="#"
                    className="text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                >
                    首頁
                </a>
                <a
                    href="#"
                    className="text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                >
                    關於
                </a>
                <a
                    href="#"
                    className="text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                >
                    服務
                </a>
                <a
                    href="#"
                    className="text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                >
                    聯絡
                </a>
            </div>
        </div>
    )}
</nav>
}