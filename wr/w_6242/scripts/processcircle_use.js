//holder arrays
var textArray = [];
var buttonArray = [];
var imageIDArray = [];
var soundIDArray = [];
var imageArray = [];
var soundArray = [];
var picAlignArray=[];
var color;
var face;
var style;
var size;
var align;
var contentStyles = new Object();
var buttonStyles = new Object();
var headerStyles = new Object();
var instStyles = new Object();
var generalStyles = new Object();
var circleOriginX = 250;
var circleOriginY = 150;
var radius = 100;
var pos;
var deltaAngle;
var width
var height
var handle
		
var isResponsiveProject = false;
var mainCPNamespace;
var evtHandle;
var scalefont;

var contentStylessize;
var buttonStylessize;
var headerStylessize;
var instStylessize;

var divSlide;
var firstLoad = false;
var myWidgetiFrameLeft,myWidgetiFrameTop

processcircleUse1 = {
	onLoad: function()
	{
		if ( ! this.captivate )
			return;
		
				handle = this.captivate.CPMovieHandle;
		//if(handle.isWidgetVisible() == true)
		//{
		if(typeof this.captivate.CPMovieHandle.isPresenter == 'function')
			isPresenter = this.captivate.CPMovieHandle.isPresenter();		

		this.movieProps = this.captivate.CPMovieHandle.getMovieProps();
		if ( ! this.movieProps )
			return;
		this.varHandle = this.movieProps.variablesHandle;
		//this.eventDisp = this.movieProps.eventDispatcher;
		evtHandle = this.movieProps.eventDispatcher;
		mainCPNamespace = this.movieProps.getCpHandle();
		isResponsiveProject = mainCPNamespace.responsive;
		this.xmlStr = this.captivate.CPMovieHandle.widgetParams();
		var size = this.OpenAjax.getSize();
		width = size.width;
		height = size.height;
		this.internalImage = '';
		this.externalImage = '';
		this.instructions = '';
		this.buttonLabel = '';
		this.buttonContent = '';
		this.soundName = '';
		this.title = '';
		this.directions = '';
		this.currentTheme
		this.updateData();
		this.doUpdate();                               
		/*if (this.captivate.CPMovieHandle.pauseMovie ) {
			setTimeout("parent.cp.movie.pause(parent.cp.ReasonForPause.INTERACTIVE_ITEM)",100);
		}*/
		//Captivate Event listener
	
		evtHandle.addEventListener(mainCPNamespace.WINDOWRESIZECOMPLETEDEVENT,updateSizeNPositionOnResizeComplete, false );
		evtHandle.addEventListener(mainCPNamespace.ORIENTATIONCHANGECOMPLETEDEVENT,updateSizeNPositionOnResizeComplete, false );
		//}
	},

	updateData: function()
	{
		var id = 0;
		var initresult = jQuery.parseXML( this.xmlStr );
		var initresultDoc = jQuery( initresult );
		var thexml = initresultDoc.find( 'string' ).text(); 
		
		//Few lines of code added to cater to additions made fro theme colors and to retain the old XML structure 
		var tempStringStartLoc = thexml.indexOf("<");
		var tempStringEndLoc = thexml.lastIndexOf(">")+1;
		thexml = thexml.substring(tempStringStartLoc, tempStringEndLoc) 
		
		var result = jQuery.parseXML( thexml );
		var resultDoc = jQuery( result );
		//alert(jQuery.isXMLDoc(resultDoc));
		
		var theButtons = resultDoc.find( 'buttons' ); 
		var theTextProps = resultDoc.find( 'textProperties' );
		var theContentProps = resultDoc.find( 'buttonContent' );
		var theButtonProps = resultDoc.find( 'buttonLabel' );
		var theHeaderProps = resultDoc.find( 'headerTitle' );
		var theInstProps = resultDoc.find( 'headerInst' );
		currentTheme = theTextProps.children('general').attr("themeNum");
		
		var getscalefont = initresultDoc.find('#scaleFonts');
        if (getscalefont){
            if (getscalefont.find('string')){
                scalefont = getscalefont.find('string').text();
            }
        }
		
		//setup styles
		contentStyles.color = theContentProps.children('color').attr("textColor");
		contentStyles.face = theContentProps.children('font').attr("face");
		contentStyles.italic = theContentProps.children('textDecoration').attr("italic");
		contentStyles.bold = theContentProps.children('textDecoration').attr("bold");
		contentStyles.size = theContentProps.children('font').attr("size");
		contentStyles.align = theContentProps.children('font').attr("align");
		
		buttonStyles.color = theButtonProps.children('color').attr("textColor");
		buttonStyles.textOver = theButtonProps.children('color').attr("textOver");
		buttonStyles.textDown = theButtonProps.children('color').attr("textDown")
		buttonStyles.face = theButtonProps.children('font').attr("face");
		buttonStyles.italic = theButtonProps.children('textDecoration').attr("italic");
		buttonStyles.bold = theButtonProps.children('textDecoration').attr("bold");
		buttonStyles.size = theButtonProps.children('font').attr("size");
		buttonStyles.align = theButtonProps.children('font').attr("align");		
		
		headerStyles.color = theHeaderProps.children('color').attr("textColor");
		headerStyles.face = theHeaderProps.children('font').attr("face");
		headerStyles.italic = theHeaderProps.children('textDecoration').attr("italic");
		headerStyles.bold = theHeaderProps.children('textDecoration').attr("bold");
		headerStyles.size = theHeaderProps.children('font').attr("size");
		headerStyles.align = theHeaderProps.children('font').attr("align");		
		
		instStyles.color = theInstProps.children('color').attr("textColor");
		instStyles.face = theInstProps.children('font').attr("face");
		instStyles.italic = theInstProps.children('textDecoration').attr("italic");
		instStyles.bold = theInstProps.children('textDecoration').attr("bold");
		instStyles.size = theInstProps.children('font').attr("size");
		instStyles.align = theInstProps.children('font').attr("align");				

		generalStyles.headerActive = theTextProps.children('general').attr("headerActive");
		//generalStyles.arrowColor = theTextProps.children('general').attr("arrowColor");
		//generalStyles.lineColor = theTextProps.children('general').attr("lineColor");
		generalStyles.headerColor = theTextProps.children('general').attr("headerColor");
		generalStyles.contentBodyColor = theTextProps.children('general').attr("contentBodyColor");
		generalStyles.bodyColor = theTextProps.children('general').attr("bodyColor");
		generalStyles.btnColorUp = theTextProps.children('general').attr("btnColorUp");
		generalStyles.btnColorOver = theTextProps.children('general').attr("btnColorOver");
		generalStyles.btnColorDown = theTextProps.children('general').attr("btnColorDown");
		
		
		contentStylessize = contentStyles.size;
		buttonStylessize = buttonStyles.size;
		headerStylessize = headerStyles.size;
		instStylessize = instStyles.size;
		
		
		//DIYeLearning&gt;&lt;textProperties&gt;&lt;general themeNum=&quot;1&q
		
		var that = this;
		//loop through each button node
		theButtons.children('button').each(function(index) {
			textArray.push( cleanIt(jQuery( this ).children('text').text()) );	
			buttonArray.push( cleanIt(jQuery( this ).children('buttonContent').text()) );	
			imageIDArray.push(that.grabAssetId(jQuery( this ).children('image')));	//grab image id
			soundIDArray.push(that.grabAssetId(jQuery( this ).children('sound')));	//grab sound id	
			picAlignArray.push(jQuery( this ).children('buttonContent').attr("picAlign"));			
		});
		
		//access other items on the stage
		this.title = resultDoc.find( 'general' ).attr("titleText");
		this.instructions = resultDoc.find( 'general' ).attr("instructionsText");
		
		
		///access audio and images
		
		for (num=0; num < imageIDArray.length; num++) {
			//first check images
			id = imageIDArray[num];	
			if (id != -1) { 
				imageArray[num] = this.movieProps.ExternalResourceLoader.getResourcePath( id )
				imageArray[num] = imageArray[num].replace("index.html", "");
			} else {
				imageArray[num] = -1;
			}
			//then check sound
			id = soundIDArray[num];	
			if (id != -1) { 
				soundArray[num] = this.movieProps.ExternalResourceLoader.getResourcePath( id )
		   		soundArray[num] = soundArray[num].replace("index.html", "");
			} else {
				soundArray[num] = -1;
			}
			
		}
	},
	
	grabAssetId: function(jqueryXMLNode)
	{
		var id = jqueryXMLNode.attr("id");
		if(id == -1)
			return -1;
		var nodeValue = jqueryXMLNode.text();	
		if(nodeValue == "")
			return parseInt(id);				//For captivate
		return nodeValue;						//For presenter
	},	
	
	doUpdate: function() 
	{
		//init the default html values
		//var divHtmlHeader = "<div class='header'><a>aaaa this button to see the response in the drop down box.</a></div>";
		//var divHtmlContent = "<div class='content'>aaaa job! That was easy, wasn't it?</div>";
		
		myWidgetiFrame = getWidgetIFrame();
		myWidgetiFrameLeft = parseInt(String($($(myWidgetiFrame).parent().parent()).css("left")).replace("px",""));
		myWidgetiFrameTop = parseInt(String($($(myWidgetiFrame).parent().parent()).css("top")).replace("px",""));
		//$(myWidgetiFrame).hide();
		
		var tabHtmlHeader = "<li style='width: percent;'><a href='#placeholder'>Button Label JQuery</a></li>";
		var tabHtmlContent = "<div id='placeholder' class='tab_content' style='display: block;'><p>Testing JQuery</p></div>";

		//init the other elements on the page		
		var elem = document.getElementById('intTitle');
		elem.tabIndex='1000'
		elem.innerHTML = this.title;
		elem = document.getElementById('intInstructions');
		elem.tabIndex='1001'
		elem.innerHTML = this.instructions;
				
				
				
		var button_elem;
		var tabindex = 5000;
		var body;
		var tabCount = textArray.length;
		var header
		//600, 14, 4
		var tabWidthPercentage
		if (tabCount == 2) {
			tabWidthPercentage = 560 / tabCount;
		} else if (tabCount == 3) {
			tabWidthPercentage = 530 / tabCount;
		} else if (tabCount == 4) {
			tabWidthPercentage = 510 / tabCount;
		}
		if (currentTheme == 3) { tabWidthPercentage = 100 } 
		//(1 / tabCount * 100) - 2;
		if (currentTheme == 2) { tabWidthPercentage -= 5 } 
		//alert(tabWidthPercentage);
		circleOriginX = 250;
   	 	circleOriginY = 150;
   	 	radius = 100;
		
	//var anglessArray=[205, -75, 10, 110, 0];
	var anglessArray=[];
	//var topArray=[80, -10, 100, 210, 0];
	//var leftArray=[5, 140, 230, 105, 0];
//	var topArray=[140, 50, 10, 90, 160, 210];
//	var leftArray=[-10, 30, 175, 230, 175, 110];
	
	//5  230
	//210 -10
	//var topArray=[115, 115, 115, 115, 115, 115];
	//var leftArray=[96, 96, 96, 96, 96, 96];
		var topArray=[];
		var leftArray=[];
		var aTopArray=[];
		var aLeftArray=[];
		
		anglesArray=[];//0, 270, 180, 90];
		_total=textArray.length;
		
		var divider = 360 / _total
		var centerX = 96;
		var centerY = 115;
		var arrowX = 24;
		var arrowY = -10;
		var rad = 120;
		for (num = 0; num < textArray.length; num++) { 
			anglesArray.push(num*divider);
			anglessArray.push(num*divider+divider*9/12);
			topArray.push(centerY+Math.sin(divider*num*Math.PI/180)*rad);
			leftArray.push(centerX+Math.cos(divider*num*Math.PI/180)*rad);
			aTopArray.push(centerY+arrowY+Math.sin((divider*num+divider*8/12)*Math.PI/180)*rad);
			aLeftArray.push(centerX+arrowX+Math.cos((divider*num+divider*8/12)*Math.PI/180)*rad);
			//if (_total == 6) { anglesArray=[0, 270, 180, 90];  }
		}
		
		
		var btnEl = "";
		jQuery.each(textArray, function(index, value) {

				button_elem = document.getElementById('arrows');
		  			button_elem.innerHTML += "<div class='arrow' style='-ms-transform: rotate(" + anglessArray[index] + "deg);-webkit-transform: rotate(" + anglessArray[index] + "deg);-moz-transform: rotate(" + anglessArray[index] + "deg);height:70px; width:30px;position:absolute;top:" + (aTopArray[index]) + "px;left:" + (aLeftArray[index]) + "px;' id='arrow" + (index+1) + "'>&nbsp;</div>"
					
					btnEl += "<div class='btn" + (index+1) + " btn' data-id='" + (index+1)  + "' style='position:absolute; top:" + topArray[index]  + "px;left:" +leftArray[index] + "px;' tabindex='"+tabindex+"'><p>" + textArray[index] + "</p></div>"
				
			button_elem = document.getElementById('textBox');
		
			//check if image exists
			if (imageArray[index] == "-1") { 
				button_elem.innerHTML += "<div id='tab" + index + "' class='tab_content' tabindex='"+(tabindex+1)+"'><p>" + buttonArray[index] + "</p></div>";				
		   } else {  
				button_elem.innerHTML += "<div id='tab" + index + "' class='tab_content' style='height: 100px; display: none;' tabindex='"+(tabindex+1)+"'><p><img width='150' align='right' height='100' src='" + imageArray[index] + "'/>" + buttonArray[index] + "</div> ";
			
		   }
		   tabindex = tabindex + 3;
 		 });	

			button_elem = document.getElementById('circleHolder');
		    button_elem.innerHTML = btnEl +  button_elem.innerHTML
				
				

		//alert(anglesArray);
		changeTheme("themes/processcircleTheme" + currentTheme + ".css", "themes/headerTheme" + currentTheme + ".css" );
		setupCustomStyles();
		setupStyle("#intTitle", headerStyles)
		setupStyle("#intInstructions", instStyles)
		setupStyle(".tab_content", contentStyles)
		setupStyle(".btn p", buttonStyles)
		firstLoad = true;
		resizeInteraction(width,height);
		
		drawCircle();
		setTimeout(function(){
			firstLoad = false;
			resizeInteraction(width,height);
		},100);	
		
		
	}	
};

processcircle_use = function (){
	return processcircleUse1;
}
		
function updateSizeNPositionOnResizeComplete(){
	firstLoad = false;
	resizeInteraction(width,height);
}

