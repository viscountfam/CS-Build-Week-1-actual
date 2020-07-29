import React from 'react'
import { Button, ButtonToolbar, Dropdown, DropdownButton} from 'react-bootstrap'
export default function Buttons(props) {
    const handleSelect = (evt) => {
        props.gridSize(evt)
    }
    return (
        <div className="center">
            <ButtonToolbar>
                <Button className="btn btn-default" onClick={props.playButton}>Play</Button>
                <Button className="btn btn-default" onClick={props.pauseButton}>Pause</Button>
                <Button className="btn btn-default" onClick={props.clear}>clear</Button>
                <Button className="btn btn-default" onClick={props.seed}>Seed</Button>
                <Button className="btn btn-default" onClick={props.Slow}>Slow</Button>
                <Button className="btn btn-default" onClick={props.fast}>Fast</Button>
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
