

var oldSource = new Array(); /* Has no error messages */
var finalSource = new Array();

/*
 * Iterates through the source code, escapes certain HTML characters.
 * Populates the page source tab with the converted source code.
 * Runs the js plugin prettyPrint which adds styling and numbering to the code.
 * Calls addErrorIcon funcntion which creates errorIcons beside each error.
 *
 * @param	source	An array containing the source code.
 */
function setPageSource(source, filename) {
	for(var i = 0; i < source.length; i++) {
		var htmlElements = [["<","&lt;"],[">","&gt;"],["\"","&quot;"],["\'","&#39;"]];
		for(var j=0; j<htmlElements.length; j++) {
			reg = new RegExp(htmlElements[j][0], "gi");
			source[i] = source[i].replace(reg,htmlElements[j][1]);
		}
		oldSource[i] = source[i];
		oldSource[i] += "\n";
		finalSource[i] = source[i];
		finalSource[i] += "\n";
		console.log("source is "+finalSource[i]);
	}
	finalSource = generateErrors(finalSource);
	testSource = ["line 1","line 2","line 3"];
	// remove '.' from filename replace with '_'
	filename = filename.replace(/\./g,"_");
	finalSourcePre = "<pre class='sourceCodeContainer prettyprint linenums' id='"+filename+"_Pre'>"+finalSource.join("")+"</pre>";
	$('#pageSource').append(finalSourcePre);
	//$("#"+filename+".Pre").html(finalSource);
	//console.log($("#"+filename+".Pre").html());
	console.log("final source is " + finalSource);
	prettyPrint();
	addErrorIcon();
	//console.log("page source updated");
}



/* Adds the error icon that is displayed on the source code page. */
function addErrorIcon() {
	//console.log("running");
	$(".prettyprint").children(".linenums").children("li").children(".errorContainer").each(function () {
		console.log($(this));
		$(this).children(".errorHighlight").after("<div class='nocode testError'></div>");
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
function generateErrors(source) {
	console.log("begin finding errors: " + jsonObject[0].errors.count);
	for(var i = 0; i < jsonObject[0].errors.count; i++) {
		lineNumber = jsonObject[0].errors[i].line - 1;
		var actualLineNumber = jsonObject[0].errors[i].line;
		console.log("is there an error at "+lineNumber+"?" + jsonObject[0].errors[i].line + jsonObject[0].errors[i].message);
		source[lineNumber] = "<div id='error1' class='errorContainer syntax'><span id='hoverNumber_"+actualLineNumber+"' class='errorHighlight syntaxError'>"+source[lineNumber]+"</span></div><div style='clear:both'></div>"
	}
	console.log("finish finding errors");
	return source;
}

function openSourceFile(fileName) {
	$('#sourceLink').click();
	$('.sourceCodeContainer').not('#'+fileName).hide();
	$('#'+fileName).show();
	console.log('#'+fileName + " should be shown");
	// when there are multiple files, there should be multiple page sources generated
	// so this should hide all of them and then show the one with the correct id
}



/**
 * Returns the error message to be displayed when the user hovers over the error.
 *
 * @param  errorId  the id of the error
 * @return qtip error message
 */
function getContent(errorId) {
	linePos = $('#'+errorId).parent().index() + 1;
	console.log(linePos + " " + jsonObject[0].errors[0].line);
	for(var i = 0; i < jsonObject[0].errors.count; i++) {
		/* If this is the case, we know what error message to show */
		if(jsonObject[0].errors[i].line == linePos) {
			//alert(errors[i][1]);
			/*
				errors[i][0] - error ID (used in html generation)
				errors[i][1] - error Class (used to specify the type of error)
				errors[i][2] - error Type (text describing the category of error)
				errors[i][3] - error Line (the line the error takes place on)
				errors[i][4] - error Message (the message that appears)
			*/
			return "<p class='errorMessage'><span class='syntaxError'>"+jsonObject[0].errors[i].type+"</span>"+jsonObject[0].errors[i].message+"</p><p class='errorLine errorMessage'>Line "+linePos+"</p>";
		}
	}
	
	return "<p class='errorMessage'><span class='syntaxError'>Syntax Error</span>Not in database</p><p class='errorLine errorMessage'>Line "+linePos+"</p>";
	
}


$(document).ready(function() {
		
	/* This is code for the qtip2 plugin. Delegate allows it to work with dynamically generated content
		from http://craigsworks.com/projects/forums/showthread.php?tid=3253 
		http://qtip2.com/options
		When the user hovers over an error in the source code, the qtip plugin is called.
	*/
	 $(document).delegate('.errorContainer', 'mouseover', function(event) {
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
			style: { classes: 'qTipHighlight' },
			hide: {
				delay: 0//enter in milliseconds
			}, 
			content: {
				text: getContent($(this).attr('id'))
			}
		});
		
		event.preventDefault();
	});
	
	
	$(document).delegate('.errorContainer', 'click', function(event) {
		var errorId = $(this).children('errorHighlight').attr('id');
		errorId.replace('hoverNumber_','');
		openErrorId(errorId); // this function is defined in errors.js
		event.preventDefault();
	});
			
});