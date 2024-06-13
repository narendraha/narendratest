import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import './sass/index.scss';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Router>
      <App />
    </Router>
  </>,
);
