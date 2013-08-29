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
	openOthers("breakdown");
}

/* Function to reveal .extraOne and .extraTwo sections of the site */
function revealSiteZip() {
	revealSite();
	$('.extraTwo').fadeIn();
}