$(document).ready(function()
{

	$('#scrollParent').scroll(function () {
	//alert("hello");
		$('#pageSource').scrollLeft($('#scrollParent').scrollLeft());
		$('#pageSource').scrollTop($('#scrollParent').scrollTop());

	});


});

/* This function sets up the invisible scroll field to have the same width
as the page source section, so you can scroll with its scrollbar instead of
the page source's which is at the bottom of the document. */
function setScrollWidth(filename) {
	// change #pageCode to filename_Pre
	console.log("setting up the page source for scrolling.");
	$('#source').children('.sectionContent').css({'width':'auto'});
	$('#source').children('.sectionContent').css({'max-width':'auto'});
	$('#'+filename).css({'width':'auto'});
	$('#'+filename).css({'max-width':'auto'});
	$('#pageSource').css({'width':'auto'});
	$('#pageSource').css({'max-width':'auto'});
	
	$('#scrollContent').width($('#pageSource').width());
	
	$('#source').children('.sectionContent').css({'width':'auto'});
	$('#source').children('.sectionContent').css({'max-width':'auto'});
	$('#'+filename).css({'width':'100%'});
	$('#'+filename).css({'max-width':'100%'});
	$('#pageSource').css({'width':'100%'});
	$('#pageSource').css({'max-width':'100%'});
	
}