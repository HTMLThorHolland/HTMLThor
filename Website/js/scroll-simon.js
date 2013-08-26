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
function setScrollWidth() {
	$('#source').children('.sectionContent').css({'width':'auto'});
	$('#source').children('.sectionContent').css({'max-width':'auto'});
	$('#pageCode').css({'width':'auto'});
	$('#pageCode').css({'max-width':'auto'});
	$('#pageSource').css({'width':'auto'});
	$('#pageSource').css({'max-width':'auto'});
	
	$('#scrollContent').width($('#pageSource').width());
	
	$('#source').children('.sectionContent').css({'width':'940px'});
	$('#source').children('.sectionContent').css({'max-width':'940px'});
	$('#pageCode').css({'width':'100%'});
	$('#pageCode').css({'max-width':'100%'});
	$('#pageSource').css({'width':'100%'});
	$('#pageSource').css({'max-width':'100%'});
	
}