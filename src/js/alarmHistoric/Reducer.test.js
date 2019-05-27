import {expect} from 'chai';
import Reducer from './Reducer';
import Immutable from "seamless-immutable";
import {initial_state} from "../alarmHistoric/Reducer";
import {
    FETCHING_INIT,
    FETCHING_ALARMS_HISTORIC_SUCCESS,
    FETCHING_ALARMS_DETAILS_SUCCESS,
    FETCHING_ERROR
} from './ActionsType'

it('should Reducer be a function', () => {
    expect(Reducer).to.be.a('function')
});

it('Should return the latest state when action is unknown', () => {
    const before = Immutable({
        device: {},
    });

    const action = Immutable({
        type: 'ANYTHING',
        userToken: '',
    });

    const after = {
        device: {}
    };

    expect(Reducer(before, action)).to.be.deep.equal(after);
});

it('Should return initial state when state is undefined', () => {
    const before = undefined;
    const action = Immutable({});
    const after = initial_state;

    expect(Reducer(before, action)).to.be.deep.equal(after);
});

it('Should action FETCHING_DEVICE_INIT init async request to get device', () => {
    const before = Immutable({
        devices: [],
        historic: [],
        isFetching: false,
        error: false,
    });

    const action = Immutable({
        type: FETCHING_INIT
    });

    const after = {
        devices: [],
        historic: [],
        isFetching: true,
        error: false,
    };

    expect(Reducer(before, action)).to.be.deep.equal(after);
});

it('should action FETCHING_DEVICE_SUCCESS return device', () => {
    const before = Immutable({
        devices: [],
        historic: [],
        isFetching: true,
        error: false,
    });
    const action = Immutable({
        type: FETCHING_ALARMS_HISTORIC_SUCCESS,
        payload: {
            devices: [{
                forecast: [{
                    forecastForISO: "2019-01-08T03: 00: 00.000Z",
                    stationId: "41D124",
                    latitude: -22.872958,
                    longitude: -47.058931,
                    atp: 23.25,
                    pc: 0,
                    arh: 81.1,
                    wd: 17.3,
                    ws: 1.15
                }]
            }]
        }
    });
    const after = {
        devices: [{
            forecast: [{
                forecastForISO: "2019-01-08T03: 00: 00.000Z",
                stationId: "41D124",
                latitude: -22.872958,
                longitude: -47.058931,
                atp: 23.25,
                pc: 0,
                arh: 81.1,
                wd: 17.3,
                ws: 1.15
            }],
        }],
        historic: [],
        isFetching: false,
        error: false,
    };

    expect(Reducer(before, action)).to.be.deep.equal(after);
});

it('Should action FETCHING_DEVICE_ERROR return fetching error when try get device', () => {
    const before = Immutable({
        devices: [],
        historic: [],
        isFetching: true,
        error: false,
    });

    const action = Immutable({
        type: FETCHING_ERROR
    });

    const after = {
        devices: [],
        historic: [],
        isFetching: false,
        error: true,
    };

    expect(Reducer(before, action)).to.be.deep.equal(after);
});
