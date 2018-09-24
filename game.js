require('js/libs/weapp-adapter.js')
window.p2 = require('js/libs/p2.js')
window.PIXI = require('js/libs/pixi.js')
window.Phaser = require('js/libs/phaser-split.js')

// 全局变量
window.WIDTH = 750 // 游戏宽度
window.SCALE = WIDTH / canvas.width // 比例
window.HEIGHT = canvas.height * SCALE // 游戏高度

// 共享数据和方法的全局对象
window.go = {
  game: null,
  userInfo: null,
  opponentInfo: null,
  common: require('js/common'),
  server: null,
  launchRoomId: null,
  battle: null
}
console.log(go)
// init game
const config = {
  width: WIDTH, // 游戏宽度
  height: HEIGHT, // 游戏高度
  renderer: Phaser.CANVAS, // 使用canvas渲染
  canvas: canvas // 使用adapter自动创建的画布
}

const game = new Phaser.Game(config) // 创建游戏
go.game = game

// 注册游戏场景
game.state.add('start', require('js/states/start'))// 添加start场景
game.state.add('menu', require('js/states/menu')) // 添加menu 场景
game.state.add('practice', require('js/states/practice')) // 添加practice场景
//启动游戏
game.state.start('start')
