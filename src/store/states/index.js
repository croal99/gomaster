/**
 * Created by zzmhot on 2017/3/21.
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/21 16:04
 * @Copyright(©) 2017 by zzmhot.
 *
 */

import {
  cookieStorage
} from 'common/storage'

const state = {
  userinfo: null, // 用户基础信息
  game_config: null, // 游戏基础配置
  ws: null, // WebSocket
};

export default {
    // 游戏邀请码
  game_code: '',
  // 游戏基础配置
  game_config: null,
  // 主机列表
  host_list: [],
  // 用户信息和是否登录
  user_info: cookieStorage.get('user_info')
}
