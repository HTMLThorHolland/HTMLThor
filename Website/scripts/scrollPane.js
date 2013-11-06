
function initScrollPanes(id) {
	
	if($('#'+id).height() >= 250) {
		$('#'+id).slimScroll({
			height: '250px',
			alwaysVisible: true
		});
	
		console.log("made scrollable for "+id + " " +$('#'+id));
	}
	
}