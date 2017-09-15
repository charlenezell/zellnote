import React from 'react';
import {
    Link,
    Route,
    Switch
} from 'react-router-dom';

import UserDetail from './UserDetail';

const List = ({ match }) => {
    let g = [1, 2, 3, 4, 5];
    return <div>{
        g.map((v, k) => <div key={k}>
            <Link to={`${match.url}/${v}`}>用户:{v}</Link>
        </div>)
    }</div>
}

const User = ({ match,location }) => <div>

    {/* <Switch location={{...location,pathname:"/usesrsf"}}> */}
    <Switch>
        <Route path={`${match.url}/1`} render={(props) => {
            return <UserDetail special={true} {...props} parentPath={match.url} />
        }} />
        <Route path={`${match.url}/:userId`} render={(props) => {
            return <UserDetail {...props} parentPath={match.url} />
        }} />
        <Route path={`${match.url}`} component={List} />
        <Route render={() => {
            debugger;
            return <div>no match</div>
        }} />
    </Switch>
</div>
export default User;