<%@ Page Language="C#" AutoEventWireup="true" CodeFile="metro.aspx.cs" Inherits="_Metro" ViewStateMode="Disabled"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html style="overflow-x:hidden; overflow-y:hidden">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html;charset=gbk">
<title>温州市房屋登记中心</title>

<link rel="stylesheet" type="text/css" href="fenghuo/global.css">
<link rel="stylesheet" type="text/css" href="fenghuo/index.css">
<link rel="stylesheet" type="text/css" href="fenghuo/jquery.css">

<script type="text/javascript" src="js/jquery1.7.js"></script>
<script type="text/javascript" src="js/jquery.easing.js"></script>
<script type="text/javascript" src="js/jquery.fancybox.js"></script> 
<script type="text/javascript" src="js/cookeis.js"></script> 
<script type="text/javascript" src="js/html5.js"></script> 
<script type="text/javascript" src="js/jcarousellite.js"></script> 
<script type="text/javascript" src="js/imgready.js"></script>
<script type="text/javascript" src="js/loading.js"></script>
<script type="text/javascript" src="js/yyets.js"></script>
<script type="text/javascript" src="js/rt.js"></script>

<style type="text/css">
html {height: auto;}
body {height: auto;margin: 0;padding: 0;}
#map_canvas {width:510px;height: 425px;position: relative;}
@media print {#map_canvas {height: 425px;}}
</style>
<script src="http://api.go2map.com/maps/js/api_v2.5.1.js" type="text/javascript"></script>

<script type="text/javascript">
  function mapInitialize() {
    var myLatlng = new sogou.maps.LatLng(27.999568,120.697683);
    var myOptions = {
      zoom: 14,
      center: myLatlng,
      mapTypeId: sogou.maps.MapTypeId.ROADMAP
    }
    var map = new sogou.maps.Map(document.getElementById("map_canvas"), myOptions);
     
    var marker = new sogou.maps.Marker({
        position: myLatlng,
        map: map,
        title:"温州市房屋登记中心"
    });   
  }
</script>


<script type="text/javascript">
window.onload = function (){
	absoluteCenter1("#enter");
	absoluteCenter("#pro_window");
	absoluteCenter("#pro_list");
	absoluteCenter(".solve_list");
	absoluteCenter(".about_list");
	absoluteCenter(".tech_list");
	absoluteCenter(".movie_list");
	mapInitialize();
	display_ct();
}

$(window).resize(function(){
	absoluteCenter1("#enter");
	absoluteCenter("#pro_window");
	absoluteCenter("#pro_list");
	absoluteCenter(".solve_list");
	absoluteCenter(".about_list");
	absoluteCenter(".tech_list");
	absoluteCenter(".movie_list");
})
function moveTarget(obj,targetX,targetY){
	var oDiv=$(obj);
	var timer=null;
	var targetL=targetX+"px";
	var targetT=targetY+"px";
	$(obj).animate({
	left: targetL,top:targetY
	}
	, "normal");
}
function upstair()
{
	//clearTimeout(timer);
	moveTarget("#index_dl",0,-1050);
	document.onmousemove=null;
	document.onmouseup=null;
	myaddCookie("fun", "upstair");
}
function leftstair()
{
	//clearTimeout(timer);
	document.onmousemove=null;
	document.onmouseup=null;
	moveTarget("#pro",-1680,0);
	moveTarget("#wrap",0,0);
	//absoluteCenter("#wrap ul.list");
	myaddCookie("fun", "leftstair");
}
function bzQuery()
{
	//clearTimeout(timer);
	document.onmousemove=null;
	document.onmouseup=null;
	moveTarget("#pro",-1680,0);
	moveTarget("#bzQuery",0,0);
	absoluteCenter("#bzQuery #pro_list");
	myaddCookie("fun", "bzQuery");
}
function formDown()
{
	//clearTimeout(timer);
	document.onmousemove=null;
	document.onmouseup=null;
	moveTarget("#pro",-1680,0);
	moveTarget("#formDown",0,0);
	absoluteCenter("#formDown #pro_list");
	myaddCookie("fun", "formDown");
}
function board()
{
	//clearTimeout(timer);
	document.onmousemove=null;
	document.onmouseup=null;
	moveTarget("#pro",-1680,0);
	moveTarget("#board",0,0);
	absoluteCenter("#board #pro_list");
	myaddCookie("fun", "board");
}
function aboutUs()
{
	//clearTimeout(timer);
	document.onmousemove=null;
	document.onmouseup=null;
	moveTarget("#pro",-1680,0);
	moveTarget("#aboutUs",0,0);
	absoluteCenter("#aboutUs #pro_list");
	myaddCookie("fun", "aboutUs");
}
function backIn()
{
	//clearTimeout(timer);
	document.onmousemove=null;
	document.onmouseup=null;
	moveTarget("#pro",0,0);
	moveTarget("#wrap",1680,0);
	moveTarget("#bzQuery",1680,0);
	moveTarget("#formDown",1680,0);
	moveTarget("#board",1680,0);
	moveTarget("#aboutUs",1680,0);
	moveTarget("#movie",1680,0);
	$("#pro_window ul li").css({ "transform": "scale(1)", "-webkit-transform": "scale(1)", "-moz-transform": "scale(1)", "-ms-transform": "scale(1)" });
	myaddCookie("fun", "backIn");
}
function absoluteCenter(obj)
{
	var windowHeight=$(window).height();
	var proHeight=$(obj).height();
	var centerTop=0;
	if(windowHeight-84>proHeight)
	{
		centerTop=parseInt((windowHeight-proHeight-84)/2);
	}
	else
	{
		centerTop=parseInt((windowHeight-proHeight)/2);
	}
	var pro_window=$(obj);
	if(centerTop>0)
	{
		centerTop*=1;
	}
	else
	{
		centerTop*=-1;
	}
	//document.title=centerTop;
	$(obj).css( "padding-top", centerTop);
}
function absoluteCenter1(obj)
{
	var windowHeight=$(window).height();
	var proHeight=$(obj).height();
	var centerTop=parseInt((windowHeight-proHeight)/2);
	var pro_window=$(obj);
	if(centerTop>0)
	{
	centerTop*=1;
	}
	else
	{
	centerTop*=-1;
	}
	//document.title=centerTop;
	$(obj).css( "top", centerTop);
}


</script> 




</head>
<body>
<form id="form1" runat="server">
<script type="text/javascript">
var jindu=0;
var targetjindu=0;
var pic1=0;
var pic2=0;
var pic3=0;
var pic4=0;
    var oImage1 = new Image();
    var oImage2 = new Image();
    var oImage3 = new Image();
	var oImage4 = new Image();
    oImage1.src = "images/bg.jpg";
    oImage3.src = "images/pro-1.jpg";

imgReady('images/bg.jpg', function () {	},
	function(){var timer=null;			
				timer=setInterval(function(){
					if(targetjindu==55)
					{
						targetjindu=75;
						p.updateProcess(targetjindu);
						clearInterval(timer);
					}				
				},300)
			},function(){});

imgReady('images/pro-1.jpg', function () { },
	function(){var timer=null;
				timer=setInterval(function(){
					if(targetjindu==0)
					{
					targetjindu=30;
					p.updateProcess(targetjindu);
					clearInterval(timer);
					}
				},300)
			},function(){});
	//pic4=1;

</script>

<script type="text/javascript">
	var p = new etControl.process()
</script>

<section id="main">
<section id="box">
<section id="index">

<section id="pro">
<section style="margin: 0px auto; padding-top: 28px;" id="pro_window"> 
	<section style=" position:relative; width:916px; top:0px;">
        <h2 class="logo left">温州市房屋登记中心</h2><span id='ct' style="float: right; margin-top: 15px; font-size: 14px;"></span>
        <p class="c_trans pChina" style="display: none;"><a style="margin:0;" class="c1" href="javascript:langchangebya('cn')">中文</a></p>
          <p class="c_trans pEnging"><a style="margin:0;" class="c2" href="javascript:langchangebya('en')">英文</a></p>
           <section class="clear"></section>
	</section>
	<ul style="position:relative; margin-top:30px;" class="yahei white font_16">
          
            <li class="m1 MainItem font_12" style="left: 0px; top: 0px; position: absolute;"><a href="javascript:void(0)">办证查询</a></li>
			<li class="m2 MainItem font_12" style="left: 154px; top: 0px; position: absolute;"><a href="javascript:void(0)">表格下载</a></li>
			<li class="m3 MainItem font_12" style="left: 0px; top: 84px; position: absolute;"><a href="javascript:void(0)">办事指南</a></li>
			<li class="m4 MainItem font_12" style="left: 154px; top: 84px; position: absolute;"><a href="javascript:void(0)">便民服务</a></li>
			<li class="m5 MainItem" style="left: 308px; top: 0px; position: absolute;"><a href="javascript:void(0)">商品房网上销售</a></li>
			<li class="m6 MainItem" style="left: 308px; top: 84px; position: absolute;"><a href="javascript:void(0)">存量房网上销售</a></li>
            <li class="m7 MainItem" style="left: 616px; top: 0px; position: absolute;"><a href="javascript:void(0)">公告栏</a></li>
            <li class="m8 MainItem" style="left: 0px; top: 168px; position: absolute;"><a href="javascript:void(0)">图片新闻</a></li>
            <li class="m9 MainItem font_12" style="left: 308px; top: 168px; position: absolute;"><a href="javascript:void(0)">政策法规</a></li>
			<li class="m10 MainItem font_12" style="left: 462px; top: 168px; position: absolute;"><a href="javascript:void(0)">档案利用</a></li>
            <li class="m11 MainItem font_12" style="left: 308px; top: 252px; position: absolute;"><a href="javascript:void(0)">拆迁安置房登记目录</a></li>
			<li class="m12 MainItem font_12" style="left: 462px; top: 252px; position: absolute;"><a href="javascript:void(0)">商品房登记目录</a></li>
            <li class="m13 MainItem font_12" style="left: 616px; top: 168px; position: absolute;"><a href="javascript:void(0)">中心简介</a></li>
            <li class="m14 MainItem font_12" style="left: 770px; top: 168px; position: absolute;"><a href="javascript:void(0)">数据播报</a></li>
            <li class="m15 MainItem font_12" style="left: 616px; top: 252px; position: absolute;"><a href="javascript:void(0)">主任信箱</a></li>
            <li class="m16 MainItem font_12" style="left: 770px; top: 252px; position: absolute;"><a href="javascript:void(0)">关于我们</a></li>
            <section class="clear"></section>
	</ul>
	<div id="div_boardlist" runat="server">
	</div>
</section>
</section>  <!-- end of "pro" section -->

<section class="pro" id="wrap" style="left: 1680px; top: 0px;">
	<section id="pro_list" style="padding-top: 13px;">
		<section style=" position:relative; width:920px; top:0px;">
			<h2 class="logo left">政策法规</h2>
			<p class="c_back"><a onclick="backIn()" href="javascript:void(0)">后退</a></p>
			<section class="clear"></section>
			</section>
       
		<ul style="position:relative;" class="list">
          
            <li class="m1"><span class="white yahei"><a href="/pro/pro.shtml?tid=1">法律</a></span></li>

            <li class="m2"><span class="white yahei"><a href="/pro1/pro.shtml?tid=2">行业法规</a></span></li>
            <li class="m3"><span class="white yahei"><a href="/pro2/pro.shtml?tid=3">司法解释</a></span></li>
            <li class="m4"><span class="white yahei"><a href="/pro3/pro.shtml?tid=4">部门规章</a></span></li>
            <li class="m5"><span class="white yahei"><a href="/pro4/pro.shtml?tid=5">文件</a></span></li>
            <li class="m6"><span class="white yahei"><a href="/pro6/pro.shtml?tid=6">政策</a></span></li>
            <!--<li style="display:none" class="m7"><span class="white yahei"><a href="/pro7/pro.shtml?tid=7">光端机</a></span></li>
            <li class="m8"><span class="white yahei"><a href="/pro8/pro.shtml?tid=8">网络键盘</a></span></li>-->
           
		</ul>
	</section>
</section>

<section class="pro" id="bzQuery" style="left: 1680px; top: 0px;">
	<section id="pro_list" style="padding-top: 33px;">
		<section style="position:relative; width:920px; top:0px;">
			<h2 class="logo left">温州市房屋登记中心</h2>
			<p class="c_back"><a onclick="backIn()" href="javascript:void(0)">后退</a></p>
			<section class="clear"></section>
			</section>
       
		<section id="leftside">
			<h1 class="image" style="background:url(images/pro_title6.png) no-repeat; display: block;">
			<span class="white font_48 yahei" id="title">办证查询</span>
			</h1>
		</section>
		
		<section id="rightside">
		<iframe src="http://www.wzfg.com/realweb/stat/QueryBzResult.jsp" allowTransparency="true" frameborder="0" width="580px" height="490px" scrolling="auto" >
		</iframe>
		</section>
	</section>
</section>  <!-- end of "bzQuery"办证查询 section -->

<section class="pro" id="formDown" style="left: 1680px; top: 0px;">
	<section id="pro_list" style="padding-top: 33px;">
		<section style="position:relative; width:920px; top:0px;">
			<h2 class="logo left">温州市房屋登记中心</h2>
			<p class="c_back"><a onclick="backIn()" href="javascript:void(0)">后退</a></p>
			<section class="clear"></section>
			</section>
       
		<section id="leftside">
			<h1 class="image" style="background:url(images/formDown_title.png) no-repeat; display: block;">
			<span class="white font_48 yahei" id="title">表格下载</span>
			</h1>
		</section>
		
		<section id="rightside">
			<ul style="position:relative;" class="list">
          
            <li class="m1"><span class="white"><a href="http://www.wzfwdj.com/zhongxin/ueditor/net/upload/2013-04-18-1948d85843-3912-4970-a244-dd02485759d3.doc" target="_blank">受权委托备案表  |
			<em style="float:right;margin:auto 12px auto auto; font-style:normal">42.50KB</em>
			</a></span></li>
            <li class="m2"><span class="white"><a href="http://www.wzfwdj.com/zhongxin/ueditor/net/upload/2013-04-12-278fed0720-589f-474a-a8c9-914c28b661d4.doc" target="_blank">办证“绿色通道”（快件）登记表  |
			<em style="float:right;margin:auto 12px auto auto; font-style:normal">20.02KB</em>
			</a></span></li>
            <li class="m3"><span class="white"><a href="http://www.wzfwdj.com/zhongxin/ueditor/net/upload/2012-11-21-382938e7c7-46b8-4290-8411-44309bc3e4e6.doc" target="_blank">温州市房屋登记申请书（买卖）  |
			<em style="float:right;margin:auto 12px auto auto; font-style:normal">56.00KB</em></a></span></li>
            <li class="m3"><span class="white"><a href="formdown/温州市房屋抵押登记申请书.doc" target="_blank">温州市房屋抵押登记申请书  |
			<em style="float:right;margin:auto 12px auto auto; font-style:normal">46.50KB</em></a></span></li>
            <li class="m3"><span class="white"><a href="formdown/温州市房屋抵押变更登记申请书.doc" target="_blank">温州市房屋抵押变更登记申请书  |
			<em style="float:right;margin:auto 12px auto auto; font-style:normal">58.00KB</em></a></span></li>
            <li class="m3"><span class="white"><a href="formdown/温州市房屋抵押（预告、在建）注销登记申请书.doc" target="_blank">温州市房屋抵押（预告、在建）注销登记申请书  |
			<em style="float:right;margin:auto 12px auto auto; font-style:normal">53.50KB</em></a></span></li>
			
			</ul>
		</section>
	</section>
</section>  <!-- end of "formDown"表格下载 section -->

<section class="pro" id="board" style="left: 1680px; top: 0px;">
	<section id="pro_list" style="padding-top: 33px;">
		<section style="position:relative; width:920px; top:0px;">
			<h2 class="logo left">温州市房屋登记中心</h2>
			<p class="c_back"><a onclick="backIn()" href="javascript:void(0)">后退</a></p>
			<section class="clear"></section>
			</section>
       
		<section id="leftside">
			<h1 class="image" style="background:url(images/board_title.png) no-repeat; display: block;">
			<span class="white font_48 yahei" id="title"><a href="board/board.aspx">公告栏</a></span>
			</h1>
		</section>
		
		<section id="rightside">
			<div class="scrollBox">
				<div id="div_board" runat="server">
				</div>
			</div>
		</section>
	</section>
</section>  <!-- end of "board"公告栏 section -->

<section class="pro" id="aboutUs" style="left: 1680px; top: 0px;">
	<section id="pro_list" style="padding-top: 33px;">
		<section style="position:relative; width:920px; top:0px;">
			<h2 class="logo left">关于我们</h2>
			<p class="c_back"><a onclick="backIn()" href="javascript:void(0)">后退</a></p>
			<section class="clear"></section>
			</section>
       
		<section id="leftside">
			<h1 class="image" style="background:url(images/title_aboutUs.jpg) no-repeat; display: block;">
			</h1>
		</section>
		
		<section id="rightside">
			<ul style="position:relative;" class="list">
          
            <li class="m1"><span class="white yahei" style="font-size:16px;line-height:19px;">
			电话：0577-88864444
			</span></li>
            <li class="m2"><span class="white yahei" style="font-size:16px;line-height:19px;">
			地址：温州市府东路561号建设大楼一楼（上堡公寓对面）
			</span></li>
            <li class="m3"><span class="white yahei" style="font-size:16px;line-height:19px;">
			邮编：325000&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			主任信箱：<a href="mailto:wzfwdj@163.com" target="_blank">wzfwdj@163.com</a>
			</span></li>
			</ul>
			<section class="clear"></section>
			<!--<iframe width="604" height="428" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://ditu.google.com.hk/maps/ms?msa=0&amp;msid=217083250301340163172.0004e4ebdd8a2f7924437&amp;ie=UTF8&amp;t=m&amp;brcurrent=3,0x0:0x0,1&amp;ll=27.995628,120.701653&amp;spn=0,0&amp;output=embed"></iframe>-->
			<div id="map_canvas"></div>
			<!--<br /><small>在较大的地图中查看<a href="https://ditu.google.com.hk/maps/ms?msa=0&amp;msid=217083250301340163172.0004e4ebdd8a2f7924437&amp;ie=UTF8&amp;t=m&amp;brcurrent=3,0x0:0x0,1&amp;ll=27.995628,120.701653&amp;spn=0,0&amp;source=embed" style="color:#0000FF;text-align:left">温州市房屋登记中心</a></small>-->
		</section>
	</section>
</section>  <!-- end of "aboutUs"表格下载 section -->

</section>  <!-- end of "index" section -->
</section>  <!-- end of "box" section -->
</section>  <!-- end of "main" section -->
<script type="text/javascript">
		$(function(){
			var w1=$("#index_dl img").css("width");
			var h1=$("#index_dl img").css("height");
			var windoww1=$(window).width();
			var windowh1=$(window).height();
			
			if((windoww1/windowh1)>(1680/1050))
			{
				var h2=1050*$(window).width()/1680;
				var dish=(h2-$(window).height())/2;
				$("#index_dl img").css("marginTop",-dish);
				
				$("#index_dl img").css("width",$(window).width());
				
			}
			else
			{
				var w2=1680*$(window).height()/1050;
				var disw=(w2-$(window).width())/2;
				$("#index_dl img").css("marginLeft",-disw);
				$("#index_dl img").css("height",$(window).height());
			}
			
			$(window).resize(function(){
			
			var windoww1=$(window).width();
			var windowh1=$(window).height();
			
				if((windoww1/windowh1)>(1680/1050))
				{
					
					var h2=1050*windoww1/1680;
					var dish=(h2-windowh1)/2;
					$("#index_dl img").css("marginTop",-dish);
					$("#index_dl img").css("marginLeft",0);
					$("#index_dl img").css("width",windoww1);
					$("#index_dl img").css("height",h2);
				}
				else
				{
					document.title=windowh1;
					var w2=1680*windowh1/1050;
					var disw=(w2-windoww1)/2;
					$("#index_dl img").css("marginLeft",-disw);
					$("#index_dl img").css("marginTop",0);
					$("#index_dl img").css("height",windowh1);
					$("#index_dl img").css("width",w2);
					
				}
			})
		})
</script>





<script type="text/javascript">
		$(function(){
			
			var ali=$("#pro ul li.MainItem");
			var lilength=ali.length;
			
			var bli=$("#div_boardlist ul li");
			var blilength=bli.length;
			
			for(var i=0;i<lilength;i++)
			{
				ali.eq(i).css("left",ali.eq(i).position().left);
				ali.eq(i).css("top",ali.eq(i).position().top);
			}
			
			for(var i=0;i<lilength;i++)
			{
				ali.eq(i).css("position","absolute")
			}
			
			ali.click(function(){
				var xh=ali.index(this);
				if(xh>=lilength) return;
				//if((xh>=3)&&(xh<3+blilength)) return;
				//else
				//{
				//var hztxxx=0;
					//if(xh>=3+blilength) xh-=blilength;
				//if(xh!=3&&xh!=9&&xh!=10)
				if(xh!=5&&xh!=7&&xh!=9&&xh!=10&&xh!=11&&xh!=13)
				{
					$(this).css({ "transform": "scale(0.9,0.9)","-ms-transform": "scale(0.9)", "-webkit-transform": "scale(0.9)", "-moz-transform": "scale(0.9)", "transition-duration": "0.2s","-ms-transition-duration": "0.2s", "-webkit-transition-duration": "0.2s", "-moz-transitionDuration": "scale(0.2)" });
				}
					var timer=null;
					timer=setTimeout("xhlocation("+xh+")",400);
				//}
			})
		})
		
		
		function xhlocation(xh)
		{
				//alert(xh);
					switch(xh)
					{
						case 0:bzQuery();
						break;
						
						case 1:formDown();
						break;
						
						case 2:window.location='wkflow.htm';
						break;
						
						case 3:window.location='intro/intro.aspx?tab=4';
						break;
						
						case 4:window.open('http://www.wzfg.com','_blank');
						break;
						
						case 5:javascript:alert('该栏目正在建设中...');
						break;
						
						//case 2:window.open('http://www.wzfg.com','_blank');
						case 6:board();
						break;
						
						case 7:javascript:alert('该栏目正在建设中...');
						break;
						
						case 8:window.location='law/law.aspx';
						break;
						
						case 9:javascript:alert('该栏目正在建设中...');
						break;
						
						case 10:javascript:alert('该栏目正在建设中...');
						break;
						
						case 11:javascript:alert('该栏目正在建设中...');
						break;
						
						//case 11:window.location='news/news.aspx';
						case 12:window.location='intro/intro.aspx';
						break;
						
						//case 12:javascript:alert('该栏目正在建设中...');
						case 13:window.location='news/news.aspx';
						break;
						
						case 14:window.location='sendmail/sendmail.aspx';
						break;
												
						case 15:aboutUs();
						break;
					}
		}
		
</script>


<script type="text/javascript">
	$(function(){
		var timer=null;
		timer=setInterval(function(){
		if(targetjindu>=30)
		{
		targetjindu=100;
		p.updateProcess(targetjindu);
		clearInterval(timer);
		}
		},300)
	})

</script>
<script type="text/javascript">
$(document).ready(function(){
    YYETS.JQUERY.Scroll({obj:$('#commentList')});
	$(".auto .jCarouselLite").jCarouselLite({
		auto: 1700,
		speed: 700,
		vertical: true,
		visible: 4
	});
	$(".auto .jCarouselLite ul li").css({left: "", top: "", position: ""});
});

</script>
</form>
</body>
</html>