<%@ Page Language="C#" AutoEventWireup="true" CodeFile="sendmail.aspx.cs" Inherits="_Sendmail" ViewStateMode="Disabled"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta content="text/html; charset=gb2312" http-equiv="Content-Type">
    <title>�����з��ݵǼ�����</title>

	<script src="../js/jquery1.7.js" type="text/javascript"></script>
	<script src="../js/jquery.easing.js" type="text/javascript"></script>
	<script src="../js/language3.js" type="text/javascript"></script>

    <link href="../style/reset.css" type="text/css" rel="stylesheet">
    <link href="../style/global.css" type="text/css" rel="stylesheet">
    <link href="../style/layout.css" type="text/css" rel="stylesheet">
    <!--[if IE]>
<script src="../js/html5.js"></script>
<![endif]-->
    <!--[if IE 6]>
<script type="text/javascript" src="../js/DD_belatedPNG.js"></script>
<script type="text/javascript" src="../js/ie6fixpng.js"><</script>
<![endif]-->



</head>
<body>
<script language="javascript" type="text/javascript">
    function CheckContent(sender, args) {
        var val = document.getElementById(sender.controltovalidate).value;
        var regExp = /(^.{30,}$)$/;
        return args.IsValid = regExp.test(val);
    } 
</script>
<form id="form1" runat="server">
    <section id="main"> 
  
  <h2 class="logo left">�����з��ݵǼ�����</h2>
<p class="back"><a title="����" href="javascript:history.go(-1);"></a> </p>
<p class="home"><a title="��ҳ" href="../metro.aspx"></a></p>

<script type="text/javascript">
		
$(function() {
	changebtn(".back a", "../images/icon2.png");
	changebtn(".home a", "../images/icon2.png");
})

function changebtn(oDiv, src) {
	$(oDiv).mouseover(function() {


		$(this).next().animate({
			width: '64px',
			height: '64px',
			marginLeft: '-7px',
			marginTop: '-7px'
		}, 75)


	})

	$(oDiv).mouseout(function() {
		$(this).next().animate({
			width: '50px',
			height: '50px',
			marginLeft: '0px',
			marginTop: '0px'
		}, 75)
	})

	$(oDiv).mousedown(function() {
		$(this).next().attr("src", src);
	})
}
		
</script>

  <div class="clear"></div>
  <section id="leftside">
    <h1 class="advice"><span style="margin-top:30px;" class="gray font_48 yahei">�������</span></h1>
  </section>
  <section id="rightside">
    
    <section id="box">
    	
        <section class="grid">
        
        <ul id="bd" class="bd yahei">
        	<li id="liname" style="margin-bottom:3px;" class="b font_16" value="0">���ĳƺ�</li>
            <!--<li><input type="text" onblur="checkName()" id="name" class="t1"><span id="spanName"></span></li>-->
			<li><asp:TextBox class="t1" ID="TBname" runat="server"></asp:TextBox></li>
            <li id="liaddress" style="margin-bottom:3px;" class="b font_16" value="0">���������ַ</li>			
            <!--<li><input type="text" onblur="checkEmail()" id="email" class="t1"><span id="spanEmail"></span></li>-->
			<li><asp:TextBox class="t1" ID="TBsendermail" runat="server"></asp:TextBox>
			<asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ControlToValidate="TBsendermail"
                ErrorMessage="��Ч�������ַ" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"></asp:RegularExpressionValidator>
			<asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="TBsendermail" ErrorMessage="�����������ַ�Ա����ǻظ�����"></asp:RequiredFieldValidator>
			</li>
            <li id="limessage" style="margin-bottom:3px;" class="b font_16" value="0">����</li>
			<li><asp:TextBox class="t1" ID="TBtopic" runat="server"></asp:TextBox></li>
            <li id="limessage" style="margin-bottom:3px;" class="b font_16" value="0">��������</li>			
			<li><asp:TextBox class="t2" ID="TBcontent" runat="server" TextMode="MultiLine"></asp:TextBox></li>
<asp:CustomValidator ID="cstval_Content" runat="server" ClientValidationFunction="CheckContent" ControlToValidate="TBcontent" ErrorMessage="������Ҫ30�֣�" ValidateEmptyText="True"></asp:CustomValidator>
            <!--<li><a class="left" href="javascript:btn_sure_click()"><img id="btn_sure" alt="�ύ" src="../images/btn_sure.jpg"></a>
           <p class="clear"></p>
            </li>-->
			<li><asp:ImageButton ID="IBsure" runat="server" ImageUrl="../images/btn_sure.jpg" onclick="IBsure_Click" /></li>
         </ul>   
         	<section style="display:none;" class="success" id="tk">
            
             <p id="res" class="center font_24 yahei" style="text-indent: 0px; width: 400px; text-align: center; padding-left: 20px;">�����ѳɹ��ύ��лл���Ĺ�ע��</p>
             <section style="margin-top:40px;" class="center"><a href="javascript:history.go(-1);"><img alt="����" id="btn_back" src="../images/btn_back.jpg"></a></section>
            </section>
         
        

     </section>
    </section>
   
  </section>
  <footer class="yahei">
  	<span class="left">
    <h1 class="left"></h1>
      &copy; <span id="footername">�����з��ݵǼ�����</span></span>
      <span style="padding-left:30px;" class="right">��վ���裺��Ϣ�����</span>
      <span id="footertel" class="right">�ͻ�����0577-88864444</span>   
      
  <div class="clear"></div>
  </footer>
 
</section>
<script type="text/javascript">
function btn_sure_click()
{
	$("#bd").css({display: "none"});
	$("#tk").css({display: "block"});
}
</script>
</form>
</body></html>