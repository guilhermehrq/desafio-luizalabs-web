import React, { Component } from 'react';
import { Button, Form, Message, Icon } from 'semantic-ui-react';

export default class EmployeesFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusList: [
        { key: 'A', text: 'Ativo', value: 'ATIVO' },
        { key: 'B', text: 'Bloqueado', value: 'BLOQUEADO' },
        { key: 'I', text: 'Inativo', value: 'INATIVO' },
      ],
    };
  }

  render() {
    const { statusList } = this.state;
    return (
      <>
        <Form>
          <Form.Input fluid label="Nome" placeholder="Nome do funcionário" />
          <Form.Group widths="equal">
            <Form.Input fluid label="CPF" placeholder="CPF do funcionário" />
            <Form.Input fluid label="Data de Cadastro" placeholder="DD/MM/YYYY" />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input fluid label="Cargo" placeholder="Cargo do funcionário" />
            <Form.Select options={statusList} label="Status" />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input fluid label="Salário Mínimo" />
            <Form.Input fluid label="Salário Máximo" />
          </Form.Group>
          <Button icon labelPosition="left" primary>
            <Icon name="search" />
            Pesquisar
          </Button>
          <Button basic>Limpar</Button>
        </Form>
      </>
    );
  }
}
