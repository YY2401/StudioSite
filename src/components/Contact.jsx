import React,{useState} from 'react';

export default function Contact(){
    const [modalOpen,setModalOpen] = useState(false);

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">聯絡我們</h1>
            <p className="mb-4">若有需要用得上的地方，請透過下述方式聯繫我們：</p>
            <ul className="mb-4">
                <li>電話：</li>
                <li>Email：</li>
                <li>Line官方：</li>
                <li>Telegram：</li>
            </ul>
            <div>
                <p className="mb-2">或掃描以下QR CODE加入我們的LINE：</p>
                <img
                    src="/LineQrCodeTest.jpg"
                    alt="Line QR Code"
                    className="w-64 h-auto border rounded shadow cursor-pointer"
                    onClick={() => setModalOpen(true)}
                />
            </div>
            {modalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    onClick={() => setModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-lg p-4"
                        style={{maxWidth:"90vw",maxHeight:"90vh"}}
                        onClick={e => e.stopPropagation()}
                    >
                    <img
                        src="/LineQrCodeTest.jpg"
                        alt="Line QR Code Large"
                        className="max-w-full max-h-[80vh] rounded"
                    />
                    <button
                        className="absolute top-4 right-6 text-2xl text-gray-700 bg-white bg-opacity-80 rounded-full px-2 cursor-pointer"
                        onClick={() => setModalOpen(false)}
                    >
                    </button>
                    </div>

                </div>
            )}
        </div>
    )
}