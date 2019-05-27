import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import Gatekeeper from './components/Gatekeeper';
import {ToastContainer} from 'react-toastify';
import * as reducers from './reducers';
import 'react-toastify/dist/ReactToastify.css';
import '../scss/App.scss';
import axios from "axios";
import Immutable from 'seamless-immutable';


const token = localStorage.getItem('jwt');
let initial_state = {};

if (token) {
    initial_state = {
        login: {
            token,
            userInfo: '',
            isAuthenticated: !!token,
        }
    };
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}


const store = createStore(
    combineReducers(reducers),
    Immutable(initial_state),
    composeWithDevTools(applyMiddleware(thunk)),
);

ReactDOM.render(
    <Provider store={store}>
        <ToastContainer/>
        <Gatekeeper/>
    </Provider>, document.getElementById('root'));
