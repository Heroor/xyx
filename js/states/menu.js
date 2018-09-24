/**
 * 场景-主菜单
 * state-menu
 */

/**
 * 单机练习按钮
 */
function practice () {
  console.log('practice')
  go.game.state.start('practice')
}

/**
 * 好友对战
 */
function battle () {
  console.log('battle')
}

/**
 * 排行榜
 */
function rank () {
  console.log('rank')
}

/**
 * 添加主主菜单
 */
function addMenu () {
  [
    // x  y   按钮文本  回调函数
    [ 248, 750, '单机练习', practice],
    [ 248, 900, '好友对战', battle],
    [ 248, 1050, '好友排行', rank]
  ].map(([x, y, text, callback]) => {
    go.common.addBtn({
      x,
      y,
      text,
      callback
    })
  })
}

class Menu extends Phaser.State {
  // 生命周期-开始创建
  create () {
    this.add.image(0, 0, 'bg_menu'),
    // 添加菜单
    addMenu()

    // test
    // this.state.start('practice')
  }
}

module.exports = Menu
