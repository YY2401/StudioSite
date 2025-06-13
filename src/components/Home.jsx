import React from "react";
import Marquee from "../components/Marquee";
import FeatureSection from "./FeatureSection";
export default function Home({blocks}){
    return(
        <div>
            <Marquee/>
            <FeatureSection blocks={blocks}/>
        </div>
    );
}