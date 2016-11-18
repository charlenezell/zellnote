//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    blockList:[],
    currentBlockId:""
  },
  onTap:function(e){
     this.setData({
      currentBlockId:e.currentTarget.dataset.blockid
    });
  },
  onLoad: function (query) {
    console.log('onLoad')
    //调用应用实例的方法获取全局数据
    wx.request({
      url: 'http://qq.100bt.com/ShowTtqCategory.action',
      data: {
          ttqId:query.ttqId
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: (res)=>{
        this.setData({
          blockList:res.data.ttqCategory.ttqBlockList,
          currentBlockId:res.data.ttqCategory.ttqBlockList[0].blockId
        });
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    });
  }
})
