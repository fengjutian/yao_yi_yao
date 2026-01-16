export function getHistory() {
  return wx.getStorageSync('shakeHistory') || []
}

export function pushHistory(id, limit = 10) {
  const history = getHistory()
  history.push(id)
  wx.setStorageSync('shakeHistory', history.slice(-limit))
}
