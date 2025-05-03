import { useState } from "react";
import React from 'react'
export default function MyForm({childToParent}) {
  const [page,setPage] = useState(0);
  const handleSubmit = (e)=>{
      e.preventDefault();
      childToParent(page);
      }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="childs">
                <input type="text" onChange={(e)=>setPage(e.target.value)}></input>
            </div>
            <div className="submitsc">
                <input type="submit" />
            </div>
        </form>
    </div>
  )
}
