import React from "react";
import FeatureBlock from "./FeatureBlock";

export default function FeatureSection({blocks}){
    return(
        <div className="max-w-7xl mx-auto px-4">
            {blocks.map((block,idx) => (
                <FeatureBlock
                    key={idx}
                    imageUrl={block.mediaUrl}
                    title={block.title}
                    description={block.description}
                    reverse={idx %2 === 1}
                />
            ))}
        </div>
    );
}