
// 侧边导航
var navBar = document.querySelector('.right_nav_bar') //获取侧边导航条
var backTop = document.querySelector('.backTop') //获取top按钮
window.onscroll = function(){
    var scroll = document.body.scrollTop || document.documentElement.scrollTop //获取滚动距离
    if(scroll > 300){
        utils.move2(navBar, 'right', 0)
    }else{
        utils.move2(navBar, 'right', '-45px')
    }
}
//给top按钮绑定点击事件
backTop.onclick = function(){
    var scroll = document.body.scrollTop || document.documentElement.scrollTop //获取滚动距离
    var timer = setInterval(function(){
        if(scroll <= 0){
        clearInterval(timer)
        }
        scroll -= Math.ceil(scroll / 5) 
        document.documentElement.scrollTop = scroll || (document.body.scrollTop = scroll)
    },20)   
}

//head_login部分
var navigaLi = document.querySelector('.naviga_li') //获取网站导航li
var navigaUl = navigaLi.querySelector('ul') //获取网站导航li里的ul
var serviceLi = document.querySelector('.service_li') //获取联系客服li
var serviceUl = serviceLi.querySelector('ul') //获取联系客服li里的ul

//绑定鼠标移入事件
navigaLi.onmouseenter = function(){
    navigaUl.style.display = 'block'
    navigaLi.onmouseleave = function(){
        var timer = setTimeout(function(){
            navigaUl.style.display = 'none'
        },200)
        navigaUl.onmouseenter = function(){
            clearTimeout(timer)
            this.style.display = 'block'
        }
    }
}
//绑定鼠标移入事件
serviceLi.onmouseenter = function(){
    serviceUl.style.display = 'block'
    serviceLi.onmouseleave = function(){
        var timer = setTimeout(function(){
            serviceUl.style.display = 'none'
        },200)
        serviceUl.onmouseenter = function(){
            clearTimeout(timer)
            this.style.display = 'block'
        }
    }
}

//面向对象
class Headnav{
    constructor(){
        this.timer = null
        this.timer2 = null
        this.drop()
        this.getCookie()
        this.sginOut()
    }
    //获取cookie
    getCookie(){
        if(utils.getCookie('name')){
            $('.login_name a').html(utils.getCookie('name'))
            $('.dis_block').css('display','block')
        }   
    }
    //退出登陆
    sginOut(){
        $('.sgin_out').click(function(){
            $('.dis_block').css('display','none')
            $('.login_name a').html('请登录')
            utils.setCookie('name','',{expires: -1,path:'/'})
            location.reload()
        })
    }
    drop(){
        var str1 = `
        <div class="panel_con clearfix">
            <div class="allgoods">
                <h1>最新活动</h1>
                <ul>
                    <li><a href="">新品上市</a></li>
                    <li><a href="">热门商品</a></li>
                    <li><a href="">特惠商品</a></li>
                    <li><a href="">新闻活动</a></li>
                </ul>
            </div>
            <div class="allgoods">
                <h1>男鞋</h1>
                <ul>
                    <li><a href="">篮球鞋</a></li>
                    <li><a href="">跑步鞋</a></li>
                    <li><a href="">板鞋</a></li>
                    <li><a href="">休闲鞋</a></li>
                    <li><a href="">网球鞋</a></li>
                    <li><a href="">户外鞋</a></li>
                    <li><a href="">棉鞋</a></li>
                </ul>
            </div>
            <div class="allgoods">
                <h1>女鞋</h1>
                <ul>
                    <li><a href="">篮球鞋</a></li>
                    <li><a href="">跑步鞋</a></li>
                    <li><a href="">板鞋</a></li>
                    <li><a href="">休闲鞋</a></li>
                    <li><a href="">网球鞋</a></li>
                    <li><a href="">户外鞋</a></li>
                    <li><a href="">棉鞋</a></li>
                </ul>
            </div>
            <div class="allgoods">
                <h1>男装</h1>
                <ul>
                    <li><a href="">羽绒服</a></li>
                    <li><a href="">棉衣</a></li>
                    <li><a href="">篮球鞋</a></li>
                    <li><a href="">卫衣</a></li>
                    <li><a href="">风衣</a></li>
                    <li><a href="">运动长裤</a></li>
                    <li><a href="">运动夹克</a></li>
                    <li><a href="">长袖T恤</a></li>
                    <li><a href="">短袖T恤</a></li>
                    <li><a href="">单裤</a></li>
                    <li><a href="">单衣</a></li>
                    <li><a href="">运动短裤</a></li>
                </ul>
            </div>
            <div class="allgoods">
                <h1>女装</h1>
                <ul>
                    <li><a href="">羽绒服</a></li>
                    <li><a href="">棉衣</a></li>
                    <li><a href="">篮球鞋</a></li>
                    <li><a href="">卫衣</a></li>
                    <li><a href="">风衣</a></li>
                    <li><a href="">运动长裤</a></li>
                    <li><a href="">运动夹克</a></li>
                    <li><a href="">长袖T恤</a></li>
                    <li><a href="">短袖T恤</a></li>
                    <li><a href="">单裤</a></li>
                    <li><a href="">单衣</a></li>
                    <li><a href="">运动短裤</a></li>
                </ul>
            </div>
            <div class="allgoods">
                <h1>配件/装备</h1>
                <ul>
                    <li><a href="">运动袜</a></li>
                    <li><a href="">运动帽</a></li>
                    <li><a href="">篮球</a></li>
                    <li><a href="">其他</a></li>
                </ul>
                <h1>儿童</h1>
                <ul>
                    <li><a href="">童鞋</a></li>
                    <li><a href="">童装</a></li>
                </ul>
            </div>
        </div>`
        var str2 = `
        <div class="panel_con clearfix">
            <div class="allgoods">
                <h1>鞋类</h1>
                <ul>
                    <li><a href="">专业篮球鞋</a></li>
                    <li><a href="">明星篮球鞋</a></li>
                    <li><a href="">外场篮球鞋</a></li>
                </ul>
            </div>
            <div class="allgoods">
                <h1>服装</h1>
                <ul>
                    <li><a href="">篮球套服</a></li>
                    <li><a href="">上衣</a></li>
                    <li><a href="">裤子</a></li>
                </ul>
            </div>
            <div class="allgoods">
                <h1>科技</h1>
                <ul>
                    <li><a href="">三级缓震</a></li>
                    <li><a href="">梯度双能</a></li>
                    <li><a href="">足弓TPU</a></li>
                    <li><a href="">易弯折系统</a></li>
                    <li><a href="">轻质橡胶</a></li>
                </ul>
            </div>
            <div class="allgoods allgoods_r">
                <h1>热门</h1>
                <ul>
                    <li><a href=""><span>帕克七代</span><div><img src="./img/idneximg/ia_10009.jpg"></div></a></li>
                    <li><a href=""><span>街霸篮球鞋</span><div><img src="./img/idneximg/ia_10010.jpg"></div></a></li>
                </ul>
            </div>`
        var str3 = `
        <div class="panel_con clearfix">
            <div class="allgoods">
                <h1>男子跑步</h1>
                <ul>
                    <li><a href="">跑步鞋</a></li>
                    <li><a href="">运动上衣</a></li>
                    <li><a href="">运动裤</a></li>
                </ul>
            </div>
            <div class="allgoods">
                <h1>女子跑步</h1>
                <ul>
                    <li><a href="">跑步鞋</a></li>
                    <li><a href="">运动上衣</a></li>
                    <li><a href="">运动裤</a></li>
                </ul>
            </div>
            <div class="allgoods">
                <h1>明星系列</h1>
                <ul>
                    <li><a href="">悦跑系列</a></li>
                    <li><a href="">剑雨系列</a></li>
                </ul>
            </div>
            <div class="allgoods allgoods_r">
                <h1>热门</h1>
                <ul>
                    <li><a href=""><span>悦跑时尚</span><div><img src="./img/idneximg/ia_10011.jpg"></div></a></li>
                    <li><a href=""><span>律动4代</span><div><img src="./img/idneximg/ia_10012.jpg"></div></a></li>
                </ul>
            </div>`
            
        var arr = []
        var oDiv1 = document.createElement('div')
        oDiv1.innerHTML = str1
        oDiv1.className = 'panel'
        
        

        var oDiv2 = document.createElement('div')
        oDiv2.innerHTML = str2
        oDiv2.className = 'panel'
        var oDiv3 = document.createElement('div')
        oDiv3.innerHTML = str3
        oDiv3.className = 'panel'
        arr.push(oDiv1)
        arr.push(oDiv2)
        arr.push(oDiv3)
        var index
        $('.dropdown').on('mouseenter',function(){
            index = $(this).index()
            $(this).append(arr[index])
            arr[index].style.display = 'block'
        }).on('mouseleave',function(){
            arr[index].style.display = 'none'
        })
            
    }
}

new Headnav()

