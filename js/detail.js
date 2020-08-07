//获取传过来的cookie,渲染页面
var msg = JSON.parse(utils.getCookie('message'))
$(`<img src="${msg.img}">`).appendTo($('.goods_box'))
        $(`<img src="${msg.img}">`).appendTo($('.goods_bigbox'))
        $('.detail_title').text(`${msg.name}`)
        $('.price').text(`${msg.newPrice}`)
        $('.oldprice').html(`￥${msg.oldPrice}`)
//小图片轮播
var flag = true
//向下
$('.next').click(function(){
    if(flag){
        var distance = parseInt($('.items ul').css('width')) - parseInt($('.items').css('width'))
        var left = $('.items ul').position().left
        if(left > -distance){
            flag = false
            $('.items ul').animate({left: left - 80},500,'linear',function(){
                flag = true
            })
        }
    } 
})
//向上
$('.prev').click(function(){
    if(flag){
        var left = $('.items ul').position().left
        if(left < 0){
            flag = false
            $('.items ul').animate({left: left + 80},500,'linear',function(){
                flag = true
            })
        }
    }
})


var goodsBox = document.querySelector('.goods_box') //获取商品图片盒子
var detailLft = document.querySelector('.detail_left')
var oSpan = goodsBox.querySelector('span') //获取放大镜
var bigBox = document.querySelector('.goods_bigbox') //获取大图片盒子


// console.log($('.goods_box'))

//鼠标移入商品盒子绑定移入事件
goodsBox.onmouseenter = function(){
    oSpan.style.display = 'block'
    bigBox.style.display = 'block'
    //绑定鼠标移动事件
    goodsBox.onmousemove = function(e){
        e = e || window.event
        var left = e.pageX - detailLft.offsetLeft - oSpan.offsetWidth / 2
        var top = e.pageY - detailLft.offsetTop - oSpan.offsetHeight / 2
        if(left < 0) left = 0
        if(top < 0) top = 0 
        if(left > goodsBox.offsetWidth - oSpan.offsetWidth) left = goodsBox.offsetWidth - oSpan.offsetWidth 
        if(top > goodsBox.offsetHeight - oSpan.offsetHeight) top = goodsBox.offsetHeight - oSpan.offsetHeight 
        oSpan.style.left = left + 'px'
        oSpan.style.top = top + 'px'
        $('.goods_bigbox img').css({
            left : -2 * left + 'px',
            top :   -2 * top + 'px'
        })
    }
}
//鼠标移出商品盒子隐藏
goodsBox.onmouseleave = function(){
    oSpan.style.display = 'none'
    bigBox.style.display = 'none'
}




//选择颜色
var arr = []
$('.select_color li img').click(function(){
    $('.select_color li').removeClass('checked')
    $(this).parent().addClass('checked')
    $('.goods_box img').attr('src',$(this).attr('src'))
    $('.goods_bigbox img').attr('src',$(this).attr('src'))
    arr[0] = $(this).attr('title')
    $('.checked_goods_color').html(arr[1] ? `${arr[0]} ${arr[1]}` : arr[0])
})

//选择尺寸
$('.select_size li').click(function(){
    $('.select_size li').removeClass('checked')
    $(this).addClass('checked')
    arr[1] = $(this).html()
    $('.checked_goods_color').html(arr[0]? `${arr[0]} ${arr[1]}` : arr[1])
})

//数量加减
var num = 1
$('.num_con span').first().click(function(){
    num --
    if(num < 1){
        num = 1
        $('.num_con input').val(num)
    }
    $('.num_con input').val(num) 
})

$('.num_con span').last().click(function(){
    num++
    $('.num_con input').val(num)
})

//优惠券
$('.detail_info span').click(function(){
    alert('恭喜你获得一张优惠券')
})

//加入购物车
$('.add_cart').click(function(){
    if(arr[0]){
        if(arr[1]){
            if(utils.getCookie('goods')){
                var same = false //假如没有添加过这件商品
                var cookieStr = utils.getCookie('goods')
                console.log(cookieStr)
                var cookieArr = JSON.parse(cookieStr)
                console.log(cookieArr)
                var goodSize = $('.checked_goods_color').html()
                var name = $('.detail_title').html()
                for(var i = 0; i < cookieArr.length; i++){
                    if(cookieArr[i].name == name && cookieArr[i].size == goodSize){
                        var num = $('.num_con input').val()
                        cookieArr[i].num *= 1
                        cookieArr[i].num  += num * 1
                        same = true
                        break;
                    }
                }
                if(!same){
                    var obj = {name: name,num :$('.num_con input').val(),size: goodSize,img: $('.goods_box img').attr('src'),newPrice: msg.newPrice,oldPrice: msg.oldPrice}
                    cookieArr.push(obj)
                }
                //最后存回cookie
                utils.setCookie('goods',JSON.stringify(cookieArr),{expires:7,path:'/'})
            }else{
                var cookieArr = [{name: msg.name, num : $('.num_con input').val(),size:$('.checked_goods_color').html(),img:msg.img,newPrice: msg.newPrice,oldPrice: msg.oldPrice}]
                utils.setCookie('goods',JSON.stringify(cookieArr),{expires:7,path : '/'})
            }
            alert(utils.getCookie('goods'))
            if($('.login_name').text() == '请登录'){
                alert('请登录')
                location.href = '../html/login.html'
            }else{
                location.href = '../html/goodscart.html'
            }
        }else{
            alert('请选择尺寸')
        }
    }else{
        alert('请选择颜色')
    }
})