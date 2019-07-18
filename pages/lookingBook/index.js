// pages/lookingBook/index.js 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    readId: '',
    order: '',
    mululistId:'',
    mululist: '',
    bookName: '',
    bookLink: '',
    chapterName: '',
    bookChapter: '',
    scrollTop: 0,
    isONE: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      order: options.booklength,
      bookLink: options.bookLink,
      readId: options.readId,
    })
    this.getMuLu(this.data.readId)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  shang() {
    this.setData({
      order: this.data.order - 1,
      scrollTop: 0
    })
    if (this.data.order < 0) {
      this.setData({
        isONE: true
      })
      if (this.data.isONE) {
        setTimeout(() => {
          this.setData({
            isONE: false
          })
        }, 1500)
        console.log('22222')
      }
      return
    }

    this.getReadText()
  },
  tomulu() {
    wx.navigateTo({
      url: '../../pages/bookMulu/index?readId=' + this.data.mululistId,
    })
  },
  xia() {
    let num = Number(this.data.order) 
    this.setData({
      order: num+1,
      scrollTop: 0
    })
    if (this.data.order > this.data.mululist.length) {
      wx.navigateTo({
        url: '../../pages/bookMulu/index?readId=' + this.data.mululistId,
      })
      return
    }

    this.getReadText()
    console.log('wocao')
  },
  getMuLu(id) { //查找该书的真实ID
    let _this = this
    wx.request({
      url: `https://api.zhuishushenqi.com/btoc/${id}?view=chapters&channel=mweb`,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        _this.setData({
          mululistId: res.data._id,
          mululist: res.data.chapters,
          bookName: res.data.bookName
        })
        _this.getReadText()
      },
      fail: function(err) {
        // this.ren = "数据获取失败";bookLink
        console.log('在书籍详情页,getmuluId不知什么原因报错')
      }
    })
  },
  getReadText() {
    let _this = this
    wx.request({
      url: `http://chapterup.zhuishushenqi.com/chapter/${this.data.mululist[this.data.order].link}`,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        let txt = res.data.chapter.cpContent.split("\n")
        let chapter = [] //去除乱七八糟的符号搞成数组
        for (let i = 0; i < txt.length; i++) {
          chapter.push(txt[i].trim())
        }
        _this.setData({
          chapterName: res.data.chapter.title,
          bookChapter: chapter
        })
        console.log(res.data, '文章')
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
    console.log('到底了')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})