import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { BrowserRouter as Router } from 'react-router-dom';
import EmployeesList from '../../components/employees-list/employeesList';

describe('Testing EmployeesList Component', () => {
  it('should render the component correctly', () => {
    const wrapper = mount(
      <Router>
        <EmployeesList />
      </Router>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
