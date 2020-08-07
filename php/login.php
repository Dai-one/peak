<?php
//设置编码
header("content-type:text/html;charset=utf8");
$responseDate = array("code" => 0,"message" => "");
//通过post将提交的数据取出来
$phonenum = $_POST['phonenum'];
$pwd = $_POST['pwd'];

//对后台接收到的数据，进行一个简单的判断
if(!$phonenum){
    $responseDate["code"] = 1;
    $responseDate["message"] = "手机号不能为空";
    //将数据按照统一的返回格式返回
    echo json_encode($responseDate);
    exit;
}

if(!$pwd){
    $responseDate["code"] = 2;
    $responseDate["message"] = "密码不能为空";
    //将数据按照统一的返回格式返回
    echo json_encode($responseDate);
    exit;
}


//连接数据库
$link = mysqli_connect('localhost','root','','Ming_db');
if(!$link){
    $responseDate["code"] = 3;
    $responseDate["message"] = "服务器繁忙";
    //将数据按照统一格式返回
    echo json_encode($responseDate);
    exit;
}
//设置编码集
mysqli_set_charset($link,'utf8');
//选择数据库
mysqli_select_db($link,"pike");
//密码加密
$str = md5(md5($pwd));
//准备sql语句进行登陆
$sql = "SELECT * FROM user WHERE phonenum='{$phonenum}'AND pwd='{$str}'";
//发送sql语句
$res = mysqli_query($link,$sql);
//取出一行数据
$row = mysqli_fetch_assoc($res);
if(!$row){
    //注册过
    $responseDate["code"] = 4;
    $responseDate["message"] = "用户名或密码错误";
    //将数据按照统一的返回格式返回
    echo json_encode($responseDate);
    exit;
}else{
    $responseDate["message"] = "登陆成功";
    echo json_encode($responseDate);
}
//关闭数据库
mysqli_close($link);
?>