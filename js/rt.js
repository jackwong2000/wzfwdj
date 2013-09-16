function display_c(){
var refresh=1000; // Refresh rate in milli seconds
mytime=setTimeout('display_ct()',refresh)
}

function display_ct() {
var strcount
var x = new Date()
var month = x.getMonth();
if(month<10) month="0"+month;
var day = x.getDate();
if(day<10) day="0"+day;
var week = x.getDay();
var weeks = new Array('星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
var minute = x.getMinutes();
if(minute<10) minute="0"+minute;
var second = x.getSeconds();
if(second<10) second="0"+second;

//var x1=x.getMonth() + "/" + x.getDate() + "/" + x.getYear(); 
var x1= x.getFullYear() + "年" + month + "月" + day + "日"; 
x1 = x1 + " " + weeks[week] + " " +  x.getHours( )+ ":" +  minute + ":" +  second;

document.getElementById('ct').innerHTML = x1;

tt=display_c();
}

