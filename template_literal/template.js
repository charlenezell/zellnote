let createTagFilter = (filterFn) => (str, ..._data) => {
    let g = [str[0]];
    _data.forEach((v, k) => {
        g.push(filterFn(v), str[k + 1]);
    })
    return g.join('');
}

let htmlFilter = createTagFilter((str) => {
    let toReplaceReg = /[<>&'"]/g;
    let ReplaceFun = (v) => {
        return ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        })[v]
    };
    return String.prototype.replace.call(str, toReplaceReg, ReplaceFun);
})

let header = (obj) => {
    let {
        title,
        desc
    } = obj;
    return htmlFilter `<header>${title}=>${desc}</header>`;
}

console.log(header({
    title: "news 2",
    desc: "news of today 2</header>"
}))