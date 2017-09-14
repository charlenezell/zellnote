# react route

## `<Route>`

> There are 3 ways to render something with a `<Route>`:

1. Route

    1. `<Route component>`

    > if you provide an inline function to the component attribute, you would create a new component every render. This results in the existing component _**unmounting**_ and the _**new component mounting**_ instead of just updating the existing component. When using an inline function for **_inline_** rendering, use the render or the children prop

    1. `<Route render>`
    function
    1. `<Route children>`
    function that can handle not match

    >_**ps :**_ precendence => `<Route component>`>`<Route render>`>`<Route children>`

1. path: string
Any valid URL path that [path-to-regexp][1] understands.



## `<Router>`
  The common low-level interface for all router components. Typically apps will use one of the high-level routers instead:`<BrowserRouter><HashRouter><MemoryRouter><NativeRouter><StaticRouter>`

[1]:https://github.com/pillarjs/path-to-regexp

1. 权限模块可以耦合路由模块让权限验证的一些组件可以独立于具体的业务逻辑例如内置登录模块还是用路由导航登录跳转？

##  `<Link>`,`<NavLink>`,`<CustomLink>`

1. 可以自定义`<Link>`如`<CustomLink>`但是其中有些可用性的属性已经帮忙封装在`<NavLink>`里面

## `<Switch>`
> 修改Route默认的inclusively行为为exclusively
```JSX
  <Route path="/about" component={About}/>
  <Route path="/:user" component={User}/>
  <Route component={NoMatch}/>
  //此处三个Component都会渲染如果访问/about的话
```
```JSX
import { Switch, Route } from 'react-router'

<Switch>
  <Route exact path="/" component={Home}/>
  <Route path="/about" component={About}/>
  <Route path="/:user" component={User}/>
  <Route component={NoMatch}/>
</Switch>

//而此处只会执行/about首个match的Component
```