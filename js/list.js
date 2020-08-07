// 下拉框显示与隐藏
$('.bg').click(function(){
    $(this).parent().toggleClass('original')
    $(this).next().slideToggle()
})

//Ajax渲染页面
$.ajax({
    url: '../json/list.json',
    type : 'get',
    datatype:'json',
    success:function(res){
        console.log(res)
        //分页器
    var obj={
        pagenum:1, //页码
        pagesize:24, //一页数量
        total:res.length, //数量
        totalpage:Math.ceil(res.length/24) //页数
    }
    new Pagination($('.Pager_box')[0],{
        pageInfo:obj,
        textInfo:{
            first:'首页',
            prev:'上一页',
            next:'下一页',
            last:'尾页'
        },
    //回调函数
    change(num){
        //根据返回过来的页码，去数组中查找相应的数据来显示
        var data = res.slice((num-1)*obj.pagesize,num*obj.pagesize)
        if($('.filter_result_con ul').children().length){
            $('.filter_result_con ul').empty()
        }
        data.forEach(function(item,idnex){
            $(`<li>
            <a href="../html/detail.html"><div>
            <img src="${item.img}">
            <div class="filter_result_img">
                <div class="result_txt">${item.colorNum}</div>
            </div>
            <p class="result_name">${item.name}</p>
            <p class="newPrice">￥${item.price}</p>
            <p class="oldPrice">￥${item.price}</p>
        </div></a>
        </li>`).appendTo($('.filter_result_con ul'))
        })
    }
})
    }
})

//点击图片设置cookie
console.log($('.filter_result_con ul'))
$('.filter_result_con ul').on('click','li',function(){
    var obj = {
        'img' : $(this).find('img').attr('src'),
        'name': $(this).find('.result_name').html(),
        'newPrice': $(this).find('.newPrice').html().slice(1),
        'oldPrice': $(this).find('.oldPrice').html().slice(1)
    }
    utils.setCookie('message',JSON.stringify(obj),{expires:7,path : '/'})
})
