function disableselect(e){ 
return false} 
function reEnable(){return true 
} 
//if IE4+ 
document.onselectstart=new Function ("return false") 
//if NS6 
if (window.sidebar){ 
document.onmousedown=disableselect 
document.onclick=reEnable ;



	
	

} 
$(function(){
		   
		   initthis();
		   
		   })

function initthis()
{
    document.onkeydown=showKey;//������onkeyup �������ж�����
}

function showKey(evt)
{
	
     evt = (evt) ? evt : window.event;
     if(evt.keyCode==32)
     {
          return false;//��ֹ�ո�ҳ
     }
}

function disabledMouseWheel() {
  if (document.addEventListener) {
    document.addEventListener('DOMMouseScroll', scrollFunc, false);
  }//W3C
  window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome
}
function scrollFunc(evt) {
  evt = evt || window.event;
    if(evt.preventDefault) {
    // Firefox
      evt.preventDefault();
      evt.stopPropagation();
    } else {
      // IE
      evt.cancelBubble=true;
      evt.returnValue = false;
  }
  return false;
}
window.onload=disabledMouseWheel;



