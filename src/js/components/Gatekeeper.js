import React, {Component} from 'react';
import {AuthenticatedRoute, UnauthenticatedRoute} from '../Route'
import {BrowserRouter} from 'react-router-dom'

import * as loginSelectors from "../login/Reducer";
import connect from "react-redux/es/connect/connect";

class Gatekeeper extends Component {

    render() {
        return (
            <BrowserRouter>
                {this.props.isAuthenticated ? (<AuthenticatedRoute/>) : (<UnauthenticatedRoute/>)}
            </BrowserRouter>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: loginSelectors.getAuthentication(state)
    };
}

export default connect(mapStateToProps)(Gatekeeper);
