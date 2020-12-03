import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import Footer from '../Footer';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
  content: {
    height: '100%',
  },
}));

const Minimal = (props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <main className={classes.content}>{children}</main>
      <Footer></Footer>
    </div>
  );
};

Minimal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Minimal;
