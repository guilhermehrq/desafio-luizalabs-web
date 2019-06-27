import React, { Component } from 'react';
import { Button, Form, Message, Icon } from 'semantic-ui-react';
import MaskedInput from 'react-text-mask';
import { moneyMask, cpfMask } from '../../../utils/masksAndPipes.utils';
import { validate, prepareData } from './employeefilterValidation';
import { statusList } from '../../../utils/constants.utils';

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
        page: 1,
      },
      statusList: statusList,
      propertiesWithError: {},
      errorMessages: [],
    };
  }

  handleInputChange = (e, { name, value }) => {
    const { filter } = this.state;

    filter[name] = value;
    this.cleanInvalidInputs(name);
    this.setState({ ...filter });
  };

  handleChangeMaskedField = e => {
    const { filter } = this.state;

    filter[e.target.name] = e.target.value;
    this.cleanInvalidInputs(e.target.name);
    this.setState({ ...filter });
  };

  cleanInvalidInputs(name) {
    const { propertiesWithError } = this.state;
    propertiesWithError[name] = false;
    this.setState({ propertiesWithError });
  }

  async handleSubmit() {
    let { filter } = JSON.parse(JSON.stringify(this.state));

    filter = prepareData(filter);

    const validationResults = await validate(filter);

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

    const newFilter = { ...filter, page: 1 };
    this.props.updateFilter(newFilter);
  }

  handleOnClean() {
    const INITIAL_FILTER = {
      nome: '',
      cpf: '',
      dataCad: '',
      cargo: '',
      salarioMin: '',
      salarioMax: '',
      status: '',
      page: 1,
    };

    let { filter } = this.state;

    filter = INITIAL_FILTER;
    this.setState({ filter, errorMessages: [], propertiesWithError: {} });
    this.props.updateFilter(filter);
  }

  render() {
    const { statusList, filter, propertiesWithError, errorMessages } = this.state;

    return (
      <>
        <Form onSubmit={() => this.handleSubmit()}>
          <Form.Input
            fluid
            label="Nome"
            placeholder="Fulano de Tal"
            name="nome"
            value={filter.nome}
            onChange={this.handleInputChange}
          />
          <Form.Group widths="equal">
            <Form.Field error={propertiesWithError.cpf}>
              <label>CPF</label>
              <MaskedInput
                mask={cpfMask}
                guide={false}
                placeholder="434.123.123-12"
                name="cpf"
                value={filter.cpf}
                onChange={this.handleChangeMaskedField}
              />
            </Form.Field>
            <Form.Field error={propertiesWithError.dataCad}>
              <label>Data de Cadastro</label>
              <MaskedInput
                mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                guide={false}
                placeholder="26/06/2019"
                name="dataCad"
                value={filter.dataCad}
                onChange={this.handleChangeMaskedField}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Cargo"
              placeholder="Dev Pl"
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
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field error={propertiesWithError.salarioMin}>
              <label>Salário Mínimo</label>
              <MaskedInput
                mask={moneyMask}
                guide={false}
                placeholder="10,00"
                name="salarioMin"
                value={filter.salarioMin}
                onChange={this.handleChangeMaskedField}
              />
            </Form.Field>
            <Form.Field error={propertiesWithError.salarioMax}>
              <label>Salário Máximo</label>
              <MaskedInput
                mask={moneyMask}
                guide={false}
                placeholder="1000,00"
                name="salarioMax"
                value={filter.salarioMax}
                onChange={this.handleChangeMaskedField}
              />
            </Form.Field>
          </Form.Group>
          <Button icon labelPosition="left" primary type="submit">
            <Icon name="search" />
            Pesquisar
          </Button>
          <Button basic onClick={() => this.handleOnClean()} type="button">
            Limpar
          </Button>
        </Form>
        {errorMessages.length ? (
          <Message error header="Existem alguns campos incorreros" list={errorMessages} />
        ) : null}
      </>
    );
  }
}
