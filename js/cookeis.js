
//获得coolie 的值

 

function mycookie(name){    

   var cookieArray=document.cookie.split("; "); //得到分割的cookie名值对    

   var cookie=new Object();    

   for (var i=0;i<cookieArray.length;i++){    

      var arr=cookieArray[i].split("=");       //将名和值分开    

      if(arr[0]==name)return unescape(arr[1]); //如果是指定的cookie，则返回它的值    

   } 

   return ""; 

}



function mydelCookie(name)//删除cookie

{

   document.cookie = name+"=;expires="+(new Date(0)).toGMTString();

}



function mygetCookie(objName) {//获取指定名称的cookie的值

    var arrStr = document.cookie.split("; ");

    for(var i = 0;i < arrStr.length;i ++){

        var temp = arrStr[i].split("=");

        if(temp[0] == objName) return unescape(temp[1]);

   } 

}



function myaddCookie(objName, objValue, objHours) {      //添加cookie
    ispost = 1;
    var str = objName + "=" + escape(objValue);

    if(objHours > 0){                               //为时不设定过期时间，浏览器关闭时cookie自动消失

        var date = new Date();

        var ms = objHours*3600*1000;

        date.setTime(date.getTime() + ms);

        str += "; expires=" + date.toGMTString();

   }

   document.cookie = str;

}



function mySetCookie(name, value)//两个参数，一个是cookie的名子，一个是值

{
   
    var Days = 30; //此 cookie 将被保存 30 天

    var exp = new Date();    //new Date("December 31, 9998");

    exp.setTime(exp.getTime() + Days*24*60*60*1000);

    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();

}

function mygetCookie(name)//取cookies函数        

{

    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));

     if(arr != null) return unescape(arr[2]); return null;

 

}

function mydelCookie(name)//删除cookie

{

    var exp = new Date();

    exp.setTime(exp.getTime() - 1);

    var cval=mygetCookie(name);

    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();

}

 //IE浏览器
// window.onbeforeunload = function () {
//    
//     if (document.all) {
//         var n = window.event.screenX - window.screenLeft;
//         var b = n > document.documentElement.scrollWidth - 20;
//         if (b || window.event.clientY < 0 || window.event.altKey) {

//             mydelCookie("fun");
//         }
//     }
// } 
//IE浏览器

$(document).bind("keydown", function (_e) {
    var e = _e.keyCode ? _e.keyCode : _e.which;
    if (e == 116) {
        if (window.event) {
            event.keyCode = 0;
            event.returnValue = false;
        } else {
            _e.preventDefault();
        }
        ispost = 0;
        document.location.href = document.location.href;
    }
});


var ispost = 1;
var ispost2 = 0;
window.onbeforeunload = onbeforeunload_handler;
function onbeforeunload_handler() {
    
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
          (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
        (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
        (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
        (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

    //以下进行测试
    //if (Sys.ie) document.write('IE: ' + Sys.ie);
          //if (Sys.firefox) document.write('Firefox: ' + Sys.firefox);
          //if (Sys.opera) document.write('Opera: ' + Sys.opera);
    //if (Sys.safari) document.write('Safari: ' + Sys.safari);
          if (Sys.chrome) {
              if (ispost == 1) {
                  mydelCookie("fun");
              }

          } else {
              if (document.all) {
                  var n = window.event.screenX - window.screenLeft;
                  var b = n > document.documentElement.scrollWidth - 20;
                  if (b || window.event.clientY < 0 || window.event.altKey) {

                      mydelCookie("fun");

                  }
              }
          }
   
    
    
   

 
}  

//火狐浏览器 
window.onunload = function() {
    if (!document.all) 
    {        
     if(document.documentElement.scrollWidth==0)
        {             
        mydelCookie("fun");     
        }       
    } 
}



function clickIE4() {
    if (event.button == 2) {
        return false;
    }
}

function clickNS4(e) {
    if (document.layers || document.getElementById && !document.all) {
        if (e.which == 2 || e.which == 3) {
            return false;
        }
    }
}

function OnDeny() {
    if (event.ctrlKey || event.keyCode == 78 && event.ctrlKey || event.altKey || event.altKey && event.keyCode == 115) {
        return false;
    }
}

if (document.layers) {
    document.captureEvents(Event.MOUSEDOWN);
    document.onmousedown = clickNS4;
    document.onkeydown = OnDeny();
} else if (document.all && !document.getElementById) {
    document.onmousedown = clickIE4;
    document.onkeydown = OnDeny();
}

document.oncontextmenu = new Function("return false");
