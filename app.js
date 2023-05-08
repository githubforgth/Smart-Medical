// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
 
    // 登录
    wx.login({
      success: resp => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      console.log(resp);
      var that = this;
      // 获取用户信息
      wx.getSetting({
      success: res => {
      if (res.authSetting['scope.userInfo']) {
      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
      wx.getUserInfo({
      success: userResult => {
      var platUserInfoMap = {}
      platUserInfoMap["encryptedData"] = userResult.encryptedData;
      platUserInfoMap["iv"] = userResult.iv;
      wx.request({
            // url: 'http://127.0.0.1:5000/user/wxlogin',
            data: {
            platCode: resp.code,
       platUserInfoMap: platUserInfoMap,
            },
            header: {
            "Content-Type": "application/json"
            },
            method: 'POST',
            dataType:'json',
            success: function (res) {
            console.log(res)
         wx.setStorageSync("userinfo", res.userinfo) //设置本地缓存
            },
            fail: function (err) { },//请求失败
            complete: function () { }//请求完成后执行的函数
            })
      }
      })
      }
      }
      })
      }
      })
  },
  

  globalData: {
    userInfo: null
  }
})
