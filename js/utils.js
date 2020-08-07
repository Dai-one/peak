var utils = {
  /**
   * 获取元素最终样式值
   * @param  obj  <DOMObject> 要获取属性的元素对象
   * @param  attr <string>    样式名称
   * @return      <string>    获取到的样式值
   */
  getStyle: function (obj, attr) {
    if (obj.currentStyle) {
      // 判断Obj有currentStyle这个属性，说明使用的是IE浏览器
      return obj.currentStyle[attr]
    } else {
      // obj没有currentStyle这个属性，说明用的不是IE
      return getComputedStyle(obj, false)[attr]
    }
  },
  /**
   * 添加事件监听
   * @param ele         <DOMObject> 添加事件的DOM元素
   * @param type        <string>    事件类型（不带on）
   * @param fn          <function>  事件处理函数
   * @param [isCapture] <boolean>   可选参数，是否捕获，true代表捕获，false代表冒泡，默认为false
   */
  on: function (ele, type, fn, isCapture) {
    // 如果参数没有传，默认值为false
    if (isCapture === undefined) isCapture = false
    if (ele.attachEvent) {
      // IE
      ele.attachEvent('on' + type, fn)
    } else {
      ele.addEventListener(type, fn, isCapture)
    }
  },
  /**
   * 移出事件监听
   * @param ele         <DOMObject> 添加事件的DOM元素
   * @param type        <string>    事件类型（不带on）
   * @param fn          <function>  事件处理函数
   * @param [isCapture] <boolean>   可选参数，是否捕获，true代表捕获，false代表冒泡，默认为false
   */
  off: function (ele, type, fn, isCapture) {
    // 如果参数没有传，默认值为false
    if (isCapture === undefined) isCapture = false
    if (ele.detachEvent) {
      ele.detachEvent('on' + type, fn)
    } else {
      ele.removeEventListener(type, fn, isCapture)
    }
  },
  /**
   * 封装匀速运动
   * @param ele       <DOMObject>  要运动的元素对象
   * @param attr      <string>     运动的属性名
   * @param end       <number>     运动的终点，单位px
   * @param duration  <number>     运动总时长，单位ms
   * @param fn        <function>   回调函数，在运动结束以后执行的函数
   */
  move: function (ele, attr, end, duration, fn) {
    // 获取起点
    var start = parseInt(this.getStyle(ele, attr))
    // 算总距离
    var distance = end - start
    // var speed = distance / duration // 速度单位是 px/ms
    // 先计算从起点到终点的总步数
    var steps = Math.floor(duration / 30)
    // 计算速度：每一步要走的像素值 px/步  px/30ms
    var speed = distance / steps

    var n = 0 // 记录当前是第几步
    // 在开启一个新的定时器之前先把上一次的清除掉
    clearInterval(ele.timer)
    ele.timer = setInterval(function () {
      n++
      ele.style[attr] = start + n * speed + 'px'
      // 用步数判断终点
      if (n === steps) {
        clearInterval(ele.timer)
        // 固定在终点位置
        ele.style[attr] = end + 'px'
        // 运动结束以后调用传过来的这个函数

        // 逻辑短路，这里如果fn无效，会隐式转换为false，逻辑短路，不会执行fn()
        // 一般回调函数都会这么写
        fn && fn()
      }
    }, 30)
  },
  /**
   * 封装一个缓冲运动，咱们的缓冲算法里速度跟时间没有关系的，所以这里不需要传时间，时间就是根据距离来自动得到的
   * @param ele   <DOMObject>  要运动的元素对象
   * @param attr  <string>     运动的属性名
   * @param end   <number>     运动的终点，单位px
   * @param fn    <function>   回调函数，在运动结束以后执行的函数 
   */
  move1: function (ele, attr, end, fn) {
    // 开启定时器之前把旧的先清除掉
    clearInterval(ele.timer)
    var start = parseInt(this.getStyle(ele, attr))
    ele.timer = setInterval(function () {
      // 计算剩下距离
      var distance = parseInt(end) - start
      // 计算当前这一步的速度，是剩下距离的十分之一
      // speed就是当前这一步要往前走的距离
      // 如果运动是负方向，distance小于0，speed也小于0，剩下最后几步负零点几的时候如果向上取整直接就得到0了，就不能运动到终点了
      var speed = distance > 0 ? Math.ceil(distance / 10) : Math.floor(distance / 10)
      // start得往前加上这一步要走的距离
      start += speed
      // 把更新之后的start赋值给属性
      ele.style[attr] = start + 'px'
      // 判断终点
      // 由于缓冲运动最后是一像素一像素运动的，所以他一定能刚好达到终点
      if (start === end) {
        clearInterval(ele.timer)
        fn && fn()
      }
    }, 30)
  },

  move2: function (ele, attr, end, fn) {
    // 开启定时器之前把旧的先清除掉
    clearInterval(ele.timer)
    var start = parseInt(this.getStyle(ele, attr))
    ele.timer = setInterval(function () {
      // 计算剩下距离
      var distance = parseInt(end) - start
      // 计算当前这一步的速度，是剩下距离的十分之一
      // speed就是当前这一步要往前走的距离
      // 如果运动是负方向，distance小于0，speed也小于0，剩下最后几步负零点几的时候如果向上取整直接就得到0了，就不能运动到终点了
      var speed = distance > 0 ? Math.ceil(distance / 10) : Math.floor(distance / 10)
      // start得往前加上这一步要走的距离
      start += speed
      // 把更新之后的start赋值给属性
      ele.style[attr] = start + 'px'
      // 判断终点
      // 由于缓冲运动最后是一像素一像素运动的，所以他一定能刚好达到终点
      if (start === end) {
        clearInterval(ele.timer)
        fn && fn()
      }
    }, 10)
  },

  /** 取cookie
   * @param key <string> 要取得cookie得名称
   * @return <string>    这条cookie的值（如果这条cookie不存在，则返回undefined）
   */
  getCookie (key) {
    // 取到所有cookie
    var str = document.cookie
    // 先按照; 来切开每一条cookie
    var arr = str.split('; ')
    // arr的每一个item就是一条cookie，再把item按照=来切割，把属性名和属性值分开
    var obj = {}
    arr.forEach(item => {
      var subArr = item.split('=')
      // subArr是切开之后的数组，这个数组的第0个元素是属性名，第一个元素是属性值
      // subArr[0] 这个整体作为obj的属性名，这里不能用. 只能用中括号
      // subArr[1]是编码之后的属性值，解码之后赋值
      obj[subArr[0]] = decodeURIComponent(subArr[1])
    })
    return obj[key]
  },

  /** 存cookie
   * @param key       <string> cookie的名称
   * @param value     <string> cookie的值
   * @param [options] <object> path和expires参数，例如：{ expires: 7, path: '/' } 指的是7天过期存根目录
   */
  setCookie (key, value, options) {
    // 给value编码再存
    var str = `${key}=${encodeURIComponent(value)}`
    if (options) {
      // 先判断options是否传递了
      if (options.expires) {
        // 设置过期时间
        var date = new Date()
        date.setDate(date.getDate() + options.expires)
        str += `;expires=${date.toUTCString()}`
      }
      if (options.path) {
        // 设置路径
        str += `;path=${options.path}`
      }
    }
    // 把拼接好的字符串存cookie
    document.cookie = str
  },

  /** ajax get请求
   * @param url      <string>   请求的路径
   * @param query    <object>   请求要携带的参数
   * @param fn       <function> 请求成功以后的回调函数
   * @param [isJson] <boolean>  请求返回的数据是否是json格式，默认为true
   */
  get (url, query, fn, isJson = true) {
    // isJson = true ES6新语法，参数默认值，如果参数不传，参数默认值就是true
    // 如果有参数，先再url后面把参数拼接上
    if (query) {
      url += '?'
      // 遍历query，把每一个属性都拼接再url后面
      for (var key in query) {
        url += `${key}=${query[key]}&`
      }
      // 拼接完成以后多出一个&
      url = url.slice(0, -1) // 从0开始截取到倒数第一个结束，只保留了除最后一个&以外的字符串
    }

    var xhr = new XMLHttpRequest()
    xhr.open('get', url)
    xhr.send()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // 请求成功
          // 根据isJson来决定是否转换
          var data = isJson ? JSON.parse(xhr.responseText) : xhr.responseText
          // 调用fn的时候把后端返回的数据作为参数传进去
          fn && fn(data)
        } else {
          alert('请求失败，状态码为：' + xhr.status)
        }
      }
    }
  },

  /** ajax post请求
   * @param url      <string>   请求的路径
   * @param query    <object>   请求要携带的参数
   * @param fn       <function> 请求成功以后的回调函数
   * @param [isJson] <boolean>  请求返回的数据是否是json格式，默认为true
   */
  post (url, query, fn, isJson = true) {
    var str = ''
    if (query) {
      for (var key in query) {
        str += `${key}=${query[key]}&`
      }
      str = str.slice(0, -1)
    }

    var xhr = new XMLHttpRequest()
    xhr.open('post', url)
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    xhr.send(str)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = isJson ? JSON.parse(xhr.responseText) : xhr.responseText
          fn && fn(data)
        }
      }
    }
  },

  /** 发送jsonp请求
   * 
   * @param url     <string>  接口的路径
   * @param cbName  <string>  回调函数名
   * @param [query] <object>  其他的一些参数
   */
  jsonp (url, cbName, query) {
    // 创建script标签
    url += `?cb=${cbName}`
    if (query) {
      for (var key in query) {
        url += `&${key}=${query[key]}`
      }
    }
    var script = document.createElement('script')
    script.src = url
    document.body.appendChild(script)
    // 一旦script存在，请求就发出去了，script就没用了，可以直接删掉
    document.body.removeChild(script) // 过河拆桥
  },

  /** 基于promise的ajax get请求
   * @param url      <string>   请求的路径
   * @param query    <object>   请求要携带的参数
   * @param [isJson] <boolean>  请求返回的数据是否是json格式，默认为true
   * 
   */
  fetch (url, query, isJson = true) {
    if (query) {
      url += '?'
      // 遍历query，把每一个属性都拼接再url后面
      for (var key in query) {
        url += `${key}=${query[key]}&`
      }
      // 拼接完成以后多出一个&
      url = url.slice(0, -1) // 从0开始截取到倒数第一个结束，只保留了除最后一个&以外的字符串
    }
    // 在这里需要把promise return出去，这样将来调用这个方法才能.then
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest()
      xhr.open('get', url)
      xhr.send()
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(isJson ? JSON.parse(xhr.responseText) : xhr.responseText)
          } else {
            reject()
          }
        }
      }
    })
  }
}
