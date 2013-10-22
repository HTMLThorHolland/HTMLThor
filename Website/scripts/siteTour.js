

$(document).ready(function() {

	var mainTrip = new Trip([
		{ sel : $("#homeKey"), content : "The types of errors you'll find being validated are listed and explained here. Feel free to check these out any time, or use the sidebar for a quick overview.", position : "w", expose: true },
		{ sel : $("#theHelpKey"), content : "An always-visible list of errors you may encounter in your code are listed here. Hover over one of the listed errors for a quick explanation of what it means.", position : "e", expose: true },
		{ sel : $("#homeResources"), content : "If you're struggling with HTML5, check out some of the resources linked here.", position : "e", expose: true },
		{ sel : $("#siteLinks"), content : "This is the site's navigation menu. From here you can traverse between the various sections of the site.", position : "e", expose: true },
		{ sel : $("#uploadFileOptions"), content : "shouldn't be seen", position : "e", expose: true, myFunction : function() { $("#uploadLink").click(); mainTrip.next(); } },
		{ sel : $("#uploadFileOptions"), content : "We're on the validate page now. Here you can upload single or multiple files for validation. You can upload a .zip directory of your website to have that validated for code errors and broken links.", position : "e", expose: true },
		{ sel : $("#uploadInputOptions"), content : "Alternatively, you can plug in a live website or copy in your code for validation.", position : "e", expose: true },
		{ sel : $("#uploadInputOptions"), content : "Lets see what some validated HTML code looks like.", position : "e", expose: true, myFunction : function() { uploadExampleSite(); } },
	], {
		showNavigation : true,
		showCloseBox : true,
		delay : -1,
		finishLabel : "Finish",
		prevLabel : "",
		tripTheme : "white tour",
		canGoPrev: false,
		onTripChange : function(i, tripData) {
			if ( i === 4 ) {
				tripData.myFunction();
			}
			if ( i === 7 ) {
				tripData.myFunction();
			}
		}
	});
	
	$("#startSiteTour").click(function() {
		mainTrip.start();
	});

	var resultsTrip = new Trip([
		{ sel : $("#breakdown .breakdownResults"), content : "This is a short'n'snappy overview of your results - summarised into a one-liner and displayed with the total number of errors in your files.", position : "s", expose: true },
		{ sel : $(".breakdownBarResults"), content : "A visual  representation of your errors are listed in bars. Uploading a .zip or multiple files will generate unique bars for each file. Hover over the colours to find out the type of error, and click to be taken to the errors pane for debugging.", position : "s", expose: true },
		{ sel : $("#structure"), content : "Uploading a .zip file will show your website directory here. You can view broken link errors here and their suggested fix.", position : "n", expose: true },
		{ sel : $("#sourceWrapper"), content : "Here, errors are presented inline your source code. Hovering over the highlighted lines will bring up an explanation of the error. Use the drop down menu to switch between code if you've uploaded multiple files.", position : "n", expose: true },
		{ sel : $("#errorsWrapper"), content : "Here, errors are presented in the traditional line-by-line view, a classical approach for the advanced developer.", position : "n", expose: true },
		{ sel : $("#gotoUpload"), content : "That's it! Now you can begin validating with HTML Thor. Enjoy!", position : "e", expose: true }
	], {
		showNavigation : true,
		showCloseBox : true,
		delay : -1,
		finishLabel : "Finish",
		prevLabel : "",
		tripTheme : "white tour",
		canGoPrev: false
	});
	
	$(".developers").click(function() {
		setTimeout(function(){resultsTrip.start();},500);
	});
	
});

function uploadExampleSite() {
	$("#urlInputForm").children("input").val("google.com");
	$("#urlButton").click();
	// need to somehow resume the tour when google.com is validated
}