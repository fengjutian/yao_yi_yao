const db = wx.cloud.database()

Page({
  data: {
    showModal: false, // 控制模态框显示
    name: '',
    address: '',
    category: '',
    photoUrl: '',
    categories: ['中餐', '日料', '快餐', '西餐'],
    list: [],
    editingId: null // 用于标识是否在编辑模式
  },

  onShow() {
    this.loadList()
  },

  // 打开添加模态框
  openAddModal() {
    this.resetForm()
    this.setData({ showModal: true })
  },

  // 关闭模态框
  closeModal() {
    this.setData({ showModal: false })
  },

  onNameInput(e) {
    this.setData({ name: e.detail.value })
  },

  onAddressInput(e) {
    this.setData({ address: e.detail.value })
  },

  onCategoryChange(e) {
    this.setData({
      category: this.data.categories[e.detail.value]
    })
  },

  // 选择照片
  choosePhoto() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath
        this.uploadPhoto(tempFilePath)
      }
    })
  },

  // 上传照片
  async uploadPhoto(filePath) {
    wx.showLoading({ title: '上传中...' })

    try {
      const cloudPath = `restaurant_photos/${Date.now()}.jpg`
      const res = await wx.cloud.uploadFile({
        cloudPath: cloudPath,
        filePath: filePath
      })

      this.setData({ photoUrl: res.fileID })
      wx.hideLoading()
    } catch (err) {
      wx.hideLoading()
      wx.showToast({ title: '上传失败', icon: 'none' })
    }
  },

  // 添加或更新店铺
  async saveStore() {
    const { name, address, category, photoUrl, editingId } = this.data

    if (!name) {
      wx.showToast({ title: '请输入店铺名称', icon: 'none' })
      return
    }

    const userId = wx.getStorageSync('openid')

    wx.showLoading({ title: '保存中...' })

    try {
      if (editingId) {
        // 更新
        await db.collection('restaurants').doc(editingId).update({
          data: {
            name,
            address,
            category,
            photoUrl,
            updatedAt: Date.now()
          }
        })
        wx.showToast({ title: '更新成功', icon: 'success' })
      } else {
        // 新增
        await db.collection('restaurants').add({
          data: {
            userId,
            name,
            address,
            category,
            photoUrl,
            weight: 1,
            createdAt: Date.now()
          }
        })
        wx.showToast({ title: '添加成功', icon: 'success' })
      }

      this.setData({ showModal: false })
      this.resetForm()
      this.loadList()
    } catch (err) {
      wx.hideLoading()
      wx.showToast({ title: '保存失败', icon: 'none' })
    }
  },

  // 编辑店铺
  editStore(e) {
    const item = e.currentTarget.dataset.item
    this.setData({
      showModal: true,
      editingId: item._id,
      name: item.name,
      address: item.address || '',
      category: item.category,
      photoUrl: item.photoUrl || ''
    })
  },

  // 删除店铺
  deleteStore(e) {
    const item = e.currentTarget.dataset.item

    wx.showModal({
      title: '确认删除',
      content: `确定要删除"${item.name}"吗？`,
      confirmText: '删除',
      confirmColor: '#0052D9',
      success: async (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '删除中...' })
          try {
            await db.collection('restaurants').doc(item._id).remove()
            wx.hideLoading()
            wx.showToast({ title: '删除成功', icon: 'success' })
            this.loadList()

            // 如果正在编辑的是被删除的店铺，关闭模态框并清空表单
            if (this.data.editingId === item._id) {
              this.setData({ showModal: false })
              this.resetForm()
            }
          } catch (err) {
            wx.hideLoading()
            wx.showToast({ title: '删除失败', icon: 'none' })
          }
        }
      }
    })
  },

  // 预览照片
  previewPhoto(e) {
    const url = e.currentTarget.dataset.url
    if (url) {
      wx.previewImage({
        urls: [url],
        current: url
      })
    }
  },

  // 重置表单
  resetForm() {
    this.setData({
      editingId: null,
      name: '',
      address: '',
      category: '',
      photoUrl: ''
    })
  },

  async loadList() {
    const userId = wx.getStorageSync('openid')
    const res = await db.collection('restaurants')
      .where({ userId })
      .orderBy('createdAt', 'desc')
      .get()

    this.setData({ list: res.data })
  }
})
