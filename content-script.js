var shortcuts_rotate = 'ctrl+shift+forward-slash'
var shortcuts_reset_scale_flip = 'ctrl+shift+z'
var shortcuts_zoomin = 'ctrl+shift+.'
var shortcuts_zoomout = 'ctrl+shift+,'
var shortcuts_translate_plus_x = 'ctrl+shift+arrow-right'
var shortcuts_translate_minus_x = 'ctrl+shift+arrow-left'
var shortcuts_translate_plus_y = 'ctrl+shift+arrow-up'
var shortcuts_translate_minus_y = 'ctrl+shift+arrow-down'

var css_youtube_video_rotate__plus_90_degree = `
#movie_player .video-stream.html5-main-video,
#movie_player .ytp-cued-thumbnail-overlay .ytp-cued-thumbnail-overlay-image {
    transform: scale([vSCALE]) rotate(90deg);
}

#movie_player .ytp-tooltip.ytp-bottom.ytp-preview:not(.ytp-text-detail) {
    transform: scale(0.6) rotate(90deg);
}

#movie_player .ytp-tooltip.ytp-bottom.ytp-preview:not(.ytp-text-detail) .ytp-tooltip-text-wrapper {
    font-size:1.35em;
    transform: rotate(-90deg);
    bottom: calc(50% - 7.5px);
    left: calc(50% - 20px);
}`;

var css_youtube_video_rotate__plus_180_degree = `
#movie_player .video-stream.html5-main-video,
#movie_player .ytp-cued-thumbnail-overlay .ytp-cued-thumbnail-overlay-image {
  transform: scale(1) rotate(180deg);
}

#movie_player .ytp-tooltip.ytp-bottom.ytp-preview:not(.ytp-text-detail) {
    transform: scale(1) rotate(180deg);
}

#movie_player .ytp-tooltip.ytp-bottom.ytp-preview:not(.ytp-text-detail) .ytp-tooltip-text-wrapper {
   transform: rotate(180deg);
   bottom: 80%;
}`;

//minus 90 degree
var css_youtube_video_rotate__plus_270_degree = `
#movie_player .video-stream.html5-main-video,
#movie_player .ytp-cued-thumbnail-overlay .ytp-cued-thumbnail-overlay-image {
    transform: scale([vSCALE]) rotate(-90deg);
}

#movie_player .ytp-tooltip.ytp-bottom.ytp-preview:not(.ytp-text-detail) {
    transform: scale(0.6) rotate(-90deg);
}

#movie_player .ytp-tooltip.ytp-bottom.ytp-preview:not(.ytp-text-detail) .ytp-tooltip-text-wrapper {
    font-size:1.35em;
    transform: rotate(90deg);
    bottom: calc(50% - 7.5px);
    left: calc(-50% + 20px);
}`;

// 0, 360 degree
var css_youtube_video_rotate__reset_degree = ``;

function createRotateFn(isEnableShortcuts) {
    var btnRotateVideo = document.querySelector('.btnRotateVideo');
    if (btnRotateVideo === null) {

        var newStyle_main = document.createElement('style');
        newStyle_main.type = 'text/css';
        newStyle_main.id = 'style-youtube-video-rotate-main'
        newStyle_main.innerHTML = `
        #movie_player {
            background-color: rgb(0, 0, 0);
        }    
        `;
        document.body.appendChild(newStyle_main);

        var newStyle = document.createElement('style');
        newStyle.type = 'text/css';
        newStyle.id = 'style-youtube-video-rotate'
        document.body.appendChild(newStyle);

        var newScript = document.createElement('script');
        newScript.innerHTML = `
        var youtube_video_rotate_current_rotate_degree = 0;
        function fnRotateVideo(degree) {
            youtube_video_rotate_current_rotate_degree += degree;
            degree = youtube_video_rotate_current_rotate_degree;

            var player_width;
            var player_height;
            var video_width;
            var video_height;
            var isVerticalVideo = false;
            var __player__ = document.getElementById("movie_player");

            if (ytplayer.config !== null &&
                ytplayer.config !== undefined) {
                var __player_response__ = JSON.parse(ytplayer.config.args.player_response);
                var __player_info__ = __player_response__.streamingData.formats[0];
                if (__player_info__ !== null &&
                    __player_info__ !== undefined) {
                    video_width = __player_info__.width;
                    video_height = __player_info__.height;
                    if (video_width <= video_height) {
                        isVerticalVideo = true;
                    }
                }
            }

            var vSCALE;
            if (__player__ !== null &&
                __player__ !== undefined) {
                player_width = __player__.clientWidth;
                player_height = __player__.clientHeight;
                if (isVerticalVideo) {
                    if (player_width > 0 &&
                        player_width > 0 ) {
                        vSCALE = player_width / player_height;
                    } else {
                        vSCALE = 1.7733;
                    }
                } else {
                    if (player_width > 0 &&
                        player_width > 0 ) {
                        vSCALE = player_height / player_width;
                    } else {
                        vSCALE = 0.5625;
                    }
                }
            } 

            var styleYoutubeVideoRotate = document.getElementById('style-youtube-video-rotate');
            if (degree === 90) {
                styleYoutubeVideoRotate.innerHTML = \`${css_youtube_video_rotate__plus_90_degree}\`.replace('[vSCALE]',vSCALE);
            } else if (degree === 180) {
                styleYoutubeVideoRotate.innerHTML = \`${css_youtube_video_rotate__plus_180_degree}\`;
            } else if (degree === 270) {
                styleYoutubeVideoRotate.innerHTML = \`${css_youtube_video_rotate__plus_270_degree}}\`.replace('[vSCALE]',vSCALE);
            } else {
                styleYoutubeVideoRotate.innerHTML = \`${css_youtube_video_rotate__reset_degree}\`;
                youtube_video_rotate_current_rotate_degree = 0;
            }

            //***********
            if (typeof resetScaleFlipMenu !== 'undefined') {
                resetScaleFlipMenu()
            }
            //***********
        }
        `;

        if (isEnableShortcuts) {
            newScript.innerHTML += `
            if (typeof jwerty !== "undefined") {
                jwerty.key(\`${shortcuts_rotate}\`, function () { 
                    if ('/watch' === location.pathname) {
                        fnRotateVideo(90);
                    }
                });
            }
            `
        }

        document.body.appendChild(newScript);

        var ytpRightControls = document.getElementsByClassName('ytp-right-controls')[0];

        var buttonPlus90Degree = document.createElement('button');
        buttonPlus90Degree.setAttribute('onclick', 'fnRotateVideo(90);');
        buttonPlus90Degree.className = 'btnRotateVideo ytp-rotate-plus-90-degree-button ytp-button';
        buttonPlus90Degree.title = 'rotate 90°';
        buttonPlus90Degree.setAttribute('aria-pressed', 'false');
        buttonPlus90Degree.innerHTML = `<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
        <text x="50%" fill="#fff" text-anchor="middle" y="22" style="font-size: xx-small;">90°</text>
        <path class="ytp-svg-fill" d="M 18,11 V 7 l -5,5 5,5 v -4 c 3.3,0 6,2.7 6,6 0,3.3 -2.7,6 -6,6 -3.3,0 -6,-2.7 -6,-6 h -2 c 0,4.4 3.6,8 8,8 4.4,0 8,-3.6 8,-8 0,-4.4 -3.6,-8 -8,-8 z" style="" transform="scale(-1, 1) translate(-34, 0)"></path>
        </svg>`;

        ytpRightControls.insertBefore(buttonPlus90Degree, ytpRightControls.childNodes[0]);
    }
}

//------------------------------

function createScale_Filp_Fn(isEnableShortcuts) {
    var btnRotateVideo = document.querySelector('.btnScaleFlip');
    if (btnRotateVideo === null) {

        //button
        var newStyle = document.createElement('style');
        newStyle.type = 'text/css';
        newStyle.id = 'style-youtube-video-scale-flip'
        document.body.appendChild(newStyle);

        var ytpRightControls = document.getElementsByClassName('ytp-right-controls')[0];

        var buttonScaleFlip = document.createElement('button');
        buttonScaleFlip.setAttribute('onclick', 'fnToggleScaleFlipMenu();');
        buttonScaleFlip.className = 'btnScaleFlip ytp-scale-flip-button ytp-button';
        buttonScaleFlip.title = 'Zoom / Mirror';
        buttonScaleFlip.setAttribute('aria-pressed', 'false');
        buttonScaleFlip.innerHTML = `<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
        <text x="50%" fill="#fff" text-anchor="middle" y="22" style="font-size: xx-small;">Zoom / Mirror</text>
        </svg>`;

        ytpRightControls.insertBefore(buttonScaleFlip, ytpRightControls.childNodes[0]);

        //inject crop div and style
        var newStyle_crop = document.createElement('style');
        newStyle_crop.type = 'text/css';
        newStyle_crop.id = 'style-youtube-video-crop'
        document.body.appendChild(newStyle_crop);

        var html5VideoControls = document.querySelector('.html5-video-container');
        var divCropLeft = document.createElement('div')
        divCropLeft.id = 'ytp-crop-left'
        var divCropRight = document.createElement('div')
        divCropRight.id = 'ytp-crop-right'
        html5VideoControls.appendChild(divCropLeft)
        html5VideoControls.appendChild(divCropRight)

        // menu
        var newStyle_menu = document.createElement('style');
        newStyle_menu.type = 'text/css';
        newStyle_menu.id = 'style-youtube-video-scale-flip-2'
        newStyle_menu.innerHTML = `
            .ytp-scale-flip-button.ytp-button {
                width: 5em !important;
            }

            #ytp-scale-flip-menu {
                width: 27em;
                min-height: 17.5em;
            }

            #ytp-scale-flip-menu button {
                color: #fff;
                background: transparent;
                border: none;
                margin: 0 5px;
                cursor: pointer;
                min-width: 20px;
            }

            #ytp-scale-flip-menu button.minus {
                font-size: 1.5em;
            }

            #ytp-scale-flip-menu button.plus {
                font-size: 1.3em;
            }

            #ytp-scale-flip-menu button.reset {
                font-size: 0.75em;
                color: #f00;
            }

            #ytp-scale-flip-menu span {
                min-width: 50px;
                display: inline-block;
                text-align: center;
            }

            #ytp-scale-flip-menu__crop_btnReset {
                font-size: 0.75em;
                color: #f00 !important;
            }
        `;
        document.body.appendChild(newStyle_menu);

        var movie_player = document.getElementById('movie_player');
        var div_scale_flip_menu = document.createElement('div');
        div_scale_flip_menu.innerHTML = `
        <div id="ytp-scale-flip-menu" class="ytp-popup ytp-settings-menu" style="display: none;">
            <div class="ytp-panel" style="width: 100%; height: 100%;">
                <div class="ytp-panel-menu" role="menu">

                    <div id="ytp-scale-flip-menu__reset" class="ytp-menuitem" aria-disabled="true" style="height: 1px;">
                        <div class="ytp-menuitem-label" style="padding-left: 1em;"></div>
                        <div class="ytp-menuitem-content">
                        <button class="reset" onclick="resetScaleFlipMenu();">RESET</button>
                        </div>
                    </div>

                    <div id="ytp-scale-flip-menu__scale" class="ytp-menuitem" aria-disabled="true">
                        <div class="ytp-menuitem-label" style="padding-left: 1em;">Zoom</div>
                        <div class="ytp-menuitem-content">
                            <button name="scale" class="minus">-</button>
                            <span></span>
                            <button name="scale" class="plus">+</button>
                        </div>
                    </div>

                    <div id="ytp-scale-flip-menu__translateX" class="ytp-menuitem" aria-disabled="true">
                        <div class="ytp-menuitem-label" style="padding-left: 1em;">X</div>
                        <div class="ytp-menuitem-content">
                            <button name="translateX" class="minus">-</button>
                            <span></span>
                            <button name="translateX" class="plus">+</button>
                        </div>
                    </div>

                    <div id="ytp-scale-flip-menu__translateY" class="ytp-menuitem" aria-disabled="true">
                        <div class="ytp-menuitem-label" style="padding-left: 1em;">Y</div>
                        <div class="ytp-menuitem-content">
                            <button name="translateY" class="minus">-</button>
                            <span></span>
                            <button name="translateY" class="plus">+</button>
                        </div>
                    </div>

                    <div id="ytp-scale-flip-menu__crop" class="ytp-menuitem" aria-disabled="true">
                        <div class="ytp-menuitem-label" style="padding-left: 1em;">Crop</div>
                        <div class="ytp-menuitem-content">
                            <button id="ytp-scale-flip-menu__crop_btnReset" onclick="btnCropReset();">RESET</button>
                            <button name="crop" class="minus">-</button>
                            <span></span>
                            <button name="crop" class="plus">+</button>
                        </div>
                    </div>

                    <div id="ytp-scale-flip-menu__flip" class="ytp-menuitem" aria-disabled="true">
                        <div class="ytp-menuitem-label" style="padding-left: 1em;">Mirror</div>
                        <div class="ytp-menuitem-content">
                            <button name="flip" class="minus" style="font-size:0.75em;">ON</button>
                            <span></span>
                            <button name="flip" class="plus" style="font-size:0.75em;">OFF</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        `
        movie_player.appendChild(div_scale_flip_menu)


        //script
        var newScript = document.createElement('script');
        newScript.innerHTML = `
        function fnScaleFlipVideo(vFlip, vScale, vTranslateX, vTranslateY) {
            var styleYoutubeVideoScaleFlip = document.getElementById('style-youtube-video-scale-flip');
            styleYoutubeVideoScaleFlip.innerHTML = \`
                #movie_player .html5-video-container {
                    transform: 
                    scaleX(\${vFlip}) 
                    scale(\${vScale}) 
                    translateX(\${vTranslateX}px) 
                    translateY(\${vTranslateY}px);
                }
            \`;
        }

        function fnCropVideo(vTranslateX, vWidthToAdd) {
            var styleYoutubeVideoCrop = document.getElementById('style-youtube-video-crop');
            styleYoutubeVideoCrop.innerHTML = \`
                div#ytp-crop-left {
                    height: 9999px;
                    width: 9999px;
                    background-color: #000;
                    z-index: 1;
                    position: absolute;
                    left: 0;
                    transform: translateX(\${(-9999 + vWidthToAdd + (vTranslateX * -1))}px);
                }

                div#ytp-crop-right {
                    height: 9999px;
                    width: 9999px;
                    background-color: #000;
                    z-index: 1;
                    position: absolute;
                    right: 0;
                    transform: translateX(\${(9999 - vWidthToAdd + (vTranslateX * -1))}px);
                }
            \`;
        }

        function btnCropReset() {
            youtube_video_crop_current_width = 0;

            fnScaleFlipVideo(youtube_video_scale_flip_current_flip,
                youtube_video_scale_flip_current_scale,
                youtube_video_scale_flip_current_translateX,
                youtube_video_scale_flip_current_translateY);
                
            fnCropVideo(youtube_video_scale_flip_current_translateX,
                youtube_video_crop_current_width);

            updateScaleFlipMenu();
        }

        var youtube_video_scale_flip_current_flip = 1;
        var youtube_video_scale_flip_current_scale = 1.0;
        var youtube_video_scale_flip_current_translateX = 0;
        var youtube_video_scale_flip_current_translateY = 0;
        var youtube_video_crop_current_width = 0;

        function fnToggleScaleFlipMenu() {
            var divThumbnail = document.getElementsByClassName('ytp-cued-thumbnail-overlay')[0]
            if (divThumbnail !== undefined) {
                if (divThumbnail.getAttribute('style') === "") {
                    var __player__ = document.getElementById("movie_player");
                    __player__.playVideo();
                }
            }

            var sfmenu = document.getElementById('ytp-scale-flip-menu');
            if (sfmenu.style.display === 'none') {
                updateScaleFlipMenu();
                sfmenu.style.display = 'block'
            } else {
                sfmenu.style.display = 'none'
            }
        }

        function resetScaleFlipMenu() {
            youtube_video_scale_flip_current_flip = 1;
            youtube_video_scale_flip_current_scale = 1.0;
            youtube_video_scale_flip_current_translateX = 0;
            youtube_video_scale_flip_current_translateY = 0;
        
            fnScaleFlipVideo(youtube_video_scale_flip_current_flip,
                youtube_video_scale_flip_current_scale,
                youtube_video_scale_flip_current_translateX,
                youtube_video_scale_flip_current_translateY);
            

            youtube_video_crop_current_width = 0;

            fnCropVideo(youtube_video_scale_flip_current_translateX,
                youtube_video_crop_current_width);

            updateScaleFlipMenu();
        }

        function updateScaleFlipMenu() {
            var span_scale = document.querySelector('#ytp-scale-flip-menu__scale span')
            span_scale.innerText = youtube_video_scale_flip_current_scale.toFixed(2);

            var span_translateX = document.querySelector('#ytp-scale-flip-menu__translateX span')
            span_translateX.innerText = youtube_video_scale_flip_current_translateX;

            var span_translateY = document.querySelector('#ytp-scale-flip-menu__translateY span')
            span_translateY.innerText = youtube_video_scale_flip_current_translateY;

            var span_crop = document.querySelector('#ytp-scale-flip-menu__crop span')
            span_crop.innerText = youtube_video_crop_current_width;

            var span_flip = document.querySelector('#ytp-scale-flip-menu__flip span')
            if (youtube_video_scale_flip_current_flip === 1) {
                span_flip.innerText = 'OFF';
            } else {
                span_flip.innerText = 'ON';
            }
        }

        var scaleFlip_pressTimer = null;

        document.getElementById('ytp-scale-flip-menu').addEventListener('mousedown', function(e) { 
            var targetName = e.target.name
            if (targetName !== undefined &&
                targetName !== "") {

                scaleFlip_pressTimer = setInterval(function(){ 
                    
                    if (targetName === "scale") {
                        if (e.target.className === "plus") {
                            youtube_video_scale_flip_current_scale += 0.01
                        } else if (e.target.className === "minus") {
                            youtube_video_scale_flip_current_scale += -0.01
                        }
                    } else if (targetName === "translateX") {
                        if (e.target.className === "plus") {
                            youtube_video_scale_flip_current_translateX += 2
                        } else if (e.target.className === "minus") {
                            youtube_video_scale_flip_current_translateX += -2
                        }
                    } else if (targetName === "translateY") {
                        if (e.target.className === "plus") {
                            youtube_video_scale_flip_current_translateY += 2
                        } else if (e.target.className === "minus") {
                            youtube_video_scale_flip_current_translateY += -2
                        }
                    } else if (targetName === "crop") {
                        if (e.target.className === "plus") {
                            youtube_video_crop_current_width += 5
                        } else if (e.target.className === "minus") {
                            youtube_video_crop_current_width += -5
                            if (youtube_video_crop_current_width < 0) {
                                youtube_video_crop_current_width = 0;
                            }
                        }
                    } else if (targetName === "flip") {
                        if (e.target.className === "plus") {
                            youtube_video_scale_flip_current_flip = 1
                        } else if (e.target.className === "minus") {
                            youtube_video_scale_flip_current_flip = -1
                        }
                    }
                    
                    fnScaleFlipVideo(youtube_video_scale_flip_current_flip,
                        youtube_video_scale_flip_current_scale,
                        youtube_video_scale_flip_current_translateX,
                        youtube_video_scale_flip_current_translateY);
                        
                    fnCropVideo(youtube_video_scale_flip_current_translateX,
                        youtube_video_crop_current_width);

                    updateScaleFlipMenu();

                }, 25);
            }

            return false; 
        })

        document.getElementById('ytp-scale-flip-menu').addEventListener('mouseup', function(e) { 
            clearInterval(scaleFlip_pressTimer);
            return false;
        })

        document.getElementById('ytp-scale-flip-menu').addEventListener('mousemove', function(e) { 
            clearInterval(scaleFlip_pressTimer);
            return false;
        })

        window.addEventListener('click', function(e){   
            // click out side ytp-scale-flip-menu >> hide menu
            if (document.getElementById('ytp-scale-flip-menu').contains(e.target) === false){
                var sfmenu = document.getElementById('ytp-scale-flip-menu');
                if (e.target.className.includes('ytp-scale-flip-button') === true) {
                    //depend on fnToggleScaleFlipMenu()
                } else {
                    sfmenu.style.display = 'none'
                }
            }
        });
        `;

        if (isEnableShortcuts) {
            newScript.innerHTML += `
            if (typeof jwerty !== "undefined") {
                jwerty.key(\`${shortcuts_reset_scale_flip}\`, function () { 
                    resetScaleFlipMenu();
                });
    
                jwerty.key(\`${shortcuts_zoomin}\`, function () { 
                    youtube_video_scale_flip_current_scale += 0.01
    
                    fnScaleFlipVideo(youtube_video_scale_flip_current_flip,
                        youtube_video_scale_flip_current_scale,
                        youtube_video_scale_flip_current_translateX,
                        youtube_video_scale_flip_current_translateY);
                        
                    fnCropVideo(youtube_video_scale_flip_current_translateX,
                        youtube_video_crop_current_width);
                        
                    updateScaleFlipMenu();
                });
    
                jwerty.key(\`${shortcuts_zoomout}\`, function () { 
                    youtube_video_scale_flip_current_scale += -0.01
    
                    fnScaleFlipVideo(youtube_video_scale_flip_current_flip,
                        youtube_video_scale_flip_current_scale,
                        youtube_video_scale_flip_current_translateX,
                        youtube_video_scale_flip_current_translateY);
                        
                    fnCropVideo(youtube_video_scale_flip_current_translateX,
                        youtube_video_crop_current_width);
                        
                    updateScaleFlipMenu();
                });
    
                jwerty.key(\`${shortcuts_translate_plus_x}\`, function () { 
                    youtube_video_scale_flip_current_translateX += 2
    
                    fnScaleFlipVideo(youtube_video_scale_flip_current_flip,
                        youtube_video_scale_flip_current_scale,
                        youtube_video_scale_flip_current_translateX,
                        youtube_video_scale_flip_current_translateY);
                        
                    fnCropVideo(youtube_video_scale_flip_current_translateX,
                        youtube_video_crop_current_width);
    
                    updateScaleFlipMenu();
                });
    
                jwerty.key(\`${shortcuts_translate_minus_x}\`, function () { 
                    youtube_video_scale_flip_current_translateX += -2
    
                    fnScaleFlipVideo(youtube_video_scale_flip_current_flip,
                        youtube_video_scale_flip_current_scale,
                        youtube_video_scale_flip_current_translateX,
                        youtube_video_scale_flip_current_translateY);
                        
                    fnCropVideo(youtube_video_scale_flip_current_translateX,
                        youtube_video_crop_current_width);
    
                    updateScaleFlipMenu();
                });
    
                jwerty.key(\`${shortcuts_translate_plus_y}\`, function () { 
                    youtube_video_scale_flip_current_translateY += -2
    
                    fnScaleFlipVideo(youtube_video_scale_flip_current_flip,
                        youtube_video_scale_flip_current_scale,
                        youtube_video_scale_flip_current_translateX,
                        youtube_video_scale_flip_current_translateY);
                        
                    fnCropVideo(youtube_video_scale_flip_current_translateX,
                        youtube_video_crop_current_width);
                        
                    updateScaleFlipMenu();
                });
    
                jwerty.key(\`${shortcuts_translate_minus_y}\`, function () { 
                    youtube_video_scale_flip_current_translateY += 2
    
                    fnScaleFlipVideo(youtube_video_scale_flip_current_flip,
                        youtube_video_scale_flip_current_scale,
                        youtube_video_scale_flip_current_translateX,
                        youtube_video_scale_flip_current_translateY);
                        
                    fnCropVideo(youtube_video_scale_flip_current_translateX,
                        youtube_video_crop_current_width);
                        
                    updateScaleFlipMenu();
                });
            }
            `
        }

        document.body.appendChild(newScript);
    }
}


//================================================================================


var css_youtube_video_rotate_page_video_list__plus_90_degree = `
.yt-lockup-thumbnail,
ytd-grid-video-renderer ytd-thumbnail {
    transform: rotate(90deg) scale(1.25,1.25) !important;
    margin-top: 70px !important;
}

.yt-lockup-content,
ytd-grid-video-renderer div#details {
    margin-top: 70px !important;
}

.yt-lockup-thumbnail .video-time,
ytd-grid-video-renderer ytd-thumbnail-overlay-time-status-renderer {
    transform: rotate(-90deg) !important;
    top: 10px !important;
    right: -5px !important;
    height: 1em !important; /* new design */
}

.yt-lockup-thumbnail .addto-watch-later-button-sign-in {
    transform: rotate(-90deg) !important;
}

/* new design */
ytd-grid-video-renderer div#hover-overlays {
    transform: rotate(-90deg) translateX(-100px) translateY(-110px) !important;
}
`;

var css_youtube_video_rotate_page_video_list__plus_180_degree = `
.yt-lockup-thumbnail,
ytd-grid-video-renderer ytd-thumbnail {
    transform: rotate(180deg) !important;
}

.yt-lockup-thumbnail .video-time,
ytd-grid-video-renderer ytd-thumbnail-overlay-time-status-renderer  {
    transform: rotate(180deg) !important;
    top: 0 !important;
    right: 0 !important;
    height: 1em !important; /* new design */
}

.yt-lockup-thumbnail .addto-watch-later-button-sign-in {
    transform: rotate(180deg) !important;
}


/* new design */
ytd-grid-video-renderer div#hover-overlays {
    transform: rotate(180deg) translateX(0px) translateY(-120px) !important;
}
`;

var css_youtube_video_rotate_page_video_list__plus_270_degree = `
.yt-lockup-thumbnail,
ytd-grid-video-renderer ytd-thumbnail {
    transform: rotate(-90deg) scale(1.25,1.25) !important;
    margin-top: 70px !important;
}

.yt-lockup-content,
ytd-grid-video-renderer div#details {
    margin-top: 70px !important;
}

.yt-lockup-thumbnail .video-time,
ytd-grid-video-renderer ytd-thumbnail-overlay-time-status-renderer  {
    transform: rotate(90deg) !important;
    bottom: 10px !important;
    right: -5px !important;
    height: 1em !important; /* new design */
}

.yt-lockup-thumbnail .addto-watch-later-button-sign-in {
    transform: rotate(90deg) !important;
}

/* new design */
ytd-grid-video-renderer div#hover-overlays {
    transform: rotate(90deg) translateX(-75px) translateY(-110px) !important;
}
`;

var css_youtube_video_rotate_page_video_list__reset_degree = ``;

function createRotateFn_page_video_list(isEnableShortcuts) {

    var newStyle = document.createElement('style');
    newStyle.type = 'text/css';
    newStyle.id = 'style-youtube-video-rotate-page-video-list'

    var newScript = document.createElement('script');
    newScript.innerHTML = `
    var youtube_video_rotate_current_rotate_degree = 0;
    function fnRotateVideo_page_video_list(degree) {
        youtube_video_rotate_current_rotate_degree += degree;
        degree = youtube_video_rotate_current_rotate_degree;

        var styleYoutubeVideoRotate = document.getElementById('style-youtube-video-rotate-page-video-list');
        if (degree === 90) {
            styleYoutubeVideoRotate.innerHTML = \`${css_youtube_video_rotate_page_video_list__plus_90_degree}\`;
        } else if (degree === 180) {
            styleYoutubeVideoRotate.innerHTML = \`${css_youtube_video_rotate_page_video_list__plus_180_degree}\`;
        } else if (degree === 270) {
            styleYoutubeVideoRotate.innerHTML = \`${css_youtube_video_rotate_page_video_list__plus_270_degree}\`;
        } else {
            styleYoutubeVideoRotate.innerHTML = \`${css_youtube_video_rotate_page_video_list__reset_degree}\`;
            youtube_video_rotate_current_rotate_degree = 0;
        }
    }
    `;

    if (isEnableShortcuts) {
        newScript.innerHTML += `
        if (typeof jwerty !== "undefined") {
            jwerty.key(\`${shortcuts_rotate}\`, function () { 
                let regex_p_videos = /youtube.com\\/(user|channel)\\/([\\w-]+)\\/videos/g //videos
                let yt_url = window.location.href
                if (regex_p_videos.test(yt_url)) {
                    fnRotateVideo_page_video_list(90);
                }
            });
        }
        `
    }

    var styleYoutubeVideoRotate_page_video_list = document.getElementById('style-youtube-video-rotate-page-video-list');
    if (styleYoutubeVideoRotate_page_video_list === null) {
        document.body.appendChild(newStyle);
        document.body.appendChild(newScript);
    }

    var btnRotateVideoListPage = document.querySelector('.btnRotateVideoListPage');
    if (btnRotateVideoListPage === null) {
        try {
            //null on new design
            var subnav_container = document.querySelector('#browse-items-primary li');
            var buttonPlus90Degree = document.createElement('button');
            buttonPlus90Degree.setAttribute('onclick', 'fnRotateVideo_page_video_list(90);');
            buttonPlus90Degree.className = 'btnRotateVideoListPage subnav-sort-menu yt-uix-button yt-uix-button-default yt-uix-button-size-default';
            buttonPlus90Degree.title = 'Rotate 90°';
            buttonPlus90Degree.innerText = "Rotate 90°";
            subnav_container.insertBefore(buttonPlus90Degree, subnav_container.childNodes[4]);
        } catch (error) {

        }

        try {
            //new design
            var subnav_container_newDesign = document.querySelector('ytd-channel-sub-menu-renderer.style-scope.ytd-section-list-renderer');
            var buttonPlus90Degree_newDesign = document.createElement('button');
            buttonPlus90Degree_newDesign.setAttribute('onclick', 'fnRotateVideo_page_video_list(90);');
            buttonPlus90Degree_newDesign.setAttribute('style', "cursor: pointer; border: transparent; color: var(--yt-spec-text-secondary); font-size: 1.4rem; font-weight: 500; letter-spacing: .007px; text-transform: uppercase; font-family: Roboto, Arial, sans-serif; margin-right: 0.5em; margin-bottom: 0.25em;")
            buttonPlus90Degree_newDesign.className = 'btnRotateVideoListPage'
            buttonPlus90Degree_newDesign.title = 'Rotate 90°';
            buttonPlus90Degree_newDesign.innerText = "Rotate 90°";
            subnav_container_newDesign.insertBefore(buttonPlus90Degree_newDesign, subnav_container_newDesign.childNodes[2]);
        } catch (error) {

        }
    }
}

//================================================================================
var isEmpty = (obj) => {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

//inject jwerty script
if (document.getElementById('jwertyScript') === null) {
    var jwertyScript = document.createElement('script');
    jwertyScript.id = "jwertyScript"
    jwertyScript.innerHTML = `!function(e,t){function n(t){if("function"!=typeof require||"undefined"==typeof module||!module.exports)return e[t];try{return require(t.toLowerCase())}catch(n){}}function r(e,t){return null===e?"null"===t:void 0===e?"undefined"===t:e.is&&e instanceof l?"element"===t:Object.prototype.toString.call(e).toLowerCase().indexOf(t)>7}function o(e){var t,n,i,a,u,s,f,l,c;if(e instanceof o)return e;for(r(e,"array")||(e=String(e).replace(/\\s/g,"").toLowerCase().match(/(?:\\+,|[^,])+/g)),t=0,n=e.length;n>t;++t){for(r(e[t],"array")||(e[t]=String(e[t]).match(/(?:\\+\\/|[^\\/])+/g)),s=[],i=e[t].length;i--;){for(f=e[t][i],u={jwertyCombo:String(f),shiftKey:!1,ctrlKey:!1,altKey:!1,metaKey:!1},r(f,"array")||(f=String(f).toLowerCase().match(/(?:(?:[^\\+])+|\\+\\+|^\\+$)/g)),a=f.length;a--;)"++"===f[a]&&(f[a]="+"),f[a]in d.mods?u[y[d.mods[f[a]]]]=!0:f[a]in d.keys?u.keyCode=d.keys[f[a]]:l=f[a].match(/^\\[([^-]+\\-?[^-]*)-([^-]+\\-?[^-]*)\\]$/);if(r(u.keyCode,"undefined"))if(l&&l[1]in d.keys&&l[2]in d.keys){for(l[2]=d.keys[l[2]],l[1]=d.keys[l[1]],c=l[1];c<l[2];++c)s.push({altKey:u.altKey,shiftKey:u.shiftKey,metaKey:u.metaKey,ctrlKey:u.ctrlKey,keyCode:c,jwertyCombo:String(f)});u.keyCode=c}else u.keyCode=0;s.push(u)}this[t]=s}return this.length=t,this}var i,a,u,s,f=e.document,l=n("jquery")||n("zepto")||n("ender")||f,c="keydown";l===f?(i=function(e,t){return e?l.querySelector(e,t||l):l},a=function(e,t){e.addEventListener(c,t,!1)},u=function(e,t){e.removeEventListener(c,t,!1)},s=function(e,t){var n,r=f.createEvent("Event");r.initEvent(c,!0,!0);for(n in t)r[n]=t[n];return(e||l).dispatchEvent(r)}):(i=function(e,t){return l(e||f,t)},a=function(e,t){l(e).bind(c+".jwerty",t)},u=function(e,t){l(e).unbind(c+".jwerty",t)},s=function(e,t){l(e||f).trigger(l.Event(c,t))});for(var y={16:"shiftKey",17:"ctrlKey",18:"altKey",91:"metaKey"},d={mods:{"⇧":16,shift:16,"⌃":17,ctrl:17,"⌥":18,alt:18,option:18,"⌘":91,meta:91,cmd:91,"super":91,win:91},keys:{"⌫":8,backspace:8,"⇥":9,"⇆":9,tab:9,"↩":13,"return":13,enter:13,"⌅":13,pause:19,"pause-break":19,"⇪":20,caps:20,"caps-lock":20,"⎋":27,escape:27,esc:27,space:32,"↖":33,pgup:33,"page-up":33,"↘":34,pgdown:34,"page-down":34,"⇟":35,end:35,"⇞":36,home:36,ins:45,insert:45,del:46,"delete":46,"←":37,left:37,"arrow-left":37,"↑":38,up:38,"arrow-up":38,"→":39,right:39,"arrow-right":39,"↓":40,down:40,"arrow-down":40,"*":106,star:106,asterisk:106,multiply:106,"+":107,plus:107,"-":109,subtract:109,"num-.":110,"num-period":110,"num-dot":110,"num-full-stop":110,"num-delete":110,";":186,semicolon:186,"=":187,equals:187,",":188,comma:188,".":190,period:190,"full-stop":190,"/":191,slash:191,"forward-slash":191,"\`":192,tick:192,"back-quote":192,"[":219,"open-bracket":219,"\\\\":220,"back-slash":220,"]":221,"close-bracket":221,"'":222,quote:222,apostraphe:222}},m=47,p=0;++m<106;)d.keys[p]=m,d.keys["num-"+p]=m+48,++p;for(m=111,p=1;++m<136;)d.keys["f"+p]=m,++p;for(m=64;++m<91;)d.keys[String.fromCharCode(m).toLowerCase()]=m;var h=t.jwerty={event:function(e,t,n){if(r(t,"boolean")){var i=t;t=function(){return i}}e=new o(e);var a,u,s=0,f=e.length-1;return function(r){return(u=h.is(e,r,s))?f>s?void++s:(a=t.call(n||this,r,u),a===!1&&r.preventDefault(),void(s=0)):void(s=h.is(e,r)?1:0)}},is:function(e,t,n){e=new o(e),n=n||0,e=e[n],t=t.originalEvent||t;for(var r=e.length,i=!1;r--;){i=e[r].jwertyCombo;for(var a in e[r])"jwertyCombo"!==a&&t[a]!=e[r][a]&&(i=!1);if(i!==!1)return i}return i},key:function(t,n,o,s,f){var l=r(o,"element")||r(o,"string")?o:s,c=l===o?e:o,y=l===o?s:f,d=r(l,"element")?l:i(l,y),m=h.event(t,n,c);return a(d,m),{unbind:function(){u(d,m)}}},fire:function(e,t,n,a){e=new o(e);var u=r(n,"number")?n:a;s(r(t,"element")?t:i(t,n),e[u||0][0])},KEYS:d}}("undefined"!=typeof global&&global.window||this,"undefined"!=typeof module&&module.exports?module.exports:this);`
    document.body.appendChild(jwertyScript)
}

var loadWatchPageFirstTime = true;
var loadWatchPageFirstTime_pageList = true;
document.body.addEventListener("load", fnMain, true);
function fnMain(e) {
    if ('/watch' === location.pathname) {
        if (loadWatchPageFirstTime) {

            var btnRotateVideo = document.querySelector('.btnRotateVideo');
            if (btnRotateVideo !== null) {
                loadWatchPageFirstTime = false;
            }

            var styleYoutubeVideoRotate = document.getElementById('style-youtube-video-rotate');
            if (styleYoutubeVideoRotate === null) {
                browser.storage.local.get('_val_').then((r) => {
                    if (!isEmpty(r._val_)) {
                        createRotateFn(r._val_.enableShortcuts);
                    } else {
                        var vObj = {
                            "showMirrorAndZoomButton": true,
                            "showRotateButton_pageList": true,
                            "enableShortcuts": true
                        }

                        browser.storage.local.set({
                            _val_: vObj
                        })

                        createRotateFn(true);
                    }
                })
            }

            var styleYoutubeVideoScaleFlip = document.getElementById('style-youtube-video-scale-flip');
            if (styleYoutubeVideoScaleFlip === null) {
                browser.storage.local.get('_val_').then((r) => {
                    if (!isEmpty(r._val_)) {
                        if (r._val_.showMirrorAndZoomButton) {
                            createScale_Filp_Fn(r._val_.enableShortcuts);
                        }
                    } else {
                        var vObj = {
                            "showMirrorAndZoomButton": true,
                            "showRotateButton_pageList": true,
                            "enableShortcuts": true
                        }

                        browser.storage.local.set({
                            _val_: vObj
                        })

                        createScale_Filp_Fn(true);
                    }
                })
            }
        }
    } else {
        loadWatchPageFirstTime = true;
    }

    let regex_p_videos = /youtube.com\/(user|channel)\/([\w-]+)\/videos/g //videos
    let yt_url = window.location.href
    if (regex_p_videos.test(yt_url)) {
        if (loadWatchPageFirstTime_pageList) {
            var styleYoutubeVideoRotate_page_video_list = document.getElementById('style-youtube-video-rotate-page-video-list');
            var btnRotateVideoListPage = document.querySelector('.btnRotateVideoListPage');

            if (btnRotateVideoListPage !== null) {
                loadWatchPageFirstTime_pageList = false;
            }

            if (styleYoutubeVideoRotate_page_video_list === null ||
                btnRotateVideoListPage === null) {

                browser.storage.local.get('_val_').then((r) => {
                    if (!isEmpty(r._val_)) {
                        if (r._val_.showRotateButton_pageList) {
                            createRotateFn_page_video_list(r._val_.enableShortcuts);
                        }
                    } else {
                        var vObj = {
                            "showMirrorAndZoomButton": true,
                            "showRotateButton_pageList": true,
                            "enableShortcuts": true
                        }

                        browser.storage.local.set({
                            _val_: vObj
                        })

                        createScale_Filp_Fn(true);
                    }
                })

            }

        }
    } else {
        loadWatchPageFirstTime_pageList = true;
    }

}


browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    //console.log("URL CHANGED: " + request.data.url);
    try {

        // reset rotate
        if (typeof window.wrappedJSObject.fnRotateVideo !== 'undefined') {
            window.wrappedJSObject.fnRotateVideo(-1)
        }

        //reset zoom / mirror
        if (typeof window.wrappedJSObject.resetScaleFlipMenu !== 'undefined') {
            window.wrappedJSObject.resetScaleFlipMenu()
        }

        // reset rotate 90 degree (video list)
        if (typeof window.wrappedJSObject.fnRotateVideo_page_video_list !== 'undefined') {
            window.wrappedJSObject.fnRotateVideo_page_video_list(-1)
        }

    } catch (error) {
        console.log(error)
    }
});