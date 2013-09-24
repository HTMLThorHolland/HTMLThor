
		
	var resultsOpen = false;
		
		/* Opens the Page Source tab */
		function openSource() {
			$('#sourceTitle').removeClass("bottomBorder");
			$('#sourceTitle').removeClass("extraMargin");
			$('#sourceTitle').show();
			$('#sourceContainer').show();
		}
		
		/* Opens the Errors List tab */		
		function openErrors() {
			$('#errorsTitle').removeClass("bottomBorder");
			$('#errorsTitle').removeClass("extraMargin");
			$('#errorsTitle').show();
			$('#errorsContainer').show();
		}

		/* Opens the the tab of the provided ID
		 * @param  id  the id of the page section
		 */		
		function openOthers(id) {
			$('#'+id).fadeIn();
			$('#'+id+' > .sectionContent').fadeIn();
			$('#'+id).removeClass("noMargin");	
		}
	
		$(document).ready(function() {
		
			
			/* Hide sections of the site that should not be shown initially*/
			$('.extraOne').hide();
			$('.extraTwo').hide();
			$('.hidden').hide();
			
			$("#homeLink").click(function(e) {
				hideSections();
				removeLocation();
				$(this).addClass('currentLocation');
				$('#home').fadeIn();
				resultsOpen = false;
			 });
			
			$("#uploadLink").click(function(e) {
				hideSections();
				removeLocation();
				$(this).addClass('currentLocation');
				openOthers("upload");
				resultsOpen = false;
			 });
			
			$("#breakdownLink").click(function(e) {
				console.log("breakdown clicked");
				e.preventDefault();
				if(!resultsOpen) {
					revealSite();
				}
				 $('html, body').animate({
					 scrollTop: $("html").offset().top
				 }, 600);
				removeLocation();
				$(this).addClass('currentLocation');
			 });
			
			$("#structureLink").click(function(e) {
				e.preventDefault();
				if(!resultsOpen) {
					revealSite();
				}
				 $('html, body').animate({
					 scrollTop: $("#structure").offset().top
				 }, 600);
				removeLocation();
				$(this).addClass('currentLocation');
			 });
			
			$("#sourceLink").click(function(e) {
				e.preventDefault();
				if(!resultsOpen) {
					revealSite();
				}
				 $('html, body').animate({
					 scrollTop: $("#sourceTitle").offset().top
				 }, 600);
				removeLocation();
				$(this).addClass('currentLocation');
			 });
			
			$("#errorsLink").click(function(e) {
				e.preventDefault();
				if(!resultsOpen) {
					revealSite();
				}
				 $('html, body').animate({
					 scrollTop: $("#errorsTitle").offset().top
				 }, 600);
				removeLocation();
				$(this).addClass('currentLocation');
			 });
			
			$("#topLink").click(function(e) {
				e.preventDefault();
				 $('html, body').animate({
					 scrollTop: $("html").offset().top
				 }, 600);
			 });
			 
			 
			$("#alternativeButton").click(function(e) {
				$('#directInputForm').submit();
			});
			 
			$("#urlButton").click(function(e) {
				$('#urlInputForm').submit();
			});
			
			
			$(document).delegate('#structure', 'mouseover', function(event) {
				removeLocation();
				$('#structureLink').addClass('currentLocation');
			});
			
			
			$(document).delegate('#sourceContainer', 'mouseover', function(event) {
				removeLocation();
				$('#sourceLink').addClass('currentLocation');
			});
			
			$(document).delegate('#errorsContainer', 'mouseover', function(event) {
				removeLocation();
				$('#errorsLink').addClass('currentLocation');
			});
			
			/* END PAGE NAVIGATION */
			
			/* HELP KEY */
			
			
			$(".key").click(function() {
				$('.key').not(this).each(function(){
					$(this).children('.keyInfo').slideUp();
					$(this).removeClass('active');
				 });
				$(this).children('.keyInfo').slideToggle();
				$(this).toggleClass('active');
			});
			
			$(document).mouseup(function (e)
			{
				var container = $(".key");

				if (!container.is(e.target)
					&& container.has(e.target).length === 0)
				{
					$(".keyInfo").slideUp(function(){
						$(".key").removeClass('active');			
					});
				}
			});
			
			
			/* END HELP KEY */
			
			
			/* Developer Testing */
			
			$(".developers").click(function() {
				revealSiteZip();
				addBreakdownBar();
			});
			
			function addBreakdownBar() {
				//var something = "test";
				var bar = "<div class='fileGraph'><p class='fileName'>brokentestpage.html</p><div class='bar'><div class='syntax graph' style='width:33.33333333333333%;' errornumber='1' data-hasqtip='2' aria-describedby='qtip-2'></div><div class='semantic graph' style='width:33.33333333333333%;' errornumber='1' data-hasqtip='3' aria-describedby='qtip-3'></div><div class='warning graph' style='width:33.33333333333333%;' errornumber='1' data-hasqtip='6' aria-describedby='qtip-6'></div><div class='deprecated graph' style='width:0%;' errornumber='0'></div></div><p class='errorNumber'>3 errors</p><div style='clear:both'></div></div>";
				$('#statGraph').append(bar);
			}

			
		});
		
		
		/* Updating site section 
		 * When the user visits a new section of the site the sidebar links need to be updated.
		 * This plugin removes the .currentLocation class from all of the sidebar links.
		 */
		
		 function removeLocation() {
				$("#homeLink").removeClass('currentLocation');
				$("#uploadLink").removeClass('currentLocation');
				$("#breakdownLink").removeClass('currentLocation');
				$("#structureLink").removeClass('currentLocation');
				$("#sourceLink").removeClass('currentLocation');
				$("#errorsLink").removeClass('currentLocation');
		 }
		 
		 /* 
		  * Hides all of the site's sections.
		  */
		 function hideSections() {
		 
			$('#home').hide();
			$('#sourceContainer').hide();
			$('#errorsContainer').hide();
			$('#errorsTitle').hide();
			$('#sourceTitle').hide();
			$('#upload').hide();
			$('#breakdown').hide();
			$('#structure').hide();
			
		 }
		
		/* END Updating Site Section */
		
		/* UPLOAD CODE */
		
		/*
		 * Hides the section of the site specified by the id.
		 * @param	id	The id of the section of the site to be hidden.
		 */
		function hide(id) {
			$('#'+id+' > .sectionContent').fadeOut();
			$('#'+id+' > .sectionContent').slideUp();
			$('#'+id).addClass("noMargin");
		}
		
		/*
		 *	Resets the upload forms.
		 */
		function resetForms() {
			$('form[name="singleForm"]').find("input[type=file]").val("");
			$('form[name="multiForm"]').find("input[type=file]").val("");
			$('form[name="zipForm"]').find("input[type=file]").val("");
		}
		
		/* END UPLOAD CODE */
		