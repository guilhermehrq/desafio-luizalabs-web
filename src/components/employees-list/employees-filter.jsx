import React, { Component } from 'react';
import { Button, Form, Message, Icon } from 'semantic-ui-react';

export default class EmployeesFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        nome: '',
        cpf: '',
        dataCad: '',
        cargo: '',
        salarioMin: '',
        salarioMax: '',
        status: '',
      },
      statusList: [
        { key: 1, text: '', value: '' },
        { key: 2, text: 'Ativo', value: 'ATIVO' },
        { key: 3, text: 'Bloqueado', value: 'BLOQUEADO' },
        { key: 4, text: 'Inativo', value: 'INATIVO' },
      ],
    };
  }

  handleInputChange = (e, { name, value }) => {
    const { filter } = this.state;

    filter[name] = value;
    this.setState({ ...filter });
  };

  handleSelectChange = (e, { value }) => {
    const { filter } = this.state;

    filter.status = value;
    this.setState({ ...filter });
  };

  handleOnClean() {
    const INITIAL_FILTER = {
      nome: '',
      cpf: '',
      dataCad: '',
      cargo: '',
      salarioMin: '',
      salarioMax: '',
      status: '',
    };

    let { filter } = this.state;

    filter = INITIAL_FILTER;
    this.setState({ filter });
  }

  handleSubmit() {
    const { filter } = JSON.parse(JSON.stringify(this.state));

    filter.dataCad = this.formatDate(filter.dataCad);

    const newFilter = { ...filter, page: 1 };

    this.props.updateFilter(newFilter);
  }

  formatDate(date) {
    if (date) {
      return date
        .split('/')
        .reverse()
        .join('-');
    }
  }

  render() {
    const { statusList, filter } = this.state;

    return (
      <>
        <Form onSubmit={() => this.handleSubmit()}>
          <Form.Input
            fluid
            label="Nome"
            placeholder="Nome do funcionário"
            name="nome"
            value={filter.nome}
            onChange={this.handleInputChange}
          />
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="CPF"
              placeholder="CPF do funcionário"
              name="cpf"
              maxLength="11"
              value={filter.cpf}
              onChange={this.handleInputChange}
            />
            <Form.Input
              fluid
              label="Data de Cadastro"
              placeholder="DD/MM/YYYY"
              name="dataCad"
              value={filter.dataCad}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Cargo"
              placeholder="Cargo do funcionário"
              name="cargo"
              value={filter.cargo}
              onChange={this.handleInputChange}
            />
            <Form.Select
              options={statusList}
              label="Status"
              placeholder="Selecione..."
              name="status"
              value={filter.status}
              onChange={this.handleSelectChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Salário Mínimo"
              placeholder="Salário mínimo a ser buscado"
              name="salarioMin"
              value={filter.salarioMin}
              onChange={this.handleInputChange}
            />
            <Form.Input
              fluid
              label="Salário Máximo"
              placeholder="Salário máximo a ser buscado"
              name="salarioMax"
              value={filter.salarioMax}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Button icon labelPosition="left" primary type="submit">
            <Icon name="search" />
            Pesquisar
          </Button>
          <Button basic onClick={() => this.handleOnClean()} type="button">
            Limpar
          </Button>
        </Form>
      </>
    );
  }
}
