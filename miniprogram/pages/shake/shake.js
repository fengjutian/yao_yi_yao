import { pickRestaurant } from '../../utils/shakeAlgorithm.js'
import { getHistory, pushHistory } from '../../utils/storage.js'

const db = wx.cloud.database()

Page({
  data: {
    result: null
  },

  onLoad() {
    this.lastShakeTime = 0
    wx.startAccelerometer({ interval: 'normal' })

    wx.onAccelerometerChange(res => {
      const delta =
        Math.abs(res.x) +
        Math.abs(res.y) +
        Math.abs(res.z)

      const now = Date.now()
      if (delta > 3 && now - this.lastShakeTime > 1500) {
        this.lastShakeTime = now
        this.shake()
      }
    })
  },

  async shake() {
    const userId = wx.getStorageSync('openid')
    const { data: list } = await db.collection('restaurants')
      .where({ userId })
      .get()

    if (!list.length) {
      wx.showToast({ title: '还没有店铺', icon: 'none' })
      return
    }

    const history = getHistory()
    const picked = pickRestaurant(list, history)

    if (!picked) return

    pushHistory(picked._id)

    this.setData({ result: picked })
    wx.vibrateShort()

    // 更新 lastPickedAt
    db.collection('restaurants')
      .doc(picked._id)
      .update({
        data: { lastPickedAt: Date.now() }
      })
  },

  feedbackAccept() {
    this.adjustWeight(1.1)
  },

  feedbackReject() {
    this.adjustWeight(0.9)
    this.shake()
  },

  adjustWeight(rate) {
    const { result } = this.data
    if (!result) return

    let weight = result.weight || 1
    weight = Math.min(Math.max(weight * rate, 0.2), 5)

    db.collection('restaurants')
      .doc(result._id)
      .update({ data: { weight } })
  },

  onUnload() {
    wx.stopAccelerometer()
  }
})
