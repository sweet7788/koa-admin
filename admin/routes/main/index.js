const SqlHelper = require('../../model/sqlHelper')

const table_orders = new SqlHelper('orders')

const webConfig = require('../../config/config')
module.exports = [
    {
        name: '/bill/out',
        type: 'get',
        method: async(ctx,next)=>{
            console.log('aaa')
            await ctx.render('component/order_out',{
                pathname:'billout',
                tree:webConfig.tree
            })            
        },
    },{
        name: '/bill/into',
        type: 'get',
        method: async(ctx,next)=>{
            await ctx.render('component/tablePage',{
                head:{
                    name:'名称',
                    time:'时间',
                    price:'价格'
                },
                pathname:'billinto',
                tree:webConfig.tree
            })   
        },
    },
    {
        name: '/bill/into',
        type: 'post',
        method: async(ctx,next)=>{
            var res = await table_orders.select()
            var count = await table_orders.count()

            ctx.body = {
                code : 0,
                msg : '',
                data : res,
                count:count
            }
        },
    },
    {
        name: '/bill/update',
        type: 'post',
        method: async(ctx,next)=>{
            var param = ctx.request.body
            var res = await table_orders.update({
                where:{
                    id:param.id
                },
                data:{
                    name:param.name,
                    createtime:param.createtime,
                    finished:param.finished,
                    finishtime:param.finishtime,
                    profit:param.profit,
                    type:param.type,
                    remake:param.remake
                }
            })
            ctx.redirect('/bill/into')
        }
    },
    {   
        name: '/bill/add',
        type: 'post',
        method: async(ctx,next)=>{
            var param = ctx.request.body
            var res = await table_orders.insert({
                data:{
                    name:param.name,
                    createtime:param.createtime,
                    finished:param.finished,
                    finishtime:param.finishtime,
                    profit:param.profit,
                    type:param.type,
                    remake:param.remake
                }
            })
            ctx.redirect('/bill/into')
        }
    },
    {   
        name: '/bill/delete',
        type: 'post',
        method: async(ctx,next)=>{
            var param = ctx.request.body
            console.log(param)
            var res = await table_orders.deleteMore({
                where:{
                    id:param.id
                }
            })
            ctx.body={
                status:200,
                data:{

                },
                msg:{}
            }
        }
    }
]