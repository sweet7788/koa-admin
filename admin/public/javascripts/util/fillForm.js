$.extend({
    fillForm :function({data,url,method="post",type=0}){
        $(`form`).attr({
            method,
            url
        })

        for(var key in data){
            $(`form input[name="${key}"]`).val(data[key])
            $(`form textarea[name="${key}"]`).text(data[key])

        }
    }
})