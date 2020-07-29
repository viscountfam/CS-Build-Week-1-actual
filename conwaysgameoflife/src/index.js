import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { ButtonToolbar, Dropdown, DropdownButton } from "react-bootstrap";
import './index.css';

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr))
}



function Box(props) {
  const selectBox = () => {
    props.selectBox(props.row, props.col)
  }
  console.log(props)
  return (
    <div className={props.boxClass}
      id={props.id}
      OnClick={selectBox}  
    />
  )
}

const Grid = props => {
  const width = props.cols * 14
  let rowsArr = [];
  let boxClass = "";
  for (var i = 0; i < props.rows; i++){
    for(var j = 0; j < props.cols; j++){
        let boxId = i+"_"+j;

        boxClass = props.gridFull[i][j] ? "box on" : "box off";
        rowsArr.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            row={i}
            col={j}
            selectBox={props.selectBox}
          >
          </Box>
        );
    }
  }
  return (
    <div className="grid" style={{width: width}}>
      {rowsArr}
    </div>

  )
}

function Buttons(props) {
  const handleSelect = (evt) => {
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

function Main() {
  const [speed, setSpeed] = useState(100)
  const [rows, setRows] = useState(5)
  const [cols, setCols] = useState(5)
  const empty = Array(rows).fill().map(() => Array(cols).fill(false))
  const [generation, setGeneration] = useState(0)
  const [gridFull, setGridFull] = useState(empty)
  const [intervalID, setIntervalID] = useState(null)
  const selectBox = (row, col) => {
      let gridCopy = arrayClone(gridFull);
      gridCopy[row][col] = !gridCopy[row][col];
      setGridFull(gridCopy)
  }

  const seed = () => {
      let gridCopy = arrayClone(gridFull);
      for (let i =0; i < rows; i++){
          for(let j = 0; j < cols; j++){
              if (Math.floor(Math.random() * 4) === 1){
                  gridCopy[i][j] = true
              }
          }
      }
      setGridFull(gridCopy)
  }

  const playButton = () => {
      setIntervalID(setInterval(play, speed))
  }

  const pauseButton = (IntervalID) => {
      // setIntervalID(clearInterval(intervalID))
      clearInterval(IntervalID)
  }

  const slow = () => {
      setSpeed(1000)
      playButton()
  }

  const fast = () => {
      setSpeed(10)
      playButton()
  }

  const clear = () => {
      setGridFull(empty)
  }

  const gridSize = (size) => {
      switch(size) {
          case "1":
              setCols(20)
              setRows(10)
          break;
          case "2":
              setCols(50)
              setRows(30)
          break;
          case "3":
              setCols(70)
              setRows(50)
          break;
          default:
              break
      }
      clear()
  }



  const play = () => {
      let g = gridFull
      let g2 = arrayClone(gridFull)

      
  for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            let count = 0;
            if (i > 0) if (g[i - 1][j]) count++;
            if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
            if (i > 0 && j < cols - 1) if (g[i - 1][j + 1]) count++;
            if (j < cols - 1) if (g[i][j + 1]) count++;
            if (j > 0) if (g[i][j - 1]) count++;
            if (i < rows - 1) if (g[i + 1][j]) count++;
            if (i < rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
            if (i < rows - 1 && j < cols - 1) if (g[i + 1][j + 1]) count++;
            if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
            if (!g[i][j] && count === 3) g2[i][j] = true;
          }
      }
      setGridFull(g2)
      setGeneration(generation + 1)
  }
  useEffect(() => {
     seed() 
     playButton()
  }, [])
  return (
      <div>
          <h1>Conway's Game of Life</h1>
          <Buttons
              playButton={playButton}
              pauseButton={pauseButton}
              slow={slow}
              fast={fast}
              clear={clear}
              seed={seed}
              gridSize={gridSize}
          />
          <Grid gridFull={gridFull} rows={rows} cols={cols} selectBox={selectBox}
          />
          <h2>Generations: {generation}</h2>
      </div>
  )
}


ReactDOM.render(<Main />, document.getElementById("root"))
