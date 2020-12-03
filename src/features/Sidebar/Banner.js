import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
  },
  name: {
    marginTop: theme.spacing(1),
  },
}));

const Banner = (props) => {
  const classes = useStyles();

  const { heading, subheading } = props;

  return (
    <div className={classes.root}>
      <Typography className={classes.name} variant="h4">
        {heading}
      </Typography>
      <Typography variant="body2">{subheading}</Typography>
    </div>
  );
};

Banner.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired,
};

export default Banner;
