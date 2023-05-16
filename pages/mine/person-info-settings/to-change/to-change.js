// pages/mine/person-info-settings/to-change/to-change.js
const app = getApp()
Page({
  data: {
      barTitle:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.setData
    var barTitle = options.changeType;
    this.setData({
      barTitle: barTitle
    })
    if (barTitle === "name"){
      barTitle= '姓名';
    }
    else if (barTitle === "headshot" ){
      barTitle = "头像";
    }
    else if (barTitle === "gender"){
      barTitle = "性别";
    }
    else if (barTitle === "department"){
      barTitle = "科室"
    }
    else{
      barTitle = "职称"
    };
    wx.setNavigationBarTitle({
      title: '修改' + barTitle
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
  changeInfo: function (e){
    var value = e.detail.value.value;
    console.log(value);
    var open_id = app.globalData.userInfo._openid;
    wx.request({
      method: 'GET',
      url: 'http://127.0.0.1:5000/person_setting',
      data:{
        barTitle: this.data.barTitle,
        keyword: value,
        open_id: open_id
      },
      success:(res)=>{
        wx.request({
          url: 'http://127.0.0.1:5000/test_2',
          data:{
            open_id: app.globalData.userInfo._openid
          },
          success:(res)=>{
            console.log(res.data)
            wx.setStorage({             
              key: 'data',
              data: res.data,
              success: function() {
                console.log('更改数据已缓存');
              }
            })
          }
    })
        console.log("success"),
        wx.showModal({
          cancelColor: '#fff',
          content: "修改成功",
          title: "修改成功",
          success:(res)=>{
            console.log("修改为："+value)
            wx.redirectTo({
              url: '../person-info-setting',
            })
          }
        })
      },
      fail:()=>{
        console.log("fail")
      }
    })
  }
})