const app = getApp()

const utils = require("../../utils/util")

Page({
    data: {
        inputValue : "",
        massage:[],
        time : 0
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
        wx.request({
          url: 'http://127.0.0.1:5000/massage_list',
          data:{
            id: app.globalData.userInfo.id,
            id_2: options.id
          },
          success:(res)=>{
             console.log("res---"+res)
             this.setData({
               massage: res.data
             })
             console.log(this.data.massage)
          }
        })
    },

    publishMessage(){
        if (this.data.inputValue == "") {
            wx.showToast({
                icon: "none",
                title: '不能发送空消息',
            })
            return;
        }
        var that = this;
        wx.cloud.database().collection('chat_record').doc(that.data.recordId).get({
            success(res) {
                console.log(res)
                var record = res.data.record;

                var msg = {}
                msg.id = app.globalData.userInfo._id
                msg.text = that.data.inputValue
                msg.time = utils.formatTime(new Date())

                console.log(msg)
                record.push(msg)
                console.log(record)
                wx.cloud.database().collection('chat_record').doc(that.data.recordId).update({
                    data: {
                        record : record
                    },
                    success(res) {
                        console.log(res)
                        wx.showToast({
                          title: '发送成功',
                        })

                        that.getChatList(),
                        that.setData({
                            inputValue : ''
                        })
                    }
                
                })
            }
        })
    },  

})