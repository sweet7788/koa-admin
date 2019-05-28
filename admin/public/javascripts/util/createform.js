module.exports = function({data,url,method="post",type=0}){
    
    var content = ``
    type === 1 ? content = `<input type="hidden" name="id" value="${data.id}">`:''


    var formItems = ``;
    Object.keys(data).forEach((key,ind)=>{
        var formItem = ''
        switch(data[key].inputType){
            case 'radio':
                break;
            case 'checkbox':
                break;
            case 'select':
                break;
            default :
               formItem = `
                    <div class="d-flex justify-content-center">
                        <div class="layui-form-item w-40">
                            <label class="layui-form-label">${data[key].title}</label>
                            <div class="layui-input-block">
                                <input type="text" value="${data[key].value}" name="${data[key].value}" ${data[key].require}  lay-verify="${data[key].require}" placeholder="${data[key].placeholder}" autocomplete="off" class="layui-input">
                            </div>
                        </div>
                    </div>
                `;
        }
        if(ind%2 !== 0||ind+1 === Object.keys(data).length){
            content+=`
                <div class="d-flex justify-content-center">
                    ${formItems}
                </div>
            `
            formItems=''
        }else{
            formItems +=formItem
        }
        
    })

    var str = `<form class="layui-form mt-4" action="${url}" method="${method}">${content}</form>`
    return str 
    // var str =`

    //     <form class="layui-form mt-4" action="/order/update" method="post">
    //         <input type="hidden" name="id" value="${data.id}">
    //         <div class="d-flex justify-content-center">
    //             <div class="layui-form-item w-40">
    //                 <label class="layui-form-label">名称</label>
    //                 <div class="layui-input-block">
    //                 <input type="text" value=${data.name} name="name" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
    //                 </div>
    //             </div>
    //             <div class="layui-form-item w-40">
    //                 <label class="layui-form-label">创建时间</label>
    //                 <div class="layui-input-block">
    //                 <input type="text" class="layui-input" name="createtime" value="${formatDate(data.createtime,"YYYY-MM-DD")}" data-target="datepicker">
    //                 </div>
    //             </div>
    //         </div>
    //         <div class="d-flex justify-content-center">
    //         <div class="layui-form-item w-40">
    //             <label class="layui-form-label">创建状态</label>
    //             <div class="layui-input-block">
    //             <input type="radio" name="finished" value="1" title="是" ${data.finished === '是' ? 'checked' : ''}>
    //             <input type="radio" name="finished" value="0" title="否" ${data.finished === '否' ? 'checked' : ''}>
    //             </div>
    //         </div>
    //         <div class="layui-form-item w-40">
    //             <label class="layui-form-label">完成时间</label>
    //             <div class="layui-input-block">
    //             <input type="text" class="layui-input" name="finishtime" value="${formatDate(data.finishtime,"YYYY-MM-DD")}" data-target="datepicker1">
    //             </div>
    //         </div>
    //         </div>
    //         <div class="d-flex justify-content-center">
    //         <div class="layui-form-item w-40">
    //             <label class="layui-form-label">订单利润</label>
    //             <div class="layui-input-block">
    //             <input type="text" value=${data.profit} name="profit" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
    //             </div>
    //         </div>
    //         <div class="layui-form-item w-40">
    //             <label class="layui-form-label">订单类型</label>
    //             <div class="layui-input-block">
    //             <select name="type" lay-verify="">
    //                 <option value="0" ${data.type=="入账"?'selected':''}>入账</option>
    //                 <option value="1" ${data.type=="出账"?'selected':''}>出账</option>
    //                 <option value="2" ${data.type=="记账"?'selected':''}>记账</option>
    //             </select>     
    //             </div>
    //         </div>
    //         </div>
    //         <div class="d-flex justify-content-center">
    //         <div class="layui-form-item w-80">
    //             <label class="layui-form-label">备注</label>
    //             <div class="layui-input-block">
    //             <textarea name="remake" value=${data.profit} placeholder="请输入内容" class="layui-textarea"></textarea>
    //             </div>
    //         </div>
    //         </div>
    //         <div class="d-flex justify-content-center">
    //         <div class="layui-form-item">
    //             <div class="layui-input-block">
    //             <button class="layui-btn px-5" lay-submit lay-filter="formDemo">确认</button>
    //             </div>
    //         </div>
    //         <div class="layui-form-item">
    //             <div class="layui-input-block">
    //             <button type="reset" class="layui-btn px-5 layui-btn-primary">重置</button>
    //             </div>
    //         </div>
    //         </div>
    //     </form>
    // `
    
}