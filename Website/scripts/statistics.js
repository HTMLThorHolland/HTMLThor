$(document).ready(function() {
	populateStatistics();
});
/* Generates the statistics for the Statistics Page */

var statistics = [
	{"name":"index.html", "id":"index.html_0", "syntaxErrors":2, "semanticErrors":23, "warningErrors":4, "deprecatedErrors":2},
	{"name":"about.html", "id":"about.html_0", "syntaxErrors":0, "semanticErrors":0, "warningErrors":0, "deprecatedErrors":0},
	{"name":"contact.html", "id":"contact.html_0", "syntaxErrors":2, "semanticErrors":16, "warningErrors":4, "deprecatedErrors":2},
	{"name":"images.html", "id":"images.html_0", "syntaxErrors":0, "semanticErrors":50, "warningErrors":1, "deprecatedErrors":25}
];

function populateStatistics() {
	/*for(var i = 0; i < statistics.length; i++) {
		generateFileStatistics(statistics[i]);
	} PRE-CODED STATS*/
	
		generateFileStatistics(jsonObject[0]);
}

function generateFileStatistics(file) {
	statistic = "<div id='"+file.filename+"_graph' class='fileGraph'>";
	statistic += "<p class='fileName'>"+file.filename+"</p>";
	statistic += "<div class='bar'>";
	statistic += calculatePercentages(file);
	statistic += "<div style='clear:both'></div>";
	statistic += "</div>";
	$('#statGraph').append(statistic);
}

function calculatePercentages(file) {
	// calculate the percentages
	// add up the numbers
	totalErrors = jsonObject[0].errors.count;
	htmlErrors = 0;
	syntaxErrors = 0;
	semanticErrors = 0;
	warningErrors = 0;
	deprecatedErrors = 0;
	
	for(var i = 0; i < jsonObject[0].errors.count; i++) {
		switch (jsonObject[0].errors[i].type)
			{
			case "html":
				htmlErrors ++;
			  break;
			case "syntax":
				syntaxErrors ++;
			  break;
			case "semantic":
				semanticErrors ++;
			  break;
			case "warning":
				warningErrors ++;
			  break;
			case "deprecated":
				deprecatedErrors ++;
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
		deprecatedPercentage = htmlErrors / totalErrors * 100;
		
		bars += "<div class='syntax graph' style='width:"+syntaxPercentage+"%;'></div>";
		bars += "<div class='semantic graph' style='width:"+semanticPercentage+"%;'></div>";
		bars += "<div class='warning graph' style='width:"+warningPercentage+"%;'></div>";
		bars += "<div class='deprecated graph' style='width:"+deprecatedPercentage+"%;'></div>";
		
	}
	bars += "</div>";
	bars += "<p class='errorNumber'>"+totalErrors+" errors</p>";
	return bars;
	
}

function visualHighlight(barId) {
	console.log(barId);
	for(var i = 0; i < statistics.length; i++) {
		if(statistics[i].id == barId);
		return "<p>"+barId+"</p>";
	}
}

$(document).delegate('.graph', 'mouseover', function(event) {
	console.log("hover");
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
			delay: 0//enter in milliseconds
		}, 
		content: {
			text: visualHighlight($(this).closest(".fileGraph").attr('id'))
		}
	});
	
	event.preventDefault();
});