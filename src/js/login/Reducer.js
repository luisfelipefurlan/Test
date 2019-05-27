import * as types from './ActionsType';
import Immutable from 'seamless-immutable';

export const initialState = Immutable({
    token: undefined,
    userInfo: {},
    isAuthenticated: false
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.LOG_IN:
            return state.merge({
                token: action.userToken,
                isAuthenticated: true
            });
        case types.LOG_OUT:
            return state.merge({
                token: action.userToken,
                isAuthenticated: false
            });
        case types.GET_USERNAME:
            return state.merge({
                userInfo: action.userInfo
            });
        default:
            return state;
    }
}

// selectors

export function getToken(state) {
    return state.login.token;
}

export function getAuthentication(state) {
    return state.login.isAuthenticated;
}


export function getUserInfo(state) {
    return state.login.userInfo;
}
