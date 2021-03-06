
		
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
		
		$(window).resize(function(){

			$('#loadingAnimationWrapper').css({
				position:'fixed',
				left: ($(window).width() - $('#loadingAnimationWrapper').outerWidth())/2,
				top: ($(window).height() - $('#loadingAnimationWrapper').outerHeight())/2
			});

		});

		// To initially run the function:
	
		$(document).ready(function() {
		
			//console.log("main js is running");
		
			$(window).resize();
			
			/* Hide sections of the site that should not be shown initially*/
			$('.extraOne').hide();
			$('.extraTwo').hide();
			$('.hidden').hide();
			
			$('#goToUpload').click(function() {
				$("#uploadLink").click();
			});
			
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
				//console.log("breakdown clicked");
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
			
			$("#feedbackLink").click(function(e) {
				//console.log("breakdown clicked");
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
					 scrollTop: $("#structure").offset().top - 100
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
					 scrollTop: $("#sourceTitle").offset().top - 100
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
					 scrollTop: $("#errorsTitle").offset().top - 100
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
				if($("#input-direct").val()) {
					$('#directInputForm').submit();
					loadingAnimation();
				}
				else {
					$("#alternativeButton").qtip({
						overwrite: false,
						show: {
							event: event.type,
							ready: true
						},
						position: {
							my: 'top left',
							at: 'top right',
							target: $("#alternativeButton")
						},
						style: { classes: 'warningTip' },
						hide: {
							event: 'unfocus'
						}, 
						content: {
							text: "<p>I command you to enter something into the text area first.</p>"
						}
					});
				}
			});
			 
			$("#urlButton").click(function(e) {
				if($("#input-url").val()) {
					$('#urlInputForm').submit();
					loadingAnimation();
				}
				else {
					$("#urlButton").qtip({
						overwrite: false,
						show: {
							event: event.type,
							ready: true
						},
						position: {
							my: 'top left',
							at: 'top right',
							target: $("#urlButton")
						},
						style: { classes: 'warningTip' },
						hide: {
							event: 'unfocus'
						}, 
						content: {
							text: "<p>I command you to enter a url first.</p>"
						}
					});
				}
			});
			
			
			$(document).delegate('#breakdown', 'mouseover', function(event) {
				if (!$(event.target).is('h2') && !$(event.target).is('.sectionTitle')) {
					removeLocation();
					$('#feedbackLink').addClass('currentLocation');
				}
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
			
			$('.key').hover(function() {
				$(this).qtip({
					overwrite: false,
					show: {
						event: event.type,
						ready: true
					},
					position: {
						my: 'top left',
						at: 'top right',
						target: $(this)
					},
					style: { classes: 'keyTip' },
					content: {
						text: $(this).children(".keyInfo").html()
					},
					hide: {
						fixed: true
					}
				});
			});
			
			/* DISCLAIMER: ABOUT HTML THOR */
			
			$(".disclaimer").click(function() {
				$(this).qtip({
					overwrite: false,
					show: {
						event: event.type,
						ready: true
					},
					position: {
						my: 'bottom left',
						at: 'top right',
						target: $(this),
						viewport: $(window)
					},
					style: { classes: 'disclaimerTip' },
					content: {
						text: $(".disclaimerText").html(),
						button: true
					},
					hide: {
						event: 'unfocus'
					}
				});
			});			
		
			var urlLocation = location.hash.substr(1);
			console.log("url location is "+urlLocation);
			if(urlLocation == "upload") {
				$("#uploadLink").click();
			}

			if(urlLocation == "tour") {
				window.location.hash = '#upload';
				mainTrip.start();
			}
			
			/*if(urlLocation == "validated") {
				loadingAnimation();
				if(jsonObject == null || jsonObject == "") {
					console.log("directed to validated but there's no jsonObject");
					endLoadingAnimation();
				}
			}*/

			
		});
		
		
		/* Updating site section 
		 * When the user visits a new section of the site the sidebar links need to be updated.
		 * This plugin removes the .currentLocation class from all of the sidebar links.
		 */
		
		 function removeLocation() {
				$("#homeLink").removeClass('currentLocation');
				$("#uploadLink").removeClass('currentLocation');
				$("#breakdownLink").removeClass('currentLocation');
				$("#feedbackLink").removeClass('currentLocation');
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
		