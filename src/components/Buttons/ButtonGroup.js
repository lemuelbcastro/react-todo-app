import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(0.5),
    '& > *': { margin: theme.spacing(0.5) },
  },
}));

const ButtonGroup = (props) => {
  const classes = useStyles();
  const { children } = props;

  return <div className={classes.root}>{children}</div>;
};

ButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ButtonGroup;
