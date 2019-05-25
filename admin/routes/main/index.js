const pool = require('../../model/connection')

module.exports = [
    {
        name: '/main/orderOut',
        type: 'get',
        method: async(ctx,next)=>{
            console.log('aaa')
            await ctx.render('main/order_out',{})
        },
    },{
        name: '/main/orderInto',
        type: 'get',
        method: async(ctx,next)=>{
            console.log('aa')
            await ctx.render('main/order_in',{})
        },
    }
]