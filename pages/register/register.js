const app = getApp()
Page({
  data: {
      ps1:"",
      account_id:"",
      ps2:""
  },
  onshow() {
  },
  getUserProfile(e) {
    var that = this;
    wx.getUserProfile({
      desc: '展示信息',
      success: (res) => {
        console.log(res)
        that.setData({
          userInfo: res.userInfo
        }),
        console.log(this.data.userInfo)
        wx.login({
          // timeout: 60,
          success:(res)=>{
            console.log("code"+res)
            let code = res.code
            wx.request({
              url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx949d5d5b6222c49a&secret=4ecd549663ca9578c43f907384d7bcb7&js_code=${code}&grant_type=authorization_code`,
            success:(res)=>{
              console.log(res)
              this.setData({
                _openid: res.data.openid
              })
              console.log(this.data._openid)
            }
            })
          }
        })
        wx.showToast({
          title: '已授权',
          duration: 500
        })
        // 加入全局变量
        app.globalData.userInfo = res.userInfo
        console.log(app.globalData.userInfo)
      }
    })
  },

  onLoad: function(options){
    console.log(app.globalData.userInfo);
    this.setData({
        userInfo: app.globalData.userInfo
    })
  },
  getUserAccountId(e) {
    console.log(e.detail.value)
    this.setData({
      account_id : e.detail.value
    })
  },
  getUserPassword(e) {
    this.setData({
      ps1 : e.detail.value
    })
  },
  confirmUserPassword(e) {
    this.setData({
      ps2 : e.detail.value
    })
  },

  register() {
    var that = this;
    if (!this.registerCheck())return;
    wx.request({
      url: 'http://127.0.0.1:5000/register/search',
      data:{
        account_id: that.data.account_id
      },
      success:(res)=>{
        console.log(res.data)
        if (res.data === "0" || res.data === 0){
          wx.showToast({
            icon : 'error',
            title: '昵称重复',
          })
          return;
         }
        else{
        console.log(that.data)
        wx.request({
          url: 'http://127.0.0.1:5000/register/submit',
          data:{data: [that.data._openid, that.data.account_id, that.data.userInfo.avatarUrl, null, that.data.ps2, null, null, null, null, null, 1, null]},
          success:(res)=>{
            if (res.statusCode === 200){
            console.log(res)
                // 将用户名和密码保存到全局变量 app.globalData中
            app.globalData.userInfo.account_id = that.data.account_id;
            app.globalData.userInfo.password = that.data.password;
            app.globalData.userInfo._openid = that.data._openid;
            wx.switchTab({
              url: '/pages/index/index',
            })}
            else{
              wx.showToast({
                icon :'error',
                title: '请检查网络',
              })
              return;
            }
            }
            })
         }
        }
      })
  },

  registerCheck() {
    console.log("this.data"+this.data)
    if (this.data.ps1 != this.data.ps2) {
      wx.showToast({
        icon :'error',
        title: '密码不相同',
      })
      return false
    } else if (this.data.ps1.length > 18) {
      wx.showToast({
        icon : 'error',
        title: '密码过长',
      })
      return false
    }else if(this.data.ps1.length < 3){
      wx.showToast({
        icon : 'error',
        title: '密码过短',
      })
      return false
    } 
    else if (this.data.account_id.length > 10 || this.data.account_id.length <= 0) {
      wx.showToast({
        icon : 'error',
        title: '请输入正确格式账号',
      })
      return false
    }
    return true
  }
})
