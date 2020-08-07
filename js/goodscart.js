// 接收传过来的cookie来渲染页面
var arrCookie = JSON.parse(utils.getCookie('goods'))
        if(arrCookie.length >=1){
            var node = $(`<div class="goods_cart_con">
                <ul class="goods_cart_tit clearfix">
                    <li class="allChoose">
                        <input type="checkbox">
                    </li>
                    <li>全选</li>
                    <li>商品名称</li>
                    <li>规格</li>
                    <li>单价</li>
                    <li>数量</li>
                    <li>小计</li>
                    <li>操作</li>
                </ul>
            </div>
            <div class="goods_cart_footer clearfix">
                <p class="agin_buy">
                    <a href="javascript:history.go(-1)">继续购物</a>
                </p>
                <p>
                    共
                    <span class="goods_num">1</span>
                    件商品，已选择
                    <span class="choose_num">1</span>
                    件
                </p>
                <p class="total_btn">去结算</p>
                <p class="total_box">合计（不含运费）：<span class="total_wrap">￥<span class="goods_total">111</span></span></p>
            </div>`)
            node.appendTo($('.goods_cart_box'))
            // 循环创建i
            for(var i = 0; i < arrCookie.length; i++){
                var sumtotle = (arrCookie[i].newPrice.slice(1) * arrCookie[i].num).toFixed(2)
                var goodsprice = (arrCookie[i].newPrice.slice(1) * 1).toFixed(2)
                $(`<ul class="goods_box">
                <li class="goods_choose"><input type="checkbox"></li>
                <li class="goods_img">
                    <div class="goods_img_box"style="background-image: url(${arrCookie[i].img});"></div>
                </li>
                <li class="goods_name">
                    <a href="#">${arrCookie[i].name}</a>
                </li>
                <li class="goods_specs">${arrCookie[i].size}</li>
                <li class="goods_price_box">
                    ￥<span class="goods_price">${goodsprice}</span>
                </li>
                <li class="goods_num_box">
                    <div class="goods_num_con">
                        <span class="goods_num_cut">-</span>
                        <input class="goods_number" type="text" value="${arrCookie[i].num}">
                        <span class="goods_num_add">+</span>
                    </div>
                </li>
                <li class="goods_subtotal">
                    ￥
                    <span>${sumtotle}</span>
                </li>
                <li class="goods_del">删除</li>
                </ul>`).appendTo($('.goods_cart_con'))
            }
        }

//省市区三级联动
$.ajax({
    url:'../json/province.json',
    type:'get',
    datatype:'json',
    success:function(res){
        //存放选择的省市区的id
        var obj = {
            prov : '',
            city: '',
            district :''
        }
        for(var i = 0; i < res.length; i++){
            $(`<option value='${i}'>${res[i].name}</option>`).appendTo($('#Province'))
        }
        console.log($('#Province option:first'))
        $('#Province').change(function(){
            var pId = $('#Province').val()
            if(pId != null){
                obj.prov = pId
                var cityLen = res[pId]['city'].length
                $('#City option:first').nextAll().remove()
                console.log(cityLen)
                console.log(res[pId]['city'][0].name)
                for(var j = 0; j < cityLen; j++){
                    $(`<option value='${j}'>${res[pId]['city'][j].name}</option>`).appendTo($('#City'))
                }
            }        
        })
        $('#City').change(function(){
            var cId = $('#City').val()
            if(cId != null){
                obj.city = cId
                var districtLen = res[obj.prov]['city'][cId].area.length
                $('#District option:first').nextAll().remove()
                for(var z = 0; z < districtLen; z++){
                    $('option:first')
                    $(`<option value='${z}'>${res[obj.prov]['city'][cId].area[z]}</option>`).appendTo($('#District'))
                }
            }
        })
    },
    error:function(msg){
        console.log(msg)
    }
})
//显示窗口
$('.tip').click(function(){
    $('.mask').css('display','block')
    $('.show_con').css('display','block')
})
//关闭窗口
$('.show_head span').click(function(){
    $('.mask').css('display','none')
    $('.show_con').css('display','none')
})
$('.cancel_btn').click(function(){
    $('.mask').css('display','none')
    $('.show_con').css('display','none')
})
$('.confirm_btn').click(function(){
    $('.mask').css('display','none')
    $('.show_con').css('display','none')
    utils.setCookie('news',JSON.stringify(1))
    alert('信息已保存')
})

//结算
$('.total_btn').click(function(){
    if(utils.getCookie('news')){
        if(confirm(`请支付${$('.goods_total').html()}元`)){
            $('.goods_cart_con').remove()
            $('.goods_cart_footer').remove()
            utils.setCookie('goods',JSON.stringify(1),{expires:-1,path:'/'})
        }
    }else{
        alert('请填写你的信息')
    }
})
window.onload = function(){
    //数量加减
    var goods_num
    var subtotal
    //减
    $('.goods_cart_box').on('click','.goods_num_cut',function(){
        goods_num = $(this).next().val()
        goods_num --
        if(goods_num < 1){
            goods_num = 1
            $(this).next().val(goods_num)
        }
        $(this).next().val(goods_num)
        subtotal = (goods_num * $(this).parent().parent().prev().children().html()).toFixed(2)
        $(this).parent().parent().next().children().html(subtotal)
        var index = $(this).parent().parent().parent().index()
        arrCookie[index - 1].num = goods_num
        utils.setCookie('goods',JSON.stringify(arrCookie),{expires:7,path:'/'})
        numGoods()
    })
    //加
    $('.goods_cart_box').on('click','.goods_num_add',function(){
        goods_num = $(this).prev().val()
        goods_num ++ 
        $(this).prev().val(goods_num)
        subtotal = (goods_num * $(this).parent().parent().prev().children().html()).toFixed(2)
        $(this).parent().parent().next().children().html(subtotal)
        var index = $(this).parent().parent().parent().index()
        arrCookie[index - 1].num = goods_num
        utils.setCookie('goods',JSON.stringify(arrCookie),{expires:7,path:'/'})
        numGoods()
    })

    //删除
    $('.goods_cart_box').on('click','.goods_del',function(){
        if($('.goods_box').length == 1){
            $('.goods_cart_con').remove()
            $('.goods_cart_footer').remove()
            var index = $(this).parent().index()
            var arr1 = JSON.parse(utils.getCookie('goods'))
            arr1.splice(index - 1,1)
            utils.setCookie('goods',JSON.stringify(arr1),{expires:7,path:'/'})
        }else{
            $(this).parent().remove()
            var index = $(this).parent().index()
            var arr1 = JSON.parse(utils.getCookie('goods'))
            arr1.splice(index - 1,1)
            utils.setCookie('goods',JSON.stringify(arr1),{expires:7,path:'/'})    
        }
        numGoods()
    })

    // 全选 
    $('.goods_cart_box ').on('click','.allChoose input',function(){
        if($(this).is(':checked')){
            $('.goods_choose input').prop('checked',true)
        }else{
            $('.goods_choose input').prop('checked',false)
        }
        numGoods()
    })

    // 单选 商品数及价格
    $('.goods_cart_box').on('click','.goods_choose input',function(){
        var count = 0 //选中数量
        var total = 0 //总数
        for(var i = 0; i < $('.goods_choose input').length; i++){
            total += $('.goods_box .goods_num_con input').val() * 1
            if($('.goods_choose input')[i].checked){
                count++
            }   
        }
        if($('.goods_choose input').length == count){
            $('.allChoose input').prop('checked',true)
        }else{
            $('.allChoose input').prop('checked',false)
        }
        numGoods()
    })
    function numGoods(){
        var totalNum = 0 //总数量
        var numGoods = 0 //选择总数量
        var totalPrice = 0 //选择的总钱数
        var price 
        var inps = document.getElementsByClassName('goods_number') //获取输入框
        var goodsNum = document.getElementsByClassName('goods_num')[0] //获取总数量框
        for(var i = 0; i < inps.length; i++){
            totalNum += inps[i].value * 1
        }
        for(var j = 0; j < $('.goods_choose input').length; j++){
            if($('.goods_choose input')[j].checked){
                numGoods += $('.goods_number')[j].value * 1
                console.log($('.goods_subtotal span')[j])
                price = Number($('.goods_subtotal span')[j].innerHTML)
                totalPrice += price
            }
        }
        $('.choose_num').html(numGoods)
        $('.goods_total').html(totalPrice)
        goodsNum.innerHTML = totalNum
    }
    numGoods()
}


