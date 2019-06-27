import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import EmployeesList from './employees-list/employeesList';
import EmployeesInfo from './employees-info/employeesInfo';
import EmployeesStates from './employees-states/employeesStates';

const Routes = () => (
  <Switch>
    <Route path="/" exact render={() => <Redirect to={{ pathname: '/funcionarios' }} />} />
    <Route path="/funcionarios" exact component={EmployeesList} />
    <Route path="/funcionarios/novo" component={EmployeesInfo} />
    <Route path="/funcionarios/:employeeId" component={EmployeesInfo} />
    <Route path="/analise-estados" component={EmployeesStates} />
  </Switch>
);

export default Routes;
