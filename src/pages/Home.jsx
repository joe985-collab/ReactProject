import { ClassNames } from "@emotion/react"
import {useEffect, useState} from "react"
import Chart from "../components/chart/Chart"
import Featuredinfo from "../components/featuredinfo/Featuredinfo"
import "./home.css"
import { userData } from "../dummyData"
export default function Home(){
    const[dataz,  setData] = useState(null);
    useEffect(()=>{
        fetch("http://localhost:8080/articles")
        .then((response)=>{
            if(!response.ok){
                throw new Error(
                    `HTTP ERROR: STATUS CODE ${response.status}`
        );
            }
            return response.json();
        })
        .then((data)=>setData(data))
        .catch((err)=>{
            console.log(err);
            setData(null);
        })
    },[])
    let testData = [];
    if(dataz) dataz.every((s,idx)=>{
        if(idx>9){
            return false;
        }else{
            testData.push({"Country":s.country?s.country:"N/A","Intensity":s.intensity?s.intensity:"N/A"});
            return true;
        } 
        testData = testData.length>0?testData:0;
    });
    return(
        <div className="home">
            <Featuredinfo/>
            <Chart data={testData} title="Energy Intensity" grid dataKey="Intensity"/>
        </div>
    )
}