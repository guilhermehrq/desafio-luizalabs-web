import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import Routes from './Routes';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'employees',
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <>
        <Menu>
          <Menu.Item header>Luizalabs Challenge</Menu.Item>
          <Link to="/">
            <Menu.Item
              name="employees"
              active={activeItem === 'employees'}
              onClick={this.handleItemClick}
            >
              Employees
            </Menu.Item>
          </Link>
          <Link to="/employees-states">
            <Menu.Item
              name="employees-states"
              active={activeItem === 'employees-states'}
              onClick={this.handleItemClick}
            >
              Employees States
            </Menu.Item>
          </Link>
        </Menu>
        <Routes />
      </>
    );
  }
}
