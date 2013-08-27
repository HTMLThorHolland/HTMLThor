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
	for(var i = 0; i < statistics.length; i++) {
		generateFileStatistics(statistics[i]);
	}
}

function generateFileStatistics(file) {
	statistic = "<div id='"+file.id+"_graph' class='fileGraph'>";
	statistic += "<p class='fileName'>"+file.name+"</p>";
	statistic += "<div class='bar'>";
	statistic += calculatePercentages(file);
	statistic += "<div style='clear:both'></div>";
	statistic += "</div>";
	$('#statGraph').append(statistic);
}

function calculatePercentages(file) {
	// calculate the percentages
	// add up the numbers
	
	bars = "";
	totalErrors = file.syntaxErrors +  file.semanticErrors +  file.warningErrors +  file.deprecatedErrors;
	
	if(totalErrors == 0) {
		bars += "<div class='zero graph' style='width:100%;'></div>";
	}
	
	else {
		bars = "";
		syntaxPercentage = file.syntaxErrors / totalErrors * 100;
		semanticPercentage = file.semanticErrors / totalErrors * 100;
		warningPercentage = file.warningErrors / totalErrors * 100;
		deprecatedPercentage = file.deprecatedErrors / totalErrors * 100;
		
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