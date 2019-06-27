import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { BrowserRouter as Router } from 'react-router-dom';
import EmployeesInfo from '../../components/employees-info/employeesInfo';

describe('Testing EmployeesInfo Component', () => {
  it('should render the component correctly', () => {
    const wrapper = mount(
      <Router>
        <EmployeesInfo />
      </Router>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
