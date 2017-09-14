import React from 'react';
import {
    Link,
    Route
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

const User = ({ match }) => <div>

    <Route path={`${match.url}`} exact component={List} />
    <Route path={`${match.url}/:userId`} render={(props)=>{
        return <UserDetail {...props} parentPath={match.url} />
    }} />
</div>
export default User;