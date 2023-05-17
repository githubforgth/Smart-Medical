const app = getApp()

const utils = require("../../utils/util")

Page({
    data: {
        inputValue : "",
        message:[],
        time : 0,
        userInfo:[],
        id_2: 3
    },

    onLoad :function (options) {
      wx.request({
        url: 'http://127.0.0.1:5000/massage_list',
        data:{
          id: app.globalData.userInfo._id,
          id_2: options.id
        },
        
        success:(res)=>{
           console.log("res---"+res.data)
           this.setData({
             message:res.data
           })
           console.log(this.data.id_2)
           console.log(this.data.massage)
        }
      })
        this.setData({
            recordId : options.id,
            userInfo : app.globalData.userInfo
        })
        // this.getChatList()
        // this.getFriendInfo()
    },

    onshow: function (options) {
        // this.getChatList()
      var id_2 = options.id
      this.setData({
        id_2: id_2
      })
      this.update_list(id_2)  
    },

    submit:function (e) {
      // var value = e.detail.value.value;
      // console.log(value);
      wx.request({
        url: 'http://127.0.0.1:5000/chat_submit',
        data:{
          id_1: app.globalData.userInfo._id,
          id_2: this.data.id_2,
          massage:"123"
        },
        success:(res)=>{
          this.update_list(this.data.id_2)
        }
      })
    },
    update_list:function (id_2) {
      wx.request({
        url: 'http://127.0.0.1:5000/massage_list',
        data:{
          id: app.globalData.userInfo._id,
          id_2: id_2
        },
        success:(res)=>{
           console.log("res---"+res)
           this.setData({
             massage: res.data
           })
           console.log(this.data.massage)
    }
  })
}
})