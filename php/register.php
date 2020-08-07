<?php
//设置编码
header("content-type:text/html;charset=utf8");
//定义一个统一返回格式
$responseDate = array("code" => 0,"message" => "");
//通过post将提交的数据取出来
$phonenum = $_POST['phonenum'];
$pwd = $_POST['pwd'];
$repwd = $_POST['repwd'];
$createtime = $_POST['createtime'];
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

if($pwd != $repwd){
    $responseDate["code"] = 3;
    $responseDate["message"] = "两次密码输入不一致";
    //将数据按照统一的返回格式返回
    echo json_encode($responseDate);
    exit;
}


//连接数据库，判断用户名是否已经注册过了
//连接数据库
$link = mysqli_connect('localhost','root','','pike');
if(!$link){
    $responseDate["code"] = 4;
    $responseDate["message"] = "服务器繁忙";
    //将数据按照统一格式返回
    echo json_encode($responseDate);
    exit;
}
//设置编码集
mysqli_set_charset($link,'utf8');
$sql = "SELECT * FROM user WHERE phonenum='{$phonenum}'";

//发送sql语句
$res = mysqli_query($link,$sql);
// var_dump($res);
//取出一行数据
$row = mysqli_fetch_assoc($res);
if($row){
    //注册过
    $responseDate["code"] = 5;
    $responseDate["message"] = "用户名重复";
    //将数据按照统一的返回格式返回
    echo json_encode($responseDate);
    exit;
}
//密码加密
$str = md5(md5($pwd));
//可以注册
$sql2 = "INSERT INTO user(phonenum,pwd,createtime)VALUES('{$phonenum}','{$str}','{$createtime}')";
echo $sql2;
$res2 = mysqli_query($link,$sql2);
if(!$res2){
    //插入失败
    $responseDate["code"] = 6;
    $responseDate["message"] = "注册失败";
    //将数据按照统一的返回格式返回
    echo json_encode($responseDate);
    exit;
}
$responseDate["message"] = "注册成功";
//将数据按照统一的返回格式返回
echo json_encode($responseDate);

//关闭数据库
mysqli_close($link);
?>


