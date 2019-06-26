import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import App from './components/App';

function Index() {
  return (
    <Router>
      <App />
    </Router>
  );
}

ReactDOM.render(Index(), document.getElementById('root'));
