import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './utils/registerServiceWorker';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {initStore} from './state/store';
import './index.css';

const store = initStore();

ReactDOM.render(

    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    document.getElementById('root')

  );
registerServiceWorker();
