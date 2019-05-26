layui.use('element', function(){
    var element = layui.element;
    
    //一些事件监听
    // element.on('tab(demo)', function(data){
    //   console.log(data);
    // });
    
});
layui.use('table', function(){
  var table = layui.table;
  window.table = table
  //第一个实例
  table.render({
    elem: '#demo'
    ,height: 312
    ,url: '/main/orderInto' //数据接口
    ,method: 'post'
    ,page: true //开启分页
    ,cols: [[ //表头
       {type:'checkbox'}
      ,{field: 'id', title: 'ID', width:80, sort: true,}
      ,{field: 'username', title: '用户名', width:80}
      ,{field: 'sex', title: '性别', width:80, sort: true}
      ,{field: 'city', title: '城市', width:80} 
      ,{field: 'sign', title: '签名', width: 177}
      ,{field: 'experience', title: '积分', width: 80, sort: true}
      ,{field: 'score', title: '评分', width: 80, sort: true}
      ,{field: 'option', title: '操作', width: 80 }
    ]]
    ,done:function(){
        layui.use('layer',function (params) {
          var layer = layui.layer
          
          $('[data-target="update_table"]').on('click',function(){
            layer.open({
              type:1,
              title:'add',
              area:['80vw','80vh'],
              content:`
              <table class="layui-table" style="width:500px">
                <thead>
                  <tr>
                    <th>昵称</th>
                    <th>加入时间</th>
                    <th>签名</th>
                  </tr> 
                </thead>
                <tbody>
                  <tr>
                    <td>贤心</td>
                    <td>2016-11-29</td>
                    <td>人生就像是一场修行</td>
                  </tr>
                  <tr>
                    <td>许闲心</td>
                    <td>2016-11-28</td>
                    <td>于千万人之中遇见你所遇见的人，于千万年之中，时间的无涯的荒野里…</td>
                  </tr>
                </tbody>
              </table>
              `
            })
          })
      })
    }
  });

});
