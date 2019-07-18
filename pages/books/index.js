// pages/books/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    male: '',
    female: '',
    press: '',
    options: '', //传过来的属性genderlengname
    gender: '',
    leng: '',
    minorIndex: '', //小类数组下标
    largeIndex: 0, //large数组的下标
    largeTypes: [{
        type: "hot",
        name: "热门"
      },
      {
        type: "new",
        name: "新书",
        duration: "all"
      },
      {
        type: "reputation",
        name: "好评"
      },
      {
        type: "over",
        name: "完结"
      },
      {
        type: "monthly",
        name: "包月"
      }
    ],
    large: "hot",
    litter: '',
    minor: '',
    clickname: '', //点击拿到点击的文字
    books: '',
    num: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      options: options
    })
    this.setData({
        gender: options.gender
      }),
      this.setData({
        leng: options.leng
      }),
      this.lists()
    this.getBook(options)
  },
  clickId(event) {
    let bookid = event.currentTarget.dataset.bookid
    wx.navigateTo({
      url: '../../pages/bookDetail/index?bookid=' + bookid,
    })
  },
  jiazai() {
    this.data.num += 20
    let options = this.data.options
    this.getBook(options)
  },
  getBook(options) {
    let _this = this
    wx.request({
      url: `https://api.zhuishushenqi.com/book/by-categories?gender=${options.gender}&type=${
        this.data.large
        }&major=${options.name}&minor=${this.data.minor}&start=${this.data.num}&limit=${this.data.num+20}`,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.data.books.length>0){
          _this.setData({
            books: res.data.books
          })
        } else {
          _this.setData({
            books: false
          })
        }
       
      },
      fail: function(err) {
        // this.ren = "数据获取失败";
      }
    })
  },
  largeType(event) {
    this.setData({
      large: event.currentTarget.dataset.name,
      largeIndex: event.currentTarget.dataset.largeindex
    })
    let options = this.data.options
    this.getBook(options)
  },
  gotobooklists(event) {
    this.setData({
      minor: event.currentTarget.dataset.name,
      minorIndex: event.currentTarget.dataset.smallindex
    })
    let options = this.data.options
    this.getBook(options)
  },
  litterlist() {
    if (this.data.gender == 'male') {
      this.setData({
        litter: this.data.male[this.data.leng].mins
      })
    }
    if (this.data.gender == 'female') {
      this.setData({
        litter: this.data.female[this.data.leng].mins
      })
    }
    if (this.data.gender == 'press') {
      this.setData({
        litter: this.data.press[this.data.leng].mins
      })
    }
  },
  lists() {
    let _this = this
    wx.request({
      url: `https://api.zhuishushenqi.com/cats/lv2`,

      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        _this.setData({
          male: res.data.male,
          female: res.data.female,
          press: res.data.press
        })
        _this.litterlist()
      },
      fail: function(err) {
        // this.ren = "数据获取失败";
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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