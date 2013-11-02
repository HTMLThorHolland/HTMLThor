var zipUploaded = false;

function rockAndRoll() {

	if(!jsonObject.filecount) {
		jsonObject.filecount = 1;
	}

	//console.log("number of files upload "+jsonObject.filecount);
	for(var i = 0; i < jsonObject.filecount; i++) {
		//console.log("ATTENTION!: there are "+jsonObject.filecount+" files and this file is: "+jsonObject[i].filename);
		setPageSource(jsonObject[i].source, jsonObject[i].filename, i);
	}
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
	revealPageSource(jsonObject[0].filename);
	
	if(directoryJSON && directoryJSON != null) {
		//console.log("full directory object: "+directoryJSON);
		//console.log("full directory object children: "+directoryJSON.children);
		//console.log("full directory object first child type: "+directoryJSON.children[0].type);
		generateFileStructure(directoryJSON);
		zipUploaded = true;
		revealSite();
	}
	
	else {
		revealSite();
	}

}

var ellipsisCount = 0;
var loadingEllipsis;

function loadingAnimation() {	
	console.log("executing loading animation");
	$("#loadingAnimationWrapper").show();
	console.log("finished loading the loading animation");
	
	//loadingEllipsis=setInterval(function(){ellipsis()},500);
	
}

function ellipsis() {
	if(ellipsisCount == 0) {
		$("#ellipsisLoading").text("loading");
		ellipsisCount++;		
	}
	else if(ellipsisCount == 1) {
		$("#ellipsisLoading").text("loading.");
		ellipsisCount++;	
	}
	else if(ellipsisCount == 2) {
		$("#ellipsisLoading").text("loading..");
		ellipsisCount++;	
	}
	else {
		$("#ellipsisLoading").text("loading...");
		ellipsisCount = 0;		
	}
}

function endLoadingAnimation() {
	//clearInterval(loadingEllipsis);
	$("#loadingAnimationWrapper").hide();
	console.log("loading animation has been destroyed");
}

/* Load jsonObject for tour */
function initTour() {
	
	
	
	
	$.getJSON("../tour/errors.json", function(response){
       jsonObject = response;
 	})
 	.success(function() { 
		//console.log(jsonObject.filecount);
		
		$.getJSON("../tour/directory.json", function(response) {
			directoryJSON = response;
		})
		.success(function() {  
			rockAndRoll();
		});
		
	});
	
	
		
}

/*
 *	TODO: Initially select the file with the most errors to be displayed.
 */
function selectMostErrors() {
	var fileMostErrors = "";
}

function initSelectBoxes() {
	var selectBoxes = $('.selectFileObject');
	for(var i = 0; i < jsonObject.filecount; i++) {
		var underScoreName = jsonObject[i].filename;
		underScoreName = underScoreName.replace(/\./g,"_");
		nameErrors = jsonObject[i].filename + " ("+jsonObject[i].errors.count+")";
		$('.selectFileObject').append(new Option(nameErrors, underScoreName));
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
		//console.log("set the new value to: "+filename);
	}
	else {
		//console.log(filename+" is not an option from the select boxes");
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
	singlePageView();
	//console.log("site has been revealed");
	if(zipUploaded) {
		$('.extraTwo').fadeIn();
	}
	endLoadingAnimation();
	
	window.location.hash = '#upload';
	
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