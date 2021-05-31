import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
    AUTH_USER
} from './types'

import axios from 'axios'
axios.defaults.withCredentials = true;
//if(process.env.NODE_ENV==="production"){
axios.defaults.baseURL = "https://boilerplate-apiserver.herokuapp.com/"
//} else {
//axios.defaults.baseURL = "http://localhost:5000/"
//}
  

export function loginUser(dataToSubmit) {
    //const req = axios.post('/api/users/login',dataToSubmit,{withCredentials: true}); //for POST
    const req = axios.post('/api/users/login',dataToSubmit,{withCredentials: true})
        .then(res => {
            //console.log(res)
            return res.data
        })
        return{
            type: LOGIN_USER,
            payload: req
        }
}

export function registerUser(dataToSubmit){
    const req = axios.post('/api/users/register',dataToSubmit)
        .then(res => {
            //console.log(res.data)
            return res.data
        })
        return{
            type: REGISTER_USER,
            payload: req
        }
}

export function logoutUser(){
    const req = axios.get('/api/users/logout',{withCredentials: true})
        .then(res => {
            //console.log(res.data)
            return res.data
        })
        return{
            type: LOGOUT_USER,
            payload: req
        }
}

export function auth(){
    const req = axios.get('/api/users/auth')
        .then(res => {
            //console.log(res.data)
            return res.data
        })
        return{
            type: AUTH_USER,
            payload: req
        }
}