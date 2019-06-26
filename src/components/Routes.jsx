import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import EmployeesList from './employees-list/employees-list';
import EmployeesInfo from '../components/employees-info/employees-info';
import EmployeesStates from './employees-states/employees-states';

const Routes = () => (
  <Switch>
    <Route path="/" exact render={() => <Redirect to={{ pathname: '/employees' }} />} />
    <Route path="/employees" exact component={EmployeesList} />
    <Route path="/employees/new" component={EmployeesInfo} />
    <Route path="/employees/:employeeId" component={EmployeesInfo} />
    <Route path="/employees-states" component={EmployeesStates} />
  </Switch>
);

export default Routes;
