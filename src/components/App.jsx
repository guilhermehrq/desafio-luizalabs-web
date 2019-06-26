import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import Routes from './Routes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'employees',
    };
  }

  handleItemClick = (name, route) => {
    this.setState({ activeItem: name });
    this.props.history.push(route);
  };

  render() {
    const { activeItem } = this.state;
    return (
      <>
        <Menu>
          <Menu.Item header>Luizalabs Challenge</Menu.Item>
          <Menu.Item
            name="employees"
            active={activeItem === 'employees'}
            onClick={() => this.handleItemClick('employees', '/')}
          >
            Funcionários
          </Menu.Item>
          <Menu.Item
            name="employees-states"
            active={activeItem === 'employees-states'}
            onClick={() => this.handleItemClick('employees-states', '/employees-states')}
          >
            Analise por estado
          </Menu.Item>
        </Menu>
        <Routes />
      </>
    );
  }
}

export default withRouter(App);
