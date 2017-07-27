[note from](https://css-tricks.com/using-svg/)

SVG is an image format for vector graphics. It literally means **Scalable Vector Graphics**.

1. 写死宽高的svg在ie下会控制不对那个background-size
1. svg可内联样式或者外部加载样式内联可以覆盖，外链也可以important覆盖
1. base64css不能有空格中间,而且外链的css失效,内联可以
1. base64 datauri(解决方法是用escape)
    > All the examples above have base64 as the encoding, but data URI's do not have to be base64. In fact in the case of SVG, it's probably better NOT to use base64. Primarily because the native format of SVG is much more repetitive than base64 ends up, it gzips better. **_Non-base64-encoded SVG data URIs need to be uriencoded to work in IE and Firefox as according to the specification._**
    [no-base64?](https://css-tricks.com/probably-dont-base64-svg/),
    [base64<=>source](http://www.mobilefish.com/services/base64/base64.php),
    [optimizeSVG](http://petercollingridge.appspot.com/svg-optimiser),
    [workflow](http://www.youtube.com/watch?v=iVzW3XuOm7E&feature=youtu.be)