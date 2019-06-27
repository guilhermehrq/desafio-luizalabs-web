import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { BrowserRouter as Router } from 'react-router-dom';
import EmployeesTable from '../../components/employees-list/employeesTable';

describe('Testing EmployeesTable Component', () => {
  it('should render the component correctly', () => {
    const props = {
      filter: {
        page: 1,
      },
      employeesList: [],
      totalRows: 1,
    };

    const wrapper = mount(
      <Router>
        <EmployeesTable {...props} />
      </Router>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should display a massage that haven't found employees", () => {
    const props = {
      filter: {
        page: 1,
      },
      employeesList: [],
      totalRows: 1,
    };

    const wrapper = mount(
      <Router>
        <EmployeesTable {...props} />
      </Router>,
    );

    expect(wrapper.find('TableCell td')).toHaveLength(1);
    expect(
      wrapper
        .find('TableCell td')
        .at(0)
        .text(),
    ).toBe('Nenhum funcionário encontrado...');
  });

  it('should display a some employees in the table', () => {
    const props = {
      filter: {
        page: 1,
      },
      employeesList: [
        {
          cargo: 'Dev Jr',
          cpf: '85235708709',
          dataCad: '2017-04-15T00:00:00.000Z',
          nome: 'Aaron Aaberg',
          salario: 8965.3,
          status: 'ATIVO',
          ufNasc: 'AP',
          __v: 0,
          _id: '5d14a494864bfc295970f673',
        },
      ],
      totalRows: 1,
    };

    const wrapper = mount(
      <Router>
        <EmployeesTable {...props} />
      </Router>,
    );

    expect(
      wrapper
        .find('TableCell td')
        .at(0)
        .text(),
    ).toBe('852.357.087-09');
  });
});
