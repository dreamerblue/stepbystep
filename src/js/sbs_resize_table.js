/*
by bLue
Version: 1.0.4
Link: https://github.com/dreamerblue/stepbystep
Last Updated: 02/04/2017
*/

var scrollWidth, scrollHeight;
var hasScrollX, hasScrollY;
var userCnt;
var widthPerUser = 108;
var probCnt;
var heightPerProb = 38;
var div2TotalWidth, div1TotalHeight;

var shitSogouExplorer = 1;

// Function "getScrollWidth/getScrollHeight" powered by: http://www.cnblogs.com/consatan/archive/2011/07/06/2099310.html
function getScrollWidth() {
	var noScroll, scroll, oDiv = document.createElement("DIV");
	oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
	noScroll = document.body.appendChild(oDiv).clientWidth;
	oDiv.style.overflowY = "scroll";
	scroll = oDiv.clientWidth;
	document.body.removeChild(oDiv);
	return noScroll-scroll;
}

function getScrollHeight() {
	var noScroll, scroll, oDiv = document.createElement("DIV");
	oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
	noScroll = document.body.appendChild(oDiv).clientHeight;
	oDiv.style.overflowX = "scroll";
	scroll = oDiv.clientHeight;
	document.body.removeChild(oDiv);
	return noScroll-scroll;
}

function setHeight(scrollHeight, div1TotalHeight, hasScrollX, specialCase) {
	var navHeight = 50;
	var theadHeight = 100;
	var height = Math.max(document.documentElement.clientHeight, document.body.clientHeight);
	var div1MaxHeight = height-navHeight-theadHeight;
	if(!hasScrollX) {
		div1TotalHeight -= scrollHeight;
		scrollHeight = 0;
	}
	if(div1TotalHeight > div1MaxHeight)
		div1Height = div1MaxHeight;
	else div1Height = div1TotalHeight;
	if(specialCase)
		document.getElementById("div2").style.height = (div1Height-scrollHeight) + "px";
	else document.getElementById("div2").style.height = (div1Height-shitSogouExplorer) + "px";
	document.getElementById("div1").style.height = (div1Height-scrollHeight-shitSogouExplorer) + "px";
	return div1Height;
}

function setWidth(div2TotalWidth) {
	var width = document.documentElement.clientWidth;
	var div1Width = document.getElementById("div1").offsetWidth;
	var div2MaxWidth = width - div1Width;
	if(div2TotalWidth > div2MaxWidth)
		div2Width = div2MaxWidth;
	else div2Width = div2TotalWidth;
	document.getElementById("div2").style.width = div2Width + "px";
	return div2Width;
}

function resize() {
	$("#div1").css({"height": "1px"});
	$("#div2").css({"height": "1px", "width": "1px"});
	var width = setWidth(div2TotalWidth);
	if(width == div2TotalWidth) hasScrollX = false;
	else hasScrollX = true;
	if(!hasScrollX)
		document.getElementById("div2").style.overflowX = "hidden";
	else document.getElementById("div2").style.overflowX = "scroll";
	// Special Case
	if(hasScrollX && !hasScrollY && div2TotalWidth-width<scrollWidth) {
		document.getElementById("div2").style.overflowX = "hidden";
		var height = setHeight(scrollHeight, div1TotalHeight, hasScrollX, true);
	}
	else var height = setHeight(scrollHeight, div1TotalHeight, hasScrollX);
	if((!hasScrollX && div1TotalHeight-scrollHeight==height)
		|| (hasScrollX && div1TotalHeight==height))
		hasScrollY = false;
	else hasScrollY = true;
	if(!hasScrollY) {
		if(!hasScrollX) width -= scrollWidth;
		if(div2TotalWidth-width < scrollWidth)
			width = div2TotalWidth-scrollWidth;
		document.getElementById("div2").style.overflowY = "hidden";
		document.getElementById("div2").style.width = (width) + "px";
		document.getElementById("fixedheadwrap2").style.width = (width) + "px";
	}
	else {
		document.getElementById("div2").style.overflowY = "scroll";
		document.getElementById("fixedheadwrap2").style.width = (width-scrollWidth) + "px";
	}
}

$(document).ready(function () {
	scrollWidth = getScrollWidth();
	scrollHeight = getScrollHeight();
	userCnt = $("#fixedheadwrap2").find("th").length;
	div2TotalWidth = userCnt * widthPerUser + scrollHeight + 2;
	probCnt = $("#div1").find("tr").length;
	div1TotalHeight = probCnt * heightPerProb + scrollWidth + 2;
	resize();
});

$(window).resize(function () {
	resize();
});
