
import actionTypes from './actionTypes';
import axios from 'axios';


export const signUp = (formData, cb) => {
    
    // take username and password
    // call our server api
    // wait for an authenticated token
    // call reducer to store token

    // formData => {email, password}

    return async dispatch => {
        try {
            //formData will put on header
            let response = await axios.post('http://localhost:3001/signup', formData);
            console.log(response.data.token); //token

            //dispatch action to reducer
            dispatch({type: "AUTH_USER", data: response.data.token})

            localStorage.setItem('token', response.data.token);

            cb();

        } catch (error) {
            console.log(error)
        }
    }
}

// logging into application
export const signin = (formData, cb) => {
    return async dispatch => {

        try {
            let response = await axios.post('http://localhost:3001/signin', formData)

            dispatch({type: "AUTH_USER", data: response.data.token})
            console.log('signin', response.data.token);

            localStorage.setItem('token', response.data.token);

            cb();

        } catch (error) {
            
            console.log(error)
        }
    }
}

// logout
export const signout = () => {

    localStorage.removeItem('token');

    console.log("signout")

    return {
        type: "AUTH_USER",
        data: ''
    }

}