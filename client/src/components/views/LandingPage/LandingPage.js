import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {logoutUser} from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'


function LandingPage(props) {
    const dispatch = useDispatch();


    //랜딩페이지 들어오자마자 이걸 실행한다는 의미
    // useEffect(() => {
    //     axios.get('/api/hello').then(res=>{
    //         console.log(res.data)
    //     })
    // }, [])
    const onClickHandler = (event)=> {
        dispatch(logoutUser()).then(res=>{
            //console.log(res.payload)
            if(res.payload.success){
                props.history.push('/login')
            }else{
                alert("로그아웃에 실패.")
            }
        })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            시작페이지

            <button onClick={onClickHandler}>Logout</button>
        </div>
    )
}

export default withRouter(LandingPage)
