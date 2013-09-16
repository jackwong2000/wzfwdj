// JScript 文件

$(document).ready( 

function initInfo()
{
      
     var info="";     var tid1=GetQueryString("tid");     $.ajax({ 
        url: "/Dal/GetProInfo.aspx", 
        type: "Get", 
        datatype: "text", 
    data: { 
    tid:tid1}, 
        async: false,    
        cache: false,

        success: function (text, status) { 
        info=text;
        }
        });
                $("#pro_list").html(info);
}
);
function GetQueryString(name)  

{  

var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");  

var r = window.location.search.substr(1).match(reg);  

if (r!=null) return unescape(r[2]); return "";  

}