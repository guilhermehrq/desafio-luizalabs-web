import {
  validate,
  formatDate,
  prepareData,
} from '../../components/employees-list/filter/employeesFilterValidation';

describe('Testing EmployeesFilter Formatters', () => {
  it('should format a date in model "2019-06-27"', () => {
    const formattedDate = formatDate('27/06/2019');

    expect(formattedDate).toBe('2019-06-27');
  });

  it('should format filter to be accepted by the API', () => {
    const unformattedFilter = {
      dataCad: '27/06/2019',
      cpf: '123.456.789-09',
      salarioMin: 'R$ 1000,00',
      salarioMax: 'R$ 1500,55',
    };

    const expectedFilter = {
      dataCad: '2019-06-27',
      cpf: '12345678909',
      salarioMin: 1000,
      salarioMax: 1500.55,
    };

    const formattedFilter = prepareData(unformattedFilter);

    expect(formattedFilter).toEqual(expectedFilter);
  });
});

describe('Testing EmployeesFilter Validations', () => {
  it('should validate data and return errors', async (done) => {
    const invalidData = {
      cpf: '123456',
      dataCad: '2570-38-52',
      salarioMin: 15000,
      salarioMax: 1000,
    };

    const expectedErrors = {
      errorMessages: [
        'CPF inválido',
        'Data de cadastro inválida',
        'Salário Mínimo deve ser menor que o Salário Máximo',
      ],
      propertiesWithError: {
        cpf: true,
        dataCad: true,
        salarioMin: true,
        salarioMax: true,
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
      cpf: '12345678909',
      dataCad: '2019-06-27',
      salarioMin: 1500,
      salarioMax: 10000,
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
});
