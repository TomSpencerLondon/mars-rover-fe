import React, {useState, useEffect }  from 'react';
import ContainedButtons from "./Button";

import { move, getRover, moveLeft, moveRight, postRover } from './api/marsRoverApi';

const width = 10;
const height = 10;

function App() {

  const [rover, setRover] = useState({
    position: {
      x: 0,
      y: 0
    },
    direction: "N",
    blocked: false
  });

  const fetchRover = () => {
    getRover().then((roverResponse) => {
      setRover(roverResponse);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchRover();
    const refreshBoardInterval = setInterval(() => {
      fetchRover();
    }, 2000);
    return () => clearInterval(refreshBoardInterval);
  }, []);

  const handleMove = () => {

    move({command: "M"}).then((newRover) => {
      setRover(fetchRover);
    }).catch();
  }

  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < width; i++){
      let row = [];
      for (let j = 0; j < height; j++){
        if ((rover.position.x === j) && (rover.position.y === height - i - 1)){
          row.push(1);
        }else{
          row.push(0);
        }
      }
      rows.push(row);
    }
    return rows;
  });


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
