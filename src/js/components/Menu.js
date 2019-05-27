import React from 'react'
import MenuItem from './MenuItem';
import {connect} from 'react-redux';
import * as LoginActions from '../login/Action'
import uuidv1 from 'uuid'
import {GetTenetRoutes} from '../Route'

class Menu extends React.Component {


    constructor(props) {
        super(props);
        this.state = {items: []};
    }

    oddEvent = (match, location) => {
        if (!match) {
            return false
        }
        return match.isExact
    };

    componentDidMount() {
        const items = GetTenetRoutes();
        this.setState({items})
    }

    render() {
        const {items} = this.state;
        return (
            <div className={"menu-bar"}>
                <i className="app-menu-logo fas fa-smile-wink" onClick={() => this.props.getLogout()}/>
                {items.map((item) => (
                    !!item.icon ?  <MenuItem to={item.path} icon={item.icon} sActive={this.oddEvent} key={uuidv1()}/> : ''
                ))}
            </div>
        )
    }
};

function mapStateToProps(state) {
    return {};
}

const mapDispatchToProps = (dispatch) => ({
    getLogout: () => dispatch(LoginActions.GetLogout()),

});

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(Menu);
