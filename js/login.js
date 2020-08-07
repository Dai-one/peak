$('.login_btn').click(function(){
    $.ajax({
        type:"post",
        url:"../php/login.php",
        data:{
            phonenum: $('.inp').eq(0).val(),
            pwd: $('.inp').eq(1).val(),
        },
        success:function(res){
            //解析数据
            typeof res == 'string'?JSON.parse(res):res
            if(res.code){
                alert(res.message)
            }else{
                alert("登陆成功")
                // console.log($phonenum)
                utils.setCookie('name',`${$('.inp').eq(0).val()}`,{expires:7,path:'/'})
                location.href = '../index1.html'
                
            }
            
        },
        error:function(msg){
            console.log(msg)
        }
    })
})