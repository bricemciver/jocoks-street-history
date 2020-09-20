import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import ErrorBoundary from './shared/error/error-boundary';
import AppRoutes from './routes';

const baseHref = () => {
  const base = document && document.querySelector('base');
  if (base) {
    const hrefAttr = base.getAttribute('href');
    if (hrefAttr) {
      return hrefAttr.replace(/\/$/, '');
    }
  }
  return '';
};

const useStyles = makeStyles({
  appContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%'
  }
})

export const App = () => {
  const classes = useStyles()
  return (
    <Router basename={baseHref()}>
      <div className={classes.appContainer}>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </div>
    </Router>
  );
};

export default App;
