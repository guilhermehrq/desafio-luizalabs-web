import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../../components/App';

describe('Testing App Component', () => {
  it('should render component correctly', () => {
    const wrapper = mount(
      <Router>
        <App />
      </Router>,
    );

    expect(wrapper).not.toBeUndefined();
  });

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

  it('should verify if the has a actived menu', () => {
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
  });
});
