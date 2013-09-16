// JavaScript Document
/****************************************************
使用之前首先要把当前语言写入到COOKIE中
例如：document.cookie="language=en";

需要翻译的文件需要包含该JS文件，然后写如下面语句初始化字典
TranslateDictionary.XmlLoc("xmlfilename");
var value=_("key");

xml文件格式
<po>
<message msgid="key" msgstr="value" />
</po>
****************************************************/
var TranslateDictionary = new TranslateDictionary();

 var keys = new Array();
 var values = new Array();

window._ = function (key) {
return TranslateDictionary.getText(key);};

function TranslateDictionary()
{
	this.dict=	new DictionaryBuffer();
	this.language = function () {
	    //	    var start, end;
	    //	    var cook = document.cookie;

	    //	    if (-1 == (start = cook.indexOf("language"))) return "/lang/cn";

	    //	    return "/lang/" + getCookie("language");
	    var cook = getcookie();

	    return "/lang/" + cook;

	};
	this.po="";


	this.XmlLoc = function (xmlfile,pagename) {
	    this.lang = this.language();
	    //this.po = window.location.protocol + "//" + window.location.host + "/" + this.lang + "/" + xmlfile + ".xml";
		this.po = window.location.protocol + "//" + window.location.host + "/" + "zhongxin/metro/lang/cn" + "/" + xmlfile + ".xml";
	    this.initDictionary(pagename);
	};
	this.initDictionary = function (pagename) {
	    var req;
	    try { req = new XMLHttpRequest(); } catch (e1) {
	        try { req = new ActiveXObject("Msxml2.XMLHTTP"); } catch (e2) {
	            try { req = new ActiveXObject("Microsoft.XMLHTTP"); } catch (e3)
				{ return; }
	        }
	    }
	    req.open("GET", this.po, false);
	    req.send(null);
	    if (req.status == 200) {
	        var itmmssage = req.responseXML.documentElement.getElementsByTagName("message");
	        for (var i = 0; i < itmmssage.length; i++) {
	            this.dict.set(itmmssage[i].getAttribute("msgid"), itmmssage[i].getAttribute("msgstr"));
	        }
	        var itms = pagename.split("|");
	        for (var j = 0; j < itms.length; j++) 
            {
                var itm = req.responseXML.documentElement.getElementsByTagName(itms[j]);
	            for (var i = 0; i < itm.length; i++) {
	                this.dict.set(itm[i].getAttribute("msgid"), itm[i].getAttribute("msgstr"));
	                getlangevalue(itm[i].getAttribute("msgid"), itm[i].getAttribute("msgstr"));
	            }
            }
	        

	    }
	};
	this.getText=function(key){ return this.dict.get(key);};
}

function DictionaryBuffer()
{
	keys=new Array();
	values=new Array();
	this.set = function (key, value) {
	    var existflag = 0;
	    for (var i = 0; i < keys.length; i++) {
	        if (key==keys[i]) { 
            existflag = 1;
            }
	        
	    }
	    if (0 == existflag) {
	        keys.push(key); values.push(value);
	    }
	};
	this.get=function(key){
		for(var i=0;i<keys.length;i++)
		{
			if(key==keys[i])
				return values[i];
		}
		return key;
	};
}


//页面语言文字赋值的方法
function getlangevalue(gid, gvalue) {

    if (gid == "pagetitle") {
        document.title = gvalue;
    }
    else {
        $(gid).val(gvalue);
        $(gid).html(gvalue);
        //alert($(gid).html());
    }
  
}


//添加cookice
function addcookie(cookievalue) {
    var randomcode = Math.random() * 100000;
    var statuback = $.ajax({
        type: "Get",
        url: "/lang/cookieserver.aspx",
        data: "type=addcookie" + "&code=" + randomcode + "&language=" + cookievalue,
        async: false
    }).responseText;

}


//获取cookice

function getcookie() {
    var randomcode = Math.random() * 100000;
    var statuback = $.ajax({
        type: "Get",
        url: "/lang/cookieserver.aspx",
        data: "type=getcookie" + "&code=" + randomcode ,
        async: false
    }).responseText;
    langvaue = statuback;
    return statuback;
}

//页面语言包调用初始化
var lanagexmlname = "";
var lanagepagename = "";
function startlange(name, pagename) {
    keys = new Array();
    values = new Array();
    var cookielang = getcookie();
    lanagexmlname = name;
    lanagepagename = pagename;
    replangconent();
    TranslateDictionary.XmlLoc(name, pagename);
}

    //语言切换时调用
    function langchangebya(values)
    {
        addcookie(values);
        getlangevalue();
        replangconent();
        startlange(lanagexmlname, lanagepagename);
    }
 

    //页面动态模板中英文切换
    var cnhtml = new Array();
    var enhtml = new Array();
    var DynamicInsert = 0;//是否有动态模板
    var htmid = new Array(); //装载模板的容器id全局变量
    var langvaue = 'cn';
    var Dynamictemple = new Array();
    //hid 装载模板的容器id
    //starttag动态模板开始标签
    //endtag动态模板结束标签
    //enhtmid装载英文资源的容器id
    function getlangconent(hid,tag,enhtmid) {
        var starttag = '<!--' + tag + ':开始-->';
        var endtag = '<!--' + tag + ':结束-->'; 
        var existflag = 0;
        for (var i = 0; i < htmid.length; i++) {
            if (hid == htmid[i]) {
                existflag = 1;
                return;
            }

        }
        if (0 == existflag) {
            htmid.push(hid);
           
        }
        else {
            return;
        }
        var starthtml = $(hid).html();
        
        var start = starthtml.indexOf(starttag);
        var end = starthtml.indexOf(endtag);
        start += starttag.length;
        cnhtml.push(starthtml.substring(start, end));
        Dynamictemple.push(starthtml.replace(starthtml.substring(start, end), '$langconent$'));
        enhtml.push($(enhtmid).val());
        DynamicInsert = 1;
        replangconent();
       
    }
    
    function replangconent() {
        if (DynamicInsert == 1) 
        {
            if (langvaue == 'cn') {
                for (var i = 0; i < htmid.length; i++) {
                    $(htmid[i]).html('');
                   
                    $(htmid[i]).html(Dynamictemple[i].replace('$langconent$', cnhtml[i]));
                   
                }
            }
            else if (langvaue == 'en') {
                for (var i = 0; i < htmid.length; i++) {
                    $(htmid[i]).html('');
                    $(htmid[i]).html(Dynamictemple[i].replace('$langconent$', enhtml[i]));
                    
                }
            }
        }

        try {
            htmlshow();
            

           
        }
        catch (e) {
           
        }

    }