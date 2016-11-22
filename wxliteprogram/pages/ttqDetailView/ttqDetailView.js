//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    blockList: [],
    topicList:[],
    currentBlockId: "",
    currentTopicList: [],
    currentBlockListIndex: 0
  },
  getDataByBlockId:function(blockId){
    if (!this.data.topicList[blockId]) {
      wx.request({
        url: "http://qq.100bt.com/AjaxCacheTopicInfo.action",
        data: {
          blockId,
          offset: 0,
          limit: 100
        },
        method: "GET",
        success: (res) => {
          var topicList = this.data.topicList || {};
          this.setData({
            topicList: Object.assign({}, topicList, {
              [blockId]: res.data.topicList
            })
          });
        },
        fail: (res) => {},
        complete: (res) => {}
      });
    }
  },
  onSwiperChange: function (e) {
    var blockId = this.data.blockList[e.detail.current].blockId;
    this.setData({
      currentBlockId: blockId
    });
    this.getDataByBlockId(blockId);
  },
  onTap: function (e) {
    var blockId = e.currentTarget.dataset.blockid;
    var index = e.currentTarget.dataset.index;
    this.setData({
      currentBlockId: blockId
    });
    this.setData({
      currentBlockListIndex: index
    });
    this.getDataByBlockId(blockId);
  },
  onLoad: function (query) {
    console.log('onLoad')
      //调用应用实例的方法获取全局数据
    wx.request({
      url: 'http://qq.100bt.com/ShowTtqCategory.action',
      data: {
        ttqId: query.ttqId
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: (res) => {
        this.setData({
          blockList: res.data.ttqCategory.ttqBlockList,
          currentBlockId: res.data.ttqCategory.ttqBlockList[0].blockId
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    });
  }
})