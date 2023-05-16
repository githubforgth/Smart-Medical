// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",  //姓名
    // motto_info: "",  //格言
    title: "",        //职称
    department:"" ,    //  科室
    headshot:""//头像
  },
to_settings:function(){
  wx.navigateTo({
    url: '/pages/mine/person-info-settings/person-info-setting',
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(app.globalData.userInfo._openid),
    wx.getStorage({
      key: 'data',
      success: (res) =>{
        // 使用缓存数据
        console.log('使用缓存数据：', res.data);
        this.setData({
          name: res.data.name,
          title: res.data.title,
          department: res.data.department,
          headshot: res.data.head_shot
        });
      },
      fail:()=>{
        wx.request({
          url: 'http://127.0.0.1:5000/test_2',
          data:{
            open_id: app.globalData.userInfo._openid
          },
          success:(res)=>{
            console.log(res.data)
            this.setData({
              name: res.data.name,
              title: res.data.title,
              department: res.data.department,
              headshot: res.data.head_shot
            });
            console.log(this.data.name)
            wx.setStorage({             
              key: 'data',
              data: res.data,
              success: function() {
                console.log('数据已缓存');
              }
            })
          }
    })
      }
      })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})