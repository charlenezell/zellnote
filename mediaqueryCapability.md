#mediaQuery的兼容测试
min-width:auto在某些浏览器里面默认值比较奇葩，重设只能这样设置...
只能写成min-width:0
测试发觉兼容性比较好的有width,aspect-ratio,orientation
带有device的不一定可信
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no" id="devicemetasetting">
  <title>下载极速争霸</title>
  <script type="text/javascript">
  /*(function(){
    var platform="";
    var platformToURL={
      android:"android.apk",
      ios:"ios.ipa",
      other:location.href
    };
    if(navigator.userAgent.search(/(android|Linux)/i)>-1){
      platform="android";
    }else if(navigator.userAgent.search(/(iphone|iPad)/i)>-1){
      platform="ios";
    }else{
      platform="other";
    }
    alert("你在用:"+platform);
    var isMicroMessenger=false;
    if(navigator.userAgent.search(/micromessenger/i)>-1){
      isMicroMessenger=true;
    }
    if(isMicroMessenger){
      alert("微信展示右上角东西");
    }else{
      alert("准备跳转到:"+platformToURL[platform]);
      location.href=platformToURL[platform];
    }
  })();*/
  </script>
  <style type="text/css">
  .a,.b,.c,.d,.e,.f{display: none;}
      @media (max-width: 900px) {
       .a{display: block;}
      }
      @media (max-device-width: 900px) {
       .b{display: block;}
      }
      @media (max-aspect-ratio:40/40){
        .c{display: block;}
      }
      @media (max-device-aspect-ratio:40/40){
        .d{display: block;}
      }
      @media (orientation:landscape){
        .e{display: block;}
      }
      @media (orientation:portrait){
        .f{display: block;}
      }
  </style>
<script type="text/javascript">
  alert(window.innerWidth)
</script>
</head>
<body>
<div class="a">width</div>
<div class="b">device</div>
<div class="c">radias</div>
<div class="d">deviceradias</div>
<div class="e">lan</div>
<div class="f">po</div>
</body>
</html>
```
