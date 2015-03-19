/*!
	Autosize 1.18.12
	license: MIT
	http://www.jacklmoore.com/autosize
*/
(function(e){var t,o={className:"autosizejs",id:"autosizejs",append:"\n",callback:!1,resizeDelay:10,placeholder:!0},i='<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',n=["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing","textIndent","whiteSpace"],s=e(i).data("autosize",!0)[0];s.style.lineHeight="99px","99px"===e(s).css("lineHeight")&&n.push("lineHeight"),s.style.lineHeight="",e.fn.autosize=function(i){return this.length?(i=e.extend({},o,i||{}),s.parentNode!==document.body&&e(document.body).append(s),this.each(function(){function o(){var t,o=window.getComputedStyle?window.getComputedStyle(u,null):!1;o?(t=u.getBoundingClientRect().width,(0===t||"number"!=typeof t)&&(t=parseInt(o.width,10)),e.each(["paddingLeft","paddingRight","borderLeftWidth","borderRightWidth"],function(e,i){t-=parseInt(o[i],10)})):t=p.width(),s.style.width=Math.max(t,0)+"px"}function a(){var a={};if(t=u,s.className=i.className,s.id=i.id,d=parseInt(p.css("maxHeight"),10),e.each(n,function(e,t){a[t]=p.css(t)}),e(s).css(a).attr("wrap",p.attr("wrap")),o(),window.chrome){var r=u.style.width;u.style.width="0px",u.offsetWidth,u.style.width=r}}function r(){var e,n;t!==u?a():o(),s.value=!u.value&&i.placeholder?(p.attr("placeholder")||"")+i.append:u.value+i.append,s.style.overflowY=u.style.overflowY,n=parseInt(u.style.height,10),s.scrollTop=0,s.scrollTop=9e4,e=s.scrollTop,d&&e>d?(u.style.overflowY="scroll",e=d):(u.style.overflowY="hidden",c>e&&(e=c)),e+=w,n!==e&&(u.style.height=e+"px",f&&i.callback.call(u,u),p.trigger("autosize.resized"))}function l(){clearTimeout(h),h=setTimeout(function(){var e=p.width();e!==g&&(g=e,r())},parseInt(i.resizeDelay,10))}var d,c,h,u=this,p=e(u),w=0,f=e.isFunction(i.callback),z={height:u.style.height,overflow:u.style.overflow,overflowY:u.style.overflowY,wordWrap:u.style.wordWrap,resize:u.style.resize},g=p.width(),y=p.css("resize");p.data("autosize")||(p.data("autosize",!0),("border-box"===p.css("box-sizing")||"border-box"===p.css("-moz-box-sizing")||"border-box"===p.css("-webkit-box-sizing"))&&(w=p.outerHeight()-p.height()),c=Math.max(parseInt(p.css("minHeight"),10)-w||0,p.height()),p.css({overflow:"hidden",overflowY:"hidden",wordWrap:"break-word"}),"vertical"===y?p.css("resize","none"):"both"===y&&p.css("resize","horizontal"),"onpropertychange"in u?"oninput"in u?p.on("input.autosize keyup.autosize",r):p.on("propertychange.autosize",function(){"value"===event.propertyName&&r()}):p.on("input.autosize",r),i.resizeDelay!==!1&&e(window).on("resize.autosize",l),p.on("autosize.resize",r),p.on("autosize.resizeIncludeStyle",function(){t=null,r()}),p.on("autosize.destroy",function(){t=null,clearTimeout(h),e(window).off("resize",l),p.off("autosize").off(".autosize").css(z).removeData("autosize")}),r())})):this}})(jQuery||$);
/*
 * jQuery bbCode
 * Copyright (c) 2014 Infodesire
 * Version: 0.1 (04-10-2014)
 * Requires: jQuery v1.7.1 or later
 */
(function(e) {
	e.fn.bbCode = function(t) {
		var n = e.extend({}, {}, t);
		this.each(function(t, r) {
			var s = e(r),
                o = e('<div id="ibbCode" class="row"><ul><li class="ibbCode-group"><a title="URL" data-ibb="link"><i class="fa fa-link"></i></a><a title="Keyword" data-ibb="keyword"><i class="fa fa-chain-broken"></i></a><a title="'+(window.top.bsm && window.top.bsm.clipBoardData && window.top.bsm.clipBoardData.length > 0 ? 'Paste Copied Document' : 'Internal URL')+ '" data-ibb="euro"><i class="fa fa-anchor"></i></a></li></ul></div>'),
                //o = e('<div id="ibbCode" class="row"><ul><li class="ibbCode-group"><a title="Headline" data-ibb="headline"><i class="fa fa-header"></i></a></li><li class="ibbCode-group"><a title="Bold" data-ibb="bold"><i class="fa fa-bold"></i></a><a title="Italic" data-ibb="italic"><i class="fa fa-italic"></i></a><a title="Underline" data-ibb="underline"><i class="fa fa-underline"></i></a><a title="Strikethrough" data-ibb="strikethrough"><i class="fa fa-strikethrough"></i></a></li><li class="ibbCode-group"><a title="Font" data-ibb="text-font"><i class="fa fa-font"></i></a><ul><li class="ibbCode-group"><a data-ibb="text-font" title="Arial" style="font-family: Arial;">Arial</a><a data-ibb="text-font" title="Comic Sans MS" style="font-family: Comic Sans MS;">Comic Sans MS</a><a data-ibb="text-font" title="Courier New" style="font-family: Courier New;">Courier New</a><a data-ibb="text-font" title="Lucida Console" style="font-family: Lucida Console;">Lucida Console</a><a data-ibb="text-font" title="Tahoma" style="font-family: Tahoma;">Tahoma</a><a data-ibb="text-font" title="Times New Roman" style="font-family: Times New Roman;">Times New Roman</a><a data-ibb="text-font" title="Verdana" style="font-family: Verdana;">Verdana</a><a data-ibb="text-font" title="Symbol" style="font-family: Symbol;">Symbol</a></li></ul><a title="Font Size" data-ibb="text-size"><i class="fa fa-text-height"></i></a><ul><li class="ibbCode-group"><a data-ibb="text-size" style="font-size:10px;">Size 1</a><a data-ibb="text-size" style="font-size:12px;">Size 2</a><a data-ibb="text-size" style="font-size:14px;">Size 4</a><a data-ibb="text-size" style="font-size:16px;">Size 6</a></li></ul></li><li class="ibbCode-group"><a title="Image" data-ibb="image"><i class="fa fa-picture-o"></i></a><a title="URL" data-ibb="link"><i class="fa fa-link"></i></a><a title="Keyword" data-ibb="keyword"><i class="fa fa-chain-broken"></i></a><a title="Internal URL" data-ibb="euro"><i class="fa fa-anchor"></i></a><a title="Center Align" data-ibb="center"><i class="fa fa-align-center"></i></a></li></ul></div>'),
                f = {
					init: function() {
                        e(s).prev('div').html(o);
                        o.on('click', 'ul li a[data-ibb]', function(e){
                            e.preventDefault();
                            var data = $(this).attr('data-ibb');
                            switch(data){
                                case 'headline':
                                    f._trans(s, "[h4]", "[/h4]", 4);
                                break;
                                case 'bold':
                                    f._trans(s, "[b]", "[/b]", 3);
                                break;
                                case 'italic':
                                    f._trans(s, "[i]", "[/i]", 3);
                                break;
                                case 'underline':
                                    f._trans(s, "[u]", "[/u]", 3);
                                break;
                                case 'strikethrough':
                                    f._trans(s, "[s]", "[/s]", 3);
                                break;
                                case 'text-font':
                                   var font = $(this).css('font-family');
                                   f._trans(s, "[font=" + font + "]", "[/font]", 7+font.length); 
                                break;
                                case 'text-size':
                                   var size = parseFloat($(this).css('font-size')).toString();
                                   size = size.substr(1,1);
                                   size = (size == 0 || size>6 ? 1 : size);
                                   f._trans(s, "[size=" + size + "]", "[/size]", 8); 
                                break;
                                case 'image':
                                    var m = prompt('Paste URL here');
                                    if(!m || m.length == 0){return;}
                                    if(!f.validateURL(m)){alert('Image URL is not valid'); return;}
                                    f._trans(s, "[img]" + m, "[/img]", (m ? m.length : 0));
                                break;
                                case 'link':
                                    f._trans(s, "[web|http://", "]", 12);
                                break;
                                case 'keyword':
                                    f._trans(s, "[", "]", 1);
                                    s.trigger("kAutoComplete.show");
                                break;
                                case 'euro':
                                    var euro_val = (window.top.bsm && window.top.bsm.clipBoardData && window.top.bsm.clipBoardData.length > 0 ? "[doc|" + window.top.bsm.clipBoardData[window.top.bsm.clipBoardData.length-1] : "[doc|^.|Default|Currency|1|EURO");
                                    f._trans(s, euro_val, "]", euro_val.length+1);
                                break;
                                case 'center':
                                    f._trans(s, "[center]", "[/center]", 8);
                                break;
                            }
                        });
                    },
                    _trans: function r(s, e, t, n, r) {
                         var textarea = s[0];  
			             if (document.selection) {
				            textarea.focus();
				            var i = document.selection.createRange();
				            i.text = e + i.text + t
			             } else {
                             var s = textarea.value.length;
                             var o = textarea.selectionStart;
                             var u = textarea.selectionEnd;
                             var a = textarea.scrollTop;
                             var f = textarea.scrollLeft;
                             var i = textarea.value.substring(o, u);
                             var l = r != false ? e + i + t : i + e + t;
                             textarea.value = textarea.value.substring(0, o) + l + textarea.value.substring(u, s);
                             textarea.scrollTop = a;
                             textarea.scrollLeft = f;
                             if (i.length == 0) {
                                 textarea.selectionStart = textarea.selectionEnd = o + n
                             } else if (r != false && i.length > 0) {
                                 textarea.selectionStart = o + n;
                                 textarea.selectionEnd = o + l.length - n - 1
                             }
                         }
                         $(textarea).trigger('input');
                         $(textarea).focus();
                    },
                    validateURL: function(e){
	                   var t = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	                   return t.test(e);
                    }   
            };
            f.init();
            return this;
        });
    }
})(jQuery);
/*!
	textareaHelper 1.0
	license: MIT
	https://github.com/Codecademy/textarea-helper
*/
(function(e){"use strict";var t="textarea-helper-caret",n="textarea-helper",r=["box-sizing","height","width","padding-bottom","padding-left","padding-right","padding-top","font-family","font-size","font-style","font-variant","font-weight","word-spacing","letter-spacing","line-height","text-decoration","text-indent","text-transform","direction"];var i=function(t){if(t.nodeName.toLowerCase()!=="textarea")return;this.$text=e(t);this.$mirror=e("<div/>").css({position:"absolute",overflow:"auto","white-space":"pre-wrap","word-wrap":"break-word",top:0,left:-9999}).insertAfter(this.$text)};(function(){this.update=function(){var n={};for(var i=0,s;s=r[i];i++){n[s]=this.$text.css(s)}this.$mirror.css(n).empty();var o=this.getOriginalCaretPos(),u=this.$text.val(),a=document.createTextNode(u.substring(0,o)),f=document.createTextNode(u.substring(o)),l=e("<span/>").addClass(t).css("position","absolute").html("&nbsp;");this.$mirror.append(a,l,f).scrollTop(this.$text.scrollTop())};this.destroy=function(){this.$mirror.remove();this.$text.removeData(n);return null};this.caretPos=function(){this.update();var e=this.$mirror.find("."+t),n=e.position();if(this.$text.css("direction")==="rtl"){n.right=this.$mirror.innerWidth()-n.left-e.width();n.left="auto"}return n};this.height=function(){this.update();this.$mirror.css("height","");return this.$mirror.height()};this.getOriginalCaretPos=function(){var e=this.$text[0];if(e.selectionStart){return e.selectionStart}else if(document.selection){e.focus();var t=document.selection.createRange();if(t==null){return 0}var n=e.createTextRange(),r=n.duplicate();n.moveToBookmark(t.getBookmark());r.setEndPoint("EndToStart",n);return r.text.length}return 0}}).call(i.prototype);e.fn.textareaHelper=function(t){this.each(function(){var t=e(this),r=t.data(n);if(!r){r=new i(this);t.data(n,r)}});if(t){var r=this.first().data(n);return r[t]()}else{return this}}})(jQuery);
/*!
 * jQuery kAutoComplete
 * Copyright (c) 2014 Infodesire
 * Version: 0.1 (17-10-2014)
 * Requires: jQuery v1.7.1 or later
 */
(function(e) {
    e.fn.kAutoComplete = function(t){
       var n = e.extend({
           openTag: "[",
           closeTag: "]",
           url: null,
           itemsLimit: 10,
           limitScroll: true,
           textLength: 25,
       }, t),
            keys = {
                ESC: 27,
                UP: 38,
                DOWN: 40,
                ENTER: 13
            };
        return this.each(function(t, r) {
            var s = e(r),
                b = '.kACompleteBox',
                o = e('<div class="kACompleteBox"><ul></ul></div>'),
                f = {
                    init: function(){
                        f._loadData();
                        s.on('keyup', f._sKeyUp);
                    },
                    _loadData: function(){
                        if(f._data&&f._items){return true;}
                        $.get(n.url, {}, function(r){
                            f._data = f._items = r.Entries;
                        });    
                    },
                    _sortItems: function(){
                        return $.map(f._data, function (item) {
                            return item.keyword.toLowerCase().indexOf(f._lookup.toLowerCase()) === 0 ? item : null;
                        });
                    },
                    _show: function(){
                        f._hide();
                        f._createBox();
                        f._bindOptions();
                        f._crSAk = true;
                    },
                    _hide: function(){
                        e('body').find(b).remove();
                        f._unbindOptions();
                    },
                    _bindOptions: function(){
                        var _blEl,
                            _blFn = function(e){
                            if(o.is(":focus")){return true;}
                            var related = _blEl,
                                inside = false;
                            if (related !== o || related !== s) {
                                if (related) {
                                    inside = (related.parents(b).length > 0 ? true : false);
                                }
                                if (inside) {
                                    return true;
                                }
                            }
                            f._hide()
                        };
                        
                        e(document).bind("contextmenu", function() {
                            f._hide()
                        }).bind('keydown', f._documentKeyDown).mousedown(function(e) {
                            _blEl = $(e.target);
                            _blFn();
                        }).mouseup(function(e) {
                            _blEl = null;
                        });
                        e(window).blur(function() {
                            f._hide()
                        }).on("resize", function() {
                            f._hide()
                        }).bind('keyup', function(e){
                            if(e.which == keys.ESC){
                                f._hide();
                                delete f._cTps;
                                f._lookup = "";
                                f._oldVal = "";
                                return true;
                            }
                        });
                        s.bind("blur", _blFn);
                        s.bind("keypress", f._sKeyPress);
                    },
                    _unbindOptions: function(){
                        $(document).unbind('keydown', f._documentKeyDown);     
                        s.unbind('keypress', f._sKeyPress);
                        f._crSAk = false;
                    },
                    _documentKeyDown: function(e){
                        var ar = new Array(38,40),
                            key = e.which;
                        if($.inArray(key,ar) > -1) {
                            e.preventDefault();
                            return false;
                        }
                        return true;
                    },
                    _sKeyUp: function(e){
                        f._cursorPos = f._getCursorPos();
                        var val = s.val(),
                            lastChar = val.charAt(f._cursorPos-1),
                            key = e.which;
                        
                        if(f._crSAk){
                            switch(key){
                                case keys.ESC:
                                    f._hide();
                                    delete f._cTps;
                                    f._lookup = "";
                                    f._oldVal = "";
                                    return true;
                                break;
                                case keys.ENTER:
                                    e.preventDefault();
                                    f._select(o.find('ul li.active a'));
                                    delete f._cTps;
                                    f._lookup = "";
                                    f._oldVal = "";
                                    return false;
                                break;
                                case keys.UP:
                                    f._goPrev();
                                    return false;
                                break;
                                case keys.DOWN:
                                    f._goNext();
                                    return false;
                                break;
                            }
                        }

                        if(lastChar == n.openTag && !f._crSAk){
                            f._cTps = f._cursorPos;
                            if(f._oldVal.length == 0 || f._oldVal.length < f._lookup.length || f._oldVal != val.substring(f._cTps, f._cTps+f._oldVal.length)){}else{
                                f._lookup = f._oldVal;
                                return;
                            }
                            f._lookup = "";
                            f._items = f._data;
                            f._show();
                        }else{
                            f._oldVal = f._lookup;
                            f._lookup = val.substring(f._cTps, f._cursorPos);   
                            
                            if(val.charAt(f._cTps + 1 + f._lookup.length) == n.closeTag || !f._cTps){f._hide(); return;}
                            
                            if(val.charAt(f._cursorPos - (f._lookup.length==0?2:1) - f._lookup.length) == n.openTag){
                                if(lastChar == n.closeTag){
                                    f._lookup = f._lookup.substring(0, f._lookup.length-1);
                                    f._hide();
                                    return;
                                }
                                
                                if(f._oldVal.length == 0 || f._oldVal.length <= f._lookup.length || f._oldVal != val.substring(f._cTps, f._cTps+f._oldVal.length)){}else{
                                    f._lookup = f._oldVal;   
                                }
                                
                                f._items = f._sortItems();
                                
                                var ar = new Array(38,40),
                                    key = e.which;
                                if($.inArray(key,ar) == -1) {
                                    f._createBox();
                                }
                            }else{
                                f._hide();
                                return;
                            }
                        }
                        
                        f._position();
                    },
                    _sKeyPress: function(e){
                        switch(e.which){
                            case keys.ENTER:
                            case keys.UP:
                            case keys.DOWN:
                                e.preventDefault();
                                return false;
                            break;
                        }
                    },
                    _select: function(el){
                        if(el.length == 0){return false;}
                        var id = el.parent().attr('data-idx'),
                            val = f._items[id].keyword,
                            crs = f._cTps;
                        
                        s.val(s.val().substring(0,crs-1) + n.openTag + val + n.closeTag + s.val().substring(crs+f._lookup.length + (s.val().substring(crs+f._lookup.length, crs+f._lookup.length+1) == n.closeTag ? 1 : 0),s.val().length));
                        
                        s[0].selectionStart = s[0].selectionEnd = s.val().substr(0,crs).length + val.length + n.closeTag.length;
                        
                        s.trigger('input');
                        f._hide();
                    },
                    _goPrev: function(){
                        var id = o.find('ul li').index(o.find('ul li.active'));
                        o.find('ul li.active').removeClass('active');
                        if(id-1 < 0){
                            o.find('ul li').last().addClass('active');
                        }else{
                            o.find('ul li').eq(id-1).addClass('active');  
                        }
                        o.find('ul').scrollTop(o.find('ul li.active').offset().top - o.find('ul').offset().top + o.find('ul').scrollTop());
                    },
                    _goNext: function(){
                        var id = o.find('ul li').index(o.find('ul li.active'));
                        o.find('ul li.active').removeClass('active');
                        if(id+1 >= o.find('ul li').size()){
                            o.find('ul li').first().addClass('active');
                        }else{
                            o.find('ul li').eq(id+1).addClass('active');  
                        }
                        o.find('ul').scrollTop(o.find('ul li.active').offset().top - o.find('ul').offset().top + o.find('ul').scrollTop());
                    },
                    _getCursorPos: function() {
                        var el = s.get(0),
                            pos = 0;
                        if('selectionStart' in el) {
                            pos = el.selectionStart;
                        } else if('selection' in document) {
                            el.focus();
                            var Sel = document.selection.createRange(),
                                SelLength = document.selection.createRange().text.length;
                            Sel.moveStart('character', -el.value.length);
                            pos = Sel.text.length - SelLength;
                        }
                        return pos;
                    },
                    _position: function(){
                        var caretPos = s.textareaHelper('caretPos');
                        
                        o.css({
                            top: s.offset().top + caretPos.top + 15,
                            left: s.offset().left + caretPos.left - 5
                        });
                        
                        s.textareaHelper('destroy');
                    },
                    _createBox: function(){
                        if(!f._items || f._items.length == 0){f._hide(); return}
                        var l = f._items.slice( 0, (!n.limitScroll ? n.itemsLimit : f._items.length) ),
                            html = "";
                        if(!l || l.length == 0){f._hide(); return}
                        for(key in l){
                            var value = l[key];
                            value = value.keyword.substring(0,n.textLength)+(value.keyword.length > n.textLength ? '...': '');
                            if(f._lookup){
                                value = "<b>" + value.substring(0, f._lookup.length) + "</b>" + value.substring(f._lookup.length);
                            }
                            html += '<li data-idx="'+key+'"'+(key==0?' class="active"':'')+'><a>'+value+'</a></li>';
                        }
                        o.find('ul').html(html);
                        $(document.body).append(o);
                        if(n.limitScroll){
                            var mH = 0;
                            for(var i = 0; i <= n.itemsLimit; i++){
                                mH += o.find('ul li').eq(i).outerHeight(); 
                            }
                            o.find('ul').css('height', mH);
                        }
                        o.find('ul li a').on('click', function(e){
                            e.preventDefault();
                            f._select($(this));
                        });
                        f._position();
                    },
                    _crSAk: false,
                    _lookup: "",
                    _oldVal: "",
                    _crAtI: 0
                };
            f.init();
            s.on("kAutoComplete.show", f._sKeyUp);
            
            return this;
        });
    }
})(jQuery);