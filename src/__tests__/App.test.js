import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../components/App';

describe('Testing App Component', () => {
  it('should render menu correctly', () => {
    const menus = ['Desafio Luizalabs', 'Funcionários', 'Analise por estados'];

    const wrapper = mount(
      <Router>
        <App />
      </Router>,
    );

    menus.forEach((menuTitle, index) => {
      expect(
        wrapper
          .find('MenuItem')
          .at(index)
          .text(),
      ).toEqual(menuTitle);
    });
  });

  it('should verify if the actived item changes', () => {
    const wrapper = mount(
      <Router>
        <App />
      </Router>,
    );

    expect(
      wrapper
        .find('a')
        .at(0)
        .hasClass('active'),
    ).toBeTruthy();

    expect(
      wrapper
        .find('a')
        .at(1)
        .hasClass('active'),
    ).toBeFalsy();

    wrapper.setState({
      activeItem: 'employees-states',
    });

    setTimeout(() => {
      expect(
        wrapper
          .find('a')
          .at(0)
          .hasClass('active'),
      ).toBeFalsy();

      expect(
        wrapper
          .find('a')
          .at(1)
          .hasClass('active'),
      ).toBeTruthy();
    });
  });
});
