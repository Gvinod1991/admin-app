import React from 'react'
import './style.scss'
export const LoaderComponent = ({key, message}) => {
    return(
        <div className="loader-center" key={key ? key : 0}>
            <div className="loader-wrapper">
                <div className="loader-spin"></div>
                <span>{message ? message : "Loading..." }</span>
            </div>
        </div>
    )
}
