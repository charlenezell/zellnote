var $ = require("./node_modules/jquery/dist/jquery.slim.min.js");
const {
	ipcRenderer,
	remote: {
		dialog,
		require: remoteRequire
	}
} = require('electron');


ipcRenderer.on("iresponse", (e, arg) => {
	if (arg.code == 0) {
		if (handlers[arg.action]) {
			handlers[arg.action](arg.data);
		}
	} else {
		alert(arg.info);
	}
});


// ipcRenderer.on("downloadProgress",(e,arg)=>{
// 	if(arg.code!=0){
// 		$logger.append(`<p>fail in download => ${arg.info}</p>`);
// 	}
// })

var $logger = $(".logger");
var $cleanLogger = $(".cleanLogger");
var $gamePattern = $(".gamePattern");

var $searchGameFromRoot = $(".searchGameFromRoot");
var $chooseGame = $(".chooseGame");
var $buildBtn = $(".buildBtn");

var handlers = {
	listByRoot: function (data) {
		$chooseGame.html(data.map(v => `
		<li><label for="ttt_${v}"><input type="checkbox" name="ttt_${v}" value="${v}" checked>${v}</label></li>
		`));
	},
	build:function(data){
		alert(data);
	}
}

$cleanLogger.on("click", function () {
	$logger.empty();
});

$searchGameFromRoot.on("click", function () {
	var rootPath = $gamePattern.val();
	ipcRenderer.send("irequest", {
		action: "listByRoot",
		data: {
			path: rootPath
		}
	});
});

$buildBtn.on("click", function () {
	let choosedGame=$chooseGame.find("input:checked").toArray().map(v=>$(v).val());
	if (choosedGame.length > 0) {
		var rootPath = $gamePattern.val();
		ipcRenderer.send("irequest", {
			action: "build",
			data: {
				path: rootPath,
				games: choosedGame
			}
		});
	} else {
		alert("请先选择游戏");
	}

	// var outDir=dialog.showOpenDialog({title:"请选择要保存的路径:",properties: ['openDirectory', 'multiSelections']});
	// if(outDir&&outDir.length>0){
	// 	$logger.append("****************开始下载")
	// 		ipcRenderer.send("irequest",{
	// 		action:"download",
	// 		data:$form1.serializeArray().concat({
	// 			name:"outDir",
	// 			value:outDir[0]
	// 		})
	// 	});
	// }
	return false;
});