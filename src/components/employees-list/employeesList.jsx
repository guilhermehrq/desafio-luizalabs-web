import React, { Component } from 'react';
import axios from 'axios';
import { Container, Header, Segment } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import EmployeesFilter from './filter/employeesFilter';
import EmployeesTable from './employeesTable';

import { BASE_URL } from '../../utils/constants.utils';

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

  async getEmployees() {
    try {
      let { filter, employees, totalRows } = this.state;

      const response = await axios.request({
        method: 'GET',
        baseURL: BASE_URL,
        url: '/employee',
        params: filter,
      });

      const employeesData = response.data.content;

      employees = employeesData.list;
      totalRows = employeesData.totalRows;

      this.setState({ employees, totalRows });
    } catch (e) {
      toast.error(`Erro ao buscar funcinários. ${e}`);
    }
  }

  updateFilter(newFilter) {
    let { filter } = this.state;

    filter = newFilter;
    this.setState({ filter });

    setTimeout(() => {
      this.getEmployees();
    });
  }

  render() {
    const { employees, totalRows, filter } = this.state;

    return (
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
    );
  }
}
