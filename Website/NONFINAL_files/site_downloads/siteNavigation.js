$(document).mouseup(function (e){	//console.log("a click");    var container = $(".topHelpBar");    if (!container.is(e.target) // if the target of the click isn't the container...        && container.has(e.target).length === 0) // ... nor a descendant of the container    {        container.slideToggle();    }});
$(document).ready(function() {
	$('.topHelpButt').click(function(e) {
		e.preventDefault();
		$('.topHelpKey').slideToggle();
	 });
});