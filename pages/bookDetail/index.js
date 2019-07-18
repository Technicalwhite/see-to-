// pages/bookDetail/index.js
var time = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    booklogo: "http://statics.zhuishushenqi.com",
    bookid: '',
    book: '',
    imgSrc: '',
    textnum: '', //处理后的字数
    zhuishu: '', //追书人数
    olddate: '', //更新日期
    mmp: '', //时间格式化模块
    jianjie: '',//书籍简介
    show: false,
    muluId:'',
    mululist:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ bookid: options.bookid})
    this.lists()
    this.setData({
      mmp: time.formatTimeTwo
    })
    this.getmuluId()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  gotomulu(){//打开目录详情
    // let bookid = event.currentTarget.dataset.bookid   this.data.muluId
    wx.navigateTo({
      url: '../../pages/bookMulu/index?readId=' + this.data.muluId,
    })
  },
  kai() {//显示/隐藏简介
    console.log(this.data.show, 'curTime')
    if (this.data.show == false) {
      this.setData({ show: true })
    } else {
      this.setData({ show: false })
    }
  },
  geshitime(time) {
    let currentTime = Math.round(new Date() / 1000);
    let olddate = time.replace("T", ' ').replace("Z", ' ');
    let upDate = Date.parse(new Date(olddate)) / 1000;
    this.setData({
      olddate: this.data.mmp(upDate, 'Y/M/D')
    })
    return Math.floor((currentTime - upDate) % 86400 / 3600)
  },
  lists() {//书籍x封面
    let _this = this
    wx.request({
      url: `https://api.zhuishushenqi.com/book/${this.data.bookid}`,

      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        let q = _this.geshitime(res.data.updated)
        let t = _this.latelyFollower(res.data.wordCount)
        let zuibook = _this.latelyFollower(res.data.latelyFollower)
        let jianjie = res.data.longIntro.split("\n")
        _this.setData({
          book: res.data,
          time: q,
          textnum: t,
          zhuishu: zuibook,
          jianjie: jianjie,
          imgSrc: _this.data.booklogo + res.data.cover
        })
      },
      fail: function (err) {
        // this.ren = "数据获取失败";
      }
    })
  },
  getmuluId() {//查找该书的真实ID
    let _this=this
    wx.request({
      url: `https://api.zhuishushenqi.com/atoc/?view=summary&book=${this.data.bookid}`,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        _this.setData({
          muluId: res.data[0]._id
        })
        _this.getmululist(_this.data.muluId)
      },
      fail: function (err) {
        // this.ren = "数据获取失败";
        console.log('在书籍详情页,getmuluId不知什么原因报错')
      }
    })
  },
  getmululist(id){//书籍的目录列表
    let _this = this
    wx.request({
      url: `https://api.zhuishushenqi.com/btoc/${id}?view=chapters&channel=mweb`,
      method: 'GET', 
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        _this.setData({
          mululist: res.data.chapters.slice(-10)
        })
        // console.log(_this.data.mululist,'目录')
      },
      fail: function (err) {
        console.log('在书籍详情页,getmululist不知什么原因报错')
      }
    })
  },
  latelyFollower(lately) {
    if (lately > 10000) {
      return (lately / 10000).toFixed(1) + '万';
    } else {
      return lately;
    }
  },
  bookChaptersBody(books) {
    if (books) {
      let c = /[\u4E00-\u9FA5\uF900-\uFA2D]/g;
      let _book = JSON.stringify(books).replace(/^"|"$/g, '').replace(/\\r/g, '');
      this.loading = false;
      if (c.test(_book)) {
        _book = '<p>' + _book.replace(/\s*/g, '').replace(/\\n/g, '</p><p>') + '</p>';
        return _book
      }
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})