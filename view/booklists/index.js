// view/booklists/index.js
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
  attached: function () {

  }, // 组件挂载之前执行
  ready: function () { 
    this.booklists()
  }, // 组件挂载后执行
  
  /**
   * 组件的方法列表
   */
  methods: {
    tobook(event) {
      wx.navigateTo({
        url: '../../pages/bookDetail/index?bookid=' + event.currentTarget.dataset.bookid,
      })
    },
    booklists () {
      let _this=this
      wx.request({
        // url:`https://api.zhuishushenqi.com/book/by-categories?gender=male&type=hot&major=%E5%A5%87%E5%B9%BB&minor=&start=0&limit=20`,
        url: `https://api.zhuishushenqi.com/book/by-categories?gender=press&type=hot&major=%E5%A4%96%E6%96%87%E5%8E%9F%E7%89%88`,
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          _this.setData({ book: res.data.books})
        },
        fail: function (err) {
          // this.ren = "数据获取失败";
        }
      })
    }
  }
})
