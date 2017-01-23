webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/sass-loader/index.js?sourceMap!./index.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/sass-loader/index.js?sourceMap!./index.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, ".hello__pop {\n  text-align: center; }\n\n.hello__pop {\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  _position: absolute;\n  width: 100%;\n  height: 100%;\n  _height: expression(document.compatMode&&'CSS1Compat'==document.compatMode?document.documentElement.clientHeight:document.body.clientHeight);\n  top: 0;\n  left: 0;\n  _top: expression(document.documentElement.clientHeight,document.compatMode&&'CSS1Compat'==document.compatMode?document.documentElement.scrollTop:document.body.scrollTop);\n  z-index: 1000; }\n\n.hello__td {\n  vertical-align: middle;\n  text-align: center;\n  border: 0; }\n\n.hello__main {\n  display: inline-block;\n  position: relative;\n  z-index: 2; }\n\n.hello__overlay {\n  position: fixed;\n  _position: absolute;\n  width: 100%;\n  height: 100%;\n  _height: expression(document.compatMode&&'CSS1Compat'==document.compatMode?document.documentElement.clientHeight:document.body.clientHeight);\n  top: 0;\n  left: 0;\n  opacity: 0.4;\n  filter: alpha(opacity=40);\n  z-index: 1;\n  background-color: red; }\n\n.hello__main {\n  width: 200px;\n  height: 200px;\n  background-color: green; }\n", "", {"version":3,"sources":["/./src/style/src/style/index.scss","/./src/style/E:/projectA/source/web/resource/marketnew/common/src/scss/common/_mixins.scss"],"names":[],"mappings":"AAII;EACI,mBAAkB,EACrB;;AC2uBH;EACI,YAAU;EACV,aAAW;EAuBf,gBAAe;GACf,mBAAmB;EACnB,YAAU;EACV,aAAW;GACX,4IAA2I;EAC3I,OAAK;EACL,QAAM;GAEH,yKAAwK;EA7BvK,cD9uBiB,EC+uBpB;;AACD;EACI,uBAAsB;EACtB,mBAAkB;EACd,UAAS,EAChB;;AACD;EACE,sBAAqB;EACrB,mBAAkB;EAClB,WAAS,EACV;;AACD;EASA,gBAAe;GACf,mBAAmB;EACnB,YAAU;EACV,aAAW;GACX,4IAA2I;EAC3I,OAAK;EACL,QAAM;EA9RN,aD3eyB;EC4ezB,0BAAuC;EAiRrC,WAAS;EACT,sBD9vB2B,EC+vB5B;;AD9vBC;EACI,aAAW;EACX,cAAa;EACb,wBAAsB,EACzB","file":"index.scss","sourcesContent":["@import \"variables\";\r\n@import \"mixins\";\r\n\r\n.hello{\r\n    &__pop{\r\n        text-align: center;\r\n    }\r\n    @include pop01(1000,0.4,red);\r\n    &__main{\r\n        width:200px;\r\n        height: 200px;\r\n        background-color:green;\r\n    }\r\n}","@charset \"utf-8\";\r\n//                                                __\r\n//                                               /\\ \\__\r\n//   ____     __   _____      __     _ __    __  \\ \\ ,_\\    __\r\n//  /',__\\  /'__`\\/\\ '__`\\  /'__`\\  /\\`'__\\/'__`\\ \\ \\ \\/  /'__`\\\r\n// /\\__, `\\/\\  __/\\ \\ \\L\\ \\/\\ \\L\\.\\_\\ \\ \\//\\ \\L\\.\\_\\ \\ \\_/\\  __/\r\n// \\/\\____/\\ \\____\\\\ \\ ,__/\\ \\__/.\\_\\\\ \\_\\\\ \\__/.\\_\\\\ \\__\\ \\____\\\r\n//  \\/___/  \\/____/ \\ \\ \\/  \\/__/\\/_/ \\/_/ \\/__/\\/_/ \\/__/\\/____/\r\n\r\n\r\n@mixin when($alias) {\r\n  @if $alias == mobile {\r\n    @media (max-width: $mobileBreakPointWidth) {\r\n      @content;\r\n    }\r\n  }\r\n  @if $alias == pc {\r\n    @media (min-width: ($mobileBreakPointWidth + 1px)) {\r\n      @content;\r\n    }\r\n  }\r\n  @if $alias == pcnew{\r\n    @if &{//存在上下文就unshift\r\n      @include unshiftClass(\".html--inpc\"){\r\n        @content;\r\n      };\r\n    } @else{//否则是直接套一个类在外面\r\n      .html--inpc {\r\n          @content;\r\n      }\r\n    }\r\n  }\r\n  @if $alias == pcmain {\r\n    @media (max-width: $pcMainWidth) {\r\n      @content;\r\n    }\r\n  }\r\n}\r\n\r\n//                                                __\r\n//                                               /\\ \\__\r\n//   ____     __   _____      __     _ __    __  \\ \\ ,_\\    __\r\n//  /',__\\  /'__`\\/\\ '__`\\  /'__`\\  /\\`'__\\/'__`\\ \\ \\ \\/  /'__`\\\r\n// /\\__, `\\/\\  __/\\ \\ \\L\\ \\/\\ \\L\\.\\_\\ \\ \\//\\ \\L\\.\\_\\ \\ \\_/\\  __/\r\n// \\/\\____/\\ \\____\\\\ \\ ,__/\\ \\__/.\\_\\\\ \\_\\\\ \\__/.\\_\\\\ \\__\\ \\____\\\r\n//  \\/___/  \\/____/ \\ \\ \\/  \\/__/\\/_/ \\/_/ \\/__/\\/_/ \\/__/\\/____/\r\n//2个等级的字体\r\n\r\n@mixin setfontfamily($type) {\r\n  @if $type == 1 {\r\n    font-family: $fontFamily_normal;\r\n  }\r\n\r\n  @if $type == 2 {\r\n    font-family: $fontFamily_special;\r\n  }\r\n}\r\n\r\n@mixin sethlhSame($height){\r\n  height:$height;\r\n  line-height:$height;\r\n}\r\n\r\n@mixin sethlh($type){\r\n  @if $type == 1 {\r\n    height:$fontSize_small * 2;\r\n    line-height:$fontSize_small * 2;\r\n    @include when(mobile) {\r\n      height:$fontSize_smallrem * 2;\r\n      line-height:$fontSize_smallrem * 2;\r\n    }\r\n  }\r\n\r\n  @if $type == 2 {\r\n    height: $fontSize_normal * 2;\r\n    line-height: $fontSize_normal * 2;\r\n\r\n    @include when(mobile) {\r\n      height: $fontSize_normalrem * 2;\r\n      line-height: $fontSize_normalrem * 2;\r\n    }\r\n  }\r\n\r\n  @if $type == 3 {\r\n    height: $fontSize_normal2 * 2;\r\n    line-height: $fontSize_normal2 * 2;\r\n\r\n    @include when(mobile) {\r\n      height: $fontSize_normal2rem * 2;\r\n      line-height: $fontSize_normal2rem * 2;\r\n    }\r\n  }\r\n\r\n  @if $type == 4 {\r\n    height: $fontSize_title_normal * 2;\r\n    line-height: $fontSize_title_normal * 2;\r\n\r\n    @include when(mobile) {\r\n      height: $fontSize_title_normalrem * 2;\r\n      line-height: $fontSize_title_normalrem * 2;\r\n    }\r\n  }\r\n\r\n\r\n  @if $type == 5 {\r\n    height: $fontSize_title_large * 2;\r\n    line-height: $fontSize_title_large * 2;\r\n\r\n    @include when(mobile) {\r\n      height: $fontSize_title_largerem * 2;\r\n      line-height: $fontSize_title_largerem * 2;\r\n    }\r\n  }\r\n}\r\n\r\n//5个等级的字体大小\r\n@mixin setfontsize($type,$force:false) {\r\n  @if $type == 1 {\r\n    font-size: #{$fontSize_small}(if($force,#{\"!important\"},#{\"\"}));\r\n\r\n    @include when(mobile) {\r\n      font-size: #{$fontSize_small}(if($force,#{\"!important\"},#{\"\"}));\r\n      font-size: #{$fontSize_smallrem}(if($force,#{\"!important\"},#{\"\"}));\r\n    }\r\n  }\r\n\r\n  @if $type == 2 {\r\n    font-size: #{$fontSize_normal}(if($force,#{\"!important\"},#{\"\"}));\r\n\r\n    @include when(mobile) {\r\n      font-size: #{$fontSize_normal}(if($force,#{\"!important\"},#{\"\"}));\r\n      font-size: #{$fontSize_normalrem}(if($force,#{\"!important\"},#{\"\"}));\r\n    }\r\n  }\r\n\r\n  @if $type == 3 {\r\n    font-size: #{$fontSize_normal2}(if($force,#{\"!important\"},#{\"\"}));\r\n\r\n    @include when(mobile) {\r\n      font-size: #{$fontSize_normal2}(if($force,#{\"!important\"},#{\"\"}));\r\n      font-size: #{$fontSize_normal2rem}(if($force,#{\"!important\"},#{\"\"}));\r\n    }\r\n  }\r\n\r\n  @if $type == 4 {\r\n    font-size: #{$fontSize_title_normal}(if($force,#{\"!important\"},#{\"\"}));\r\n\r\n    @include when(mobile) {\r\n      font-size: #{$fontSize_title_normal}(if($force,#{\"!important\"},#{\"\"}));\r\n      font-size: #{$fontSize_title_normalrem}(if($force,#{\"!important\"},#{\"\"}));\r\n    }\r\n  }\r\n\r\n\r\n  @if $type == 5 {\r\n    font-size: #{$fontSize_title_large}(if($force,#{\"!important\"},#{\"\"}));\r\n\r\n    @include when(mobile) {\r\n      font-size: #{$fontSize_title_large}(if($force,#{\"!important\"},#{\"\"}));\r\n      font-size: #{$fontSize_title_largerem}(if($force,#{\"!important\"},#{\"\"}));\r\n    }\r\n  }\r\n}\r\n\r\n//                                                __\r\n//                                               /\\ \\__\r\n//   ____     __   _____      __     _ __    __  \\ \\ ,_\\    __\r\n//  /',__\\  /'__`\\/\\ '__`\\  /'__`\\  /\\`'__\\/'__`\\ \\ \\ \\/  /'__`\\\r\n// /\\__, `\\/\\  __/\\ \\ \\L\\ \\/\\ \\L\\.\\_\\ \\ \\//\\ \\L\\.\\_\\ \\ \\_/\\  __/\r\n// \\/\\____/\\ \\____\\\\ \\ ,__/\\ \\__/.\\_\\\\ \\_\\\\ \\__/.\\_\\\\ \\__\\ \\____\\\r\n//  \\/___/  \\/____/ \\ \\ \\/  \\/__/\\/_/ \\/_/ \\/__/\\/_/ \\/__/\\/____/\r\n\r\n@mixin toe($isscroll:false) {\r\n  //文字省略?\r\n  overflow: hidden !important;\r\n  @if $isscroll==true {overflow-x: scroll !important;}\r\n  white-space: nowrap !important;\r\n  text-overflow: ellipsis !important;\r\n}\r\n\r\n@mixin toeline($linenumb:1) {\r\n  display:block;\r\n  overflow: hidden !important;\r\n  text-overflow: ellipsis !important;\r\n  -webkit-line-clamp: $linenumb;\r\n  display: -webkit-box;\r\n  -webkit-box-orient: vertical;\r\n}\r\n//                                                __\r\n//                                               /\\ \\__\r\n//   ____     __   _____      __     _ __    __  \\ \\ ,_\\    __\r\n//  /',__\\  /'__`\\/\\ '__`\\  /'__`\\  /\\`'__\\/'__`\\ \\ \\ \\/  /'__`\\\r\n// /\\__, `\\/\\  __/\\ \\ \\L\\ \\/\\ \\L\\.\\_\\ \\ \\//\\ \\L\\.\\_\\ \\ \\_/\\  __/\r\n// \\/\\____/\\ \\____\\\\ \\ ,__/\\ \\__/.\\_\\\\ \\_\\\\ \\__/.\\_\\\\ \\__\\ \\____\\\r\n//  \\/___/  \\/____/ \\ \\ \\/  \\/__/\\/_/ \\/_/ \\/__/\\/_/ \\/__/\\/____/\r\n\r\n@mixin textCenter {\r\n  //文字居中\r\n  text-align: center !important;\r\n}\r\n\r\n//                                                __\r\n//                                               /\\ \\__\r\n//   ____     __   _____      __     _ __    __  \\ \\ ,_\\    __\r\n//  /',__\\  /'__`\\/\\ '__`\\  /'__`\\  /\\`'__\\/'__`\\ \\ \\ \\/  /'__`\\\r\n// /\\__, `\\/\\  __/\\ \\ \\L\\ \\/\\ \\L\\.\\_\\ \\ \\//\\ \\L\\.\\_\\ \\ \\_/\\  __/\r\n// \\/\\____/\\ \\____\\\\ \\ ,__/\\ \\__/.\\_\\\\ \\_\\\\ \\__/.\\_\\\\ \\__\\ \\____\\\r\n//  \\/___/  \\/____/ \\ \\ \\/  \\/__/\\/_/ \\/_/ \\/__/\\/_/ \\/__/\\/____/\r\n\r\n@mixin blockCenter {\r\n  //块居?\r\n  margin-left: auto !important;\r\n  margin-right: auto !important;\r\n}\r\n\r\n//                                                __\r\n//                                               /\\ \\__\r\n//   ____     __   _____      __     _ __    __  \\ \\ ,_\\    __\r\n//  /',__\\  /'__`\\/\\ '__`\\  /'__`\\  /\\`'__\\/'__`\\ \\ \\ \\/  /'__`\\\r\n// /\\__, `\\/\\  __/\\ \\ \\L\\ \\/\\ \\L\\.\\_\\ \\ \\//\\ \\L\\.\\_\\ \\ \\_/\\  __/\r\n// \\/\\____/\\ \\____\\\\ \\ ,__/\\ \\__/.\\_\\\\ \\_\\\\ \\__/.\\_\\\\ \\__\\ \\____\\\r\n//  \\/___/  \\/____/ \\ \\ \\/  \\/__/\\/_/ \\/_/ \\/__/\\/_/ \\/__/\\/____/\r\n\r\n@mixin siteColorConfig {\r\n  @include when(mobile){\r\n    ::-webkit-scrollbar-track-piece{\r\n      background-color:#fff;\r\n      -webkit-border-radius:3;\r\n    }\r\n    ::-webkit-scrollbar{\r\n      width:0px;\r\n      height:0px;\r\n    }\r\n    ::-webkit-scrollbar-thumb{\r\n      height:1px;\r\n      background-color:#999;\r\n      -webkit-border-radius:7px;\r\n      outline:2px solid #fff;\r\n      outline-offset:-2px;\r\n      border: 2px solid #fff;\r\n    }\r\n  };\r\n  ::selection {\r\n    background: $bgc_selection;\r\n    color: $color_selectioin;\r\n  }\r\n\r\n  //站点通用配置\r\n  //链接颜色\r\n  html{background-color: #fff;}\r\n  *{\r\n    outline:none;\r\n    border:none;\r\n  }\r\n  a {\r\n\r\n    color: $color_link;\r\n    text-decoration: none;\r\n    &:hover {\r\n      color: $color_link__Hover;\r\n      text-decoration: underline;\r\n    }\r\n  }\r\n\r\n  ul, ol, dl {\r\n    padding: 0;\r\n  }\r\n\r\n  li {\r\n    list-style: none;\r\n  }\r\n\r\n  //全局字体和行高设?\r\n  html {\r\n    line-height: 1;\r\n    font-family: $fontFamily_normal;\r\n\r\n    @include setfontsize(2);\r\n  }\r\n  .justPC{\r\n  @include when(mobile){\r\n    display: none!important;\r\n  };\r\n}\r\n\r\n.justMobileB{\r\n  @include when(pcnew){\r\n    display: none!important;\r\n  };\r\n  @include when(mobile){\r\n    display: block;\r\n  };\r\n}\r\n\r\n.justMobileIB{\r\n  @include when(pcnew){\r\n    display: none!important;\r\n  };\r\n  @include when(mobile){\r\n    display: inline-block;\r\n  };\r\n}\r\n.justMobileI{\r\n  @include when(pcnew){\r\n    display: none!important;\r\n  };\r\n  @include when(mobile){\r\n    display:inline;\r\n  };\r\n}\r\n}\r\n\r\n//                                                __\r\n//                                               /\\ \\__\r\n//   ____     __   _____      __     _ __    __  \\ \\ ,_\\    __\r\n//  /',__\\  /'__`\\/\\ '__`\\  /'__`\\  /\\`'__\\/'__`\\ \\ \\ \\/  /'__`\\\r\n// /\\__, `\\/\\  __/\\ \\ \\L\\ \\/\\ \\L\\.\\_\\ \\ \\//\\ \\L\\.\\_\\ \\ \\_/\\  __/\r\n// \\/\\____/\\ \\____\\\\ \\ ,__/\\ \\__/.\\_\\\\ \\_\\\\ \\__/.\\_\\\\ \\__\\ \\____\\\r\n//  \\/___/  \\/____/ \\ \\ \\/  \\/__/\\/_/ \\/_/ \\/__/\\/_/ \\/__/\\/____/\r\n\r\n@mixin layout-w-1-2 {\r\n  width: percentage(1 / 2);\r\n  box-sizing: border-box;\r\n}\r\n\r\n@mixin layout-w-1-3 {\r\n  width: percentage(1 / 3);\r\n  box-sizing: border-box;\r\n}\r\n\r\n@mixin layout-w-2-3 {\r\n  width: percentage(2 / 3);\r\n  box-sizing: border-box;\r\n}\r\n\r\n@mixin layout-w-1-4 {\r\n  width: percentage(1 / 4);\r\n  box-sizing: border-box;\r\n}\r\n\r\n@mixin layout-w-3-4 {\r\n  width: percentage(3 / 4);\r\n  box-sizing: border-box;\r\n}\r\n\r\n@mixin layout-w-1-5 {\r\n  width: percentage(1 / 5);\r\n  box-sizing: border-box;\r\n}\r\n\r\n@mixin layout-w-2-5 {\r\n  width: percentage(2 / 5);\r\n  box-sizing: border-box;\r\n}\r\n\r\n@mixin layout-w-3-5 {\r\n  width: percentage(3 / 5);\r\n  box-sizing: border-box;\r\n}\r\n\r\n@mixin layout-w-4-5 {\r\n  width: percentage(4 / 5);\r\n  box-sizing: border-box;\r\n}\r\n@mixin layout-w-1-6 {\r\n  width: percentage(1 / 6);\r\n  box-sizing: border-box;\r\n}\r\n@mixin layout-w-1-7 {\r\n  width: percentage(1 / 7);\r\n  box-sizing: border-box;\r\n}\r\n@mixin layout-w-2-7 {\r\n  width: percentage(2 / 7);\r\n  box-sizing: border-box;\r\n}\r\n@mixin layout-w-3-7 {\r\n  width: percentage(3 / 7);\r\n  box-sizing: border-box;\r\n}\r\n@mixin layout-w-2-9 {\r\n  width: percentage(2 / 9);\r\n  box-sizing: border-box;\r\n}\r\n\r\n//                                                __\r\n//                                               /\\ \\__\r\n//   ____     __   _____      __     _ __    __  \\ \\ ,_\\    __\r\n//  /',__\\  /'__`\\/\\ '__`\\  /'__`\\  /\\`'__\\/'__`\\ \\ \\ \\/  /'__`\\\r\n// /\\__, `\\/\\  __/\\ \\ \\L\\ \\/\\ \\L\\.\\_\\ \\ \\//\\ \\L\\.\\_\\ \\ \\_/\\  __/\r\n// \\/\\____/\\ \\____\\\\ \\ ,__/\\ \\__/.\\_\\\\ \\_\\\\ \\__/.\\_\\\\ \\__\\ \\____\\\r\n//  \\/___/  \\/____/ \\ \\ \\/  \\/__/\\/_/ \\/_/ \\/__/\\/_/ \\/__/\\/____/\r\n\r\n//这个可以这样?\r\n// <div class=\"ct-container2\">容器\r\n//   <span class=\"ct-content\">！！！！这个必须是span！！！！\r\n//     <div class=\"maxwidth400\"这个必须是inlineblock如果要自动水平居中的?<h1>Some text</h1><p>But he stole up to us again, and suddenly clapping his hand on my shoulder, said?Did ye see anything looking like men going towards that ship a while ago?\"</p></div>\r\n//   </span><b class=\"ct-faker\"></b>这个必须写出?\r\n// </div>\r\n//.ct-container2{@include center-tablecelinline(800,400)}\r\n//但是如果内容大过一屏的话就只能在大过一屏的大内容块里面居中所以更加通用的弹窗用不了这个东西\r\n@mixin center-tablecellinline($width, $height) {\r\n  & {\r\n    width: if(unitless($width), #{$width}px, $width);\r\n    height: if(unitless($height), #{$height}px, $height);\r\n    display: table;\r\n    text-align: center;\r\n\r\n    .ct-content {\r\n      display: table-cell;\r\n      vertical-align: middle;\r\n      *display: inline-block;\r\n    }\r\n\r\n    .ct-faker {\r\n      display: inline-block;\r\n      height: 100%;\r\n      vertical-align: middle;\r\n    }\r\n  }\r\n}\r\n\r\n//                                                __\r\n//                                               /\\ \\__\r\n//   ____     __   _____      __     _ __    __  \\ \\ ,_\\    __\r\n//  /',__\\  /'__`\\/\\ '__`\\  /'__`\\  /\\`'__\\/'__`\\ \\ \\ \\/  /'__`\\\r\n// /\\__, `\\/\\  __/\\ \\ \\L\\ \\/\\ \\L\\.\\_\\ \\ \\//\\ \\L\\.\\_\\ \\ \\_/\\  __/\r\n// \\/\\____/\\ \\____\\\\ \\ ,__/\\ \\__/.\\_\\\\ \\_\\\\ \\__/.\\_\\\\ \\__\\ \\____\\\r\n//  \\/___/  \\/____/ \\ \\ \\/  \\/__/\\/_/ \\/_/ \\/__/\\/_/ \\/__/\\/____/\r\n\r\n@mixin bgrgba($args...) {\r\n  @if type-of(nth($args, 1)) == \"color\" {\r\n    @at-root{\r\n      .btbuild_rgba &{\r\n          background-color: rgba(nth($args, 1), nth($args, 2));\r\n      }\r\n      .btbuild_no-rgba &{\r\n        filter: progid:DXImageTransform.Microsoft.gradient(enabled='true',startcolorstr=#{ie-hex-str(rgba(nth($args, 1), nth($args, 2)))},endcolorstr=#{ie-hex-str(rgba(nth($args, 1), nth($args, 2)))});\r\n      }\r\n    }\r\n  }\r\n\r\n  @if type-of(nth($args, 1)) == \"number\" {\r\n    @at-root{\r\n      .btbuild_rgba &{\r\n        background-color: rgba(nth($args, 1), nth($args, 2), nth($args, 3), nth($args, 4));\r\n      }\r\n      .btbuild_no-rgba &{\r\n        filter: progid:DXImageTransform.Microsoft.gradient(enabled='true',startcolorstr=#{ie-hex-str(rgba(nth($args, 1), nth($args, 2), nth($args, 3), nth($args, 4)))},endcolorstr=#{ie-hex-str(rgba(nth($args, 1), nth($args, 2), nth($args, 3), nth($args, 4)))});\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n//                                                __\r\n//                                               /\\ \\__\r\n//   ____     __   _____      __     _ __    __  \\ \\ ,_\\    __\r\n//  /',__\\  /'__`\\/\\ '__`\\  /'__`\\  /\\`'__\\/'__`\\ \\ \\ \\/  /'__`\\\r\n// /\\__, `\\/\\  __/\\ \\ \\L\\ \\/\\ \\L\\.\\_\\ \\ \\//\\ \\L\\.\\_\\ \\ \\_/\\  __/\r\n// \\/\\____/\\ \\____\\\\ \\ ,__/\\ \\__/.\\_\\\\ \\_\\\\ \\__/.\\_\\\\ \\__\\ \\____\\\r\n//  \\/___/  \\/____/ \\ \\ \\/  \\/__/\\/_/ \\/_/ \\/__/\\/_/ \\/__/\\/____/\r\n\r\n@mixin float($side) {\r\n  float: unquote($side);\r\n  display: inline-block;\r\n}\r\n\r\n//                                                __\r\n//                                               /\\ \\__\r\n//   ____     __   _____      __     _ __    __  \\ \\ ,_\\    __\r\n//  /',__\\  /'__`\\/\\ '__`\\  /'__`\\  /\\`'__\\/'__`\\ \\ \\ \\/  /'__`\\\r\n// /\\__, `\\/\\  __/\\ \\ \\L\\ \\/\\ \\L\\.\\_\\ \\ \\//\\ \\L\\.\\_\\ \\ \\_/\\  __/\r\n// \\/\\____/\\ \\____\\\\ \\ ,__/\\ \\__/.\\_\\\\ \\_\\\\ \\__/.\\_\\\\ \\__\\ \\____\\\r\n//  \\/___/  \\/____/ \\ \\ \\/  \\/__/\\/_/ \\/_/ \\/__/\\/_/ \\/__/\\/____/\r\n\r\n@mixin clearfix {\r\n  display: block;\r\n  *zoom: 1;\r\n\r\n  &:after {\r\n    content: \"\\20\";\r\n    display: block;\r\n    height: 0;\r\n    clear: both;\r\n    visibility: hidden;\r\n    overflow: hidden;\r\n  }\r\n}\r\n\r\n//                                                __\r\n//                                               /\\ \\__\r\n//   ____     __   _____      __     _ __    __  \\ \\ ,_\\    __\r\n//  /',__\\  /'__`\\/\\ '__`\\  /'__`\\  /\\`'__\\/'__`\\ \\ \\ \\/  /'__`\\\r\n// /\\__, `\\/\\  __/\\ \\ \\L\\ \\/\\ \\L\\.\\_\\ \\ \\//\\ \\L\\.\\_\\ \\ \\_/\\  __/\r\n// \\/\\____/\\ \\____\\\\ \\ ,__/\\ \\__/.\\_\\\\ \\_\\\\ \\__/.\\_\\\\ \\__\\ \\____\\\r\n//  \\/___/  \\/____/ \\ \\ \\/  \\/__/\\/_/ \\/_/ \\/__/\\/_/ \\/__/\\/____/\r\n\r\n@mixin opacity($opacity) {\r\n  opacity: $opacity;\r\n  filter: alpha(opacity = $opacity * 100);\r\n}\r\n\r\n//                                                __\r\n//                                               /\\ \\__\r\n//   ____     __   _____      __     _ __    __  \\ \\ ,_\\    __\r\n//  /',__\\  /'__`\\/\\ '__`\\  /'__`\\  /\\`'__\\/'__`\\ \\ \\ \\/  /'__`\\\r\n// /\\__, `\\/\\  __/\\ \\ \\L\\ \\/\\ \\L\\.\\_\\ \\ \\//\\ \\L\\.\\_\\ \\ \\_/\\  __/\r\n// \\/\\____/\\ \\____\\\\ \\ ,__/\\ \\__/.\\_\\\\ \\_\\\\ \\__/.\\_\\\\ \\__\\ \\____\\\r\n//  \\/___/  \\/____/ \\ \\ \\/  \\/__/\\/_/ \\/_/ \\/__/\\/_/ \\/__/\\/____/\r\n\r\n@mixin min-height($height) {\r\n  min-height: $height;\r\n  height: auto !important;\r\n  _height: $height;\r\n}\r\n\r\n@mixin min-width($width) {\r\n  min-width: $width;\r\n  width: auto !important;\r\n  _width: $width;\r\n}\r\n\r\n@mixin max-height($height) {\r\n  max-height: $height;\r\n  height: auto !important;\r\n  _height: $height;\r\n}\r\n\r\n@mixin max-width($width) {\r\n  max-width: $width;\r\n  width: auto !important;\r\n  _width: $width;\r\n}\r\n\r\n//                                                __\r\n//                                               /\\ \\__\r\n//   ____     __   _____      __     _ __    __  \\ \\ ,_\\    __\r\n//  /',__\\  /'__`\\/\\ '__`\\  /'__`\\  /\\`'__\\/'__`\\ \\ \\ \\/  /'__`\\\r\n// /\\__, `\\/\\  __/\\ \\ \\L\\ \\/\\ \\L\\.\\_\\ \\ \\//\\ \\L\\.\\_\\ \\ \\_/\\  __/\r\n// \\/\\____/\\ \\____\\\\ \\ ,__/\\ \\__/.\\_\\\\ \\_\\\\ \\__/.\\_\\\\ \\__\\ \\____\\\r\n//  \\/___/  \\/____/ \\ \\ \\/  \\/__/\\/_/ \\/_/ \\/__/\\/_/ \\/__/\\/____/\r\n\r\n// div.logo {\r\n//   background: url(\"logo.png\") no-repeat;\r\n//   @include image-2x(\"logo2x.png\", 100px, 25px);\r\n// }\r\n\r\n// outputing\r\n\r\n// div.logo {\r\n//   background: url(\"logo.png\") no-repeat;\r\n// }\r\n// @media (min--moz-device-pixel-ratio: 1.3),\r\n//        (-o-min-device-pixel-ratio: 2.6 / 2),\r\n//        (-webkit-min-device-pixel-ratio: 1.3),\r\n//        (min-device-pixel-ratio: 1.3),\r\n//        (min-resolution: 1.3dppx) {\r\n//         div.logo {\r\n//             background-image: url(\"logo2x.png\");\r\n//             background-size: 100px 25px;\r\n//         }\r\n// }\r\n@mixin image-2x($image, $width, $height) {\r\n  @media (min--moz-device-pixel-ratio: 1.3), (-o-min-device-pixel-ratio: 2.6 / 2), (-webkit-min-device-pixel-ratio: 1.3), (min-device-pixel-ratio: 1.3), (min-resolution: 1.3dppx) {\r\n    /* on retina, use image that's scaled by 2 */\r\n    background-image: url($image);\r\n    background-size: $width $height;\r\n  }\r\n}\r\n\r\n// .pop {\r\n//   background-color: red;\r\n//   position: relative;\r\n//   float: left;\r\n//   padding: 20px;\r\n\r\n//   .hello {\r\n//     top: -8px;\r\n\r\n//     @include triangle(up, 8px, red, white);\r\n//   }\r\n// }\r\n\r\n// <div class=\"pop\"><div class=\"hello\"></div>hellomynameis</div>\r\n\r\n@mixin triangle($direction, $size: 6px, $color: #222, $color2: transparent) {\r\n  content: '';\r\n  display: block;\r\n  position: absolute;\r\n  height: 0;\r\n  width: 0;\r\n  overflow: hidden;\r\n  border:0;\r\n  @if $direction == \"up\" {\r\n    border-bottom: $size solid $color;\r\n    border-left: (3 / 4 * $size) solid $color2;\r\n    border-right: (3 / 4 * $size) solid $color2;\r\n  }\r\n  @else if $direction == \"down\" {\r\n    border-top: $size solid $color;\r\n    border-left: (3 / 4 * $size) solid $color2;\r\n    border-right: (3 / 4 * $size) solid $color2;\r\n  }\r\n  @else if $direction == \"left\" {\r\n    border-top: (3 / 4 * $size) solid $color2;\r\n    border-bottom: (3 / 4 * $size) solid $color2;\r\n    border-right: $size solid $color;\r\n  }\r\n  @else if $direction == \"right\" {\r\n    border-top: (3 / 4 * $size) solid $color2;\r\n    border-bottom: (3 / 4 * $size) solid $color2;\r\n    border-left: $size solid $color;\r\n  }\r\n}\r\n\r\n@mixin imgAlpha($absurl){\r\n  background:url($absurl) no-repeat;\r\n  _background-image:none;\r\n  _filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='$absurl');\r\n}\r\n\r\n@mixin abstl($t:0,$l:0){position: absolute!important;top:$t;left:$l;right:auto!important;bottom:auto!important;}\r\n@mixin abstr($t:0,$r:0){position: absolute!important;top:$t;left:auto!important;right:$r;bottom:auto!important;}\r\n@mixin absbl($l:0,$b:0){position: absolute!important;top:auto!important;left:$l;right:auto!important;bottom:$b;}\r\n@mixin absbr($b:0,$r:0){position: absolute!important;top:auto!important;left:auto!important;right:$r;bottom:$b;}\r\n\r\n@mixin wh($w,$h) {\r\n  width: $w;\r\n  height: $h\r\n}\r\n@mixin h-lh($h){\r\n  height: $h;\r\n  line-height: $h\r\n}\r\n@mixin mainWidget($width:1000px){\r\n  width: $width;margin: 0 auto;\r\n}\r\n@mixin pa{position:absolute;}\r\n@mixin pr{position:relative;}\r\n@mixin toh{white-space:nowrap;\r\n  text-overflow:ellipsis;\r\n  -o-text-overflow:ellipsis;\r\n  overflow: hidden;}\r\n@mixin wbk{\r\n  word-break: break-all;\r\n  word-wrap: break-word;\r\n}\r\n@mixin dibWrap{font-size:0;*word-spacing:-1px;}\r\n@mixin dib{font-size: 12px;\r\n    letter-spacing: normal;\r\n    word-spacing: normal;\r\n    vertical-align:top;\r\n\t display: inline-block;\r\n    *display:inline;\r\n    *zoom:1;\r\n\t}\r\n//日后补上sass生成sprite获取位置的办?\r\n// @mixin mobileicon($iconwidth,$iconheight,$destWidth,$destHeight){\r\n//     $height:(50/12/2);\r\n//     $width:(50/12/2) * (115/41);\r\n//     $xscale:$width;\r\n//     line-height: $height;\r\n//     @include wh($width#{rem},$height#{rem});\r\n//     background-size:$xscale#{rem} auto;\r\n// }\r\n\r\n@mixin noinlinespace {\r\n    font-size: 0;\r\n    -webkit-text-size-adjust:none;\r\n}\r\n\r\n@function comcalmobile($n,$baseOnWidth){\r\n  //设计最小屏幕为320px，同时最小字号浏览器限制为12px\r\n  $designMinWidth:320;\r\n  $designMinFontSize:12;\r\n  @return ($n/$designMinFontSize/($baseOnWidth/$designMinWidth))*1rem;\r\n}\r\n\r\n@function calmobile($n) {\r\n  @return #{($n/12/2)}rem;\r\n}\r\n\r\n@function ncalmobile($n) {\r\n  @return comcalmobile($n,640);\r\n}\r\n\r\n\r\n@function nc750($n){\r\n @return comcalmobile($n,750);\r\n}\r\n// @debug(comcalmobile(28.125,750));\r\n// @debug(ncalmobile(24));\r\n\r\n@mixin fontsetting($size,$lineheight,$msize:null,$mlineheight:null,$color:null,$hcolor:null) {\r\n  font-size: if(unitless($size),#{$size}px,$size);/*pc端支持有没有px单位*/\r\n  @if (unitless($lineheight) and $lineheight >= 12){\r\n    //假定没有单位且小于12有可能用行高倍数来做so...\r\n    line-height: #{$lineheight}px;\r\n  }@else{\r\n    line-height: $lineheight;\r\n  }\r\n  @if ($msize != null and $mlineheight != null) {\r\n    @include when(mobile){\r\n      font-size: calmobile($msize);/*m只支持无单位*/\r\n      @if ($mlineheight >= 24){\r\n        //假定没有单位且小于12有可能用行高倍数来做so...\r\n        line-height: calmobile($mlineheight);\r\n      }@else{\r\n        line-height: $mlineheight;\r\n      }\r\n    };\r\n  }\r\n  @if ($color != null) {\r\n    color:$color;\r\n  }\r\n  @if ($hcolor != null) {\r\n    &:hover{color:$hcolor;}\r\n  }\r\n}\r\n@function getbgpct($iconlength,$imgposition,$imglength){\r\n  @if $imgposition == 0 {\r\n    @return 0;\r\n  }\r\n  @return percentage(($imgposition)/($imglength - $iconlength));\r\n}\r\n@mixin bgp($imgw,$imgh,$ofx,$ofy,$bgw,$bgh) {\r\n  background-position:-$ofx#{px} -$ofy#{px};//ie某些认不出两位小数的精确度百分比so\r\n  @include when(mobile){\r\n    background-position:getbgpct($imgw,$ofx,$bgw) getbgpct($imgh,$ofy,$bgh);\r\n    background-size:percentage($bgw / $imgw) percentage($bgh / $imgh);\r\n  };\r\n}\r\n\r\n@function defaultPx($n){\r\n  @return if(unitless($n),#{$n}px,$n);\r\n}\r\n@function strip-unit($number) {\r\n  @if type-of($number) == 'number' and not unitless($number) {\r\n    @return $number / ($number * 0 + 1);\r\n  }\r\n\r\n  @return $number;\r\n}\r\n\r\n@mixin pop01($basezIndex:1000,$overlayOpacity:0.5,$overlayColor:#000){\r\n//   <table class=\"hello__pop\">\r\n//     <tr>\r\n//         <td class=\"hello__pop__td\">\r\n//             <div class=\"hello__main\">helloworld</div>\r\n//             <div class=\"hello__overlay\"></div>\r\n//         </td>\r\n//     </tr>\r\n// </table>\r\n  &__pop{\r\n      width:100%;\r\n      height:100%;\r\n      @include overlay;\r\n      z-index: $basezIndex;\r\n  }\r\n  &__td{\r\n      vertical-align: middle;\r\n      text-align: center;\r\n          border: 0;\r\n  }\r\n  &__main{\r\n    display: inline-block;\r\n    position: relative;\r\n    z-index:2;\r\n  }\r\n  &__overlay{\r\n    @include overlay(false);\r\n    @include opacity($overlayOpacity);\r\n    z-index:1;\r\n    background-color: $overlayColor;\r\n  }\r\n}\r\n\r\n@mixin overlay($sss:true){\r\n  position: fixed;\r\n  _position: absolute;\r\n  width:100%;\r\n  height:100%;\r\n  _height:expression(document.compatMode&&'CSS1Compat'==document.compatMode?document.documentElement.clientHeight:document.body.clientHeight);\r\n  top:0;\r\n  left:0;\r\n  @if($sss){\r\n     _top:expression(document.documentElement.clientHeight,document.compatMode&&'CSS1Compat'==document.compatMode?document.documentElement.scrollTop:document.body.scrollTop);\r\n  }\r\n}\r\n@mixin posfix($x,$y,$coodinary:0){\r\n  $percent:if(unit($y)==\"%\",\"wh*\"(strip-unit($y))/100,strip-unit($y));\r\n  position: fixed;\r\n  _position:absolute; /* position fixed for IE6 */\r\n  @if($coodinary==0){\r\n    left:defaultPx($x);\r\n    top:defaultPx($y);\r\n    _top:expression(document.documentElement.clientHeight,document.compatMode&&'CSS1Compat'==document.compatMode?document.documentElement.scrollTop+#{$percent}:document.body.scrollTop+#{$percent});\r\n  }@else if($coodinary==1){\r\n    right:defaultPx($x);\r\n    top:defaultPx($y);\r\n    _top:expression();\r\n  }@else if($coodinary==2){\r\n    right:defaultPx($x);\r\n    bottom:defaultPx($y);\r\n    _bottom:auto;\r\n    _top:expression(document.documentElement.clientHeight,document.compatMode&&'CSS1Compat'==document.compatMode?document.documentElement.scrollTop+#{$percent}:document.body.scrollTop+#{$percent});\r\n  }@else{\r\n    left:defaultPx($x);\r\n    bottom:defaultPx($y);\r\n    _bottom:auto;\r\n    _top:expression(document.compatMode&&'CSS1Compat'==document.compatMode?document.documentElement.scrollTop+#{$percent}:document.body.scrollTop+document.documentElement.clientHeight-a.clientHeight-#{$percent});\r\n  }\r\n}\r\n@mixin bgp_newabs($imgw,$imgh,$ofx,$ofy,$bgw,$bgh) {\r\n  // background-position:-$ofx#{px} -$ofy#{px};//ie某些认不出两位小数的精确度百分比so\r\n  // @include when(mobile){\r\n  background-position:#{-$ofx}px #{-$ofy}px;\r\n  // };\r\n}\r\n@mixin bgp_new($imgw,$imgh,$ofx,$ofy,$bgw,$bgh) {\r\n  // background-position:-$ofx#{px} -$ofy#{px};//ie某些认不出两位小数的精确度百分比so\r\n  // @include when(mobile){\r\n    background-position:getbgpct($imgw,$ofx,$bgw) getbgpct($imgh,$ofy,$bgh);\r\n    background-size:percentage($bgw / $imgw) percentage($bgh / $imgh);\r\n  // };\r\n}\r\n@mixin addCommonInnerBorder($width:1px,$color:#000,$opacity:0.1){\r\n  &{\r\n    position: relative;\r\n  }\r\n  &:after{\r\n    content:\" \";\r\n    position: absolute;\r\n    top: $width;\r\n    left: $width;\r\n    right: $width;\r\n    bottom: $width;\r\n    outline: $width solid;\r\n    @include unshiftClass(\".btbuild_rgba\"){\r\n      outline-color: rgba($color, $opacity);\r\n    };\r\n    @include unshiftClass(\".btbuild_no-rgba\"){\r\n      outline-color:lighten($color, 50%);\r\n    };\r\n  }\r\n}\r\n@mixin addCommonImgBrighter(){\r\n  &{\r\n    position: relative;\r\n  }\r\n  &:before{\r\n    display: none;\r\n    content:\" \";\r\n    position: absolute;\r\n    top: 0px;\r\n    left: 0px;\r\n    right: 0px;\r\n    bottom: 0px;\r\n    background-image: url(http://resource.a0bi.com/marketnew/common/dest/scss/img_s/alpha20.png);\r\n  }\r\n  &:hover:before{\r\n    display: block;\r\n  }\r\n}\r\n@mixin animated ($duration:1s,$count:infinite){\r\n    animation-duration: $duration;\r\n    animation-fill-mode: both;\r\n    animation-iteration-count: $count;\r\n}\r\n@mixin animatePulse_scale($scale:1.01,$duration:2s) {\r\n    @include animated($duration:$duration);\r\n    animation-name: pulse;\r\n  @at-root{\r\n      @keyframes pulse {\r\n        0% {\r\n            transform: scale3d(1,1,1)\r\n        }\r\n        50% {\r\n            transform: scale3d($scale,$scale,$scale)\r\n        }\r\n        100% {\r\n            transform: scale3d(1,1,1)\r\n        }\r\n    }\r\n  }\r\n}\r\n\r\n//                             ___    ___    __\r\n//                           /\\_ \\  /\\_ \\  /\\ \\\r\n//   ____    ___   _ __   ___\\//\\ \\ \\//\\ \\ \\ \\ \\____     __     _ __\r\n//  /',__\\  /'___\\/\\`'__\\/ __`\\\\ \\ \\  \\ \\ \\ \\ \\ '__`\\  /'__`\\  /\\`'__\\\r\n// /\\__, `\\/\\ \\__/\\ \\ \\//\\ \\L\\ \\\\_\\ \\_ \\_\\ \\_\\ \\ \\L\\ \\/\\ \\L\\.\\_\\ \\ \\/\r\n// \\/\\____/\\ \\____\\\\ \\_\\\\ \\____//\\____\\/\\____\\\\ \\_,__/\\ \\__/.\\_\\\\ \\_\\\r\n//  \\/___/  \\/____/ \\/_/ \\/___/ \\/____/\\/____/ \\/___/  \\/__/\\/_/ \\/_/\r\n\r\n\r\n@mixin scrollbar-button($char,$color) {\r\n    background-image: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='12px' width='12px'><text x='0' y='12' fill='#{$color}' font-size='12'>#{$char}</text></svg>\");\r\n}\r\n\r\n@mixin scrollbar-buttons($color) {\r\n    &:vertical:decrement {\r\n        @include scrollbar-button(\"▲\", $color);\r\n    }\r\n    &:vertical:increment {\r\n        @include scrollbar-button(\"▼\", $color);\r\n    }\r\n    &:horizontal:decrement {\r\n        @include scrollbar-button(\"◄\", $color);\r\n    }\r\n    &:horizontal:increment {\r\n        @include scrollbar-button(\"►\", $color);\r\n    }\r\n}\r\n\r\n@mixin initscrollbar-buttons{\r\n  ::-webkit-scrollbar-button {\r\n     & {\r\n        background-repeat: no-repeat;\r\n        height: 15px;\r\n        width: 15px;\r\n        @include scrollbar-buttons(#535353);\r\n\r\n        &:vertical:decrement {\r\n            background-position: 0 -2px;\r\n        }\r\n        &:vertical:increment {\r\n            background-position: 0 1px;\r\n        }\r\n        &:horizontal:decrement {\r\n            background-position: 0 -2px;\r\n        }\r\n        &:horizontal:increment {\r\n            background-position: 3px -2px;\r\n        }\r\n\r\n\r\n        &:hover,\r\n        &:focus {\r\n            background-color: #c0c0c0;\r\n        }\r\n        &:active {\r\n            background-color: #7a7a7a;\r\n            @include scrollbar-buttons(#cbcbcb);\r\n        }\r\n    }\r\n\r\n    // Dark scrollbars\r\n    .platform-win.dark & {\r\n        @include scrollbar-buttons(#ababab);\r\n\r\n        &:hover,\r\n        &:focus {\r\n            background-color: #595959;\r\n        }\r\n        &:active {\r\n            background-color: #a9a9a9;\r\n            @include scrollbar-buttons(#000);\r\n        }\r\n    }\r\n}\r\n}\r\n\r\n@mixin addValignHelper() {\r\n  .valignHelper{\r\n    display: inline-block;\r\n    height: 100%;\r\n    vertical-align: middle;\r\n  }\r\n}\r\n\r\n@mixin dimension($w,$h,$mw:null,$mh:null) {\r\n    width:if(unitless($w),$w#{px},$w);\r\n    height:if(unitless($h),$h#{px},$h);\r\n    @if($mw!=null){\r\n      @include when(mobile){\r\n        width:if(unitless($mw),calmobile($mw),$mw);\r\n        height:if(unitless($mh),calmobile($mh),$mh);\r\n      };\r\n    }\r\n}\r\n\r\n@mixin pos($args...){\r\n  /**\r\n   * 4个重载\r\n   * pos(topleftrightbottom);\r\n   * pos(top,left);\r\n   * pos(x,y,zeropoint);\r\n   * pos(top,right,botom,left);\r\n   * usage:pos(20px)\r\n   *       pos(300px,200px)\r\n   *       pos(20px,40px,br);\r\n   *       pos(40px,auto,auto 30px);\r\n   */\r\n  $temp_pos_length:length($args);\r\n  $oneParam:if($temp_pos_length>=1,nth($args, 1),null);\r\n  $twoParam:if($temp_pos_length>=2,nth($args, 2),null);\r\n  $threeParam:if($temp_pos_length>=3,nth($args,3),null);\r\n  $fourParam:if($temp_pos_length>=4,nth($args, 4),null);\r\n  @if($temp_pos_length==1){\r\n    top:$oneParam;\r\n    right:$oneParam;\r\n    bottom:$oneParam;\r\n    left:$oneParam;\r\n  }@else if($temp_pos_length==2){\r\n    top:$oneParam;\r\n    left:$twoParam;\r\n  }@else if($temp_pos_length==3){\r\n    @if($threeParam==tl){\r\n      top:$oneParam;\r\n      left:$twoParam;\r\n    }@else if($threeParam==tr){\r\n      top:$oneParam;\r\n      right:$twoParam;\r\n    }@else if($threeParam==bl){\r\n      bottom:$oneParam;\r\n      left:$twoParam;\r\n    }@else if($threeParam==br){\r\n      bottom:$oneParam;\r\n      right:$twoParam;\r\n    }\r\n  }@else if($temp_pos_length==4){\r\n    top:$oneParam;\r\n    right:$twoParam;\r\n    bottom:$threeParam;\r\n    left:$fourParam;\r\n  }\r\n}\r\n\r\n@mixin commonmorebtn() {\r\n    display: block;\r\n    height:calmobile(50);\r\n    @include fontsetting(14,14,24,50,#f0f0f0);\r\n    background-color: #ccc;\r\n    text-align: center;\r\n    margin:calmobile(40) 0 calmobile(30);\r\n}\r\n@mixin unshiftClass($prefixClass,$isAnd:false) {\r\n  @at-root{\r\n  @if ($isAnd==true) {\r\n    #{$prefixClass}#{&}{\r\n      @content;\r\n    }\r\n  }@else{\r\n    #{$prefixClass} &{\r\n        @content;\r\n      }\r\n    }\r\n}\r\n}\r\n@mixin vw() {\r\n    -webkit-writing-mode: vertical-rl;\r\n    -ms-writing-mode: tb-rl;\r\n    writing-mode: vertical-rl;\r\n    *writing-mode: tb-rl;/* IE 写法 */\r\n    unicode-bidi : bidi-override;\r\n}\r\n\r\n@mixin addMiddleLine($color:red) {\r\n  position: relative;\r\n  &:before{\r\n    content:\"\";\r\n    top:50%;\r\n    left:0;\r\n    right:0;\r\n    height:1px;\r\n    background-color: $color;\r\n    position: absolute;\r\n    z-index: 1;\r\n  }\r\n}\r\n@mixin mts($margin:0) {\r\n  @include when(mobile){\r\n    margin-top: $margin#{px};\r\n  };\r\n  @include when(pcnew){\r\n    margin-top: calmobile($margin);\r\n  };\r\n}\r\n@mixin mrs($margin:0) {\r\n  @include when(mobile){\r\n    margin-right: $margin#{px};\r\n  };\r\n  @include when(pcnew){\r\n    margin-right: calmobile($margin);\r\n  };\r\n}\r\n@mixin mbs($margin:0) {\r\n  @include when(mobile){\r\n    margin-bottom: $margin#{px};\r\n  };\r\n  @include when(pcnew){\r\n    margin-bottom: calmobile($margin);\r\n  };\r\n}\r\n@mixin pbs($margin:0) {\r\n  @include when(mobile){\r\n    padding-bottom: $margin#{px};\r\n  };\r\n  @include when(pcnew){\r\n    padding-bottom: calmobile($margin);\r\n  };\r\n}\r\n\r\n\r\n@mixin glasseffect01 {\r\n  @include unshiftClass(\".csstransitions\"){\r\n    overflow: hidden;\r\n    position: relative;\r\n    // {transition:500ms all ease;}\r\n\r\n    &:after {\r\n      content: \"\";\r\n      position: absolute;\r\n      height: 0px;\r\n      width: 500px;\r\n      transform: rotate(45deg);\r\n      top: 100%;\r\n      left: 0;\r\n      opacity: 0.5;\r\n      transform-origin: 0 0;\r\n      background-color: #fff;\r\n      transition: 500ms all ease;\r\n    }\r\n\r\n    &:before {\r\n      content: \"\";\r\n      position: absolute;\r\n      width: 100%;\r\n      height: 100%;\r\n      background-color: #fff;\r\n      opacity: 0.3;\r\n      display: none;\r\n    }\r\n    &:hover:after{\r\n      height:500px;\r\n      top:-100%;\r\n      opacity:0;\r\n    }\r\n  };\r\n}\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
]);
//# sourceMappingURL=index.js.map