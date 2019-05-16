const router = require('koa-router')()
const pool = require('../model/connection')

router.get('/', async (ctx, next) => {
  await ctx.render('login/index', {
    // title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.post('/login', async (ctx, next) =>{
  var id = ctx.request.body.id;
  // console.log(id)
  var psw = ctx.request.body.psw;
  var res = await pool.query(`select * from user where userName = '${id}'`)
  
  res.length ? (res[0].password === psw ? res = '登录成功' : res = '登录失败') : res = '登录失败'
  await ctx.render('login/index', {
    title: res
  })
  ctx.session.tooken = 'aaaasdq'
  ctx.redirect('/main')
})

router.get('/main', async (ctx, next) =>{
  if(!ctx.session.tooken){
    await ctx.render('login/index',{
      title: 'aaa'
    })
  }else{
    var res = await pool.query(`select * from songList`)
    console.log(res)
    await ctx.render('main/index',{
        _songList: res[0].songList
    })
  }
})

module.exports = router
