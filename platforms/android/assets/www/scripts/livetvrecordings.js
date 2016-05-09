define(["jQuery"],function(e){function i(e){var i="";return i+="<paper-icon-item>",i+='<paper-fab mini class="blue" icon="live-tv" item-icon></paper-fab>',i+="<paper-item-body two-line>",i+='<a href="livetvrecordinglist.html?groupid='+e.Id+'" class="clearLink">',i+="<div>",i+=e.Name,i+="</div>",i+="<div secondary>",i+=1==e.RecordingCount?Globalize.translate("ValueItemCount",e.RecordingCount):Globalize.translate("ValueItemCountPlural",e.RecordingCount),i+="</div>",i+="</a>",i+="</paper-item-body>",i+="</paper-icon-item>"}function r(r,n){n.length?e("#recordingGroups",r).show():e("#recordingGroups",r).hide();var t="";t+='<div class="paperList">';for(var o=0,a=n.length;a>o;o++)t+=i(n[o]);t+="</div>",r.querySelector("#recordingGroupItems").innerHTML=t,Dashboard.hideLoadingMsg()}function n(e,i){i.length?e.classList.remove("hide"):e.classList.add("hide");var r=e.querySelector(".recordingItems");r.innerHTML=LibraryBrowser.getPosterViewHtml({items:i,shape:"auto",showTitle:!0,showParentTitle:!0,centerText:!0,coverImage:!0,lazy:!0,overlayPlayButton:!0}),ImageLoader.lazyChildren(r)}function t(e){ApiClient.getLiveTvRecordings({userId:Dashboard.getCurrentUserId(),IsInProgress:!0,Fields:"CanDelete"}).then(function(i){n(e.querySelector("#activeRecordings"),i.Items)})}function o(e){ApiClient.getLiveTvRecordings({userId:Dashboard.getCurrentUserId(),limit:12,IsInProgress:!1,Fields:"CanDelete,PrimaryImageAspectRatio"}).then(function(i){n(e.querySelector("#latestRecordings"),i.Items)})}function a(i,r){LiveTvHelpers.getTimersHtml(r).then(function(r){var n=i.querySelector("#upcomingRecordings");r?n.classList.remove("hide"):n.classList.add("hide"),n.querySelector(".recordingItems").innerHTML=r,ImageLoader.lazyChildren(n),e(n).createCardMenus()})}function s(e){ApiClient.getLiveTvTimers().then(function(i){a(e,i.Items)})}function d(e){Dashboard.showLoadingMsg(),s(e),t(e),o(e),ApiClient.getLiveTvRecordingGroups({userId:Dashboard.getCurrentUserId()}).then(function(i){require(["paper-fab","paper-item-body","paper-icon-item"],function(){r(e,i.Items)})})}window.LiveTvPage.initRecordingsTab=function(e,i){i.querySelector("#upcomingRecordings .recordingItems").addEventListener("timercancelled",function(){d(i)})},window.LiveTvPage.renderRecordingsTab=function(e,i){d(i)}});