
        var etControl = {};
        etControl.process = function () {
            /*需要放在html中的body标签后面使用本控件*/

            var count = 0;
            var id = "loading";
            var el = "#" + id;
			
            $("body").append('<section id="' + id + '"></section>');

            var sectionTxt = "#" + id + " section span.jindu";
            $(el).html("<section class='loadingbg'><span class='jindu'></span></section>");
            $(el).attr("style", "width: 100%;height: 100%;background: #527aa0;padding: 5px;position:abolulted;left: 0;top: 0;font-size:12px; z-index:9999;");
            $(sectionTxt).attr("style", "width: 1px;height: 52px;");
			
			
 			
			
			
			
		
			
            /*更新进度条*/
            this.updateProcess = function (percent) {
                setTimeout(function () { $(sectionTxt).animate({ width: percent*9 + "px" })}, ++count * 500);
			//	setTimeout(function () { $(sectionTxt).animate({ width: percent*9 + "px" }) }, ++count * 500);
                if (percent == 100) {           /*100%就从页面移除loading标签*/
                    setTimeout(function () {
                        $(el).hide();
                        setTimeout(function () { $(el).remove() }, 500);
                    }, count * 500 );
                }
            };
        }

