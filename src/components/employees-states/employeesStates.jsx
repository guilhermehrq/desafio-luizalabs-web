import React, { Component } from 'react';
import { Table, Container, Header, Segment } from 'semantic-ui-react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import { BASE_URL } from '../../utils/constants.utils';

class EmployeesStates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeesStates: [],
    };
  }

  componentWillMount() {
    this.getEmployeesStates();
  }

  async getEmployeesStates() {
    let { employeesStates } = this.state;

    try {
      const response = await axios.request({
        method: 'GET',
        baseURL: BASE_URL,
        url: '/employee-states',
      });

      employeesStates = response.data.content;

      this.setState({ employeesStates });
    } catch (e) {
      toast.error(`Erro ao buscar funcinários. ${e}`);
    }
  }

  generateTableRows() {
    const { employeesStates } = this.state;

    if (!employeesStates.length) {
      return (
        <Table.Row>
          <Table.Cell colSpan="2">Nenhum funcionário encontrado...</Table.Cell>
        </Table.Row>
      );
    }

    const list = employeesStates.map(item => (
      <Table.Row key={item._id}>
        <Table.Cell>
          <Header as="h4">
            <Header.Content>{item._id}</Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>{item.count}</Table.Cell>
      </Table.Row>
    ));

    return list;
  }

  render() {
    return (
      <>
        <Container style={{ marginBottom: '16px' }}>
          <Segment>
          <Header as="h4">Lista de UFs e a quantidade de funcionários nascidos em cada uma</Header>
          <Table celled collapsing style={{ margin: '0 auto' }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>UF</Table.HeaderCell>
                <Table.HeaderCell>Quantidade de funcionários</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>{this.generateTableRows()}</Table.Body>
          </Table>
          </Segment>
        </Container>
      </>
    );
  }
}

export default withRouter(EmployeesStates);
