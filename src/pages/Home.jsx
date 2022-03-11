import React from 'react'
import {useEffect, useState} from "react"
import { useParams } from 'react-router-dom';
import { KeyboardDoubleArrowRight, KeyboardDoubleArrowLeft } from '@mui/icons-material';
import "./home.css";
export default function Home() {
    let {id} = useParams();
    const[datal,  setData] = useState(null);
    let testArticles = new Array(5);
    let pageArray = [];
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
    if(!id) id = 1;
    let idx = id>1?(id-1)*5:0;
    let extra = id>1?(id-1)*5:0;
    let len = testArticles.length+extra;
    let testIdx = 0;
    const [base,setBase] = useState(Math.ceil(id/10)*10);
    const [pIdx,setIdx] = useState(base-10);
    useEffect(()=>{
    })
    let m = 0;
    for(let i=pIdx;i<base;i++){
      pageArray[m] = {"num":i+1};
      m++;
    }
    // console.log(len)
      for(idx;idx<len;idx++){
        if(datal) testArticles[testIdx] = datal[idx];
        testIdx++;
    }
  return (
    <div className="home">
        {testArticles.map(({ id, title,url }) => (
             <div key={id} className="artis"> 
                <h2 >
                    {title}
                </h2>
                <a href={url}>{url}</a>
             </div>
    
          ))}
          <a className="anch" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">IMPORTANT! CLICK HERE!</a>
          <div className="blinkf">☝</div>
          <div className="parent">
              {base>10&&<div className="child"><button onClick={() =>{ 
                setBase(base - 10)
                setIdx(pIdx-10);
                }}><KeyboardDoubleArrowLeft/></button></div>}
              {pageArray.map(({num})=>(
                  <div key={num} className="child"><a href={"/"+num}>{num}</a></div>
              ))}
              {base<200&&<div className="child"><button onClick={() =>{ 
                setBase(base + 10)
                setIdx(pIdx+10);
                }}><KeyboardDoubleArrowRight/></button></div>}
          </div>
    </div>
  )
}
