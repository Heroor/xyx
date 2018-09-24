/**
 * 场景-单机联系
 */

let cd // 倒计时
let board // 棋盘
let currentPlayer // 当前玩家
let intervalID // 倒计时定时器id
let lastTimestamp // 计算倒计时
let renderCD // 渲染倒计时
let setPiece // 落子

// 游戏结束
function gameOver(result) {
  clearInterval(intervalID)
  // 显示结果层
  go.common.showResult({
    result,
    meName: go.userInfo.nickName,
    // 设定无头像时的默认头像
    meAvatar: go.userInfo.avatarUrl || 'avatar_unknow',
    opponentName: '电脑',
    opponentAvatar: 'avatar_unknow',
    // 回到首页按钮
    callback () {
      go.game.state.start('menu')
    }
  })
}

/**
 * 落子 返回游戏是否结束
 */
function placePiece (row, col) {
  board[row][col] = currentPlayer
  setPiece(row, col, currentPlayer)
  console.log('落子')
  if (checkOver()) return true
  // 交换选手
  currentPlayer = 1 - currentPlayer
  return false
}

/**
 * 重置游戏
 */
function reset (a) {
  board = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
  ]

  // 随机选择先手玩家
  currentPlayer = Math.floor(Math.random())

  // 倒计时
  cd = [60000, 60000]
  lastTimestamp = Date.now()

  intervalID = setInterval(() => {
    // 更新定时器
    const current = Date.now()
    const delta = current - lastTimestamp
    lastTimestamp = current
    cd[currentPlayer] = cd[currentPlayer] - delta
    // 绘制倒计时
    renderCD(cd[0], cd[1])

    // 时间到 结束游戏
    cd[0] <= 0 && gameOver('lose')
    cd[1] <= 0 && gameOver('win')
  }, 500)

  // intervalID = setTimeout(function loop () {
  //   // 更新定时器
  //   const current = Date.now()
  //   const delta = current - lastTimestamp
  //   lastTimestamp = current
  //   cd[currentPlayer] = cd[currentPlayer] - delta
  //   // 绘制倒计时
  //   renderCD(cd[0], cd[1])

  //   // 时间到 结束游戏
  //   cd[0] <= 0 && gameOver('lose')
  //   cd[1] <= 0 && gameOver('win')
  //   loop()
  // }, 500)
}

/**
 * 检查游戏结果
 */
function checkOver () {
  // 调用 go.common.checkWin 判断游戏状态
  if (go.common.checkWin(board)) {
    gameOver(['win', 'lose'][currentPlayer])
    return true
  } else if (go.common.checkDraw(board)) {
    gameOver('draw')
    return true
  }
  return false
}


class Practice extends Phaser.State {
  create() {
    this.add.image(0, 0, 'bg_playing')
    // 重置游戏
    reset()

    // 调用 go.common.addBattleInfo 绘制游戏信息
    // 返回更新倒计时的函数
    renderCD = go.common.addBattleInfo({
      meAvatar: go.userInfo.avatarUrl || 'avatar_unknow',
      meName: go.userInfo.nickName,
      opponentAvatar: 'avatar_unknow',
      opponentName: '刘强东'
    })
    // 传入玩家及对手的倒计时 更新界面
    renderCD(cd[0], cd[1])

    console.log('setPiece')
    // go.common.addPieces 画棋盘
    // 函数接受一个棋子落下后的回调  返回用于落子的函数
    setPiece = go.common.addPieces((row, col) => {
      // 判断有没有轮到玩家落子
      if (currentPlayer !== 0) {
        return
      }
      console.log(row, col)
      // 玩家落子
      const isOver = placePiece(row, col)
      if (isOver) return

      // AI 落子
      const stratage = [
        [1, 1],
        [0, 0], [0, 2], [2, 0], [2, 2],
        [0, 1], [1, 0], [1, 2], [2, 1]
      ]

      // 找一个空位
      const availableCoord = stratage.find(([row, col]) => board[row][col] === -1)

      // 落子
      placePiece(availableCoord[0], availableCoord[1])
      // placePiece.apply(null, availableCoord)
    })
    // 若随机电脑先下
    if (currentPlayer === -1) {
      placePiece(1, 1)
    }
  }
}

module.exports = Practice
