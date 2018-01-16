import React from 'react';

import {
    Link
} from 'react-router-dom';

const UserDetail = ({ match, parentPath,special }) => <div>
    <div style={{background:special?'red':'#fff'}}>
        {/* 如何通过Route => component 方式传参？ Route + render 即可 */}
        <Link to={parentPath}>回去列表页</Link>
    </div>
    我的id是"{match.params.userId}"
</div>
export default UserDetail;