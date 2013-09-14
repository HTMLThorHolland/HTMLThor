			$("#breakdownLink").click(function(e) {
				hideSections();
				removeLocation();
				$(this).addClass('currentLocation');
				openOthers("breakdown");
			 });
			
			$("#structureLink").click(function(e) {
				hideSections();
				removeLocation();
				$(this).addClass('currentLocation');
				openOthers("structure");
			 });
			
			$("#sourceLink").click(function(e) {
				hideSections();
				removeLocation();
				$(this).addClass('currentLocation');
				openSource();
				setScrollWidth();
			 });
			
			$("#errorsLink").click(function(e) {
				hideSections();
				removeLocation();
				$(this).addClass('currentLocation');
				openErrors();
			 });
			 
			 /* Detect if 'U' is pressed then switch to upload tab */
			$(document).keydown(function(event){
				if(event.which == 85){
					$("#uploadLink").click();
				}
			});
			
			/* Detect if 'H' is pressed then switch to home tab */
			$(document).keydown(function(event){
				if(event.which == 72){
					$("#homeLink").click();
				}
			});
			
			/* Detect if 'B' is pressed then switch to home tab */
			$(document).keydown(function(event){
				if(event.which == 66){
					$("#breakdownLink").click();
				}
			});
			
			/* Detect if 'P' is pressed then switch to home tab */
			$(document).keydown(function(event){
				if(event.which == 80){
					$("#sourceLink").click();
				}
			});
			
			/* Detect if 'E' is pressed then switch to home tab */
			$(document).keydown(function(event){
				if(event.which == 69){
					$("#errorsLink").click();
				}
			});
			
			/* Detect if 'F' is pressed then switch to home tab */
			$(document).keydown(function(event){
				if(event.which == 20){
					$("#structureLink").click();
				}
			});