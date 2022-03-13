import React from 'react'
import { useState,useEffect } from 'react'
import { useLocation } from 'react-router';
import "./pchart.css"
import * as d3 from "d3";
import Filter from '../components/filters/Filter';

export default function PChart() {
  let location = useLocation();
  let initData = location.state;
  let datah = [];
  let innerRadius = 0;
  let outerRadius = 220;
  // initData.every((s,idx)=>{
  //   if(idx<9){
  //     datah.push({id:s._id,region:s.country?s.country:"N/A",value:s.intensity})
  //     return true;
  //   }else{
  //      return false;
  //   }
  // })
  const[formData,setData] = useState(0);
  const childToParent = (childData)=>{
       setData(childData);
  }
  const [optionData,setDat] = useState("intensity");
  let fish = (e)=>{
      setDat(e.target.value)
  }
  let strtIdx = (formData-1)*10;
  let endIdx = strtIdx+10;
  datah = formData>1&&formData<101?initData.slice(strtIdx,endIdx):initData.slice(0,10);
  let test = {}
  let count = 1;
  datah.forEach((d,idx)=>{
    let rgn = datah[idx].region
    if(test[rgn]){
     // console.log(DUMMY_DATA[idx],"Here")
     datah[idx].region = rgn+`${count}`;
     count++;
    }else{
     test[rgn] = 1;
    }
  })
  const width = 2*outerRadius+100;
  const height = 2*outerRadius+100;
  const colorScale = d3
  .scaleSequential()
  .interpolator(d3.interpolateCool)
  .domain([0,datah.length])
  useEffect(()=>{
      drawChart();
  },[datah])
  function drawChart(){
      d3.select("#pie-container")
      .select("svg")
      .remove();

      const svg = d3
      .select("#pie-container")
      .append("svg")
      .attr("width",width)
      .attr("height",height)
      .append("g")
      .attr("transform",`translate(${width/2},${height/2})`)
      const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)

      const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d)=>d[optionData])

      const arc = svg
      .selectAll()
      .data(pieGenerator(datah))
      .enter()

      arc
      .append("path")
      .attr("d",arcGenerator)
      .style("fill",(_,i)=>colorScale(i))
      .style("stroke","#ffff")
      .style("stroke-width",0)

      arc
      .append("text")
      .attr("text-anchor","middle")
      .attr("alignment-baseline","middle")
      .text((d)=>d.data.region)
      .style("fill",(_,i)=>colorScale(datah.length-i))
      .attr("transform", (d)=>{
          const [x,y] = arcGenerator.centroid(d);
          return `translate(${x},${y})`
      })
  }
  return (
    <div className="pchart">
       <div className="selectB">
            <label className="mylabel1">Enter a Page between 1-100</label>
              <label className='filtz'>Filter</label>
              <select onChange={fish} className='slct' name="cars" id="selectz">
                  <option value="intensity">Intensity</option>
                  <option value="relevance">Relevance</option>
                  <option value="likelihood">Likelihood</option>
              </select>
        </div>
        <Filter childToParent={childToParent}/>
        <div id="pie-container"/>
    </div>
  )
}
