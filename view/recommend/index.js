// view/recommend/index.js
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
   books:''
  },
  ready: function() {
    this.gettuijian()
  },
  /**
   * 组件的方法列表	http://api.zhuishushenqi.com/ranking/gender
   */
  methods: {
    tobook(event) {
      wx.navigateTo({
        url: '../../pages/bookDetail/index?bookid=' + event.currentTarget.dataset.bookid,
      })
    },
    gettuijian(){
      let _this=this
      wx.request({
        url: `http://api.zhuishushenqi.com/ranking/54d43437d47d13ff21cad58b`,
        method: 'GET',
       header: {
         'content-type': 'application/json'
       },
       success(res) {
_this.setData({
  books: res.data.ranking.books
})
       },
       fail: function (err) {
         // this.ren = "数据获取失败";
       }
      })
    }
  },
})