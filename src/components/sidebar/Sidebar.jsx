import {LineStyle,SsidChart, BarChart, PieChart} from "@mui/icons-material";
import { Routes,Route,BrowserRouter,Link } from "react-router-dom";
import {useState,useEffect} from "react";
import React from "react";
import "./sidebar.css"
import Home from "../../pages/Home";
import SLChart from "../../pages/SLChart";
import BChart from "../../pages/BChart";
import PChart from "../../pages/PChart";
export default function Sidebar(){
    const[datal,  setData] = useState(null);
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
    return( 
        <BrowserRouter> 
             <div className="sidebar">
                <div className="sidebarWrapper">
                    <div className="sidebarMenu">
                        <h3 className="sidebarTitle">Dashboard</h3>
                        <ul className="sidebarList">
                                            <li className="sidebarListItem active">
                                              <a href="/">
                                                <LineStyle className="sidebarIcon"/>
                                                </a>
                                                Home
                                            </li>
                                        <li className="sidebarListItem">
                                        <Link to="/chart" state={datal}>
                                            <SsidChart className="sidebarIcon"/>
                                        </Link>
                                        Simple Line Chart
                                        </li>
                                        <li className="sidebarListItem">
                                           <Link to ="/bar-chart" state={datal}>
                                              <BarChart className="sidebarIcon"/>
                                           </Link>
                                            Bar Chart
                                        </li>
                                        <li className="sidebarListItem">
                                            <Link to ="/pie-chart" state={datal}>
                                                <PieChart className="sidebarIcon"/>
                                           </Link>
                                            Pie Chart
                                        </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Routes>
                     <Route path="/:id" element={<Home/>}/>
                     <Route path="/chart" element={<SLChart/>}/>
                     <Route path = "/" element={<Home/>}/>
                     <Route path="/bar-chart" element={<BChart/>}/>
                     <Route path="/pie-chart" element={<PChart/>}/>
                </Routes>
            </BrowserRouter>
    )
}