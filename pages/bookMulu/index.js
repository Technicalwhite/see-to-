// pages/bookMulu/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookid: '',
    mululist: '',
    bookName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('readId>>>', options)
    this.setData({
      bookid: options.readId
    })
    this.getmulu(this.data.bookid)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  gotoreading(event) {
    wx.navigateTo({
      url: '../../pages/lookingBook/index?booklength=' + event.currentTarget.dataset.book 
        + '&readId=' + this.data.bookid + '&bookLink=' + event.currentTarget.dataset.link 
    })
    console.log(event.currentTarget.dataset, 'event.currentTarget.dataset')
  },
  getmulu(id) { //查找该书的真实ID
    let _this = this
    wx.request({
      url: `https://api.zhuishushenqi.com/btoc/${id}?view=chapters&channel=mweb`,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        _this.setData({
          mululist: res.data.chapters,
          bookName: res.data.bookName
        })
        // console.log(res.data.chapters, '目录')
      },
      fail: function(err) {
        // this.ren = "数据获取失败";
        console.log('在书籍详情页,getmuluId不知什么原因报错')
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})