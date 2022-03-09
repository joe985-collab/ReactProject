import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router';
import "./pchart.css"
import * as d3 from "d3";

export default function PChart() {
  let location = useLocation();
  let initData = location.state;
  let datah = [];
  let innerRadius = 0;
  let outerRadius = 300;
  initData.every((s,idx)=>{
    if(idx<9){
      datah.push({id:s._id,region:s.country?s.country:"N/A",value:s.intensity})
      return true;
    }else{
       return false;
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
      .value((d)=>d.value)

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
        <div id="pie-container"/>
    </div>
  )
}
