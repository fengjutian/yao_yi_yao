const db = wx.cloud.database()

Page({
  data: {
    name: '',
    category: '',
    categories: ['中餐', '日料', '快餐', '西餐'],
    list: []
  },

  onShow() {
    this.loadList()
  },

  onNameInput(e) {
    this.setData({ name: e.detail.value })
  },

  onCategoryChange(e) {
    this.setData({
      category: this.data.categories[e.detail.value]
    })
  },

  async addStore() {
    const { name, category } = this.data
    if (!name) return

    const userId = wx.getStorageSync('openid')

    await db.collection('restaurants').add({
      data: {
        userId,
        name,
        category,
        weight: 1,
        createdAt: Date.now()
      }
    })

    this.setData({ name: '', category: '' })
    this.loadList()
  },

  async loadList() {
    const userId = wx.getStorageSync('openid')
    const res = await db.collection('restaurants')
      .where({ userId })
      .get()

    this.setData({ list: res.data })
  }
})
