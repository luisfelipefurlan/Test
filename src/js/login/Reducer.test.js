import { expect } from 'chai';
import Immutable from 'seamless-immutable';
import Reducer, { initialState } from './Reducer';
import { LOG_IN, LOG_OUT } from './ActionsType'

const TOKEN = 'ASd8asl12klmSCdLDKNa-090-234';
it('Should Reducer be a function', () => {
    expect(Reducer).to.be.a('function');
});

it('Should return the latest state when action is unknown', () => {
    const before = Immutable({
        token: TOKEN,
        isAuthenticated: true,
    });

    const action = Immutable({
        type: 'ANYTHING',
        userToken: '',
    });

    const after = {
        token: TOKEN,
        isAuthenticated: true,
    };

    expect(Reducer(before, action)).to.be.deep.equal(after);
});

it('Should return initial state when state is undefined', () => {
    const before = undefined;
    const action = Immutable({});
    const after = initialState;

    expect(Reducer(before, action)).to.be.deep.equal(after);
});

it('Should action LOG_IN save token and authenticate user', () => {
    const before = Immutable({
        token: undefined,
        userInfo: '',
        isAuthenticated: false
    });
    const action = Immutable({
        type: LOG_IN,
        userToken: TOKEN,
    });
    const after = {
        token: TOKEN,
        isAuthenticated: true,
        userInfo: '',
    };

    expect(Reducer(before, action)).to.be.deep.equal(after);
});

it('Should action LOG_OUT remove token and logout user', () =>{
    const before = Immutable({
        token: TOKEN,
        isAuthenticated: true,
    });

    const action = Immutable({
        type: LOG_OUT,
        userToken: '',
    });

    const after = {
        token: '',
        isAuthenticated: false,
    };

    expect(Reducer(before, action)).to.be.deep.equal(after);
});
