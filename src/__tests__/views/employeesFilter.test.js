import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { BrowserRouter as Router } from 'react-router-dom';
import EmployeesFilter from '../../components/employees-list/filter/employeesFilter';

describe('Testing EmployeesFilter Component', () => {
  it('should render the component correctly', () => {
    const wrapper = mount(
      <Router>
        <EmployeesFilter />
      </Router>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
