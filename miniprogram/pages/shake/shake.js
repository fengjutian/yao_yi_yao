import { pickRestaurant } from '../../utils/shakeAlgorithm.js'
import { getHistory, pushHistory } from '../../utils/storage.js'

const db = wx.cloud.database()

Page({
  data: {
    result: null,
    confetti: [],
    totalShakes: 0,
    totalStores: 0
  },

  onLoad() {
    this.lastShakeTime = 0
    this.initAudio()
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

    this.loadStats()
  },

  // 初始化音频（需要在项目中准备音频文件）
  initAudio() {
    // 音频文件需要放到 miniprogram/audio 目录下
    this.shakeAudio = wx.createInnerAudioContext()
    this.shakeAudio.src = '/audio/shake.mp3'
    this.shakeAudio.volume = 0.6

    this.resultAudio = wx.createInnerAudioContext()
    this.resultAudio.src = '/audio/success.mp3'
    this.resultAudio.volume = 0.8
  },

  // 播放摇动声音
  playShakeSound() {
    try {
      if (this.shakeAudio) {
        this.shakeAudio.stop()
        this.shakeAudio.play()
      }
    } catch (e) {
      console.log('音频播放失败', e)
    }
  },

  // 播放成功声音
  playSuccessSound() {
    try {
      if (this.resultAudio) {
        this.resultAudio.stop()
        this.resultAudio.play()
      }
    } catch (e) {
      console.log('音频播放失败', e)
    }
  },

  // 增强振动效果
  vibrate() {
    wx.vibrateShort({
      type: 'heavy'
    })
    // 连续振动3次
    setTimeout(() => wx.vibrateShort(), 100)
    setTimeout(() => wx.vibrateShort(), 200)
  },

  // 生成礼花
  generateConfetti() {
    const emojis = ['🎉', '🎊', '✨', '⭐', '🌟', '💫', '🎈', '🎁']
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE']
    const confetti = []

    for (let i = 0; i < 30; i++) {
      confetti.push({
        id: i,
        x: Math.random() * 100,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 30 + Math.random() * 30,
        duration: 2 + Math.random() * 2,
        delay: Math.random() * 0.5
      })
    }

    this.setData({ confetti })

    // 3秒后清除礼花
    setTimeout(() => {
      this.setData({ confetti: [] })
    }, 3000)
  },

  // 手动摇动
  manualShake() {
    const now = Date.now()
    if (now - this.lastShakeTime > 1500) {
      this.lastShakeTime = now
      this.shake()
    }
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

    // 播放声音和振动
    this.playShakeSound()
    this.vibrate()

    // 更新摇动次数
    const totalShakes = this.data.totalShakes + 1
    this.setData({ result: picked, totalShakes })
    wx.setStorageSync('totalShakes', totalShakes)

    // 延迟一点显示结果，播放成功声音和礼花
    setTimeout(() => {
      this.playSuccessSound()
      this.generateConfetti()
    }, 300)

    // 更新 lastPickedAt
    db.collection('restaurants')
      .doc(picked._id)
      .update({
        data: { lastPickedAt: Date.now() }
      })
  },

  feedbackAccept() {
    this.adjustWeight(1.1)
    wx.showToast({
      title: '已记录！',
      icon: 'success',
      duration: 1500
    })
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

  // 加载统计数据
  async loadStats() {
    try {
      const userId = wx.getStorageSync('openid')
      const { data: list } = await db.collection('restaurants')
        .where({ userId })
        .count()

      this.setData({
        totalStores: list.total || 0
      })

      // 从本地存储读取摇动次数
      const shakes = wx.getStorageSync('totalShakes') || 0
      this.setData({
        totalShakes: shakes
      })
    } catch (e) {
      console.log('加载统计失败', e)
    }
  },

  onUnload() {
    wx.stopAccelerometer()
    if (this.shakeAudio) {
      this.shakeAudio.destroy()
    }
    if (this.resultAudio) {
      this.resultAudio.destroy()
    }
  }
})
