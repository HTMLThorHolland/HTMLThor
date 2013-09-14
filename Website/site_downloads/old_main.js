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