const pool = require('../../model/connection')
module.exports = [
  {
    name:'/',
    type: 'get',
    method: async (ctx, next) => {
      if(!ctx.cookies.get("tooken")){
        await ctx.redirect('/login',{
          title: 'aaa'
        })
      }else{
        await ctx.redirect('/main',{
            // _songList: res[0].songList
        })
      }
    }
  },{
    name:'/login',
    type: 'get',
    method: async (ctx, next) =>{
      await ctx.render('login/index',{
        title: '登陆'
      })
    }
  },{
    name:'/login',
    type: 'post',
    method: async (ctx, next) =>{
      var username = ctx.request.body.username;
      // console.log(id)
      var psw = ctx.request.body.password;
      var res = await pool.query(`select * from user where userName = '${username}'`)
      res.length ? (res[0].password === psw ? 
        res = {
            msg:'登录成功',
            status:true,
            data: {
              isLogin:true,
            }
        } : 
        res={
          msg:'登录失败',
          status:false,
          data: {
            isLogin:false
          }
        }) :res={
          msg:'登录失败',
          status:false,
          data:{
            isLogin:false
          }
        }
        ctx.body = res
        ctx.cookies.set(
          "tooken","aaaasdq",{
            maxAge:"100000000",       //cookie有效时长，单位：毫秒数
            path:"/",         //cookie保存路径, 默认是'/，set时更改，get时同时修改，不然会保存不上，服务同时也获取不到
            secure:false,       //默认false，设置成true表示只有https可以访问
            httpOnly:false,     //true，客户端不可读取
            overwrite:true    //一个布尔值，表示是否覆盖以前设置的同名的 cookie (默认是 false). 如果是 true, 在同一个请求中设置相同名称的所有 Cookie（不管路径或域）是否在设置此Cookie 时从 Set-Cookie 标头中过滤掉。
        })
    }
  },{
    name:'/main',
    type:'get',
    method:async (ctx, next) =>{
      if(!ctx.cookies.get("tooken")){
        await ctx.redirect('/login',{
          title: 'aaa'
        })
      }else{
        // await ctx.render('main/order_in',{
        //   hello : "helloword"
        // })
        await ctx.redirect('/main/orderInto',{
          title: 'aaa'
        })
      }
    }
  }
]