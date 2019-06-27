import { validate } from '../../components/employees-info/employeesInfoValidation';

describe('Testing EmployeesInfo Validations', () => {
  it('should validate data and return errors', async (done) => {
    const invalidData = {
      nome: '',
      cpf: '',
      ufNasc: '',
      cargo: '',
      status: '',
      salario: '',
    };

    const expectedErrors = {
      errorMessages: [
        'Nome é obrigatório',
        'CPF é obrigatório',
        'UF de nascimento é obrigatório',
        'Cargo é obrigatório',
        'Status é obrigatório',
        'Salário é obrigatório',
      ],

      propertiesWithError: {
        nome: true,
        cpf: true,
        ufNasc: true,
        cargo: true,
        status: true,
        salario: true,
      },
    };

    const validatedData = await validate(invalidData);

    expect(validatedData).toHaveProperty('errorMessages');
    expect(validatedData.errorMessages).toEqual(expectedErrors.errorMessages);
    expect(validatedData).toHaveProperty('propertiesWithError');
    expect(validatedData.propertiesWithError).toEqual(expectedErrors.propertiesWithError);

    done();
  });

  it('should validate data and return no errors', async (done) => {
    const invalidData = {
      nome: 'Teste',
      cpf: '12345678909',
      ufNasc: 'SP',
      cargo: 'Dev',
      status: 'ATIVO',
      salario: 1500,
    };

    const expectedErrors = {
      errorMessages: [],
      propertiesWithError: {},
    };

    const validatedData = await validate(invalidData);

    expect(validatedData).toHaveProperty('errorMessages');
    expect(validatedData.errorMessages).toEqual(expectedErrors.errorMessages);
    expect(validatedData).toHaveProperty('propertiesWithError');
    expect(validatedData.propertiesWithError).toEqual(expectedErrors.propertiesWithError);

    done();
  });

  it('should validate data and return CPF error', async (done) => {
    const invalidData = {
      nome: 'Teste',
      cpf: '123456',
      ufNasc: 'SP',
      cargo: 'Dev',
      status: 'ATIVO',
      salario: 1500,
    };

    const expectedErrors = {
      errorMessages: ['CPF inválido'],
      propertiesWithError: {
        cpf: true,
      },
    };

    const validatedData = await validate(invalidData);

    expect(validatedData).toHaveProperty('errorMessages');
    expect(validatedData.errorMessages).toEqual(expectedErrors.errorMessages);
    expect(validatedData).toHaveProperty('propertiesWithError');
    expect(validatedData.propertiesWithError).toEqual(expectedErrors.propertiesWithError);

    done();
  });
});
