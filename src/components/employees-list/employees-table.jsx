import React, { Component } from 'react';
import { Table, Menu, Pagination } from 'semantic-ui-react';

export default class EmployeesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
  }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage });

  render() {
    const { activePage } = this.state;
    return (
      <>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>CPF</Table.HeaderCell>
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.HeaderCell>UF</Table.HeaderCell>
              <Table.HeaderCell>Salário</Table.HeaderCell>
              <Table.HeaderCell>Data cadastro</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>123.456.789-09</Table.Cell>
              <Table.Cell>Funcionário Teste</Table.Cell>
              <Table.Cell>SP</Table.Cell>
              <Table.Cell>R$ 8500,00</Table.Cell>
              <Table.Cell>26/06/2019</Table.Cell>
              <Table.Cell>ATIVO</Table.Cell>
            </Table.Row>
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="6">
                <Menu floated="right" pagination>
                  <Pagination
                    size="mini"
                    boundaryRange={0}
                    activePage={activePage}
                    ellipsisItem={undefined}
                    siblingRange={1}
                    totalPages={10}
                    onPageChange={this.handlePaginationChange}
                  />
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </>
    );
  }
}
