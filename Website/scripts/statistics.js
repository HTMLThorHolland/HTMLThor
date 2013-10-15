
/* OLD Statistics that were used for generating bars. 
 * Ignore.
 */
var statistics = [
	{"name":"index.html", "id":"index.html_0", "syntaxErrors":2, "semanticErrors":23, "warningErrors":4, "deprecatedErrors":2},
	{"name":"about.html", "id":"about.html_0", "syntaxErrors":0, "semanticErrors":0, "warningErrors":0, "deprecatedErrors":0},
	{"name":"contact.html", "id":"contact.html_0", "syntaxErrors":2, "semanticErrors":16, "warningErrors":4, "deprecatedErrors":2},
	{"name":"images.html", "id":"images.html_0", "syntaxErrors":0, "semanticErrors":50, "warningErrors":1, "deprecatedErrors":25}
];

var siteTotalSyntax = 0;
var siteTotalSemantic = 0;
var siteTotalWarning = 0;
var siteTotalDeprecated = 0;

/*
 * Function called to generate the statistics. Will in the future iterate through all of 
 * the files sent back. Currently set generate statistics for the first file only.
 * If the file has no errors attached, a pre-written message is displayed.
 */
function populateStatistics() {
	/*for(var i = 0; i < statistics.length; i++) {
		generateFileStatistics(statistics[i]);
	} PRE-CODED STATS*/
	
	overallErrors = 0;
		
	for(var i = 0; i < jsonObject.filecount; i++) {
	
		generateFileStatistics(jsonObject[i], jsonObject[i].errors.count, i);
		overallErrors += jsonObject[i].errors.count;
		console.log(i+" iteration: errors: "+jsonObject[i].errors.count+ " and total errors are: "+overallErrors);
		
	}
	
	if(overallErrors == 0) {
		$('#feedback').html("<p><strong>Congratulations!</strong> Your site rocks!</p>");
		console.log("no errors found, set feedback id");
	}
	if(overallErrors <= 2) {
		$('#feedback').html("<p>We found the needle in the haystack, but what a clean site!</p>");	
	}
	if(overallErrors > 2 && overallErrors <= 4) {
		$('#feedback').html("<p>Near perfect code - just a few errors to deal with.</p>");	
	}
	if(overallErrors > 4 && overallErrors <= 7) {
		$('#feedback').html("<p>Oops! You’ve got a few critters in here you’ll have to clean up!</p>");	
	}
	if(overallErrors > 7 && overallErrors <= 15) {
		$('#feedback').html("<p>Gee, this site needs a clean up - get to work!</p>");	
	}
	if(overallErrors > 15 && overallErrors <= 50) {
		$('#feedback').html("<p>Gosh, your site’s looking downtrodden with errors!</p>");	
	}
	if(overallErrors > 50) {
		$('#feedback').html("<p>Your site is riddled with errors! Grab a coffee and get to work!</p>");	
	}
	
	if(siteTotalDeprecated != 0 && siteTotalWarning == 0 && siteTotalSemantic == 0 && siteTotalSyntax == 0) {
		$('#totalErrors').addClass('deprecated');
	}
	
	if(siteTotalWarning != 0 && siteTotalSemantic == 0 && siteTotalSyntax == 0) {
		$('#totalErrors').addClass('warning');
	}
	
	if(siteTotalSemantic != 0 && siteTotalSyntax == 0) {
		$('#totalErrors').addClass('semantic');
	}
	
	if(siteTotalSyntax != 0) {
		$('#totalErrors').addClass('syntax');
	}
	
	else {
		console.log("should not have reached else for the totalErrors");
	}
	
	// set the heading containing the total errors
	$('#totalErrors').html(overallErrors);
	
	console.log("finished generating statistics with total errors: "+overallErrors);
}

/*
 * Function to determine if the file has errors or not. 
 * Will be updated to check for all files in the future.
 * @returns	true	if the file has no errors
 * @returns	false	if the file has errors
 */
function noFileErrors() {
	if(jsonObject[0].errors.count == 0) {

		return true;
	}
	else {
		return false;
	}
}

/* When the filename is clicked, navigate to page source. */
$(document).delegate('.fileGraph .fileName', 'click', function(event) {
	// need to open to the correct file, through a function
	id = $(this).parent('.fileGraph').attr('id');
	console.log(id+".Pre is the passed id");
	openSourceFile(id+"_Pre"); // in the pagesource.js file
	changeFile(id);
	removeLocation();
	$('#sourceLink').addClass('currentLocation');
});

/* When the the colour bar is clicked, navigate to page source's error section. */
$(document).delegate('.bar .graph', 'click', function(event) {
	graphType = $(this).attr('class').split(' ')[0];
	changeFile($(this).closest('.fileGraph').attr('id'));
	if(graphType != "zero") {
		removeLocation();
		$('#errorsLink').addClass('currentLocation');
		$('html, body').animate({
			scrollTop: $("#errorsList .errorCategory."+graphType).offset().top - 200
		}, 600);
	}
});

/* When the the total file errors is clicked, navigate to page source's error section. */
$(document).delegate('.fileGraph .errorNumber', 'click', function(event) {
	changeFile($(this).closest('.fileGraph').attr('id'));
	removeLocation();
	$('#errorsLink').addClass('currentLocation');
	$('html, body').animate({
		scrollTop: $("#errorsList").offset().top
	}, 600);
});

/*
 * Function to generate the html for the bar statistic.
 * The html is then added into the #statGraph div.
 * The function calculatePercentages() is called from here.
 */
function generateFileStatistics(file, totalErrors, fileNumber) {
	var fileName = file.filename;
	var underscoreFileName = fileName.replace(/\./g,"_");
	statistic = "<div id='"+underscoreFileName+"' class='fileGraph'>";
	statistic += "<p class='fileName'>"+file.filename+"</p>";
	statistic += "<div class='bar'>";
	statistic += calculatePercentages(file, totalErrors, fileNumber);
	statistic += "<div style='clear:both'></div>";
	statistic += "</div>";
	$('#statGraph').append(statistic);
}

/*
 * Calculates and returns the percentages for each type of error.
 *
 * @param	file	the file from the jsonObject which contains error details.
 * @return	bars	the html containing the error bar
 */
function calculatePercentages(file, totalErrors, fileNumber) {
	// calculate the percentages
	// add up the numbers
	//totalErrors = jsonObject[0].errors.count;
	syntaxErrors = 0;
	semanticErrors = 0;
	warningErrors = 0;
	deprecatedErrors = 0;
	
	/* Counts the number of errors for each type. */
	for(var i = 0; i < jsonObject[fileNumber].errors.count; i++) {
		console.log("searching "+i+" error out of "+jsonObject[fileNumber].errors.count);
		switch (jsonObject[fileNumber].errors[i].type)
			{
			case "html": // html should not be a case...
				syntaxErrors ++;
				siteTotalSyntax ++;
			  break;
			case "syntax":
				syntaxErrors ++;
				siteTotalSyntax ++;
			  break;
			case "semantic":
				semanticErrors ++;
				siteTotalSemantic ++;
			  break;
			case "warning":
				warningErrors ++;
				siteTotalWarning ++;
			  break;
			case "deprecated":
				deprecatedErrors ++;
				siteTotalDeprecated ++;
			  break;
			}
	}
	
	bars = "";
	
	if(totalErrors == 0) {
		bars += "<div class='zero graph' style='width:100%;'></div>";
	}
	
	else {
		bars = "";
		syntaxPercentage = syntaxErrors / totalErrors * 100;
		semanticPercentage = semanticErrors / totalErrors * 100;
		warningPercentage = warningErrors / totalErrors * 100;
		deprecatedPercentage = deprecatedErrors / totalErrors * 100;
		
		console.log("there are: syntax-"+syntaxErrors + " and there are: semantic-"+semanticErrors);
		
		/* Adding attribute errorNumber to allow the hover highlight to easily retrieve the number of errors. */
		bars += "<div class='syntax graph' style='width:"+syntaxPercentage+"%;' errorNumber='"+syntaxErrors+"'></div>";
		bars += "<div class='semantic graph' style='width:"+semanticPercentage+"%;' errorNumber='"+semanticErrors+"'></div>";
		bars += "<div class='warning graph' style='width:"+warningPercentage+"%;' errorNumber='"+warningErrors+"'></div>";
		bars += "<div class='deprecated graph' style='width:"+deprecatedPercentage+"%;' errorNumber='"+deprecatedErrors+"'></div>";
		
	}
	bars += "</div>";
	if(totalErrors == 1) {
		bars += "<p class='errorNumber'>"+totalErrors+" error</p>";
	}
	else {
		bars += "<p class='errorNumber'>"+totalErrors+" errors</p>";
	}
	
	return bars;
	
}

/* In the future this function will generate the highlight message to be displayed. */
function visualHighlight(barId) {
	errorNumber = barId.attr('errorNumber');
	errorType = barId.attr('class').split(' ')[0];
	if(errorNumber == 1){
		return "<p>There is "+barId.attr('errorNumber')+" "+errorType+" error.</p>";	
	}
	else {
		return "<p>There are "+barId.attr('errorNumber')+" "+errorType+" errors.</p>";		
	}

	/* WILL NEED THIS LOOP FOR DYNAMIC
	for(var i = 0; i < statistics.length; i++) {
		if(statistics[i].id == barId){
			return "<p>"+barId+"</p>";
		}
	}
	*/
}

/* When a .graph is hovered over, a qtip is created. */
$(document).delegate('.graph', 'mouseover', function(event) {
	console.log("hover");
	if(!$(this).hasClass('zero')) {
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
			style: { classes: 'barHighlight' },
			hide: {
				delay: 0
				//event: false
			}, 
			content: {
				text: visualHighlight($(this))
			}
		});
	}
	event.preventDefault();
});