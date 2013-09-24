

function rockAndRoll() {


	for(var i = 0; i < jsonObject.filecount; i++) {
		console.log("ATTENTION!: there are "+jsonObject.filecount+" files and this file is: "+jsonObject[i].filename);
		setPageSource(jsonObject[i].source, jsonObject[i].filename);
	}
	setPageSource(jsonObject[0].source, jsonObject[0].filename);
	setErrors();
	populateStatistics();
	hideChangeFile(); // if there's only one page returned, don't provide change page options
	revealSite();

}


/*
 * Extra One:
 *				breakdown
 *				page source
 *				errors
 *
 * Extra Two:
 *				file structure
 */

/* Function to reveal .extraOne sections of the site */
function revealSite() {
	$('.extraOne').fadeIn();
	hideSections();
	removeLocation();
	$('#breakdownLink').addClass('currentLocation');
	setScrollWidth(); // for page source scrollbar
	singlePageView();
	console.log("site has been revealed");
}

/* Function to reveal .extraOne and .extraTwo sections of the site */
function revealSiteZip() {
	revealSite();
	$('.extraTwo').fadeIn();
}

function singlePageView() {
	$('.singleTab').fadeIn();
	resultsOpen = true;
}