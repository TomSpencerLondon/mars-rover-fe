import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: '20px'
  },
  italic: {
    fontStyle: 'italic'
  }
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Typography variant="h6">
          Mars Rover -
          {' '}
          <span className={classes.italic}>click the square to move the rover!</span>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
