import React from 'react';
import Login from './Login';

// import {
//     Redirect
// } from 'react-router-dom';
//这个实现就让Admin知道需要登录的细节
const Admin = ({ match, logined = false, handlerLoginSuccess }) => {
    return <div>

        {logined ? <div>欢迎进入管理页面</div> : <div>
            管理页面（内置登录）
            <div style={{border:"1px dashed green"}}>
            <Login handlerLoginSuccess={() => {
            handlerLoginSuccess();
        }} /></div>
            </div>}

    </div>
}
export default Admin;