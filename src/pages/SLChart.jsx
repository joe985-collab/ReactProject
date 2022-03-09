import {useEffect, useState} from "react"
import Chart from "../components/chart/Chart"
import Featuredinfo from "../components/featuredinfo/Featuredinfo"
import {useLocation} from "react-router-dom";
import Home from "./Home";
import "./SLChart.css"
import { formControlUnstyledClasses } from "@mui/core"
export default function SLChart(){
    const locs = useLocation();
    const dataz = locs.state;
    let testData = [];
    let dkeys = ["Intensity","Likelihood","Relevance"];
    if(dataz) dataz.every((s,idx)=>{
        let store = (argStr)=>(s[argStr]?s[argStr]:"N/A");
        if(idx>9){
            return false;
        }else{
            testData.push({"Country":store("country"),"Intensity":store("intensity"),"Likelihood":store("likelihood"),"Relevance":store("relevance")});
            return true;
        } 
    });
    return(
        <div className="slchart">
            <Featuredinfo/>
            <Chart data={testData} title="Energy Statistics" grid dataKey={dkeys}/>
        </div>
    )
}