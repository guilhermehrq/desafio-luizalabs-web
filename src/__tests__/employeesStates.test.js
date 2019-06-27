import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { BrowserRouter as Router } from 'react-router-dom';
import EmployeesStates from '../components/employees-states/employeesStates';

describe('Testing EmployeesStates Component', () => {
  it('should render menu correctly', () => {
    const wrapper = mount(
      <Router>
        <EmployeesStates />
      </Router>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
