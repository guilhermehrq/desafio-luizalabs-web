export const validate = async (data) => {
  const {
    nome, cpf, ufNasc, cargo, status, salario,
  } = data;
  const errorMessages = [];
  const propertiesWithError = {};

  if (!nome) {
    errorMessages.push('Nome é obrigatório');
    propertiesWithError.nome = true;
  }

  if (!cpf) {
    errorMessages.push('CPF é obrigatório');
    propertiesWithError.cpf = true;
  }

  if (!ufNasc) {
    errorMessages.push('UF de nascimento é obrigatório');
    propertiesWithError.ufNasc = true;
  }

  if (!cargo) {
    errorMessages.push('Cargo é obrigatório');
    propertiesWithError.cargo = true;
  }

  if (!status) {
    errorMessages.push('Status é obrigatório');
    propertiesWithError.status = true;
  }

  if (!salario && salario != 0) {
    errorMessages.push('Salario é obrigatório');
    propertiesWithError.salario = true;
  }

  if (cpf) {
    if (cpf.length < 11) {
      errorMessages.push('CPF inválido');
      propertiesWithError.cpf = true;
    }
  }

  return {
    errorMessages,
    propertiesWithError,
  };
};
