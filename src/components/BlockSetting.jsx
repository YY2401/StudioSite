import React,{useState} from 'react';

export default function BlockSetting({blockConfig=[],setBlocksConfig}){
        const [localBlocks,setLocalBlocks] = useState([...blockConfig]);
        const addBlock = () =>{
            setLocalBlocks([
                ...localBlocks,
                {mediaUrl:'',title:'新標題',description:'新說明'}
            ]);
        };

        const updateBlock = (idx,key,value) => {
            const updated = localBlocks.map((blk,i) => 
            i === idx?{...blk,[key]:value}:blk);
            setLocalBlocks(updated);
        };

        const handleFileChange = (idx,file) => {
            const url = file? URL.createObjectURL(file):'';
            const updated = localBlocks.map((blk,i) =>
                i === idx? {...blk,mediaUrl:url,file}:blk);
            setLocalBlocks(updated)
        }

        const removeBlock = (idx) => {
         setLocalBlocks(localBlocks.filter((_,i) => i != idx));
        };

        const handleSave = () => {
            setBlocksConfig(localBlocks);
        };

        return(
            <div>
                <h2 className="text-lg font-medium mb-4">區塊設定</h2>
                {localBlocks.map((blk,idx) => (
                    <div key={idx} className="mb-4 border p-3 rounded-md border-gray-50">
                        <div className="flex justify-between mb-2">
                            <span>區塊 #{idx+1}</span>
                            <button onClick={() => removeBlock(idx)} className="text-red-600">移除</button>
                        </div>
                        <label className="block mb-1">圖片或影片:</label>
                        <input
                            type="file"
                            accept="image/*,video/*"
                            onChange={e => handleFileChange(idx,e.target.files[0])}
                            className="mb-2"
                        />
                        <label className="block mb-1 mt-2">標題</label>
                        <input
                            type="text"
                            value={blk.title}
                            onChange={e => updateBlock(idx,'title',e.target.value)}
                            className="w-full border rounded px-2 py-1 mb-2"
                        />
                        <label className="block mb-1">說明文字</label>
                        <textarea
                            value={blk.description}
                            onChange={e => updateBlock(idx,'description')}
                            className="w-full border rounded px-2 py-1 mb-2"
                        />
                    </div>
                ))}
                <button onClick={addBlock} className="px-3 py-2 bg-green-600 text-white rounded mr-2">+新增區塊</button>
                <button onClick={handleSave} className="px-3 py-2 bg-blue-600 text-white rounded">儲存設定</button>
            </div>
        )
}