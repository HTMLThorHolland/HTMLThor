function revealSite() {
	$('.extraOne').fadeIn();
	hideSections();
	removeLocation();
	$('#breakdownLink').addClass('currentLocation');
	openOthers("breakdown");
}

function revealSiteZip() {
	revealSite();
	$('.extraTwo').fadeIn();
}