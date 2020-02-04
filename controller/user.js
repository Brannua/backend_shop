const Router = require('koa-router'),
  mongoose = require('mongoose'),
  addSaltToPwd = require('../bcrypt/bcrypt.js');
let router = new Router();

router.post('/registUser', async (ctx) => {
  /* 获取model */
  const User = mongoose.model('User');
  /* 接收post请求封装成user对象 */
  let newUser = new User(ctx.request.body);
  /* 密码加盐加密 */ /* 也可以在 userSchema 的钩子函数 pre 中实现 */
  newUser.passWord = await addSaltToPwd(newUser.passWord)
  /* 使用save保存密码加密后的用户信息 */
  await newUser.save().then(() => {
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  }).catch((err) => {
    ctx.body = {
      code: 500,
      message: err
    }
  });
});

module.exports = router;