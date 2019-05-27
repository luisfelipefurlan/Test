import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as selectors from '../login/Reducer';
import * as LoginActions from '../login/Action'

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {visible: false};
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.props.getUser();
    }

    handleClick(event) {
        let status = this.state.visible;
        this.setState({visible: !status});
    }


    render() {
        return (
            <div className="app-header">
                <div className="app-header-children">

                </div>
                <div className={"app-header-user "  + (this.state.visible ? 'active' : '')} onClick={(event) => this.handleClick(event)}>
                    <div className="user-context-text">
                        <div className="user-name-menu">{this.props.userInfo.username}</div>
                        <div className="user-name-profile">{this.props.userInfo.profile}</div>
                    </div>
                    <div className="user-menu-avatar"/>
                </div>
                <div className={'user-context-menu-warp ' + (this.state.visible ? 'context-menu-open' : 'hide-menu')}>
                    <div className={'user-context-menu  '}>
                        <button type="button" onClick={() => this.props.getLogout()}
                                className={"outline-btn btn-color-green"}>Logout
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        userInfo: selectors.getUserInfo(state),
    };
}

const mapDispatchToProps = (dispatch) => ({
    getUser: () => dispatch(LoginActions.getUserName()),
    getLogout: () => dispatch(LoginActions.GetLogout()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

