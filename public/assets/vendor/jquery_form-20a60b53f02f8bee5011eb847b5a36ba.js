/*
 *
 * jQuery Form Plugin
 * @requires jQuery v1.1 or later
 *
 * Examples at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.form.js 2884 2007-08-24 23:13:55Z malsup $
 */
(function($){function clickHandler(a){var b=this.form;b.clk=this;if(this.type=="image")if(a.offsetX!=undefined)b.clk_x=a.offsetX,b.clk_y=a.offsetY;else if(typeof $.fn.offset=="function"){var c=$(this).offset();b.clk_x=a.pageX-c.left,b.clk_y=a.pageY-c.top}else b.clk_x=a.pageX-this.offsetLeft,b.clk_y=a.pageY-this.offsetTop;setTimeout(function(){b.clk=b.clk_x=b.clk_y=null},10)}function submitHandler(){var a=this.formPluginId,b=$.fn.ajaxForm.optionHash[a];return $(this).ajaxSubmit(b),!1}$.fn.ajaxSubmit=function(options){function fileUpload(){function cb(){if(cbInvoked++)return;io.detachEvent?io.detachEvent("onload",cb):io.removeEventListener("load",cb,!1);var ok=!0;try{if(timedOut)throw"timeout";var data,doc;doc=io.contentWindow?io.contentWindow.document:io.contentDocument?io.contentDocument:io.document,xhr.responseText=doc.body?doc.body.innerHTML:null,xhr.responseXML=doc.XMLDocument?doc.XMLDocument:doc;if(opts.dataType=="json"||opts.dataType=="script"){var ta=doc.getElementsByTagName("textarea")[0];data=ta?ta.value:xhr.responseText,opts.dataType=="json"?eval("data = "+data):$.globalEval(data)}else opts.dataType=="xml"?(data=xhr.responseXML,!data&&xhr.responseText!=null&&(data=toXml(xhr.responseText))):data=xhr.responseText}catch(e){ok=!1,$.handleError(opts,xhr,"error",e)}ok&&(opts.success(data,"success"),g&&$.event.trigger("ajaxSuccess",[xhr,opts])),g&&$.event.trigger("ajaxComplete",[xhr,opts]),g&&!--$.active&&$.event.trigger("ajaxStop"),opts.complete&&opts.complete(xhr,ok?"success":"error"),setTimeout(function(){$io.remove(),xhr.responseXML=null},100)}function toXml(a,b){return window.ActiveXObject?(b=new ActiveXObject("Microsoft.XMLDOM"),b.async="false",b.loadXML(a)):b=(new DOMParser).parseFromString(a,"text/xml"),b&&b.documentElement&&b.documentElement.tagName!="parsererror"?b:null}var form=$form[0],opts=$.extend({},$.ajaxSettings,options),id="jqFormIO"+$.fn.ajaxSubmit.counter++,$io=$('<iframe id="'+id+'" name="'+id+'" />'),io=$io[0],op8=$.browser.opera&&window.opera.version()<9;if($.browser.msie||op8)io.src='javascript:false;document.write("");';$io.css({position:"absolute",top:"-1000px",left:"-1000px"});var xhr={responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){}},g=opts.global;g&&!($.active++)&&$.event.trigger("ajaxStart"),g&&$.event.trigger("ajaxSend",[xhr,opts]);var cbInvoked=0,timedOut=0;setTimeout(function(){$io.appendTo("body"),io.attachEvent?io.attachEvent("onload",cb):io.addEventListener("load",cb,!1);var a=form.encoding?"encoding":"enctype",b=$form.attr("target");$form.attr({target:id,method:"POST",action:opts.url}),form[a]="multipart/form-data",opts.timeout&&setTimeout(function(){timedOut=!0,cb()},opts.timeout),form.submit(),$form.attr("target",b)},10)}typeof options=="function"&&(options={success:options}),options=$.extend({url:this.attr("action")||window.location,type:this.attr("method")||"GET"},options||{});var veto={};$.event.trigger("form.pre.serialize",[this,options,veto]);if(veto.veto)return this;var a=this.formToArray(options.semantic);if(options.beforeSubmit&&options.beforeSubmit(a,this,options)===!1)return this;$.event.trigger("form.submit.validate",[a,this,options,veto]);if(veto.veto)return this;var q=$.param(a);options.type.toUpperCase()=="GET"?(options.url+=(options.url.indexOf("?")>=0?"&":"?")+q,options.data=null):options.data=q;var $form=this,callbacks=[];options.resetForm&&callbacks.push(function(){$form.resetForm()}),options.clearForm&&callbacks.push(function(){$form.clearForm()});if(!options.dataType&&options.target){var oldSuccess=options.success||function(){};callbacks.push(function(a){this.evalScripts?$(options.target).attr("innerHTML",a).evalScripts().each(oldSuccess,arguments):$(options.target).html(a).each(oldSuccess,arguments)})}else options.success&&callbacks.push(options.success);options.success=function(a,b){for(var c=0,d=callbacks.length;c<d;c++)callbacks[c](a,b,$form)};var files=$("input:file",this).fieldValue(),found=!1;for(var j=0;j<files.length;j++)files[j]&&(found=!0);return options.iframe||found?fileUpload():$.ajax(options),$.event.trigger("form.submit.notify",[this,options]),this},$.fn.ajaxSubmit.counter=0,$.fn.ajaxForm=function(a){return this.ajaxFormUnbind().submit(submitHandler).each(function(){this.formPluginId=$.fn.ajaxForm.counter++,$.fn.ajaxForm.optionHash[this.formPluginId]=a,$(":submit,input:image",this).click(clickHandler)})},$.fn.ajaxForm.counter=1,$.fn.ajaxForm.optionHash={},$.fn.ajaxFormUnbind=function(){return this.unbind("submit",submitHandler),this.each(function(){$(":submit,input:image",this).unbind("click",clickHandler)})},$.fn.formToArray=function(a){var b=[];if(this.length==0)return b;var c=this[0],d=a?c.getElementsByTagName("*"):c.elements;if(!d)return b;for(var e=0,f=d.length;e<f;e++){var g=d[e],h=g.name;if(!h)continue;if(a&&c.clk&&g.type=="image"){!g.disabled&&c.clk==g&&b.push({name:h+".x",value:c.clk_x},{name:h+".y",value:c.clk_y});continue}var i=$.fieldValue(g,!0);if(i&&i.constructor==Array)for(var j=0,k=i.length;j<k;j++)b.push({name:h,value:i[j]});else i!==null&&typeof i!="undefined"&&b.push({name:h,value:i})}if(!a&&c.clk){var l=c.getElementsByTagName("input");for(var e=0,f=l.length;e<f;e++){var m=l[e],h=m.name;h&&!m.disabled&&m.type=="image"&&c.clk==m&&b.push({name:h+".x",value:c.clk_x},{name:h+".y",value:c.clk_y})}}return b},$.fn.formSerialize=function(a){return $.param(this.formToArray(a))},$.fn.fieldSerialize=function(a){var b=[];return this.each(function(){var c=this.name;if(!c)return;var d=$.fieldValue(this,a);if(d&&d.constructor==Array)for(var e=0,f=d.length;e<f;e++)b.push({name:c,value:d[e]});else d!==null&&typeof d!="undefined"&&b.push({name:this.name,value:d})}),$.param(b)},$.fn.fieldValue=function(a){for(var b=[],c=0,d=this.length;c<d;c++){var e=this[c],f=$.fieldValue(e,a);if(f===null||typeof f=="undefined"||f.constructor==Array&&!f.length)continue;f.constructor==Array?$.merge(b,f):b.push(f)}return b},$.fieldValue=function(a,b){var c=a.name,d=a.type,e=a.tagName.toLowerCase();typeof b=="undefined"&&(b=!0);if(b&&(!c||a.disabled||d=="reset"||d=="button"||(d=="checkbox"||d=="radio")&&!a.checked||(d=="submit"||d=="image")&&a.form&&a.form.clk!=a||e=="select"&&a.selectedIndex==-1))return null;if(e=="select"){var f=a.selectedIndex;if(f<0)return null;var g=[],h=a.options,i=d=="select-one",j=i?f+1:h.length;for(var k=i?f:0;k<j;k++){var l=h[k];if(l.selected){var m=$.browser.msie&&!l.attributes.value.specified?l.text:l.value;if(i)return m;g.push(m)}}return g}return a.value},$.fn.clearForm=function(){return this.each(function(){$("input,select,textarea",this).clearFields()})},$.fn.clearFields=$.fn.clearInputs=function(){return this.each(function(){var a=this.type,b=this.tagName.toLowerCase();a=="text"||a=="password"||b=="textarea"?this.value="":a=="checkbox"||a=="radio"?this.checked=!1:b=="select"&&(this.selectedIndex=-1)})},$.fn.resetForm=function(){return this.each(function(){(typeof this.reset=="function"||typeof this.reset=="object"&&!this.reset.nodeType)&&this.reset()})}})(jQuery);