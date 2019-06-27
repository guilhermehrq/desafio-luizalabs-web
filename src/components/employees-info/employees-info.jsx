import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, Container, Header, Segment, Icon, Confirm } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { ufList } from './employeeInfoUtils';
import MaskedInput from 'react-text-mask';
import { moneyMask, PipeCpf, PipeMoney } from '../../utils/maskAndPipes';

import { API_URL } from '../../utils/constants';

class EmployeesInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: {
        nome: '',
        cpf: '',
        ufNasc: '',
        cargo: '',
        salario: '',
        status: '',
      },
      statusList: [
        { key: 1, text: 'Ativo', value: 'ATIVO' },
        { key: 2, text: 'Bloqueado', value: 'BLOQUEADO' },
        { key: 3, text: 'Inativo', value: 'INATIVO' },
      ],
      ufList: ufList,
    };
  }

  componentWillMount() {
    const { employeeId } = this.props.match.params;
    if (employeeId) {
      this.handleGetEmloyee(employeeId);
    }
  }

  handleInputChange = (e, { name, value }) => {
    const { employee } = this.state;

    employee[name] = value;
    this.setState({ employee });
  };

  handleChangeMaskedField = e => {
    const { employee } = this.state;
    employee[e.target.name] = e.target.value;
    this.setState({ employee });
  };

  handleSelectChange = (e, { value, name }) => {
    const { employee } = this.state;

    employee[name] = value;
    this.setState({ employee });
  };

  async handleGetEmloyee(employeeId) {
    try {
      const response = await axios.request({
        method: 'GET',
        baseURL: API_URL,
        url: `/employee/${employeeId}`,
      });

      const employee = response.data.content;

      employee.cpf = PipeCpf(employee.cpf);
      employee.salario = PipeMoney(employee.salario);

      this.setState({ employee });
    } catch (e) {
      console.log(e);
    }
  }

  handleSubmit = async () => {
    try {
      const { employeeId } = this.props.match.params;
      const { employee } = JSON.parse(JSON.stringify(this.state));

      employee.cpf = employee.cpf.replace(/\D+/g, '');
      employee.salario = parseFloat(employee.salario.replace(',', '.').replace('R$ ', ''));

      if (!employeeId) {
        await axios.request({
          method: 'POST',
          baseURL: API_URL,
          url: '/employee',
          data: employee,
        });
      } else {
        await axios.request({
          method: 'PUT',
          baseURL: API_URL,
          url: `/employee/${employee.cpf}`,
          data: employee,
        });
      }

      this.props.history.push('/employees');
    } catch (e) {
      console.log(e);
    }
  };

  handleDelete = async () => {
    try {
      const { employee } = this.state;

      await axios.request({
        method: 'DELETE',
        baseURL: API_URL,
        url: `/employee/${employee.cpf}`,
      });

      this.props.history.push('/employees');
    } catch (e) {
      console.log(e);
    }
  };

  toggleDeleteModal = () => {
    let { openModal } = this.state;
    openModal = !openModal;
    this.setState({ openModal });
  };

  render() {
    const { employeeId } = this.props.match.params;
    const { employee, statusList, ufList } = this.state;

    return (
      <>
        <Container>
          <Segment>
            <Header as="h3">{employeeId ? 'Alterando' : 'Cadastro de'} funcionário</Header>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Nome"
                  placeholder="Fulano de Tal"
                  name="nome"
                  value={employee.nome}
                  onChange={this.handleInputChange}
                />
                {/* <Form.Input
                  fluid
                  label="CPF"
                  placeholder="CPF do funcionário"
                  name="cpf"
                  maxLength="11"
                  value={employee.cpf}
                  onChange={this.handleInputChange}
                  readOnly={employeeId}
                /> */}
                <Form.Field>
                  <label>CPF</label>
                  <MaskedInput
                    mask={[
                      /\d/,
                      /\d/,
                      /\d/,
                      '.',
                      /\d/,
                      /\d/,
                      /\d/,
                      '.',
                      /\d/,
                      /\d/,
                      /\d/,
                      '-',
                      /\d/,
                      /\d/,
                    ]}
                    guide={false}
                    placeholder="434.123.123-12"
                    name="cpf"
                    value={employee.cpf}
                    onChange={this.handleChangeMaskedField}
                    readOnly={employeeId}
                  />
                </Form.Field>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Select
                  options={ufList}
                  label="UF de nascimento"
                  placeholder="Selecione..."
                  name="ufNasc"
                  value={employee.ufNasc}
                  onChange={this.handleSelectChange}
                />
                <Form.Input
                  fluid
                  label="Cargo"
                  placeholder="Dev Pl"
                  name="cargo"
                  value={employee.cargo}
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Select
                  options={statusList}
                  label="Status"
                  placeholder="Selecione..."
                  name="status"
                  value={employee.status}
                  onChange={this.handleSelectChange}
                />
                <Form.Field>
                  <label>Salário</label>
                  <MaskedInput
                    mask={moneyMask}
                    guide={false}
                    placeholder="1000,00"
                    name="salario"
                    value={employee.salario}
                    onChange={this.handleChangeMaskedField}
                  />
                </Form.Field>
              </Form.Group>

              <Button icon labelPosition="left" positive type="submit">
                <Icon name="check" />
                Salvar
              </Button>
              {employeeId ? (
                <Button basic onClick={this.toggleDeleteModal} type="button" color="red">
                  Excluir
                </Button>
              ) : null}
            </Form>
          </Segment>
        </Container>

        <Confirm
          open={this.state.openModal}
          onCancel={this.toggleDeleteModal}
          onConfirm={this.handleDelete}
          content="Deseja mesmo excluir o funcionário?"
          cancelButton="Cancelar"
          confirmButton="Excluir"
        />
      </>
    );
  }
}

export default withRouter(EmployeesInfo);
