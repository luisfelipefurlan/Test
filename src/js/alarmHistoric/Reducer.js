import * as types from './ActionsType';
import Immutable from "seamless-immutable";

export const initial_state = Immutable({
    historic: [],
    details: {},
    isFetching: false,
    error: false,
});

export default function reducer(state = initial_state, action) {
    switch (action.type) {
        case types.FETCHING_INIT:
            return state.merge({
                isFetching: true,
                error: false,
            });
        case types.FETCHING_ALARMS_HISTORIC_SUCCESS:
            return state.merge({
                historic: action.payload,
                isFetching: false,
                error: false,
            });

        case types.FETCHING_ALARMS_DETAILS_SUCCESS:
            return state.merge({
                details: action.payload,
                isFetching: false,
                error: false,
            });
        case types.FETCHING_ERROR:
            return state.merge({
                historic: [],
                isFetching: false,
                error: true,
            });
        default:
            return state;
    }
};

export function getDeviceHistoric(state) {
    return Immutable.asMutable(state.alarmHistoric.historic, {deep: true});
}

export function getDeviceDetails(state) {
    return Immutable.asMutable(state.alarmHistoric.details);
}

export function getStatus(state) {
    return state.alarmHistoric.isFetching;
}
