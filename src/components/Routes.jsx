import React from 'react';
import { Switch, Route } from 'react-router-dom';

import EmployeesList from './employees-list/employees-list';
import EmployeesStates from './employees-states/employees-states';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={EmployeesList} />
    <Route path="/employees-states" component={EmployeesStates} />
  </Switch>
);

export default Routes;
