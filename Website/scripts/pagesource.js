

var oldSource = new Array(); /* Has no error messages */
var finalSource = new Array();

// JSONObject to contain all file errors.
var allFileErrorLocations = new Array();

/**
 * Iterates through the source code, escapes certain HTML characters.
 * Populates the page source tab with the converted source code.
 * Runs the js plugin prettyPrint which adds styling and numbering to the code.
 * Calls addErrorIcon funcntion which creates errorIcons beside each error.
 *
 * @param	source	An array containing the source code.
 */
function setPageSource(source, filename, fileNumber) {
	// will contain the source code (oldSourceSubCode) and will be added to oldSource
	var oldSourceSub = new Array();
	var oldSourceSubCode = new Array();
	// will contain the source code (finalSourceSubCode) and will be added to finalSource
	var finalSourceSub = new Array();
	var finalSourceSubCode = new Array();
	
	for(var i = 0; i < source.length; i++) {
		var htmlElements = [["<","&lt;"],[">","&gt;"],["\"","&quot;"],["\'","&#39;"]];
		for(var j=0; j<htmlElements.length; j++) {
			reg = new RegExp(htmlElements[j][0], "gi");
			source[i] = source[i].replace(reg,htmlElements[j][1]);
		}
		oldSourceSubCode[i] = source[i];
		oldSourceSubCode[i] += "\n";
		finalSourceSubCode[i] = source[i];
		finalSourceSubCode[i] += "\n";
		////console.log("source is "+finalSourceSubCode[i]);
	}
	finalSourceSubCode = generateErrors(finalSourceSubCode, filename, fileNumber, oldSourceSubCode);
	testSource = ["line 1","line 2","line 3"];
	// remove '.' '/' and '~' from filename replace with '_'
	filename = filename.replace(/\./g,"_");
	filename = filename.replace(/\//g,"_");
	filename = filename.replace(/~/g,"_");
	finalSourcePre = "<pre name='code' class='html:twilight sourceCodeContainer prettyprint linenums' id='"+filename+"_Pre'>"+
			finalSourceSubCode.join("")+"</pre>";
	
	$('#pageSource').append(finalSourcePre);	
	prettyPrint();
	addErrorIcon(filename);
	
	//oldSourceSub add filename and oldSourceSubCode;
	oldSourceSub.push(filename);
	oldSourceSub.push(oldSourceSubCode);
	//finalSourceSub add filename and finalSourceSubCode;
	finalSourceSub.push(filename);
	finalSourceSub.push(finalSourceSubCode);
	
	// PUSHES THESE INTO THE GLOBAL ARRAYS
	oldSource.push(oldSourceSub);
	finalSource.push(finalSourceSub);
	
	// WIPE ARRAYS
	oldSourceSub = [];
	oldSourceSubCode = [];
	finalSourceSub = [];
	finalSourceSubCode = [];
}



/* Adds the error icon that is displayed on the source code page. */
function addErrorIcon(filename) {
	$("#"+filename+"_Pre").children(".linenums").children("li").children(".errorSourceWrapper").each(function () {
		stringOfErrors = $(this).attr("data-errortypes");
		arrayOfErrors = stringOfErrors.split(' ');
		errorIcon = "<div class='errorIcon'>";
		
		for(var i = 0; i < arrayOfErrors.length; i++) {
			errorIcon += "<div class='"+arrayOfErrors[i]+"' style='height: "+1 / arrayOfErrors.length * 100+"%;'></div>";
		}
		
		errorIcon += "</div>";
		$(this).children(".errorContainer").after(errorIcon);
	});
}

/**
 * Iterates through the list of errors and then creates surrounding html elements which
 * highlight the error and allow the user to hover over them.
 * Uses the line number from the error message to highlight the error.
 * Returns the source code with the inserted errors.
 *
 * @param	source	An array containing the HTML source code.
 * @return	source	The same HTML source array but with all of the errors inserted.
 */
function generateErrors(source, filename, fileNumber, oldPassedSource) {
	var errorLineNumbers = new Array();
	// This array will store the errors per line
	// FOR MULTI-ERRORS GENERATION
	var errorsEachLine = new Array();
	
	
	for(var i = 0; i < jsonObject[fileNumber].errors.count; i++) {
		
		var lineAndErrorTypes = new Array();
		
		// This array will store the line number and error
		var errorByLine = new Array();
		var errorByLineCollection = new Array();
		jsonObject[fileNumber].errors[i].errorIndex = i;
		errorByLineCollection.push(jsonObject[fileNumber].errors[i]);
	
		var errorTypes = new Array();
		
		errorTypes.push(jsonObject[fileNumber].errors[i].type);
	
		lineNumber = jsonObject[fileNumber].errors[i].line - 1;
		var actualLineNumber = jsonObject[fileNumber].errors[i].line;
		if(!jsonObject[fileNumber].errors[i].errorExcerpt) {
			jsonObject[fileNumber].errors[i].errorExcerpt = "";
		}
		var thisErrorExcerpt = escapeHTML(jsonObject[fileNumber].errors[i].errorExcerpt);
		var thisErrorOccurrence = jsonObject[fileNumber].errors[i].occ;
		
		// create the span to be wrapped around the error excerpt
		var spanWrap = "<span data-errorIndex="+i+" data-fileNumber='"+fileNumber+"' data-fileowner='"+filename+"' data-errorId='"+
				actualLineNumber+"' data-errorType='"+jsonObject[fileNumber].errors[i].type+"' class='errorContainer "+
				jsonObject[fileNumber].errors[i].type+" errorHighlight "+jsonObject[fileNumber].errors[i].type+"Error'>";
		spanWrap += thisErrorExcerpt;
		spanWrap += "</span>";
		
		// IMPORTANT FUNCTION call replaceByOccurrence to wrap the original error excerpt in a span
		source[lineNumber] = replaceByOccurrence(source[lineNumber], thisErrorExcerpt, spanWrap, thisErrorOccurrence);
		
		/*
		 *	Check to see if there's already an error on this line in the errorLineNumbers array.
		 *	This array is used to create a single wrapper on each line where errors occur.
		 */
		if(!containsLine(errorLineNumbers, lineNumber)) {
			lineAndErrorTypes.push(lineNumber);
			lineAndErrorTypes.push(errorTypes);
			errorLineNumbers.push(lineAndErrorTypes);
		}
		
		/*
		 *	If it is already in the array, add this error into the array index that already exists for this line number.
		 */
		else {
			if (!contains(errorLineNumbers[getPosition(errorLineNumbers, lineNumber)][1], jsonObject[fileNumber].errors[i].type)) {
				errorLineNumbers[getPosition(errorLineNumbers, lineNumber)][1].push(jsonObject[fileNumber].errors[i].type);
			}
		}
		
		/*
		 *	Similar to the above if statements. This is to store multiple errors per line (rather than just their type).
		 */
		if(!containsLine(errorsEachLine, lineNumber)) {
			errorByLine.push(lineNumber);
			errorByLine.push(errorByLineCollection);
			errorsEachLine.push(errorByLine);
		}
		
		/*
		 *	If it is already in the array, add this error into the array index that already exists for this line number.
		 */
		else {
			errorsEachLine[getPosition(errorsEachLine, lineNumber)][1].push(jsonObject[fileNumber].errors[i]);
		}
		
	}
	
	// store the errorsEachLine array in a public / global array for the sake of multiple files
	allFileErrorLocations.push(errorsEachLine);
	
	/* Loop through errorLineNumbers and wrap each line
	 *	IMPORTANT: This must come after the errorsEachLine loop!
	 */
	for(var j = 0; j < errorLineNumbers.length; j++) {
		source[errorLineNumbers[j][0]] = "<div class='errorSourceWrapper' data-fileNumber='"+fileNumber+"' data-errortypes='"+
				generateClasses(errorLineNumbers[j][1])+"'>"+source[errorLineNumbers[j][0]]+"</div>";
	}
	
	return source;
}

/**
 *	
 *	Function to wrap the errors found in the source code with a span.
 *	
 *	@param		htmlString			String		The original line from the source code
 *	@param		htmlExcerpt			String		The excerpt where the error takes place
 *	@param		htmlReplace			String		The original line from the source code
 *	@param		htmlOccurrence		Integer		What occurrence the error excerpt is, is it the first id or the second id in the line?
 *												-1 if there is no error excerpt / no occurrence number
 *	
 *	@return		htmlString			String		Return the new line to be placed back into the source code
 *
 */
function replaceByOccurrence(htmlString, htmlExcerpt, htmlReplace, htmlOccurrence) {
	
	/* Check to see if the excerpt is < > / or span, return the default string if so, as this would stuff up the highlight spans.*/
	if(htmlReplace == "<" || htmlReplace == ">" || htmlReplace == "/" || htmlReplace == "span" || htmlReplace == "<span" || 
			htmlReplace == "/span" || htmlReplace == "</span>") {
		return htmlString;
	}
	
	else if(htmlOccurrence != -1) {
		var nth = 0;
		var regex = new RegExp(htmlExcerpt, "g");
		htmlString = htmlString.replace(regex, function (match, i, original) {
			nth++;
			console.log("match found this is the "+nth+" occurrence.");
			return (nth === htmlOccurrence) ? htmlReplace : match;
		});
		console.log("REPLACED@ on occurrence number "+nth+" and changed to "+htmlString);
		return htmlString;
	}
	else {
		return htmlString;
	}

}

/**
 *	
 *	Convert an array into a single line string with spaces.
 *	
 *	@param		classArray			Array		An array containing the error classes	
 *	
 *	@return		classString			String		A string containing the classes with spaces separating them.		
 *	
 */
function generateClasses(classArray) {
	classString = "";
	for(var i = 0; i < classArray.length; i++) {
		classString += classArray[i];
		// if this isn't the last value add a space
		if(i + 1 != classArray.length) {
			classString += " ";
		}
	}
	return classString
}

/**
 *	
 *	IMPORTANT: THIS CHECKS INDEX[0] AND IS USED SPECIFICALLY FOR LINE NUMBER
 *	Check to see if an array's item's first value contains value obj.
 *	
 *	@param		containerArray		Array		An array to check and see if it contains obj
 *	@param		obj					Variable	A string or integer to be compared against containerArray
 *	
 *	@return		true				boolean		If containerArray does contain the obj.
 *	@return		false				boolean		If containerArray does not contain the obj.
 *	
 */
function containsLine(containerArray, obj) {
    for (var i = 0; i < containerArray.length; i++) {
        if (containerArray[i][0] === obj) {
            return true;
        }
    }
    return false;
}

/**
 *	
 *	Check to see if an array contains value obj.
 *	
 *	@param		containerArray		Array		An array to check and see if it contains obj
 *	@param		obj					Variable	A string or integer to be compared against containerArray
 *	
 *	@return		true				boolean		If containerArray does contain the obj.
 *	@return		false				boolean		If containerArray does not contain the obj.
 *	
 */
function contains(containerArray, obj) {
    for (var i = 0; i < containerArray.length; i++) {
        if (containerArray[i] === obj) {
            return true;
        }
    }
    return false;
}

 /**
 *	
 *	Check to see if an array contains value obj.
 *	
 *	@param		containerArray		Array		An array to check and see if it contains obj
 *	@param		obj					Variable	A string or integer to be compared against containerArray
 *	
 *	@return		i					Integer		The index of obj in relation to array containerArray
 *	@return		false				boolean		If containerArray does not contain the obj.
 *	
 */
function getPosition(containerArray, obj) {
    for (var i = 0; i < containerArray.length; i++) {
        if (containerArray[i][0] === obj) {
            return i;
        }
    }
    return false;
}

 /**
 *	
 *	Hide all source codes except for the supplied one.
 *	Scroll to the supplied source code.
 *	Call setScrollWidth to create the appropriate scroll bar.
 *	
 *	@param		filename			String		An id referring to which source code should be displayed
 *	
 */
function openSourceFile(filename) {
	console.log("opening page source");
	$('#sourceLink').click();
	$('.sourceCodeContainer').not('#'+filename).hide();
	$('#'+filename).show();
	setScrollWidth(filename);
}

 /**
 *	
 *	Hide all source codes except for the supplied one.
 *	Call setScrollWidth to create the appropriate scroll bar.
 *	
 *	@param		filename			String		An id referring to which source code should be displayed
 *	
 */
function revealPageSource(filename) {
	console.log("revealing page source");
	filename = filename.replace(/\./g,"_");
	filename = filename.replace(/\//g,"_");
	filename = filename.replace(/~/g,"_");
	$('.sourceCodeContainer').not('#'+filename+"_Pre").hide();
	$('#'+filename+"_Pre").show();
	setScrollWidth(filename+"_Pre");
}

/**
 *	Returns the error message to be displayed when the user hovers over the error.
 *
 * 	@param  errorId  the id of the error
 *
 *	@return qtip error message
 *
 */
function getContent(error, filenumber) {
	linePos = error.attr('data-errorId');
	errorIndex = error.attr('data-errorIndex');
	
	return "<div class='leftMessage "+jsonObject[filenumber].errors[errorIndex].type+"'><p class='errorMessage'><span class='"+
			jsonObject[filenumber].errors[errorIndex].type+"'>"+returnErrorType(filenumber, errorIndex)+
			"</span></p><p class='errorLine errorMessage'>Line "+linePos+"</p></div><div class='rightMessage'><p class='errorMessage'>"+
			escapeHTML(jsonObject[filenumber].errors[errorIndex].message)+"</p></div>";
}

/**
 *
 * 	This function has been created because the error types "warning" and "broken" shouldn't be displayed as actual text.
 *	So although it's not entirely necessary for syntax, semantic and deprecated, this function will be used to return the error type.
 *
 *	@param		filenumber			Integer		The number pertaining to the relevant file. I.e. 0 for the first file, 1 for the second.
 *	@param		errorNumber			Integer		The number pertaining to the error. 0 for the first error, 1 for the second etc.
 *
 * 	@return 	errorType			String		The type of error.
 *
 */
function returnErrorType(filenumber, errorNumber) {
	var errorType = "";
	if(jsonObject[filenumber].errors[errorNumber].type == "warning") {
		errorType = "Best Practice";
	}
	else if(jsonObject[filenumber].errors[errorNumber].type == "broken") {
		errorType = "Broken Link";
	}
	else {
		errorType = jsonObject[filenumber].errors[errorNumber].type;
	}
	return errorType;
}

/**
 *	Function to generate an overview for the errors contained on the line when hovering over .errorSourceWrapper
 *	Return html to be inserted into the qTip
 */
function errorsOnLine(lineContainer) {
	var errorMessageDiv = $("#errorsOnLine").clone();
	errorMessageDiv.attr("id", "");
	
	var lineNumber = lineContainer.parent("li").index() + 1;
	var fileNumber = lineContainer.attr("data-fileNumber");
	
	var syntaxCount = 0;
	var semanticCount = 0;
	var warningCount = 0;
	var deprecatedCount = 0;
	var brokenCount = 0;
	
	console.log("line hovered is: "+lineNumber);
	
	console.log("test message of first file first line first error: "+allFileErrorLocations[0][0][1][0].message);
	
	for(var i = 0; i < allFileErrorLocations[fileNumber].length; i++) {
		var checkLineNumber = parseInt(allFileErrorLocations[fileNumber][i][0]) + 1;
		console.log("Checking for errors at line "+checkLineNumber);
		if(checkLineNumber == lineNumber) {
			for(var j = 0; j < allFileErrorLocations[fileNumber][i][1].length; j++) {
				var errorType = allFileErrorLocations[fileNumber][i][1][j].type;
				var errorMessage = "<p>"+escapeHTML(allFileErrorLocations[fileNumber][i][1][j].message)+"</p>";
				errorMessageDiv.find("."+errorType+".errorTipCategory").append(errorMessage);
				
				switch (errorType) {
					case "syntax":
						syntaxCount++;
					break;
					case "semantic":
						semanticCount++;
					break;
					case "warning":
						warningCount++;
					break;
					case "deprecated":
						deprecatedCount++;
					break;
					case "broken":
						brokenCount++;
					break;
				}
				
				console.log("Thor will be pleased, a match was found. Error type "+errorType);
				
			}
			break;
		}
	}	
	
	if(syntaxCount == 0) {
		errorMessageDiv.find(".syntax.errorTipCategory").remove();
	}
	if(semanticCount == 0) {
		errorMessageDiv.find(".semantic.errorTipCategory").remove();
	}
	if(warningCount == 0) {
		errorMessageDiv.find(".warning.errorTipCategory").remove();
	}
	if(deprecatedCount == 0) {
		errorMessageDiv.find(".deprecated.errorTipCategory").remove();
	}
	if(brokenCount == 0) {
		errorMessageDiv.find(".broken.errorTipCategory").remove();
	}
	
	return errorMessageDiv;
}


$(document).ready(function() {
		
	/* This is code for the qtip2 plugin. Delegate allows it to work with dynamically generated content
		from http://craigsworks.com/projects/forums/showthread.php?tid=3253 
		http://qtip2.com/options
		When the user hovers over an error in the source code, the qtip plugin is called.
	*/
	 $(document).delegate('.errorContainer', 'mouseover', function(event) {
	 
		var errorClass = $(this).attr('class').split(' ')[1];
		var fileNumber = $(this).attr('data-fileNumber');
	 
		$(this).qtip({
			overwrite: false,
			show: {
				event: event.type,
				ready: true
			},
			position: {
				my: 'bottom left',
				at: 'top left',
				target: $(this)
			},
			style: { classes: 'qTipHighlight ' + errorClass },
			hide: {
				/*event:"false"*/
			}, 
			content: {
				text: getContent($(this), fileNumber)
			}
		});
		
		event.preventDefault();
	});
	
	
	$(document).delegate('.errorContainer', 'click', function(event) {
		var fileowner = $(this).attr('data-fileowner');
		var errorId = $(this).attr('data-errorId');
		openErrorId(fileowner, errorId); // this function is defined in errors.js
		event.preventDefault();
	});
	
	$(document).delegate('.errorSourceWrapper', 'mouseover', function(event) {
		console.log("hover over container");
		
		$(this).qtip({
			overwrite: false,
			show: {
				event: event.type,
				ready: true
			},
			position: {
				my: 'top left',
				at: 'bottom left',
				target: $(this)
			},
			style: { classes: 'qTipHighlight qTipOffsetTop' },
			hide: {
				/*event:"false"*/
			}, 
			content: {
				text: errorsOnLine($(this))
			}
		});
		
		event.preventDefault();
	});
			
});