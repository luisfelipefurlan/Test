import {Component} from "react";
import * as dashboardSelectors from "../dashboard/Reducer";
import connect from "react-redux/es/connect/connect";
import {DashboardCard} from "./Cards";
import React from "react";
import moment from 'moment'

class DetailDevicesList extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (JSON.stringify(prevProps.devicesIds) !== JSON.stringify(this.props.devicesIds)) {
            let d = new Date();
            let n = moment(d).format('YYYYMMDD');
            this.props.getHistoricList(Object.keys(this.props.devicesIds), n);
        }
    }

    render() {
        return (
            <div className={'list-area'}>
                {this.props.history.map((device, index) => {
                    return(<DashboardCard key={index} device={device} name={this.props.devicesIds[device.id]}/>)
                } )}

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        devicesIds: dashboardSelectors.getIds(state),
        history: dashboardSelectors.getDevicesHistory(state),
    };
};


export default connect(mapStateToProps)(DetailDevicesList);
