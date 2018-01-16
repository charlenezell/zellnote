import React from 'react';
import {
    Link,
    // NavLink,
    // BrowserRouter,
    Route
    // Redirect
} from 'react-router-dom';

export default function CustomLink({
    activeClassName, to, children
}) {
    return <Route path={to} children={({ match }) => <Link to={to} className={match ? activeClassName : ''}>{children}</Link>
    } />
}