import React, { Component } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import EmployeesFilter from './employees-filter';
import EmployeesTable from './employees-table';

export default class EmployeesList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Container>
          <Segment>
            <Header as="h3">Filtro de funcionários</Header>
            <EmployeesFilter />
          </Segment>

          <EmployeesTable />
        </Container>
      </>
    );
  }
}
