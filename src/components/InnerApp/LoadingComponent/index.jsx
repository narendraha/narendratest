import React from 'react'
import LoadingIcon from "../../../images/loadinganim.gif"

export default function Loading() {
  return (
    <div className="loader_container">
        <img width={"100"} src={LoadingIcon} alt='Loading'/>
    </div>
  )
}
