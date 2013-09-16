using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Zhongxin.BusinessClass;
using Zhongxin.Function;

public partial class _Law : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
		string htmlstring = "<div class=\"laycontent\" style=\"display:block;\">\n"
				+ "<section style=\"margin-top:0;	\" id=\"box\">\n";
		
		News lawNews = new News();
		int RecordCount = lawNews.LoadLawWhereBigclassIs(5);
		if (RecordCount > 0)
		{
			htmlstring += "<div class=\"pro_c yahei\" id=\"pro_box\">\n"
				+ "<div class=\"pro_menu\">\n";
			for (int i = 0; i < RecordCount; ++i)
            {
				htmlstring += "<dl>\n"
						+ "<dt class=\"font_18\">" + lawNews.LawNews[i].newsTitle + "</dt>\n"
						+ "<dd style=\"display: none;\">\n"
						+ "<div id=\"pro_hidden\">\n"
						+ "<div id=\"pro_list\">\n" + lawNews.LawNews[i].newsContent + "</div>\n"
						+ "<div class=\"clear\"></div>\n"
						+ "</dd>\n"
						+ "</dl>\n";
            }
			htmlstring += "</div>\n" + "</div>\n";
		}
		else
			htmlstring += "●暂无信息\n";
		
		htmlstring += "</section>\n" + "</div>\n";
		
		int[] arr = new int[] { 25, 26, 27};
		foreach (int iBigclass in arr)
		{
			htmlstring += "<div class=\"laycontent\" style=\"display:none;\">\n"
					+ "<section class=\"grid yahei\">\n";
			RecordCount = lawNews.LoadLawWhereBigclassIs(iBigclass);
			if (RecordCount > 0)
			{
				htmlstring += "<div class=\"pro_c yahei\" id=\"pro_box\">\n"
					+ "<div class=\"pro_menu\">\n";
				for (int i = 0; i < RecordCount; ++i)
				{
					htmlstring += "<dl>\n"
							+ "<dt class=\"font_18\">" + lawNews.LawNews[i].newsTitle + "</dt>\n"
							+ "<dd style=\"display: none;\">\n"
							+ "<div id=\"pro_hidden\">\n"
							+ "<div id=\"pro_list\">\n" + lawNews.LawNews[i].newsContent + "</div>\n"
							+ "<div class=\"clear\"></div>\n"
							+ "</dd>\n"
							+ "</dl>\n";
				}
				htmlstring += "</div>\n" + "</div>\n";
			}
			else
				htmlstring += "●暂无信息\n";
			htmlstring += "</section>\n" + "</div>\n";
		}
		
		this.rightsideContent.InnerHtml = htmlstring;
    }
}