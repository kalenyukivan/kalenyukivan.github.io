﻿!function(t){function e(e){for(var i,r,s=e[0],c=e[1],l=e[2],d=0,f=[];d<s.length;d++)r=s[d],a[r]&&f.push(a[r][0]),a[r]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);for(u&&u(e);f.length;)f.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],i=!0,s=1;s<n.length;s++){var c=n[s];0!==a[c]&&(i=!1)}i&&(o.splice(e--,1),t=r(r.s=n[0]))}return t}var i={},a={"web/stickers":0},o=[];function r(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=i,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/js/cmodules/";var s=window.webpackJsonp=window.webpackJsonp||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var u=c;o.push([243,"bundles/common"]),n()}({"0lFn":function(t,e,n){"use strict";n.r(e);var i=n("vzBJ"),a={autoplay:0,setAutoplay:function(t){this.autoplay=t},getAutoplay:function(){return a.autoplay}},o={},r=(t,e,n,i)=>{delete o[e],1===i?Emoji.favorite.addFavoriteSticker(t,e,n):-1===i&&Emoji.favorite.deleteFavoriteSticker(t,e,n)};var s={toggleFavorite:function(t,e,n){if(e&&e.stopPropagation(),!hasClass(t,"on")&&Emoji.stickers[Emoji.TAB_FAVORITE_STICKERS].stickers.length>=Emoji.favoriteLimit&&!Emoji.favoriteLimitNoticed){var i=langStr(getLang("purchases_stickers_favorite_limit_notice"),"%s",Emoji.favoriteLimit);return setTimeout(window.showFastBox(getLang("global_error"),i).hide,3e3),ajax.post("stickers.php",{act:"favorite_limit_noticed",value:1}),Emoji.favoriteLimitNoticed=!0,!1}var a=attr(t,"data-sticker-id"),s=attr(t,"data-hash");return!(!a||!s)&&(!o[a]&&(o[a]=1,toggleClass(t,"on"),void ajax.post("/stickers.php",{act:"toggle_favorite",sticker_id:a,hash:s},{onDone:r.pbind(n,a,t)})))},getStickerUrl:function(t,e){var n={id:t,size:e};return window.isMVK?rs(window.store.stickers.url_template,n):getTemplate("stickers_sticker_url",n)}};window.StickersAnimation=i.StickersAnimation,window.StickersSettings=a,window.Stickers=s;try{stManager.done(jsc("web/stickers.js"))}catch(t){}},243:function(t,e,n){t.exports=n("0lFn")},vzBJ:function(t,e,n){"use strict";n.r(e);n("VRzm"),n("Btvt"),n("a1Th");var i=function(){var t,e,n,a=!1,o=!1,r={},s={},c={},l={};function u(t){var e=p(t),n=1;if(e){hasClass(t,"animation_play")||(hide(geByClass1("sticker_img",t)),addClass(t,"animation_play")),e.play();var i=attr(t,"data-loop-count");i=parseInt(i),isNaN(i)&&(i=3),-1!==i&&(!e._cbs.loopComplete||e._cbs.loopComplete&&0===e._cbs.loopComplete.length)&&e.addEventListener("loopComplete",function a(o){var r=!0;i>=++n&&(r=!1),r&&(f(t,!1),""!==e._cbs.loopComplete&&e.removeEventListener("loopComplete",a),e.stop())})}}function d(t){var e=attr(t,"data-uid");return e||(e=attr(t,"data-uid",Math.random().toString(32).substr(2))),e}function f(t,e){l[d(t)]=e}function p(t){var e=attr(t,"data-uniq-id");if(!geByClass1("svg_sticker_animation",t))return!1;var n=s[e];return n||!1}function m(t,e){var i=p(t);if(i)"function"==typeof e&&e(i);else{var a=attr(t,"data-uniq-id");if(!l[d(t)]){f(t,!0);var o=attr(t,"data-animation-path"),c=attr(t,"data-sticker-id"),u=!1;if(c&&(u=r[c]?g(t):o&&g(t)),u){var m={container:t,renderer:"svg",loop:!0,autoplay:!1,name:a,rendererSettings:{scaleMode:"noScale",progressiveLoad:!0,hideOnTransparent:!0,className:"svg_sticker_animation"}};r[c]?m.animationData=r[c]:m.path=o;var v=geByClass1("svg_sticker_animation",t);if(v&&re(v),i=n.loadAnimation(m),!r[c])return void i.addEventListener("data_ready",function(){r[c]=i.animationData,s[a]=i,"function"==typeof e&&e(i)})}"function"==typeof e&&(s[a]=i,"function"==typeof e&&e(i))}}}function v(){return e().then(t=>(n=t,t))}return{init(t){e=t.animatorLoader},checkSettingsAndLoadInWeb:function(t){if(StickersSettings.getAutoplay()){var e=ge("fc_msg"+t),n=geByClass1("sticker_animation",e);i.loadAndPlaySticker(n)}},checkSettingsAndLoad:function(t){if(StickersSettings.getAutoplay()){var e=$(`.msg_id_${t} .sticker_animation`);i.loadAndPlaySticker(e)}},loadStickerInMvkIMAndPlay:function(t,e){var n="_msg"+t;e&&(n="msg_id_"+t);var a=geByClass1("sticker_animation",geByClass1(n));i.loadAndPlayStickerWithTimer(a,500)},loadAutoplayAnimationStickers:function(t){if(n){if(t){if(o)return;o=!0}if(!a){a=!0;var e=geByClass("sticker_animation_autoplay");e&&each(e,function(t,e){m(e,function(){u(e)})}),a=!1}}else v().then(()=>{i.loadAutoplayAnimationStickers(t)})},loadAndPlaySticker:function(t){t&&(n?requestAnimationFrame(()=>{m(t,function(){u(t)})}):v().then(()=>{i.loadAndPlaySticker(t)}))},loadAndPlayStickerWithTimer:function(t,e){if(t&&!c[t]){e||(e=1e3);var n=ge(t);hasClass(n,"sticker_animation_disabled_timer")||(c[t]=setTimeout(function(){!n&&(n=ge(t),hasClass(n,"sticker_animation_disabled_timer"))||(i.loadAndPlaySticker(n),clearTimeout(c[t]),c[t]=!1)},e))}},reloadStickers:function(){s={}},touchStartSticker:function(e){e.addEventListener("contextmenu",i.preventContextMenu,!1),t=setTimeout(function(){i.loadAndPlaySticker(e)},500)},touchEndSticker:function(){t&&clearTimeout(t)},preventContextMenu:function(t){event.preventDefault(),event.stopPropagation()}};function g(t){var e=t.getBoundingClientRect().top,n=t.getBoundingClientRect().bottom;return e<window.innerHeight&&n>=0&&isVisible(t)}}(),a=n("Jph1");n.d(e,"StickersAnimation",function(){return i}),i.init({animatorLoader:()=>Promise.resolve(a.default)})}});