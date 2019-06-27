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
      errorMessages.push('Data inválida');
      propertiesWithError.dataCad = true;
    }
  }

  if (salarioMin && salarioMax && salarioMin > salarioMax) {
    errorMessages.push('Salário mínimo deve ser menor que o salário máximo');

    propertiesWithError.salarioMin = true;
    propertiesWithError.salarioMax = true;
  }

  return {
    errorMessages,
    propertiesWithError,
    errors: true,
  };
};
