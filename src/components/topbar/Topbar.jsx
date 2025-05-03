import React from "react";
import "./topbar.css"
import {NotificationsNone, Settings} from '@mui/icons-material';
export default function TopBar(){
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">Joe985</span>
                </div>
                <div className="topRight">
                    <div className="topBarIconContainer">
                         <NotificationsNone/>
                         <span className="topIconBadge">2</span>
                    </div>
                    <div className="topBarIconContainer">
                         <Settings/>
                    </div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbihMGgw_XHZoxpG7Rr2fwb0TmmUi1yQoPVw&usqp=CAU" alt="" className="topAvatar"/>
                </div>
            </div>
        </div>
    )
}