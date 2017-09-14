import React, { Component } from 'react';
import {
    Redirect
} from 'react-router-dom';

class LoginComponentBase extends Component {
    loginHandler() {
        setTimeout(() => {
            if (this.props.loginHandler) {
                this.props.loginHandler()
            }
        }, 500);
    }

    render() {
        return this.props.logined ? <Redirect to={(this.props.location.state&&this.props.location.state.from)||{pathname:'/'}} /> : <div>
            welcom you can login here:
            <input type="button" value="Login" onClick={() => {
                this.loginHandler();
            }} />
        </div>
    }
}



export default LoginComponentBase;