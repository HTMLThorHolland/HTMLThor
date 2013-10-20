

$(document).ready(function() {

	var mainTrip = new Trip([
		{ sel : $("#homeKey"), content : "The types of errors you'll find being validated are listed and explained here. Feel free to check these out any time, or use the sidebar for a quick overview.", position : "w", expose: true },
		{ sel : $(".helpKey"), content : "An always visible list of errors you may encounter in your code are listed here. Hover over one of the listed errors for a quick explanation of what it means.", position : "e", expose: true },
		{ sel : $("#homeResources"), content : "If you're struggling with HTML5, check out some of the resources linked here.", position : "e", expose: true },
		{ sel : $("#siteLinks"), content : "This is the site's navigation menu. From here you can traverse between the various sections of the site.", position : "e", expose: true },
		{ sel : $("#uploadFileOptions"), content : "shouldn't be seen", position : "e", expose: true, myFunction : function() { $("#uploadLink").click(); mainTrip.next(); } },
		{ sel : $("#uploadFileOptions"), content : "This is the site's navigation menu. From here you can traverse between the various sections of the site.", position : "e", expose: true },
		{ sel : $("#uploadInputOptions"), content : "This is the site's navigation menu. From here you can traverse between the various sections of the site.", position : "e", expose: true },
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
	
});

function uploadExampleSite() {
	$("#urlInputForm").children("input").val("google.com");
	$("#urlButton").click();
	// need to somehow resume the tour when google.com is validated
}