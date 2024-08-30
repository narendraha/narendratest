import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { store, persistor } from './store/store';
import Loading from "./components/MainLayout/Loading";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={<Loading storeLoading={true} rehydrating={true} />} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>
);