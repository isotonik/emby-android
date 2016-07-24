define(["events","libraryBrowser","imageLoader","alphaPicker","listView","emby-itemscontainer"],function(e,t,a,r,n){return function(e,i,o){function l(e){var a=u(e),r=g[a];return r||(r=g[a]={query:{SortBy:"SortName",SortOrder:"Ascending",IncludeItemTypes:"Movie",Recursive:!0,Fields:"PrimaryImageAspectRatio,MediaSourceCount,SortName,SyncInfo",ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb",StartIndex:0,Limit:v},view:t.getSavedView(a)||t.getDefaultItemsView("Poster","Poster")},r.query.ParentId=i.topParentId,t.loadSavedQueryValues(a,r.query)),r}function s(e){return l(e).query}function u(e){return e.savedQueryKey||(e.savedQueryKey=t.getSavedQueryKey("movies")),e.savedQueryKey}function d(e){Dashboard.showLoadingMsg();var r=s(e);ApiClient.getItems(Dashboard.getCurrentUserId(),r).then(function(i){function l(){r.StartIndex+=r.Limit,d(o)}function s(){r.StartIndex-=r.Limit,d(o)}window.scrollTo(0,0),m(e);var c,v=LibraryBrowser.getQueryPagingHtml({startIndex:r.StartIndex,limit:r.Limit,totalRecordCount:i.TotalRecordCount,showLimit:!1,updatePageSizeSetting:!1,addLayoutButton:!1,sortButton:!1,filterButton:!1}),g=y.getCurrentViewStyle();c="Thumb"==g?t.getPosterViewHtml({items:i.Items,shape:"backdrop",preferThumb:!0,context:"movies",lazy:!0,overlayPlayButton:!0}):"ThumbCard"==g?t.getPosterViewHtml({items:i.Items,shape:"backdrop",preferThumb:!0,context:"movies",lazy:!0,cardLayout:!0,showTitle:!0,showYear:!0}):"Banner"==g?t.getPosterViewHtml({items:i.Items,shape:"banner",preferBanner:!0,context:"movies",lazy:!0}):"List"==g?n.getListViewHtml({items:i.Items,context:"movies",sortBy:r.SortBy}):t.getPosterViewHtml("PosterCard"==g?{items:i.Items,shape:"portrait",context:"movies",showTitle:!0,showYear:!0,lazy:!0,cardLayout:!0}:{items:i.Items,shape:"portrait",context:"movies",centerText:!0,lazy:!0,overlayPlayButton:!0});var S,h,p=o.querySelectorAll(".paging");for(S=0,h=p.length;h>S;S++)p[S].innerHTML=v;for(p=o.querySelectorAll(".btnNextPage"),S=0,h=p.length;h>S;S++)p[S].addEventListener("click",l);for(p=o.querySelectorAll(".btnPreviousPage"),S=0,h=p.length;h>S;S++)p[S].addEventListener("click",s);var b=o.querySelector(".itemsContainer");b.innerHTML=c,a.lazyChildren(b),t.saveQueryValues(u(e),r),Dashboard.hideLoadingMsg()})}function m(e){var t=s(e);y.alphaPicker.value(t.NameStartsWithOrGreater)}function c(e){var a=e.querySelector(".alphaPicker");a.addEventListener("alphavaluechanged",function(t){var a=t.detail.value;alert(a);var r=s(e);r.NameStartsWithOrGreater=a,r.StartIndex=0,d(e)}),y.alphaPicker=new r({element:a,valueChangeEvent:"click"}),e.querySelector(".btnFilter").addEventListener("click",function(){y.showFilterMenu()}),e.querySelector(".btnSort").addEventListener("click",function(a){t.showSortMenu({items:[{name:Globalize.translate("OptionNameSort"),id:"SortName"},{name:Globalize.translate("OptionBudget"),id:"Budget,SortName"},{name:Globalize.translate("OptionImdbRating"),id:"CommunityRating,SortName"},{name:Globalize.translate("OptionCriticRating"),id:"CriticRating,SortName"},{name:Globalize.translate("OptionDateAdded"),id:"DateCreated,SortName"},{name:Globalize.translate("OptionDatePlayed"),id:"DatePlayed,SortName"},{name:Globalize.translate("OptionMetascore"),id:"Metascore,SortName"},{name:Globalize.translate("OptionParentalRating"),id:"OfficialRating,SortName"},{name:Globalize.translate("OptionPlayCount"),id:"PlayCount,SortName"},{name:Globalize.translate("OptionReleaseDate"),id:"PremiereDate,SortName"},{name:Globalize.translate("OptionRevenue"),id:"Revenue,SortName"},{name:Globalize.translate("OptionRuntime"),id:"Runtime,SortName"},{name:Globalize.translate("OptionVideoBitrate"),id:"VideoBitRate,SortName"}],callback:function(){s(e).StartIndex=0,d(e)},query:s(e),button:a.target})});var n=e.querySelector(".btnSelectView");n.addEventListener("click",function(e){t.showLayoutMenu(e.target,y.getCurrentViewStyle(),"Banner,List,Poster,PosterCard,Thumb,ThumbCard".split(","))}),n.addEventListener("layoutchange",function(a){var r=a.detail.viewStyle;l(e).view=r,t.saveViewSetting(u(e),r),s(e).StartIndex=0,d(e)})}var y=this,v=t.getDefaultPageSize(),g={};y.showFilterMenu=function(){require(["components/filterdialog/filterdialog"],function(e){var t=new e({query:s(o),mode:"movies"});Events.on(t,"filterchange",function(){s(o).StartIndex=0,d(o)}),t.show()})},y.getCurrentViewStyle=function(){return l(o).view},c(o),y.renderTab=function(){d(o),m(o)},y.destroy=function(){}}});