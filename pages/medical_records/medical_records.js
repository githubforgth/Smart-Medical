// 病历信息页面的控制代码
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    record: {}, // 病历数据对象
    medical_info:[],
    patient_id: null
  },
  to_prescribe:function () {
    console.log("data:"+this.data.patient_id)
    wx.navigateTo({
      url: '../prescribe/prescribe?patient_id='+this.data.patient_id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      patient_id: options.id
    })
    console.log(this.data.patient_id)
    // 根据id查询病历详细信息
    wx.request({
      url: 'http://127.0.0.1:5000/medical_info',
      data:{
        id: options.id
      },
      success:(res)=>{
        this.setData({
          medical_info: res.data
        })
      },
    })
  }
})
