'use strict';
var fs = require("fs");
var gPath = require("path");
var glob = require("glob");
var cheerio = require('cheerio');

function buildGames(path, games) {
    var root = gPath.dirname(glob.sync(path)[0]);
    console.log(root, games);
    return new Promise((resolve, reject) => {
        var promises = games.map(v => {
            var gamePath = gPath.resolve(root, v);
            return build(gamePath);
        });
        Promise.all(promises).then(function () {
            resolve("done");
        }).catch(e => {
            reject(e);
        });
    });
}

function build(gameRoot) {
    console.log(`building ${gameRoot}`);
    return new Promise((resolve, reject) => {
        var g = gameRoot;
        var roothtmlfils = glob.sync("./*.@(html|htm|HTML|HTM)", {
                cwd: gPath.resolve(g)
            }) //这里不明白case insensitive的功能不成..

        if (roothtmlfils.length > 1) {
            reject(`游戏根目录${g}的html数目大于1，不会进行后续操作`);
        }
        if (roothtmlfils.length < 1) {
            reject(`fail in building ${g} for not exist of .html,.htm file in this game root`);
        }
        var html = fs.readFileSync(gPath.resolve(g, roothtmlfils[0]), "utf8");
        // console.log(html);
        var $ = cheerio.load(html, {
            decodeEntities: false,
            lowerCaseTags: true
        });
        var css = `
  <link rel="shortcut icon" href="icon.jpg">
  <link rel="icon" href="icon.jpg">
  <link type="text/css" href="http://www.doudou.in/play/common/common.css" rel="stylesheet" />
  `;
        var hasJqueryOrZepto = false;
        $("title").text(function () {
            var g = $(this).text() + "--豆豆游戏";
            return g;
        })
        $("script").each(function () {
            if (($(this).attr("src") + "").search(/jquery|zepto/im) > -1) {
                hasJqueryOrZepto = true;
            }
        })
        if (hasJqueryOrZepto) {
            $("script[src*='jquery']").add($("script[src*='zepto']")).prependTo("head");
        }
        if (!hasJqueryOrZepto) {
            css += '<script type="text/javascript" src="http://www.doudou.in/play/common/zepto.min.js"></script>';
        }

        css += '<script src="http://www.doudou.in/play/common/common.js"></script>';

        $("head").append(css);

        const bodyHead = `
  <div id="wx_logo" style="margin:0 auto;display:none;">
    <img src="icon.jpg">
  </div>
  <script>
    btGame.playLogoAdv1();
  </script>
  `;
        const bodyTail = `
  <script>
  btGame.setShare({title:"分享语"});
  </script>
  <script type="text/javascript" src="http://dc.100bt.com/js/dc.js"></script>
  `;
        $("script[src*='code_statistics/cnzz.js']").remove();
        $("script[src*='code_statistics/7724common.js']").replaceWith('<script src="../7724common.js"></script>')
        $("script[src*=7724loading]").remove();
        $("script[src*='api.51h5.com/open/sdk.php']").remove();
		$("script[src*='stat.api.4399.com/h5api/h5api.php']").remove();
		$("script[src*='stat.js']").remove();
        $("body").prepend(bodyHead).append(bodyTail);
        // console.log($.html())
        fs.writeFileSync(gPath.resolve(g, 'index.html'), $.html(), "utf8");
        resolve();
    })
}

exports.builder = buildGames;