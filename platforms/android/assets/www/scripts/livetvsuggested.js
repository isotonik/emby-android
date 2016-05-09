define(["jQuery","scrollStyles"],function(e){function r(){return browserInfo.mobile&&AppInfo.enableAppLayouts}function t(){return r()?"overflowPortrait":"portrait"}function i(){return r()?"overflowSquare":"square"}function n(){return r()?12:8}function s(e){Dashboard.showLoadingMsg(),ApiClient.getLiveTvRecommendedPrograms({userId:Dashboard.getCurrentUserId(),IsAiring:!0,limit:2*n(),ImageTypeLimit:1,EnableImageTypes:"Primary",EnableTotalRecordCount:!1}).then(function(r){o(e,r.Items,"activeProgramItems","play"),LibraryBrowser.setLastRefreshed(e),Dashboard.hideLoadingMsg()})}function a(e){s(e),ApiClient.getLiveTvRecommendedPrograms({userId:Dashboard.getCurrentUserId(),IsAiring:!1,HasAired:!1,limit:n(),IsMovie:!1,IsSports:!1,IsKids:!1,IsSeries:!0,EnableTotalRecordCount:!1}).then(function(r){o(e,r.Items,"upcomingProgramItems")}),ApiClient.getLiveTvRecommendedPrograms({userId:Dashboard.getCurrentUserId(),IsAiring:!1,HasAired:!1,limit:n(),IsMovie:!0,EnableTotalRecordCount:!1}).then(function(r){o(e,r.Items,"upcomingTvMovieItems",null,t())}),ApiClient.getLiveTvRecommendedPrograms({userId:Dashboard.getCurrentUserId(),IsAiring:!1,HasAired:!1,limit:n(),IsSports:!0,EnableTotalRecordCount:!1}).then(function(r){o(e,r.Items,"upcomingSportsItems")}),ApiClient.getLiveTvRecommendedPrograms({userId:Dashboard.getCurrentUserId(),IsAiring:!1,HasAired:!1,limit:n(),IsKids:!0,EnableTotalRecordCount:!1}).then(function(r){o(e,r.Items,"upcomingKidsItems")})}function o(e,t,n,s,a){var o=LibraryBrowser.getPosterViewHtml({items:t,shape:a||(r()?i():"auto"),showTitle:!0,centerText:!0,coverImage:!0,overlayText:!1,lazy:!0,overlayMoreButton:"play"!=s,overlayPlayButton:"play"==s}),d=e.querySelector("."+n);d.innerHTML=o,ImageLoader.lazyChildren(d)}function d(t,i){r()?e(".itemsContainer",i).addClass("hiddenScrollX").createCardMenus():e(".itemsContainer",i).removeClass("hiddenScrollX").createCardMenus()}function u(e,r){LibraryBrowser.needsRefresh(r)&&a(r)}function l(e,r){var t=e.querySelector(".pageTabContent[data-index='"+r+"']"),i=[],n="LiveTvPage",s="",a="";switch(r){case 0:s="renderSuggestedTab",a="initSuggestedTab";break;case 1:i.push("registrationservices"),i.push("scripts/livetvguide"),s="renderGuideTab",a="initGuideTab";break;case 2:i.push("scripts/livetvchannels"),i.push("paper-icon-item"),i.push("paper-item-body"),s="renderChannelsTab";break;case 3:i.push("scripts/livetvrecordings"),a="initRecordingsTab",s="renderRecordingsTab";break;case 4:i.push("scripts/livetvseriestimers"),s="renderSeriesTimersTab"}require(i,function(){a&&!t.initComplete&&(window[n][a](e,t),t.initComplete=!0),window[n][s](e,t)})}pageIdOn("pageinit","liveTvSuggestedPage",function(){var e=this,r=e.querySelector("paper-tabs"),t=e.querySelector(".pageTabsContainer");LibraryBrowser.configurePaperLibraryTabs(e,r,t,"livetv.html"),t.addEventListener("tabchange",function(r){l(e,parseInt(r.detail.selectedTabIndex))})}),pageIdOn("viewshow","liveTvSuggestedPage",function(){document.body.classList.add("autoScrollY")}),pageIdOn("viewbeforehide","liveTvSuggestedPage",function(){document.body.classList.remove("autoScrollY")}),window.LiveTvPage={renderSuggestedTab:u,initSuggestedTab:d}});