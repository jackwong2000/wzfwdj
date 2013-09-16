<%@ Page Language="C#" AutoEventWireup="true" CodeFile="intro.aspx.cs" Inherits="_Intro" ViewStateMode="Disabled"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta content="text/html; charset=gb2312" http-equiv="Content-Type">
<title>温州市房屋登记中心</title>

<link href="../style/reset.css" type="text/css" rel="stylesheet">
<link href="../style/global.css" type="text/css" rel="stylesheet">
<link href="../style/layout.css" type="text/css" rel="stylesheet">

<script src="../js/jquery1.7.js" type="text/javascript"></script>
<script src="../js/jquery.easing.js" type="text/javascript"></script>
<script src="../js/language3.js" type="text/javascript"></script>
<script src="../js/loading.js" type="text/javascript"></script>
<!--[if IE]>
<script src="../js/html5.js"></script>
<![endif]-->
<!--[if IE 6]>
<script type="text/javascript" src="../js/DD_belatedPNG.js"></script>
<script type="text/javascript" src="../js/ie6fixpng.js"><</script>
<![endif]-->
<script type="text/javascript">
var xh = 0;
    $(document).ready(function () {
        startlange("language", "index|menu_index");
		checktab();
    });
    //页面特效加载的方法
    function htmlshow() {

        $(".solvemenu li a").hover(function () {
            $(this).css("background-position", "left bottom");

        }, function () {

            if ($(this).is(".current")) {

            }
            else {

                $(this).css("background-position", "left top");
            }
        })
       // $(".laycontent").eq(0).show().siblings().hide();
        $(".solvemenu li a").click(function () {
            xh = $(".solvemenu li a").index(this);
            $(this).css("background-position", "left bottom").addClass("current").parent().siblings().children('a').removeClass("current").css("background-position", "left top");
            $(".laycontent").eq(xh).show().siblings().hide();
        })
        $("section#rightside .solvemenu li.m1 a").removeClass("current").css("background-position", "left top");
        $("section#rightside .solvemenu li.m"+(xh+1)+" a").addClass("current");
        $(".solvemenu li a.current").css("background-position", "left bottom");
		
        $("#box div.laycontent").eq(xh).show().siblings().hide();
		
		var menuname = $("#solvetitle2").text();
		
		if(langvaue=='cn')
		{
			if (menuname.sub(6)) {
			
			
            $("#solvetitle2").html('<span>'+menuname.substring(0,3)+'</span><span>'+menuname.substring(3,menuname.length)+'</span>');
			$("#solvetitle2 span").css("text-align","left");
			$("#solvetitle2 span").addClass("twowidth");
			$("#solvetitle2").css("marginLeft","0");
        	}
			
		}
		else
		{
			$("#solvetitle2").css("text-align","center");
			//s
		}
    }
	
	String.prototype.sub = function (n) {
        var r = /[^\x00-\xff]/g;
        if (this.replace(r, "mm").length <= n) {
            return false;
        }
        else {
            return true;
        }

    };

</script>
</head>

<body style="overflow-x: hidden; overflow-y: hidden;">

<script type="text/javascript">
	var p = new etControl.process();
	var targetjindu = 0;
</script>
<form id="form1" runat="server">
<section id="main"> 
<h2 class="logo left">温州市房屋登记中心</h2>

<!--<button type="button" onclick="javascript:$('#convenience').click();">按钮</button>-->
<p class="back"><a title="返回" href="javascript:history.go(-1);"></a> </p>
<p class="home"><a title="主页" href="../metro.aspx"></a></p>
<script type="text/javascript">
		
		$(function(){
			
			//alert(getcookie());
			
			if(getcookie()=="cn")
			{
				$("#pChina").hide();
				$("#pEnging").show();
			}
			else
			{
				$("#pChina").show();
				$("#pEnging").hide();
			}
			
			$(".trans").click(function(){
				
				//alert(getcookie());
				
				if(getcookie()=="cn")
				{
					$("#pChina").show();
					$("#pEnging").hide();
				}
				else
				{
					$("#pChina").hide();
					$("#pEnging").show();
				}
					
				
			})
			
		})
		
		
		</script>
<script type="text/javascript">
		
		
		
		$(function(){
		
		
		changebtn(".back a","/images/icon2.png");
		changebtn(".home a","/images/icon2.png");
		changebtn(".trans a","/images/icon2.png");
		
		
		})
		
		function changebtn(oDiv,src){
		
		
		$(oDiv).mouseover(function(){
		
		
			$(this).next().animate({
   width: '64px', height: '64px',marginLeft:'-7px',marginTop:'-7px'
 },75)
		
		
		})
		
		$(oDiv).mouseout(function(){
		
		
			$(this).next().animate({
   width: '50px', height: '50px',marginLeft:'0px',marginTop:'0px'
 },75)
		
		
		})
		
		$(oDiv).mousedown(function(){
		
		$(this).next().attr("src",src);
		
		
		
		})
		
		
		
		
		}
		
		
		</script>

  <div class="clear"></div>
  <section id="leftside">
    <h1 class="solve" style="background:url(../images/title_intro.png) no-repeat;">
       
      <span class="white font_48 yahei">中心简介<br /><br /><br /></span>
      </h1>
  </section>
  <section id="rightside">
    <ul class="solvemenu yahei white font_15 b">
 <!--安全的智能园menu:开始-->
  <li class="m1"><a href="javascript:void(0)" style="width:148px; height: 30px; display: block; background-image: url(../images/law/law_m1.jpg); background-position: 0% 100%; background-repeat: no-repeat no-repeat;" class="current">中心概况</a></li>
  <li class="m2"><a href="javascript:void(0)" style="width:148px; height:30px; display:block; background:url(../images/law/law_m2.jpg) no-repeat;">科室电话</a></li>
  <li class="m3"><a href="javascript:void(0)" style="width:148px; height:30px; display:block; background:url(../images/law/law_m3.jpg) no-repeat;">点滴知识</a></li>
  <li class="m4"><a id="convenience" href="javascript:void(0)" style="width:148px; height:30px; display:block; background:url(../images/intro_convenience.jpg) no-repeat;">便民服务</a></li>
<!--安全的智能园menu:结束--> 
      <div class="clear"></div>
    </ul>
<div id="rightsideContent" runat="server">

</div>  <!-- end of "rightsideContent" div -->
<script type="text/javascript">
	targetjindu += 30;
</script>
<script type="text/javascript">
$(function(){
	
$(".pro_menu dl dt").click(function(){
			if ($(this).is(".current")) {
				$(this).removeClass("current").next().slideUp();
			}
			else
			{
				$(this).addClass("current").parent().siblings().children('dt').removeClass("current");
				$(this).next().slideDown().parent().siblings().children('dd').slideUp();
			}
		})
})


function drag(id){
	var oli=Math.ceil($("#pro_list ul li").length/4)*2;   //个数
	var widthli=$("#pro_list ul li").width()+10; //长度
	var totwidth=oli*widthli;
	var totli=$("#pro_list ul li").length;
	
	$("#pro_list").css("width",totwidth);
	var n=0;
	var startA=0;   //点击的第一次坐标
	var startB=0;   //滑动后的第一次坐标
	var startC=0;
	
	$(id).mousedown(function(e){
		var disX=e.pageX-$(id).position().left;
			startA=e.pageX;
	
			$("#pro_list ul li").eq(0).children('a').click(function(){
		    var timer=null;
			$(this).addClass("current");
			timer=setTimeout(function(){window.location=alink(0);},500)
			})
			
			$("#pro_list ul li").eq(1).children('a').click(function(){
		 var timer=null;
			$(this).addClass("current");
			timer=setTimeout(function(){window.location=alink(1);},500)
			})
			$("#pro_list ul li").eq(2).children('a').click(function(){
			 var timer=null;
			$(this).addClass("current");
			timer=setTimeout(function(){window.location=alink(2);},500)
			})
			$("#pro_list ul li").eq(3).children('a').click(function(){
			 var timer=null;
			$(this).addClass("current");
			timer=setTimeout(function(){window.location=alink(3);},500)
			})
			$("#pro_list ul li").eq(4).children('a').click(function(){
			 var timer=null;
			$(this).addClass("current");
			timer=setTimeout(function(){window.location=alink(4);},500)
			})
			$("#pro_list ul li").eq(5).children('a').click(function(){
			 var timer=null;
			$(this).addClass("current");
			timer=setTimeout(function(){window.location=alink(5);},500)
			})
			$("#pro_list ul li").eq(6).children('a').click(function(){
			 var timer=null;
			$(this).addClass("current");
			timer=setTimeout(function(){window.location=alink(6);},500)
			
			})
			$("#pro_list ul li").eq(7).children('a').click(function(){
			 var timer=null;
			$(this).addClass("current");
			timer=setTimeout(function(){window.location=alink(7);},500)
			})
			
			$("#pro_list ul li").eq(8).children('a').click(function(){
			 var timer=null;
			$(this).addClass("current");
			timer=setTimeout(function(){window.location=alink(8);},500)
			})
			$("#pro_list ul li").eq(9).children('a').click(function(){
			 var timer=null;
			$(this).addClass("current");
			timer=setTimeout(function(){window.location=alink(9);},500)
			})
			$("#pro_list ul li").eq(10).children('a').click(function(){
			 var timer=null;
			$(this).addClass("current");
			timer=setTimeout(function(){window.location=alink(10);},500)
			})
			$("#pro_list ul li").eq(11).children('a').click(function(){
			 var timer=null;
			$(this).addClass("current");
			timer=setTimeout(function(){window.location=alink(11);},500)
			})
		$(document).mousemove(function(e){
			//$("a").unbind("click");
			var l=e.pageX-disX;
			startB=e.pageX;
			if(l>0)
			{
				l=0;
			}
			else if(l<(-$(id).width()+widthli*2))
			{
				l=(-$(id).width()+widthli*2);
			}
			$(id).css("left",l+"px");
			})
			
			$(document).mouseup(function(){
				startC=e.pageX;
				var startX=380;
				var everymove=-485;
				if(Math.abs(startA-startC)<15)
				{
				}
				else
				{//判定左移	
				if(startA-startB>0)
				{
					if(startA-startB>150)
					{
							if(n==(oli-2))
							{
							}
							else
							{
								moveTarget(id,everymove*(n+1));
								n++;
							}
					}
					else
					{
						moveTarget(id,everymove*(n));
					}
				}
		//判定右移			
				if(startA-startB<0)
				{
					if(startA-startB<-150)
					{
							if(n==0)
							{
							}
							else
							{
								moveTarget(id,everymove*(n-1));
								n--;
							}
					}
					else
					{
						moveTarget(id,everymove*(n));
					}
				}
				}
				$(document).unbind();
			})
		return false;
		})
	}
function moveTarget(obj,targetX){
	var oDiv=$(obj);
	var targetL=targetX+"px";
	 $(obj).animate({left: targetL}, "slow","easeInSine");
}

function alink(n)
{
	n=n+1;
	var alink="/pro/pro"+n+"show.shtml"
	return alink;
}

</script>
  </section>  <!-- end of "rightside" section -->
  <footer class="yahei">
  	<span class="left">
    <h1 class="left"><a href="http://www.wzfwdj.com/" target="_blank"></a></h1>
      &#169; <span id="footername">温州市房屋登记中心</span></span>
      <span class="right" style="padding-left:30px;">网站建设：信息管理科</span>
      <span class="right" id="footertel">客户服务：0577-88864444</span>   
      
  <div class="clear"></div>
  </footer>
  <script type="text/javascript">


  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-23463674-2']);
  _gaq.push(['_trackPageview']);


  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();


</script>
 
</section>


</form>

<script type="text/javascript">
	$(function(){
		var timer=null;
		timer=setInterval(function(){
		if(targetjindu>=30)
		{
		targetjindu=100;
		p.updateProcess(targetjindu);
		clearInterval(timer);
		$("body").css({"overflow-y": ""});
		}
		},300)
	});
</script>

<script type="text/javascript">
function checktab()
{
	if (location.search=="?tab=4") $("#convenience").click();
}
//if(page_params[0]=="tab=4") $("#convenience").click();
// ****** end of Paul Stephens' parameter-handling script
</script>

</body></html>