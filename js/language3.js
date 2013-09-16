// JavaScript Document
/****************************************************
ʹ��֮ǰ����Ҫ�ѵ�ǰ����д�뵽COOKIE��
���磺document.cookie="language=en";

��Ҫ������ļ���Ҫ������JS�ļ���Ȼ��д����������ʼ���ֵ�
TranslateDictionary.XmlLoc("xmlfilename");
var value=_("key");

xml�ļ���ʽ
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
	            this.dict.set($.trim(itmmssage[i].getAttribute("msgid")), $.trim(itmmssage[i].getAttribute("msgstr")));
	        }
	        var itms = pagename.split("|");
	        for (var j = 0; j < itms.length; j++) 
            {
                var itm = req.responseXML.documentElement.getElementsByTagName(itms[j]);
	            for (var i = 0; i < itm.length; i++) {
	                this.dict.set($.trim(itm[i].getAttribute("msgid")), $.trim(itm[i].getAttribute("msgstr")));
	                getlangevalue($.trim(itm[i].getAttribute("msgid")), $.trim(itm[i].getAttribute("msgstr")));
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


//ҳ���������ָ�ֵ�ķ���
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


//���cookice
function addcookie(cookievalue) {
    var randomcode = Math.random() * 100000;
    var statuback = $.ajax({
        type: "Get",
        url: "/lang/cookieserver.aspx",
        data: "type=addcookie" + "&code=" + randomcode + "&language=" + cookievalue,
        async: false
    }).responseText;

}


//��ȡcookice

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

//ҳ�����԰����ó�ʼ��
var lanagexmlname = "";
var lanagepagename = "";
function startlange(name, pagename) {
    keys = new Array();
    values = new Array();
    var cookielang = getcookie();
    TranslateDictionary.XmlLoc(name, pagename);
    lanagexmlname = name;
    lanagepagename = pagename;
    replangconent();
}

    //�����л�ʱ����
    function langchangebya(values)
    {
        addcookie(values);
        startlange(lanagexmlname, lanagepagename);
        getlangevalue();
        replangconent();
    }
 

    //ҳ�涯̬ģ����Ӣ���л�
    var cnhtml = new Array();
    var enhtml = new Array();
    var DynamicInsert = 0;//�Ƿ��ж�̬ģ��
    var htmid = new Array(); //װ��ģ�������idȫ�ֱ���
    var langvaue = 'cn';
    var Dynamictemple = new Array();
    //hid װ��ģ�������id
    //starttag��̬ģ�忪ʼ��ǩ
    //endtag��̬ģ�������ǩ
    //enhtmidװ��Ӣ����Դ������id
    function getlangconent(hid,tag,enhtmid) {
        var starttag = '<!--' + tag + ':��ʼ-->';
        var endtag = '<!--' + tag + ':����-->'; 
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