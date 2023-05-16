// pages/prescribe/prescribe.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    patiant_id: null,
    keyword: '', // 搜索关键词
    searchResult: [], // 搜索结果
  },
  submit_Info:function (e) {
    // var condition = e.detail.value.condition;
    // var medical = e.detail.value.medical;
    console.log(e.detail.value)
    wx.request({
      url: 'http://127.0.0.1:5000/submit_medical',
      data:{
        medical:e.detail.value.medical,
        condition:e.detail.value.condition,
        id: this.data.patiant_id
      },
      success:(res)=>{
        if (res.data.state === true){
          console.log(res)
          wx.showToast({
            title: '更改成功',
          }),
          this.setData({
            patiant_id: null
          })
        }
        else{
        wx.showToast({
          icon:'error',
          title: '请检查网络环境',
        })}
      }
    })
  }
  ,
  onSearchInput: function (e) {
    var keyword = e.detail.value;
    console.log(keyword.name)
    this.setData({
      keyword: keyword.name
    });
    this.search(keyword.name);
  },
  // 发起搜索请求
  search: function (keyword) {
    wx.request({
      url: 'http://127.0.0.1:5000/search_painter',
      data:{
        keyword: keyword
      },
      success:(res)=>{
        console.log(res.data)
        if (res.data[0] === "Not found"){
          wx.showToast({
            icon :'error',
            title: '未查询到',
          })
          return;
        }
        else{
          console.log(res.data)
          this.setData({
            searchResult:res.data
          })
          console.log(this.data.searchResult)
        }
      }
    })
  },
  choose_result:function (e) {
    console.log(e.currentTarget.dataset.value)
    // id = e.currentTarget.dataset.value/
    // console.log(id)/
    this.setData({
      patiant_id : e.currentTarget.dataset.value
    })
  },
  // 监听滚动到底部事件
  onLoadMore: function () {
    // 加载更多搜索结果
    // 将搜索结果添加到 searchResult 变量中
    this.setData({
      searchResult: searchResult.concat(moreSearchResult)
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.patient_id!=null) {
      this.setData({
        patiant_id: options.patient_id
      })
    }
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