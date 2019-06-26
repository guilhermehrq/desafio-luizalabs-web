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
        <div
          id="magalu-bar"
          style={{
            width: '100%',
            height: '5px',
            background:
              'linear-gradient(to right,#fcd000 0,#ff8a00 17%,#ff253a 34%,#ff37a8 51%,#a400e1 67%,#0086ff 83%,#00d604 100%)',
          }}
        />
        <Menu style={{ marginTop: 0 }}>
          <Menu.Item header>Desafio Luizalabs</Menu.Item>
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
