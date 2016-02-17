$(document).ready(function() {

  // --- Fancybox for links
  $('a.fancy').fancybox({
    'closeClick': false,
    'autoSize' : false,
    'width': 800,
    'height': 550,
    'type': 'ajax',
    'afterShow': function(){$('#comment_text').focus();}
  });


  // --- Fancybox for images
  $('a.fancyimg').fancybox({
    'closeClick': false,
    'type': 'image'
  });
  

  // --- Wayfarer tooltip
  $('.tooltip').wTooltip({className: "wtooltip", style: false});
  $('.checkbox').shiftcheckbox();
  


  $('#hide-int-info').click(function() {
    $.ajax({
      url: './?hide=hide_int_info',
      cache: false,
      success: function(html){
        $('#int-info').hide(750);
      }
    });
  });
  $('#hide-config-info').click(function() {
    $.ajax({
      url: './?hide=hide_conf_info',
      cache: false,
      success: function(html){
        $('#config-info').hide(750);
      }
    });
  });
  $('#lang-img').click(function() {$('#lang-select').slideToggle(500);});
  $('#chmod-help-toggle').click(function() {$('#install-list').slideToggle(750);});
  $('#p-tags-viewer').click(function() {
    $('#tags-in').slideToggle(750);
    $('#new_tag').val('');
    $('#new_tag').focus();
  });


  $('#post-img-add-cat').click(function() {
    $('#post-add-cat').show(500);
    $('#add_cat').focus();
  });
  $('#post-add-cat-hide').click(function() {$('#post-add-cat').hide(500);});
  
  $('.slug-source').friendurl({
		id : 'slug'
  });
  
  $('#simple-format-short_story img').click(function() {$('#simple-format-short_story').slideToggle();});
  $('#simple-format-full_story img').click(function() {$('#simple-format-full_story').slideToggle();});
  $('#simple-format-text img').click(function() {$('#simple-format-text').slideToggle();});
  $('#personal-info-toggle').click(function() {
    $('#personal-info').slideToggle(1000);
    $('#contact-info').slideToggle(1000);
    $('#other-info').slideToggle(1000);
  });


  $('#filter-viewer').click(function() {$('.filter').slideToggle(450);});
  $('#comments_bb1').click(function() {$('#bb-buttons-viewer').show(750);});
  $('#comments_bb2').click(function() {
    $('#bb-buttons-viewer').hide(750);
    $('#bb-buttons').hide(750);
  });
  $('#bb-buttons-viewer').click(function() {$('#bb-buttons').slideToggle(750);});
  $('#page-pass-on').click(function() {
    $('#page-pass').show();
    $('#pass').focus();
  });
  $('#page-pass-off').click(function() {$('#page-pass').hide();});
  $('#imgupload-starter').click(function() {$('#imgupload').fileUploadStart();});
  
  $("input.file-link").focus(function(){this.select();});
  
  $('#email').focus(function() {$('#profile-old-pass').show();});
  $('#pass1').focus(function() {
    $('#profile-old-pass').show();
    $('#tr-pass2').show();
  });

  $('#tmpl_group1').click(function() {$('#group_mode1').attr('checked', 'checked');});
  $('#tmpl_group2').click(function() {$('#group_mode2').attr('checked', 'checked');});
  $('#group_mode2').click(function() {$('#tmpl_group2').focus();});


  $('.toggle').live('click', function() {$('#' + $(this).attr('rel')).slideToggle();});
  $('.toggle450').live('click', function() {$('#' + $(this).attr('rel')).slideToggle(450);});
  $('.toggle750').live('click', function() {$('#' + $(this).attr('rel')).slideToggle(750);});


  $('.tmpl-variables span.variable').live('click', function() {
  	variableValue = $(this).text();
  	$('#tmpl').insertAtCaret(variableValue);
  });
  
  
  $('#field_type1').click(function() {$('#field_options_block').addClass('hide');});
  $('#field_type2').click(function() {
    $('#field_options_block').removeClass('hide');
    $('#field_options').focus();
  });
  
  
  
  $('#url_base').on('keyup', function() {
  	var url_base = $('#url_base').val();
  	$('.url-base').html(url_base);
  });
  
  
  
  if (document.location.hash) {
    $(document.location.hash).css('background', '#ffff93');
  }




  // --- Manage click events
  $('a.ajaxcall').click(function(e) {

    e.preventDefault();

    var link = $(this).attr('href');
    
    
    //  --- Function getUrlVars()
    // @Source: http://jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html
    function getUrlVars() {
      var vars = [], hash;
      var hashes = link.slice(link.indexOf('?') + 1).split('&');
      for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
      }
      return vars;
    }
    
    var msg = getUrlVars()['msg'];
    var status = getUrlVars()['s'];
    var comm_id = getUrlVars()['c'];
    var from = getUrlVars()['from'];
    
    $('#c' + comm_id + ' td \.comment_status').replaceWith('<span class="comment_status"><img src="./stuff/img/ajax-loader.gif" alt="" /><br /></span>');
    
    // --- ajax call
    $.ajax({
      url: link + '&ajaxcall',
      cache: false,
      success: function(html){
        if (from == 'trash' || status == '0') {
          if (from == 'index') {
            $('#c' + comm_id + ' td').css({'background-color' : '#df5757'});
            setTimeout('$("#c' + comm_id + ' td").hide();', 250);
          }
          else if (from == 'post') {
            $('#c-' + comm_id).hide(300);
          }
          else {
            var trashint = parseInt($("#trash_count").html(),10)
            var commint = parseInt($("#comm_count").html(),10)
            if (status == '0') trashint++;
            else trashint--;
            commint--;
            $("#trash_count").html(trashint);
            $("#comm_count").html(commint);
            $('#c' + comm_id + ' td').hide(300);
          }
        }
        else {
          if (status == '1') {
            $('#c' + comm_id + ' td \.comment_status').replaceWith('<span class="comment_status status_' + status + '"><img src="./stuff/img/icons/ok.png" alt="" /> ' + msg + '<br /></span>');
          }
          else {
            $('#c' + comm_id + ' td \.comment_status').replaceWith('<span class="comment_status status_' + status + '"><img src="./stuff/img/icons/exclamation.png" alt="" /> ' + msg + '<br /></span>');
          }

          $('#c' + comm_id + ' td p\.process-links').hide();
          $('#c' + comm_id + ' td input\.checkbox').attr('checked', false);
        }
      }
    });

  });

  
  
  
  
  
  /* --- Add category via ajax */
  $('#catajax').click(function() {
    if ($('#add_cat').val() != '') {
      $.ajax({
        url: './mn-categories.php?action=ajaxcall&cat_name=' + $('#add_cat').val(),
        cache: false,
        success: function(html){
          $('#cat').append(html);
          $('#post-img-add-cat').attr('src', './stuff/img/icons/tick.png');
        }
      });
      $('#add_cat').val('');
      $('#post-add-cat').hide(500);
    }
    else {
      $('#add_cat').focus();
    }
  });

  $('#add_cat').keypress(function(e) {
    var k = e.keyCode || e.which;
    if (k == 13 && $('#add_cat').val() != '') {
      e.preventDefault();
    	$.ajax({
        url: './mn-categories.php?action=ajaxcall&cat_name=' + $('#add_cat').val(),
        cache: false,
        success: function(html){
          $('#cat').append(html);
          $('#post-img-add-cat').attr('src', './stuff/img/icons/tick.png');
        }
      });
      $('#add_cat').val('');
      $('#post-add-cat').hide(500);
    }
    else {
      $('#add_cat').focus();
    }
  });
  
  
  
  
  /* --- Add tag via ajax */
  $('#tagajax').click(function() {
    $.ajax({
      url: './mn-tags.php?action=ajaxcall&tag_name=' + $('#new_tag').val(),
      cache: false,
      success: function(html){
        $('\.tags').append(html);
      }
    });
    $('#new_tag').val('');
    $('#new_tag').focus();
  });

  $('#new_tag').keypress(function(e) {
    var k = e.keyCode || e.which;
    if (k == 13) {
      e.preventDefault();
      $.ajax({
        url: './mn-tags.php?action=ajaxcall&tag_name=' + $('#new_tag').val(),
        cache: false,
        success: function(html){
          $('\.tags').append(html);
        }
      });
      $('#new_tag').val('');
      $('#new_tag').focus();
    }
  });


	/* --- Select all tags */
	$('#select-all').click(function(){
		var checked_status = this.checked;
		$('\.input-tag').each(function(){
			this.checked = checked_status;
		});
	});



	$('#categories-list').tableDnD({
		dragHandle: ".dragHandle",
		onDragClass: "dragged",
	    onDrop: function(table, row) {
	        var serializedTable = $.tableDnD.serialize();
	        $.ajax({
	          url: './mn-categories.php?action=cat_order&' + serializedTable,
	          cache: false
	        });
	    }
	});






	/* --- Load files/images gallery */
	$('.mce-add-image').click(function() {
		if ($(this).hasClass('noMCE')) {
			$('#' + $(this).attr('rel')).focus();
			var hrefEnd = '&mce_area=' + $(this).attr('rel');
		}
		else {
			$('#' + $(this).attr('rel')).tinymce().focus();
			var hrefEnd = '';
		}

		$.fancybox.open({
			'closeClick': false,
			'autoSize' : true,
			'minWidth': 880,
			'maxWidth': 880,
			'minHeight': 300,
			'maxHeight': 600,
			'type': 'ajax',
			'href': './mn-files.php?ajaxcall' + hrefEnd
		});
	});



	/* --- Load image/file to MN popup */
	$('#gallery .gal-item').live('click', function() {
	
		var divID = '#' + $(this).attr('id');
		var fileName = $(divID + ' input.f-filename').val();
		var fileExt = $(divID + ' input.f-ext').val();
		var fileURL = $(divID + ' input.f-url').val();
		var fileFolder = $(divID + ' input.f-folder').val();
		var fileTitle = $(divID + ' input.f-title').val();
		var fileSize = $(divID + ' input.f-size').val();
		
		$('#mn-popup input#file_url').val(fileURL);
		$('#mn-popup input#file_title').val(fileTitle);
		$('#mn-popup input#file_folder').val(fileFolder);
		$('#mn-popup #file_url_text').val(fileName).focus();
		
		$('#mn-popup').show();
		
		if (fileFolder == 'images') {
			$('#mn-popup .image').show();
			$('#mn-popup .other').hide();
		
			var fileThumb = $(divID + ' input.f-thumb').val();
			var fileImgsize = $(divID + ' input.f-imgsize').val();
			
			
			$('#mn-popup div#preview').html('<img src="' + fileThumb + '" /><p>' + fileName + '<br /><span class="trivial">' + fileSize + ' | ' + fileImgsize + '</span></p>');
			$('#mn-popup input#file_thumb').val(fileThumb);
			$('#mn-popup #file_alt').focus().val(fileTitle);
		}
		
		else {
			$('#mn-popup .image').hide();
			$('#mn-popup .other').show();
			$('#mn-popup div#preview').html('<span class="simicon">' + fileExt + '</span><p>' + fileName + '<br /><span class="trivial">' + fileSize + '</span></p>');
		}
	
	});


	$('#mn-popup #insert_as').live('change', function() {
		if ($('#mn-popup #insert_as option:selected').val() == '3') {
			$('#link_text').show();
			$('#mn-popup #file_url_text').focus();
		}
		else {
			$('#link_text').hide();
		}
	});


	/* --- close popup */
	$('#mn-popup .pop-close').live('click', function() {
		$('#mn-popup input:not(#file_rel)').val('');
		$('#mn-popup select').val('');
		$('#mn-popup').hide();
	});

	
	$('.mce-wysiwyg').live('click', function() {
		id = $(this).attr('rel');
		mce = $('#' + id).tinymce();
		
		if (mce.isHidden()) {
			mce.show();
			$('.' + id + '.mce-add-image').removeClass('noMCE');
		} else {
			mce.hide();
			$('.' + id + '.mce-add-image').addClass('noMCE');
		}
	});


});





/* Wayfarer Tooltip
 * Version 1.0.9
 * Author Abel Mohler
 * URI: http://www.wayfarerweb.com/wtooltip.php
 * Released with the MIT License: http://www.wayfarerweb.com/mit.php
 */
(function(a){a.fn.wTooltip=function(f,r){f=a.extend({content:null,ajax:null,follow:true,auto:true,fadeIn:0,fadeOut:0,appendTip:document.body,degrade:false,offsetY:10,offsetX:1,style:{},className:null,id:null,callBefore:function(t,p,o){},callAfter:function(t,p,o){},clickAction:function(p,o){a(p).hide()},delay:0,timeout:0},f||{});if(!f.style&&typeof f.style!="object"){f.style={};f.style.zIndex="1000"}else{f.style=a.extend({border:"1px solid gray",background:"#edeef0",color:"#000",padding:"10px",zIndex:"1000",textAlign:"left"},f.style||{})}if(typeof r=="function"){f.callAfter=r||f.callAfter}f.style.display="none",f.style.position="absolute";var m,l,q,c,k={},b=true,e=false,n=false,s=document.createElement("div"),g=(typeof document.body.style.maxWidth=="undefined")?true:false,j=(typeof a.talk=="function"&&typeof a.listen=="function")?true:false;if(f.id){s.id=f.id}if(f.className){s.className=f.className}f.degrade=(f.degrade&&g)?true:false;for(var d in f.style){s.style[d]=f.style[d]}function i(o){if(o){if(f.degrade){a(s).html(f.content.replace(/<\/?[^>]+>/gi,""))}else{a(s).html(f.content)}}}if(f.ajax){a.get(f.ajax,function(o){if(o){f.content=o}i(f.content)})}function h(p){function t(u){if(m&&!f.content){m=""}}function o(){if(!e&&f.auto){clearInterval(c);if(f.fadeOut){a(s).fadeOut(f.fadeOut,function(){t(p)})}else{t(p);s.style.display="none"}}if(typeof f.callAfter=="function"){f.callAfter(s,p,f)}if(j){f=a.listen(f)}}if(f.timeout>0){q=setTimeout(function(){o()},f.timeout)}else{o()}}a(s).hover(function(){e=true},function(){e=false;h(k)});if(j){f.key=s;f.plugin="wTooltip";f.channel="wayfarer";a.talk(f)}i(f.content&&!f.ajax);a(s).appendTo(f.appendTip);return this.each(function(){a(this).hover(function(){var p=this;clearTimeout(q);if((this.title||this.titleMemKeep)&&!f.degrade&&!f.content){m=this.title||this.titleMemKeep;if(this.title){this.titleMemKeep=this.title;this.title=""}}if(f.content&&f.degrade){this.title=s.innerHTML}function o(){if(typeof f.callBefore=="function"){f.callBefore(s,p,f)}if(j){f=a.listen(f)}var t;if(f.content){if(!f.degrade){t="block"}}else{if(m&&!f.degrade){a(s).html(unescape(m));t="block";m=""}else{t="none"}}if(f.auto){if(t=="block"&&f.fadeIn){a(s).fadeIn(f.fadeIn)}else{s.style.display=t}}}if(f.delay>0){l=setTimeout(function(){o()},f.delay)}else{o()}},function(){clearTimeout(l);var o=this;b=true;if(!f.follow||n||((f.offsetX<0&&(0-f.offsetX<a(s).outerWidth()))&&(f.offsetY>0&&0-f.offsetY<a(s).outerHeight()))){setTimeout(function(){c=setInterval(function(){h(o)},1)},1)}else{h(this)}});a(this).mousemove(function(v){k=this;if(f.follow||b){var y=a(window).scrollTop(),z=a(window).scrollLeft(),w=v.clientY+y+f.offsetY,t=v.clientX+z+f.offsetX,x=a(f.appendTip).outerHeight(),p=a(f.appendTip).innerHeight(),o=a(window).width()+z-a(s).outerWidth(),u=a(window).height()+y-a(s).outerHeight();w=(x>p)?w-(x-p):w;n=(w>u||t>o)?true:false;if(t-z<=0&&f.offsetX<0){t=z}else{if(t>o){t=o}}if(w-y<=0&&f.offsetY<0){w=y}else{if(w>u){w=u}}s.style.top=w+"px";s.style.left=t+"px";b=false}});if(typeof f.clickAction=="function"){a(this).click(function(){f.clickAction(s,this)})}})}})(jQuery);


/**
 * JQuery shiftcheckbox plugin
 * @url http://sanisoft-demo.com/jquery/plugins/shiftcheckbox/
 *
 * Copyright (c) 2009 Aditya Mooley <adityamooley@sanisoft.com>
 * Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses
 */
(function(a){function b(b){var d=this.value;var e=this.checked;if(b.shiftKey){if(prevChecked!="null"){var f=0,g=0,h;h=c(d);f=0;if(h<prevChecked){a(selectorStr).each(function(a){if(f>=h&&f<=prevChecked){this.checked=e}f++})}else{a(selectorStr).each(function(a){if(f>=prevChecked&&f<=h){this.checked=e}f++})}prevChecked=h}}else{if(e){prevChecked=c(d)}}}function c(b){var c=0,d=0,e;a(selectorStr).each(function(a){if(b==this.value&&d!=1){e=c;d=1}c++});return e}a.fn.shiftcheckbox=function(){var c=null;selectorStr=this;a(selectorStr).bind("click",b)};})(jQuery)




jQuery.tableDnD={currentTable:null,dragObject:null,mouseOffset:null,oldY:0,build:function(e){e=e||{};this.each(function(){this.tableDnDConfig={onDragStyle:e.onDragStyle,onDropStyle:e.onDropStyle,onDragClass:e.onDragClass?e.onDragClass:"tDnD_whileDrag",onDrop:e.onDrop,onDragStart:e.onDragStart,scrollAmount:e.scrollAmount?e.scrollAmount:5};jQuery.tableDnD.makeDraggable(this)});jQuery(document).bind("mousemove",jQuery.tableDnD.mousemove).bind("mouseup",jQuery.tableDnD.mouseup);return this},makeDraggable:function(e){var t=e.rows;var n=e.tableDnDConfig;for(var r=0;r<t.length;r++){var i=$(t[r]).hasClass("nodrag");if(!i){jQuery(t[r]).mousedown(function(t){if(t.target.tagName=="TD"){jQuery.tableDnD.dragObject=this;jQuery.tableDnD.currentTable=e;jQuery.tableDnD.mouseOffset=jQuery.tableDnD.getMouseOffset(this,t);if(n.onDragStart){n.onDragStart(e,this)}return false}}).css("cursor","move")}}},mouseCoords:function(e){if(e.pageX||e.pageY){return{x:e.pageX,y:e.pageY}}return{x:e.clientX+document.body.scrollLeft-document.body.clientLeft,y:e.clientY+document.body.scrollTop-document.body.clientTop}},getMouseOffset:function(e,t){t=t||window.event;var n=this.getPosition(e);var r=this.mouseCoords(t);return{x:r.x-n.x,y:r.y-n.y}},getPosition:function(e){var t=0;var n=0;if(e.offsetHeight==0){e=e.firstChild}while(e.offsetParent){t+=e.offsetLeft;n+=e.offsetTop;e=e.offsetParent}t+=e.offsetLeft;n+=e.offsetTop;return{x:t,y:n}},mousemove:function(e){if(jQuery.tableDnD.dragObject==null){return}var t=jQuery(jQuery.tableDnD.dragObject);var n=jQuery.tableDnD.currentTable.tableDnDConfig;var r=jQuery.tableDnD.mouseCoords(e);var i=r.y-jQuery.tableDnD.mouseOffset.y;var s=window.pageYOffset;if(document.all){if(typeof document.compatMode!="undefined"&&document.compatMode!="BackCompat"){s=document.documentElement.scrollTop}else if(typeof document.body!="undefined"){s=document.body.scrollTop}}if(r.y-s<n.scrollAmount){window.scrollBy(0,-n.scrollAmount)}else{var o=window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight;if(o-(r.y-s)<n.scrollAmount){window.scrollBy(0,n.scrollAmount)}}if(i!=jQuery.tableDnD.oldY){var u=i>jQuery.tableDnD.oldY;jQuery.tableDnD.oldY=i;if(n.onDragClass){t.addClass(n.onDragClass)}else{t.css(n.onDragStyle)}var a=jQuery.tableDnD.findDropTargetRow(t,i);if(a){if(u&&jQuery.tableDnD.dragObject!=a){jQuery.tableDnD.dragObject.parentNode.insertBefore(jQuery.tableDnD.dragObject,a.nextSibling)}else if(!u&&jQuery.tableDnD.dragObject!=a){jQuery.tableDnD.dragObject.parentNode.insertBefore(jQuery.tableDnD.dragObject,a)}}}return false},findDropTargetRow:function(e,t){var n=jQuery.tableDnD.currentTable.rows;for(var r=0;r<n.length;r++){var i=n[r];var s=this.getPosition(i).y;var o=parseInt(i.offsetHeight)/2;if(i.offsetHeight==0){s=this.getPosition(i.firstChild).y;o=parseInt(i.firstChild.offsetHeight)/2}if(t>s-o&&t<s+o){if(i==e){return null}var u=jQuery.tableDnD.currentTable.tableDnDConfig;if(u.onAllowDrop){if(u.onAllowDrop(e,i)){return i}else{return null}}else{var a=$(i).hasClass("nodrop");if(!a){return i}else{return null}}return i}}return null},mouseup:function(e){if(jQuery.tableDnD.currentTable&&jQuery.tableDnD.dragObject){var t=jQuery.tableDnD.dragObject;var n=jQuery.tableDnD.currentTable.tableDnDConfig;if(n.onDragClass){jQuery(t).removeClass(n.onDragClass)}else{jQuery(t).css(n.onDropStyle)}jQuery.tableDnD.dragObject=null;if(n.onDrop){n.onDrop(jQuery.tableDnD.currentTable,t)}jQuery.tableDnD.currentTable=null}},serialize:function(){if(jQuery.tableDnD.currentTable){var e="";var t=jQuery.tableDnD.currentTable.id;var n=jQuery.tableDnD.currentTable.rows;for(var r=0;r<n.length;r++){if(e.length>0)e+="&";e+=t+"[]="+n[r].id}return e}else{return"Error: No Table id set, you need to set an id on your table and every row"}}}
jQuery.fn.extend({tableDnD : jQuery.tableDnD.build});



// Source: http://stackoverflow.com/a/5203450
$.fn.extend({insertAtCaret: function(myValue){ var obj; if( typeof this[0].name !='undefined' ) obj = this[0]; else obj = this; if ($.browser.msie) {obj.focus(); sel = document.selection.createRange(); sel.text = myValue; obj.focus();} else if ($.browser.mozilla || $.browser.webkit) {var startPos = obj.selectionStart; var endPos = obj.selectionEnd; var scrollTop = obj.scrollTop; obj.value = obj.value.substring(0, startPos)+myValue+obj.value.substring(endPos,obj.value.length); obj.focus(); obj.selectionStart = startPos + myValue.length; obj.selectionEnd = startPos + myValue.length; obj.scrollTop = scrollTop;} else {obj.value += myValue; obj.focus();}}});


/* --- fancyBox v2.0.6 fancyapps.com --- */
(function(s,l,d,t){var m=d(s),q=d(l),a=d.fancybox=function(){a.open.apply(this,arguments)},u=!1,k=l.createTouch!==t,o=function(a){return"string"===d.type(a)},n=function(b,c){c&&o(b)&&0<b.indexOf("%")&&(b=a.getViewport()[c]/100*parseInt(b,10));return Math.round(b)+"px"};d.extend(a,{version:"2.0.5",defaults:{padding:15,margin:20,width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,autoSize:!0,autoResize:!k,autoCenter:!k,fitToView:!0,aspectRatio:!1,topRatio:0.5,fixed:!1,scrolling:"auto",
wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3E3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},keys:{next:[13,32,34,39,40],prev:[8,33,37,38],close:[27]},tpl:{wrap:'<div class="fancybox-wrap"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe class="fancybox-iframe" name="fancybox-frame{rnd}" frameborder="0" hspace="0"'+
(d.browser.msie?' allowtransparency="true"':"")+"></iframe>",swf:'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="wmode" value="transparent" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{href}" /><embed src="{href}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="100%" height="100%" wmode="transparent"></embed></object>',error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
closeBtn:'<div title="Close" class="fancybox-item fancybox-close"></div>',next:'<a title="Next" class="fancybox-nav fancybox-next"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev"><span></span></a>'},openEffect:"fade",openSpeed:300,openEasing:"swing",openOpacity:!0,openMethod:"zoomIn",closeEffect:"fade",closeSpeed:300,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:300,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",
prevSpeed:300,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:{speedIn:0,speedOut:300,opacity:0.8,css:{cursor:"pointer"},closeClick:!0},title:{type:"float"}}},group:{},opts:{},coming:null,current:null,isOpen:!1,isOpened:!1,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(b,c){a.close(!0);b&&!d.isArray(b)&&(b=b instanceof d?d(b).get():[b]);a.isActive=!0;a.opts=d.extend(!0,{},a.defaults,c);d.isPlainObject(c)&&c.keys!==t&&(a.opts.keys=c.keys?
d.extend({},a.defaults.keys,c.keys):!1);a.group=b;a._start(a.opts.index||0)},cancel:function(){a.coming&&!1===a.trigger("onCancel")||(a.coming=null,a.hideLoading(),a.ajaxLoad&&a.ajaxLoad.abort(),a.ajaxLoad=null,a.imgPreload&&(a.imgPreload.onload=a.imgPreload.onabort=a.imgPreload.onerror=null))},close:function(b){a.cancel();a.current&&!1!==a.trigger("beforeClose")&&(a.unbindEvents(),!a.isOpen||b&&!0===b[0]?(d(".fancybox-wrap").stop().trigger("onReset").remove(),a._afterZoomOut()):(a.isOpen=a.isOpened=
!1,d(".fancybox-item, .fancybox-nav").remove(),a.wrap.stop(!0).removeClass("fancybox-opened"),a.inner.css("overflow","hidden"),a.transitions[a.current.closeMethod]()))},play:function(b){var c=function(){clearTimeout(a.player.timer)},e=function(){c();a.current&&a.player.isActive&&(a.player.timer=setTimeout(a.next,a.current.playSpeed))},f=function(){c();d("body").unbind(".player");a.player.isActive=!1;a.trigger("onPlayEnd")};if(a.player.isActive||b&&!1===b[0])f();else if(a.current&&(a.current.loop||
a.current.index<a.group.length-1))a.player.isActive=!0,d("body").bind({"afterShow.player onUpdate.player":e,"onCancel.player beforeClose.player":f,"beforeLoad.player":c}),e(),a.trigger("onPlayStart")},next:function(){a.current&&a.jumpto(a.current.index+1)},prev:function(){a.current&&a.jumpto(a.current.index-1)},jumpto:function(b){a.current&&(b=parseInt(b,10),1<a.group.length&&a.current.loop&&(b>=a.group.length?b=0:0>b&&(b=a.group.length-1)),a.group[b]!==t&&(a.cancel(),a._start(b)))},reposition:function(b,
c){var e;a.isOpen&&(e=a._getPosition(c),b&&"scroll"===b.type?(delete e.position,a.wrap.stop(!0,!0).animate(e,200)):a.wrap.css(e))},update:function(b){a.isOpen&&(u||setTimeout(function(){var c=a.current,e=!b||b&&"orientationchange"===b.type;if(u&&(u=!1,c)){if(!b||"scroll"!==b.type||e)c.autoSize&&"iframe"!==c.type&&(a.inner.height("auto"),c.height=a.inner.height()),(c.autoResize||e)&&a._setDimension(),c.canGrow&&"iframe"!==c.type&&a.inner.height("auto");(c.autoCenter||e)&&a.reposition(b);a.trigger("onUpdate")}},
200),u=!0)},toggle:function(){a.isOpen&&(a.current.fitToView=!a.current.fitToView,a.update())},hideLoading:function(){q.unbind("keypress.fb");d("#fancybox-loading").remove()},showLoading:function(){a.hideLoading();q.bind("keypress.fb",function(b){27===b.keyCode&&(b.preventDefault(),a.cancel())});d('<div id="fancybox-loading"><div></div></div>').click(a.cancel).appendTo("body")},getViewport:function(){return{x:m.scrollLeft(),y:m.scrollTop(),w:k&&s.innerWidth?s.innerWidth:m.width(),h:k&&s.innerHeight?
s.innerHeight:m.height()}},unbindEvents:function(){a.wrap&&a.wrap.unbind(".fb");q.unbind(".fb");m.unbind(".fb")},bindEvents:function(){var b=a.current,c=b.keys;b&&(m.bind("resize.fb orientationchange.fb"+(b.autoCenter&&!b.fixed?" scroll.fb":""),a.update),c&&q.bind("keydown.fb",function(b){var f;f=b.target||b.srcElement;if(!b.ctrlKey&&!b.altKey&&!b.shiftKey&&!b.metaKey&&(!f||!f.type&&!d(f).is("[contenteditable]")))f=b.keyCode,-1<d.inArray(f,c.close)?(a.close(),b.preventDefault()):-1<d.inArray(f,c.next)?
(a.next(),b.preventDefault()):-1<d.inArray(f,c.prev)&&(a.prev(),b.preventDefault())}),d.fn.mousewheel&&b.mouseWheel&&1<a.group.length&&a.wrap.bind("mousewheel.fb",function(b,c){var d=b.target||null;if(0!==c&&(!d||0===d.clientHeight||d.scrollHeight===d.clientHeight&&d.scrollWidth===d.clientWidth))b.preventDefault(),a[0<c?"prev":"next"]()}))},trigger:function(b,c){var e,f=c||a[-1<d.inArray(b,["onCancel","beforeLoad","afterLoad"])?"coming":"current"];if(f){d.isFunction(f[b])&&(e=f[b].apply(f,Array.prototype.slice.call(arguments,
1)));if(!1===e)return!1;f.helpers&&d.each(f.helpers,function(c,e){if(e&&d.isPlainObject(a.helpers[c])&&d.isFunction(a.helpers[c][b]))a.helpers[c][b](e,f)});d.event.trigger(b+".fb")}},isImage:function(a){return o(a)&&a.match(/\.(jpe?g|gif|png|bmp)((\?|#).*)?$/i)},isSWF:function(a){return o(a)&&a.match(/\.(swf)((\?|#).*)?$/i)},_start:function(b){var c={},e=a.group[b]||null,f,g,i;if(e&&(e.nodeType||e instanceof d))f=!0,d.metadata&&(c=d(e).metadata());c=d.extend(!0,{},a.opts,{index:b,element:e},d.isPlainObject(e)?
e:c);d.each(["href","title","content","type"],function(b,g){c[g]=a.opts[g]||f&&d(e).attr(g)||c[g]||null});"number"===typeof c.margin&&(c.margin=[c.margin,c.margin,c.margin,c.margin]);c.modal&&d.extend(!0,c,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,mouseWheel:!1,keys:null,helpers:{overlay:{css:{cursor:"auto"},closeClick:!1}}});a.coming=c;if(!1===a.trigger("beforeLoad"))a.coming=null;else{g=c.type;b=c.href||e;g||(f&&(g=d(e).data("fancybox-type"),g||(g=(g=e.className.match(/fancybox\.(\w+)/))?
g[1]:null)),!g&&o(b)&&(a.isImage(b)?g="image":a.isSWF(b)?g="swf":b.match(/^#/)&&(g="inline")),g||(g=f?"inline":"html"),c.type=g);if("inline"===g||"html"===g){if(c.content||(c.content="inline"===g?d(o(b)?b.replace(/.*(?=#[^\s]+$)/,""):b):e),!c.content||!c.content.length)g=null}else b||(g=null);"ajax"===g&&o(b)&&(i=b.split(/\s+/,2),b=i.shift(),c.selector=i.shift());c.href=b;c.group=a.group;c.isDom=f;switch(g){case "image":a._loadImage();break;case "ajax":a._loadAjax();break;case "inline":case "iframe":case "swf":case "html":a._afterLoad();
break;default:a._error("type")}}},_error:function(b){a.hideLoading();d.extend(a.coming,{type:"html",autoSize:!0,minWidth:0,minHeight:0,padding:15,hasError:b,content:a.coming.tpl.error});a._afterLoad()},_loadImage:function(){var b=a.imgPreload=new Image;b.onload=function(){this.onload=this.onerror=null;a.coming.width=this.width;a.coming.height=this.height;a._afterLoad()};b.onerror=function(){this.onload=this.onerror=null;a._error("image")};b.src=a.coming.href;(b.complete===t||!b.complete)&&a.showLoading()},
_loadAjax:function(){a.showLoading();a.ajaxLoad=d.ajax(d.extend({},a.coming.ajax,{url:a.coming.href,error:function(b,c){a.coming&&"abort"!==c?a._error("ajax",b):a.hideLoading()},success:function(b,c){"success"===c&&(a.coming.content=b,a._afterLoad())}}))},_preloadImages:function(){var b=a.group,c=a.current,e=b.length,f,g,i,h=Math.min(c.preload,e-1);if(c.preload&&!(2>b.length))for(i=1;i<=h;i+=1)if(f=b[(c.index+i)%e],g=f.href||d(f).attr("href")||f,"image"===f.type||a.isImage(g))(new Image).src=g},_afterLoad:function(){a.hideLoading();
!a.coming||!1===a.trigger("afterLoad",a.current)?a.coming=!1:(a.isOpened?(d(".fancybox-item, .fancybox-nav").remove(),a.wrap.stop(!0).removeClass("fancybox-opened"),a.inner.css("overflow","hidden"),a.transitions[a.current.prevMethod]()):(d(".fancybox-wrap").stop().trigger("onReset").remove(),a.trigger("afterClose")),a.unbindEvents(),a.isOpen=!1,a.current=a.coming,a.wrap=d(a.current.tpl.wrap).addClass("fancybox-"+(k?"mobile":"desktop")+" fancybox-type-"+a.current.type+" fancybox-tmp "+a.current.wrapCSS).appendTo("body"),
a.skin=d(".fancybox-skin",a.wrap).css("padding",n(a.current.padding)),a.outer=d(".fancybox-outer",a.wrap),a.inner=d(".fancybox-inner",a.wrap),a._setContent())},_setContent:function(){var b=a.current,c=b.content,e=b.type,f=b.minWidth,g=b.minHeight,i=b.maxWidth,h=b.maxHeight;switch(e){case "inline":case "ajax":case "html":b.selector?c=d("<div>").html(c).find(b.selector):c instanceof d&&(c.parent().hasClass("fancybox-inner")&&c.parents(".fancybox-wrap").unbind("onReset"),c=c.show().detach(),d(a.wrap).bind("onReset",
function(){c.appendTo("body").hide()}));b.autoSize&&(f=d('<div class="fancybox-wrap '+a.current.wrapCSS+' fancybox-tmp"></div>').appendTo("body").css({minWidth:n(f,"w"),minHeight:n(g,"h"),maxWidth:n(i,"w"),maxHeight:n(h,"h")}).append(c),b.width=f.width(),b.height=f.height(),f.width(a.current.width),f.height()>b.height&&(f.width(b.width+1),b.width=f.width(),b.height=f.height()),c=f.contents().detach(),f.remove());break;case "image":c=b.tpl.image.replace("{href}",b.href);b.aspectRatio=!0;break;case "swf":c=
b.tpl.swf.replace(/\{width\}/g,b.width).replace(/\{height\}/g,b.height).replace(/\{href\}/g,b.href);break;case "iframe":c=d(b.tpl.iframe.replace("{rnd}",(new Date).getTime())).attr("scrolling",b.scrolling).attr("src",b.href),b.scrolling=k?"scroll":"auto"}if("image"===e||"swf"===e)b.autoSize=!1,b.scrolling="visible";"iframe"===e&&b.autoSize?(a.showLoading(),a._setDimension(),a.inner.css("overflow",b.scrolling),c.bind({onCancel:function(){d(this).unbind();a._afterZoomOut()},load:function(){a.hideLoading();
try{this.contentWindow.document.location&&(a.current.height=d(this).contents().find("body").height())}catch(b){a.current.autoSize=!1}a[a.isOpen?"_afterZoomIn":"_beforeShow"]()}}).appendTo(a.inner)):(a.inner.append(c),a._beforeShow())},_beforeShow:function(){a.coming=null;a.trigger("beforeShow");a._setDimension();a.wrap.hide().removeClass("fancybox-tmp");a.bindEvents();a._preloadImages();a.transitions[a.isOpened?a.current.nextMethod:a.current.openMethod]()},_setDimension:function(){var b=a.wrap,c=
a.inner,e=a.current,f=a.getViewport(),g=e.margin,i=2*e.padding,h=e.width,j=e.height,r=e.maxWidth+i,k=e.maxHeight+i,l=e.minWidth+i,m=e.minHeight+i,p;f.w-=g[1]+g[3];f.h-=g[0]+g[2];o(h)&&0<h.indexOf("%")&&(h=(f.w-i)*parseFloat(h)/100);o(j)&&0<j.indexOf("%")&&(j=(f.h-i)*parseFloat(j)/100);g=h/j;h+=i;j+=i;e.fitToView&&(r=Math.min(f.w,r),k=Math.min(f.h,k));if(e.aspectRatio){if(h>r&&(h=r,j=(h-i)/g+i),j>k&&(j=k,h=(j-i)*g+i),h<l&&(h=l,j=(h-i)/g+i),j<m)j=m,h=(j-i)*g+i}else h=Math.max(l,Math.min(h,r)),j=Math.max(m,
Math.min(j,k));h=Math.round(h);j=Math.round(j);d(b.add(c)).width("auto").height("auto");c.width(h-i).height(j-i);b.width(h);p=b.height();if(h>r||p>k)for(;(h>r||p>k)&&h>l&&p>m;)j-=10,e.aspectRatio?(h=Math.round((j-i)*g+i),h<l&&(h=l,j=(h-i)/g+i)):h-=10,c.width(h-i).height(j-i),b.width(h),p=b.height();e.dim={width:n(h),height:n(p)};e.canGrow=e.autoSize&&j>m&&j<k;e.canShrink=!1;e.canExpand=!1;if(h-i<e.width||j-i<e.height)e.canExpand=!0;else if((h>f.w||p>f.h)&&h>l&&j>m)e.canShrink=!0;a.innerSpace=p-i-
c.height()},_getPosition:function(b){var c=a.current,e=a.getViewport(),f=c.margin,d=a.wrap.width()+f[1]+f[3],i=a.wrap.height()+f[0]+f[2],h={position:"absolute",top:f[0]+e.y,left:f[3]+e.x};c.autoCenter&&c.fixed&&!b&&i<=e.h&&d<=e.w&&(h={position:"fixed",top:f[0],left:f[3]});h.top=n(Math.max(h.top,h.top+(e.h-i)*c.topRatio));h.left=n(Math.max(h.left,h.left+0.5*(e.w-d)));return h},_afterZoomIn:function(){var b=a.current,c=b?b.scrolling:"no";if(b&&(a.isOpen=a.isOpened=!0,a.wrap.addClass("fancybox-opened"),
a.inner.css("overflow","yes"===c?"scroll":"no"===c?"hidden":c),a.trigger("afterShow"),a.update(),(b.closeClick||b.nextClick)&&a.inner.css("cursor","pointer").bind("click.fb",function(c){if(!d(c.target).is("a")&&!d(c.target).parent().is("a"))a[b.closeClick?"close":"next"]()}),b.closeBtn&&d(b.tpl.closeBtn).appendTo(a.skin).bind("click.fb",a.close),b.arrows&&1<a.group.length&&((b.loop||0<b.index)&&d(b.tpl.prev).appendTo(a.outer).bind("click.fb",a.prev),(b.loop||b.index<a.group.length-1)&&d(b.tpl.next).appendTo(a.outer).bind("click.fb",
a.next)),a.opts.autoPlay&&!a.player.isActive))a.opts.autoPlay=!1,a.play()},_afterZoomOut:function(){var b=a.current;a.wrap.trigger("onReset").remove();d.extend(a,{group:{},opts:{},current:null,isActive:!1,isOpened:!1,isOpen:!1,wrap:null,skin:null,outer:null,inner:null});a.trigger("afterClose",b)}});a.transitions={getOrigPosition:function(){var b=a.current,c=b.element,e=b.padding,f=d(b.orig),g={},i=50,h=50;!f.length&&b.isDom&&d(c).is(":visible")&&(f=d(c).find("img:first"),f.length||(f=d(c)));f.length?
(g=f.offset(),f.is("img")&&(i=f.outerWidth(),h=f.outerHeight())):(b=a.getViewport(),g.top=b.y+0.5*(b.h-h),g.left=b.x+0.5*(b.w-i));return g={top:n(g.top-e),left:n(g.left-e),width:n(i+2*e),height:n(h+2*e)}},step:function(b,c){var e=c.prop,d,g;if("width"===e||"height"===e)d=Math.ceil(b-2*a.current.padding),"height"===e&&(g=(b-c.start)/(c.end-c.start),c.start>c.end&&(g=1-g),d-=a.innerSpace*g),a.inner[e](d)},zoomIn:function(){var b=a.wrap,c=a.current,e=c.openEffect,f="elastic"===e,g=d.extend({},c.dim,
a._getPosition(f)),i=d.extend({opacity:1},g);delete i.position;f?(g=this.getOrigPosition(),c.openOpacity&&(g.opacity=0),a.outer.add(a.inner).width("auto").height("auto")):"fade"===e&&(g.opacity=0);b.css(g).show().animate(i,{duration:"none"===e?0:c.openSpeed,easing:c.openEasing,step:f?this.step:null,complete:a._afterZoomIn})},zoomOut:function(){var b=a.wrap,c=a.current,d=c.openEffect,f="elastic"===d,g={opacity:0};f&&("fixed"===b.css("position")&&b.css(a._getPosition(!0)),g=this.getOrigPosition(),c.closeOpacity&&
(g.opacity=0));b.animate(g,{duration:"none"===d?0:c.closeSpeed,easing:c.closeEasing,step:f?this.step:null,complete:a._afterZoomOut})},changeIn:function(){var b=a.wrap,c=a.current,d=c.nextEffect,f="elastic"===d,g=a._getPosition(f),i={opacity:1};g.opacity=0;f&&(g.top=n(parseInt(g.top,10)-200),i.top="+=200px");b.css(g).show().animate(i,{duration:"none"===d?0:c.nextSpeed,easing:c.nextEasing,complete:a._afterZoomIn})},changeOut:function(){var b=a.wrap,c=a.current,e=c.prevEffect,f={opacity:0};b.removeClass("fancybox-opened");
"elastic"===e&&(f.top="+=200px");b.animate(f,{duration:"none"===e?0:c.prevSpeed,easing:c.prevEasing,complete:function(){d(this).trigger("onReset").remove()}})}};a.helpers.overlay={overlay:null,update:function(){var a,c;this.overlay.width("100%").height("100%");d.browser.msie||k?(a=Math.max(l.documentElement.scrollWidth,l.body.scrollWidth),c=Math.max(l.documentElement.offsetWidth,l.body.offsetWidth),a=a<c?m.width():a):a=q.width();this.overlay.width(a).height(q.height())},beforeShow:function(b){this.overlay||
(b=d.extend(!0,{},a.defaults.helpers.overlay,b),this.overlay=d('<div id="fancybox-overlay"></div>').css(b.css).appendTo("body"),b.closeClick&&this.overlay.bind("click.fb",a.close),a.current.fixed&&!k?this.overlay.addClass("overlay-fixed"):(this.update(),this.onUpdate=function(){this.update()}),this.overlay.fadeTo(b.speedIn,b.opacity))},afterClose:function(a){this.overlay&&this.overlay.fadeOut(a.speedOut||0,function(){d(this).remove()});this.overlay=null}};a.helpers.title={beforeShow:function(b){var c;
if(c=a.current.title)c=d('<div class="fancybox-title fancybox-title-'+b.type+'-wrap">'+c+"</div>").appendTo("body"),"float"===b.type&&(c.width(c.width()),c.wrapInner('<span class="child"></span>'),a.current.margin[2]+=Math.abs(parseInt(c.css("margin-bottom"),10))),c.appendTo("over"===b.type?a.inner:"outside"===b.type?a.wrap:a.skin)}};d.fn.fancybox=function(b){var c=d(this),e=this.selector||"",f,g=function(g){var h=this,j=f,k;!g.ctrlKey&&!g.altKey&&!g.shiftKey&&!g.metaKey&&!d(h).is(".fancybox-wrap")&&
(g.preventDefault(),g=b.groupAttr||"data-fancybox-group",k=d(h).attr(g),k||(g="rel",k=h[g]),k&&""!==k&&"nofollow"!==k&&(h=e.length?d(e):c,h=h.filter("["+g+'="'+k+'"]'),j=h.index(this)),b.index=j,a.open(h,b))},b=b||{};f=b.index||0;e?q.undelegate(e,"click.fb-start").delegate(e,"click.fb-start",g):c.unbind("click.fb-start").bind("click.fb-start",g);return this};d(l).ready(function(){a.defaults.fixed=d.support.fixedPosition||!(d.browser.msie&&6>=d.browser.version)&&!k})})(window,document,jQuery);

/*
 * jQuery FriendURL plugin 1.5
 *
 * http://www.bulgaria-web-developers.com/blog/2009/03/18/jquery-seo-friendly-url-plugin/
 *
 * Copyright (c) 2009 Dimitar Ivanov
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function(e) {
    var t = ["а", "б", "в", "г", "д", "е", "ж", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ь", "ю", "я", "А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ь", "Ю", "Я", "á", "ä", "č", "ď", "é", "ě", "í", "ĺ", "ľ", "ň", "ó", "ô", "ö", "ŕ", "ř", "š", "ť", "ú", "ů", "ü", "ý", "ž", "."];
    var n = ["a", "b", "v", "g", "d", "e", "zh", "z", "i", "y", "k", "l", "m", "n", "o", "p", "r", "s", "t", "u", "f", "h", "ts", "ch", "sh", "sht", "a", "y", "yu", "ya", "A", "B", "B", "G", "D", "E", "Zh", "Z", "I", "Y", "K", "L", "M", "N", "O", "P", "R", "S", "T", "U", "F", "H", "Ts", "Ch", "Sh", "Sht", "A", "Y", "Yu", "Ya", "a", "a", "c", "d", "e", "e", "i", "l", "l", "n", "o", "o", "o", "r", "r", "s", "t", "u", "u", "u", "y", "z", "-"];
    var r = "";
    e.fn.friendurl = function(i) {
        function o(e) {
            r = u(t, n, e);
            return r
        }
        function u(e, t, n, r) {
            var i = 0, s = 0, o = "", u = "", a = 0, f = 0, l = [].concat(e), c = [].concat(t), h = n, p = c instanceof Array, d = h instanceof Array;
            h = [].concat(h);
            if (r) {
                this.window[r] = 0
            }
            for (i = 0, a = h.length; i < a; i++) {
                if (h[i] === "") {
                    continue
                }
                for (s = 0, f = l.length; s < f; s++) {
                    o = h[i] + "";
                    u = p ? c[s] !== undefined ? c[s] : "" : c[0];
                    h[i] = o.split(l[s]).join(u);
                    if (r && h[i] !== o) {
                        this.window[r] += (o.length - h[i].length) / l[s].length
                    }
                }
            }
            return d ? h : h[0]
        }
        var s = {
            divider: "-"
        };
        var i = e.extend(s, i);
        return this.each(function() {
            e(this).keyup(function() {
                var t = e(this).val().toLowerCase().replace(/^\s+|\s+$/g, "").replace(/[_|\s]+/g, "-").replace(/[^a-záäčďéěíĺľňóôöŕřšťúůüýž\.\u0400-\u04FF0-9-]+/g, "").replace(/[-]+/g, "-").replace(/^-+|-+$/g, "").replace(/[-]+/g, i.divider);
                t = o(t);
                e("#" + i.id).val(t)
            })
        })
    }
})(jQuery)