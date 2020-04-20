/**
 * @description user controller
 * @author Brannua
 */

const Router = require('koa-router')
const router = new Router()
const mongoose = require('mongoose')
const addSaltToPwd = require('../utils/addSaltToPwd')
const comparePwd = require('../utils/comparePwd')
const { registFailInfo, loginPasswordWrongInfo, userNotExistInfo } = require('./_errorInfo')

// 用户注册
router.post('/registUser', async (ctx) => {

  const User = mongoose.model('User')
  let newUser = new User(ctx.request.body)

  // 密码加盐加密，也可以在 userSchema 的钩子函数 pre 中实现
  newUser.passWord = await addSaltToPwd(newUser.passWord)

  await newUser.save()
    .then(() => {
      ctx.body = {
        code: 200,
        message: '注册成功'
      }
    }).catch((err) => {
      console.error(err)
      ctx.body = registFailInfo
    })

})

// 用户登录
router.post('/loginUser', async (ctx) => {

  const User = mongoose.model('User')
  const { userName, passWord } = ctx.request.body

  // 先查找数据库中对应的用户名，用户名存在再继续比对密码
  await User.findOne({ userName }).exec().then(
    async (result) => {
      if (result) {
        await comparePwd(passWord, result.passWord)
          .then((isMatch) => {
            if (isMatch) {
              ctx.body = {
                code: 200,
                message: '登陆成功',
                userInfo: result,
              }
              return
            }
            ctx.body = loginPasswordWrongInfo
          })
        return
      }
      ctx.body = userNotExistInfo
    })
})

module.exports = router
