function Pagination(ele,options){
    this.ele=ele
    //options：代表所传递的参数，如果没有，那么就设置为空对象
    this.options=options || {} 
    //创建回调函数
    this.options.change=options.change || function(){}
    //创建默认参数
    this.default={
        //代表分页信息
        pageInfo:{
            pagenum:1, //当前显示页
            pagesize:10, //每页显示多少条
            total:1000, //总条数
            totalpage:100 //总页数
        },
        textInfo:{
            first:'first1', //首页
            prev:'prev1', //上一页
            list:'',  //页码
            next:'next1', //下一页
            last:'last1' //尾页
        }
    }
    this.list=null //存放页码的实例属性
    //初始化启动函数
    this.init()
}
//创建初始化方法
Pagination.prototype.init=function(){
    //把传入进来的参数拿来替换默认参数
    this.defaultSwitch()
    //给大盒子添加信息
    this.addInfo()
    //动起来
    this.move()
}
//替换默认参数
Pagination.prototype.defaultSwitch=function(){
    //使用所传递的参数去替换默认参数
    //先替换pageInfo
    for(let attr in this.options.pageInfo){
        //默认参数指定位置           所传参数指定属性对应的值
        this.default.pageInfo[attr]=this.options.pageInfo[attr]
    }
    //替换textInfo
    for(let attr in this.options.textInfo){
        //默认参数指定位置           所传参数指定属性对应的值
        this.default.textInfo[attr]=this.options.textInfo[attr]
    }
}

//添加信息
Pagination.prototype.addInfo=function(){
    //当发生改变时，先清空前面的内容
    this.ele.innerHTML=''
    //获取默认参数中的文本信息
    for(let attr in this.default.textInfo){
        //创建存放文本信息的标签
        let div=document.createElement('div')
        //给当前div对象添加class属性，值为i
        div.className=attr
        //判断该属性是否为list
        if(attr=='list'){
             this.list=div
             //给当前list中的div对象设置样式
             setCss(div,{
                display: 'flex',
                justifyContent:'center',
             })   
        }else{
            //给当前添加的div对象设置css样式
            setCss(div,{
                height:'25px',
                lineHeight:'25px',
                margin:'0 5px',
                padding:'0 5px',
                cursor:'Pointer',
            })
        }
         //给当前创建的div对象添加文本内容
         div.innerHTML=this.default.textInfo[attr]
         //把当前新建的对象追加到大盒子中
         this.ele.appendChild(div)    
    }
    //给this.list对象添加页码
    this.addP()
    //禁用方法
    this.isDis()
    //添加输入框
    this.addBtn()
    //调用回调函数,传递参数
    this.options.change(this.default.pageInfo.pagenum)
}

Pagination.prototype.addBtn=function(){
    //创建输入框对象
    let inp=document.createElement('input')
    //给输入框对象设置属性
    inp.type='number'
    inp.min=1
    inp.max=this.default.pageInfo.totalpage
    //添加文本内容
    inp.value=this.default.pageInfo.pagenum
    //给输入框设置样式
    setCss(inp,{
        outline:'none',
        width:'40px',
        height:'25px'
    })
    //把输入框追加到大盒子中
    this.ele.appendChild(inp)

    //创建按钮对象
    var btn=document.createElement('button')
    btn.innerHTML='go'
    
    //设置按钮样式
    setCss(btn,{
        width:'25px',
        height:'25px',
        marginLeft:'5px',
        backgroundColor:'#000',
        color:'#fff',
        border:'none',
        textTransform : 'uppercase',
        cursor: 'pointer'
    })
    //把按钮追加到大盒子中
    this.ele.appendChild(btn)
    //创建显示多少页
    // var $div1 = $('<div></div>')
    // $div1.html(`共有${this.default.pageInfo.totlpage}页`)
    // $div1.prependTo($this.ele)
}
//禁用
Pagination.prototype.isDis=function(){
    //获取大盒子对象中的所有子元素节点
    let divs=this.ele.children
    //判断是否为第一页
    if(this.default.pageInfo.pagenum==1){
        divs[0].style.backgroundColor='#ccc'
        divs[1].style.backgroundColor='#ccc'
    }
    //判断是否为最后一页
    if(this.default.pageInfo.pagenum==this.default.pageInfo.totalpage){
        divs[3].style.backgroundColor='#ccc'
        divs[4].style.backgroundColor='#ccc'
    }
}
//添加页码
Pagination.prototype.addP=function(){
    //获取默认参数中的总页数
    let totalpage=this.default.pageInfo.totalpage
    //获取当前显示页的页码
    let pagenum=this.default.pageInfo.pagenum
    //判断总页数是否大于9
    if(totalpage<=9){
        //根据总页数来进行遍历
        for(let i=1;i<=totalpage;i++){
            //创建存放页码的小盒子
            let p =this.createP(i) 
            this.list.appendChild(p)   
        }
    }else{
        //判断当前页页码是否小于5
        if(pagenum<5){
            //循环添加p对象
            for(let i=1;i<=5;i++){
                //创建存放页码的小盒子
                let p =this.createP(i) 
                this.list.appendChild(p) 
            }
            //创建span标签对象
            let span=document.createElement('span')
            span.innerHTML='...'
            span.style.height = '25px'
            span.style.lineHeight = '25px'
            this.list.appendChild(span)
            //循环添加p对象
            for(let i=totalpage-1;i<=totalpage;i++){
                //创建存放页码的小盒子
                let p =this.createP(i) 
                this.list.appendChild(p) 
            }
        }else if(pagenum==5){
            //循环添加p对象
            for(let i=1;i<=7;i++){
                //创建存放页码的小盒子
                let p =this.createP(i) 
                this.list.appendChild(p) 
            }
            //创建span标签对象
            let span=document.createElement('span')
            span.innerHTML='...'
            this.list.appendChild(span)
            //循环添加p对象
            for(let i=totalpage-1;i<=totalpage;i++){
                //创建存放页码的小盒子
                let p =this.createP(i) 
                this.list.appendChild(p) 
            }
        }else if(pagenum>5 && pagenum<totalpage-4){
            //添加前两个页码
            for(let i=1;i<=2;i++){
                 //创建存放页码的小盒子
                 let p =this.createP(i) 
                 this.list.appendChild(p) 
            }
            let span1=document.createElement('span')
            span1.innerHTML="..."
            //把span标签追加到div中
            this.list.appendChild(span1)
            //添加五个页码
            for(let i=pagenum-2;i<=pagenum+2;i++){
                //创建存放页码的小盒子
                let p =this.createP(i) 
                this.list.appendChild(p)
            }
            let span2=document.createElement('span')
            span2.innerHTML="..."
            //把span标签追加到div中
            this.list.appendChild(span2)
             //添加五个页码
             for(let i=totalpage-1;i<=totalpage;i++){
                //创建存放页码的小盒子
                let p =this.createP(i) 
                this.list.appendChild(p)
            }
        }else if(pagenum==totalpage-4){
            //添加前两个页码
            for(let i=1;i<=2;i++){
                //创建存放页码的小盒子
                let p =this.createP(i) 
                this.list.appendChild(p) 
            }
            let span1=document.createElement('span')
            span1.innerHTML="..."
            //把span标签追加到div中
            this.list.appendChild(span1)
            //添加五个页码
            for(let i=totalpage-6;i<=totalpage;i++){
                //创建存放页码的小盒子
                let p =this.createP(i) 
                this.list.appendChild(p)
            }
        }else if(pagenum>totalpage-4){
            //添加前两个页码
            for(let i=1;i<=2;i++){
                //创建存放页码的小盒子
                let p =this.createP(i) 
                this.list.appendChild(p) 
            }
            let span1=document.createElement('span')
            span1.innerHTML="..."
            //把span标签追加到div中
            this.list.appendChild(span1)
            //添加五个页码
            for(let i=totalpage-4;i<=totalpage;i++){
                //创建存放页码的小盒子
                let p =this.createP(i) 
                this.list.appendChild(p)
            }
        }
    }
}
//动起来函数
Pagination.prototype.move=function(){
    
    //使用事件委托，把所有的点击事件都委托给大盒子
    this.ele.onclick=(e)=>{
        e = e || window.event
        //获取点击对象
        var target=e.target || e.srcElement
        //是否点击的是下一页            当前页和最后一页不相等的时候
        if(target.className=='next' && this.default.pageInfo.pagenum!=this.default.pageInfo.totalpage){
            //给当前页的页码+1
            this.default.pageInfo.pagenum++
            //当页码发生改变时，需要调用该函数
            this.addInfo()
        }
        //判断点击的是否为尾页
        if(target.className=="last" && this.default.pageInfo.pagenum!=this.default.pageInfo.totalpage ){
            //直接把总页数赋值给当前页
            this.default.pageInfo.pagenum=this.default.pageInfo.totalpage
            this.addInfo()
        }
        //点击的是否为上一页
        if(target.className=='prev' && this.default.pageInfo.pagenum!=1){
            //给当前页的页码-1
            this.default.pageInfo.pagenum--
            //当页码发生改变时，需要调用该函数
            this.addInfo()
        }
        //点击是否为首页
        if(target.className=='first' && this.default.pageInfo.pagenum!=1){
            //给当前页的页码-1
            this.default.pageInfo.pagenum=1
            //当页码发生改变时，需要调用该函数
            this.addInfo()
        }
        //判断点击的是否为页码
        if(target.nodeName==='P'){
            //获取当前点击的页码对象的文本,并赋值给当前页
            this.default.pageInfo.pagenum=target.innerHTML-0
            this.addInfo()
        }
        //判断点击的是否为button按钮
        if(target.nodeName=="BUTTON" && target.previousElementSibling.value!=this.default.pageInfo.pagenum){
            //把输入框中的页码赋值给当前页
            this.default.pageInfo.pagenum=target.previousElementSibling.value-0
            this.addInfo()
        }
    }
}

//创建p对象
Pagination.prototype.createP=function(m){
    //创建p标签
    var p=document.createElement('p')
    //给p标签添加页码
    p.innerHTML=m
    //设置p标签的样式
    setCss(p,{
         border:'1px solid #333',
         height:'25px',
         lineHeight:'25px',
         textAlign:'center',
         margin:'0 5px',
         padding:'0 5px',
         cursor: 'pointer'
    })
    //判断是否为当前页
    if(m==this.default.pageInfo.pagenum){
        //设置当前页码的背景色
        setCss(p,{
            backgroundColor:'#000',
            color:'#fff'
        })
    }
    return p
}
//设置当前对象的css样式
function setCss(ele,options){
    //遍历对象中的键值对
    for(let attr in options){
        //一个一个的把css样式添加给当前对象
        ele.style[attr]=options[attr]
    }
}