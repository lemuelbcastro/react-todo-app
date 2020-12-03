import React from 'react';
import { useSelector } from 'react-redux';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.appBar + 1,
    color: '#fff',
  },
}));

const Spinner = () => {
  const classes = useStyles();
  const open = useSelector((state) => state.spinner.open);

  return (
    <div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress size={60} color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Spinner;
