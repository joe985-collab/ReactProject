import React from 'react'
import { useLocation } from 'react-router'
import {useRef,useEffect,useState} from 'react';
import * as d3 from "d3";
import "./bchart.css"
import MyForm from '../components/filters/MyForm';
export default function BChart() {
  let location = useLocation();
  let barData = location?.state;
  const ref1 = useRef();
  const ref2 = useRef();
  let DUMMY_DATA = [];
  const[formData,setData] = useState(0);
  const childToParent = (childData)=>{
       setData(childData);
  }
  let strtIdx = (formData-1)*4;
  let endIdx = strtIdx+4;
//  barData.every((s,idx)=>{
//    if(idx<4){
//      DUMMY_DATA.push({id:s._id,region:s.country?s.country:"N/A",value:s[nums]})
//      return true;
//    }else{
//       return false;
//    }
//  })
   DUMMY_DATA = formData>1&&formData<251?barData.slice(strtIdx,endIdx):barData.slice(0,4);
  //  console.log(DUMMY_DATA)
//  console.log(DUMMY_DATA)
  // const svgElement = d3.select(ref.current);
  // svgElement.append("circle")
  // .attr("cx",150)
  // .attr("cy",70)
  // .attr("r",50)
  const [countz,setCount] = useState(0);
  let selectedItem = document.getElementById("selectz");
  console.log(selectedItem)
  const [chosenValue,setValue] = useState(0);
  let ghis = (e)=>{
    setValue(e.target.value);
  }
  console.log(chosenValue,typeof(chosenValue))
  let nums = "intensity";
  let strng = "region";
  if(chosenValue){
    nums = chosenValue==="intensity"||chosenValue==="relevance"||chosenValue==="likelihood"?chosenValue:"intensity";
    strng = chosenValue==="source"||chosenValue==="topic"||chosenValue==="country"||chosenValue==="sector"?chosenValue:"region";
  }
  let test = {}
  let count = 1;
  DUMMY_DATA.forEach((d,idx)=>{
    let rgn = DUMMY_DATA[idx][strng]
    if(test[rgn]){
     // console.log(DUMMY_DATA[idx],"Here")
     DUMMY_DATA[idx][strng] = rgn+`${count}`;
     count++;
    }else{
     test[rgn] = 1;
    }
  })
  let titles = chosenValue?chosenValue[0].toUpperCase()+chosenValue.slice(1):"Intensity";
  useEffect(()=>{
      // const MARGINS = {top:20,bottom:10};

  const CHART_WIDTH = 600;
  const CHART_HEIGHT = 370;
  let selectedData = DUMMY_DATA;
  // -MARGINS.bottom-MARGINS.top
  const x = d3.scaleBand().rangeRound([0, CHART_WIDTH]).padding(0.1);
  const y = d3.scaleLinear().range([CHART_HEIGHT, 0]);
  // +MARGINS.top+MARGINS.bottom
  d3.selectAll(".svg1").remove();
  const svGElement = d3.select("#chart");
  const chartContainer = svGElement.append("svg").attr("class","svg1")
    .attr("width", CHART_WIDTH)
    .attr("height", CHART_HEIGHT + 30);
  x.domain(DUMMY_DATA.map((d) => d[strng]));
  y.domain([0, d3.max(DUMMY_DATA, (d) => d[nums]) + 3]);
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
      .data(selectedData, (data) => data._id)
      .enter()
      .append("rect")
      .classed("bar", true)
      .attr("width", x.bandwidth())
      .attr("height", (data) => CHART_HEIGHT - y(data[nums]))
      .attr("x", (data) => x(data[strng]))
      .attr("y", (data) => y(data[nums]));
    chart
      .selectAll(".label")
      .data(selectedData, (data) => data._id)
      .enter()
      .append("text")
      .text((data) => data[nums])
      .attr("x", (data) => x(data[strng]) + x.bandwidth() / 2)
      .attr("y", (data) => y(data[nums]) - 20)
      .attr("text-anchor", "middle")
      .classed("label", true);
    chart
      .selectAll(".bar")
      .data(selectedData, (data) => data._id)
      .exit()
      .remove();
    chart
      .selectAll(".label")
      .data(selectedData, (data) => data._id)
      .exit()
      .remove();
  }
  renderChart();
  const dataItems = d3.select(ref2.current)
  d3.select("#data").select("ul").selectAll("li").remove();
  const selectDiv = dataItems
    .select("ul")
    .append("li");
  const listItems = selectDiv
    .selectAll("all")
    .data(DUMMY_DATA)
    .enter()
    .append("li");
  listItems.append("span").text((data) => data[strng]?data[strng]:"N/A");
  listItems
    .append("input")
    .attr("type", "checkbox")
    .attr("checked", true)
    .on("change", (e) => {
      let data  = e.target.__data__
      if (unselectedIds.indexOf(data._id) === -1) {
        unselectedIds.push(data._id);
      } else {
        unselectedIds = unselectedIds.filter((id) => id !== data._id);
      }
      selectedData = DUMMY_DATA.filter((d) => {
        return unselectedIds.indexOf(d._id) === -1;
      });
      renderChart();
      // console.log(selectedData,unselectedIds);
    });
  })
  
  return (
    <div className="bchart">
        <h1>{titles}</h1>
        <div className="selectB">
          <label className="mylabel1">Enter a Page between 1-250</label>
              <label className='filtz'>Filter</label>
              <select onChange={ghis}  className='slct' name="cars" id="selectz">
                  <option value="intensity">Intensity</option>
                  <option value="relevance">Relevance</option>
                  <option value="likelihood">Likelihood</option>
                  <option value="topic">Topic</option>
                  <option value="source">Source</option>
                  <option value="country">Country</option>
                  <option value="region">Region</option>
                  <option value="sector">Sector</option>
              </select>
        </div>
        <MyForm childToParent={childToParent}/>
        <div id="app">
          <div id="chart">
            {/* <svg ref={ref1}/> */}
          </div>
          <div id="data" ref={ref2}>
            <ul></ul>
          </div>
        </div>
    </div>
  )
}
