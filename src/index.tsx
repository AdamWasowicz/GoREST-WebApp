import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './components/App/App';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';

const container = document.getElementById('root');
const root = createRoot(container);
//Register Modal for whole App
Modal.setAppElement('#root');

root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);

