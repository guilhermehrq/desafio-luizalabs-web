import React, { Component } from 'react';
import { Table, Menu, Pagination, Button, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class EmployeesTable extends Component {
  constructor(props) {
    super(props);
  }

  getTableRows() {
    const { employeesList } = this.props;

    if (!employeesList.length) {
      return (
        <Table.Row>
          <Table.Cell colSpan="7">Nenhum funcionário encontrado...</Table.Cell>
        </Table.Row>
      );
    }

    const list = employeesList.map(item => (
      <Table.Row
        style={{ cursor: 'pointer' }}
        key={item._id}
        warning={item.status === 'INATIVO'}
        negative={item.status === 'BLOQUEADO'}
        onClick={() => this.props.history.push(`/employees/${item.cpf}`)}
      >
        <Table.Cell>{item.cpf}</Table.Cell>
        <Table.Cell>{item.nome}</Table.Cell>
        <Table.Cell>{item.ufNasc}</Table.Cell>
        <Table.Cell>{item.cargo}</Table.Cell>
        <Table.Cell>R$ {item.salario}</Table.Cell>
        <Table.Cell>{this.formatDate(item.dataCad)}</Table.Cell>
        <Table.Cell>{item.status}</Table.Cell>
      </Table.Row>
    ));

    return list;
  }

  formatDate(date) {
    const formattedDate = `${date.split('T')[0]}T03:00:00`;
    const dateObject = new Date(formattedDate);
    return dateObject.toLocaleDateString();
  }

  calculateTotalPages() {
    const { totalRows } = this.props;

    let totalPages;
    if (Math.ceil(totalRows / 10) < 1) {
      totalPages = 1;
    } else {
      totalPages = Math.ceil(totalRows / 10);
    }

    return totalPages;
  }

  handlePaginationChange = (e, { activePage }) => {
    const { filter } = this.props;

    filter.page = activePage;
    this.props.updateFilter(filter);
  };

  render() {
    const { filter } = this.props;

    return (
      <>
        <Table celled style={{ marginBottom: '16px' }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>CPF</Table.HeaderCell>
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.HeaderCell>UF</Table.HeaderCell>
              <Table.HeaderCell>Cargo</Table.HeaderCell>
              <Table.HeaderCell>Salário</Table.HeaderCell>
              <Table.HeaderCell>Data cadastro</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{this.getTableRows()}</Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="7">
                <Button
                  icon
                  labelPosition="left"
                  primary
                  onClick={() => this.props.history.push('/employees/new')}
                >
                  <Icon name="add" />
                  Novo funcionário
                </Button>
                <Menu floated="right" pagination>
                  <Pagination
                    size="mini"
                    boundaryRange={0}
                    activePage={filter.page}
                    ellipsisItem={undefined}
                    siblingRange={1}
                    totalPages={this.calculateTotalPages()}
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

export default withRouter(EmployeesTable);
