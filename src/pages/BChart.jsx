import React from 'react'
import { useLocation } from 'react-router'
import {useRef,useEffect} from 'react';
import * as d3 from "d3";
import "./bchart.css"
export default function BChart() {
  let location = useLocation();
  let barData = location?.state;
  const ref1 = useRef();
  const ref2 = useRef();
  // const DUMMY_DATA = [
  //   { id: "d1", region: "USA", value: 10 },
  //   { id: "d2", region: "India", value: 12 },
  //   { id: "d3", region: "China", value: 11 },
  //   { id: "d4", region: "Germany", value: 6 }
  // ];
  let DUMMY_DATA = [];
  let titles = "Energy Intensity";
 barData.every((s,idx)=>{
   if(idx<4){
     DUMMY_DATA.push({id:s._id,region:s.country?s.country:"N/A",value:s.intensity})
     return true;
   }else{
      return false;
   }
 })
 console.log(DUMMY_DATA)
  // const svgElement = d3.select(ref.current);
  // svgElement.append("circle")
  // .attr("cx",150)
  // .attr("cy",70)
  // .attr("r",50)
  useEffect(()=>{
      // const MARGINS = {top:20,bottom:10};
  const CHART_WIDTH = 600;
  const CHART_HEIGHT = 370;
  let selectedData = DUMMY_DATA;
  // -MARGINS.bottom-MARGINS.top
  const x = d3.scaleBand().rangeRound([0, CHART_WIDTH]).padding(0.1);
  const y = d3.scaleLinear().range([CHART_HEIGHT, 0]);
  // +MARGINS.top+MARGINS.bottom
  const svGElement = d3.select(ref1.current);
  const chartContainer = svGElement
    .attr("width", CHART_WIDTH)
    .attr("height", CHART_HEIGHT + 30);
  x.domain(DUMMY_DATA.map((d) => d.region));
  y.domain([0, d3.max(DUMMY_DATA, (d) => d.value) + 3]);
  const chart = chartContainer.append("g");
  chart
    .append("g")
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .attr("transform", `translate(0, ${CHART_HEIGHT})`)
    .attr("color", "#4f009e");
  let unselectedIds = [];
  function renderChart() {
    chart
      .selectAll(".bar")
      .data(selectedData, (data) => data.id)
      .enter()
      .append("rect")
      .classed("bar", true)
      .attr("width", x.bandwidth())
      .attr("height", (data) => CHART_HEIGHT - y(data.value))
      .attr("x", (data) => x(data.region))
      .attr("y", (data) => y(data.value));
    chart
      .selectAll(".label")
      .data(selectedData, (data) => data.id)
      .enter()
      .append("text")
      .text((data) => data.value)
      .attr("x", (data) => x(data.region) + x.bandwidth() / 2)
      .attr("y", (data) => y(data.value) - 20)
      .attr("text-anchor", "middle")
      .classed("label", true);
    chart
      .selectAll(".bar")
      .data(selectedData, (data) => data.id)
      .exit()
      .remove();
    chart
      .selectAll(".label")
      .data(selectedData, (data) => data.id)
      .exit()
      .remove();
  }
  renderChart();
  const dataItems = d3.select(ref2.current)
  const selectDiv = dataItems
    .select("ul")
    .append("li");
  const listItems = selectDiv
    .selectAll("all")
    .data(DUMMY_DATA)
    .enter()
    .append("li");
  listItems.append("span").text((data) => data.region);
  listItems
    .append("input")
    .attr("type", "checkbox")
    .attr("checked", true)
    .on("change", (e) => {
      let data  = e.target.__data__
      if (unselectedIds.indexOf(data.id) === -1) {
        unselectedIds.push(data.id);
      } else {
        unselectedIds = unselectedIds.filter((id) => id !== data.id);
      }
      selectedData = DUMMY_DATA.filter((d) => {
        return unselectedIds.indexOf(d.id) === -1;
      });
      renderChart();
      console.log(selectedData,unselectedIds);
    });
  }, [])
  
  return (
    <div className="bchart">
        <h1>{titles}</h1>
        <div id="app">
          <div id="chart">
            <svg ref={ref1}/>
          </div>
          <div id="data" ref={ref2}>
            <ul></ul>
          </div>
        </div>
    </div>
  )
}
