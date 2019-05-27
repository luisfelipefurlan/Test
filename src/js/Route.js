import React, { Component, Fragment } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './login/Login'
import Menu from './components/Menu'
import uuidv1 from 'uuid'
import AlarmHistoric from './alarmHistoric'

const RoutesPerTenants = (tenet) => {
    const routes = {
        "admin": [
            {
                "path": "/historic",
                "component": AlarmHistoric,
                "icon": "fas fa-history"
            },
            {
                "path": "*",
                "component": AlarmHistoric
            }
        ],
        "default": []
    };

    return routes[tenet];
};

export const GetTenetRoutes = () => {
    const token = localStorage.getItem('jwt');
    let buff = new Buffer(token.split('.')[1], 'base64');
    let tenant = JSON.parse(buff.toString()).service;
    return RoutesPerTenants(tenant);
};

export const GetMenuItems = () => {

};

export class AuthenticatedRoute extends Component {
    constructor(props) {
        super(props);
        this.state = { routes: [] };
        // this.getComponent = this.getComponent.bind(this);
    }

    componentDidMount() {

    }

    render() {
        const resp = GetTenetRoutes();
        return (
            <Fragment>
                <Menu/>
                <Switch>
                    {resp.map(((route) => (<Route path={route.path} key={uuidv1()} component={route.component}/>)))}
                </Switch>
            </Fragment>
        )
    }
};

export const UnauthenticatedRoute = () => (
    <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/login" component={Login}/>
        <Route path="/forgotpwd" component={Login}/>
        <Route path='*' component={Login}/>
    </Switch>
);
