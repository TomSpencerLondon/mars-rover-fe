import React, {useState, useEffect }  from 'react';
import ContainedButtons from "./Button";

import { move, getRover, moveLeft, moveRight, postRover } from './api/marsRoverApi';

const width = 10;
const height = 10;

function App() {

  const [rovers, setRovers] = useState([]);

  const [grid, setGrid] = useState([]);

  const fetchRovers = () => {
    postRover().then((response) => {
        setRovers(response);
        console.log(response, "this is the response in fetchRovers")
    }).then(() => drawGrid());
  }

  useEffect(() => {
    console.log("This is running");
    fetchRovers();
  }, []);

  function drawGrid() {
    const rows = [];
    let isEmpty = true;

    for (let i = 0; i < width; i++) {
      let row = [];
      for (let j = 0; j < height; j++) {
        rovers.forEach(r => {
          if ((r.position.x === j) && (r.position.y === height - i - 1)){
            row.push(1);
            isEmpty = false;
          }
        })
        if(isEmpty){
          row.push(0);
        }
      }

      rows.push(row);
    }
    setGrid(rows);
    return rows;
  }

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${height}, 20px)`,
        margin: 25
      }}>
        { grid.map((rows, i) =>
          rows.map((col, k) => (
            <div key={`${i}-${k}`}
                 style={{
                   width: 20,
                   height: 20,
                   backgroundColor: grid[i][k] ? 'pink' : undefined,
                   border: 'solid 1px black'
                 }}/>
          ))
        )}
      </div>
      <ContainedButtons move={move}/>
    </>
  );
}


export default App;
