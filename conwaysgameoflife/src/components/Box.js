import React from 'react'

export default function Box(props) {
    // const selectBox = () => {
    //     props.selectBox(props.row, props.col)
    // }
    return (
        <div
        className = {props.boxClass}>
        id = {props.id}
        onclick={props.selectBox}
        </div>
    )
}
