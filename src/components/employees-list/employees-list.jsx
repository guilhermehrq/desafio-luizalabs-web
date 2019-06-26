import React, { Component } from 'react';
import axios from 'axios';
import { Container, Header, Segment } from 'semantic-ui-react';
import EmployeesFilter from './employees-filter';
import EmployeesTable from './employees-table';

import { API_URL } from '../../utils/constants';

export default class EmployeesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        page: 1,
      },
      employees: [],
      totalRows: 0,
    };

    this.updateFilter = this.updateFilter.bind(this);
  }

  componentWillMount() {
    this.getEmployees();
  }

  updateFilter(newFilter) {
    let { filter } = this.state;

    filter = newFilter;

    this.setState({ filter });
    setTimeout(() => {
      this.getEmployees();
    });
  }

  async getEmployees() {
    try {
      let { filter, employees, totalRows } = this.state;

      const response = await axios.request({
        method: 'GET',
        baseURL: API_URL,
        url: '/employee',
        params: filter,
      });

      const employeesData = response.data.content;

      employees = employeesData.list;
      totalRows = employeesData.totalRows;

      this.setState({ employees, totalRows });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { employees, totalRows, filter } = this.state;

    return (
      <>
        <Container>
          <Segment>
            <Header as="h3">Filtro de funcionários</Header>
            <EmployeesFilter updateFilter={this.updateFilter} />
          </Segment>

          <EmployeesTable
            employeesList={employees}
            totalRows={totalRows}
            filter={filter}
            updateFilter={this.updateFilter}
          />
        </Container>
      </>
    );
  }
}
