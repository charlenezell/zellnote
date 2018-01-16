import React from 'react';
import {
    Prompt
  } from 'react-router-dom';
export default function(){
    let unsave=true;
    return <div>
        <input type="text" />
        <Prompt
          when={unsave}
          message={location => (
            `你确定去这里=> ${location.pathname}? 表单没保存哦~`
          )}
        />
    </div>
}