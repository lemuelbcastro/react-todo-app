import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  content: {
    paddingTop: 80,
    textAlign: 'center',
  },
  title: {
    fontSize: 80,
    lineHeight: '90%',
    marginBottom: theme.spacing(2),
  },
  children: {
    marginBottom: theme.spacing(4),
  },
  button: {
    marginBottom: theme.spacing(4),
  },
}));

const Error = (props) => {
  const { title, children } = props;
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={6} xs={12}>
          <div className={classes.content}>
            <Typography variant="h1" className={classes.title}>
              {title}
            </Typography>
            <Typography variant="subtitle2" className={classes.children}>
              {children}
            </Typography>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<HomeIcon />}
              onClick={() => history.push('/')}
            >
              Go to Home
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

Error.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Error;
