import axios from 'axios'
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import {auth} from '../_actions/user_action'
export default function (SpecificComponent, option, adminRoute=null){

    //option::
    //null => 아무나 출입이 가능한 페이지
    //true => 로그인 한 유저만 출입 가능
    //false => 로그인 안한 유저만 출입 가능

    //유저의 현재 상태를 check
    function AuthenicationCheck(props){
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(auth()).then(res => {
                //console.log(res.payload)

                //로그인 하지 않은 상태
                if(!res.payload.isAuth){
                    if(option){
                        props.history.push('/login')
                    }

                } else {
                    //로그인 한 상태
                    if(adminRoute && !res.payload.isAdmin){
                        props.history.push('/')
                    } else {
                        if(option === false)
                        props.history.push('/')
                    }
                }
            })
        }, [])
        return (
            <SpecificComponent/>
        )
    }
    return AuthenicationCheck
}