

var oldSource = new Array(); /* Has no error messages */
var finalSource = new Array();

// JSONObject to contain all file errors.
var allFileErrorLocations = new Array();

/*
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
	//console.log("this is the oldSource "+oldSource);
	//console.log("this is the oldSourceSubCode "+oldSourceSubCode);
	
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
	finalSourcePre = "<pre name='code' class='html:twilight sourceCodeContainer prettyprint linenums' id='"+filename+"_Pre'>"+finalSourceSubCode.join("")+"</pre>";
	$('#pageSource').append(finalSourcePre);
	//$("#"+filename+".Pre").html(finalSourceSubCode);
	////console.log($("#"+filename+".Pre").html());
	////console.log("final source is " + finalSourceSubCode);
	prettyPrint();
	// DELETE NOT WORKING $$('pre').light({ altLines: 'hover' });
	// broken $("pre.htmlCode").snippet("html");
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
	//console.log("page source updated");
}



/* Adds the error icon that is displayed on the source code page. */
function addErrorIcon(filename) {
	////console.log("running");
	$("#"+filename+"_Pre").children(".linenums").children("li").children(".errorSourceWrapper").each(function () {
		//console.log($(this)+" creating error icon for this.");
		// OLD WORKING ONE: $(this).children(".errorContainer").after("<div class='nocode testError'></div>");
		stringOfErrors = $(this).attr("data-errortypes");
		arrayOfErrors = stringOfErrors.split(' ');
		//console.log("Here are the error types: "+stringOfErrors);
		
		errorIcon = "<div class='errorIcon'>";
		
		for(var i = 0; i < arrayOfErrors.length; i++) {
			errorIcon += "<div class='"+arrayOfErrors[i]+"' style='height: "+1 / arrayOfErrors.length * 100+"%;'></div>";
		}
		
		errorIcon += "</div>";
		
		$(this).children(".errorContainer").after(errorIcon);
	});
}

/*
 * Iterates through the list of errors and then creates surrounding html elements which
 * highlight the error and allow the user to hover over them.
 * Uses the line number from the error message to highlight the error.
 * Returns the source code with the inserted errors.
 *
 * @param	source	An array containing the HTML source code.
 * @return	source	The same HTML source array but with all of the errors inserted.
 */
function generateErrors(source, filename, fileNumber, oldPassedSource) {
	//console.log("begin finding errors: " + jsonObject[fileNumber].errors.count);
	
	
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
		//console.log("Trying to run escapeHTML on "+jsonObject[fileNumber].errors[i]+" excerpt of: "+jsonObject[fileNumber].errors[i].errorExcerpt+" the error message is "+jsonObject[fileNumber].errors[i].message+" and the line number is "+jsonObject[fileNumber].errors[i].line);
		if(!jsonObject[fileNumber].errors[i].errorExcerpt) {
			console.log("THIS IS BAD. THERE IS NO ERROR EXCERPT FOR "+jsonObject[fileNumber].errors[i].message+" ON LINE "+jsonObject[fileNumber].errors[i].line);
			jsonObject[fileNumber].errors[i].errorExcerpt = "";
		}
		//console.log("The new excerpt is "+jsonObject[fileNumber].errors[i].errorExcerpt);
		var thisErrorExcerpt = escapeHTML(jsonObject[fileNumber].errors[i].errorExcerpt);
		var thisErrorOccurrence = jsonObject[fileNumber].errors[i].occ;
		
		
		/*
		 *	sourceLine = oldSourceLine . replace . excerpt with <span>excerpt</span>
		 */
		 
		var spanWrap = "<span data-errorIndex="+i+" data-fileNumber='"+fileNumber+"' data-fileowner='"+filename+"' data-errorId='"+actualLineNumber+"' data-errorType='"+jsonObject[fileNumber].errors[i].type+"' class='errorContainer "+jsonObject[fileNumber].errors[i].type+" errorHighlight "+jsonObject[fileNumber].errors[i].type+"Error'>";
		spanWrap += thisErrorExcerpt;
		spanWrap += "</span>";
		
		// errorsEachLine[j][1][q].col
		// get the end column number
		var endColumn = jsonObject[fileNumber].errors[i].col;
		var beginningColumn = endColumn - thisErrorExcerpt.length;
		
		// IMPORTANT FUNCTION set the source with the span wrapped around the error
		source[lineNumber] = replaceByOccurrence(source[lineNumber], thisErrorExcerpt, spanWrap, thisErrorOccurrence);
		
		
		
		//console.log("is there an error at "+lineNumber+"?" + jsonObject[fileNumber].errors[i].line + jsonObject[fileNumber].errors[i].message);
		//source[lineNumber] = "<span data-errorIndex="+i+" data-fileNumber='"+fileNumber+"' data-fileowner='"+filename+"' data-errorId='"+actualLineNumber+"' class='errorContainer "+jsonObject[fileNumber].errors[i].type+" errorHighlight "+jsonObject[fileNumber].errors[i].type+"Error'>"+source[lineNumber]+"</span>"
		
		
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
			////console.log("IMPORTANT ALREADY ADDED AT: "+getPosition(errorLineNumbers, lineNumber));
			if (!contains(errorLineNumbers[getPosition(errorLineNumbers, lineNumber)][1], jsonObject[fileNumber].errors[i].type)) {
				errorLineNumbers[getPosition(errorLineNumbers, lineNumber)][1].push(jsonObject[fileNumber].errors[i].type);
			}
		}
		
		/*
		 *	Similar to the above if statements. This is to store multiple errors per line (rather than just their type).
		 */
		if(!containsLine(errorsEachLine, lineNumber)) {
			console.log("There is no error at this line yet");
			errorByLine.push(lineNumber);
			errorByLine.push(errorByLineCollection);
			errorsEachLine.push(errorByLine);
			
		}
		
		/*
		 *	If it is already in the array, add this error into the array index that already exists for this line number.
		 */
		else {
			//console.log("there already exists errors at: "+getPosition(errorsEachLine, lineNumber));
			errorsEachLine[getPosition(errorsEachLine, lineNumber)][1].push(jsonObject[fileNumber].errors[i]);
		}
		
	}
	
	// store the errorsEachLine array in a public / global array for the sake of multiple files
	allFileErrorLocations.push(errorsEachLine);
	
	//console.log("Begin wrapping errors!");
	/* Loop through errorLineNumbers and wrap each line
	 *	IMPORTANT: This must come after the errorsEachLine loop!
	 */
	for(var j = 0; j < errorLineNumbers.length; j++) {
		source[errorLineNumbers[j][0]] = "<div class='errorSourceWrapper' data-fileNumber='"+fileNumber+"' data-errortypes='"+generateClasses(errorLineNumbers[j][1])+"'>"+source[errorLineNumbers[j][0]]+"</div>";
	}
	//console.log("finish finding errors and they take place on these lines: "+errorLineNumbers);
	return source;
}


function replaceByOccurrence(htmlString, htmlExcerpt, htmlReplace, htmlOccurrence) {
	console.log("@LOOKING FOR excerpt of "+htmlExcerpt+" and it's the "+htmlOccurrence+" occurrence.");
	
	/* Check to see if the excerpt is < > / or span, return the default string if so, as this would stuff up the highlight spans.*/
	if(htmlReplace == "<" || htmlReplace == ">" || htmlReplace == "/" || htmlReplace == "span" || htmlReplace == "<span" || htmlReplace == "/span" || htmlReplace == "</span>") {
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
		console.log("REPLACED@ on occurrence number "+nth+" and changed to "+htmlString); // "HELMO, WORLD!";
		return htmlString;
	}
	else {
		return htmlString;
	}

}




/* Function to work out which index to replace
	returns number
 */
function getIndexByColumn(htmlString, htmlExcerpt, htmlColumn) {
	indexReplace = 0;
	/*
	var index = 0;
	var count = 0;
	var occurrenceArray = new Array();
	while (index != -1) {
		 if (count == 0) {
			  index = htmlString.indexOf(htmlExcerpt, index);
		 } else {
			  occurrenceArray[count] = index;
			  index = htmlString.indexOf(htmlExcerpt, index+1);
		 }
		 count += 1;
	}
	
	for(var j = 0; j < occurrenceArray.length; j++) {
		if(occurrenceArray[j] == htmlColumn) {
			alert("woah the columns match up with the "+j+" element");
			indexReplace = j;		
		}
	}
	
	console.log(occurrenceArray);
	
	*/
	
	/*
	*/
	var indices = [];
	
	var re = new RegExp(htmlExcerpt,'gi');
	var regex = re, result, indices = [];
	while ( (result = regex.exec(htmlString)) ) {
		indices.push(result.index);
	}
	
	for(var j = 0; j < indices.length; j++) {
		if(indices[j] == htmlColumn) {
			alert("woah the columns match up at"+j);
			indexReplace = j;		
		}
	}
	console.log(indices);
	
	
	
	// loop through each occurrence of htmlExcerpt in htmlString
	
	// if htmlColumn == the found occurrence
	
	// set indexReplace to the iteration
	
	//return indexReplace;
}




/*
 *	Convert an array into a single line string with spaces.
 */
function generateClasses(classArray) {
	//console.log("Array contains: "+classArray);
	classString = "";
	for(var i = 0; i < classArray.length; i++) {
		//console.log("Item is: "+classArray[i]);
		classString += classArray[i];
		// if this isn't the last value add a space
		if(i + 1 != classArray.length) {
			classString += " ";
		}
	}
	//console.log("Final string: "+classString);
	return classString
}

/*
 *	IMPORTANT: THIS CHECKS INDEX[0] AND IS USED SPECIFICALLY FOR LINE NUMBER
 *	Check to see if an array's item's first value contains value obj.
 *	Return false if it does not contain the obj.
 *	Return true if it does.
 */
function containsLine(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i][0] === obj) {
            return true;
        }
    }
    return false;
}

/*
 *	Check to see if an array contains value obj.
 *	Return false if it does not contain the obj.
 *	Return true if it does.
 */
function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

/*
 *	Check to see if an array contains value obj.
 *	Return false if it does not contain the obj.
 *	Return true if it does.
 */
function getPosition(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i][0] === obj) {
            return i;
        }
    }
    return false;
}

/*  
	Receive source code
	Iterate through each error.
	Highlight where the error takes place.
*/

function openSourceFile(filename) {
	console.log("opening page source");
	$('#sourceLink').click();
	$('.sourceCodeContainer').not('#'+filename).hide();
	$('#'+filename).show();
	setScrollWidth(filename);
	//console.log('#'+filename + " should be shown");
	// when there are multiple files, there should be multiple page sources generated
	// so this should hide all of them and then show the one with the correct id
}

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
 * Returns the error message to be displayed when the user hovers over the error.
 *
 * @param  errorId  the id of the error
 * @return qtip error message
 */
function getContent(error, filenumber) {
	linePos = error.attr('data-errorId');
	errorIndex = error.attr('data-errorIndex');
	//console.log("IMPORTANT!: THE ERROR SHOULD BE: "+jsonObject[filenumber].errors[errorIndex].message);
	return "<div class='leftMessage "+jsonObject[filenumber].errors[errorIndex].type+"'><p class='errorMessage'><span class='"+jsonObject[filenumber].errors[errorIndex].type+"'>"+returnErrorType(filenumber, errorIndex)+"</span></p><p class='errorLine errorMessage'>Line "+linePos+"</p></div><div class='rightMessage'><p class='errorMessage'>"+escapeHTML(jsonObject[filenumber].errors[errorIndex].message)+"</p></div>";
	
	/*
	return "<p class='errorMessage'><span class='syntaxError'>Syntax Error</span>Not in database</p><p class='errorLine errorMessage'>Line "+linePos+"</p>";
	*/
}

/*
 *	This function has been created because the error types "warning" and "broken" shouldn't be displayed as actual text.
 *	So although it's not entirely necessary for syntax, semantic and deprecated, this function will be used to return the error type.
 */
function returnErrorType(filenumber, errorNumber) {
	var errorType = "";
	if(jsonObject[filenumber].errors[errorNumber].type == "warning") {
		errorType = "Best Practice";
		//console.log("best practice yo!");
	}
	else if(jsonObject[filenumber].errors[errorNumber].type == "broken") {
		errorType = "Broken Link";
	}
	else {
		//console.log("it wasn't a best practice or broken link it was a: "+jsonObject[filenumber].errors[errorNumber].type);
		errorType = jsonObject[filenumber].errors[errorNumber].type;
	}
	//console.log("returning error type: "+errorType);
	return errorType;
}

/*
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
	
	// iterate through each error in allFileErrorLocations[0][0][1]
	// add to html
	// increment count
	
	/*
	lineContainer.children(".errorContainer").each(function() {
		var errorType = $(this).attr("data-errorType");
		var errorIndex = $(this).attr("data-errorIndex");
		var fileNumber = $(this).attr("data-fileNumber");
		
		var errorMessage = "<p>"+escapeHTML(jsonObject[fileNumber].errors[errorIndex].message)+"</p>";
		
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
		errorMessageDiv.find("."+errorType+".errorTipCategory").append(errorMessage);
	});
	*/
	
	
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