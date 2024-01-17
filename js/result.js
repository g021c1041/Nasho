//プレイヤー名
var name1=localStorage.getItem("name1");
var name2=localStorage.getItem("name2");
$(".name1").text(name1);
$(".name2").text(name2);

//社員数
var employee1=localStorage.getItem("employee1");
var employee2=localStorage.getItem("employee2");

//得点計算
var a=parseInt($(".test").text());
var b=parseInt($(".test2").text());
var c=parseInt($(".test3").text());
var d=(a+b-c*3);

$(".score").text(d);
// alert(d);