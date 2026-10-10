import React from 'react';
import reactDom from 'react-dom/client';
import Routes from './RoutesComponent.jsx'
import App from './App.jsx';
import './index.css';

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function Routes() {
  return (
    <div>
      <h1>
        Welcome to Header
      </h1>
    </div>
  );
}

export default Routes;
