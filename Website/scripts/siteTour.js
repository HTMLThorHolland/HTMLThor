

$(document).ready(function() {

	var mainTrip = new Trip([
		{ sel : $("#homeSyntax"), content : "Hola!", position : "n", expose: true },
		{ sel : $("#homeSemantic"), content : "Adios!", position : "s", expose: true }
	], {
		showNavigation : true,
		showCloseBox : true,
		delay : -1,
		finishLabel : "Finish"
	});
	
	$("#startSiteTour").click(function() {
		mainTrip.start();
	});
	
});