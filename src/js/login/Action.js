import * as types from './ActionsType';
import LoginService from './Service';
import axios from "axios";

export function getLoginToken(user) {
    return async (dispatch, getState) => {
        try {
            const response = await LoginService.getToken(user);
            const userToken = response.jwt;
            localStorage.setItem('jwt', userToken);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + userToken;
            dispatch({type: types.LOG_IN, userToken});
        } catch (error) {
            console.error(error);
        }
    };
}

export function GetLogout() {
    return async (dispatch, getState) => {
        try {
            const userToken = '';
            localStorage.removeItem('jwt');
            dispatch({type: types.LOG_OUT, userToken});
        } catch (error) {
            console.error(error);
        }
    };
}

export const getUserName = () =>
    dispatch => {
        try {
            const token = localStorage.getItem('jwt');
            const userInfo = !!token ? JSON.parse(atob(token.split('.')[1])) : '';
            dispatch({type: types.GET_USERNAME, userInfo});
        } catch (error) {
            console.error(error);
        }
    };
