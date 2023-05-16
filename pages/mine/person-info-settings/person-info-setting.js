// pages/person-info-settings/person-info-setting.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{
      id: null,
      headshot:'https://img.wxcha.com/m00/65/4e/89433954b6fdfacab88ffcdb8e84158e.jpg',
      name: null,
      gender:null,
      title:null,
      department:null
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */onUsernameInput: function(e) {
    // 更新 username 变量的值
    this.setData({
      username: e.detail.value
    })
  },
  onLoad(options) {
    wx.getStorage({
      key: 'data',
      success: (res) =>{
        // 使用缓存数据
        console.log('使用缓存数据pensor-info-setting：', res.data);
        this.setData({
          user: res.data
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
              user: res.data
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

  },
  to_changeName:function(){
    // var medical_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './to-change/to-change?changeType=' + "name",
    })
  },
  to_changeGender:function(){
    // var medical_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './to-change/to-change?changeType=' + "gender",
    })
  },
  to_changeTitle:function(){
    // var medical_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './to-change/to-change?changeType=' + "title",
    })
  },
  to_changeDepartment:function(){
    // var medical_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './to-change/to-change?changeType=' + "department",
    })
  },
  to_changeheadshot:function(){
    // var medical_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './to-change/to-change?changeType=' + "headshot",
    })
  }
})