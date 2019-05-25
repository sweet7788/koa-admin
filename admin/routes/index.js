const router = require('koa-router')()
// const pool = require('../model/connection')
const loginConfig = require('./login')
const mainConfig =require('./main')

var rootConfig = Array.prototype.concat(loginConfig,mainConfig)

rootConfig.forEach((ele)=>{
  
  router[ele.type](ele.name,ele.method)
})

console.log(rootConfig)
module.exports = router
