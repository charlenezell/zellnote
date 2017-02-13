var system = require('system'),
  fs = require('fs');
var zURL;
(function () {
  function n(t) {
    return t.match(s)[3]
  }

  function i(t) {
    return t.match(s)
  }

  function o(t, n) {
    return a(t.match(s)[8], n)
  }

  function e(t, n) {
    return a(t.match(s)[9] ? t.match(s)[9].substring(1) : !1, n)
  }

  function a(t, n) {
    if (t) {
      var i, o, e = new RegExp("(?:^|&)" + n + "(?:[=]?)(.*?)(?=&|$)", "i"),
        a = new RegExp("(?:^|&)(.+?)(?=&|$)", "gi"),
        s = {};
      if (n)
        return i = e.exec(t),
          i ? i[1] : null;
      for (; o = a.exec(t);) {
        var r = o[1].match(/(^[a-zA-Z0-9]+?)=(.*)/);
        r ? s[$.trim(r[1])] = r[2] : s[$.trim(o[1])] = ""
      }
      return s
    }
    return {}
  }
  var s = /\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/;
  zURL = {
    getDomain: n,
    getSearchQuery: o,
    getHashQuery: e,
    getQuerys: a,
    getParts: i
  }
})();
var data = fs.read("./game.json");
var buildName = "./dest";
fs.makeDirectory(buildName);
try {
  data = JSON.parse(data);
} catch (e) {
  data = {};
}
var w = 0;
var gameNames = data.games.map(function (v, k) {
  return v.name
}).join("|||");

var gameResource = {

};

function updateStatus() {
  console.log("++++++++++++++++++")
  console.log("++++++++left:[" + gameNames + "]");
  data.games.forEach(function (v, k) {
    var game = gameResource[v.name];
    if (game) {
      console.log(v.name + " left " + game.resourceNumb + " to down,timeout:" + game.errs.length + "error:" + game.timeouts.length);
      if (game.resourceNumb < 10) {
        console.log(v.name + " left resource:" + game.gameUrls.join("|||"));
      }
    }
  })
  console.log("------------------")
}

function done(gamename) {
  w++;
  console.log("done download <" + gamename + "> in " + data.games.length + " games;");
  var t = gameNames.split("|||");
  t.splice(t.indexOf(gamename), 1);
  gameNames = t.join("|||");
  if (w >= data.games.length) {
    slimer.exit();
  }
}
if (data.games) {
  data.games.forEach(function (v, k) {
    var currentGame = gameResource[v.name] = {};
    currentGame.resourceNumb = 0;
    currentGame.errs = [];
    currentGame.timeouts = [];
    currentGame.gameUrls = [];

    function getResource(address, gamename, done) {
      var page = require('webpage').create();
      window.onerror = function () {}
      var urls = [];
      page.address = address;
      var itimeout = 0,
        isDone = false;
      page.settings.resourceTimeout = 5 * 1000;
      page.settings.userAgent = "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.80 Safari/537.36";
      page.onResourceRequested = function (res) {
        clearTimeout(itimeout);
        console.log("start downloading:"+res.url);
        currentGame.resourceNumb++;

        if (address == res.url || zURL.getDomain(address) == zURL.getDomain(res.url)) {
          urls.push(res.url.replace(/\?.*?$/, ""));
          if (gameResource[gamename]) {
            gameResource[gamename].gameUrls.push(res.url);
          }
        }
        updateStatus();
        // }
      };
      page.onResourceError = function (response) {
        timeouts.push(response.url);
        ResourceendSniff(response.url);

      }
      page.onResourceTimeout = function (response) {
        errs.push(response.url);
        ResourceendSniff(response.url);
      }
      page.onResourceReceived = function (response) {

        if (response.stage == "end") {

          ResourceendSniff(response.url);
        }
      }

      function ResourceendSniff(url) {
        currentGame.resourceNumb--;
        console.log("end downloading:"+url);
        currentGame.gameUrls.splice(currentGame.indexOf(url), 1);
        updateStatus();
        if (currentGame.resourceNumb < 1) {
          itimeout = setTimeout(function () {
            makeDownloadFile(gamename);
            // console.log("done")
          }, 5000);
        }
      }

      function makeDownloadFile(gamename) {
        var rootdir = buildName + "/" + gamename;
        console.log("startmakegame in" + rootdir);
        if (isDone) {
          return;
        }
        console.log("try to write " + rootdir + "/" + gamename + ".json" + " ,currentState:" + isDone);
        fs.makeDirectory(rootdir);
        try {
          fs.write(rootdir + "/" + gamename + ".json", '{"data":[' + urls.map(function (v) {
            return '"' + v + '"'
          }).join(",") + ']}');
        } catch (e) {
          console.log(e)
        }
        isDone = true;
        done(gamename);
        console.log("done")
      }

      page.open(page.address, function (status) {
        var har;
        if (status !== 'success') {
          console.log("fail in download -->" + address);
          done(gamename);
        } else {
          // console.log("success in loading main file ,waiting for finished~ " + gamename);
        }

      });


    }
    getResource(v.url, v.name, done);
  });
} else {
  console.log("check configformat pls");
  slimer.exit();
}