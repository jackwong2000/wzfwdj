using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net.Mail;

public partial class _Sendmail : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
		
    }
	
	protected void IBsure_Click(object sender, ImageClickEventArgs e)
    {
		//if (TBcontent.Text.Trim().Length==0) revLetters.IsValid = false;
		if (Page.IsValid)
        {
			System.Net.Mail.MailMessage mail = new System.Net.Mail.MailMessage("hz7test@163.com", "jackwong2000@163.com,wzfwdj@163.com");
			mail.Body = "发件人：" + TBname.Text.Trim() + "<br/>"
				+ "请回复邮件至：" + TBsendermail.Text.Trim() + "<br/>"
				+ "邮件内容：<br/>" + TBcontent.Text.Trim();
			mail.Subject = TBtopic.Text.Trim();
			mail.IsBodyHtml = true;
			//mail.BodyEncoding = Encoding.UTF8;
			mail.Priority = System.Net.Mail.MailPriority.Normal;
			System.Net.Mail.SmtpClient smtpClient = new System.Net.Mail.SmtpClient();
			smtpClient.Host = "smtp.163.com";//这里设置成你的smtp主机名或者ip地址
			smtpClient.Port = 25;
			smtpClient.UseDefaultCredentials = false;
			smtpClient.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
			smtpClient.Credentials = new System.Net.NetworkCredential("hz7test@163.com", "test123");//你的用户名和密码
	
			try
			{
				smtpClient.Send(mail);
				ClientScript.RegisterStartupScript(this.GetType(), "", "<script language='javascript'>btn_sure_click()</script>");
			}
			catch (Exception ex)
			{
				//Response.Write(ex.ToString());
				ClientScript.RegisterStartupScript(this.GetType(), "", "<script language='javascript'>alert('"+ex.ToString()+"');</script>");
			}
			//ClientScript.RegisterStartupScript(this.GetType(), "", "<script language='javascript'>btn_sure_click()</script>");
			//ClientScript.RegisterStartupScript(this.GetType(), "", "<script language='javascript'>alert('hello');</script>");
		}
    }
}