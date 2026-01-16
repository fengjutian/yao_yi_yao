/**
 * 不重复 + 权重随机算法
 */

export function pickRestaurant(list, history, limit = 3) {
  if (!list.length) return null

  const recent = history.slice(-limit)

  // 1️⃣ 不重复过滤
  let candidates = list.filter(
    item => !recent.includes(item._id)
  )

  if (!candidates.length) {
    candidates = list
  }

  // 2️⃣ 权重计算
  const weights = candidates.map(calcWeight)
  const total = weights.reduce((a, b) => a + b, 0)

  let r = Math.random() * total
  for (let i = 0; i < candidates.length; i++) {
    r -= weights[i]
    if (r <= 0) return candidates[i]
  }

  return candidates[candidates.length - 1]
}

function calcWeight(item) {
  let w = item.weight || 1

  // 不喜欢直接降权
  if (item.dislike) w *= 0.3

  // 越久没摇到，权重越高
  if (item.lastPickedAt) {
    const days =
      (Date.now() - item.lastPickedAt) / 86400000
    w *= Math.min(1 + days * 0.2, 3)
  }

  return Math.max(0.1, w)
}
