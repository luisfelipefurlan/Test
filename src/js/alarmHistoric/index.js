import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as service from './Service.js'
import * as WS from '../utils/socket'
import moment from 'moment'
import { RingSpinner } from '../components/spinner'

class AlarmHistoric extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: '',
            id: '',
            carOne: { plate: '', frame: '', ts: '' },
            carTwo: { plate: '', frame: '', ts: '' }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleDeviceData = this.handleDeviceData.bind(this);
    }

    handleDeviceData = (data) => {
        const { attrs: { image, license_plate }, deviceid, timestamp } = data;
        const { carOne: { plate, frame, ts } } = this.state;

        if (!!license_plate && license_plate !== plate) {
            this.setState({
                image: image,
                carOne: { plate: license_plate, frame: image, ts: timestamp },
                carTwo: { plate, frame, ts },
                id: deviceid,
                ts: timestamp
            })
        } else this.setState({ image: image, id: deviceid, ts: timestamp })
    };

    componentDidMount() {
        service.getDevices(async (e) => {
            await WS.setConnection();
            WS.listenerDevice(e[0], this.handleDeviceData);
            WS.errorListeners(e[0], this.handleDeviceData);
        });
    }

    handleChange(event) {
        const { target: { name, value } } = event;
        this.setState({ [name]: value })
    }

    render() {
        const { image, carOne, carTwo, id } = this.state;
        let imgOne = `data:image/jpeg;base64,${carOne.frame}` || '';
        let imgTwo = `data:image/jpeg;base64,${carTwo.frame}` || '';

        return (
            <div className={'page-overlay'}>
                <div className={'upper-page'}>
                    <img src={`data:image/jpeg;base64,${image || ''}`} alt={'print-1'}
                         className={'alarm-print'}/>
                    {
                        !!carOne.frame ?
                            <img src={imgOne} alt={'face-1'} className={'alarm-face'}/> :
                            <div className={'spinner'}><RingSpinner/></div>
                    }
                    {
                        !!carTwo.frame ?
                            <img src={imgTwo} alt={'face-1'} className={'alarm-face'}/> :
                            <div className={'spinner'}><RingSpinner/></div>
                    }
                </div>
                <div className={'middle-page'}>
                    <div className={'print-info'}>
                        <TextView value={{ title: 'Hora Atual', value: moment().format('DD/MM/YYYY HH:mm:ss') }}/>
                        <TextView value={{ title: 'ID', value: id || 0 }}/>
                    </div>
                    <div className={'alarm-info'}>
                        <div className={'match-area'}>
                            Placa: {carOne.plate.slice(0, 3) + "-" + carOne.plate.slice(3) || ''}
                        </div>
                        <div className={'match-area'}>
                            Placa: {carTwo.plate.slice(0, 3) + "-" + carTwo.plate.slice(3) || ''}
                        </div>
                        <TextView value={{
                            title: 'Hora',
                            value: moment(carOne.ts).isValid() ? moment(carOne.ts).format('DD/MM/YYYY HH:mm:ss') : '-'
                        }}/>
                        <TextView value={{
                            title: 'Hora',
                            value: moment(carTwo.ts).isValid() ? moment(carTwo.ts).format('DD/MM/YYYY HH:mm:ss') : '-'
                        }}/>
                    </div>
                </div>
            </div>
        );
    }
}

const TextView = (props) => {
    const { value: { title, value } } = props;
    return (
        <div className={'text-area'}>
            <div className={'value-area'}>{value}</div>
            <div className={'title-area'}>{title}</div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AlarmHistoric);
