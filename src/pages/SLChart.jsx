import {useState} from "react"
import Chart from "../components/chart/Chart"
import {useLocation} from "react-router-dom";
import "./SLChart.css"
import Filter from "../components/filters/Filter";
export default function SLChart(){
    const locs = useLocation();
    const dataz = locs.state;
    const[formData,setData] = useState(0);
    const childToParent = (childData)=>{
         setData(childData);
    }
    // let testForm = document.querySelector("form").addEventListener("submit",(e)=>{
    //     console.log(e.target);
    // })
    let testData = [];
    let dkeys = ["intensity","likelihood","relevance"];
    let strtIdx = (formData-1)*10;
    let endIdx = strtIdx+10;
    testData = formData>1&&formData<101?dataz.slice(strtIdx,endIdx):dataz.slice(0,10);
    // console.log(testData)
    return(
        <div className="slchart">
            <label className="mylabel">Enter a Page between 1-100</label>
            <Filter childToParent={childToParent} />
           {testData.length && <Chart data={testData} title="Energy Statistics" grid dataKey={dkeys}/>}
        </div>
    )
}