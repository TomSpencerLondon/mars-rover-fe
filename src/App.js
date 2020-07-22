import React, {useEffect, useState} from 'react';
import ContainedButtons from "./Button";

import {getObstacles, getRover, move, moveLeft, moveRight, postRover} from './api/marsRoverApi';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const width = 10;
const height = 10;
let obstacles = [];

function App() {

  const [grid, setGrid] = useState([]);

  useEffect(() => {
    fetchRoversAndObstacles();
  }, []);

  const fetchRoversAndObstacles = () => {
    let roverResponse;

    getRover().then((res) => {
      roverResponse = res;
    }).then(() => getObstacles()).then((res) => obstacles = res).then(() => {
      let uiGrid = computeGrid(roverResponse);
      setGrid(uiGrid);
    })
  }

  const uiNewRover = () => {
    postRover().then((res) => {
      let uiGrid = computeGrid(res);
      setGrid(uiGrid);
    });
  }

  const hasRover = (i, j, rovers) => {
    return rovers.some(r => {
      return (r.position.x === j) && (r.position.y === height - i - 1);
    });
  }


  const hasObstacles = (i, j) => {
    return obstacles.some(o => {
      return (o.x === j) && (o.y === height - i - 1);
    });
  }

  const uiMoveRover = () => {
    move().then((res) => {})
      .then(() => {
        return getRover()
      }).then((res) => {
        let uiGrid = computeGrid(res);
        setGrid(uiGrid);
      });
  }

  const uiMoveLeft = () => {
    moveLeft().then((res) => {})
      .then(() => {
        return getRover()
      }).then((res) => {
      let uiGrid = computeGrid(res);
      setGrid(uiGrid);
    });
  }

  const uiMoveRight = () => {
    moveRight().then((res) => {})
      .then(() => {
        return getRover()
      }).then((res) => {
      let uiGrid = computeGrid(res);
      setGrid(uiGrid);
    });
  }

  const computeGrid = (roverResponse) => {
    const rows = [];
    let rovers = roverResponse;

    for (let i = 0; i < width; i++) {
      let row = [];
      for (let j = 0; j < height; j++) {
        if (hasRover(i, j, rovers)){
          row.push(1);
        }else if (hasObstacles(i, j)){
          row.push(2);
        }else{
          row.push(0);
        }
      }
      rows.push(row);
    }

    return rows;
  }

  function getCellColor(i, k) {
    if (grid[i][k] === 2) {
      return 'green';
    }else if (grid[i][k] === 1) {
      return 'red';
    }else {
      return undefined;
    }
  }

  return (
    <>
      <Box
        height={"100vh"}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Button variant="contained" color="secondary" onClick={() => uiNewRover()}>
          Add Rover
        </Button>
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
                   backgroundColor: getCellColor(i, k),
                   border: 'solid 1px black'
                 }}/>
          ))
        )}
      </div>
      <ContainedButtons moveRover={uiMoveRover} moveLeft={uiMoveLeft} moveRight={uiMoveRight}/>
      </Box>
    </>
  );
}


export default App;
