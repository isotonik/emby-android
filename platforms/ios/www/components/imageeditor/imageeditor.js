define(["components/paperdialoghelper","css!css/metadataeditor.css","paper-fab"],function(e){function t(){var e={};return e.itemId=p.Id,e}function n(e,t){Dashboard.showLoadingMsg(),t?a(e,t):ApiClient.getItem(Dashboard.getCurrentUserId(),p.Id).then(function(t){a(e,t)})}function a(e,n){p=n,ApiClient.getRemoteImageProviders(t()).then(function(t){t.length?$(".btnBrowseAllImages",e).removeClass("hide"):$(".btnBrowseAllImages",e).addClass("hide"),ApiClient.getItemImageInfos(p.Id).then(function(a){o(e,n,a,t),r(e,n,a,t),l(e,n,a,t),Dashboard.hideLoadingMsg()})})}function i(e,t,a,i,o){for(var r="",l=0,s=a.length;s>l;l++){var c=a[l];r+='<div class="editorTile imageEditorTile">',r+='<div class="editorTileInner">';var g=150;r+='<div style="height:'+g+'px;vertical-align:top;background-repeat:no-repeat;background-position:center bottom;background-size:contain;" class="lazy" data-src="'+LibraryBrowser.getImageUrl(p,c.ImageType,c.ImageIndex,{height:g})+'"></div>',r+='<div class="editorTileFooter">',"Backdrop"!==c.ImageType&&"Screenshot"!==c.ImageType&&(r+="<h3>"+c.ImageType+"</h3>"),r+=c.Width&&c.Height?"<p>"+c.Width+" X "+c.Height+"</p>":"<p>&nbsp;</p>",r+="<div>","Backdrop"==c.ImageType||"Screenshot"==c.ImageType?(r+=l>0?'<paper-icon-button class="btnMoveImage" icon="chevron-left" data-imagetype="'+c.ImageType+'" data-index="'+c.ImageIndex+'" data-newindex="'+(c.ImageIndex-1)+'" title="'+Globalize.translate("ButtonMoveLeft")+'"></paper-icon-button>':'<paper-icon-button icon="chevron-left" disabled title="'+Globalize.translate("ButtonMoveLeft")+'"></paper-icon-button>',r+=s-1>l?'<paper-icon-button class="btnMoveImage" icon="chevron-right" data-imagetype="'+c.ImageType+'" data-index="'+c.ImageIndex+'" data-newindex="'+(c.ImageIndex+1)+'" title="'+Globalize.translate("ButtonMoveRight")+'"></paper-icon-button>':'<paper-icon-button icon="chevron-right" disabled title="'+Globalize.translate("ButtonMoveRight")+'"></paper-icon-button>'):i.length&&(r+='<paper-icon-button icon="search" data-imagetype="'+c.ImageType+'" class="btnSearchImages" title="'+Globalize.translate("ButtonBrowseOnlineImages")+'"></paper-icon-button>'),r+='<paper-icon-button icon="delete" data-imagetype="'+c.ImageType+'" data-index="'+(null!=c.ImageIndex?c.ImageIndex:"null")+'" class="btnDeleteImage" title="'+Globalize.translate("Delete")+'"></paper-icon-button>',r+="</div>",r+="</div>",r+="</div>",r+="</div>"}o.innerHTML=r,ImageLoader.lazyChildren(o),$(".btnSearchImages",o).on("click",function(){d(e,this.getAttribute("data-imagetype"))}),$(".btnDeleteImage",o).on("click",function(){var t=this.getAttribute("data-imagetype"),a=this.getAttribute("data-index");a="null"==a?null:parseInt(a),Dashboard.confirm(Globalize.translate("DeleteImageConfirmation"),Globalize.translate("HeaderDeleteImage"),function(i){i&&ApiClient.deleteItemImage(p.Id,t,a).then(function(){u=!0,n(e)})})}),$(".btnMoveImage",o).on("click",function(){var t=this.getAttribute("data-imagetype"),a=parseInt(this.getAttribute("data-index")),i=parseInt(this.getAttribute("data-newindex"));ApiClient.updateItemImageIndex(p.Id,t,a,i).then(function(){u=!0,n(e)})})}function o(e,t,n,a){var o=n.filter(function(e){return"Screenshot"!=e.ImageType&&"Backdrop"!=e.ImageType&&"Chapter"!=e.ImageType});i(e,t,o,a,e.querySelector("#images"))}function r(e,t,n,a){var o=n.filter(function(e){return"Backdrop"==e.ImageType}).sort(function(e,t){return e.ImageIndex-t.ImageIndex});o.length?($("#backdropsContainer",e).show(),i(e,t,o,a,e.querySelector("#backdrops"))):$("#backdropsContainer",e).hide()}function l(e,t,n,a){var o=n.filter(function(e){return"Screenshot"==e.ImageType}).sort(function(e,t){return e.ImageIndex-t.ImageIndex});o.length?($("#screenshotsContainer",e).show(),i(e,t,o,a,$("#screenshots",e))):$("#screenshotsContainer",e).hide()}function d(e,t){require(["components/imagedownloader/imagedownloader"],function(a){a.show(p.Id,p.Type,t).then(function(t){t&&(u=!0,n(e))})})}function s(e,t){$(".btnOpenUploadMenu",e).on("click",function(){require(["components/imageuploader/imageuploader"],function(a){a.show(p.Id,{theme:t.theme}).then(function(t){t&&(u=!0,n(e))})})}),$(".btnBrowseAllImages",e).on("click",function(){d(e,this.getAttribute("data-imagetype")||"Primary")})}function c(t,a){a=a||{},Dashboard.showLoadingMsg();var i=new XMLHttpRequest;i.open("GET","components/imageeditor/imageeditor.template.html",!0),i.onload=function(){var i=this.response;ApiClient.getItem(Dashboard.getCurrentUserId(),t).then(function(t){var o=e.createDialog({theme:a.theme}),r="";r+='<h2 class="dialogHeader">',r+='<paper-fab icon="arrow-back" mini class="btnCloseDialog"></paper-fab>',r+='<div style="display:inline-block;margin-left:.6em;vertical-align:middle;">'+t.Name+"</div>",r+="</h2>",r+='<div class="editorContent">',r+=Globalize.translateDocument(i),r+="</div>",o.innerHTML=r,document.body.appendChild(o),s(o,a),$(o).on("iron-overlay-closed",g),e.open(o);var l=o.querySelector(".editorContent");n(l,t),$(".btnCloseDialog",o).on("click",function(){e.close(o)})})},i.send()}function g(){$(this).remove(),Dashboard.hideLoadingMsg(),m.resolveWith(null,[u])}var p,m,u=!1;return{show:function(e,t){var n=DeferredBuilder.Deferred();return m=n,u=!1,c(e,t),n.promise()}}});