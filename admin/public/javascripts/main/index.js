layui.use('element');
layui.use('layer')
layui.use('laydate');
layui.use('table',function(){
  var table = layui.table;
  window.table = table
  //第一个实例
  table.render({
    elem: '#demo'
    ,height: 312
    ,url: '/main/orderInto' //数据接口
    ,method: 'post'
    ,parseData:function(res) {
        console.log(res)
        res.data = res.data.map((ele,ind)=>{
          switch(ele.type){
            case 0 :
            case '0':
              ele.type = '进账'
            case 1 :
            case '1':
              ele.type = '出账'
            case 2 :
            case '2':
              ele.type = '记账'
          }
          ele.createtime ? ele.createtime = formatDate(ele.createtime,"YYYY-MM-DD") : ''
          ele.finishtime ? ele.finishtime = formatDate(ele.finishtime,"YYYY-MM-DD") : ''
          switch(ele.finished){
            case 0 : 
              ele.finished = '否'
            case 1 : 
              ele.finished = '是'
          }
          return ele
        })
        return {
          code:0,
          msg:'',
          data:res.data,
          count:res.data
        }
    }
    ,page: true //开启分页
    ,toolbar: 'default'
    ,defaultToolbar:[
      'filter', 'exports','point'
    ]
    ,cols: [[ //表头
       {type:'checkbox'}
      ,{field: 'id', title: 'ID', width:80, sort: true,}
      ,{field: 'name', title: '订单名称', width:100}
      ,{field: 'createtime', title: '创建时间', width:100, sort: true}
      ,{field: 'finished', title: '是否结束', width:100,text:{
        none:'123',
        '1':'123'
      }} 
      ,{field: 'finishtime', title: '结束时间', width: 177}
      ,{field: 'profit', title: '盈利', width: 100, sort: true}
      ,{field: 'type', title: '类型', width: 100, sort: true}
    ]]
    ,done:function(){
       
    }
  });
  table.on('toolbar(orderInto)', function(obj){
    switch(obj.event){
      case 'add':
        layer.msg('添加');
      break;
      case 'delete':
        layer.msg('删除');
        console.log(table.checkStatus('demo'))
      break;
      case 'update':
        // layer.msg('编辑');
      break;
    };
  });
  table.on('row(orderInto)', function(obj){ //注：edit是固定事件名，test是table原始容器的属性 lay-filter="对应的值"
    console.log(obj.data); //所在行的所有相关数据  
    
        var layer = layui.layer
      
        layer.open({
          type:1,
          title:'修改订单',
          area:['80vw','80vh'],
          content: `
            <form class="layui-form mt-4">
              <div class="d-flex justify-content-center">
                <div class="layui-form-item w-40">
                  <label class="layui-form-label">名称</label>
                  <div class="layui-input-block">
                    <input type="text" value=${obj.data.name} name="name" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
                  </div>
                </div>
                <div class="layui-form-item w-40">
                  <label class="layui-form-label">创建时间</label>
                  <div class="layui-input-block">
                    <input type="text" class="layui-input" name="createtime" value="${formatDate(obj.data.createtime,"YYYY-MM-DD")}" data-target="datepicker">
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <div class="layui-form-item w-40">
                  <label class="layui-form-label">创建状态</label>
                  <div class="layui-input-block">
                    <input type="text" value=${obj.data.finished} name="finished" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
                  </div>
                </div>
                <div class="layui-form-item w-40">
                  <label class="layui-form-label">完成时间</label>
                  <div class="layui-input-block">
                    <input type="text" class="layui-input" name="finishtime" value="${formatDate(obj.data.finishtime,"YYYY-MM-DD")}" data-target="datepicker1">
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <div class="layui-form-item w-40">
                  <label class="layui-form-label">订单利润</label>
                  <div class="layui-input-block">
                    <input type="text" value=${obj.data.profit} name="profit" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
                  </div>
                </div>
                <div class="layui-form-item w-40">
                  <label class="layui-form-label">订单类型</label>
                  <div class="layui-input-block">
                    <input type="text" value=${obj.data.type} name="type" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <div class="layui-form-item">
                  <div class="layui-input-block">
                    <button class="layui-btn px-5" lay-submit lay-filter="formDemo">确认</button>
                  </div>
                </div>
                <div class="layui-form-item">
                  <div class="layui-input-block">
                    <button type="reset" class="layui-btn px-5 layui-btn-primary">重置</button>
                  </div>
                </div>
              </div>
            </form>
          `,
          success: function() {
            layui.use('form',function() {
              var form = layui.form;
              form.render()
              layui.laydate.render({
                elem: '[name="createtime"]',
                value: obj.data.createtime
              })
              layui.laydate.render({
                elem: '[name="finishtime"]',
                value: obj.data.finishtime
              })
            })
          }
        })
  });
})


  
