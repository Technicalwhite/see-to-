// view/classification/index.js
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
    book:''
  },
  ready: function () {
    this.bookfenlei()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    gotobooklists(event){
      let q = event.currentTarget.dataset
      wx.navigateTo({
        url: '../../pages/books/index?name=' + q.name + '&leng=' + q.leng + '&gender='+q.x,
      })
    },
    bookfenlei() {
      let _this = this
      wx.request({
        url: `https://api.zhuishushenqi.com/cats/lv2/statistics`,

        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          _this.setData({ book: res.data })
        },
        fail: function (err) {
          // this.ren = "数据获取失败";
        }
      })
    }
  }
})
