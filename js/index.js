//面向对象
class Pagehome{
    constructor(){
        this.nextBtn = document.querySelector('.right') //获取前进按钮
        this.prevBtn = document.querySelector('.left') //获取后退按钮
        this.imgs = document.querySelectorAll('.banner_inner img') //获取图片
        this.index = 0
        this.lastIndex = 0
        this.timer = null
        this.arr = []
        this.addLi()
        this.goNext()
        this.goPrev()
        this.outoPlay()
        this.btnClick()
        this.json()
        this.num = 0
        this.cookieValue()
    }

    // 添加li按钮
    addLi(){
        var liBtn = document.querySelector('.li_btn_wrap')
        for(var i = 0; i < this.imgs.length; i++){
            var li = document.createElement('li')
            if(i == 0){
                li.className = 'active'
            }
            this.arr.push(li)
            liBtn.appendChild(li)  
        }  
    }

    // 下一张
    goNext(){
        this.nextBtn.onclick = () =>{
            this.go()
        }
    }

    // 上一张
    goPrev(){
        this.prevBtn.onclick = () =>{
            this.lastIndex = this.index
            this.index--
            if(this.index < 0){
                this.index = this.imgs.length - 1
            }
            this.imgs[this.index].className = 'ac'
            this.imgs[this.lastIndex].className = ''
            this.arr[this.index].className = 'active'
            this.arr[this.lastIndex].className = ''
        }
    }
    go(){
            this.lastIndex = this.index
            this.index++
            if(this.index > this.imgs.length - 1){
                this.index = 0
            }
            this.imgs[this.index].className = 'ac'
            this.imgs[this.lastIndex].className = ''
            this.arr[this.index].className = 'active'
            this.arr[this.lastIndex].className = ''
    }

    //自动轮播
    outoPlay(){
        
        this.timer = setInterval(() => {
            this.go()
        }, 3000)
        var bannerBox = document.querySelector('.banner_inner')
        bannerBox.onmouseenter = () =>{
            clearInterval(this.timer)
        }
        bannerBox.onmouseleave = () =>{
            this.timer = setInterval(() => {
                this.go()
            }, 3000)
        }
    }
    //小Li点击
    btnClick(){
        for(let i in this.arr){
            this.arr[i].onclick = () =>{
                clearInterval(this.timer)
                this.lastIndex = this.index
                this.index = i
                this.imgs[this.lastIndex].className = ''
                this.imgs[this.index].className = 'ac'
                this.arr[this.lastIndex].className = ''
                this.arr[this.index].className = 'active' 
                this.timer = setInterval(() => {
                    this.go()
                }, 3000) 
            }
            
        }
        
    }
    
    // 创建布局
    json(){
            $.ajax({
                type:"get",
                url:"./json/index.json",
                dataType:"json",
                success:(res) =>{
                    $(`<div class="section_banner">    
                    <div class="section_tit">
                        <p class="section_l"></p>
                        <div class="section_tit_top">
                            <div class="section_t1">篮球</div>
                            <div class="section_t2">basketball</div>
                        </div>
                        <p class="section_r"></p>
                    </div>
                    <div class="section_ads">
                        <div class="ad_present ad_present_l">
                            <div class="ad_txt">
                                <h1>叫板地心引力</h1>
                                <p>我的主场我捍卫</p>
                                <p>尽管开打，突破到底</p>
                                <ul class="clearfix">
                                    <li><a href="#">帕克系列</a></li>
                                    <li><a href="#">路威系列</a></li>
                                    <li><a href="#">外场系列</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="ads_img ad_img_r">
                            <img src="./img/idneximg/ia_10122.png">
                        </div>
                    </div>
                </div>
                <!-- 商品列表 -->
                <div class="goods_box clearfix">
                    <div class="goods_tab">
                        <ul>
                            <li><div class="goods_tab_bg active_bg"></div><span>热销</span></li>
                            <li><div class="goods_tab_bg"></div><span>篮球鞋</span></li>
                            <li><div class="goods_tab_bg"></div><span>篮球服</span></li>
                        </ul>
                    </div>
                    <div class="goods_list">
                    <ul></ul>
    
                    </div>
                </div>
                <div class="section_banner">    
                    <div class="section_tit">
                        <p class="section_l"></p>
                        <div class="section_tit_top">
                            <div class="section_t1">跑步</div>
                            <div class="section_t2">running</div>
                        </div>
                        <p class="section_r"></p>
                    </div>
                    <div class="section_ads">
                        <div class="ad_present ad_present_r" style="background-color: #3f4857;">
                            <div class="ad_txt">
                                <h1>对征途心存敬畏</h1>
                                <p>向往终点，也尊敬通往终点的征途</p>
                                <p>千百次的训练背后，有我撑你</p>
                                <ul class="clearfix">
                                    <li><a href="#">飞织系列</a></li>
                                    <li><a href="#">减震系列</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="ads_img ad_img_l">
                            <img src="./img/idneximg/ia_10035.png">
                        </div>
                    </div>
                </div>
                <!-- 商品列表 -->
                <div class="goods_box clearfix">
                    <div class="goods_tab">
                        <ul>
                            <li><div class="goods_tab_bg active_bg"></div><span>热销</span></li>
                            <li><div class="goods_tab_bg"></div><span>跑步鞋</span></li>
                            <li><div class="goods_tab_bg"></div><span>运动服</span></li>
                        </ul>
                    </div>
                    <div class="goods_list">
                    <ul></ul>
    
    
                    </div>
                </div>
                <div class="section_banner">    
                    <div class="section_tit">
                        <p class="section_l"></p>
                        <div class="section_tit_top">
                            <div class="section_t1">终训</div>
                            <div class="section_t2">training</div>
                        </div>
                        <p class="section_r"></p>
                    </div>
                    <div class="section_ads">
                        <div class="ad_present ad_present_l" style="background-color: #6b82ab;">
                            <div class="ad_txt">
                                <h1>极致清爽</h1>
                                <p>用一套好的装备武装自己</p>
                                <p>练一身棒的身材羡煞旁人</p>
                                <ul class="clearfix">
                                    <li><a href="#">男子系列</a></li>
                                    <li><a href="#">女子系列</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="ads_img ad_img_r">
                            <img src="./img/idneximg/ia_10057.png">
                        </div>
                    </div>
                </div>
                <!-- 商品列表 -->
                <div class="goods_box clearfix">
                    <div class="goods_tab">
                        <ul>
                            <li><div class="goods_tab_bg active_bg"></div><span>热销</span></li>
                            <li><div class="goods_tab_bg"></div><span>新品</span></li>
    
                        </ul>
                    </div>
                    <div class="goods_list">
                    <ul></ul>
    
    
                    </div>
                </div>
                <div class="section_banner">    
                    <div class="section_tit">
                        <p class="section_l"></p>
                        <div class="section_tit_top">
                            <div class="section_t1">运动生活</div>
                            <div class="section_t2">sports life</div>
                        </div>
                        <p class="section_r"></p>
                    </div>
                    <div class="section_ads">
                        <div class="ad_present ad_present_r" style="background-color: #a4a6b3">
                            <div class="ad_txt">
                                <h1>锻炼专造</h1>
                                <p>简约而不简单的穿搭</p>
                                <p>演绎运动潮流生活</p>
                                <ul class="clearfix">
                                    <li><a href="#">小白鞋</a></li>
                                    <li><a href="#">卫衣系列</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="ads_img ad_img_l">
                            <img src="./img/idneximg/ia_10072.png">
                        </div>
                    </div>
                </div>
                <!-- 商品列表 -->
                <div class="goods_box clearfix">
                    <div class="goods_tab">
                        <ul>
                            <li><div class="goods_tab_bg active_bg"></div><span>小白鞋</span></li>
                            <li><div class="goods_tab_bg"></div><span>卫衣系列</span></li>
                        </ul>
                    </div>
                    <div class="goods_list">
                        <ul></ul>

                    </div>
                </div>`).insertAfter($('.banner'))
                var n = 0
                for(var i = 0; i < 40; i++){
                    if((i+1)%10 == 0){
                        $(`<li class="li_more"><a href="${res[i].links}"><div class="li_more_txt"><p style="font-size: 24px;font-weight: bold;">查看</p><p class="act_txt">热销></p></div></a></li>`).appendTo($('.goods_list ul')[n])
                        n++
                        continue;
                    }
                    $(`<li><a href="./html/detail.html"><img src="${res[i].img}" alt="" ><p class="goods_tit">${res[i].name}</p><div class="price_detail">
                        <span class="new_price"><i>￥</i><span>${res[i].newPrice}</span></span>
                        <span class="del_price">
                            <i>￥</i>
                            <span>${res[i].oldPrice}</span>
                        </span>
                        </div></li>`).appendTo($('.goods_list ul')[n])
                }
            }
        })
    }

    //存商品cookie
    cookieValue(){
        $('nav').on('click','.goods_list li',function(){
            var obj = {
                'img' : $(this).find('img').attr('src'),
                'name': $(this).find('.goods_tit').html(),
                'newPrice': $(this).find('.new_price span').html(),
                'oldPrice': $(this).find('.del_price span').html()
            }
            utils.setCookie('message',JSON.stringify(obj),{expires:7,path : '/'})
        })
    }
    
}

new Pagehome()


// for(var j = 0; j < 10; j++){
//     var li = document.createElement('li')
//     li.innerHTML = `<a href="./html/detail.html?goodsId=${data2[i*j].title.slice(-7,-1)}"><img src="${data2[this.num].img}" alt="" dataid = ${this.num}><p class="goods_tit">${data2[this.num].title}</p><div class="price_detail">
//     <span class="new_price"><i>￥</i><span>${data2[this.num].newPrice}</span></span>
//     <span class="del_price">
//         <i>￥</i>
//         <span>${data2[this.num].oldPrice}</span>
//     </span>
//     </div></a>`
   
//     if(j==9){
//         li.className = 'li_more'
//         li.innerHTML=`
//         <a href="${data2[this.num].links}"><div class="li_more_txt"><p style="font-size: 24px;font-weight: bold;">查看</p><p class="act_txt">热销></p></div></a>
//         `
//     }






























// for(var i = 0; i < data2.length; i++){
//     if(i == 9){
//         $('<li class="li_more"></li>').appendTo($('.list_box_one')).html(`<a href="${data2[i].links}"><div class="li_more_txt"><p style="font-size: 24px;font-weight: bold;">查看</p><p class="act_txt">热销></p></div></a>`)  
//     }
//     if(i == 19){
//         $('<li class="li_more"></li>').appendTo($('.list_box_two')).html(`<a href="${data2[i].links}"><div class="li_more_txt"><p style="font-size: 24px;font-weight: bold;">查看</p><p class="act_txt">热销></p></div></a>`)  
//     }
//     if(i == 29){
//         $('<li class="li_more"></li>').appendTo($('.list_box_three')).html(`<a href="${data2[i].links}"><div class="li_more_txt"><p style="font-size: 24px;font-weight: bold;">查看</p><p class="act_txt">热销></p></div></a>`)  
//     }
//     if(i == 39){
//         $('<li class="li_more"></li>').appendTo($('.list_box_four')).html(`<a href="${data2[i].links}"><div class="li_more_txt"><p style="font-size: 24px;font-weight: bold;">查看</p><p class="act_txt">热销></p></div></a>`)  
//     }
//     if(i < 9){
//         $('<li></li>').appendTo($('.list_box_one')).html(`<a href=""><img src="${data2[i].img}" alt=""><p class="goods_tit">${data2[i].title}</p><div class="price_detail">
//         <span class="new_price"><i>￥</i><span>${data2[i].newPrice}</span></span>
//         <span class="del_price">
//             <i>￥</i>
//             <span>${data2[i].oldPrice}</span>
//         </span>
//     </div></a>`)
//     }else if(i<19){
//         $('<li></li>').appendTo($('.list_box_two')).html(`<a href=""><img src="${data2[i].img}" alt=""><p class="goods_tit">${data2[i].title}</p><div class="price_detail">
//         <span class="new_price"><i>￥</i><span>${data2[i].newPrice}</span></span>
//         <span class="del_price">
//             <i>￥</i>
//             <span>${data2[i].oldPrice}</span>
//         </span>
//     </div></a>`)
//     }else if(i<28){
//         $('<li></li>').appendTo($('.list_box_three')).html(`<a href=""><img src="${data2[i].img}" alt=""><p class="goods_tit">${data2[i].title}</p><div class="price_detail">
//             <span class="new_price"><i>￥</i><span>${data2[i].newPrice}</span></span>
//             <span class="del_price">
//                 <i>￥</i>
//                 <span>${data2[i].oldPrice}</span>
//             </span>
//         </div></a>`)
//     }else if(i < 36){
//         $('<li></li>').appendTo($('.list_box_four')).html(`<a href=""><img src="${data2[i].img}" alt=""><p class="goods_tit">${data2[i].title}</p><div class="price_detail">
//         <span class="new_price"><i>￥</i><span>${data2[i].newPrice}</span></span>
//         <span class="del_price">
//             <i>￥</i>
//             <span>${data2[i].oldPrice}</span>
//         </span>
//     </div></a>`)
//     }
// }