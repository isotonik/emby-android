!function(){function e(){if(!browserInfo.mobile){if("off"==a())return;var e=this;Dashboard.importCss("themes/holiday/style.css"),e.classList.contains("itemDetailPage")||i(e),t(),n(),h(),c()}}function t(){"off"!=a()&&(0==p?d("https://github.com/MediaBrowser/Emby.Resources/raw/master/themes/holiday/christmas.wav",.1):(new Date).getTime()-p>3e4&&d("https://github.com/MediaBrowser/Emby.Resources/raw/master/themes/holiday/sleighbells.wav",.25))}function o(){document.documentElement.classList.remove("christmas"),stopSnowflakes(),l&&l.stop();var e=document.querySelector(".holidayInfoButton");e&&e.parentNode.removeChild(e),Dashboard.removeStylesheet("themes/holiday/style.css"),Backdrops.clear()}function n(){f||(f=!0,$(document.body).append('<div id="snowflakeContainer"><p class="snowflake">*</p></div>'),generateSnowflakes(),Events.on(MediaController,"beforeplaybackstart",s))}function s(){l&&l.stop(),stopSnowflakes()}function i(e){e.classList.contains("itemDetailPage")||("christmas"==a()?Backdrops.setBackdropUrl(e,"https://raw.githubusercontent.com/MediaBrowser/Emby.Resources/master/themes/holiday/bgc.jpg"):Backdrops.setBackdropUrl(e,"https://raw.githubusercontent.com/MediaBrowser/Emby.Resources/master/themes/holiday/bg.jpg"))}function a(){return appStorage.getItem(w)}function r(e){appStorage.setItem(w,e),c(),t()}function c(){"christmas"==a()?document.documentElement.classList.add("christmas"):document.documentElement.classList.remove("christmas")}function m(){var e=[],t=a();e.push({name:"None",id:"none",ironIcon:"off"==t?"check":null}),e.push({name:"Joy!",id:"joy",ironIcon:"off"!=t&&"christmas"!=t?"check":null}),e.push({name:"Christmas",id:"christmas",ironIcon:"christmas"==t?"check":null}),require(["actionsheet"],function(t){t.show({title:"Happy holidays from the Emby team! Select your holiday theme:",items:e,callback:function(e){switch(e){case"none":r("off"),o();break;case"joy":r(""),i($($.mobile.activePage)[0]);break;case"christmas":r("christmas"),i($($.mobile.activePage)[0])}}})})}function h(){if(!u){u=!0;var e=document.createElement("paper-icon-button");e.icon="info",e.classList.add("holidayInfoButton"),e.addEventListener("click",m);var t=document.querySelector(".viewMenuSecondary");t&&t.insertBefore(e,t.childNodes[0])}}function d(e,t){require(["howler"],function(){var o=new Howl({urls:[e],volume:t||.3});o.play(),l=o,p=(new Date).getTime()})}var u,l,f,p=0,w="holidaytheme5";pageClassOn("pageshow","libraryPage",e)}(),function(){function e(){window.addEventListener("resize",r,!1)}function t(e){for(var t=0;t<e.length;t++)if("undefined"!=typeof document.body.style[e[t]])return e[t];return null}function o(e,t,o,n,s){this.element=e,this.radius=t,this.speed=o,this.xPos=n,this.yPos=s,this.counter=0,this.sign=Math.random()<.5?1:-1,this.element.style.opacity=.1+Math.random(),this.element.style.fontSize=12+50*Math.random()+"px"}function n(e,t,o){var n="translate3d("+t+"px, "+o+"px, 0)";e.style[u]=n}function s(){var e=document.querySelector(".snowflake"),t=e.parentNode;c=document.documentElement.clientWidth,m=document.documentElement.clientHeight;for(var n=0;f>n;n++){var s=e.cloneNode(!0);t.appendChild(s);var r=a(50,c),h=a(50,m),d=5+40*Math.random(),u=4+10*Math.random(),p=new o(s,u,d,r,h);l.push(p)}t.removeChild(e),i()}function i(){if(!w){for(var e=0;e<l.length;e++){var t=l[e];t.update()}if(p){c=document.documentElement.clientWidth,m=document.documentElement.clientHeight;for(var e=0;e<l.length;e++){var t=l[e];t.xPos=a(50,c),t.yPos=a(50,m)}p=!1}h(i)}}function a(e,t){return Math.round(-1*e+Math.random()*(t+2*e))}function r(){p=!0}var c,m,h=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,d=["transform","msTransform","webkitTransform","mozTransform","oTransform"],u=t(d),l=[],f=50,p=!1;e(),o.prototype.update=function(){this.counter+=this.speed/5e3,this.xPos+=this.sign*this.speed*Math.cos(this.counter)/40,this.yPos+=Math.sin(this.counter)/40+this.speed/30,n(this.element,Math.round(this.xPos),Math.round(this.yPos)),this.yPos>m&&(this.yPos=-50)};var w=!1;window.generateSnowflakes=s,window.stopSnowflakes=function(){w=!0,$(".snowflake").remove()}}();