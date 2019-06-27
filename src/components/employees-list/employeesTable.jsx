import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Menu, Pagination, Button, Icon } from 'semantic-ui-react';
import { PipeCpf, PipeDate, PipeMoney } from '../../utils/masksAndPipes.utils';

class EmployeesTable extends Component {
  constructor(props) {
    super(props);
  }

  generateTableRows() {
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
        onClick={() => this.props.history.push(`/funcionarios/${item.cpf}`)}
      >
        <Table.Cell>{PipeCpf(item.cpf)}</Table.Cell>
        <Table.Cell>{item.nome}</Table.Cell>
        <Table.Cell>{item.ufNasc}</Table.Cell>
        <Table.Cell>{item.cargo}</Table.Cell>
        <Table.Cell>{PipeMoney(item.salario)}</Table.Cell>
        <Table.Cell>{PipeDate(item.dataCad)}</Table.Cell>
        <Table.Cell>{item.status}</Table.Cell>
      </Table.Row>
    ));

    return list;
  }

  calculateTotalPages() {
    const { totalRows } = this.props;

    let totalPages;
    if (totalRows / 10 < 1) {
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

        <Table.Body>{this.generateTableRows()}</Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="7">
              <Button
                icon
                labelPosition="left"
                primary
                onClick={() => this.props.history.push('/funcionarios/novo')}
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
    );
  }
}

export default withRouter(EmployeesTable);
