import React, { Component } from 'react';
import axios from 'axios';
import MaskedInput from 'react-text-mask';
import {
  Button,
  Form,
  Container,
  Header,
  Segment,
  Icon,
  Confirm,
  Message,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { statusList, ufList } from '../../utils/constants.utils';
import { moneyMask, cpfMask, PipeCpf, PipeMoney } from '../../utils/masksAndPipes.utils';
import { validate } from './employeesInfoValidation';
import { toast } from 'react-toastify';

import { API_URL } from '../../utils/constants.utils';

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
      statusList: statusList,
      ufList: ufList,
      propertiesWithError: {},
      errorMessages: [],
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
    this.cleanInvalidInputs(name);
    this.setState({ employee });
  };

  handleChangeMaskedField = e => {
    const { employee } = this.state;

    employee[e.target.name] = e.target.value;
    this.cleanInvalidInputs(e.target.name);
    this.setState({ employee });
  };

  cleanInvalidInputs(name) {
    const { propertiesWithError } = this.state;

    propertiesWithError[name] = false;
    this.setState({ propertiesWithError });
  }

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
      toast.error(`Erro ao buscar funcionário. ${e}`);
    }
  }

  handleSubmit = async () => {
    try {
      const { employeeId } = this.props.match.params;
      const { employee } = JSON.parse(JSON.stringify(this.state));

      employee.cpf = employee.cpf.replace(/\D+/g, '');
      employee.salario = parseFloat(employee.salario.replace(',', '.').replace('R$ ', ''));

      const validationResults = await validate(employee);

      if (validationResults.errorMessages.length) {
        this.setState({
          errorMessages: validationResults.errorMessages,
          propertiesWithError: validationResults.propertiesWithError,
        });

        return;
      }

      this.setState({
        errorMessages: [],
        propertiesWithError: {},
      });

      if (!employeeId) {
        await axios.request({
          method: 'POST',
          baseURL: API_URL,
          url: '/employee',
          data: employee,
        });

        toast.success('Funcionário inserido com sucesso!');
      } else {
        await axios.request({
          method: 'PUT',
          baseURL: API_URL,
          url: `/employee/${employee.cpf}`,
          data: employee,
        });

        toast.success('Funcionário alterado com sucesso!');
      }

      this.props.history.push('/employees');
    } catch (e) {
      toast.error(`Erro ao inserir/alterar funcionário. ${e}`);
    }
  };

  handleDelete = async () => {
    try {
      const { employee } = this.state;

      employee.cpf = employee.cpf.replace(/\D+/g, '');

      await axios.request({
        method: 'DELETE',
        baseURL: API_URL,
        url: `/employee/${employee.cpf}`,
      });

      toast.success('Funcionário excluído com sucesso!');

      this.props.history.push('/employees');
    } catch (e) {
      toast.error(`Erro ao buscar funcionário. ${e}`);
    }
  };

  toggleDeleteModal = () => {
    let { openModal } = this.state;
    openModal = !openModal;
    this.setState({ openModal });
  };

  render() {
    const { employeeId } = this.props.match.params;
    const { employee, statusList, ufList, errorMessages, propertiesWithError } = this.state;

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
                  error={propertiesWithError.nome}
                />

                <Form.Field error={propertiesWithError.cpf}>
                  <label>CPF</label>
                  <MaskedInput
                    mask={cpfMask}
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
                  onChange={this.handleInputChange}
                  error={propertiesWithError.ufNasc}
                />

                <Form.Select
                  options={statusList}
                  label="Status"
                  placeholder="Selecione..."
                  name="status"
                  value={employee.status}
                  onChange={this.handleInputChange}
                  error={propertiesWithError.status}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Cargo"
                  placeholder="Dev Pl"
                  name="cargo"
                  value={employee.cargo}
                  onChange={this.handleInputChange}
                  error={propertiesWithError.cargo}
                />

                <Form.Field error={propertiesWithError.salario}>
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

            {errorMessages.length ? (
              <Message error header="Existem alguns campos incorreros" list={errorMessages} />
            ) : null}
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
