import * as types from './ActionsType';
import * as services from './Service.js';

export const getAlarmsHistoric = (initial, final, page, pageSize) =>
    async dispatch => {
        try {
            dispatch({type: types.FETCHING_INIT});
            const response = await services.getAlarmsHistoric(initial, final, page, pageSize);
            dispatch({type: types.FETCHING_ALARMS_HISTORIC_SUCCESS, payload: response});
        } catch (error) {
            dispatch({type: types.FETCHING_ERROR});
        }
    };


export const getAlarmDetails = (alarmId, rectangle, faceId) =>
    async dispatch => {
        try {
            dispatch({type: types.FETCHING_INIT});
            const response = await services.getAlarmDetails(alarmId, rectangle, faceId);
            dispatch({type: types.FETCHING_ALARMS_DETAILS_SUCCESS, payload: response});
        } catch (error) {
            dispatch({type: types.FETCHING_ERROR});
        }
    };

