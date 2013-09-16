/*
 * yyets javascript Library 1.0
 * http://www.yyets.com
 * author:wang chunyu
 * date:2011-09-16
 */
 
//全局命名空间
window.YYETS = window.YYETS || {};

//全局常量
YYETS.CONST = {
  WWW_URL: "http://"+window.location.host+"/", //开发机设置的规则是php是THINKPHP的入口
  RES_URL: "http://res.yyets.com/",
  IMG_URL: "http://res.yyets.com/ftp/",
  USER: {uid:0,nickname:''}
};

//快车ID
var _flashget_id_ = 13291;
//迅雷ID
var _thunder_id_ = 37361;

//Function原生对象扩展，支持链式调用
Function.prototype.method = function (name,fn){
  this.prototype[name] = fn;
  return this;
};
//扩展对象的equals方法，判断两个对象是否相等
function eq(obj,obj1){ 
  if(obj1 == obj)  return true;
    
  if(typeof obj =="undefined" || obj==null || typeof obj != "object") return false; 
  
  var length = 0; 
  var length1=0; 
  for(var ele in obj) { 
    length++; 
  }                
  for(var ele in obj1) { 
    length1++; 
  }                
  if(length != length1) return false; 
  
  if(obj.constructor == obj1.constructor){
    for(var ele in obj1){
      if(typeof obj1[ele] == "object") {
        if(!obj1[ele].equals(obj[ele])) return false; 
      }else if(typeof(obj1[ele]) == "function"){ 
        if(!obj1[ele].toString().equals(obj[ele].toString())) return false; 
      }else if(obj1[ele] != obj[ele]) 
        return false;
    } 
    return true; 
  } 
  return false; 
};
//Array原生对象扩展，增加forEach方法，用于遍历数组中对象
Array.prototype.forEach ||
  (Array.prototype.forEach = function(fn, arg){
    if (!typeof fn === "function") throw Error(fn + " is not a function");
    var len = this.length;
    for (var i = 0; i < len; ++i) {
      var current = this[i];
      if (current !== undefined || i in this) {
        fn.call(arg, current, i, this);
      }
    }
  });
//Array原生对象扩展，增加some方法，用于寻找数组中对象符合条件的对象，找到则返回true，否则返回false
Array.prototype.some ||
  (Array.prototype.some = function(fn,arg){
  if (!typeof fn === "function") 
    throw Error(fn + " is not a function");
  var len = this.length;
  for (var i = 0; i < len; ++i) {
    var current = this[i];
    if (i in this && fn.call(arg, current, i, this)) {
      return true;
    }
  }
  return false;
  });  
//Array原生对象扩展，增加indexOf方法，用于寻找数组中的对象，找到则返回该对象的索引，否则返回-1
Array.prototype.indexOf ||
  (Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {  
    "use strict";  
    if (this === void 0 || this === null) {  
      throw new TypeError();  
    }  
    var t = Object(this);  
    var len = t.length >>> 0;  
    if (len === 0) {  
      return -1;  
    }  
    var n = 0;  
    if (arguments.length > 0) {  
      n = Number(arguments[1]);  
      if (n !== n) { // shortcut for verifying if it's NaN  
        n = 0;  
      } else if (n !== 0 && n !== Infinity && n !== -Infinity) {  
        n = (n > 0 || -1) * Math.floor(Math.abs(n));  
      }  
    }  
    if (n >= len) {  
      return -1;  
    }  
    var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);  
    for (; k < len; k++) {  
      if (typeof t[k] == "object"){
        if (k in t && eq(t[k],searchElement)) {  
        //if (k in t && t[k].eqs(searchElement)) { 
          return k;
        }  
      }else{
        if (k in t && t[k] === searchElement) {  
          return k;  
        }  
      }
    }  
    return -1;  
  });
Array.prototype.filter ||
  (Array.prototype.filter = function(fun /*, thisp*/){
    var len = this.length >>> 0;
  if (typeof fun != "function")
      throw new TypeError();
  var res = [];
    var thisp = arguments[1];
    for (var i = 0; i < len; i++){
      if (i in this){
      var val = this[i]; // in case fun mutates this
      if (fun.call(thisp, val, i, this))
        res.push(val);
      }
    }
  return res;
  });
/*
 *模拟面向对象语言的extend功能
 */
function extend(subClass,superClass){
  var F = function(){};
  F.prototype = superClass.prototype;
  var subPro = subClass.prototype;
  subClass.prototype = new F();
  subClass.prototype.constructor = subClass;
  
  //把子类原型对象的方法再覆盖回去
  for (method in subPro){
    subClass.prototype[method] = subPro[method];
  }
}

/**
 *YYETS辅助包
 */
YYETS.Util = {
  substring: function(s,len){
    var len = len || 46;
    return s.length < len ? s : s.substring(0,len)+'...';
  },
  eq: function(obj,obj1){ 
    if(obj1 == obj)  return true; 
    
    if(typeof obj =="undefined" || obj==null || typeof obj != "object") return false; 
    
    var length = 0; 
    var length1=0; 
    for(var ele in obj) { 
      length++; 
    }                
    for(var ele in obj1) { 
      length1++; 
    }                
    if(length != length1) return false; 
    
    if(obj.constructor == obj1.constructor){
      for(var ele in obj1){
        if(typeof obj1[ele] == "object") {
          if(!obj1[ele].equals(obj[ele])) return false; 
        }else if(typeof(obj1[ele]) == "function"){ 
          if(!obj1[ele].toString().equals(obj[ele].toString())) return false; 
        }else if(obj1[ele] != obj[ele]) 
          return false;
      } 
      return true; 
    } 
    return false; 
  },
  formatNumber: function(n){
    return (/^\d$/.test(n)) ? "0"+n : n; 
  },
  formatUnit: function(n){
    if(/[^0-9\.]/.test(n)) return 0;
    var k = 1024;
    n = parseInt(n);
    if (isNaN(n)) return 0;
    if (n < k){
      return n.toFixed()+"B"; 
    }else if (n > k && n < k*k){ //KB
      return (n/k).toFixed(2)+"KB";
    }else if (n > k*k && n < k*k*k){ //MB
      return (n/(k*k)).toFixed(2)+"MB";
    }else if (n > k*k*k && n < k*k*k*k){ //GB
      return (n/(k*k*k)).toFixed(2)+"GB";
    }else{
      return 'over range';
    }
  },
  formatDate: function(str,dateNow) {
    var _now  = dateNow || Math.round(new Date().getTime()/1000);
    var _D   = new Date(_now*1000);
    var _M   = _D.getMonth()+1;
    var _DAY  = _D.getDate();
    var _T  = Math.round(_D.getTime()/1000);
    
    var _date = new Date(str*1000);
    var _m  = _date.getMonth()+1;
    var _day  = _date.getDate();
    var _t  = Math.round(_date.getTime()/1000);
    var _h  = _date.getHours()<10 ? 0+""+_date.getHours() : _date.getHours();
    var _mi = _date.getMinutes()<10 ? 0+""+_date.getMinutes() : _date.getMinutes();
    
    var sc = _M - _m -1;
    sc = sc>0 ? sc : 0;
    
    var dTime = _T - _t;
    var dDay  = 0;
    if (_M == _m)
      dDay  = _DAY - _day;
    else
      dDay  = 30-_m+sc*30+_M;
    if( dTime < 1 ){
      return "刚刚";
    }else if(dTime>0 && dTime < 60){
      return dTime+"秒前";
    }else if(dTime < 3600){
      return Math.round(dTime/60)+"分钟前";
    }else if(dTime >= 3600 && dDay == 0){
      return Math.floor(dTime/3600)+"小时前";
    }else if(dDay == 0) {
      return ""+_h+":"+_mi;
    }else{
      var month = _date.getMonth()+1;
      if(month<10) month = '0'+month;
      var date = _date.getDate();
      if(date<10) date = '0'+date;
      return _date.getFullYear()+'-'+month+"-"+date+" "+_h+":"+_mi;
    }
  },
  outputUrl: function(el){
    var type = $(el).attr("val");
    var str = '';
    var ed = [],ma = [];
    $(".resod_list").find("input:checked").each(function() {
        $(this).siblings().each(function(i,ele){
        if ($(ele).html() == '驴' && $(ele).attr('href')){
        ed.push($(ele).attr('href'));
        }
      if ($(ele).html() == '磁' && $(ele).attr('href')){
        ma.push($(ele).attr('href'));
        }
      });
      });
    
    if (type == 'ed'){
      str = ed.join('\n');
    }else if (type == 'ma'){
      str = ma.join('\n');
    }
    ZeroClipboard.setMoviePath(YYETS.CONST.RES_URL+'ZeroClipboard10.swf');
    var clip = new ZeroClipboard.Client();
    clip.setHandCursor(true);
    clip.setText(str);
    clip.addEventListener('complete', function (client) {
      alert("下载链接已经复制到剪切板，打开下载工具粘贴链接地址即可批量下载!");
    clip.destroy();
    });
    clip.glue($(el).attr('id'));
  },
  counter: function(channel,rid){
    $.getJSON(YYETS.CONST.WWW_URL+"public/view?channel="+channel+"&id="+rid);
  },
  getCookie: function(key){
    var arr = document.cookie.match(new RegExp("(^| )"+key+"=([^;]*)(;|$)"));
    if(arr != null) return decodeURIComponent(arr[2]); 
    return null;
  },
  setCookie: function(key,value,time){
    var exp  = new Date();
    var expires = '';
    if(time>0){
      time = time>0?time:(30*24*60*60*1000);//默认30天
      exp.setTime(exp.getTime() + time);
      expires = ";expires="+exp.toGMTString();
    }
    document.cookie = key+"="+escape (value)+expires;
  },
  delCookie: function(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = YYETS.Util.getCookie(name);
    if(cval != null) document.cookie = name+"="+cval+";expires="+exp.toGMTString();
  },
  noLogin: function(){
    //未登录
    var html = '<p class="f13"><strong>您需要登录才可以参与评分和投票</strong><br><br><strong><a class="f4 f13" href="'+YYETS.CONST.WWW_URL+'user/login">[立即登录]</a></strong><br><br><a class="bnts_r6" href="'+YYETS.CONST.WWW_URL+'user/reg">注册</a>&nbsp;&nbsp;&nbsp;&nbsp;</p>';
    YYETS.Dialog(html,{
      width: 400,
      title: "请登录"
    });
  },
  toJSON: function(object){
    var type = typeof object;
    if (object === null)return;
    if ('object' == type) {
      if (Array == object.constructor)
        type = 'array';
      else if (RegExp == object.constructor)
        type = 'regexp';
      else
        type = 'object';
    }
    
    switch (type) {
      case 'undefined':
      case 'unknown':
        return;
        break;
      case 'function':
        return;
        break;
      case 'boolean':
      case 'regexp':
        return object.toString();
        break;
      case 'number':
        return isFinite(object) ? object.toString() : 'null';
        break;
      case 'string':
        return '"' + object.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g,function() {
        var a = arguments[0];
        return (a == '\n') ? '\\n' :
          (a == '\r') ? '\\r' :
          (a == '\t') ? '\\t' : ""
          }) + '"';
        break;
      case 'object':
        if (object === null) return 'null';
        var results = [];
        for (var property in object) {
          var value = YYETS.Util.toJSON(object[property]);
          if (value !== undefined)
            results.push(YYETS.Util.toJSON(property) + ':' + value);
        }
        return '{' + results.join(',') + '}';
        break;
      case 'array':
        var results = [];
        for (var i = 0; i < object.length; i++) {
          var value = YYETS.Util.toJSON(object[i]);
          if (value !== undefined) results.push(value);
        }
        return '[' + results.join(',') + ']';
      break;
    }
  },
  clearWay: function(w){
    var str = ['请输入ED2K：//开头的地址','请输入Magnet:开头的地址','请贴上QVOD:// 开头的地址','请输入HTTP:// 开头和swf结尾的的flash地址','请输入HTTP:// 开头和swf结尾的的flash地址','请输入HTTP:// 开头和swf结尾的的flash地址'];
    for (k in str){
      if (str[k] == w) return "";
    }
    return w;
  },
  scrollTop: function(el){
    var docTop = $(document).scrollTop();
    var elTop = el instanceof jQuery ? el.offset().top : 0;
    if (docTop > elTop){
      if (elTop > 0){
        var top = docTop - elTop > 100 ? elTop - 100 : 0; //100为修正值   
      }else{
        var top = 0;
      }
      var timer = setInterval(function(){
        if ($(document).scrollTop() > top){
          $(document).scrollTop(Math.ceil($(document).scrollTop() - elTop*0.4));
        }else{
          clearInterval(timer);
        }       
      },1);
    }
  },
  //type: cn=>第1季 en=>S01
  formatSeason:function(season,type){
    season = parseInt(season);
    switch(season){
      case 0:
        season = '前传';
        break;
      case 101:
        season = '单剧';
        break;
      case 102:
        season = 'MINI剧';
        break;
      case 103:
        season = '周边资源';
        break;
      default:
        season = YYETS.Util.formatNumber(season);
        season = type=='cn'?'第'+season+'季':'S'+season;
    }
    return season;
  },
  //获得URI参数
  getParam:function(param,str){
    uri = str || window.location.search.slice(1);
    params = uri.split('&');
    regx = new RegExp(param+'=','gi');
    for(i=0;i<params.length;i++){
      pos = params[i].search(regx);
      if(pos==0){
        var value = params[i].replace(regx,'');
        return YYETS.Empty(value)?'':value;
      }
    }
    return '';
  }
};

/*
 *YYETS选项卡
 */
(function(Y){
  var _Tabs = function(){
    this.tabs = [];
    this.panels = [];
    this.selectedTab = 0;
    this.selectedCss = '';
    this.container = {};
    this.prefix = '';
    this.panels_container = {};
  };
  _Tabs.prototype = {
    //设置参数
    setOption: function(options){
      for (k in options)
        this[k] = options[k];
      return this;
    },
    init: function(options){
      this.setOption(options);
      this.clearup();
      var that = this;
      //这里是固定结构，如果改变页面布局，必须得改变选择器的方法
      this.panels_container.find("A").each(function(i,el){
        that.panels.push(el);
        that.tabs.push($(el).attr("href"));
      });
      this.panels_container.bind('click',function(e){
        if(e.target.tagName.toLowerCase()=='b'){
          e.target= e.target.parentNode;
        }
        if (e.target.tagName == "A"){
          var i = parseInt($(e.target).attr("href").replace("#"+that.prefix+"-",""));
          that.selected(i); 
          if (typeof options.callback == "function")
            options.callback(i,e.target);
        }
        return false;
      });
      //默认显示tab面板列表的第一项所指的内容
      if (that.panels.length > 0)
        this.reset().selected($(that.panels[0]).attr("href").replace("#"+that.prefix+"-",""));
    },
    selected: function(i){
      var that = this;
      if (i == this.selectedTab) return;
      this.panels.forEach(function(el){
        if ($(el).attr("href").replace("#"+that.prefix+"-","") == i){
          $(el).parent().addClass(that.selectedCss);
          $(el).addClass(that.selectedCss); //兼容模式
          that.selectedTab = i;
        }else{
          $(el).parent().removeClass(that.selectedCss);
          $(el).removeClass(that.selectedCss); //兼容模式
        }
      });
      this.tabs.forEach(function(el){
        if ($(el).attr("id")){
          if ($(el).attr("id").replace(that.prefix+"-","") == i)
            $(el).show();
          else
            $(el).hide();
        }
      });
    },
    edit: function(p){
      var that = this;
      this.panels.forEach(function(el){
        if ($(el).attr("val") == p){
          that.selected($(el).attr("href").replace("#"+that.prefix+"-",""));
        }
      });
    },
    reset: function(){
      var that = this;
      this.selectedTab = null;
      this.panels.forEach(function(el){
        $(el).removeClass(that.selectedCss);
      });
      this.tabs.forEach(function(el){
        $(el).hide();
      });
      return this;
    },
    clearup: function(){
      this.selectedTab = null;
      this.panels = [];
      this.tabs = [];
      return this;
    }
  };
  Y.Tabs = function(){
    return new _Tabs();
  };
})(YYETS);

/*
YYETS弹出对话框
*/
(function(Y){
  var _Dialog = function(content,options){
    var defaults = { // 默认值。 
      title:'标题',     // 标题文本，若不想显示title请通过CSS设置其display为none 
      showTitle:true,   // 是否显示标题栏。
      closeText:'[关闭]', // 关闭按钮文字，若不想显示关闭按钮请通过CSS设置其display为none
      classPrefix:'resource_dialog',    // class前缀 
      draggable:true,   // 是否移动 
      modal:true,     // 是否是模态对话框 
      center:true,    // 是否居中。 
      fixed:false,     // 是否跟随页面滚动。
      time:0,       // 自动关闭时间，单位为毫秒，为0表示不会自动关闭。
      width: 300,     //默认宽度
      id:false      // 对话框的id，若为false，则由系统自动产生一个唯一id。 
    };
    var options = $.extend(defaults, options);
    options.id = options.id ? options.id : 'dialog-' + _Dialog.__count; // 唯一ID
    var overlayId = options.id + '-overlay'; // 遮罩层ID
    var timeId = null;  // 自动关闭计时器 
    var isShow = false;
    var isIe = $.browser.msie;
    var isIe6 = $.browser.msie && ('6.0' == $.browser.version);
    //弹出对话框中表单域输入的值
    var forminputs = {};
  
    /* 对话框的布局及标题内容。*/
    var html = '<div id="' + options.id + '" class="'+options.classPrefix+'">';
    html += !options.showTitle ? '' :
    '<div class="bar"><span class="title">' + options.title + '</span><a class="close">' + options.closeText + '</a></div>';
    html += '<div class="content"></div>'
  
    //显示按钮区
    if (options.buttons){
      html += '<div class="buttons">';
      $.each(options.buttons,function(k,v){
        html += '<input type="button" name="dialog_'+k+'" value="'+v+'" class="btn" id="'+k+'" />';
      });
      html += '</div>';
    }
    html += '</div>';
    var dialog = $(html);
  
    /**
    * 重置对话框的位置。
    *
    * 主要是在需要居中的时候，每次加载完内容，都要重新定位
    *
    * @return void
    */
    var resetPos = function(){
      /* 是否需要居中定位，必需在已经知道了dialog元素大小的情况下，才能正确居中，也就是要先设置dialog的内容。 */
      if(options.center){
        var left = ($(window).width() - dialog.width()) / 2;
        var top = ($(window).height() - dialog.height()) / 2;
        if(!isIe6 && options.fixed){
          dialog.css({top:top,left:left});
        }else{
          dialog.css({top:top+$(document).scrollTop(),left:left+$(document).scrollLeft()});
        }
      }
    }
  
    /**
    * 初始化位置及一些事件函数。
    *
    * 其中的this表示Dialog对象而不是init函数。
    */
    var init = function(){
      $('body').append(dialog);
      /* 是否需要初始化背景遮罩层 */
      if(options.modal){
        $('body').append('<div id="' + overlayId + '" class="'+options.classPrefix+'-overlay"></div>');
        $('#' + overlayId).css({'left':0, 'top':0,
          'width':'100%',
          'height':$(document).height(),
          'z-index':++_Dialog.__zindex,
          'position':'absolute'
        }).hide();
      }
      dialog.css({'z-index':++_Dialog.__zindex, 'position':options.fixed ? 'fixed' : 'absolute','width':options.width+'px'});
  
      /*  IE6 兼容fixed代码 */
      if(isIe6 && options.fixed){
        dialog.css('position','absolute');
        resetPos();
        var top = parseInt(dialog.css('top')) - $(document).scrollTop();
        var left = parseInt(dialog.css('left')) - $(document).scrollLeft();
        $(window).scroll(function(){
          dialog.css({'top':$(document).scrollTop() + top,'left':$(document).scrollLeft() + left});
        });
      }
  
      /* 以下代码处理框体是否可以移动 */
      var mouse={x:0,y:0};
      function moveDialog(event){
        var e = window.event || event;
        var top = parseInt(dialog.css('top')) + (e.clientY - mouse.y);
        var left = parseInt(dialog.css('left')) + (e.clientX - mouse.x);
        dialog.css({top:top,left:left});
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      };
      dialog.find('.bar').mousedown(function(event){
        if(!options.draggable){  return; }
        var e = window.event || event;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        $(document).bind('mousemove',moveDialog);
      });
      $(document).mouseup(function(event){
        $(document).unbind('mousemove', moveDialog);
      });
  
      /* 绑定一些相关事件。 */
      var that = this;
      dialog.find('.close').bind('click', function(){that.close(false)});
      dialog.find('#ok').bind('click', function(){that.close(true)});
      dialog.find('#cancel').bind('click', function(){that.close(false)});
      dialog.bind('mousedown', function(){  dialog.css('z-index', ++_Dialog.__zindex); });
      
      // 自动关闭 
      if(0 != options.time)
        timeId = setTimeout(function(){that.close(false)}, options.time);
    };
  
    /**
    * 设置对话框的内容。 
    *
    * @param string c 可以是HTML文本。
    * @return void
    */
    this.setContent = function(c){
      var div = dialog.find('.content');
      if('object' == typeof(c)){
        switch(c.type.toLowerCase()){
          case 'id': // 将ID的内容复制过来，原来的还在。
            div.html($('#' + c.value).html());
            break;
          case 'img':
            div.html('加载中...');
            $('<img alt="" />').load(function(){
              div.empty().append($(this));
              dialog.width($(this).width()+10);
              resetPos();
            }).attr('src',c.value);
              break;
          case 'url':
            div.html('加载中...');
            if (c.delay){
              setTimeout(function(){
                $.ajax({
                  url: c.url,
                  data: c.param,
                  success: function(html){
                    div.html(html);resetPos();
                  },
                  error: function(xml,textStatus,error){
                    div.html('出错啦')
                  }
                });
              },c.delay);
            }else{
              $.ajax({
                url: c.url,
                data: c.param,
                success: function(html){
                  div.html(html);resetPos();
                },
                error: function(xml,textStatus,error){
                  div.html('出错啦')
                }
              });
            }
            break;
          case 'iframe':
            div.append($('<iframe src="' + c.value + '" />'));
            break;
          case 'text':
          default:
            div.html(c.value);
            break;
        }
      }else{
        div.html(c);
      }
    }
  
    /**
    * 显示对话框
    */
    this.show = function(){
      if(undefined != options.beforeShow && !options.beforeShow()) return;
    
      /**
       * 获得某一元素的透明度。IE从滤境中获得。
       *
       * @return float
       */
      var getOpacity = function(id){
        if(!isIe) return $('#' + id).css('opacity');
      
        var el = document.getElementById(id);
        return (undefined != el
          && undefined != el.filters
          && undefined != el.filters.alpha
          && undefined != el.filters.alpha.opacity)
          ? el.filters.alpha.opacity / 100 : 1;
      };
      /* 是否显示背景遮罩层 */
      if(options.modal)
        $('#' + overlayId).fadeTo('fast', getOpacity(overlayId));
    
      dialog.fadeTo('fast', getOpacity(options.id), function(){
        if(undefined != options.afterShow)
          options.afterShow();
        isShow = true;
      });
      // 自动关闭 
      var that = this;
      if(0 != options.time)
        timeId = setTimeout(function(){that.close(false)}, options.time);
      //重置位置
      resetPos();
    }
  
  
    /**
    * 隐藏对话框。但并不取消窗口内容。
    */
    this.hide = function(){
      if(!isShow) return;
      
      if(undefined != options.beforeHide && !options.beforeHide()) return;
      
      dialog.fadeOut('fast',function(){
        if(undefined != options.afterHide)
          options.afterHide();
      });
      if(options.modal)
        $('#' + overlayId).fadeOut('fast');
      isShow = false;
    }
  
    /**
    * 关闭对话框 
    *
    * @return void
    */
    this.close = function(f){
      var that = this;
      if(undefined != options.beforeClose && !options.beforeClose()) return;
      dialog.fadeOut('fast', function(){
        //获取表单域输入的值，传给回调函数
        that.getFormVal();
          
        $(this).remove();
        isShow = false;
        if(undefined != options.afterClose){
          options.afterClose(f,forminputs);
        }
      });
      if(options.modal)
        $('#'+overlayId).fadeOut('fast', function(){$(this).remove();});
      clearTimeout(timeId);
    }
    /**
    *获取表单域输入的值
    */
    this.getFormVal = function(){
      $.each($("#"+options.id).find(':input').serializeArray(), function(i, obj) {
        if(forminputs[obj.name] === undefined) {
          forminputs[obj.name] = obj.value;
        } else if( typeof forminputs[obj.name] == Array || typeof forminputs[obj.name] == 'object') {
          forminputs[obj.name].push(obj.value);
        } else {
          forminputs[obj.name] = [forminputs[obj.name], obj.value];
        }
      });
    }
  
    init.call(this);
    this.setContent(content);
    this.show();
    
    _Dialog.__count++;
    _Dialog.__zindex++;
  };
  _Dialog.__zindex = 999;
  _Dialog.__count = 1;
  Y.Dialog = function(message,options){
    return new _Dialog(message,options);
  }
})(YYETS);

/*
 * 数据列表工厂，根据datalistType来生成相应的数据列表对象，datalistType必须有值，如果只是使用默认数据列表，datalistType可以设置为''
 */
YYETS.DataListFactory = (function(){
  return {
  create: function(datalistType,container,ajax){
    var dataList = eval('new YYETS.'+datalistType+'DataList()');
    dataList.container = (container instanceof jQuery) ? container : $(container);
    dataList.ajax = ajax || {};
    return dataList;
  }
  };
})();

/**
 YYETS数据列表对象
 依赖相应的继承ListItem的对象
 */
YYETS.DataList = function(container,ajax){
  this.container = (container instanceof jQuery) ? container : $(container);
  this.list = [];
  this.ajax = ajax;
};
YYETS.DataList.prototype = {
  //添加一项数据到列表
  add: function(item,opt){
    //默认save选项为不保存
    var opt = opt || {save: false};
    this.list.push(item);
    if (opt.save){
      //保存到数据库
      item.save(this.ajax);
    }
    return this;
  },
  //对于有modified属性的列表项进行更新
  update: function(){
    var that = this;
    this.list.forEach(function(el,i){
      el.update(that.ajax);
    });
    return this;
  },
  //删除列表某一项，如果有回调函数则在删除时调用
  del: function(index,callback){
    if (typeof this.list[index] != "undefined"){
      if (this.ajax.del_url) this.list[index].del(this.ajax);
      if (callback) callback(this.list[index]);
      this.list.splice(index,1);
    }
    /*this.list.forEach(function(el,i){
      if (index == i){
        if (that.ajax.del_url) el.del(that.ajax);
        if (callback) callback(el);
        that.list.splice(i,1);
      }
    });*/
    return this;
  },
  //批量删除
  batchDel: function(bIndexs){
    var ids = [];
    for (i in bIndexs){
      if (typeof this.list[bIndexs[i]] != "undefined"){
        ids.push(this.list[bIndexs[i]].id);
      }
    }
    
    $.post(this.ajax.del_url,{rid:this.ajax.rid,itemid: ids.toString()},function(d){},"json");
    return this;
    /*var that = this;
    this.list.forEach(function(el,i){
      if (index == i){
        if (that.ajax.del_url) el.del(that.ajax);
        if (callback) callback(el);
        that.list.splice(i,1);
      }
    });
    return this;*/
  },
  //输出列表
  print: function(){
    this.container.html("");
    var that = this;
    if (this.getLength() > 0){
      this.list.forEach(function(el,i){
        el.print(that.container,{insert: true,index: i});
      });
    }else{
      this.noData();
    }
    return this;
  },
  //交换位置
  exchange: function(newList){
    if (newList.length != this.list.length) return;
    var len = newList.length;
    var tmp = [];
    for (i = 0; i < len; i++){
      tmp[i] = this.list[parseInt(newList[i].replace("item",""))];
      tmp[i].itemid = i;
    }
    this.list = [];
    this.list = tmp;
    this.print();
  },
  //获取列表长度
  getLength: function(){
    return this.list.length;
  },
  //保存排序结果
  sort: function(){
    var ids = [];
    this.list.forEach(function(el,i){
      ids[i] = {itemid: el.id, sequence: el.itemid};
    });
    $.post(this.ajax.sort_url,{ids:ids},function(d){
      if (d){
        if (d.success == 1){
          YYETS.Dialog("保存排序成功！",{
            time: 1000,
            showTitle: false,
            width: 150
          });
        }  
      }
    },"json");
  },
  //转化为json字符串形式
  getJSON:function(param){
    if (param){
      var json = "[";
      var tmp = [];
      this.list.forEach(function(el,i){
        tmp[i] = YYETS.Util.toJSON(el[param]);
      });
      json += tmp.join(",");
      json += "]";
      return json;
    }else{
      return YYETS.Util.toJSON(this.list);
    }
  },
  //输出列表值
  flush: function(callback){
    if (typeof callback !== "function") return;
    this.list.forEach(function(el,i){callback(el,i)});
    return this;
  },
  //利用callback查找是否存在某一条件的列表项，存在则返回true，否则返回false
  some: function(callback){
    return this.list.some(callback);
  },
  //寻找符合callback条件的某一列表项，存在则返回该列表项所在的索引，否则返回-1
  find: function(callback){
    var index = -1;
    this.list.forEach(function(el,i){
      if (callback(el))
        index = i;
    });
    return index;
  },
  //没有数据时显示信息
  noData: function(msg){
    var msg = msg || "暂无相关数据！";
    this.container.html(msg);
  },
  //清除列表，包括container内容
  clear: function(){
    this.list = [];
    this.container.html("");
    return this;
  }
};
//列表项抽象对象
var ListItem = function(itemid){
  this.itemid = itemid;
  this.modified = false;
  this.html;
};
ListItem.prototype = {
  //添加列表项
  save: function(ajax,callback){
    //由于this引用对象自身与jquery有冲突，所以只好转成JSON字符串然后再转回来
    var str = eval('('+this.getJSON()+')');
    var that = this;
    var data = {rid: ajax.rid,item: str};
    $.post(ajax.save_url,data,function(d){
      if (d.success == 1){
        that.id = d.itemid;
        if (callback)
          callback(d);
      }
    },"json");
  },
  //保存修改结果到数据库
  update: function(ajax){
    if (this.modified){
      //由于this引用对象自身与jquery有冲突，所以只好转成JSON字符串然后再转回来
      var str = eval('('+this.getJSON()+')');
      var that = this;
      var data = {rid: ajax.rid,item: str};
      $.post(ajax.update_url,data,function(d){
        if (d.success == 1)
          that.id = d.itemid;
      },"json");
      this.modified = false;
    }
  },
  //从数据库中删除该列表项
  del: function(ajax){
    $.post(ajax.del_url,{rid:ajax.rid,itemid: this.id},function(d){},"json");
    return this;
  },
  //返回自身的JSON格式字符串
  getJSON:function(param){
    return (typeof param == "undefined") ? YYETS.Util.toJSON(this) : YYETS.Util.toJSON(this[param]);
  }
}

//剧集数据列表
YYETS.TVDataList = function(container,ajax){
  //继承DataList
  YYETS.DataList.call(this,container,ajax);
  this.seasonSet = [];
  this.selectedList = [];
  this.m_html = $("#modify_container").html();
};
YYETS.TVDataList.prototype = {
  //获取数据
  fetch: function(param){
    var that = this;
    //重置列表
    that.clear();
    YYETS.Util.scrollTop(that.container);
    that.container.html("<p style='text-align:center'><img src='"+YYETS.CONST.RES_URL+"/images/loading.gif' /></p>");
    var format_name = [];
    $("#format").children().each(function(i, el) {
      format_name[$(el).attr("value")] = $(el).text();
    });
    
    var way_name = [];
    $("#way").children().each(function(i, el) {
      way_name[i] = {"id":$(el).find("#url").attr("wayid"),"name":$(el).find("#url").attr("name")};
    });
  
    //读取列表
    $.get(this.ajax.fetch_url,param,function(d){
      if (d){
        var len = d.length;
        for(var i = 0; i < len; i++){
          var way = [];
          way_name.forEach(function(el,index){
            var address = "";
            if (d[i].way != null){
              for (var ii = 0; ii < d[i].way.length; ii++){
                if (d[i].way[ii].way == el.id){
                  address = d[i].way[ii].address;
                  break;
                }
              }
            }
            way[index] = {"id":el.id,"name":el.name,"address":address};
          });
        
          var content = {
            "id": d[i].id,
            "name": d[i].name,
            "format": {"id":d[i].format,"text":format_name[d[i].format]},
            "size": d[i].size,
            "season": d[i].season,
            "episode": d[i].episode,
            "way": way,
            "user": d[i].nickname
          };
          that.add(new TVItem(i,content));
        }
        //数据列表加载完毕之后显示
        that.print();
      }
    },"json");
  },
  print: function(){
    //解除container上原有绑定的事件
    this.container.unbind("click");
    this.container.html("");
    this.setSeasonSet();
    $("#reset").trigger('click');
    var that = this;
    for (var key = 0; key < this.seasonSet.length; key++){
      var seasonStr = "";
      var cls = [];
      var s = YYETS.Util.formatSeason(this.seasonSet[key].season,'cn');
      var formats = '';
      this.seasonSet[key].format.forEach(function(el,i){
        cls[el.id] = i%2 == 0 ? "f9" : "f101";
        formats += '<a href="javascript:;" season="'+that.seasonSet[key].season+'" val="'+el.id+'">['+el.text+']</a>';
      });
      seasonStr += '<div class="order_orsc_tit"><font class="f0 f_r"><a href="javascript:;" id="batch_del">[删除选中]</a></font>'+(channel=='tv'||channel.value=='tv'?'<span class="blue_bg_1">'+s+'</span>':'')+'<strong class="f13">批量选择：</strong> '+formats+' <font class="f101">已选择<span id="sel'+that.seasonSet[key].season+'">0</span>个文件</font></div>';
      this.container.append(seasonStr);
      var ii = 0;
      this.list.forEach(function(el,i){
        if (el.season == that.seasonSet[key].season){
          el.print(that.container,{insert: false,index: i,num: ++ii,cls:cls});
        }
      });
    }
    //绑定单击事件，处理修改和删除操作
    this.container.bind("click",function(el){
      //修改
      if ($(el.target).attr("id") == "update"){
        var index = parseInt($(el.target).parent().parent().parent().parent().parent().attr("id").replace("item",""));
        var selected = that.list[index];
        $("#modify_container").remove();
        YYETS.Dialog(that.m_html,{
          buttons: {ok: "修改", cancel: "取消"},
          width: 700,
          afterClose: function(v,f){
            if (v){
              var format_name = [];
              $("#format").children().each(function(i, el) {
                format_name[$(el).attr("value")] = $(el).text();
              });
              var way_name = [];
              $("#way").children().each(function(i, el) {
                way_name[i] = {"id":$(el).find("#url").attr("wayid"),"name":$(el).find("#url").attr("name")};
              });
              var way = [];
              var size = 0;
              way_name.forEach(function(el,index){
                var address = "";
                for (var k in f){
                  var val = f[k];
                  if (k != "name" && k != "season" && k != "format" && k != "episode" && YYETS.Util.clearWay(val) != ""){
                    if (k == el.id){
                      address = val;
                      break;
                    }
                  }
                }
                if (el.id == 1){ //从电驴链接中读取文件大小，其他链接里没有文件大小信息
                  var tmp = address.split("|");
                  var name = decodeURI(tmp[2]);
                  size = tmp[3];
                }
                way[index] = {"id":el.id,"name":el.name,"address":address};
              });
              var content = {
                "name": f.name,
                "format": {"id":f.format,"text":format_name[f.format]},
                "size": size,
                "season": f.season,
                "episode": f.episode,
                "way": way,
                "user": YYETS.CONST.USER.nickname
              };
              //修改当前资源文件列表，并重新输出到页面
              that.list[index].modify(content).update(that.ajax);
              that.print();
            }
          }
        });
        $("input[id='m_url']").focus(function(e) {
          if (e.target.value.match(/^请/i)!=null && e.target.value == e.target.defaultValue){
            e.target.value = '';
          }
        }).blur(function(e) {
          if (e.target.value == '') e.target.value = e.target.defaultValue;
        });
        //为弹出输入框赋值
        $("#m_name").val(selected.name);
        $("#m_format").val(selected.format.id);
        $("#m_season").val(selected.season);
        $("#m_episode").val(selected.episode);
        selected.way.forEach(function(el,i){
          if (el.address != "") $("#m_way").find("#m_url").eq(i).val(el.address);
        });
      }
      //删除
      if ($(el.target).attr("id") == "del"){
        var index = parseInt($(el.target).parent().parent().parent().parent().parent().attr("id").replace("item",""));
        YYETS.Dialog("您确认删除该资源文件吗？",{
          buttons: {ok: "确认",cancel: "取消"},
          afterClose: function(v){
            if (v) that.del(index).print();
          }
        });
      }
      //选择
      if ($(el.target).attr("val")){
        var f = parseInt($(el.target).attr("val"));
        var s = $(el.target).attr("season");
        if ($(this).find("input[format='"+f+"_"+s+"']").eq(0).attr("checked")){
          $(this).find("input[format='"+f+"_"+s+"']").attr("checked",false);
        }else{
          $(this).find("input[format='"+f+"_"+s+"']").attr("checked",true);
        }
        $("#sel"+s).html($(this).find("input:checked").length);
      }
      //批量删除
      if ($(el.target).attr("id") == "batch_del"){
        YYETS.Dialog("您确认删除这些资源文件吗？",{
          buttons: {ok: "确认",cancel: "取消"},
          afterClose: function(v){
            if (v) {
              var bIndexs = [];
              that.container.find("input:checked").each(function(i,el){
                var index = $(el).val();
                bIndexs.push(index);
              });
              that.batchDel(bIndexs).print();
            }
          }
        });
      }
    });
    //对资源文件列表拖动排序
    this.container.sortable({
      items: "ul:not(.order_orsc_tit)",
      handle: ".line",
      stop: function(event, ui) {
        var result = that.container.sortable('toArray');
        that.exchange(result);
      }
    });
  },
  selectble_print: function(){
    //解除container上原有绑定的事件
    //this.container.unbind("click");
    this.container.html("");
    var that = this;
    this.setSeasonSet();
    for (var key = 0; key < this.seasonSet.length; key++){
      var seasonStr = "";
      var cls = [];
      this.seasonSet[key].format.forEach(function(el,i){
        cls[el.id] = i%2 == 0 ? "f9" : "f101";
      });
      var s = YYETS.Util.formatSeason(this.seasonSet[key].season,'cn');
      seasonStr += '<div class="order_orsc_tit"><span class="blue_bg_1">'+s+'</span></div>';
      this.container.append(seasonStr);
      var ii = 0;
      this.list.forEach(function(el,i){
        if (el.season == that.seasonSet[key].season){
          el.selectble_print(that.container,{index: i,cls:cls});
        }
      });
    }
    
    //绑定选择事件
    this.container.bind("click",function(el){
      //仅在checkbox上绑定单击事件
      if ($(el.target).attr("id") == "select_item"){
        var itemid = parseInt($(el.target).val().replace("item",""));
        var sel_num = $(el.target).parent().next();
        if ($(el.target).attr("checked") == "checked"){
          //这里保存的sel_item和sel_num是当时状态下的元素，在添加完下载链接之后，资源文件列表会重新显示，这两个元素已经失效，所以不会重新显示选中的号码
          that.selectedList.push({"itemid": itemid, "sel_item": $(el.target),"sel_num": sel_num});
        }else{
          that.selectedList.forEach(function(el,i){
            if (itemid == el.itemid){
              el.sel_num.html("");
              that.selectedList.splice(i,1);
            }
          });
        }
        //重新显示所选择对象序列号
        that.printSelNum();
      }
    });
    //对资源文件列表拖动排序
    this.container.sortable({
      items: "ul:not(.order_orsc_tit)",
      handle: ".line",
      stop: function(event, ui) {
        var result = that.container.sortable('toArray');
        that.exchange(result);
      }
    });
  },
  //重新显示所选择对象序列号
  printSelNum: function(){
    this.selectedList.forEach(function(el,i){
      if (el.sel_item.attr("checked") != "checked")
        el.sel_item.attr("checked","checked");
      el.sel_num.html(i+1);
    });
  },
  //设置播出季集合
  setSeasonSet: function(){
    var that = this;
    this.list.forEach(function(el,i){
      if (that.seasonSet.length == 0){
        that.seasonSet.push({"season":el.season,"format":[]});
        that.seasonSet[0].format.push(el.format);
      }else{
        var flag = 0;
        for (var ii = 0; ii < that.seasonSet.length; ii++){
          if (that.seasonSet[ii].season == el.season){
            var ff = 0;
            for (var x = 0; x < that.seasonSet[ii].format.length; x++){
              if (eq(that.seasonSet[ii].format[x],el.format)){
                ff = 1;
                break;
              }
            }
            if (!ff){
              that.seasonSet[ii].format.push(el.format);
            }
            flag = 1;
            break;
          }
        }
        if (!flag){
          that.seasonSet.push({"season":el.season,"format":[]});
          that.seasonSet[ii].format.push(el.format);
        }
      }
    });
    //that.seasonSet = that.seasonSet.sort();
  },
  update_way: function(ways){
    var that = this;
    this.selectedList.forEach(function(el,i){
      that.list.forEach(function(ele,ii){
        if (ele.itemid == el.itemid)
          ele.update_way(ways[i]).update(that.ajax);
      });
    });
    this.selectble_print();
    this.printSelNum();
  }
};
//TVDataList继承DataList
extend(YYETS.TVDataList,YYETS.DataList);

//资源列表项对象
var TVItem = function(itemid,content){
  //继承ListItem
  ListItem.call(this,itemid);
  this.itemid = itemid;
  
  if (typeof content == "object"){
    this.id = content.id;
    this.season = content.season;
    this.episode = content.episode;
    this.name = content.name;
    this.format = content.format;
    this.size = content.size;
    this.way = content.way;
    this.user = content.user;
  }
};
TVItem.prototype = {
  //输出到页面
  print: function(container,options){
    this.itemid = options.index || 0;
    var num = options.num || 1;
    container = (container instanceof jQuery) ? container : $(container);
    var way = "";
    var len = this.way.length;
    for (i = 0; i < len; i++){
      way += (this.way[i].address != "") ? "<a href='"+this.way[i].address+"'class='f3'>["+this.way[i].name+"]</a>"
        : "["+this.way[i].name+"]";
    }
    var s = YYETS.Util.formatSeason(this.season,'en');
    var html = '<li class="order_item"><span class="line"></span><div class="inf"><div class="h">'+(channel=='tv'||channel.value=='tv'?'<font class="f3">['+s+'E'+YYETS.Util.formatNumber(this.episode)+']</font>':'')+'<font class="'+options.cls[this.format.id]+'">['+this.format.text+']</font>'+this.name+'</div><p><span class="f_r"><font class="f3">'+this.user+'</font> <a href="javascript:void(0)" class="f3" id="update">[修改]</a><a href="javascript:void(0)" class="f3" id="del">[删除]</a></span>'+way+'</p></div></li>';
    html = '<ul class="order_orsc clearfix" id=item'+this.itemid+'><li class="order_num"><input type="checkbox" format="'+this.format.id+'_'+this.season+'" value="'+this.itemid+'" id="select_item" /><strong class="f1">'+num+'</strong></li>'+html+'</ul>';
    if (options.insert)
      container.prepend(html);
    else
      container.append(html);
    return this;
  },
  //专门为批量添加下载方式所做的输出方式
  selectble_print: function(container,options){
    this.itemid = options.index;
    container = (container instanceof jQuery) ? container : $(container);
    var way = "";
    var len = this.way.length;
    for (i = 0; i < len; i++){
      way += (this.way[i].address != "") ? "<a href='"+this.way[i].address+"'class='f3'>["+this.way[i].name+"]</a>"
        : "["+this.way[i].name+"]";
    }
    var s = YYETS.Util.formatSeason(this.season,'en');
    var html = '<li class="order_item"><span class="line"></span><div class="inf"><div class="h"><font class="f3">['+s+'E'+YYETS.Util.formatNumber(this.episode)+']</font><font class="'+options.cls[this.format.id]+'">['+this.format.text+']</font>'+this.name+'</div><p><span class="f_r"><font class="f3">'+this.user+'</font> <a href="javascript:void(0)" class="f3" id="update">[修改]</a><a href="javascript:void(0)" class="f3" id="del">[删除]</a></span>'+way+'</p></div></li>';
    html = '<ul class="order_orsc clearfix" id=item'+this.itemid+'><li class="order_num"><span><input type="checkbox" value="'+this.itemid+'" id="select_item" /></span><strong class="f1" id="select_num"></strong></li>'+html+'</ul>';
    if (options.insert)
      container.prepend(html);
    else
      container.append(html);
    return this;
  },
  //更新下载方式
  update_way: function(w){
    var that = this;
    this.way.forEach(function(el,i){
      if (w.id == el.id) that.way[i] = w;
    });
    //标识为有更新状态
    this.modified = true;
    return this;
  },
  //修改该列表项数据
  modify: function(content){
    this.name = content.name;
    this.format = content.format;
    this.season = content.season;
    this.episode = content.episode;
    this.way = content.way;
    this.user = content.user;
    this.modified = true;
    return this;
  }
};
//TVItem继承ListItem
extend(TVItem,ListItem);

//电影数据列表
YYETS.MovieDataList = function(container,ajax){
  //继承DataList
  YYETS.DataList.call(this,container,ajax);
  this.selectedList = [];
  this.m_html = $("#modify_container").html();
};
YYETS.MovieDataList.prototype = {
  //获取数据
  fetch: function(param){
    var that = this;
    //重置列表
    that.clear();
    YYETS.Util.scrollTop(that.container);
    that.container.html("<p style='text-align:center'><img src='"+YYETS.CONST.RES_URL+"/images/loading.gif' /></p>");
    var format_name = [];
    $("#format").children().each(function(i, el) {
      format_name[$(el).attr("value")] = $(el).text();
    });
    
    var way_name = [];
    $("#way").children().each(function(i, el) {
      way_name[i] = {"id":$(el).find("#url").attr("wayid"),"name":$(el).find("#url").attr("name")};
    });
  
    //读取列表
    $.get(this.ajax.fetch_url,param,function(d){
      if (d){
        var len = d.length;
        for(var i = 0; i < len; i++){
          var way = [];
          way_name.forEach(function(el,index){
            var address = "";
            if (d[i].way != null){
              for (var ii = 0; ii < d[i].way.length; ii++){
                if (d[i].way[ii].way == el.id){
                  address = d[i].way[ii].address;
                  break;
                }
              }
            }
            way[index] = {"id":el.id,"name":el.name,"address":address};
          });
          
          var content = {
            "id": d[i].id,
            "name": d[i].name,
            "format": {"id":d[i].format,"text":format_name[d[i].format]},
            "size": d[i].size || 0,
            "season": d[i].season,
            "episode": d[i].episode,
            "way": way,
            "user": d[i].nickname
          };
          that.add(new MovieItem(i,content));
        }
        //数据列表加载完毕之后显示
        that.print();
      }
    },"json");
  },
  //输出列表
  print: function(){
    //解除container上原有绑定的事件
    this.container.unbind("click");
    this.container.html("");
    var that = this;
    this.list.forEach(function(el,i){
      el.print(that.container,{insert: false,index: i});
    });
    //绑定单击事件，处理修改和删除操作
    this.container.bind("click",function(el){
      //修改
      if ($(el.target).attr("id") == "update"){
        var index = parseInt($(el.target).parent().parent().parent().parent().parent().attr("id").replace("item",""));
        var selected = that.list[index];
        $("#modify_container").remove();
        YYETS.Dialog(that.m_html,{
          buttons: {ok: "修改",cancel: "取消"},
          width: 700,
          afterClose: function(v,f){
            if (v){
              var format_name = [];
              $("#format").children().each(function(i, el) {
                format_name[$(el).attr("value")] = $(el).text();
              });
              var way_name = [];
              $("#way").children().each(function(i, el) {
                way_name[i] = {"id":$(el).find("#url").attr("wayid"),"name":$(el).find("#url").attr("name")};
              });
              var way = [];
              var size = 0;
              way_name.forEach(function(el,index){
                var address = "";
                for (var k in f){
                  var val = f[k];
                  if (k != "name" && k != "season" && k != "format" && k != "episode" && YYETS.Util.clearWay(val) != ""){
                    if (k == el.id){
                      address = val;
                      break;
                    }
                  }
                }
                if (el.id == 1){ //从电驴链接中读取文件大小，其他链接里没有文件大小信息
                  var tmp = address.split("|");
                  var name = decodeURI(tmp[2]);
                  size = tmp[3];
                }
                way[index] = {"id":el.id, "name":el.name, "address":address};
              });
              var content = {
                "name": f.name,
                "format": {"id":f.format,"text":format_name[f.format]},
                "size": size,
                "way": way,
                "user": YYETS.CONST.USER.nickname
              };
              //修改当前资源文件列表，并重新输出到页面
              that.list[index].modify(content).update(that.ajax);
              that.print();
            }
          }
        });
        $("input[id='m_url']").focus(function(e) {
          if (e.target.value.match(/^请/i)!=null && e.target.value == e.target.defaultValue){
            e.target.value = '';
          }
        }).blur(function(e) {
          if (e.target.value == '') e.target.value = e.target.defaultValue;
        });
        //为弹出输入框赋值
        $("#m_name").val(selected.name);
        $("#m_format").val(selected.format.id);
        selected.way.forEach(function(el,i){
          if (el.address != "") $("#m_way").find("#m_url").eq(i).val(el.address);
        });
      }
      //删除
      if ($(el.target).attr("id") == "del"){
        var index = parseInt($(el.target).parent().parent().parent().parent().parent().attr("id").replace("item",""));
        YYETS.Dialog("您确认删除该资源文件吗？",{
          buttons: {ok: "确认",cancel: "取消"},
          afterClose: function(v){
            if (v) that.del(index).print();
          }
        });
      }
      });
    //对资源文件列表拖动排序
    this.container.sortable({
      handle: ".line",
      stop: function(event, ui) {
        var result = that.container.sortable('toArray');
        that.exchange(result);
      }
    });
  }
};
//MovieDataList继承DataList
extend(YYETS.MovieDataList,YYETS.DataList);

//资源列表项对象
var MovieItem = function(itemid,content){
  //继承ListItem
  ListItem.call(this,itemid);
  this.itemid = itemid;
  
  if (typeof content == "object"){
    this.id = content.id;
    this.name = content.name;
    this.format = content.format;
    this.size = content.size;
    this.way = content.way;
    this.user = content.user;
  }
};
MovieItem.prototype = {
  //输出到页面
  print: function(container,options){
    $('#reset').trigger('click');
    this.itemid = options.index || 0;
    container = (container instanceof jQuery) ? container : $(container);
    var way = "";
    var len = this.way.length;
    for (i = 0; i < len; i++){
      way += (this.way[i].address != "") ? "<a href='"+this.way[i].address+"'class='f3'>["+this.way[i].name+"]</a>"
    : "["+this.way[i].name+"]";
    }
    var html = '<li class="order_item"><span class="line"></span><div class="inf"><div class="h"><font class="f9">['+this.format.text+']</font>'+this.name+'</div><p><span class="f_r"><font class="f3">'+this.user+'</font> <a href="javascript:void(0)" class="f3" id="update">[修改]</a><a href="javascript:void(0)" class="f3" id="del">[删除]</a></span>'+way+'</p></div></li>';
    
    html = '<ul class="order_orsc clearfix" id=item'+this.itemid+'><li class="order_num"><strong class="f1">'+(parseInt(this.itemid)+1)+'</strong></li>'+html+'</ul>';
    if (options.insert)
      container.prepend(html);
    else
      container.append(html);
    return this;
  },
  //修改该列表项数据
  modify: function(content){
    this.name = content.name;
    this.format = content.format;
    this.way = content.way;
    this.size = content.size;
    this.user = content.user;
    this.modified = true;
    return this;
  }
};
//MovieItem继承ListItem
extend(MovieItem,ListItem);

//播出状况数据列表
YYETS.SeasonScheduleDataList = function(container,ajax){
  //继承DataList
  YYETS.DataList.call(this,container,ajax);
  this.m_html = $("#season_modify_container").html();
};
YYETS.SeasonScheduleDataList.prototype = {
  //获取数据
  fetch: function(param){
    var that = this;
    //重置列表
    that.clear();
    //读取列表
    $.get(this.ajax.fetch_url,param,function(d){
      if (d){
        var len = d.length;
        for(var i = 0; i < len; i++){
          var content = {
            "id": d[i].id,
            "season": d[i].season,
            "premiere": d[i].premiere,
            "status": d[i].status,
            "sequence": d[i].sequence
          };
          that.add(new SeasonScheduleItem(i,content));
        }
        //数据列表加载完毕之后显示
        that.print();
      }
    },"json");
  },
  print: function(){
    //解除container上原有绑定的事件
    this.container.unbind("click");
    this.container.html("");
    var that = this;
    this.list.forEach(function(el,i){
      el.print(that.container,{insert: false,index: i});
    });
    //绑定单击事件，处理修改和删除操作
    this.container.bind("click",function(el){
      //修改
      if ($(el.target).attr("id") == "update"){
        var index = parseInt($(el.target).parent().attr("id").replace("item",""));
        var selected = that.list[index];
        $("#season_modify_container").remove();
        YYETS.Dialog(that.m_html,{
          buttons: {ok: "修改",cancel: "取消"},
          width: 700,
          afterClose: function(v,f){
            if (v){
              var content = {
                "season": f.season,
                "premiere": f.m_premiere,
                "status": f.status,
                "sequence": f.sequence
              };
              //修改当前数据项，并重新输出到页面
              that.list[index].modify(content);
              that.print();
            }
          }
        });
        //为弹出输入框赋值
        $("#m_season").val(selected.season);
        $("#m_premiere").val(selected.premiere);
        $("#m_status").val(selected.status);
      }
      //删除
      if ($(el.target).attr("id") == "del"){
        var index = parseInt($(el.target).parent().attr("id").replace("item",""));
        that.del(index).flush($("#season_val")).print();
      }
    });
    this.flush($("#season_val"));
  },
  //输出数组到隐藏值域
  flush: function(valueElement){
    valueElement.val(this.getJSON());
    return this;
  }
};
//SeasonScheduleDataList继承DataList
extend(YYETS.SeasonScheduleDataList,YYETS.DataList);

//资源列表项对象
var SeasonScheduleItem = function(itemid,content){
  //继承ListItem
  ListItem.call(this,itemid);
  this.itemid = itemid;
  
  if (typeof content == "object"){
    this.id = content.id || 0;
    this.season = content.season;
    this.premiere = content.premiere;
    this.status = content.status;
    this.sequence = content.sequence;
  }
};
SeasonScheduleItem.prototype = {
  //输出到页面
  print: function(container,options){
    this.itemid = options.index || 0;
    container = (container instanceof jQuery) ? container : $(container);
    var s = YYETS.Util.formatSeason(this.season,'cn');
    var html = '<li id=item'+this.itemid+'><span class="line"></span><font class="w_s_1">'+s+' </font><font class="w_s_2">首播：'+this.premiere+'</font><font class="w_s_3">状态：'+status_name[this.status]+'</font><a href="javascript:void(0)" class="close" id="del">close</a><a href="javascript:void(0)" class="bnts_y2" id="update"><b>+</b>修改</a></li>';
    if (options.insert)
      container.prepend(html);
    else
      container.append(html);
    return this;
  },
  //修改该列表项数据
  modify: function(content){
    this.season = content.season;
    this.premiere = content.premiere;
    this.status = content.status;
    this.modified = true;
    return this;
  }
};
//SeasonScheduleItem继承ListItem
extend(SeasonScheduleItem,ListItem);

//时间表数据列表
YYETS.ScheduleDataList = function(container,ajax){
  //继承DataList
  YYETS.DataList.call(this,container,ajax);
  this.m_html = $("#modify_container").html();
};
YYETS.ScheduleDataList.prototype = {
  //获取数据
  fetch: function(){
    var that = this;
    //重置列表
    this.clear();
    //读取列表
    $.get(this.ajax.fetch_url,{rid: that.ajax.rid},function(d){
      if (d){
        var len = d.length;
        for(var i = 0; i < len; i++){
          var content = {
            "id": d[i].id,
            "season": d[i].season,
            "episode": d[i].episode,
            "time": d[i].play_time,
            "status": d[i].status
          };
          that.add(new ScheduleItem(i,content));
        }
        //数据列表加载完毕之后显示
        that.print();
      }
    },"json");
  },
  print: function(){
    //解除container上原有绑定的事件
    this.container.unbind("click");
    this.container.html("");
    var that = this;
    var prevTime = 0;
    this.list.forEach(function(el,i){
      var ctime = '';
      var time = 0;
      if (el.time){
        var weeks = new Array("周日","周一","周二","周三","周四","周五","周六");
        var curDate = new Date();
        var cd = Math.round(curDate.getTime()/1000);
        var cdate = curDate.getFullYear()+'-'+YYETS.Util.formatNumber(curDate.getMonth()+1)+'-'+curDate.getDate();
        var y = el.time.substr(0,4);
        var md = el.time.substr(5,5);
        var date = md.replace('-','/')+'/'+y;
        var time = Date.parse(date)/1000;
        if (prevTime > 0 && time - cd > 0 && prevTime - cd < 0){
          ctime += '<li class="no_style"><strong class="bnts_y3" href="javascript:void(0);"><em>当前时间 '+cdate+' '+weeks[curDate.getDay()]+'</em></strong></li>';
        }
        prevTime = time;
      }
      el.print(that.container,{insert: false,index: i,ctime:ctime});
    });
    //绑定单击事件，处理修改和删除操作
    this.container.bind("click",function(el){
      //修改
      if ($(el.target).attr("id") == "update"){
        var index = parseInt($(el.target).parent().attr("id").replace("item",""));
        var selected = that.list[index];
        $("#modify_container").remove();
        YYETS.Dialog(that.m_html,{
          buttons: {ok: "修改",cancel: "取消"},
          width: 700,
          afterClose: function(v,f){
            if (v){
              var content = {
                "season": f.season,
                "episode": f.episode,
                "time": f.time,
                "status": f.status,
                "user": $("#operator").val()
              };
              //修改当前数据项，并重新输出到页面
              that.list[index].modify(content).update(that.ajax);
              that.print();
            }
          }
        });
        //为弹出输入框赋值
        $("#m_season").val(selected.season);
        $("#m_episode").val(selected.episode);
        $("#m_time").val(selected.time);
        $("#m_status").val(selected.status);
      }
      //删除
      if ($(el.target).attr("id") == "del"){
        var index = parseInt($(el.target).parent().attr("id").replace("item",""));
        YYETS.Dialog("您确认删除吗？",{
          buttons: {ok: "确认",cancel: "取消"},
          afterClose: function(v){
            if (v) that.del(index).print();
          }
        });
      }
    });
    //对资源文件列表拖动排序
    this.container.sortable({
      handle: ".line",
      stop: function(event, ui) {
        var result = that.container.sortable('toArray');
        that.exchange(result);
      }
    });
  }
};
//ScheduleDataList继承DataList
extend(YYETS.ScheduleDataList,YYETS.DataList);

//资源列表项对象
var ScheduleItem = function(itemid,content){
  //继承ListItem
  ListItem.call(this,itemid);
  this.itemid = itemid;
  
  if (typeof content == "object"){
    this.id = content.id || 0;
    this.season = content.season;
    this.episode = content.episode;
    this.time = content.time;
    this.status = content.status;
    this.user = content.user;
  }
};
ScheduleItem.prototype = {
  //输出到页面
  print: function(container,options){
    this.itemid = options.index || 0;
    container = (container instanceof jQuery) ? container : $(container);
    var s = YYETS.Util.formatSeason(this.season,'cn');
    var html = options.ctime+'<li id=item'+this.itemid+'><span class="line"></span><font class="w_s_1">'+s+' 第<b class="f1">'+this.episode+'</b>集</font><font class="w_s_2">播出时间：'+this.time+'</font><font class="w_s_3">状态：'+status_name[this.status]+'</font><a href="javascript:void(0)" class="close" id="del">close</a><a href="javascript:void(0)" class="bnts_y2" id="update"><b>+</b>修改</a></li>';
    if (options.insert)
      container.prepend(html);
    else
      container.append(html);
    return this;
  },
  //修改该列表项数据
  modify: function(content){
    this.season = content.season;
    this.episode = content.episode;
    this.time = content.time;
    this.status = content.status;
    this.modified = true;
    return this;
  }
};
//ScheduleItem继承ListItem
extend(ScheduleItem,ListItem);

//资源列表项对象
var AnalysisItem = function(itemid,content){
  //继承ListItem
  ListItem.call(this,itemid);
  this.itemid = itemid;
  
  if (typeof content == "object"){
    this.season = content.season;
    this.episode = content.episode;
    this.name = content.name;
    this.size = content.size;
    this.format = content.format;
    this.way = content.way;
    this.user = content.user;
  }
};
AnalysisItem.prototype = {
  //输出到页面
  print: function(container){
    $('#reset').trigger('click');
    container = (container instanceof jQuery) ? container : $(container);
    var s = YYETS.Util.formatSeason(this.season,'en');
    var html = '<li class="order_item"><span class="line"></span><div class="inf"><div class="h"><font class="f3">['+s+'E'+YYETS.Util.formatNumber(this.episode)+']</font><font class="f9">['+this.format.text+']</font>'+this.name+'</div></div></li>';
    
    html = '<ul class="order_orsc clearfix" id=item'+this.itemid+'>'+html+'</ul>';
    container.append(html);
    return this;
  }
};
//AnalysisItem继承ListItem
extend(AnalysisItem,ListItem);
/*
 *YYETS类库的定制选择组件
 *使用方法：实例化YYETS.Selection，设置选中值保存的域，然后为待选择元素列表外层容器添加click方法即可；例子：
 *sel = new YYETS.Selection;
 *sel.setValueElement("#category").setSelectedListContainer("#category_container");
 *$("#container").click(function (el){
 *  sel.selectFromClick(el.target).flushValue().printSelectedList();
 *});
 *
 */

//可选择化列表项对象，用于添加资源类型，语言等功能
var SelectionItem = function(itemid,content){
  //继承ListItem
  ListItem.call(this,itemid);
  this.itemid = itemid;
  if (typeof content == "object"){
    this.id = content.id;
    this.name = content.name;
  }
};
SelectionItem.prototype = {
  print: function(container,options){
    this.itemid = options.index || 0;
    container = (container instanceof jQuery) ? container : $(container);
    var html = "<a href=\"javascript:void(0);\" itemid='"+this.itemid+"' id='"+this.id+"'><span>"+this.name+"</span></a>";
    container.append(html);
  },
  del: function(){
  //数据列表对象需要调用该函数，在此不需要处理
  }
};
//SelectionItem继承ListItem
extend(SelectionItem,ListItem);
 
YYETS.Selection = function(){
  this.selectedList = [];
  this.selectedClass = 'selected';
  this.currentElement = {};
  this.valueElement = {};
  this.container = {};
};
YYETS.Selection.prototype = {
  //初始化，设置参数
  init: function(options){
    for (k in options){
      this[k] = options[k];
    }
    return this;
  },
  //入口方法，判断当前选中对象是否被选中，如选中则从选中列表中删除，否则添加到选中列表
  selectFromClick: function(el){
    //解除container上原有绑定的事件
    //this.container.unbind("click");
    var that = this;
    //在container上绑定单击事件，处理添加和删除操作
    this.container.click(function(el){
      that.setCurrentElement(el.target);
      if (that.isSelected()){
        that.unselect();
      }else{
        that.select();
      }
      that.flush();
    });
  },
  //去掉一个选择的元素
  deleteByItemid: function(index,id){
    var that = this;
    var cur = this.container.find("a[itemid='"+id+"']");
    this.setCurrentElement(cur);
    this.currentElement.removeClass(this.selectedClass);
    this.selectedList.del(index).print();
    this.flush();
    return this;
  },
  //检查当前选中对象是否已被选中
  isSelected: function(){
    var that = this;
    return this.selectedList.some(function(el,i){
      return that.currentElement.attr("itemid") === el.id;
    });
  },
  //设置当前选中对象
  setCurrentElement: function(el){
    var el = (el instanceof jQuery) ? el : $(el);
    this.currentElement = el;
    return this;
  },
  //选中某一项
  select: function(){
    this.currentElement.addClass(this.selectedClass);
    var index = this.selectedList.getLength();
    this.selectedList.add(new SelectionItem(index,{"id":this.currentElement.attr("itemid"),"name":this.currentElement.text()})).print();
    return this;
  },
  //去掉选中项
  unselect: function(){
    var that = this;
    this.currentElement.removeClass(this.selectedClass);
    var index = 0;
    index = this.selectedList.find(function(el,i){
      return that.currentElement.attr("itemid") == el.id;
    });
    this.selectedList.del(index).print();
    return this;
  },
  //编辑用函数
  editflush:function(valueStr){
    if (valueStr != ''){
      var that = this;
      var tmp = valueStr.split(",");
      this.container.children().each(function(i,el){
        for (k in tmp){
          if (tmp[k] == $(el).attr("itemid"))
          that.setCurrentElement(el).select();
        }
      });
      this.flush();
    }
  },
  //输出选中的值到保存值得隐藏域
  flush: function(){
    this.valueElement.val(this.selectedList.getJSON("id"));
    if(this.valueElement.next("td")){
      this.valueElement.next("td").html("");
    }
    return this;
  }
};

YYETS.SingleSelection = function(){
  this.selectedClass = 'selected';
  this.selectedElement;
  this.valueElement = {};
  this.selectedValue = {};
  this.selectedListContainer = {};
  this.validateElement;
};
YYETS.SingleSelection.prototype = {
  //初始化，设置参数
  init: function(options){
    for (k in options){
      this[k] = options[k];
    }
    return this;
  },
  //设置元素选中后的class
  setSelectedClass: function(className){
    this.selectedClass = className;
    return this;
  },
  //入口方法，判断当前选中对象是否被选中，如选中则从选中列表中删除，否则添加到选中列表
  selectFromClick: function(el){
    if (this.isSelected(el)){
      this.unselect();
    }
    this.setSelectedElement(el).select();
    return this;
  },
  deleteByItemid: function(itemid){
    if (itemid === this.selectedElement.attr("itemid")){
      this.unselect();
    }
    return this;
  },
  //检查当前选中对象是否已被选中
  isSelected: function(el){
    if (this.selectedElement !== "undefined") return false;
    var el = (el instanceof jQuery) ? el : $(el);
    if (el.attr("itemid") === this.selectedElement.attr("itemid")) return true;
    return false;
  },
  //设置当前选中对象
  setSelectedElement: function(el){
    var el = (el instanceof jQuery) ? el : $(el);
    this.selectedElement = el;
    return this;
  },
  //设置保存值的隐藏域
  setValueElement: function(el){
    var el = (el instanceof jQuery) ? el : $(el);
    this.valueElement = el;
    return this;
  },
  //设置选中列表显示的容器对象
  setSelectedListContainer: function(el){
    var el = (el instanceof jQuery) ? el : $(el);
    this.selectedListContainer = el;
    return this;
  },
  //选中某一项
  select: function(){
    this.selectedElement.siblings().removeClass(this.selectedClass);
    this.selectedElement.addClass(this.selectedClass);
    this.selectedValue = this.selectedElement.attr("itemid");
    return this;
  },
  //去掉选中项
  unselect: function(){
    this.selectedElement.removeClass(this.selectedClass);
    this.selectedElement = {};
    this.selectedValue = {};
    return this;
  },
  //输出选中的值到保存值得隐藏域
  flushValue: function(){
    this.valueElement.val(YYETS.Util.toJSON(this.selectedValue).replace(/"/g,'')); //toJSON方法解析字符串会带双引号，用replace方法去掉
    if(this.valueElement.next("td")){
      this.valueElement.next("td").html("");
    }
    return this;
  },
  printSelectedList: function(){
    this.selectedListContainer.html("");
    if (this.selectedElement instanceof jQuery){
      var list_item = "<div itemid='"+this.selectedElement.attr("itemid")+"'>"+this.selectedElement.text()+"<span class='del'>X</span></div>";
      this.selectedListContainer.append(list_item);
    }
    return this;
  }
};

/*
弹出对话框选取资源，使用了三个组件，弹出对话框YYETS.Dialog,分页类YYETS.Pagination,数据列表类YYETS.DataListFactory
*/
(function(Y){
  var _RelatedResource = function(options){
    this.pagination = {};
    this.datalist = {};
    this.container = {};
    this.dialogHtml = '<div class="popSearch"><input type="text" id="keyword" /><input type="button" id="search" value="搜索" /></div><div id="result"><span style="color:#aaaaaa">请输入关键字搜索您所需要的资源</span></div><div id="page_container"></div>';
    this.setOption(options).init();
  };
  _RelatedResource.prototype = {
    //设置参数
    setOption: function(options){
      for (k in options){
        this[k] = options[k];
      }
      return this;
    },
    //入口方法，重置关联区内容，绑定添加事件
    init: function(){
      this.container.html('<input type="button" class="bnts_r5" value="搜索添加对应的影片" id="add" />');
      $("#selectedItem").val("");
      var that = this;
      this.container.find("#add").click(function(){
        that.relateDialog();
      });
    },
    setResource: function(robj){
      var that = this;
      this.container.html("");
      $("#selectedItem").val(robj.id);
      var html = '<div class="boxPADD"><div class="f_l f_l_img"><img src="'+robj.pic+'" width="110" height="145" alt="" /></div><div class="f_r_info"><ul class="n_relateRES"><li><span>中 文 名：</span><strong>'+robj.cnname+'（'+robj.channel+'）</strong></li><li><span>英 文 名：</span>'+robj.enname+'</li><li><span>年  代：</span>'+robj.year+'</li><li><span>地区语言：</span>'+robj.area+'/'+robj.lang+'</li><li><span>类  型：</span>'+robj.categorys+'</li><li><span>导  演：</span>'+robj.directors+'</li><li><span>主  演：</span>'+robj.actors+'</li></ul><div class="t_r"><a href="javascript:void(0)" class="bnts_r2" id="modify">修改</a> <a href="javascript:void(0)" class="bnts_r2" id="del">删除</a></div></div></div><span class="l_t"></span><span class="l_b"></span><span class="r_t"></span><span class="r_b"></span>';
      this.container.append(html);
      //绑定修改和删除事件
      this.container.find("#modify").click(function(){
        that.relateDialog();
      });
      this.container.find("#del").click(function(){
        that.init();
      });
    },
    relateDialog: function(){
      var that = this;
      YYETS.Dialog(this.dialogHtml,{
        buttons: {ok: "添加",cancel: "关闭"},
        width: 700,
        afterClose: function(v,f){
          if (v){
            that.datalist.relate(that);
          }
          that.datalist.clear();
        }
      });
      var s = $(".resource_dialog").find("#search");
      var k = $(".resource_dialog").find("#keyword");
      var r = $(".resource_dialog").find("#result");
      this.datalist = YYETS.DataListFactory.create("RelatedResource",r,{fetch_url: YYETS.CONST.WWW_URL+"release/resource/getlist"});
      this.pagination = YYETS.Pagination({
        pagesize: 4,
        offset: 5,
        className: {page: "pages2",current: "cur"},
        datalist: that.datalist,
        container: $(".resource_dialog").find("#page_container")
      });
      s.unbind("click");
      s.bind("click",function(){
        if (k.val() != ""){
          that.pagination.setParam({keyword: k.val()}).page();
        }
      });
    }
  
  };
  Y.RelatedResource = function(options){
    return new _RelatedResource(options);
  };
})(YYETS);

//关联资源数据列表
YYETS.RelatedResourceDataList = function(container,ajax){
  //继承DataList
  YYETS.DataList.call(this,container,ajax);
};
YYETS.RelatedResourceDataList.prototype = {
  //输出
  print: function(total){
    var that = this;
    this.container.append('<div class="popSearchResult">搜索到<b class="f11" id="counts">'+total+'</b>个结果，请选择符合你要求的结果</div>');
    //显示数据列表
    this.list.forEach(function(el,i,list){
      el.print(that.container,list);
    });
  },
  //关联资源
  relate: function(rl){
    var that = this;
    this.list.forEach(function(el,i){
      if (el.selected)
        el.relate(rl);
    });
  },
  //获取数据
  fetch: function(param,pagination){
    var that = this;
    //重置列表
    that.clear();
    YYETS.Util.scrollTop(that.container);
    that.container.html("<p style='text-align:center'><img src='"+YYETS.CONST.RES_URL+"/images/loading.gif' /></p>");
    $.get(this.ajax.fetch_url,param,function(d){
      that.clear();
      if (d && d.res){
        d.res.forEach(function(el,i){
          var content = {
            id: el.id,
            cnname: el.cnname || "",
            enname: el.enname || "",
            area: el.area || "",
            channel: el.channel || "",
            pic: el.poster || "",
            year: el.publish_year || "",
            lang: el.lang || "",
            category: el.category || "",
            directors: el.directors || "",
            actors: el.actors || "",
            writers: el.writers || ""
          };
          that.add(new RelatedResourceItem(i,content));
        });  
        that.print(d.counts);
        pagination.setOption({total: d.counts}).print();
      }
    },"json");
  }
};
extend(YYETS.RelatedResourceDataList,YYETS.DataList);

//资源列表项对象
var RelatedResourceItem = function(itemid,content){
  //继承ListItem
  ListItem.call(this,itemid);
  this.itemid = itemid;
  
  if (typeof content == "object"){
    this.id = content.id;
    this.channel = content.channel;
    this.cnname = content.cnname;
    this.enname = content.enname;
    this.year = content.year;
    this.area = content.area;
    this.lang = content.lang;
    this.category = content.category;
    this.pic = content.pic;
    this.directors = content.directors;
    this.actors = content.actors;
    this.writers = content.writers;
  }
};
RelatedResourceItem.prototype = {
  //输出到页面
  print: function(container,list){
    var that = this;
    container = (container instanceof jQuery) ? container : $(container);
    var html = '<div class="resultBox resultBox2"><div class="resultList" id="item'+this.itemid+'"><div class="f_l_img"><img src="'+YYETS.CONST.IMG_URL+this.pic+'" width="88" height="116"  /></div><div class="f_r_info"><ul><li><strong>中文名：</strong>'+this.cnname+'（'+this.channel+'）</li><li><strong>英文名：</strong>'+this.enname+'</li><li><strong>年&nbsp;&nbsp;代：</strong>'+this.year+'</li><li><strong>地区/语言23：</strong>'+this.area+'/'+this.lang+'</li><li><strong>类&nbsp;&nbsp;型：</strong>'+this.category+'</li><li><strong>导&nbsp;&nbsp;演：</strong>'+this.directors+'</li><li><strong>主&nbsp;&nbsp;演：</strong>'+this.actors+'</li><li><strong>编&nbsp;&nbsp;剧：</strong>'+this.writers+'</li></ul></div></div></div><div class="blank clearfix"></div>';
    
    container.append(html);
    $("#item"+this.itemid).click(function(){
      list.forEach(function(el,i){
        el.unselect();
      });
      that.select();
    });
    return this;
  },
  select: function(){
    $("#item"+this.itemid).addClass("cur");
    this.selected = true;
    this.flush();
  },
  unselect: function(){
    $("#item"+this.itemid).removeClass("cur");
    this.selected = false;
  },
  relate: function(rl){
    rl.container.html("");
    var html = '<div class="boxPADD movieAdded clearfix"><div class="f_l f_l_img"><img src="'+YYETS.CONST.IMG_URL+this.pic+'" width="110" height="145" alt="" /></div><div class="f_r_info"><ul class="n_relateRES"><li><span>中 文 名：</span><strong>'+this.cnname+'（'+this.channel+'）</strong></li><li><span>英 文 名：</span>'+this.enname+'</li><li><span>年  代：</span>'+this.year+'</li><li><span>地区/语言：</span>'+this.area+'/'+this.lang+'</li><li><span>类  型：</span>'+this.category+'</li><li><span>导  演：</span>'+this.directors+'</li><li><span>主  演：</span>'+this.actors+'</li><li><strong>编&nbsp;&nbsp;剧：</strong>'+this.writers+'</li></ul><div class="t_r"><a href="javascript:void(0)" class="bnts_r2" id="modify">修改</a> <a href="javascript:void(0)" class="bnts_r2" id="del">删除</a></div></div></div><span class="l_t"></span><span class="l_b"></span><span class="r_t"></span><span class="r_b"></span>';
    rl.container.append(html);
    //绑定修改和删除事件
    rl.container.find("#modify").click(function(){
      rl.relateDialog();
    });
    rl.container.find("#del").click(function(){
      rl.init();
    });
  
  },
  //输出选中的值到保存值得隐藏域
  flush: function(){
    $("#selectedItem").val(this.id);
    return this;
  }
};
//RelatedResourceItem继承ListItem
extend(RelatedResourceItem,ListItem);

/*
YYETS分页对象
*/
(function(Y){
  var _Pagination = function(options){
    this.total = 0;
    this.currentPage = 1;
    this.pagesize = 20;
    this.offset = 10;
    this.datalist = {};
    this.className = {};
    this.container = {};
    this.param = {};
    this.setOption(options);
  };
  _Pagination.prototype = {
    //设置选项
    setOption: function(options){
    for (k in options){
    this[k] = options[k];
    }
    return this;
    },
    //设置参数
    setParam: function(param){
      this.param = {};
      for (k in param){
        if (typeof param[k] != "undefined")
          this.param[k] = param[k];
      }
      return this;
    },
    print: function(){
      this.container.html("");
      if (this.currentPage < 1) return;
      var pages = Math.ceil(this.total / this.pagesize);
      var prevPage = this.currentPage == 1 ? 1 : this.currentPage-1;
      var nextPage = this.currentPage == pages ? pages : this.currentPage+1;
      var start = this.currentPage-3 > 0 ? this.currentPage-3 : 1;
      var end = this.currentPage+(this.offset-3) < pages ? this.currentPage+(this.offset-3) : pages;
      var html = '<div id="pagination" class="'+this.className.page+'">';
      html += this.currentPage > 1 ? '<a href="javascript:void(0)" id="'+prevPage+'">上一页<span></span></a>' : '';
      if (start > 1)
        html += '<a href="javascript:void(0)" id="1">1<span></span></a><span>...</span>';
        for(var i = start; i <= end; i++){
        html += '<a href="javascript:void(0)" id="'+i+'" '+((i == this.currentPage) ? 'class="'+this.className.current+'"' : '')+'>'+i+'<span></span></a>';
      }
      if (end < pages)
        html += '<span>...</span><a href="javascript:void(0)" id="'+pages+'">'+pages+'<span></span></a>';
      html += this.currentPage < pages ? '<a href="javascript:void(0)" id="'+nextPage+'">下一页<span></span></a>' : '';
      html += '</div>';
      this.container.append(html);
      //绑定单击事件，处理翻页
      var that = this;
      this.container.find("#pagination").click(function(e){
        if ($(e.target).attr("id") != "pagination"){
          that.currentPage = parseInt($(e.target).attr("id"));
          that.page();
        }
      });
    },
    page: function(){
      this.param.page = this.currentPage;
      this.param.pagesize = this.pagesize;
      this.datalist.fetch(this.param,this);
      return this;
    }
  };
  Y.Pagination = function(options){
    return new _Pagination(options);
  };
})(YYETS);

/*
就地编辑组件
*/
(function(Y){
  var _EditIn = function(options){
    this.container = {};
    this.editHtml = '';
    this.content = '';
    this.ajax = {};
    this.setOption(options);
  };
  _EditIn.prototype = {
    init: function(content){
      this.content = content;
      this.toText();
      return this;
    },
    //设置参数
    setOption: function(options){
      for (k in options){
        this[k] = options[k];
      }
      return this;
    },
    //进入编辑状态
    toEdit: function(){
      var that = this;
      this.editHtml = '<textarea id="content">'+this.content+'</textarea><div class="t_c"><a class="bnts_e18" href="javascript:void(0)" id="save">保存</a><a class="bnts_e18" href="javascript:void(0)" id="cancel">取消</a></div>';
      this.container.html(this.editHtml);
      //绑定保存和取消事件
      this.container.find("#save").click(function(){
        that.content = that.container.find("#content").val();
        that.save();
      });
      this.container.find("#cancel").click(function(){
        that.toText();
      });
    },
    //进入文本显示状态
    toText: function(){
      var that = this;
      var content = this.content || '<a class="f3" href="javascript:void(0)">点击开始写备忘笔记!</a>';
      this.container.html('<p style="cursor:pointer;" title="点击修改">'+content+'</p>');
      //绑定编辑事件
      this.container.find("P").click(function(){
        that.toEdit();
      });
    },
    //保存结果
    save: function(){
      var that = this;
      $.post(this.ajax.url,{content: this.content,rid: this.ajax.rid},function(d){
        if (d.nologin == 1){
          YYETS.Util.noLogin();
        }else{
          that.toText();
        }
      },"json");
      return this;
    }
  };
  Y.EditIn = function(options){
    return new _EditIn(options);
  };
})(YYETS);

//资源数据列表
YYETS.ResourceDataList = function(container,ajax){
  //继承DataList
  YYETS.DataList.call(this,container,ajax);
};
YYETS.ResourceDataList.prototype = {
  //获取数据
  fetch: function(param,pagination){
    var that = this;
    //重置列表
    that.clear();
    YYETS.Util.scrollTop(that.container);
    that.container.html("<p style='text-align:center'><img src='"+YYETS.CONST.RES_URL+"/images/loading.gif' /></p>");
    $.get(this.ajax.fetch_url,param,function(d){
      that.clear();
      if (d.res){
        d.res.forEach(function(el,i){
          var content = {
            id: el.id,
            cnname: el.cnname || '',
            channel: el.channel,
            remark: el.remark || '',
            formats: el.formats || '',
            cates: el.cates || '',
      rank: el.rank || '无',
            counts: el.counts || 0,
            updatetime: el.updatetime,
            score: el.score,
            items: el.items || undefined,
            dateline: el.ddd,
            views: el.views,
            favorites: el.favorites || 0,
            poster: el.poster,
            play_status: el.play_status
          };
          that.add(new ResourceItem(i,content));
        });  
        that.print();
        pagination.setOption({total: d.counts}).print();
      }else{
        that.noData("没有找到您所需要的资源，请重新搜索！");
      }
    },"json");
  }
};
extend(YYETS.ResourceDataList,YYETS.DataList);

//资源数据列表项对象
var ResourceItem = function(itemid,content){
  //继承ListItem
  ListItem.call(this,itemid);
  this.itemid = itemid;
  if (typeof content == "object"){
    this.id = content.id;
    this.cnname = content.cnname;
    this.channel = content.channel;
    this.remark = content.remark;
    this.formats = content.formats;
    this.cates = content.cates;
  this.rank = content.rank;
    this.counts = content.counts;
    this.updatetime = content.updatetime;
    this.score = content.score;
    this.items = content.items;
    this.dateline = content.dateline;
    this.views = content.views;
    this.favorites = content.favorites;
    this.poster = content.poster;
    this.play_status = content.play_status;
  }
};
ResourceItem.prototype = {
  print: function(container,options){
    var that = this;
    this.itemid = options.index || 0;
    container = (container instanceof jQuery) ? container : $(container);
  var c_class = '',_season='';
  if (this.channel == '电视剧') c_class = 'f101'; 
  if (this.channel == '电影') c_class = 'f3';
  if(!YYETS.Empty(this.play_status)) _season = '['+this.play_status+']';
    var html = '<li class="clearfix"><div class="f_l_img"><a href="'+YYETS.CONST.WWW_URL+'resource/'+this.id+'" class="imglink" target="_blank"><img src="'+YYETS.CONST.IMG_URL+this.poster+'" /></a><br>TOP:<font class="'+c_class+'">'+this.rank+'</font></div><div class="f_r_info"><dl><dt><a href="'+YYETS.CONST.WWW_URL+'resource/'+this.id+'" target="_blank">【'+this.channel+'】<strong class="f14">《'+this.cnname+'》'+_season+'</strong></a></dt><dd class="list_a"><span class="span1">【说明】 '+this.remark+'</span><span>【类型】 '+this.cates+'</span><span class="span1">【人气】 '+this.views+'次浏览 | '+this.favorites+'次收藏 | '+this.score+'分</span><span>【更新】 '+YYETS.Util.formatDate(this.updatetime)+'| '+this.dateline+'| '+this.formats+'</span></dd>';
    if (typeof this.items == "object" && this.items.length > 0){
      html += '<dd class="list_b">';
      this.items.forEach(function(el,i){
        html += '<p><a href="'+YYETS.CONST.WWW_URL+'resource/'+that.id+'" target="_blank">【'+el.format+'】'+YYETS.Util.substring(el.name)+'('+(YYETS.Util.formatUnit(el.size) || 0)+')</a></p>';
      });
      html += '</dd>';
    }
    html += '</dl></div></li>';
    container.append(html);
  }
};

//字幕数据列表
YYETS.SubtitleDataList = function(container,ajax){
  //继承DataList
  YYETS.DataList.call(this,container,ajax);
};
YYETS.SubtitleDataList.prototype = {
  //获取数据
  fetch: function(param,pagination){
    var that = this;
    //重置列表
    that.clear();
    YYETS.Util.scrollTop(that.container);
    that.container.html("<p style='text-align:center'><img src='"+YYETS.CONST.RES_URL+"/images/loading.gif' /></p>");
    $.get(this.ajax.fetch_url,param,function(d){
      that.clear();
      if (d.res){
        d.res.forEach(function(el,i){
          var content = {
            id:el.id,
            cnname:el.cnname|| '',
            enname:el.enname,
            lang:el.lang,
            format:el.format,
            segment:el.segment,
            source:el.source,
            type:el.type,
            remark:el.remark,
            downloads:el.downloads,
            operator:el.operator,
            dateline:el.dateline,
            translation:el.translation,
            check:el.check,
            timeline:el.timeline,
            production:el.production,
            general:el.general
          };
          that.add(new SubtitleItem(i,content));
        });  
        that.print();
        pagination.setOption({total: d.counts}).print();
      }
    },"json");
  }
};
extend(YYETS.SubtitleDataList,YYETS.DataList);

//字幕数据列表项对象
var SubtitleItem = function(itemid,content){
  //继承ListItem
  ListItem.call(this,itemid);
  this.itemid = itemid;
  if (typeof content == "object"){
    this.id = content.id;
    this.cnname = content.cnname||'';
    this.enname = content.enname||'';
    this.lang = content.lang||'';
    this.format = content.format||'';
    this.segment = content.segment||'';
    this.source = content.source||'';
    this.type = content.type||'';
    this.remark = content.remark||'';
    this.downloads = content.downloads||0;
    this.operator = content.operator||'';
    this.dateline = content.dateline||0;
    this.translation = content.translation||'';
    this.check = content.check||'';
    this.timeline = content.timeline||'';
    this.production = content.production||'';
    this.general = content.general||'';
  }
};
SubtitleItem.prototype = {
  print: function(container,options){
    this.itemid = options.index || 0;
    container = (container instanceof jQuery) ? container : $(container);
    var html = '<li class="clearfix">';
    html += '<dl>';
    html += ' <dt><font class="f14"><strong><a class="f7" href="'+YYETS.CONST.WWW_URL+'subtitle/'+this.id+'" target="_blank">【'+this.type+'】'+this.cnname+'('+this.enname+')</a></strong></font></dt>';
    html += '<dd class="list_a">';
    html += ' <span class="span1">【语种】'+this.lang+'</span> ';
    html += ' <span>【版本】'+this.segment+'</span> ';
    html += '  <span class="span1">【格式】 '+this.format+'</span>';
    if(this.source == "人人影视字幕组原创翻译"){
      html += '  <span>【来源】 <b class="f1 f13">'+this.source+'</b></span> ';
    }else{
      html += '  <span>【来源】 <b>'+this.source+'</b></span> ';
    }
    html += '  <span class="span1">【统计】'+this.downloads+'次下载 </span>';               
    html += '   <span>【发布】'+YYETS.Util.formatDate(this.dateline)+' 由'+this.operator+'更新</span>'; 
    html += '  </dd>';
    html += '  <dd><div class="list_b_mid">';
    if(this.source == "人人影视字幕组原创翻译"){
      html += '  <div class="box">';
      html += '   <p><strong>制作人员名单</strong></p>';
      if (this.general) html += '   <div>总监：'+this.general+'</div>';
      if (this.check) html += '  <div>校对：'+this.check+'</div>';
      if (this.translation) html += '  <div>翻译：'+this.translation+'</div>';
      if (this.timeline) html += '  <div>时间轴：'+this.timeline+'</div>';
      if (this.production) html += '  <div>后期：'+this.production+'</div>';
      html += ' </div>';
      html += '  <br>';
    }
    html += '  <div class="box">';
    html += '   <p><strong>备注</strong></p>';
    html += '  <div>'+this.remark+'</div>';
    html += '  </div></div>';
    html += '   </dd>';
    html += '  </dl> ';
    html += '</li>';
    container.append(html);
  }
};
//SubtitleItem继承ListItem
extend(SubtitleItem,ListItem);
//电影大全资源数据列表
YYETS.MovieResourceDataList = function(container,ajax){
  //继承DataList
  YYETS.DataList.call(this,container,ajax);
};
YYETS.MovieResourceDataList.prototype = {
  //获取数据
  fetch: function(param,pagination){
    var that = this;
    //重置列表
    that.clear();
    YYETS.Util.scrollTop(that.container);
    that.container.html("<p style='text-align:center'><img src='"+YYETS.CONST.RES_URL+"/images/loading.gif' /></p>");
    $.get(this.ajax.fetch_url,param,function(d){
      that.clear();
      if (d.res){
        d.res.forEach(function(el,i){
          var content = {
            id: el.id,
            cnname: el.cnname || '',
            enname: el.enname || '',
            area: el.area || '',
            rank: el.rank || '无',
            premiere: el.premiere || '',
            actors: el.actors || '',
            directors: el.directors || '',
            favorite: el.favorite || '',
            formats: el.formats || '',
            cates: el.cates || '',
            counts: el.counts || 0,
            updatetime: el.updatetime||'',
            content:el.content||"",
            score: el.score > 0 ? el.score : 'N/A',
            dateline: el.ddd||'',
            watched: el.watched||0,
            views: el.views||0,
            poster: el.poster||''
          };
          that.add(new MovieResourceItem(i,content));
        });  
        that.print();
        pagination.setOption({total: d.counts}).print();
      }
    },"json");
  }
};
extend(YYETS.MovieResourceDataList,YYETS.DataList);

//电影大全资源数据列表项对象
var MovieResourceItem = function(itemid,content){
  //继承ListItem
  ListItem.call(this,itemid);
  this.itemid = itemid;
  if (typeof content == "object"){
    this.id = content.id;
    this.cnname = content.cnname;
    this.enname = content.enname;
    this.area = content.area;
    this.rank =  content.rank,
    this.premiere = content.premiere;
    this.actors = content.actors;
    this.directors = content.directors;
    this.favorite = content.favorite;
    this.formats = content.formats;
    this.cates = content.cates;
    this.counts = content.counts;
    this.updatetime = content.updatetime;
    this.score = content.score;
    this.content = content.content;
    this.watched = content.watched;
    this.dateline = content.dateline;
    this.views = content.views;
    this.poster = content.poster;
  }
};
MovieResourceItem.prototype = {
  print: function(container,options){
    this.itemid = options.index || 0;
    container = (container instanceof jQuery) ? container : $(container);
    var html = '<li class="clearfix">';
    html += '<div class="f_l_img">';
    html += '<a class="imglink" href="'+YYETS.CONST.WWW_URL+'resource/'+this.id+'"><img src="'+YYETS.CONST.IMG_URL+this.poster+'"></a><br>';
    html += '<strong>排名：'+this.rank+'</strong>';
    html += '</div>';
    html += '<div class="f_r_info">';
    html += '<dl>';
    var flag = new Date(this.premiere.substring(0,10)).getTime() > new Date().getTime();
    html += ' <dt class="f14"><strong><a href="'+YYETS.CONST.WWW_URL+'resource/'+this.id+'" target="_blank">'+this.cnname+'('+this.enname+')</a></strong>';
    if(flag){
      html += '<font class="f5 f14">未上映</font></dt>';
    }else{
      html += '<font class="f5 f14">已上映</font></dt>';
    }
    
    html += '<dd class="list_a">';
    html += '<div><span>导  演：</span> '+this.directors+'</div>';
    html += '<div><span>主  演：</span>  '+this.actors+'</div>';
    html += '<div><span>类  型：</span>  '+this.cates+'</div>';
    html += '<div><span>上  映：</span>  '+this.premiere+' '+this.area;
    if(flag){
      html +='(距首播还有<b class="f1">'+(Math.abs(this.sd(this.premiere.substring(0,10)))+1)+'</b>天)';
    }
    html +='</div>';
    html += '<div><span>资  源：</span>  '+this.formats+'</div>';
    html += '</dd>';
    html += '<dd class="list_b">';
    html += this.content.substring(0,100);
    html += '</dd>';
    html += '</dl>';
    html += '</div>';
    html += '<div class="f_r_info2">';
    html += '<font class="'+(this.score > 5 ? 'fb' : 'fa')+'">'+this.score+'</font><br><br>';
    html += ' <font class="fc">'+this.watched+'人想看</font><br>';
    html += ' <font class="fc">'+this.favorite+'人收藏</font>';
    html += '</div>';
    html += '</li>';
    container.append(html);
  },
  sd: function(d2) { 
    x=d2.split('-');
    if(x[1]==1){
      x[0]--;
      x[1]=13;
    };
    x[1]--;
    return parseInt(((new Date()).valueOf()-(new Date(x[0],x[1],x[2])).valueOf())/(24*3600*1000)); 
  } 
};


//剧集大全资源数据列表
YYETS.TvResourceDataList = function(container,ajax){
  //继承DataList
  YYETS.DataList.call(this,container,ajax);
};
YYETS.TvResourceDataList.prototype = {
  //获取数据
  fetch: function(param,pagination){
    var that = this;
    //重置列表
    that.clear();
    YYETS.Util.scrollTop(that.container);
that.container.html("<p style='text-align:center'><img src='"+YYETS.CONST.RES_URL+"/images/loading.gif' /></p>");
    $.get(this.ajax.fetch_url,param,function(d){
      that.clear();
      if (d.res){
        d.res.forEach(function(el,i){
        var content = {
          id: el.id,
          cnname: el.cnname || '',
          enname: el.enname,
          tvstation: el.tvstation || '',
          area: el.area,
          rank: el.rank || '无',
          desc: el.content || '',
          premiere: el.premiere || '',
          actors: el.actors || '',
          favorite: el.favorite || '',
          formats: el.formats || '',
          cates: el.cates || '',
          counts: el.counts || 0,
          updatetime: el.updatetime||'',
          score: el.score > 0 ? el.score : 'N/A',
          watched: el.watched,
          dateline: el.ddd||'',
          views: el.views||0,
          poster: el.poster||''
        };
        that.add(new TvResourceItem(i,content));
        });  
        that.print();
        pagination.setOption({total: d.counts}).print();
      }
    },"json");
  }
};
extend(YYETS.TvResourceDataList,YYETS.DataList);

//剧集大全资源数据列表项对象
var TvResourceItem = function(itemid,content){
  //继承ListItem
  ListItem.call(this,itemid);
  this.itemid = itemid;
  if (typeof content == "object"){
    this.id = content.id;
    this.cnname = content.cnname;
    this.enname = content.enname;
    this.tvstation = content.tvstation;
    this.area = content.area;
    this.rank = content.rank;
    this.desc = content.desc;
    this.premiere = content.premiere;
    this.actors = content.actors;
    this.favorite = content.favorite;
    this.formats = content.formats;
    this.cates = content.cates;
    this.counts = content.counts;
    this.updatetime = content.updatetime;
    this.score = content.score;
    this.dateline = content.dateline;
    this.watched = content.watched;
    this.poster = content.poster;
  }
};
TvResourceItem.prototype = {
  print: function(container,options){
    this.itemid = options.index || 0;
    container = (container instanceof jQuery) ? container : $(container);
    var html = '<li class="clearfix">';
    html += '<div class="f_l_img">';
    html += '<a class="imglink" href="'+YYETS.CONST.WWW_URL+'resource/'+this.id+'" target="_blank"><img src="'+YYETS.CONST.IMG_URL+this.poster+'"></a><br>';
    html += ' <strong>排名：'+this.rank+'</strong>';
    html += ' </div>';
    html += ' <div class="f_r_info">';
    html += '<dl>';
    var flag = new Date(this.premiere.substring(0,10)).getTime() > new Date().getTime();
    html += ' <dt class="f14"><strong><a href="'+YYETS.CONST.WWW_URL+'resource/'+this.id+'" target="_blank">'+this.cnname+'('+this.enname+')</a></strong>';
    if(flag){
      html += '<font class="f5 f14">未播出</font></dt>';
    }else{
      html += '<font class="f5 f14">已播出</font></dt>';
    }
    html += '  <dd class="list_a">';
    html += '<div><span>电视台：</span> '+this.tvstation+'</div>';
    html += ' <div><span>主  演：</span> '+this.actors+'</div>';
    html += ' <div><span>类  型：</span> '+this.cates+'</div>';
    html += ' <div><span>播  出：</span> '+this.premiere+' '+this.area+'</div>';
    html += '<div><span>资  源：</span> '+this.formats+'</div>';
    html += ' </dd>';
    html += '<dd class="list_b">'+this.desc+'</dd>';
    html += '</dl> ';
    html += '</div>';
    html += ' <div class="f_r_info2">';
    html += '<font class="'+(this.score > 5 ? 'fb' : 'fa')+'">'+this.score+'</font><br><br>';
    html += ' <font class="fc">'+this.watched+'人想看</font><br>';
    html += ' <font class="fc">'+this.favorite+'人收藏</font>';
    html += ' </div>';
    html += '</li>';
    container.append(html);
  }
};

/*
资源评分组件
*/
YYETS.Score = (function(){
  var uid,rid,myscore;
  var evaluate_tips = ['&lt;看了后悔','&lt;浪费时间','&lt;不妨一看','&lt;上乘佳作','&lt;完美神作'];
  
  //读取评分数据
  function score(){
    $.post(YYETS.CONST.WWW_URL+"resource/getScore",{rid:rid},function(d){
      if (d){
        var score_star = '';
        $("#score").html(d.score);
        if (d.score == 'N/A'){
          for(var i = 0; i < 5; i++)
            score_star += '<font class="star_c"></font>';
        }else{
          var f = Math.floor(d.score/2);
          for(var i = 0; i < 5; i++){
            if (i < f)
              score_star += '<font class="star_a"></font>';
            if (i == f && i*2 != d.score)
              score_star += '<font class="star_b"></font>';
            if (i > f || i*2 == d.score)
              score_star += '<font class="star_c"></font>';
          }
        }
        $("#score_star").html(score_star);
        $("#score_counts").html(d.score_counts);
        if (d.score_detail && d.score_detail.length === undefined){
          var detail = "";
          for(k in d.score_detail){
            detail += '<div class="star2">';
            for(i = 1;i < 6; i++){
              if (i <= parseInt(k)){
                detail += '<font class="star_d"></font>';
              }else{
                detail += '<font class="star_e"></font>';
              }
            }
            //计算比例
            var cnt = d.score_detail[k] || 0;
            var rate = Math.round(d.score_detail[k]/d.score_counts*100);
            var width = Math.round(rate/100*80);
            detail += '<span style="width:'+width+'px;"></span><font class="f5">'+rate+'% '+cnt+'票</font>';
            detail += '</div>';
          };
          $("#score_detail").html(detail);
        }
        if (d.myscore && d.myscore.score > 0){ //设置当前用户评分
          uid = d.myscore.uid;
          myscore = Math.floor(d.myscore.score/2)-1;
          showMyScore();
        }
        /*if (d.myscore && d.myscore.watched){ //设置当前用户评分
          if (d.myscore.watched == "watched"){
            $("#see").css({"font-weight":"bold", "font-size":"14px", "color":"#008BBE", "border":"1px solid #CBD6E0"}).html("您已观看过此片");
            $("#nosee").html("[标记为未看]");
            $("#nosee").click(function(){
              $.get(YYETS.CONST.WWW_URL+"resource/watched",{rid:rid,watched:"want"},function(dd){
                if (dd.nologin == 1){ //未登录
                  YYETS.Util.noLogin();
                }else{
                  $("#user_watched").find("#want").attr("class","bnts_r6");
                  $("#user_watched").find("#watched").attr("class","bnts_r7");
                  $("#user_watched").find("#want").siblings("font").html(dd.want);
                  $("#user_watched").find("#watched").siblings("font").html(dd.watched);
                  $("#see").attr("style","").html("");
                  $("#nosee").html("");
                }
              },"json");
            });
          }
          $("#user_watched").find(".bnts_r7").each(function(i, el) {
            if ($(el).attr("id") == d.myscore.watched){
              $(el).attr("class","").addClass("bnts_r6");
            }
          });
        }*/
      }
    },"json");
  };
  //打分
  function evaluate(){
    if (uid && myscore){
      showMyScore();
    }else{
      showOption();
    }
  };
  //显示评分选项
  function showOption(){
    for (var i = 0; i < 5; i++){
      $("#evaluate").append('<font class="star_e"></font>');
    }
    $("#evaluate").children().mouseover(function(e) {
      $("#evaluate").next().html(evaluate_tips[$(e.target).prevAll().size()]);
      $(e.target).prevAll().removeClass("star_e").addClass("star_d");
      $(e.target).removeClass("star_e").addClass("star_d");
      $(e.target).nextAll().removeClass("star_d").addClass("star_e");
    });
    $("#evaluate").children().mouseout(function(e) {
      $("#evaluate").next().html("");
      $(e.target).siblings().removeClass("star_d").addClass("star_e");
      $(e.target).removeClass("star_d").addClass("star_e");
    });
     $("#evaluate").unbind("click");
    $("#evaluate").click(function(e){
      myscore = $(e.target).prevAll().size();
      $.post(YYETS.CONST.WWW_URL+'resource/score',{rid:rid,score:(myscore+1)*2},function(d){
        if (d.nologin == 1){
          //未登录
          YYETS.Util.noLogin();
        }
        if (d.success){
          showMyScore();
        }
      },"json");
    });
  };
  //显示评分选项
  function showMyScore(){
    $("#evaluate").next().html(evaluate_tips[myscore]+'  <a href="javascript:void(0)" id="modify_evaluate">修改</a>');
    $("#evaluate").html("");
    $("#modify_evaluate").click(function(e){
      showOption();
    });
  };
  
  return function(resourceid){
    rid = resourceid;
    score();
    evaluate();
  };
})();

/*
*by gaohua
*date:2011-12-27
*/

YYETS.Empty = function(obj,compare){
  if(obj==null || obj=='' || obj==0 || obj=='undefined'){
    return true;
  }else if(typeof compare=='object'){
    for(i=0;i<compare.length;i++){
      if(obj==compare[i]) return true;
    }
    return false;
  }else{
    return false;
  }
}

YYETS.ShowMsg = function(msg,callback){
  var timeout = 1500;
  var $html = $('<div style="border: 4px solid #00AEFF;z-index:9999;padding:10px 20px;background-color:#fff;font-size:14px;font-weight:bold;"><span>'+msg+'</span></div>');
  var h_width = $html.outerWidth();
  var h_height = $html.outerHeight();
  var w_width = $(window).width();
  var w_height = $(window).height();
  $('body').append($html);
  h_width += $html.find('span').outerWidth();
  h_height += $html.find('span').outerHeight();
  if($.browser.msie==true && $.browser.version=='6.0'){
    $html.css({'position':'absolute','left':(w_width-h_width)/2,'top':(w_height-h_height)/2+$(document).scrollTop()});
  }else{
    $html.css({'position':'fixed','left':(w_width-h_width)/2,'top':(w_height-h_height)/2});
  }
  setTimeout(function(){$html.fadeOut('slow',function(){$(this).remove();});},timeout);
  if(typeof callback=='function') setTimeout(callback,timeout);
};
YYETS.Loading = function(action){
  action = action || 'show';
  if(action=='show'){
    var d_width = $(document).width();
    var d_height = $(document).height();
    var w_width = $(window).width();
    var w_height = $(window).height();
    var scroll_top = $(document).scrollTop();
    var pic_width = 32;
    var pic_height = 32;
    var html = '<div id="loading_back" style="width:'+d_width+'px;height:'+d_height+'px;background-color:#000;filter:alpha(opacity=50);filter:alpha(opacity=50);opacity:0.5;position:absolute;top:0;left:0;z-index:1000"><div id="loading_pic" style="position:relative;z-index:1001;left:'+(w_width-pic_width)/2+'px;top:'+((w_height-pic_height)/2+scroll_top)+'px;"><img src="'+YYETS.CONST.RES_URL+'images/loading.gif"></div></div>';
    $('body').append(html);
  }else if(action=='hide'){
    $('#loading_back').remove();
  }
}

YYETS.JQUERY =  YYETS.JQUERY || {};
//延迟显示
var yyets_jquery_delay_obj;
YYETS.JQUERY.Delay = function(config){
  cfg = {obj:{},over:function(){},out:function(){},delay_time:200,timer:0};
  cfg = $.extend(cfg,config);
  cfg.obj.data(cfg);
  cfg.obj.bind('mouseenter',function(){
    yyets_jquery_delay_obj = this;
    _cfg = $.data(this);
    _cfg.timer = setTimeout("_cfg.over.apply(yyets_jquery_delay_obj)",_cfg.delay_time);
    $(this).data(_cfg);
  }).bind('mouseleave',function(){
    _cfg = $.data(this);
    clearTimeout(_cfg.timer);
    _cfg.timer = 0;
    $(this).data(_cfg);
    _cfg.out.apply(_cfg.obj);
  });
}
//切换标签
var yyets_tabs = [];
YYETS.JQUERY.SwitchTab = function(config){
  i = yyets_tabs.length;
  yyets_tabs[i] = {cfg:{obj:'',target:'',className:'',method:'mouseover',effect:'',fadeOutTime:500,callback:function(){},autoPlay:0,autoTime:3000},showNum:0,length:0,timeId:0};
  yyets_tabs[i].cfg = $.extend(yyets_tabs[i].cfg,config);
  yyets_tabs[i].cfg.target.hide().first().show();
  yyets_tabs[i].length = yyets_tabs[i].cfg.obj.size();
  eventRun=function(){
    _this = $(this);
    _i = _this.parent().attr('i');
    _k = _this.attr('k');
    if(_k==yyets_tabs[_i].showNum) return;
    yyets_tabs[_i].cfg.obj.removeClass(yyets_tabs[_i].cfg.className);
    _this.addClass(yyets_tabs[_i].cfg.className);
    if(yyets_tabs[_i].cfg.effect=='fadeOut'){
      yyets_tabs[_i].cfg.target.eq(yyets_tabs[_i].showNum).fadeOut(yyets_tabs[_i].cfg.fadeOutTime,function(){
        yyets_tabs[_i].cfg.target.eq(_k).show();
        eventComplete(_i,_k);
      });
    }else{
      yyets_tabs[_i].cfg.target.hide();
      yyets_tabs[_i].cfg.target.eq(_k).show();
      eventComplete(_i,_k);
    }
  }
  eventComplete=function(i,k){
    yyets_tabs[i].showNum = k;
    if(typeof yyets_tabs[i].cfg.callback=='function') yyets_tabs[i].cfg.callback.apply(_this);
  }
  autoPlay=function(i){
    yyets_tabs[i].timeId = setInterval(function(){
      num = parseInt(yyets_tabs[i].showNum);
      num = ++num>=yyets_tabs[i].cfg.obj.size()?0:num;
      //yyets_tabs[i].cfg.obj.eq(num).trigger(yyets_tabs[i].cfg.method);
      eventRun.apply(yyets_tabs[i].cfg.obj.eq(num));
    },yyets_tabs[i].cfg.autoTime);
  }
  autoStop=function(i){
    clearTimeout(yyets_tabs[i].timeId);
  }
  _this_ = yyets_tabs[i];
  _this_.cfg.obj.removeClass(_this_.cfg.className).each(function(k,v){
    $(this).attr('k',k);
  }).bind(_this_.cfg.method,eventRun).parent().attr('i',i);
  _this_.cfg.target.parent().attr('i',i);
  _this_.cfg.obj.eq(0).addClass(_this_.cfg.className);
  if(_this_.cfg.autoPlay==1){
    _this_.cfg.obj.mouseover(function(){autoStop($(this).parent().attr('i'))}).mouseout(function(){autoPlay($(this).parent().attr('i'))});
    _this_.cfg.target.mouseover(function(){autoStop($(this).parent().attr('i'))}).mouseout(function(){autoPlay($(this).parent().attr('i'))});
    autoPlay(i);
  }
  return this;
}
//区域内容向下滚动
YYETS.JQUERY.Scroll=function(config){
  yyets_scroll = {obj:{},time:500};
  yyets_scroll = $.extend(yyets_scroll,config);
  _obj = yyets_scroll.obj;
  var hzt_v = _obj.outerHeight(); var hzt_m = _obj.parent().parent().outerHeight();
  if(hzt_v<=hzt_m) return;
  _obj.wrap('<div></div>');
  _parent = _obj.parent();
  _parent.data('time',yyets_scroll.time);
  yyets_scroll.parent = _parent;
  scroll_create=function(){
    yyets_scroll.parent.css('marginTop',0).children().eq(1).remove();
    $copy = yyets_scroll.parent.children().first().clone();
    $copy.prependTo(yyets_scroll.parent);
    yyets_scroll.parent.css('marginTop','-'+$copy.outerHeight()+'px');
    yyets_scroll.order=1;
  };
  scroll_autoStart=function(obj){
    timer=setInterval(function(){
      _obj = obj.children().eq(0);
      _size = _obj.children().size();
      _order = yyets_scroll.order;
      obj.animate({'marginTop':'+='+_obj.children().eq(_size-_order).outerHeight()+'px'},obj.data('time'),function(){
        _order = yyets_scroll.order;
        if(_order==yyets_scroll.parent.children().eq(0).children().size()){
         scroll_create(yyets_scroll.parent);
       }else{
         yyets_scroll.order=_order+1;
        }
      });
    },2500);
    yyets_scroll.parent.data('timer',timer);
  };
  scroll_autoStop=function(obj){
    clearTimeout(obj.data('timer'));
  };
  _parent.bind('mouseover',function(){
    scroll_autoStop(yyets_scroll.parent);
  }).bind('mouseout',function(){
    scroll_autoStart(yyets_scroll.parent);
  });
  scroll_create(yyets_scroll.parent);
  scroll_autoStart(yyets_scroll.parent);
}
// end of Scroll function

//焦点图左右滑动
YYETS.JQUERY.Slide=function(config){
  slide = {obj:{},target:{},className:{}};
  slide = $.extend(slide,config);
  _obj = slide.obj;
  _target = slide.target;
  _size = _obj.size();
  _width = _target.outerWidth();
  _target.mouseover(function(){
    slide_autoStop(slide.obj);
  }).mouseout(function(){
    slide_autoStart(slide.obj);
  }).parent().css('width',_width*(_size+1));
  _obj.data('order',1).each(function(k,v){
    $(this).attr('num',k+1);
  }).click(function(){
    slide.obj.removeClass(slide.className);
    $(this).addClass(slide.className);
    _order = slide.obj.data('order');
    _num = $(this).attr('num');
    if(_order==0){
      _move = '0px';
    }else{
      if(_order==_num){
        return;
      }else if(_order>_num){
        _move = '+='+(_order-_num)*_width+'px';
      }else{
        _move = '-='+(_num-_order)*_width+'px';
      }
    }
    slide.target.parent().animate({marginLeft:_move},500);
    slide.obj.data('order',_num);
  }).mouseover(function(){
    slide.target.trigger('mouseover');
  }).mouseout(function(){
    slide.target.trigger('mouseout');
  });
  slide_autoStart=function(obj){
    slide_autoStop(obj);
    obj.timer = setInterval(function(){
      _size = obj.size();
      _order = obj.data('order');
      if(_order==_size){
        _order=0;
        slide.obj.data('order',0);
      }
      obj.eq(_order).trigger('click');
    },3000);
  };
  slide_autoStop=function(obj){
    clearTimeout(obj.timer);
  };
  slide_autoStart(_obj);
}

YYETS.JQUERY.Corner=function(config){
  //固定页面右下角
  corner_resize=function(){
    _width = yyets_corner.obj.outerWidth();
    _height = yyets_corner.obj.outerHeight();
    _all_width = $(window).width();
    _all_height = $(window).height();
    _scroll_top = $(document).scrollTop();
    yyets_corner.obj.css({'left':_all_width-_width,'top':_all_height-_height+_scroll_top});
  }

  if(!YYETS.ShowAD()) return;
  if(YYETS.Util.getCookie('cornerAD')==1) return;
  var yyets_corner = {obj:{},close:{}};
  yyets_corner = $.extend(yyets_corner,config);
  var _obj = yyets_corner.obj;
  var _close = yyets_corner.close;
  /*随机显示广告区域--开始*/
  var show_area = _obj.find('.cornerAD');
  var n = Math.random();
  if(n>0.5){
    show_area.eq(1).show();
  }else{
    show_area.eq(0).show();
  }
  /*随机显示广告区域--结束*/
  if($.browser.msie==true && $.browser.version=='6.0'){
    _obj.css({'position':'absolute','z-index':'9999','bottom':'0','right':'0'});
    $(window).resize(function(){
      $(this).trigger('scroll');
    }).scroll(function(){
      corner_resize();
    });
  }else{
    _obj.css({'position':'fixed','z-index':'9999','bottom':'0','right':'0'});
  }
  _obj.show();
  _close.click(function(){
    yyets_corner.obj.hide();
    YYETS.Util.setCookie('cornerAD',1,1000*60*60*12);
  });
}
var _middle_width = 985;
//左右浮动广告
floatAD_resize=function(obj,pos){
  _width = obj.outerWidth();
  _height = obj.outerHeight();
  _all_width = $(window).width();
  _all_height = $(window).height();
  _scroll_top = $(document).scrollTop();
  _top = (_all_height-_height)/2+_scroll_top;
  _left = pos=='left'?((_all_width-_middle_width)/2-_width):((_all_width-_middle_width)/2+_middle_width);
  obj.css({'left':_left+'px','top':_top+'px'});
}
YYETS.JQUERY.FloatAD=function(pos){
  if(!YYETS.ShowAD()) return;
  if(pos=='left'){
    _cookie = 'floatAD_l';
    _obj = $('#floatAD_l');
  }else{
    _cookie = 'floatAD_r';
    _obj = $('#floatAD_r');
  }
  if(_obj.size()==0) return;
  if(YYETS.Util.getCookie(_cookie)==1) return;
  _win_height = $(window).height();
  _win_width = $(window).width();
  _obj_height = _obj.outerHeight();
  _obj_width = _obj.outerWidth();
  _top = (_win_height-_obj_height)/2;
  _left = pos=='left'?((_win_width-_middle_width)/2-_obj_width):((_win_width-_middle_width)/2+_middle_width);
  if($.browser.msie==true && $.browser.version=='6.0'){
    _obj.css({'position':'absolute','z-index':'9999','left':_left+'px','top':_top+'px'});
    $(window).resize(function(){
      $(this).trigger('scroll');
    }).scroll(function(){
      if($('#floatAD_l').size()>0) floatAD_resize($('#floatAD_l'),'left');
      if($('#floatAD_r').size()>0) floatAD_resize($('#floatAD_r'),'right');
    });
  }else{
    _obj.css({'position':'fixed','z-index':'9999','top':_top+'px','left':_left+'px'});
  }
  _obj.appendTo('body').show().attr('pos',pos).find('.couplet_close a').click(function(){
    $(this).parents('.couplet').hide();
    _pos = $(this).parents('.couplet').attr('pos');
    _cookie = _pos=='left'?'floatAD_l':'floatAD_r';
    YYETS.Util.setCookie(_cookie,1,1000*60*30);
  });
}
YYETS.ShowAD=function(){
  var matches = window.location.href.match(/yyets\.com(.*)/);
  var group_name = matches==null?'':matches[1].replace(/\/{2,}/m,'/');
  var dirs = ['/php/release','/php/bbs','/php/work'];
  for(var i=0;i<dirs.length;i++){
    var regx = new RegExp(dirs[i],'i');
    if(group_name.search(regx)!=-1) return false;
  }
  return true;
} 
//初始化弹窗,支持鼠标拖动 connfig={obj:{},move:{},close:{}}
YYETS.JQUERY.Dialog=function(config){
  var _dialog_obj_ = config.obj;
  var _width = config.obj.outerWidth();
  var _height = config.obj.outerHeight();
  var _window_W = $(window).outerWidth();
  var _window_H = $(window).outerHeight();
  var _left = (_window_W-_width)/2;
  _left = _left>0?_left:0;
  var _top = (_window_H-_height)/2;
  _top = _top>0?_top:0;
  if($.browser.msie==true && $.browser.version=='6.0'){
    config.obj.css({'position':'absolute','z-index':'100','bottom':'0','right':'0'});
    dialog_resize=function(){
      _width = _dialog_obj_.outerWidth();
      _height = _dialog_obj_.outerHeight();
      _all_width = $(window).width();
      _all_height = $(window).height();
      _scroll_top = $(document).scrollTop();
      _left = (_all_width-_width)/2;
      _left = _left>0?_left:0;
      _top = (_all_height-_height)/2+_scroll_top;
      _top = _top>0?_top:0;
      _dialog_obj_.css({'left':_left,'top':_top});
    }
    dialog_resize();
    if(typeof config.move!='object'){
      $(window).resize(function(){
        $(this).trigger('scroll');
      }).scroll(function(){
        dialog_resize();
      });
    }
  }else{
    config.obj.css({position:'fixed',zIndex:100,left:_left,top:_top});
  }
  dialog_drag = false;
  config.obj.show();
  if(typeof config.move=='object'){
    config.move.bind('mousedown',function(){
      var e = e||window.event;
      dialog_drag = true;
      _offset = _dialog_obj_.offset();
      _x = ( e.x || e.clientX) - _offset.left;
      _y = ( e.y || e.clientY ) - _offset.top;
    }).bind('mousemove',function(e){
      if(!dialog_drag) return;
      var e = e||window.event;
      _left =( e.x || e.clientX)-_x;
      _top =( e.y || e.clientY )-_y;
      if(!($.browser.msie && $.browser.version=='6.0')){
        _top = _top-parseInt($(document).scrollTop());
      }
      _dialog_obj_.css({left:_left,top:_top});
    }).bind('mouseup',function(){
      dialog_drag = false;
    }).bind('mouseout',function(){
      dialog_drag = false;
    });
  }
  config.close.click(function(){
    _dialog_obj_.hide();
  });
}
//定义举报事件  {obj:{},channel:'',itemid:} itemid 可以为数字或函数
YYETS.JQUERY.Report=function(config){
  report_url = YYETS.CONST.WWW_URL+'report/report';
  if($('.report_tips[show=off]').size()==0){
    _html = '<div class="report_tips" show="off" style="display:none;position:absolute;z-index:999;"><ul class="jb_tips"><li><label for="jb_t_1"><input type="checkbox" value="不文明无素质言论">不文明无素质言论</label></li><li><label for="jb_t_2"><input type="checkbox" value="涉及政治与活动">涉及政治与活动</label></li><li><label for="jb_t_3"><input type="checkbox" value="涉嫌广告">涉嫌广告</label></li><li><label for="jb_t_4"><input type="checkbox" value="与本资源内容无关">与本资源内容无关</label></li><li><label for="jb_t_5"><input type="checkbox" value="看不顺眼">看不顺眼</label></li><li>补充说明:<br /><textarea style="width:170px;height:70px;"></textarea></li><li class="jb_bnts"><input type="submit" class="bnts_r7" value="提交"><input type="reset" class="bnts_r7" value="取消"></li></ul></div>';
    $('body').append(_html);
  }
  config.obj.each(function(){
    _itemid = typeof config.itemid=='function'?config.itemid.call(this):parseInt(config.itemid);
    $(this).attr({'report-itemid':_itemid,'report-channel':config.channel});
  }).unbind('click').click(function(){
    $('.report_tips[show=on]').remove();
    _itemid = $(this).attr('report-itemid');
    _channel = $(this).attr('report-channel');
    if($(this).attr('report-tips')=='show'){
      $(this).removeAttr('report-tips');
      return;
    }
    $(this).attr('report-tips','show');
    _position = $(this).position();
    _left = _position.left;
    _top = _position.top;
    _obj_height = $(this).outerHeight();
    _obj = $(".report_tips").clone();
    _obj.attr({channel:_channel,itemid:_itemid,show:'on'}).css({left:_left,top:(_obj_height+_top)}).show().insertAfter($(this)).find('input[type=submit]').unbind('click').click(function(){
      _report = [];
      $('.report_tips[show=on] input:checked').each(function(){
        _report.push($(this).val());
      });
      if(_report.length==0){
        alert('请至少选择一个举报的理由');
        return;
      }
      _text = $.trim(_obj.find('textarea').text());
      if(!_text) _report.push(_text);
      _report = _report.join(",");
      $.getJSON(report_url,{channel:$('.report_tips[show=on]').attr('channel'),itemid:$('.report_tips[show=on]').attr('itemid'),opt:_report},function(R){
        alert(R.status==1?'谢谢你的举报!':R.info);
        $('.report_tips[show=on]').remove();
        $('[report-tips=show]').removeAttr('report-tips');
      });
    }).next().click(function(){
      $('.report_tips[show=on]').remove();
      $('[report-tips=show]').removeAttr('report-tips');
    });
  });
};
//定义禁止事件
YYETS.JQUERY.Forbid=function(config){
  var default_txt = '请填写禁言理由';
  var forbid_uid=0;
  if($('#forbidTips').size()==0){
    $('body').append('<div id="forbidTips" style="display:none;position:absolute;z-index:100;"><ul class="jb_tips"><li><label for="jb_t_1"><input type="radio" name="forbid" value="1">禁止发言7天</label></li><li><label for="jb_t_2"><input type="radio" name="forbid" value="2">永久禁止</label></li><li><label for="jb_t_5"><input type="radio" name="forbid" value="3">禁止并删除所有帖子</label></li><li>理由:<br /><textarea style="width:170px;height:70px;"></textarea></li><li class="jb_bnts"><input type="submit" class="bnts_r7" value="提交"><input type="reset" class="bnts_r7" value="取消"></li></ul></div>');
  }
  var forbidTips_init=function(){
    $('#forbidTips').hide().find('input[type=radio]').attr('checked',false).end().find('textarea').val(default_txt).css('color','#B3BCC2').click(function(){
      $(this).css('color','#000').val('');
    });
  }
  config.obj.click(function(){
    forbid_uid = $(this).attr('forbid-uid');
    forbidTips_init();
    var pos = $(this).position();
    $('#forbidTips').insertAfter(this).css({top:parseInt(pos.top)+parseInt($(this).outerHeight())+5,left:pos.left}).show();
  });
  $('#forbidTips').find('input[type=submit]').unbind('click').click(function(){
    var opt = $('#forbidTips input[type=radio]:checked').val();
    var reason = $.trim($('#forbidTips textarea').val());
    if(!opt || !reason.length || reason==default_txt){
      alert('请选择禁言选项以及填写理由');
      return;
    }
    $.getJSON(YYETS.CONST.WWW_URL+'forbid/forbid',{forbid_uid:forbid_uid,opt:opt,reason:reason},function(R){
      if(R.status==1){
        alert('操作完成');
        forbidTips_init();
      }else{
        alert(R.info);
      }
    });
  }).next().click(forbidTips_init);
};
YYETS.JQUERY.SIDEBACK=function(){
  if(YYETS.Empty(global_side_url)) return;
  var pos_top = $('.topBox').outerHeight()+$('.topBox').position().top+1;
  var width = ($(document).width()-980)/2;
  var height = $(document).height()-pos_top-$('.footer').outerHeight();
  var html = '<a id="left_back" href="'+global_side_url+'" target="_blank" style="cursor:default;display:block;width:'+width+'px;height:'+height+'px;position:absolute;top:'+pos_top+'px;left:0;z-index:10;"></a>\
              <a id="right_back" href="'+global_side_url+'" target="_blank" style="cursor:default;display:block;width:'+width+'px;height:'+height+'px;position:absolute;top:'+pos_top+'px;right:0;z-index:10;"></a>';
  $('body').append(html);
}

//jquery.cookie,注：设置cookie时间的单位为小时
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { 
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

//广告工具包
YYETS.AdUtils = {
    is_index_page: function(){ //是否首页
        return window.location.pathname=='/';
    },
    is_inside_man: function(){ //是否组内人
        var gid = 0;
        var v   = $.cookie('GINFO');
        if(!v) return false;
        v = v.split('&');
        for (i in v)
            if(typeof v[i]=='string' && v[i].indexOf('main_group_id=')>=0) gid = Number(v[i].split('=')[1]);
        return Boolean(gid);
    },
    pop: function(ads, cookie_name, period) //弹窗,隔一段时间弹一次.period单位小时
    {
        var current_timestamp = (new Date()).valueOf();
        var sep = '-';
        if(!$.cookie(cookie_name))
            var last_do_index = null;//第一次进入站点，未初始化cookie
        else
        {
            var index_timestamp = $.cookie(cookie_name).split(sep);//数据结构:上次操作的数组索引+操作时间(时间戳)
            if(index_timestamp.length!=2)//检查数据
                last_do_index = null;
            else
            {
                var last_do_index = Number(index_timestamp[0]);
                var last_do_timestamp = Number(index_timestamp[1]);
                if((current_timestamp-last_do_timestamp)<(period*3600*1000)) //未到时候，返回
                    return true;
            }
        }
        var do_index = 0;//本次操作的默认数组索引
        if((!last_do_index && last_do_index!=0) || last_do_index>=(ads.length-1))
            do_index = 0;
        else
            do_index = last_do_index+1;
        //展现广告
        document.write(ads[do_index]);
        //广告数组索引写入cookie.12小时内有效
        $.cookie(cookie_name, do_index+sep+current_timestamp, {expires:12, path:'/'});
    },
    rich: function(ads, cookie_name) //富媒体
    {
        var v=$.cookie(cookie_name)
        if(!v && (v!=0 || v!='0'))
            var last_do_index=null;//第一次进入站点，未初始化cookie
        else
            var last_do_index = Number($.cookie(cookie_name));//上次操作的数组索引
        var do_index      = 0;//本次操作的数组的索引
        if((!last_do_index && last_do_index!=0) || last_do_index>=(ads.length-1))
            do_index = 0;
        else
            do_index = last_do_index+1;
        //操作
        document.write(ads[do_index]);
        //广告数组索引写入cookie.12小时内有效
        $.cookie(cookie_name, do_index, {expires:12, path:'/'});
    }
};
//顶部联想输入
YYETS.JQUERY.SEARCHTIPS=function(){
  var keyword = '';
  var settime_id = 0;
  var search_type;
  var $obj = $('form[name=search] input[type=text][name=keyword]');
  $obj.bind('keyup',function(){
    clearTimeout(settime_id);
    $('ul#top_search_list').hide();
    if($(this).val()==keyword || $(this).val()=='') return;
    keyword = $(this).val();
    search_type = $('input#search_type').val()
    settime_id = setTimeout(showResult,500);
  });
  var showResult=function(){
    $.getJSON(YYETS.CONST.WWW_URL+'search/api?keyword='+encodeURIComponent(keyword)+'&type='+search_type,function(R){
      var data = R.data;
      var html = '',type_title;
      for(var i=0;i<data.length;i++){
        switch(data[i].type){
          case 'subtitle':
            type_title = '<strong>字幕:</strong>';
            break;
          case 'article':
            type_title = '<strong>资讯:</strong>';
            break;
          case 'resource':
            type_title = '';
            break;
        }
        html += '<li link="/php/'+(data[i].type=='article'?'news':data[i].type)+'/'+data[i].itemid+'">'+(data[i].type=='resource'?'<div class="pic"><img src="'+data[i].poster+'"></div>':'')+'<p>'+type_title+data[i].prefix+data[i].title+data[i].suffix+'</p></li>';
      }
      if(html!=''){
        $('ul#top_search_list').html(html).show().find('li').bind('mouseover',function(){
          $(this).css('background-color','#ddd');
        }).bind('mouseout',function(){
          $(this).css('background-color','#fff');
        }).click(function(){
          window.location.href=$(this).attr('link');
          return false;
        });
        $('body').one('click',function(){
          $('ul#top_search_list').hide();
        });
      }
    });
  };
}