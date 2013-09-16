using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Zhongxin.BusinessClass;
using Zhongxin.Function;

public partial class _Intro : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
		string htmlstring = "<div class=\"laycontent\" style=\"display:block;\">\n"
				+ "<section class=\"grid yahei\">\n"
				+ "<div class=\"pro_c\">";
		
		News newsList = new News();
		int RecordCount = newsList.LoadNewsListBy(11,10);
		if (RecordCount > 0)
		{
			for (int i = 0; i < RecordCount; ++i)
            {
				htmlstring += newsList.NewsList[i].newsContent;
            }
		}
		else
			htmlstring += "●暂无信息\n";
		
		htmlstring += "</div>\n</section>\n" + "</div>\n";
		
		
		htmlstring += "<div class=\"laycontent\" style=\"display:none;\">\n"
				+ "<section class=\"grid yahei\">\n"
				+ "<div class=\"pro_c\">";
		RecordCount = newsList.LoadNewsListBy(11,11);
		if (RecordCount > 0)
		{
			for (int i = 0; i < RecordCount; ++i)
            {
				htmlstring += newsList.NewsList[i].newsContent;
            }
		}
		else
			htmlstring += "●暂无信息\n";
		
		htmlstring += "</div>\n</section>\n" + "</div>\n";
				
	
		htmlstring += "<div class=\"laycontent\" style=\"display:none;\">\n"
				+ "<section class=\"grid yahei\">\n";
		RecordCount = newsList.LoadNewsListBy(11,12);
		if (RecordCount > 0)
		{
			htmlstring += "<div class=\"pro_c yahei\" id=\"pro_box\">\n"
				+ "<div class=\"pro_menu\">\n";
			for (int i = 0; i < RecordCount; ++i)
			{
				htmlstring += "<dl>\n"
						+ "<dt class=\"font_18\">" + newsList.NewsList[i].newsTitle + "</dt>\n"
						+ "<dd style=\"display: none;\">\n"
						+ "<div id=\"pro_hidden\">\n"
						+ "<div id=\"pro_list\">\n" + newsList.NewsList[i].newsContent + "</div>\n"
						+ "<div class=\"clear\"></div>\n"
						+ "</dd>\n"
						+ "</dl>\n";
			}
			htmlstring += "</div>\n" + "</div>\n";
		}
		else
			htmlstring += "●暂无信息\n";
		htmlstring += "</section>\n" + "</div>\n";
		
		htmlstring += "<div class=\"laycontent\" style=\"display:none;\">\n"
				+ "<section class=\"grid yahei\">\n"
				+ "<div class=\"pro_c\">";
		RecordCount = newsList.LoadNewsListBy(11,13);
		if (RecordCount > 0)
		{
			for (int i = 0; i < RecordCount; ++i)
            {
				htmlstring += newsList.NewsList[i].newsContent;
            }
		}
		else
			htmlstring += "●暂无信息\n";
		
		htmlstring += "</div>\n</section>\n" + "</div>\n";
		
		this.rightsideContent.InnerHtml = htmlstring;
		
		// if (Request["tab"] != null)
		// {
			// ClientScript.RegisterStartupScript(this.GetType(), "", "<script language='javascript'>$(\"#convenience\").click();</script>");
		// }
    }
}