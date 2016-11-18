//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'hey',
    userInfo: {},
    ttqInfo:[]
  },
  //事件处理函数
  onTap: function(e) {
    // console.log(arguments,this);
    wx.navigateTo({
      url: `../ttqDetailView/ttqDetailView?ttqId=${e.currentTarget.dataset.ttqid}`
    })
  },
  onLoad: function () {
    console.log('onLoad')
    //调用应用实例的方法获取全局数据
    wx.request({
      url: 'http://qq.100bt.com/AjaxShowAllTTQInfo.action',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: (res)=>{
        let ttqArr=[];
        Object.keys(res.data.ttqCategoryTypeMap).forEach((v,k)=>{
          var typeList=res.data.ttqCategoryTypeMap[v]
            typeList.forEach((iv,ik)=>{
              iv.__ttqType=v;
              ttqArr.push(iv);
            })
        })
        this.setData({
          ttqInfo:ttqArr
        })
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
