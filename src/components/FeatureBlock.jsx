import React from "react";

export default function FeatureBlock({
    imageUrl,
    title,
    description,
    reverse = false
}){

    const placeholder = '../public/logo192.png'

    return(
        <div
            className={`flex flex-col md:flex-row ${reverse?'md:flex-row-reverse':''} items-center my-8`}>
            <div className="w-full md:w-1/2 p-4">
                <img src={imageUrl } alt="title" 
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                onError={e => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = placeholder;
                }}/>
            </div>
            
            <div className="w-full md:w-1/2 p-4">
                <h3 className="text-2xl front-bold mb-2">{title}</h3>
                <hr className="my-2 border-gray-500"/>
                <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>
        </div>
    );
}