using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Zhongxin.BusinessClass;
using Zhongxin.Function;

public partial class _Metro : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
		string htmlstring = "";
		
		BoardNews announce = new BoardNews();
		int RecordCount = announce.LoadLastNews(15);
		if (RecordCount > 0)
		{
			htmlstring += "<ul class=\"wonderfulComment dashed\" id=\"commentList\">\n";
			for (int i = 0; i < RecordCount; ++i)
            {
				htmlstring += "<li>" + "<div class=\"f_l_img\">" + announce.LastNews[i].newsTitle + "</div>\n"
					+ "<div class=\"f_r_info\">\n" + announce.LastNews[i].newsContent + "</div>"
					+ "<div class=\"clearfix\"></div>\n</li>";
            }
			htmlstring += "</ul>";			
		}
		else
			htmlstring += "●暂无公告信息\n";		
		this.div_board.InnerHtml = htmlstring;		
		
		// 首页滚动公告
		if (RecordCount > 0)
		{
			if (RecordCount > 9) RecordCount = 9;
			htmlstring = "<div class=\"carousel auto\">\n"
				+ "<div class=\"jCarouselLite\" style=\"visibility: visible; overflow: hidden; position: relative; z-index: 2; top: 10px; left: 640px; height: 435px;\">\n"
				+ "<ul style=\"margin: 0px; padding: 0px; position: relative; list-style-type: none; z-index: 1; height: 2465px; top: -435px;\">";
			for (int i = 0; i < RecordCount; ++i)
            {
				htmlstring += "<li style=\"overflow: hidden; float: none; width: 220px; height: 20px; margin: 0;\">"
					+ "<a href=\"board/board.aspx?id="+ announce.LastNews[i].newsID.ToString() + "\" target=\"_blank\">"
					+ (i+1).ToString() +". "
					+ announce.LastNews[i].newsTitle
					+ "</a></li>\n";
            }
			htmlstring += "</ul>\n" + "</div>\n<div class=\"clear\"></div>\n" + "</div>";
		}
		else
			htmlstring += "●暂无公告信息\n";
		this.div_boardlist.InnerHtml = htmlstring;
    }
}