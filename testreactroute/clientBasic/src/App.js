import React, { Component } from 'react';
import './App.css';
import {
  NavLink,
  // BrowserRouter,
  Route,
  Redirect,
  Switch,
  HashRouter,
  // MemoryRouter
} from 'react-router-dom';


import Simplelinktocomponnt from "./Simplelinktocomponent";
import User from "./User";
import Admin from "./Admin";

import LoginComponentBase from "./LoginComponentBase";
import Adminpure from "./Adminpure";
import CustomLink from "./CustomLink";
import Form from "./Form";


function loginSuccess() {
  this.setState({
    ...this.state,
    logined: true,
    userInfo: {
      level: 9
    }
  })
}

const PrivitePage01 = () => <div>其实并没有什么。。。呵呵呵</div>

const PrivilegedRoute = ({ ComponentToWrap, from, path, level, userInfo, logined }) => {
  return <Route path={path} render={(props) => {
    if (!logined) {
      return <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
    } else if (userInfo.level < level) {
      return <div>等级不够哦~</div>
    } else {
      return <ComponentToWrap {...props} />
    }
  }} />
}

const Home = ({ match }) => <div>首页</div>

class App extends Component {
  constructor(a) {
    super(a);
    this.state = {
      logined: false,
      userInfo: {}
    }
  }
  render() {
    return (
      <HashRouter>
        <div className="App">
          <nav>
            <NavLink exact activeClassName="select" to={`/`}>首页</NavLink>
            <NavLink activeClassName="select" to={`/form`}>表单</NavLink>
            <NavLink activeClassName="select" to={`/simplelinktocomponnt`}>简单链接到Component跳转</NavLink>
            <NavLink activeClassName="select" to={`/user`}>userList</NavLink>
            <NavLink activeClassName="select" to={`/admin`}>管理(管理也集成了登录)</NavLink>
            <NavLink activeClassName="select" to={`/adminpure`}>管理(没有权限则跳去登录页面)</NavLink>
            <CustomLink activeClassName="select" to={`/privatepage01`}>够10级进来看呵呵呵</CustomLink>
            {
              this.state.logined ? <span style={{
                color: "red",
                cursor: "pointer", textDecoration: "underline"
              }} onClick={() => {
                this.setState({
                  ...this.state,
                  userInfo: {
                    ...this.state.userInfo,
                    level: 10
                  }
                })
              }}>打怪升10级</span> : ""
            }
            <div>
              {this.state.logined ?
                <div><span>你好~{this.state.userInfo.level}级的光耀，</span><input type="button" value="logout" onClick={() => {
                  this.setState({
                    ...this.state,
                    logined: false,
                    userInfo: {}
                  });
                }} /></div> : <NavLink activeClassName="select" to={`/login`}>去登录</NavLink>
              }
            </div>
          </nav>
          <div className="content">

            <Switch>

              <Route exact path="/" component={Home} />
              <Route exact path="/simplelinktocomponnt" component={Simplelinktocomponnt} />
              <Route path="/user" component={User} />
              <Route path="/form" component={Form} />
              <Route path="/login" render={(props) => {
                return <LoginComponentBase loginHandler={() => {
                  loginSuccess.call(this);
                }} logined={this.state.logined} {...props} />
              }} />

              <PrivilegedRoute path="/adminpure" ComponentToWrap={Adminpure} level="3" userInfo={{ ...this.state.userInfo }} logined={this.state.logined} />

              <PrivilegedRoute path="/privatePage01" ComponentToWrap={PrivitePage01} level="10" userInfo={{ ...this.state.userInfo }} logined={this.state.logined} />

              <Route path="/admin" render={() => {
                return <Admin logined={this.state.logined} handlerLoginSuccess={() => {
                  loginSuccess.call(this);
                }} />
              }} />

            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
