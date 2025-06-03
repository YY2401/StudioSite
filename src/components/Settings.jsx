import React,{use, useState} from "react";

export default function Settings({setBackgroundImage,setThemeColor}) {
  const [showPannel,setShowPannel] = useState(false);

  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0];
    if(file){
        const url = URL.createObjectURL(file);
        setBackgroundImage(url);
    }
  };

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
                <div className="mt-2 p-4 bg-white rounded-lg shadow-lg w-64">
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                        外觀設定
                        </h2>

                    {/* 上傳背景 */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            上傳背景圖片
                            </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleBackgroundUpload}
                            className="block w-full"
                        />
                    </div>

                    {/* 選擇主題色 */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            選擇主題色
                        </label>
                        <input
                            type="color"
                            onChange={handleColorChange}
                            className="block w-full p-1 border border-gray-300 rounded"
                        />
                    </div>

                    {/* 清除背景按鈕 */}
                    <div>
                        <button
                            onClick={() => setBackgroundImage(null)}
                            className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        >
                            清除背景
                        </button>
                    </div>
                </div>
            )}
    </div>
  );
}