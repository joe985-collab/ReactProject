import {LineStyle, Timeline, TrendingUp} from "@mui/icons-material";
import React from "react";
import "./sidebar.css"
export default function Sidebar(){
    return(
        <div className="sidebar">
           <div className="sidebarWrapper">
               <div className="sidebarMenu">
                   <h3 className="sidebarTitle">Dashboard</h3>
                   <ul className="sidebarList">
                       <li className="sidebarListItem active">
                           <LineStyle className="sidebarIcon"/>
                           Home
                        </li>
                        <li className="sidebarListItem">
                           <Timeline className="sidebarIcon"/>
                           Analytics
                        </li>
                        <li className="sidebarListItem">
                           <TrendingUp className="sidebarIcon"/>
                           Sales
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                   <h3 className="sidebarTitle">QuickMenu</h3>
                   <ul className="sidebarList">
                       <li className="sidebarListItem active">
                           <LineStyle className="sidebarIcon"/>
                           Home
                        </li>
                        <li className="sidebarListItem">
                           <Timeline className="sidebarIcon"/>
                           Analytics
                        </li>
                        <li className="sidebarListItem">
                           <TrendingUp className="sidebarIcon"/>
                           Sales
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                   <h3 className="sidebarTitle">Notifications</h3>
                   <ul className="sidebarList">
                       <li className="sidebarListItem active">
                           <LineStyle className="sidebarIcon"/>
                           Home
                        </li>
                        <li className="sidebarListItem">
                           <Timeline className="sidebarIcon"/>
                           Analytics
                        </li>
                        <li className="sidebarListItem">
                           <TrendingUp className="sidebarIcon"/>
                           Sales
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                   <h3 className="sidebarTitle">Staff</h3>
                   <ul className="sidebarList">
                       <li className="sidebarListItem active">
                           <LineStyle className="sidebarIcon"/>
                           Home
                        </li>
                        <li className="sidebarListItem">
                           <Timeline className="sidebarIcon"/>
                           Analytics
                        </li>
                        <li className="sidebarListItem">
                           <TrendingUp className="sidebarIcon"/>
                           Sales
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}