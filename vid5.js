

document.body.removeChild(document.body.firstChild);
document.body.style.backgroundColor='#ffffff';
document.body.style.overflow='hidden';
document.body.style.margin='0px';

document.body.addEventListener("keydown", keydowner);
document.body.addEventListener("keyup", keyupper);

document.body.onmousemove=function(){
if(event.clientY<100){
el('ctrlDiv').style.display='block';
}else{
el('ctrlDiv').style.display='none';
}}


function el(a){return document.getElementById(a);}
function da(a,b){if(el(a)){el(a).innerHTML=b;}}

var zoom=1;
var oldx=0, oldy=0;
var dragging=false;
var w=window.innerWidth;
var h=w*(screen.height/screen.width);
var zoomW=w,zoomH=h, oldZoomW=zoomW,oldZoomH=zoomH;
var lefter=0, topper=0, zoomLeft=0, zoomTop=0;
var vi=1;
var bestFit=true;
var togControls=true;
var altKey=false;
var togMute=false;


window.addEventListener('resize',onWindowResize,false);


function onWindowResize(){
w=window.innerWidth;
h=w*(screen.height/screen.width);
imDimSetter();
}//end on window resize


function isFullScreen(){
return (document.fullScreenElement && document.fullScreenElement !== null)
|| document.mozFullScreen
|| document.webkitIsFullScreen;
}//end is full screen

function requestFullScreen(){
var el=document.documentElement;
var rfs=el.requestFullscreen
|| el.webkitRequestFullScreen
|| el.mozRequestFullScreen
|| el.msRequestFullscreen;
rfs.call(el);
}//end request full screen 

function exitFullScreen(){
var d=document;
var rfs=d.exitFullscreen
|| d.webkitExitFullscreen
|| d.mozCancelFullScreen
|| d.msExitFullscreen ;
rfs.call(d);
}//end exit fullscreen

function toggleFullScreen(){
if(isFullScreen()){exitFullScreen();
}else{requestFullScreen();
}
}//end toggle full screen




function mousedowner(event){
event.preventDefault();
el('panzoom').style.cursor='hand';
if(event.which==2){
toggleFullScreen();
}else if(event.which==3){


}else{
event.preventDefault();
dragging=true;
oldx=event.clientX; 
oldy=event.clientY; 
}}//end mousedowner


function mouseupper(event){
event.preventDefault();
el('panzoom').style.cursor='hand';
dragging=false;
}//end mouseupper



function mousemover(event){ 
event.preventDefault();
el('panzoom').style.cursor='hand';

if(dragging){ 
lefter+=event.clientX-oldx;
topper+=event.clientY-oldy;

//el('vzoom').style.left=zoomLeft+lefter +'px'; 
//el('vzoom').style.top=zoomTop+topper +'px'; 

el('panzoom').style.left=zoomLeft+lefter +'px'; 
el('panzoom').style.top=zoomTop+topper +'px'; 
oldx=event.clientX;
oldy=event.clientY;

}}//end mousemover



function mousewheeler(event){
event.preventDefault();
el('panzoom').style.cursor='hand';

delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

if(delta>0){zoom=1.2;}else if(delta<0){zoom=.8;}


var mousex=parseFloat(event.clientX);
var mousey=parseFloat(event.clientY);
var L=zoomLeft+lefter;
var T=zoomTop+topper;
var mulx=(mousex-L)/zoomW;
var muly=(mousey-T)/zoomH;

zoomW*=zoom;
zoomH*=zoom;

zoomLeft+=(oldZoomW-zoomW)*mulx;
zoomTop+=(oldZoomH-zoomH)*muly;


oldZoomW=zoomW;
oldZoomH=zoomH;


el('vzoom').style.width=zoomW+'px';
el('vzoom').style.height=zoomH+'px';

//el('vzoom').style.left=zoomLeft+lefter +'px'; 
//el('vzoom').style.top=zoomTop+topper +'px'; 

el('panzoom').style.width=zoomW+'px';
el('panzoom').style.height=zoomH+'px';

el('panzoom').style.left=zoomLeft+lefter +'px'; 
el('panzoom').style.top=zoomTop+topper +'px'; 

}//end mousewheeler


function keydowner(event){
if(event.keyCode==90){altKey=true;} // z
var inc=.04; if(altKey){inc=.08;}

switch(event.keyCode ){
case 80: //p
//showHideControls();
break;
case 75: //k

if(altKey){divVzoom.playbackRate-=.05;}else{
divVzoom.playbackRate+=.05;}
if(divVzoom.playbackRate<.05){divVzoom.playbackRate=.05;}
break;

case 78: //n
vi++;if(vi>9){vi=1;} el('vzoom').src='http://localhost/vids/'+vi+'.webm';
break;
case 67: //c

togControls=!togControls; 
el('vzoom').controls=togControls;
if(togControls){
el('panzoom').style.zIndex='1000';
el('vzoom').style.zIndex='10000000000';
}else{
el('panzoom').style.zIndex='10000000000';
el('vzoom').style.zIndex='1000';
}

break;
case 77: //m
togMute=!togMute;
divVzoom.muted=togMute;
break;
case 66://b
break;

case 37: //left arrow
event.preventDefault();
el('vzoom').currentTime-=inc; if(el('vzoom').currentTime<0){ el('vzoom').currentTime=0;}
break;
case 39: //right arrow
event.preventDefault();
el('vzoom').currentTime+=inc; if(el('vzoom').currentTime>el('vzoom').duration){ el('vzoom').currentTime=el('vzoom').duration;}
break;

}
}//end keydowner

function keyupper(event){
if(event.keyCode==18){altKey=false;} // (alt)
switch(event.keyCode ){

}
}//end keyupper


function setDefaultView(){
w=window.innerWidth;
h=w*(screen.height/screen.width);
zoom=1; zoomW=w; zoomH=h; oldZoomW=zoomW; oldZoomH=zoomH;
lefter=0; topper=0; zoomLeft=0; zoomTop=0;
el('vzoom').style.width=w+'px';
el('vzoom').style.height=h+'px';
//el('vzoom').style.left='0px';
//el('vzoom').style.top='0px';

el('panzoom').style.width=w+'px';
el('panzoom').style.height=h+'px';
el('panzoom').style.left='0px';
el('panzoom').style.top='0px';
}//end default view

function imDimSetter(){
zoom=1,zoomLeft=0,zoomTop=0;

w=document.getElementsByTagName('video')[0].videoWidth;
h=document.getElementsByTagName('video')[0].videoHeight

imRatio=w/h; 
if(bestFit){h=window.innerHeight; w=h*imRatio; }

topper=window.innerHeight/2-h/2;
//el('vzoom').style.top=topper+'px';
lefter=window.innerWidth/2-w/2;
//el('vzoom').style.left=lefter+'px';

zoomW=w, zoomH=h, oldZoomW=zoomW, oldZoomH=zoomH;
el('vzoom').style.width=w+'px';
el('vzoom').style.height=h+'px';

el('panzoom').style.top=topper+'px';
el('panzoom').style.left=lefter+'px';
el('panzoom').style.width=w+'px';
el('panzoom').style.height=h+'px';

}//end imDimSetter


//document.body.removeChild(document.body.firstChild);

var divPanZoom=document.createElement("div");
document.body.appendChild(divPanZoom);
divPanZoom.setAttribute("id", "panzoom");
el('panzoom').style.opacity='1';
el('panzoom').style.display='block';
el('panzoom').style.position='absolute';
el('panzoom').style.zIndex='1000000000';
el('panzoom').style.left='0px';
el('panzoom').style.top='0px';
el('panzoom').onmousedown=function(){mousedowner(event);}
el('panzoom').onmousemove=function(){mousemover(event);}
el('panzoom').onmouseup=function(){mouseupper(event);}
el('panzoom').onmousewheel=function(){mousewheeler(event);}

var divVzoom=document.createElement("video");
divPanZoom.appendChild(divVzoom);
divVzoom.setAttribute("id", "vzoom");
el('panzoom').style.zIndex='1000';
divVzoom.controls=false;togControls=divVzoom.controls;
divVzoom.autoplay=true;
divVzoom.loop=true;
divVzoom.muted=true; togMute=divVzoom.muted;
el('vzoom').style.left='0px';
el('vzoom').style.top='0px';
el('vzoom').style.opacity='1';
el('vzoom').src=window.location.href;


//especial for firefox:
el('panzoom').addEventListener('DOMMouseScroll', mousewheeler, false);


el('vzoom').style.width=w+'px';
el('vzoom').style.height=h+'px';

//el('vzoom').style.left='0px';
//el('vzoom').style.top='0px';

el('panzoom').style.width=window.innerWidth+'px';
el('panzoom').style.height=window.innerHeight+'px';

el('panzoom').style.left='0px';
el('panzoom').style.top='0px';

setDefaultView();

var controlDiv=document.createElement('div');
document.body.appendChild(controlDiv);
controlDiv.setAttribute("id", "ctrlDiv");
controlDiv.style.whiteSpace='nowrap';
controlDiv.style.display='none';
controlDiv.style.width='500px;';
controlDiv.style.left='0px';
controlDiv.style.top='0px';
controlDiv.style.position='absolute';
controlDiv.style.zIndex='1000000000000000000';
controlDiv.style.padding='4px';

var inpUrlDiv=document.createElement('input');
controlDiv.appendChild(inpUrlDiv);
inpUrlDiv.setAttribute("type", "text");
inpUrlDiv.setAttribute("value", "paste url to video file (.mp4,webm,ogg,mov)");
inpUrlDiv.size=50;
inpUrlDiv.style.display='inline-block';
inpUrlDiv.style.fontFamily='monospace';
inpUrlDiv.style.zIndex='10000000';
inpUrlDiv.style.padding='2px';
inpUrlDiv.style.backgroundColor='#ffffff';
inpUrlDiv.style.color='#000000';
inpUrlDiv.style.marginLeft='8px';

var loadButt=document.createElement('input');
controlDiv.appendChild(loadButt);
loadButt.setAttribute("type", "button");
loadButt.setAttribute("value", "load");
loadButt.style.display='inline-block';
loadButt.style.fontFamily='monospace';
loadButt.style.zIndex='10000000';
loadButt.style.padding='4px';
loadButt.style.margin='4px';
loadButt.style.backgroundColor='#000000';
loadButt.style.color='#ffffff';
loadButt.onclick=function(){el('vzoom').src=inpUrlDiv.value;}


