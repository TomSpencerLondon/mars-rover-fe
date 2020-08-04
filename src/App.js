import React, { useEffect, useState } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {
  getObstacles, getRover, move, moveLeft, moveRight, postRover, deleteRovers
} from './api/marsRoverApi';
import ContainedButtons from './Button';

const width = 10;
const height = 10;
let obstacles = [];
let selectedRovers = [];

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}));

function App() {
  const classes = useStyles();

  const [grid, setGrid] = useState([]);

  const fetchRoversAndObstacles = () => {
    let roverResponse;

    getRover().then((res) => {
      roverResponse = res;
    }).then(() => {
      return getObstacles();
    }).then((res) => obstacles = res)
      .then(() => {
        const uiGrid = computeGrid(roverResponse);
        setGrid(uiGrid);
      });
  };

  useEffect(() => {
    fetchRoversAndObstacles();
  }, []);



  const uiNewRover = () => {
    postRover().then((res) => {
      const uiGrid = computeGrid(res);
      setGrid(uiGrid);
    });
  };

  const uiDeleteRovers = () => {
    deleteRovers().then((res) => {
      selectedRovers = [];
      const uiGrid = computeGrid(res);
      setGrid(uiGrid);
    });
  };

  const hasRover = (i, j, rovers) => rovers.find((r) => (r.position.x === j) && (r.position.y === height - i - 1));

  const hasObstacles = (i, j) => obstacles.some((o) => (o.x === j) && (o.y === height - i - 1));

  const uiMoveRover = () => {
    if (selectedRovers && selectedRovers.length) {
      move(selectedRovers).then((res) => {
      })
        .then(() => getRover()).then((res) => {
          const uiGrid = computeGrid(res);
          setGrid(uiGrid);
        });
    }
  };

  const uiMoveLeft = () => {
    if (selectedRovers && selectedRovers.length) {
      moveLeft(selectedRovers).then((res) => {})
        .then(() => getRover()).then((res) => {
          const uiGrid = computeGrid(res);
          setGrid(uiGrid);
        });
    }
  };

  const uiMoveRight = () => {
    if (selectedRovers && selectedRovers.length) {
      moveRight(selectedRovers).then((res) => {
      })
        .then(() => getRover()).then((res) => {
          const uiGrid = computeGrid(res);
          setGrid(uiGrid);
        });
    }
  };

  const computeGrid = (roverResponse) => {
    const rows = [];
    const rovers = roverResponse;

    for (let i = 0; i < width; i++) {
      const row = [];
      for (let j = 0; j < height; j++) {
        const rover = hasRover(i, j, rovers);

        if (rover !== undefined) {
          rover.type = 'rover';
          row.push(rover);
        } else if (hasObstacles(i, j)) {
          row.push({ type: 'obstacle' });
        } else {
          row.push({ type: 'empty' });
        }
      }
      rows.push(row);
    }

    return rows;
  };

  const getCellColor = (i, k) => {
    if (grid[i][k].type === 'obstacle') {
      return 'green';
    } if (grid[i][k].type === 'rover') {
      if (selectedRovers.includes(grid[i][k].id)) {
        return 'red';
      }
      return 'silver';
    }
    return undefined;
  };

  const handleRoverClick = (event) => {
    const l = event.currentTarget.dataset.x;
    const m = event.currentTarget.dataset.y;
    const newGrid = JSON.parse(JSON.stringify(grid));
    const rover = newGrid[l][m];
    if (rover.type === 'rover') {
      rover.selected = !rover.selected;
      if (rover.selected === true) {
        selectedRovers.push(rover.id);
      } else {
        selectedRovers = selectedRovers.filter((id) => id !== rover.id);
      }
    }

    setGrid(newGrid);
  };

  return (
    <>
      <Box
        height="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <div className={classes.root}>
          <Button variant="contained" color="primary" onClick={() => uiDeleteRovers()}>
            Clear Grid
          </Button>
          <Button variant="contained" color="secondary" onClick={() => uiNewRover()}>
            Add Rover
          </Button>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${height}, 20px)`,
          margin: 25
        }}
        >
          { grid.map((rows, i) => rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              data-x={`${i}`}
              data-y={`${k}`}
              style={{
                width: 20,
                height: 20,
                backgroundColor: getCellColor(i, k),
                border: 'solid 1px black'
              }}
              onClick={handleRoverClick}
            />
          )))}
        </div>
        <ContainedButtons moveRover={uiMoveRover} moveLeft={uiMoveLeft} moveRight={uiMoveRight} />
      </Box>
    </>
  );
}

export default App;
