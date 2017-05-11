import axios from 'axios';
import { browserHistory } from 'react-router';
import { 
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE
} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({email, password}){

    return function(dispatch){

        axios.post(`${ROOT_URL}/signin`, {email, password})

            //Success
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/feature');
            })
            //Error
            .catch(() => {
                dispatch(authError('Bad login info'));
            });
    }
}

export function signupUser({email, password}){

    return function(dispatch){

        axios.post(`${ROOT_URL}/signup`, {email, password})

            //Success
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/feature');
            })
            //Error
            .catch(error => {
                const e = {...error};
                console.log(e.response.data.error);
                dispatch(authError(e.response.data.error));
            });
    }
}

export function authError(error){
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function signoutUser(){
    localStorage.removeItem('token');
    return { type: UNAUTH_USER};
}

export function fetchMessage(){

    return function(dispatch){

        axios.get(ROOT_URL, {
            headers: {authorization: localStorage.getItem('token')}
        })

        //Success
        .then(response => {
            dispatch({
                type: FETCH_MESSAGE,
                payload: response.data.message
            });
        })
        //Error
        .catch(error => {
            const e = {...error};
            dispatch({
                type: FETCH_MESSAGE,
                payload: e.response.data
            });
        });
    }
}