if (require('electron-squirrel-startup')) return;
const electron = require('electron');
const glob=require("glob");
const gPath=require("path");
const {builder}=require("./builder");
// const download = require("download");
// const strUtil = require("./strUtil");
const {
  dialog,
  ipcMain
} = electron;

var actionMaper={
  listByRoot:function({path}){
    return new Promise(resolve=>{
      console.log(path);
      resolve(glob.sync(path).map(v=>gPath.basename(v)));
    });
  },
  build:function({
    path,games
  }){
    return builder(path,games);
  }
};

const path = require('path')
ipcMain.on("irequest", function (e, {
  data,action
}) {
  console.log(data,action);
  if(actionMaper[action]){
    actionMaper[action](data).then((res)=>{
      e.sender.send("iresponse",{
        code:0,
        data:res,
        action
      });
    }).catch(function(err){
      e.sender.send("iresponse", {
        code: -1,
        info:`${action}处理失败:=>${err}`
      });
    });
  }else{
    e.sender.send("iresponse", {
        code: -1,
        info:`没有找到${action}这个处理方法`
    });
  }
  // let dest = path.resolve();

  // e.sender.send("downloadComplete", {
  //     code: 0
  // });
});
// Module to control application life.
const app = electron.app
  // Module to create native browser window.
const BrowserWindow = electron.BrowserWindow


const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.