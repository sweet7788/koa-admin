layui.use('element');
layui.use('layer')
layui.use('laydate',function(){
  layui.laydate.render({
    elem: '[name="createtime"]',
  })
  layui.laydate.render({
    elem: '[name="finishtime"]',
  })
});
layui.use('form',function(){
  var form = layui.form;
  form.render()
})
layui.use('table',function(){
  var table = layui.table;
  window.table = table
  //第一个实例
  table.render({
    elem: '#demo'
    ,height: window.innerHeight-50
    ,url: '/main/orderInto' //数据接口
    ,method: 'post'
    ,parseData:function(res) {

        res.data = res.data.map((ele,ind)=>{
          switch(ele.type){
            case 0 :
            case '0':
              ele.type = '进账'
              break;
            case 1 :
            case '1':
              ele.type = '出账'
              break;
            case 2 :
            case '2':
              ele.type = '记账'
              break;
          }
          ele.createtime ? ele.createtime = formatDate(ele.createtime,"YYYY-MM-DD") : ''
          ele.finishtime ? ele.finishtime = formatDate(ele.finishtime,"YYYY-MM-DD") : ''
          switch(ele.finished){
            case 0 : 
              ele.finished_text = '否'
              break;
            case 1 : 
              ele.finished_text = '是'
              break;
          }
          return ele
        })
        return {
          code:0,
          msg:'',
          data:res.data,
          count:res.count
        }
    }
    ,page: true //开启分页
    ,toolbar: 'default'
    ,defaultToolbar:[
      'filter', 'exports','point'
    ]
    ,cols: [[ //表头
       {type:'checkbox'}
      ,{field: 'name', title: '订单名称', width:100}
      ,{field: 'createtime', title: '创建时间', width:100, sort: true}
      ,{field: 'finished_text', title: '是否结束', width:100} 
      ,{field: 'finishtime', title: '结束时间', width: 177, sort: true}
      ,{field: 'profit', title: '盈利', width: 100, sort: true}
      ,{field: 'type', title: '类型', width: 100, sort: true}
      ,{field: 'remake', title: '备注', width: 200,}
    ]]
    ,done:function(){
       
    }
  });
  table.on('toolbar(orderInto)', function(obj){
    switch(obj.event){
      case 'add':
          layer.open({
            type:1,
            title:'添加订单',
            area:['80vw','80vh'],
            success: function() {
                $.fillForm({
                  data:{},
                  url:'/order/add',

                })
            },
            content:$('.modal')
       },)
      break;
      case 'delete':
        var id = (table.checkStatus('demo').data.map(ele=>ele.id))

        $.ajax({
          url:'/order/delete',
          data:{
            id:id
          },
          type:'post',
          success: function() {
            window.location.reload()
          }
        })
      break;
      case 'update':
        // layer.msg('编辑');
      break;
    };
  });
  table.on('rowDouble(orderInto)', function(obj){ //注：edit是固定事件名，test是table原始容器的属性 lay-filter="对应的值"
        obj.data //所在行的所有相关数据  
    
        var layer = layui.layer
      
        layer.open({
          type:1,
          title:'修改订单',
          area:['80vw','80vh'],
          content:$('.modal'),
          success: function() {
              $.fillForm({
                data:obj.data,
                url:'/order/update',

              })
          }
        })
  });
})


  
