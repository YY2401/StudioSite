import React,{useState} from "react";

export default function MenuSetting({menuConfig,setMenuConfig}) {
    const [localMenu,setLocalMenu] = useState(JSON.parse(JSON.stringify(menuConfig)));

    const addMainItem = () => {
        setLocalMenu([
            ...localMenu,
            {
                label:"新選單",
                url:"/new-url",
                children: [],
            },
        ]);
    };

    const removeMenuItem = (mainIdx) =>{
        const newMenu = localMenu.filter((_,idx) => idx !== mainIdx);
        setLocalMenu(newMenu);
    };

    const updateMainItem = (idx,key,value) => {
        const newMenu = localMenu.map((item, index) => {
            if (index === idx) {
                return { ...item, [key]: value };
            }
            return item;
        });
        setLocalMenu(newMenu);
    };

    const addSubItem = (mainIdx) =>{
        const newMenu = localMenu.map((item, index) => {
            if (index === mainIdx) {
                const newChildren = item.children ? [...item.children] : [];
                newChildren.push({
                    label:"新選項",
                    url:"/sub-url"
                });
                return { ...item, children: newChildren };
            }
            return item;
        });
        setLocalMenu(newMenu);
    };

    const removeSubItem = (mainIdx, subIdx) => {
        const newMenu = localMenu.map((item, index) => {
            if (index === mainIdx && Array.isArray(item.children)) {
                const filtered = item.children.filter((_, idx) => idx !== subIdx);
                return { ...item, children: filtered };
            }
            return item;
        });
        setLocalMenu(newMenu);
    };

    const updateSubItem = (mainIdx, subIdx, key, value) => {
        const newMenu = localMenu.map((item, index) => {
            if (index === mainIdx && Array.isArray(item.children)) {
                const updateChildren = item.children.map((subItem, subIndex) => {
                    if (subIndex === subIdx) {
                        return { ...subItem, [key]: value };
                    }
                    return subItem;
                });
                return { ...item, children: updateChildren };
            }
            return item;
        });
        setLocalMenu(newMenu);
    };

    const handleSave = () =>{
        setMenuConfig(localMenu);
    };

    return(
        <div>
            <h2 className="text-lg font-medium text-gray-800 mb-2">
                選單設定
            </h2>

            {
                // 列出主選單
                localMenu.map((item,idx) => (
                    <div key={idx} className="mb-4 border p-3 rounded-md bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold">
                                主選單 {idx + 1}
                            </span>
                            <button
                                onClick={() => removeMenuItem(idx)}
                                className="text-red-600 hover:underline text-sm"
                            >
                                刪除
                            </button>
                        </div>

                        {/* 編輯主選單 */}
                        <div className="mb-2">
                            <label className="block text-gray-700">
                                文字 (label):
                            </label>
                            <input
                                type="text"
                                value={item.label}
                                onChange={(e) => updateMainItem(idx,"label", e.target.value)}
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block text-gray-700">
                                連結 (url): (斜線後加上英文名稱)
                            </label>
                            <input
                                type="text"
                                value={item.url}
                                onChange={(e) => updateMainItem(idx,"url", e.target.value)}
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>

                        {/* 子選單：可新增多筆 */}
                        <div className="ml-4 mt-2">
                            <div className="flex items-center jstify-between mb-1">
                                <span className="text=gray-800 font-medium">子選單:</span>
                                <button
                                    onClick={() => addSubItem(idx)}
                                    className="text=blue-600 hover:underline text-sm"
                                >+新增子選單
                                </button>
                            </div>
                            {Array.isArray(item.children) && item.children.map((sub,sidx) => (
                                <div key={sidx} className="mb-2 pl-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-700">
                                            子選單 #{sidx + 1}
                                        </span>
                                        <button
                                            onClick={() => removeSubItem(idx, sidx)}
                                            className="text-red-600 hover:underline text-sm"
                                        >
                                            刪除
                                        </button>
                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-gray-600">文字：</label>
                                        <input
                                            type="text"
                                            value={sub.label}
                                            onChange={(e) => updateSubItem(idx, sidx, "label", e.target.value)}
                                            className="w-full border rounded px-2 py-1"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-600">連結：(斜線後加上英文名稱)</label>
                                        <input
                                            type="text"
                                            value={sub.url}
                                            onChange={(e) => updateSubItem(idx, sidx, "url", e.target.value)}
                                            className="w-full border rounded px-2 py-1"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* 新增一個新的主選單 */}
                <button
                    onClick={addMainItem}
                    className="mb-4 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    +新增主選單
                </button>

                {/* 儲存按鈕 */}
                <div>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        儲存選單設定
                    </button>
                </div>
        </div>
    )

}