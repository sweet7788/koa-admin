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
    ,url: '/bill/into' //数据接口
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
    ,cols: config.cols
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
                  url:'/bill/add',

                })
            },
            content:$('.modal')
       },)
      break;
      case 'delete':
        var id = (table.checkStatus('demo').data.map(ele=>ele.id))

        $.ajax({
          url:'/bill/delete',
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
        // obj.data 所在行的所有相关数据  
        console.log(obj.data)
        var layer = layui.layer
      
        layer.open({
          type:1,
          title:'修改订单',
          area:['80vw','80vh'],
          content:$('.modal'),
          success: function() {
              $.fillForm({
                data:obj.data,
                action:'/bill/update',

              })
          }
        })
  });
})


  
