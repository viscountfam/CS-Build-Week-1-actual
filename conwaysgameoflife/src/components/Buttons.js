import React from 'react'
import { ButtonToolbar, Dropdown, DropdownButton} from 'react-bootstrap'
export default function Buttons(props) {
   const  handleSelect = (evt) => {
        props.gridSize(evt)
    }
    return (
        <div className="center">
            <ButtonToolbar>
                <button className="btn btn-default" onClick={props.playButton}>Play</button>
                <button className="btn btn-default" onClick={props.pauseButton}>Pause</button>
                <button className="btn btn-default" onClick={props.clear}>clear</button>
                <button className="btn btn-default" onClick={props.seed}>Seed</button>
                <button className="btn btn-default" onClick={props.Slow}>Slow</button>
                <button className="btn btn-default" onClick={props.fast}>Fast</button>
                <DropdownButton
                    title="Grid Size"
                    id="Size-menu"
                    onSelect={handleSelect}
                    >
                    <Dropdown eventKey = "1">20 x 10</Dropdown>
                    <Dropdown eventKey = "2">50 x 50</Dropdown>
                    <Dropdown eventKey = "3">70 x 50</Dropdown>
                </DropdownButton>
            </ButtonToolbar>
        </div>
    )
}
