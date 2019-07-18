// view/shouye/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    indexhot: '',

  },
  ready: function() {
    this.gethotbook()
  },
  /**
   * 组件的方法列表bookDetail
   */
  methods: {
    tobook(event) {
      wx.navigateTo({
        url: '../../pages/bookDetail/index?bookid=' + event.currentTarget.dataset.bookid,
      })
    },
    gethotbook() {
      let _this = this
      wx.request({
        url: `https://api.zhuishushenqi.com/ranking/5a323096fc84c2b8efab2482`,
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          _this.setData({
            indexhot: res.data.ranking.books
          })
        },
        fail: function(err) {
          // this.ren = "数据获取失败";
        }
      })
    },
    // gethotbook() {
    //   let _this = this 
    //   wx.request({
    //     url: ``,
    //     method: 'GET',
    //     header: {
    //       'content-type': 'application/json'
    //     },
    //     success(res) {
    //       if (res.data.male !== "" || res.data.male !== undefined) {
    //         let boy = res.data.male[0]._id;
    //         // _this.nanrank(boy);
    //         let qianliheimaboy = res.data.male[3]._id;
    //         let chunliuboy = res.data.male[4]._id;
    //         let wanjieboy = res.data.male[5]._id;
    //         // _this.nanrank(newboy);

    //       }
    //       if (
    //         res.data.female !== "" || res.data.female !== undefined ) {
    //         let girl = res.data.female[0]._id;
    //         let qianliheimagirl = res.data.female[4]._id;
    //         let chunliugirl = res.data.female[5]._id;
    //         let wanjiegirl = res.data.female[6]._id;
    //         _this.nvrank(wanjiegirl);
    //       }
    //       console.log(res.data)
    //     },
    //     fail: function(err) {
    //       // this.ren = "数据获取失败";
    //     }
    //   })
    // },
    // nanrank(boy) {//男女强推热门
    //  wx.request({
    //    url: `https://api.zhuishushenqi.com/ranking/${boy}`,
    //    method: 'GET',
    //    header: {
    //      'content-type': 'application/json'
    //    },
    //    success(res) {

    //      console.log(res.data)
    //    },
    //    fail: function (err) {
    //      // this.ren = "数据获取失败";
    //    }
    //  })
    // },
    // nvrank(girl) {//男女强推热门
    //   wx.request({
    //     url: `https://api.zhuishushenqi.com/ranking/${girl}`,
    //     method: 'GET',
    //     header: {
    //       'content-type': 'application/json'
    //     },
    //     success(res) {

    //       console.log(res.data)
    //     },
    //     fail: function (err) {
    //       // this.ren = "数据获取失败";
    //     }
    //   })
    // },
    // qianliheimaboy(boy){//男女潜力
    //    wx.request({
    //     url: `https://api.zhuishushenqi.com/ranking/${girl}`,
    //     method: 'GET',
    //     header: {
    //       'content-type': 'application/json'
    //     },
    //     success(res) {

    //       console.log(res.data)
    //     },
    //     fail: function (err) {
    //       // this.ren = "数据获取失败";
    //     }
    //   })
    // },
    // qianliheimagirl(girl){//男女潜力
    //    wx.request({
    //     url: `https://api.zhuishushenqi.com/ranking/${girl}`,
    //     method: 'GET',
    //     header: {
    //       'content-type': 'application/json'
    //     },
    //     success(res) {

    //       console.log(res.data)
    //     },
    //     fail: function (err) {
    //       // this.ren = "数据获取失败";
    //     }
    //   })
    // },
    // chunliuboy(boy){//男女存留
    //    wx.request({
    //     url: `https://api.zhuishushenqi.com/ranking/${girl}`,
    //     method: 'GET',
    //     header: {
    //       'content-type': 'application/json'
    //     },
    //     success(res) {

    //       console.log(res.data)
    //     },
    //     fail: function (err) {
    //       // this.ren = "数据获取失败";
    //     }
    //   })
    // },
    // chunliugirl(girl){//男女存留
    //    wx.request({
    //     url: `https://api.zhuishushenqi.com/ranking/${girl}`,
    //     method: 'GET',
    //     header: {
    //       'content-type': 'application/json'
    //     },
    //     success(res) {

    //       console.log(res.data)
    //     },
    //     fail: function (err) {
    //       // this.ren = "数据获取失败";
    //     }
    //   })
    // },
    // wanjieboy(boy){//男女完结
    //    wx.request({
    //     url: `https://api.zhuishushenqi.com/ranking/${girl}`,
    //     method: 'GET',
    //     header: {
    //       'content-type': 'application/json'
    //     },
    //     success(res) {

    //       console.log(res.data)
    //     },
    //     fail: function (err) {
    //       // this.ren = "数据获取失败";
    //     }
    //   })
    // },
    // wanjiegirl(girl){//男女完结
    //    wx.request({
    //     url: `https://api.zhuishushenqi.com/ranking/${girl}`,
    //     method: 'GET',
    //     header: {
    //       'content-type': 'application/json'
    //     },
    //     success(res) {

    //       console.log(res.data)
    //     },
    //     fail: function (err) {
    //       // this.ren = "数据获取失败";
    //     }
    //   })
    // },
  }
})