export const validate = async (data) => {
  const {
    cpf, dataCad, salarioMin, salarioMax,
  } = data;
  const errorMessages = [];
  const propertiesWithError = {};

  if (cpf) {
    if (cpf.length < 11) {
      errorMessages.push('CPF inválido');

      propertiesWithError.cpf = true;
    }
  }

  if (dataCad) {
    let error = false;
    if (!(new Date(dataCad) !== 'Invalid Date' && !isNaN(new Date(dataCad)))) {
      error = true;
    }
    if (dataCad.split('-').length < 3 || dataCad.length < 10) {
      error = true;
    }

    if (error) {
      errorMessages.push('Data de cadastro inválida');
      propertiesWithError.dataCad = true;
    }
  }

  if (salarioMin && salarioMax && salarioMin > salarioMax) {
    errorMessages.push('Salário Mínimo deve ser menor que o Salário Máximo');

    propertiesWithError.salarioMin = true;
    propertiesWithError.salarioMax = true;
  }

  return {
    errorMessages,
    propertiesWithError,
  };
};

const formatDate = (date) => {
  if (date) {
    return date
      .split('/')
      .reverse()
      .join('-');
  }

  return '';
};

export const prepareData = (filter) => {
  filter.dataCad = formatDate(filter.dataCad);

  filter.cpf = filter.cpf.replace(/\D+/g, '');

  filter.salarioMin = filter.salarioMin
    ? parseFloat(filter.salarioMin.replace(',', '.').replace('R$ ', ''))
    : '';

  filter.salarioMax = filter.salarioMax
    ? parseFloat(filter.salarioMax.replace(',', '.').replace('R$ ', ''))
    : '';

  return filter;
};
