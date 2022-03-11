import React from 'react'
import "./filter.css"
import MyForm from './MyForm'
export default function Filter({childToParent}) {
  return (
    <div className="filter">
        <MyForm childToParent={childToParent}/>
    </div>
  )
}
