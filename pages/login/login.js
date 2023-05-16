
const app = getApp()

Page({
  data: {
      
  },
  onLoad() {
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo!=null){
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  },
  
  getUserAccount(e) {
    this.setData({
      account_id : e.detail.value
    })
  },
  getUserPassword(e) {
    this.setData({
      password : e.detail.value
    })
  },
  login() {
      var that = this;
      wx.request({
        url: 'http://127.0.01:5000/login',
        data:{
          account_id: that.data.account_id,
          password: that.data.password
        },
        success:(res)=>{
          console.log("data:---->", res)
          // console.log(res.data.length)
              if(res.statusCode === 200){
                  // 拿到 _id
                  app.globalData.userInfo = res.data[0]
                  wx.setStorageSync('userInfo', res.data)
                  wx.switchTab({
                    url: '/pages/index/index',
                    success(res){
                        wx.showToast({
                          title: '登陆成功',
                        })
                    }
                  })
              } else {
                  wx.showToast({
                    icon: 'none',
                    title: '账号密码错误',
                  })
              }
        }
      })

  //     wx.cloud.database().collection('chat_user').where({
  //       account_id: that.data.account_id,
  //       password: that.data.password
  //     }).get({
  //         success(res) {
  //             console.log(res)
  //             if(res.data.length>0){
  //                 // 拿到 _id
  //                 app.globalData.userInfo = res.data[0]
  //                 wx.setStorageSync('userInfo', res.data[0])
                  
  //                 wx.switchTab({
  //                   url: '/pages/index/index',
  //                   success(res){
  //                       wx.showToast({
  //                         title: '登陆成功',
  //                       })
  //                   }
  //                 })
  //             } else {
  //                 wx.showToast({
  //                   icon: 'none',
  //                   title: '账号密码错误',
  //                 })
  //             }
  //         }
  //     })
  },


  toRegister() {
      wx.navigateTo({
        url: '/pages/register/register',
      })
  },
})
