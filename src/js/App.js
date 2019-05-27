import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as LoginActions from './login/Action'
import * as loginSelectors from './login/Reducer';
import '../scss/App.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import {faTachometerAlt, faVideo, faCloudSun, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
library.add(faTachometerAlt, faVideo, faCloudSun, faExclamationTriangle);

class App extends Component {

    constructor(props) {
        super(props);

        this.loginBtn = this.loginBtn.bind(this);
    }

    loginBtn() {
        this.props.dispatch(LoginActions.getLoginToken({username: 'admin', passwd: 'admin'}));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <button onClick={() => this.loginBtn()}>Login Super Seguro</button>
                    <div style={{height: 'auto', width: '100%', fontSize: 14, lineBreak: 'auto'}}>{this.props.token}</div>
                </header>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: loginSelectors.getToken(state)
    };
}

export default connect(mapStateToProps)(App);
