const app = getApp()

Page({
    data: {
      patient_list: [],
      message: []
    },

    onLoad() {
        this.setData({
            userInfo : app.globalData.userInfo
        })
    },
    onShow() {
        this.setData({
            userInfo : app.globalData.userInfo,
            my_patient : []
        })
        this.loadMessage()
    },
    loadMessage() {
        var that = this;
        console.log(app.globalData.userInfo._id)
        wx.request({
          url: 'http://127.0.0.1:5000/show_massage',
          data:{
            doctor_id: app.globalData.userInfo._id 
          },
          success:(res)=>{
            console.log(res.data[0])
            let data = res.data
            console.log("data:--"+data[0][1])
            let i=0;
            console.log(typeof(data[0][1]))
            for(i; i<data.length;i++){
              data[i][1] = data[i][1].split(" ")[4]
              console.log(data[i][1])
            }
            console.log(data)
            this.setData({
              message: res.data
            })
          }
        })
    },

    turn_time: function (data) {
      let date = new Date(data);
      let isoString = date.toISOString();
      return isoString
    },

    startChat(e) {
        var index = e.currentTarget.dataset.index;
        console.log(this.data.my_friends)
        wx.navigateTo({
          url: '/pages/chat/chat?id=' + this.data.my_friends[index]._id
        })
        
    },
    tochat:function (e) {
      var medical_id = e.currentTarget.dataset.id;
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: '../chat/chat?id='+medical_id,
      })
      
    }
})