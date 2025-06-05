import React,{use, useState} from "react";
import MenuSetting from "./MenuSetting";


export default function Settings({
    setBackgroundImage,
    setThemeColor,
    setLogoUrl,
    setVideoUrl,
    clearBackground,
    menuConfig,
    setMenuConfig
}) {
  const [showPannel,setShowPannel] = useState(false);

  const [activeTab,setActiveTab] = useState(0);

  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0];
    if(file){
        const url = URL.createObjectURL(file);
        setBackgroundImage(url);
        setVideoUrl(null); 
    }
  };

  const handleVideoUpload =(e) => {
    const file =e.target.files[0];
    if(file){
        const url = URL.createObjectURL(file);
        setVideoUrl(null);
        setBackgroundImage(url);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoUrl(url);
    }
  }

  const handleColorChange = (e) =>{
    setThemeColor(e.target.value);
  }

  return (
    <div className="fixed bottom-4 right-4">
        <button
            onClick={()=>setShowPannel(!showPannel)}
            className="p-3 bg-white rounded-full shadow-lg focus:outline-none"
            >
                {/* Settings圖示 */}
                <svg
                    className="h-6 w-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8a4 4 0 100 8 4 4 0 000-8zm0 0V4m0 16v-4m8-4h-4m-8 0H4m16 0a2 2 0 01-2-2m0-6a2 2 0 012-2m-6 16a2 2 0 01-2-2m0-6a2 2 0 012-2"
                    />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                </svg>
            </button>

            {/* 設定面板 */}
            {showPannel && (
                <div className="mt-2 p-4 bg-white rounded-lg w-80 max-h-[80vh] overflow-y-auto shadow-lg">
                    {/* Tab標籤 */}
                    <div className="flex border-b mb-4">
                        <button
                            onClick={() => setActiveTab(0)}
                            className={`flex-1 text-center py-2
                                 ${activeTab === 0 ? 'border-b-2 border-blue-500 text-blue-600' : 
                                 'text-gray-600 hover:text-blue-600'}`}
                    >外觀設定
                    </button>
                    <button
                        onClick={() => setActiveTab(1)}
                        className={`flex-1 text-center py-2
                                 ${activeTab === 1 ? 'border-b-2 border-blue-500 text-gray-600' : 
                                 'text-gray-600 hover:text-gray-600'}`}
                    >導航設定
                    </button>
                    </div>

                    {/* 外觀設定 */}
                    {activeTab === 0 && (
                      <>
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-1">
                          上傳背景圖片
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onchange={handleBackgroundUpload}
                          className="w-full"
                        />
                        <button
                          onClick={()=>clearBackground()}
                          className="mt-2 text-sm text-red-600 hover:underline"
                        >
                          清除背景
                        </button>
                      </div>

                      {/* 上傳背景影片 */}
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-1">
                          上傳背景影片
                        </label>
                        <input
                          type="file"
                          accept="video/*"
                          onchange={handleVideoUpload}
                          className="w-full"
                        />
                        <button
                          onClick={()=>setVideoUrl(null)}
                          className="mt-2 text-sm text-red-600 hover:underline">
                          清除影片背景
                        </button>
                      </div>

                      {/* 上傳Logo */}
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-1">
                          上傳 LOGO
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onchange={handleLogoUpload}
                          className="w-full"
                        />
                        <button
                          onClick={()=>setLogoUrl(null)}
                          className="mt-2 text-sm text-red-600 hover:underline">
                          還原預設LOGO
                        </button>
                      </div>

                      {/* 選擇主題色 */}
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-1">
                          選擇主題色
                        </label>
                        <input
                          type="color"
                          onchange={handleColorChange}
                          classNam="w-12 h-12 p-0 border-none"
                        />
                      </div>
                      </>
                    )}
                    {/* 導航設定 */}
                    {activeTab === 1 && (
                        <MenuSetting
                            menuConfig={menuConfig}
                            setMenuConfig={setMenuConfig} />
                    )}
                </div>
            )}
    </div>
  );
}