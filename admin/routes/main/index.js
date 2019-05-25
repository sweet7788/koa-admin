const pool = require('../../model/connection')

module.exports = [
    {
        name: '/main/orderOut',
        type: 'get',
        method: async(ctx,next)=>{
            console.log('aaa')
            await ctx.render('main/order_out',{
                orderList : [{
                    name:'asd',
                    time: '2019',
                    money : '1000'
                },{
                    name:'asd',
                    time: '2019',
                    money : '1123'
                }]
            })
        },
    },{
        name: '/main/orderInto',
        type: 'get',
        method: async(ctx,next)=>{
            console.log('aa')
            await ctx.render('main/order_in',{
                head:{
                    name:'名称',
                    time:'时间',
                    price:'价格'
                },
                orderList : [{
                    
                    name:'asd',
                
                    time:'2019',
                
                    price:'123123'
                    
                },
                {
                    
                    name:'asd',
                
                    time:'2019',
                
                    price:'123123'
                    
                },
                ]
            })
        },
    }
]