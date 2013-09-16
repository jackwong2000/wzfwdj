using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Zhongxin.BusinessClass;
using Zhongxin.Function;

public partial class _SpfNews : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
		string htmlstring = "";
		
		News spfNews = new News();
		int RecordCount = spfNews.LoadSpfNews();
		if (RecordCount > 0)
		{
			for (int i = 0; i < RecordCount; ++i)
            {
				TimeSpan ts1 = new TimeSpan(DateTime.Now.Ticks);   
				TimeSpan ts2 = new TimeSpan(spfNews.SpfNews[i].updateTime.Ticks); 
				TimeSpan ts = ts1.Subtract(ts2).Duration();
				
				// string strA = null;
				// if ( ts.Days/365 > 0 ) strA = (ts.Days/365).ToString() + " 年之前";
				// else
				// {
					// if ( ts.Days/30 > 0 ) strA = (ts.Days/30).ToString() + " 月之前";
					// else
					// {
						// if ( ts.Days > 0 ) strA = ts.Days.ToString() + " 天之前";
						// else
						// {
							// if ( ts.Hours > 0 ) strA = ts.Hours.ToString() + " 小时之前";
							// else
							// {
								// if ( ts.Minutes > 0 ) strA = ts.Minutes.ToString() + " 分钟之前";
								// else
								// {
									// if ( ts.Seconds > 0 ) strA = ts.Seconds.ToString() + " 秒之前";
								// }
							// }
						// }
					// }
				// }
				//string strB = Function.getDateTimeLaterThan(spfNews.SpfNews[i].updateTime.Ticks);
				htmlstring += "<div class=\"art-post post-94269 post type-post status-publish format-standard hentry category-camera-lens tag-canon tag-ebay\">\n"
							+ "<div class=\"art-post-body\">\n"
							+ "<div class=\"art-post-inner art-article\">\n"
							+ "<div class=\"updatetime\">发布在 " + Function.getDateTimeLaterThan(spfNews.SpfNews[i].updateTime)
							+ "</div>\n"
							+ "<div class=\"art-article-up\">\n"
							+ "<h2 class=\"art-postheader\">"
							+ (i+1).ToString() + ". " + spfNews.SpfNews[i].newsTitle + "</h2>\n"
							+ "<div class=\"art-postcontent\">\n"
							+ spfNews.SpfNews[i].newsContent
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
		
		this.div_post.InnerHtml = htmlstring;
    }
}