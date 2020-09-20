import React from 'react';
import { Switch } from 'react-router-dom';

import Home from './modules/home/home';
import ErrorBoundaryRoute from './shared/error/error-boundary-route';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  viewRoutes: {
    height: '100%'
  }
})

const Routes = () => {
  const classes = useStyles()
  return (
  <div className={classes.viewRoutes}>
    <Switch>
      <ErrorBoundaryRoute path="/" component={Home} />
    </Switch>
  </div>
)};

export default Routes;
