$('.register_now').click(function(){
    $.ajax({
        type:"post",
        url:"../php/register.php",
        data:{
            phonenum: $('.inp').eq(0).val(),
            pwd: $('.inp').eq(1).val(),
            repwd: $('.inp').eq(2).val(),
            createtime:(new Date()).getTime()
        },
        success:function(res){
            //解析数据
            typeof res == 'string'?JSON.parse(res):res
            if(res.code){
                alert(res.message)
            }else{
                alert("注册成功")
                location.href = '../html/login.html'
            }
            
        },
        error:function(msg){
            console.log(msg)
        }
    })
})