using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Zhongxin.BusinessClass;
using Zhongxin.Function;

public partial class _Board : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
		string htmlstring = "";
		
		BoardNews boardNews = new BoardNews();
		
		if (Request["ID"] != null)
        {
			boardNews.LoadData(Request["ID"].ToString());
            Page.Title = boardNews.Title;
			
			htmlstring += "<div class=\"art-post post-94269 post type-post status-publish format-standard hentry category-camera-lens tag-canon tag-ebay\">\n"
								+ "<div class=\"art-post-body\">\n"
								+ "<div class=\"art-post-inner art-article\">\n"
								+ "<div class=\"updatetime\">发布在 " + Function.getDateTimeLaterThan(boardNews.Datetime)
								+ "</div>\n"
								+ "<div class=\"art-article-up\">\n"
								+ "<h2 class=\"art-postheader\">"
								+ boardNews.Title + "</h2>\n"
								+ "<div class=\"art-postcontent\">\n"
								+ boardNews.Content
								+ "</div>\n"
								+ "</div>\n"
								+ "<div class=\"cleared\"></div>\n"
								+ "</div>\n"
								+ "<div class=\"cleared\"></div>\n"
								+ "</div>\n" + "</div>\n";
		}
		else
		{
			int RecordCount = boardNews.LoadLastNews(20);
			if (RecordCount > 0)
			{
				for (int i = 0; i < RecordCount; ++i)
				{
					TimeSpan ts1 = new TimeSpan(DateTime.Now.Ticks);   
					TimeSpan ts2 = new TimeSpan(boardNews.LastNews[i].updateTime.Ticks); 
					TimeSpan ts = ts1.Subtract(ts2).Duration();
					
					htmlstring += "<div class=\"art-post post-94269 post type-post status-publish format-standard hentry category-camera-lens tag-canon tag-ebay\">\n"
								+ "<div class=\"art-post-body\">\n"
								+ "<div class=\"art-post-inner art-article\">\n"
								+ "<div class=\"updatetime\">发布在 " + Function.getDateTimeLaterThan(boardNews.LastNews[i].updateTime)
								+ "</div>\n"
								+ "<div class=\"art-article-up\">\n"
								+ "<h2 class=\"art-postheader\">"
								+ (i+1).ToString() + ". " + boardNews.LastNews[i].newsTitle + "</h2>\n"
								+ "<div class=\"art-postcontent\">\n"
								+ boardNews.LastNews[i].newsContent
								+ "</div>\n"
								+ "</div>\n"
								+ "<div class=\"cleared\"></div>\n"
								+ "</div>\n"
								+ "<div class=\"cleared\"></div>\n"
								+ "</div>\n" + "</div>\n";
				}
			}
			else
				htmlstring += "●暂无信息\n";
		}
		this.div_post.InnerHtml = htmlstring;
    }
}