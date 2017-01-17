var $=require("./node_modules/jquery/dist/jquery.slim.min.js");
const {
	ipcRenderer,
	remote:{
		dialog,
		require:remoteRequire
	}
} = require('electron');
ipcRenderer.on("downloadComplete",()=>{
	$logger.append("****************下载结束");
});
ipcRenderer.on("downloadResponse", (e, arg) => {
	if(arg.code==0){
		alert("成功下载")
	}
});
ipcRenderer.on("downloadProgress",(e,arg)=>{
	if(arg.code!=0){
		$logger.append(`<p>fail in download => ${arg.info}</p>`);
	}
})
var $logger=$(".logger");
var $cleanLogger=$(".cleanLogger");
var $savePath = $("#savePath");
var $pattern = $("#pattern");
var $from = $("#from");
var $to = $("#to");
var $preview = $(".previewPath");
var $submit = $('submit');
var $form1 = $("#form1");
var strUtil=remoteRequire("./strUtil");
$cleanLogger.on("click",function(){
	$logger.empty();
})
$form1.on("change", function () {
	let fileTodownList=strUtil.range($from.val(),$to.val()).map(v=>{
			return `${$pattern.val().replace(/\*/mg,'<em>'+v+'</em>')}`
		});
		if(fileTodownList.length>4){
			fileTodownList=[...fileTodownList.slice(0,2),"...",...fileTodownList.slice(fileTodownList.length-2,fileTodownList.length)]
		}
	$preview.html(`你即将下载如下项目:<br/>
		${fileTodownList.join("<br/>")}
	`)
}).on("submit",function(){
	var outDir=dialog.showOpenDialog({title:"请选择要保存的路径:",properties: ['openDirectory', 'multiSelections']});
	if(outDir&&outDir.length>0){
		$logger.append("****************开始下载")
			ipcRenderer.send("irequest",{
			action:"download",
			data:$form1.serializeArray().concat({
				name:"outDir",
				value:outDir[0]
			})
		});
	}
	return false;
});
