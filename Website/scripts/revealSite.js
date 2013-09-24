

function rockAndRoll() {

	console.log("number of files upload "+jsonObject.filecount);
	for(var i = 0; i < jsonObject.filecount; i++) {
		console.log("ATTENTION!: there are "+jsonObject.filecount+" files and this file is: "+jsonObject[i].filename);
		setPageSource(jsonObject[i].source, jsonObject[i].filename);
	}
	revealPageSource(jsonObject[0].filename);
	setErrors();
	revealErrors(jsonObject[0].filename);
	// hide errors, and then show the relevant one. Hide by class and then show by whether they belong to the right filename.
	populateStatistics();
	if(jsonObject.filecount == 1) {
		hideChangeFile(); // if there's only one page returned, don't provide change page options
	}
	else {
		// call function to generate the file selection boxes
		initSelectBoxes();
	}
	revealSite();

}

function initSelectBoxes() {
	var selectBoxes = $('.selectFileObject');
	for(var i = 0; i < jsonObject.filecount; i++) {
		var underScoreName = jsonObject[i].filename;
		underScoreName = underScoreName.replace(/\./g,"_");
		$('.selectFileObject').append(new Option(jsonObject[i].filename, underScoreName));
	}
}

function updateSelectBoxes(box) {
	var index = $('option:selected', box).index(); // Find selected item's index
	$('.selectFileObject').each(function() { // For each other list
		$(this).val($('option:eq(' + index + ')', this).val()); // Find the matching item
	});
	var filename = $('.selectFileObject').val();
	
	changeFile(filename);
	
	var container = $(box).closest('.singleTab');
	
	switch (container.attr('id'))
		{
		case "errorsContainer":
			$('html, body').animate({
				scrollTop: $("#errorsTitle").offset().top
			}, 0);
			removeLocation();
			$('#errorsLink').addClass('currentLocation');
		  break;
		}
}

function setSelectBoxes(filename) {
	if($(".selectFileObject option[value='"+filename+"']").length > 0) {
		$('.selectFileObject').each(function() { // For each other list
			$(this).val(filename);
		});
		console.log("set the new value to: "+filename);
	}
	else {
		console.log(filename+" is not an option from the select boxes");
	}
}

function changeFile(filename) {
	filename = filename.replace(/\./g,"_");
	setSelectBoxes(filename);
	// update page source
	revealPageSource(filename);
	// update errors
	revealErrors(filename);
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