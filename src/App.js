import React, {useEffect, useState} from 'react';
import ContainedButtons from "./Button";

import {getObstacles, getRover, move, moveLeft, moveRight, postRover} from './api/marsRoverApi';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const width = 10;
const height = 10;
let obstacles = [];
let selectedRovers = [];

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
    return rovers.find(r => {
      return (r.position.x === j) && (r.position.y === height - i - 1);
    });
  }


  const hasObstacles = (i, j) => {
    return obstacles.some(o => {
      return (o.x === j) && (o.y === height - i - 1);
    });
  }

  const uiMoveRover = () => {
    if (selectedRovers && selectedRovers.length) {

      move(selectedRovers).then((res) => {
      })
        .then(() => {
          return getRover()
        }).then((res) => {
        let uiGrid = computeGrid(res);
        setGrid(uiGrid);
      });
    }
  }

  const uiMoveLeft = () => {
    if (selectedRovers && selectedRovers.length){
      moveLeft(selectedRovers).then((res) => {})
        .then(() => {
          return getRover()
        }).then((res) => {
        let uiGrid = computeGrid(res);
        setGrid(uiGrid);
      });
    }
  }

  const uiMoveRight = () => {
    if (selectedRovers && selectedRovers.length) {
      moveRight(selectedRovers).then((res) => {
      })
        .then(() => {
          return getRover()
        }).then((res) => {
        let uiGrid = computeGrid(res);
        setGrid(uiGrid);
      });
    }
  }

  const computeGrid = (roverResponse) => {
    const rows = [];
    let rovers = roverResponse;

    for (let i = 0; i < width; i++) {
      let row = [];
      for (let j = 0; j < height; j++) {
        let rover = hasRover(i, j, rovers);

        if (rover !== undefined){
          rover.type = 'rover';
          row.push(rover);
        }else if (hasObstacles(i, j)){
          row.push({type: 'obstacle'});
        }else{
          row.push({type: 'empty'});
        }
      }
      rows.push(row);
    }

    return rows;
  }

  const getCellColor = (i, k) => {
    if (grid[i][k].type === 'obstacle') {
      return 'green';
    }else if (grid[i][k].type === 'rover') {
      if (selectedRovers.includes(grid[i][k].id)){
        return 'red';
      } else {
        return 'silver';
      }
    }else {
      return undefined;
    }
  }

  const handleRoverClick = (event) => {
    let l = event.currentTarget.dataset.x;
    let m = event.currentTarget.dataset.y;
    const newGrid = JSON.parse(JSON.stringify(grid));
    let rover = newGrid[l][m];
    if (rover.type === 'rover'){
      rover.selected = !rover.selected
      if (rover.selected === true){
        selectedRovers.push(rover.id);
      } else {
        selectedRovers = selectedRovers.filter((id) => {
          return id !== rover.id
        });
      }
    }

    setGrid(newGrid);
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
                 data-x={`${i}`}
                 data-y={`${k}`}
                 style={{
                   width: 20,
                   height: 20,
                   backgroundColor: getCellColor(i, k),
                   border: 'solid 1px black',
                 }}
                 onClick={ handleRoverClick }
            >
            </div>
          ))
        )}
      </div>
      <ContainedButtons moveRover={uiMoveRover} moveLeft={uiMoveLeft} moveRight={uiMoveRight}/>
      </Box>
    </>
  );
}


export default App;
