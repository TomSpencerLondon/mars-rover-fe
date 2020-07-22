import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ContainedButtons({ moveRover, moveLeft, moveRight }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="contained" onClick={() => moveLeft()}><RotateLeftIcon /></Button>
      <Button variant="contained" color="primary" onClick={() => moveRover()}>
        Move
      </Button>
      <Button variant="contained" color="secondary" onClick={() => moveRight()}>
        <RotateRightIcon />
      </Button>
    </div>
  );
}
