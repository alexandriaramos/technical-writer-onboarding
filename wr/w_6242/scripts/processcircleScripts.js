
var circleOriginX;
var circleOriginY;
var radius;

var _rotatespeed=500;
var _circleColor='#FFF';
var _innerCircle='#f1f1f1';
var anglesArray
var _total

var currAngle = 0;
var lastSelected = 0;


function drawCircle(){
	$canvas = $('#circlecanvas');
	/*outer circle*/
	$grid = $canvas[0].getContext('2d');
	$grid.fillStyle=generalStyles.contentBodyColor;
	$grid.beginPath();
    $grid.arc(135,135,135,0,Math.PI*2,true);
    $grid.closePath();
    $grid.fill(); 
	
	/*inner circle*/
	$grid.fillStyle=generalStyles.bodyColor;
	$grid.beginPath();
    $grid.arc(135,135,90,0,Math.PI*2,true);
    $grid.closePath();
    $grid.fill(); 
	
	$grid.fillStyle=generalStyles.bodyColor;
	$grid.beginPath();
    $grid.arc(135,135,90,0,Math.PI*2,true);
    $grid.closePath();
    $grid.fill(); 

	setUpBtns()
}

function setUpBtns(){
	
	$('.btn').click(function(e) {
        var id=$(this).attr('data-id');
		
		$(".tab_content").hide();
		resetBtns(id);

       $('.tab_content').eq((id-1)).fadeIn(function() {
			pauseSound();
			btnClicked = Number(id)-1
			if (soundArray[btnClicked] != "-1") {
			
				setTimeout("play_sound(soundArray[btnClicked])",50);
			}
		});
		//$('.scroll-pane').jScrollPane();
		var angle=anglesArray[id-1];
		//alert(angle);
		rotate(angle,id);
		$(this).addClass('active');
		$('.active').css('background-color', generalStyles.btnColorDown);
		
    });
	
	$('.btn').keydown(function(e) {
		if(e.keyCode  == 13 || e.keyCode  == 32) {
			var id=$(this).attr('data-id');
			
			$(".tab_content").hide();
			resetBtns(id);
			
		   $('.tab_content').eq((id-1)).fadeIn(function() {
				pauseSound();
				btnClicked = Number(id)-1
				if (soundArray[btnClicked] != "-1") {
					
					setTimeout("play_sound(soundArray[btnClicked])",50);
				}
			  });
			$('.scroll-pane').jScrollPane();
			var angle=anglesArray[id-1];
			//alert(angle);
			rotate(angle,id);
			$(this).addClass('active');
			$('.active').css('background-color', generalStyles.btnColorDown);
		}
		
    });
}


function resetBtns(curr){
	for (var i=1;i<=_total;i++){
		if (i!=curr){
			//$('.box'+i).hide();
			$('.btn'+i).removeClass('active');
			$('.btn').css('background-color', generalStyles.btnColorUp);
		}
	}
}

/*rotate function*/
function rotate(degree,name){
	var currangle = $(".btn").eq(0).getRotateAngle();
	//var prev = currangle/120
	//var rot = currAngle - degree;
	//var change = 120*(name-1);
	//currAngle+=change;
	//alert(currAngle);
	//lastBtn=(slice*360/pieces+curWordRot);
	//lastBtn=(slice*360/pieces+curWordRot);
	//pos always clockwise, neg counterclock
	var dif = (lastSelected - (name-1));
	var rot = dif*360/_total;
	//alert(dif);
	if((rot-currAngle)<0){
		rot+=360;
		rot = rot % 360;
	}
	lastSelected = (name-1);
	currAngle += rot;
	
	$("#circleHolder").rotate({animateTo:currAngle});
	$(".btn").rotate({animateTo:-currAngle});
}

var btnClicked = "-1";

var isPresenter = false;
function getWidgetIFrame(){
	if(isPresenter){
		return window.parent.document.getElementById(window.name);
	}else{
		var cpWidget = window.parent.document.getElementsByClassName("cp-widget");
		for(i=0;i<cpWidget.length;i++){
			for(j=0;j<cpWidget[i].children.length;j++){
				if(cpWidget[i].children[j].children[0] != undefined){
					if(cpWidget[i].children[j].children[0].contentDocument.getElementById("processcirclewdgt") != null){
						myFrameName = window.name;
						return window.parent.document.getElementById(window.name);
					}
				}
			}
		}
	}
}

function resizeInteractionPresenter(thewidth,theheight) {
	var scale = 0;
	thewidth = String(thewidth).replace("px","");
	theheight = String(theheight).replace("px","");

	
	/**********************/
	//Modification made for Presenter same logic holds good for Captivate
	//iframe width and Height
	var scaleW = thewidth / (700);
	var scaleH = theheight/ (498);
	
	if(scaleW<scaleH){
		scale = scaleW
	}else{
		scale = scaleH
	}
	
	myWidgetiFrame.style.width = parseInt(parseInt(750*scaleW))+"px"
	myWidgetiFrame.style.height = parseInt(parseInt(550*scaleH))+"px"
	
	var iframewidth = String(myWidgetiFrame.style.width).replace("px","");
	var iframeheight = String(myWidgetiFrame.style.height).replace("px","");
	
	/*********************/
	
	//Resize interaction
	//Resize fonts
	//scalefont = true;
	
	var fontscaleW = thewidth / (800);
	var fontscaleH = theheight/ (600);
	
	if(fontscaleW<fontscaleH){
		fontscale = fontscaleW
	}else{
		fontscale = fontscaleH
	}
	
	contentStyles.size = contentStylessize*fontscale;
	//buttonStyles.size = buttonStyles.size*scale;
	headerStyles.size = headerStylessize*fontscale;
	instStyles.size = instStylessize*fontscale;

	
	setupStyle("#intTitle", headerStyles)
	setupStyle("#intInstructions", instStyles)
	setupStyle(".tab_content", contentStyles)
	setupStyle(".btn p", buttonStyles)
	
	
	
	var headerActiveSize;
	if (generalStyles.headerActive == 2) {
		headerActiveSize = 30
	}else{
		headerActiveSize = $('#headerColor').height();
	}
	
	var scrollLeftAlign =  120
	//if(iframewidth>=1024){
	var marginsW = Math.round(30 * scaleW);
	var marginsH = Math.round(20 * scaleH);
	
	$('#reveal').css('width',(680*scaleW));
	$('#reveal').css('height',(470*scaleH));
	$('#reveal').css('margin-left', marginsW+"px");
	$('#reveal').css('margin-top', marginsH+"px");
	
	var revealHeight = parseInt(String($('#reveal').css('height').replace("px","")));
	var revealWidth = parseInt(String($('#reveal').css('width').replace("px","")));
	
	var contentBg = document.getElementById("content_bg");
	//contentBg.style.width = ((revealHeight-headerActiveSize)-40)+"px"
	if (generalStyles.headerActive == 2) {
		contentBg.style.height = revealHeight-(15*scaleH)+"px"
	}else{
		contentBg.style.height = ((revealHeight-headerActiveSize)-40)+"px"
	}
	//$("#content_bg").hide();
	
	var contentBgHeight = parseInt(String($('#content_bg').css('height').replace("px","")));
	var contentBgWidth = parseInt(String($('#content_bg').css('width').replace("px","")));
	
	var margins = Math.round(25 * scale);
	margins+="px"
	
	var fscale = "scale(" + scale + ")";
	$('#mainCircleHolder').css('-webkit-transform', fscale);
	$('#mainCircleHolder').css('-moz-transform', fscale);
	$('#mainCircleHolder').css('-o-transform', fscale);
	$('#mainCircleHolder').css('-ms-transform', fscale);
	
	$('#mainCircleHolder').css('-webkit-transform-origin', '0 0');
	$('#mainCircleHolder').css('-moz-transform-origin', '0 0');
	$('#mainCircleHolder').css('-o-transform-origin', '0 0');
	$('#mainCircleHolder').css('-ms-transform-origin', '0 0');
	
	//Adjust width and height positions
	var pyramidHolderW = Number(270*scaleW);
	var pyramidHolderH = Number(270*scaleH);
	
	//Adjust top and left positions
	var pyramidTop = ((contentBgHeight/2)-(pyramidHolderH/2)-(headerActiveSize))+(50+(10*scaleH));
	var pyramidLeft = ((contentBgWidth/2)-(pyramidHolderW/2)-(160*scaleW));
	$("#mainCircleHolder").css("margin-top",pyramidTop);
	$("#mainCircleHolder").css("margin-left",pyramidLeft);
	
	//Resize and display content
	$(".scroll-pane").css('height',(revealHeight-headerActiveSize)-(80*scaleH));
	$(".scroll-pane").css('width',((revealWidth-pyramidHolderW))-(120*scaleW));
	$(".scroll-pane").css('top',(headerActiveSize+(60*scaleH)));
	$(".scroll-pane").css('left',(pyramidHolderW+(120*scaleW)));
	//$(".scroll-pane").hide();
	
	$($(myWidgetiFrame).parent().parent()).css("top",(myWidgetiFrameTop+(-19*scaleH)))
	$($(myWidgetiFrame).parent().parent()).css("left",(myWidgetiFrameLeft+(-25*scaleW)))
	
	$(myWidgetiFrame).show();
}

function resizeInteraction(thewidth,theheight) {
	if(isPresenter)
		return resizeInteractionPresenter(thewidth, theheight);
	
	var scale = 0;
	thewidth = String(thewidth).replace("px","");
	theheight = String(theheight).replace("px","");

	if(thewidth<320){
		thewidth = 320
	}
	if(theheight<320){
		theheight = 320
	}
	
	/**********************/
	//Modification made for Presenter same logic holds good for Captivate
	//iframe width and Height
	var scaleW = thewidth / (700);
	var scaleH = theheight/ (498);
	
	if(scaleW<scaleH){
		scale = scaleW
	}else{
		scale = scaleH
	}
	
	myWidgetiFrame.style.width = parseInt(parseInt(750*scaleW))+"px"
	myWidgetiFrame.style.height = parseInt(parseInt(550*scaleH))+"px"
	
	var iframewidth = String(myWidgetiFrame.style.width).replace("px","");
	var iframeheight = String(myWidgetiFrame.style.height).replace("px","");
	
	/*********************/
	
	//Resize interaction
	//Resize fonts
	//scalefont = true;
	if(scalefont=="true"){
		//Content font size
		if(contentStylessize>=12){
			if(thewidth>=1024){
				contentStyles.size = contentStylessize;
			}else if(thewidth>= 768){
				var tempNum = Math.round(contentStylessize-2);
				if(tempNum>=12){
					contentStyles.size = tempNum
				}else{
					contentStyles.size = 12
				}
			}else if(thewidth>= 360){
				contentStyles.size = 12
			}else{
				contentStyles.size = 10
			}
			
			var tempcontentStylessize = contentStyles.size*scaleW;
			if(tempcontentStylessize>=12 && tempcontentStylessize<=contentStylessize){
				contentStyles.size = tempcontentStylessize;
			}
			
		}
		
		
		//Button font size
		if(buttonStylessize>=12){
			if(thewidth>=1024){
				buttonStyles.size = buttonStylessize;
			}else if(thewidth>= 768){
				var tempNum = Math.round(buttonStylessize-2);
				if(tempNum>=12){
					buttonStyles.size = tempNum
				}else{
					buttonStyles.size = 12
				}
			}else if(thewidth>= 360){
				buttonStyles.size = 12
			}else{
				buttonStyles.size = 10
			}
			
			var tempbuttonStylessize = buttonStyles.size*scaleW;
			if(tempbuttonStylessize>=12 && tempbuttonStylessize<=buttonStylessize){
				buttonStyles.size = tempbuttonStylessize;
			}
			
		}
		
		
		//Header font size
		if(headerStylessize>=16){
			if(thewidth>=1024){
				headerStyles.size = headerStylessize;
			}else if(thewidth>= 768){
				var tempNum = Math.round(headerStylessize-2);
				if(tempNum>=16){
					headerStyles.size = tempNum
				}else{
					headerStyles.size = 16
				}
			}else if(thewidth>= 360){
				headerStyles.size = 16
			}else{
				headerStyles.size = 14
			}
			
			var tempheaderStylessize = headerStyles.size*scaleW;
			if(tempheaderStylessize>=16 && tempheaderStylessize<=headerStylessize){
				headerStyles.size = tempheaderStylessize;
			}
			
		}
		
		//Instructions font size
		if(instStylessize>=12){
			if(thewidth>=1024){
				instStyles.size = instStylessize;

			}else if(thewidth>= 768){
				var tempNum = Math.round(instStylessize-2);
				if(tempNum>=12){
					instStyles.size = tempNum
				}else{
					instStyles.size = 12
				}
			}else if(thewidth>= 360){
				instStyles.size = 12
			}else{
				instStyles.size = 10
			}
			
			var tempinstStylessize = instStyles.size*scaleW;
			if(tempinstStylessize>=12 && tempinstStylessize<=instStylessize){
				instStyles.size = tempinstStylessize;
			}

		}

		setupStyle("#intTitle", headerStyles)
		setupStyle("#intInstructions", instStyles)
		setupStyle(".tab_content", contentStyles)
		setupStyle(".btn p", buttonStyles)
	}else{
		
		contentStyles.size = contentStylessize;
		buttonStyles.size = buttonStylessize;
		headerStyles.size = headerStylessize;
		instStyles.size = instStylessize;
		
		if(theheight <= 360 || thewidth <= 360){
			contentStyles.size = 10;
			buttonStyles.size = 10;
			headerStyles.size = 14;
			instStyles.size = 10;
		}
		
		setupStyle("#intTitle", headerStyles)
		setupStyle("#intInstructions", instStyles)
		setupStyle(".tab_content", contentStyles)
		setupStyle(".btn p", buttonStyles)
	}
	
	var marginsW
	
	var headerActiveSize;
	if (generalStyles.headerActive == 2) {
		headerActiveSize = 30
	}else{
		headerActiveSize = $('#headerColor').height();
	}
	
	var scrollLeftAlign =  120
	if(iframewidth>=1024){
		marginsW = Math.round((27+scaleW) * scaleW);
	}else if(iframewidth>= 768){
		marginsW = Math.round((25+scaleW) * scaleW);
	}else if(iframewidth>= 360){
		marginsW = Math.round((19+scaleW) * scaleW);
	}else{
		marginsW = Math.round((12+scaleW) * scaleW);
		scrollLeftAlign =  100
	}

	var marginsH = Math.round(30 * scaleH);
	
	$('#reveal').css('width',(680*scaleW));
	$('#reveal').css('height',(470*scaleH));
	$('#reveal').css('margin-left', marginsW+"px");
	$('#reveal').css('margin-top', marginsH+"px");
	
	var revealHeight = parseInt(String($('#reveal').css('height').replace("px","")));
	var revealWidth = parseInt(String($('#reveal').css('width').replace("px","")));
	
	var contentBg = document.getElementById("content_bg");
	//contentBg.style.width = ((revealHeight-headerActiveSize)-40)+"px"
	if (generalStyles.headerActive == 2) {
		contentBg.style.height = revealHeight-(15*scaleH)+"px"
	}else{
		contentBg.style.height = ((revealHeight-headerActiveSize)-40)+"px"
	}
	//$("#content_bg").hide();
	
	var contentBgHeight = parseInt(String($('#content_bg').css('height').replace("px","")));
	var contentBgWidth = parseInt(String($('#content_bg').css('width').replace("px","")));
	
	var margins = Math.round(25 * scale);
	margins+="px"
	
	if(parseInt(thewidth)>=parseInt(theheight)){
		var fscale = "scale(" + scale + ")";
		$('#mainCircleHolder').css('-webkit-transform', fscale);
		$('#mainCircleHolder').css('-moz-transform', fscale);
		$('#mainCircleHolder').css('-o-transform', fscale);
		$('#mainCircleHolder').css('-ms-transform', fscale);
		
		$('#mainCircleHolder').css('-webkit-transform-origin', '0 0');
		$('#mainCircleHolder').css('-moz-transform-origin', '0 0');
		$('#mainCircleHolder').css('-o-transform-origin', '0 0');
		$('#mainCircleHolder').css('-ms-transform-origin', '0 0');
		
		//Adjust width and height positions
		var pyramidHolderW = Number(270*scaleW);
		var pyramidHolderH = Number(270*scaleH);
		
		//Adjust top and left positions
		var pyramidTop = ((contentBgHeight/2)-(pyramidHolderH/2)-(headerActiveSize))+(10+(10*scaleH));
		var pyramidLeft = ((contentBgWidth/2)-(pyramidHolderW/2)-(160*scaleW));
		$("#mainCircleHolder").css("margin-top",pyramidTop);
		$("#mainCircleHolder").css("margin-left",pyramidLeft);
		
		//Resize and display content
		$(".scroll-pane").css('height',(revealHeight-headerActiveSize)-(80*scaleH));
		$(".scroll-pane").css('width',((revealWidth-pyramidHolderW))-(120*scaleW));
		$(".scroll-pane").css('top',(headerActiveSize+(60*scaleH)));
		$(".scroll-pane").css('left',(pyramidHolderW+(120*scaleW)))
	}else{
		var fscaleW = thewidth / (500);
		var fscaleH = theheight/ (398);
		
		var tfscale = fscaleW
		
		if(fscaleW<fscaleH){
			tfscale = fscaleW
		}else{
			tfscale = fscaleH
		}
		
		var fscale = "scale(" + tfscale + ")";
		
		$('#mainCircleHolder').css('-webkit-transform', fscale);
		$('#mainCircleHolder').css('-moz-transform', fscale);
		$('#mainCircleHolder').css('-o-transform', fscale);
		$('#mainCircleHolder').css('-ms-transform', fscale);
		
		$('#mainCircleHolder').css('-webkit-transform-origin', '0 0');
		$('#mainCircleHolder').css('-moz-transform-origin', '0 0');
		$('#mainCircleHolder').css('-o-transform-origin', '0 0');
		$('#mainCircleHolder').css('-ms-transform-origin', '0 0');
		
		//Adjust width and height positions
		var pyramidHolderW = Number(270*fscaleW);
		var pyramidHolderH = Number(270*fscaleH);
		
		//Adjust top and left positions
		var pyramidTop = ((contentBgHeight/2)-(pyramidHolderH/2)-(headerActiveSize*scaleH)+(10*scaleH));
		var pyramidLeft = ((contentBgWidth/2)-(pyramidHolderW/2)-(10*scaleW));
		$("#mainCircleHolder").css("margin-top",pyramidTop);
		$("#mainCircleHolder").css("margin-left",pyramidLeft);
		
		//Resize and display content
		$(".scroll-pane").css('width',revealWidth-(50*scaleW));
		$(".scroll-pane").css('height',(revealHeight-pyramidHolderW)-(100*fscaleH));
		$(".scroll-pane").css('left',(12+(25*scaleW)));
		$(".scroll-pane").css('top',(pyramidHolderW+(100*fscaleH)));
		
	}
	//$(myWidgetiFrame).show();
	if(isResponsiveProject){
		$($(myWidgetiFrame).parent().parent()).css("top",(myWidgetiFrameTop+(-19*scaleH)))
		$($(myWidgetiFrame).parent().parent()).css("left",(myWidgetiFrameLeft+(-25*scaleW)))
	}else{
		if(firstLoad){
			$($(myWidgetiFrame).parent().parent()).css("top",(myWidgetiFrameTop+(-19*scaleH)))
			$($(myWidgetiFrame).parent().parent()).css("left",(myWidgetiFrameLeft+(-25*scaleW)))
		}
	}
}


//function addClickHandlers() {
//	$("#reveal").fadeIn();
//
//}
			
/*var theSnd = null;

function pauseSound() {
	if(theSnd != null) // && theSnd.src != wavePath)
	{ theSnd.pause();}
}

function play_sound(url){
	theSnd = new Audio(url);
	theSnd.load();
	theSnd.play();	
}*/

//Modifying the sound function - Audio load and play is now handled by captivate: IF it does not handle the audio revert to old code.
//This fix was mainly  implemented for IPAD.
var isDevice = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	isDevice = true
}
//var isDevice = navigator.userAgent.match(/iPad/i) != null;
var theSnd = null;
var theSndURL = null;

function pauseSound() {
	if(isDevice){
		if(!this.handle)
		return;
		
		if(!this.handle.stopWidgetAudio(theSndURL)){
			if(theSnd != null){ 
				theSnd.pause();
			}
		}else{
			this.handle.stopWidgetAudio(theSndURL)
		}
	} else {
		if(theSnd != null) // && theSnd.src != wavePath)
		{ theSnd.pause();}
	}
}

function play_sound(url){
	if(isDevice){
		if(!this.handle)
		return;
		
		theSndURL = url;
		if(!this.handle.playWidgetAudio(url)){	
			theSnd = new Audio(url);
			theSnd.load();
			theSnd.play();
		}else{
			this.handle.playWidgetAudio(url)
		}
	}else{
		theSnd = new Audio(url);
		theSnd.load();
		theSnd.play();	
	}
}
////////////////////////////////////////////////////////



function setupCustomStyles() {
	generalStyles.headerColor = formatColor(generalStyles.headerColor); //generalStyles.headerColor.substring(2);
	generalStyles.contentBodyColor = formatColor(generalStyles.contentBodyColor); //"#" + generalStyles.contentBodyColor.substring(2);
	generalStyles.bodyColor = formatColor(generalStyles.bodyColor); //"#" + generalStyles.bodyColor.substring(2);
	//generalStyles.arrowColor = formatColor(generalStyles.arrowColor);
	generalStyles.btnColorUp = formatColor(generalStyles.btnColorUp);
	generalStyles.btnColorOver = formatColor(generalStyles.btnColorOver);
	generalStyles.btnColorDown = formatColor(generalStyles.btnColorDown);
	//generalStyles.lineColor = formatColor(generalStyles.lineColor);	

	//alert(generalStyles.lineColor);
		if (currentTheme != 3 && currentTheme != 11) {
			$('#headerColor').css('background-color', generalStyles.headerColor)//generalStyles.headerColor);
		} else {
			$('#headerColor').css('background-color', generalStyles.bodyColor)//generalStyles.headerColor);
			
		}//$('#headerColor').css('background-image', 'none');
	$('#textBox').css('background-color', generalStyles.contentBodyColor);
	$('#content_bg').css('background-color', generalStyles.bodyColor);
	//alert(generalStyles.btnColorDown);
	$('.btn').css('background-color', generalStyles.btnColorUp);
	$('.btn p').css('padding-left', '5px');
	$('.btn p').css('padding-right', '5px');
	$('.btn p').css('padding-top', '0px');
	//$('#reveal').css('display', 'block');
	
	

	if (generalStyles.headerActive == 2) {
		$('#headerColor').css('display', 'none');
		$('#content_bg').css('height', "395px");
	}
	
	//$('.timelineNode:hover').css('background-color', generalStyles.btnColorOver);
	//$('div.active').css('background-color', generalStyles.btnColorOver);
	
	//#headerColor { 
	//background-color:#069;
	//generalStyles.headerActive = theTextProps.children('general').attr("headerActive");
		//generalStyles.arrowColor = theTextProps.children('general').attr("arrowColor");
		//generalStyles.headerColor = theTextProps.children('general').attr("headerColor");
		//generalStyles.contentBodyColor = theTextProps.children('general').attr("contentBodyColor");
		//generalStyles.bodyColor = theTextProps.children('general').attr("bodyColor");
		//generalStyles.btnColorUp = theTextProps.children('general').attr("btnColorUp");


		//generalStyles.btnColorOver = theTextProps.children('general').attr("btnColorOver");
		//generalStyles.btnColorDown = theTextProps.children('general').attr("btnColorDown");
}


