module.exports = {
    tree:[
        {
            name: '账单管理',
            type: 'bill',
            children: [
            {
                name:'进账管理',
                href:'into',           //树形结构
                cols:[[
                    {type:'checkbox'},
                    {field: 'name', title: '订单名称', width:100,formType:'text'},
                    {field: 'createtime', title: '创建时间', width:100, sort: true,formType:'datepicker'},
                    {field: 'finished_text', title: '是否结束', width:100,formType:'radio',options:[{
                        label:'是',
                        value:1
                    },{
                        label:'否',
                        value:0
                    }]} ,
                    {field: 'finishtime', title: '结束时间', width: 177, sort: true,formType:'datepicker'},
                    {field: 'profit', title: '盈利', width: 100, sort: true,formType:'number'},
                    {field: 'type', title: '类型', width: 100, sort: true,formType:'select',options:[{
                        label:'入账',
                        value:0
                    },{
                        label:'出账',
                        value:1
                    }]},
                    {field: 'remake', title: '备注', width: 200,formType:'textarea'}
                ]],                    //表格头部以及模态框表单配置
                kind: 'table',         //页面种类
                dataTable: 'orders'    //数据库数据表

            },{
                name:'出账管理',
                href:'out',
                kind: 'table'
            }]
        },{
            name: '订单管理',
            type: 'order',
            children: [
            {
                name:'订单列表',
                href:'order'
            }]
        }
    ],
}