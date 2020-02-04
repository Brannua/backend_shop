const Router = require('koa-router'),
  mongoose = require('mongoose'),
  addSaltToPwd = require('../bcrypt/addSaltToPwd.js'),
  comparePwd = require('../bcrypt/comparePwd.js');
let router = new Router();

router.post('/registUser', async (ctx) => {
  /* 接收post请求封装成user对象 */
  const User = mongoose.model('User');
  let newUser = new User(ctx.request.body);
  /* 密码加盐加密 , 也可以在 userSchema 的钩子函数 pre 中实现 */
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

router.post('/loginUser', async (ctx) => {
  const User = mongoose.model('User');
  let { userName, passWord } = ctx.request.body;
  // 先查找数据库中对应的用户名 , 用户名存在再继续比对密码
  await User.findOne({ userName }).exec().then(async (result) => {
    if (result) {
      await comparePwd(passWord, result.passWord).then((isMatch) => {
        if (isMatch) {
          ctx.body = {
            code: 200,
            message: '登陆成功'
          }
        } else {
          ctx.body = {
            code: 401,
            message: '密码错误'
          }
        }
      })
    } else {
      ctx.body = {
        code: 404,
        message: '用户名不存在'
      }
    }
  });
});

module.exports = router;