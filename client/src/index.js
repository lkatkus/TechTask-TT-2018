// Dependency imports
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import reducer from './store/reducers/Form';

// Component imports
import App from './App';

// Assets
import './index.css';

const store = createStore(reducer);

const app = (
    <Provider store={store}>
        <App/>
    </Provider>
)

// Component
ReactDOM.render(app, document.getElementById('root'));