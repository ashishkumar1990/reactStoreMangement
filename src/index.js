import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import userStore from "./userStore";
import productStore from "./productStore";
import 'semantic-ui-css/semantic.min.css'


ReactDOM.render(
    <Provider store={userStore} >
        <Provider store={productStore} >
        <App />
        </Provider>
    </Provider>,
  document.getElementById('root')
);

export  {userStore,productStore}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
