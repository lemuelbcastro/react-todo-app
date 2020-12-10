import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { SnackbarProvider } from 'notistack';
import DateFnsUtils from '@date-io/date-fns';

import { SnackbarHelperConfigurator } from '../utils/snackbarHelper';
import theme from '../theme';
import Routes from '../features/Routes';
import Spinner from '../features/Spinner';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Spinner />
      <SnackbarProvider>
        <SnackbarHelperConfigurator />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Routes />
        </MuiPickersUtilsProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
