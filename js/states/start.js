/**
 * 场景
 * state-start
 * 游戏开始 加载资源
 */

// 获取用户基本信息
function addStartBtn(cb) {
  const config = {
    type: 'Image',
    image: 'images/btn_start.png',
    style: {
      left: 248 / SCALE,
      top: 870 / SCALE,
      width: 254 / SCALE,
      height: 91 / SCALE
    }
  }

  // 获取用户信息
  const startBtn = wx.createUserInfoButton(config)
  startBtn.onTap(res => {
    console.log(res)
    if (res.userInfo) {
      cb(res.userInfo)
    }
  })
  return startBtn
}

/**
 * @class Start
 * @extends {Phaser.State}
 */
class Start extends Phaser.State {
  /**
   * 生命周期：加载前
   * 可以预加载游戏资源
   */
  preload() {
    console.log('pre-load')
    // 配置游戏画面缩放
    this.scale.pageAlignHorizontally = true
    this.scale.pageAlignVertically = true
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    // 预加载资源
    this.load.image('bg_menu', 'images/bg_menu.png')
    this.load.image('bg_playing', 'images/bg_playing.png')
    this.load.image('bg_rank', 'images/bg_rank.png')
    this.load.image('bg_waiting', 'images/bg_waiting.png')
    this.load.image('avatar', 'images/avatar.png')
    this.load.image('avatar_unknow', 'images/avatar_unknow.png')
    this.load.image('btn', 'images/btn_menu.png')
    this.load.image('o', 'images/o.png')
    this.load.image('x', 'images/x.png')
    this.load.image('row', 'images/rank_row.png')
    this.load.image('avatars', 'images/result_avatars.png')
    this.load.image('win', 'images/result_win.png')
    this.load.image('lose', 'images/result_lose.png')
    this.load.image('draw', 'images/result_draw.png')
    this.load.image('bunting', 'images/bunting.png')
  }

  /**
   * 生命周期：创建
   * 可以初始化游戏场景
   */
  create() {
    // 添加背景图
    this.game.add.image(0, 0, 'bg_menu')
    // 添加开始按钮
    const startBtn = addStartBtn(userInfo => {
      startBtn.destroy()
      go.userInfo = userInfo
      // 保存玩家信息
      if (go.userInfo.avatarUrl !== '') {
        this.load.image(go.userInfo.avatarUrl, go.userInfo.avatarUrl)
        // this.load.image('avatarUrl', go.userInfo.avatarUrl)
        // 在生命周期-preload意外开始加载 需要手动调用加载
        this.load.start()
      }
      // 开始主菜单场景
      this.game.state.start('menu')
    })
  }

}


module.exports = Start
