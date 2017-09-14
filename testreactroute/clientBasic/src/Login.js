import React from 'react';

function clickLogin(cb) {
    let Authrized = true;
    if (Authrized) {
        cb();
    } else {
        alert("login Error");
    }
}

const Login = ({ match, handlerLoginSuccess }) => <div>
    welcom you can login here:
    <input type="button" value="Login" onClick={
        () => {
            clickLogin(handlerLoginSuccess);
        }
    } />
</div>

export default Login;