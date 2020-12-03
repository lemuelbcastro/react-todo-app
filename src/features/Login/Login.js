import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  LinearProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { login } from '../Authentication/authenticationSlice';
import validationSchema from './validationSchema';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const { control, handleSubmit, errors } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(validationSchema),
  });
  const { loading, isAuthenticated } = useSelector(
    (state) => state.authentication
  );
  const dispatch = useDispatch();

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <React.Fragment>
      {loading && <LinearProgress />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography variant="h3">{process.env.REACT_APP_NAME}</Typography>
          <Typography variant="subtitle1">System</Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit((data) => dispatch(login(data)))}
          >
            <Controller
              as={TextField}
              control={control}
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={errors.email ? true : false}
              helperText={errors?.email?.message}
            />
            <Controller
              as={TextField}
              control={control}
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={errors.password ? true : false}
              helperText={errors?.password?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
            >
              Log In
            </Button>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Login;
