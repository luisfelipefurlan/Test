import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as LoginActions from './Action'
import * as loginSelectors from './Reducer';
import {MyInput} from '../components/TextInput'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            passwd: '',
            usernameValid: {message: '', value: undefined},
            passwordValid: {message: '', value: undefined},
            formValid: false
        };
        this.loginBtn = this.loginBtn.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getLoginName = this.getLoginName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    loginBtn() {
        this.props.dispatch(LoginActions.getLoginToken(this.state));
    }

    getLoginName() {
        this.props.dispatch(LoginActions.getUserName(this.state));
    }

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value}, () => {
            this.validateInput(name, value)
        });
    }

    handleSubmit(event) {
        this.props.dispatch(LoginActions.getLoginToken(this.state));
        event.preventDefault();
    }

    validateInput(inputName, value) {

        let usernameValid = this.state.usernameValid;
        let passwordValid = this.state.passwordValid;
        let formValid;
        switch (inputName) {
            case 'username':
                usernameValid.value = value.length >= 5;
                usernameValid.message = usernameValid.value ? '' : 'Username invalido';
                break;
            case 'passwd':
                passwordValid.value = value.length >= 5;
                passwordValid.message = passwordValid.value ? '' : 'Senha muito pequena';
                break;
            default:
                break;
        }

        formValid = (!!usernameValid.value && !!passwordValid.value);
        this.setState({
            formValid: formValid,
            usernameValid: usernameValid,
            passwordValid: passwordValid
        });
    }


    render() {
        return (
            <div className={"app-bg-center img-background"}>


                <div className={"login-content"}>
                    <form onSubmit={this.handleSubmit}>
                        <div className={"login-title"}>LogIn</div>

                        <MyInput type={"text"} name={"username"}
                                 placeholder={"User name"}
                                 error={this.state.usernameValid.value}
                                 value={this.state.username}
                                 change={this.handleChange}
                                 helperText="Nome do usuário"
                                 helperErrorText={this.state.usernameValid.message}/>

                        <MyInput type={"password"}
                                 name={"passwd"}
                                 placeholder={"Password"}
                                 error={this.state.passwordValid.value}
                                 value={this.state.passwd}
                                 change={this.handleChange}
                                 helperText="Senha do usuário"
                                 helperErrorText={this.state.passwordValid.message}/>

                        <button disabled={!this.state.formValid} type="submit" className={"outline-btn btn-color-green"}>Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: loginSelectors.getToken(state),
        userName: loginSelectors.getUserInfo(state)
    };
}

export default connect(mapStateToProps)(Login);
