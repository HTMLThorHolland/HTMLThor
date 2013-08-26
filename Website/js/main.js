
	
		var selectedFile;
	
	
		function hideInnerContent() {
			$('#structure > .sectionContent').slideUp();
			$('#structure').addClass("noMargin");		
			$('#sourceContainer').hide();
			$('#errorsContainer').hide();
			$('#errorsTitle').addClass("bottomBorder");	
			$('#errorsTitle').addClass("extraMargin");
			$('#sourceTitle').addClass("bottomBorder");
			$('#sourceTitle').addClass("extraMargin");
		}
		
		function openSource() {
			$('#sourceTitle').removeClass("bottomBorder");
			$('#sourceTitle').removeClass("extraMargin");
			$('#sourceTitle').show();
			$('#sourceContainer').show();
		}
		
		function openErrors() {
			$('#errorsTitle').removeClass("bottomBorder");
			$('#errorsTitle').removeClass("extraMargin");
			$('#errorsTitle').show();
			$('#errorsContainer').show();
		}
		
		function openOthers(id) {
			$('#'+id).show();
			$('#'+id+' > .sectionContent').show();
			$('#'+id).removeClass("noMargin");	
		}
	
		$(document).ready(function() {
				
		
		
		
		
		
			/* This is code for the qtip2 plugin. Delegate allows it to work with dynamically generated content
				from http://craigsworks.com/projects/forums/showthread.php?tid=3253 
				http://qtip2.com/options
				*/
			 $(document).delegate('.errorContainer', 'mouseover', function(event) {
				$(this).qtip({
					overwrite: false,
					show: {
						event: event.type,
						ready: true
					},
					position: {
						my: 'bottom left',
						at: 'top left',
						target: $(this)
					},
					style: { classes: 'qTipHighlight' },
					hide: {
						delay: 0//enter in milliseconds
					}, 
					content: {
						text: getContent($(this).attr('id'))
					}
				});
				
				event.preventDefault();
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
		
			/* Hide sections of the site */
			$('.extraOne').hide();
			$('.extraTwo').hide();
			$('.hidden').hide();
			
			$("#homeLink").click(function(e) {
				hideSections();
				removeLocation();
				$(this).addClass('currentLocation');
				$('#home').show();
			 });
			
			$("#uploadLink").click(function(e) {
				hideSections();
				removeLocation();
				$(this).addClass('currentLocation');
				openOthers("upload");
			 });
			
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
			
			$("#topLink").click(function(e) {
				linkFiles(); // remove this
				e.preventDefault();
				 $('html, body').animate({
					 scrollTop: $("html").offset().top
				 }, 600);
			 });
			
			
			/* END PAGE NAVIGATION */
			
			/* FOLDER SELECTION */
			
			/* 
				When a folder class is clicked, it searches through all of the other folders within that 
				ul and then removes the .selectedFolder class from them. This is where you'll detect 
				which folder a user has selected.
			*/
			$(".folder").click(function(e) {
				var id = new Array();
				id = $(this).attr('class');
				id = id.split(' ');
				var parentId = $(this).closest(".structureSide").attr('id');
				changeList(id[0], parentId);
				$(this).closest("ul").children("li").children(".folder").removeClass("selectedFolder");
				$(this).addClass("selectedFolder");
			});
			
			function changeList(id, parentId) {
				console.log(id);
				console.log(parentId);
				$('#'+parentId).children('.filesList').children("ul").addClass("hiddenList");
				$('#'+parentId).children('.filesList').children('.'+id+'List').removeClass("hiddenList");
			}
			
			function hideLists() {
			}
			
			
			
			
			
			
			
			
			
			/* END FOLDER SELECTION */
			
			
			$("#alternativeButton").click(function(e) {
				e.preventDefault();
				uploadFile("coop.html");
			});
					
			
		});
		
		
		/* Updating site section */
			 
		 function removeLocation() {
				$("#homeLink").removeClass('currentLocation');
				$("#uploadLink").removeClass('currentLocation');
				$("#breakdownLink").removeClass('currentLocation');
				$("#structureLink").removeClass('currentLocation');
				$("#sourceLink").removeClass('currentLocation');
				$("#errorsLink").removeClass('currentLocation');
		 }
		 
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
		
		function getFile(id) {
			console.log(id);
			var stringId = id + "Upload";
			console.log(stringId);
			document.getElementById(stringId).click();
		}
		
		
		function uploadFile(id) {
		
			/* Will need to add the ability for multiple files in the future */
			
			selectedFile = $('#'+id).val();
			readTextFile(selectedFile);
			// readFile(selectedFile);
		
			console.log(selectedFile);
			 $('html, body').animate({
				 scrollTop: $("html").offset().top
			 }, 600);
			if(id=="zipUpload"){
				revealSiteZip();
			}
			else {
				$('.extraTwo').hide();
				revealSite();
			}
			resetForms();
			
			hideSections();
			removeLocation();
			$('#breakdownLink').addClass('currentLocation');
			openOthers("breakdown");
			
		}
		
		function hide(id) {
			$('#'+id+' > .sectionContent').fadeOut();
			$('#'+id+' > .sectionContent').slideUp();
			$('#'+id).addClass("noMargin");
		}
		
		function revealSite() {
			$('.extraOne').fadeIn();
		}
		
		function revealSiteZip() {
			revealSite();
			$('.extraTwo').fadeIn();
		}
		
		function resetForms() {
			$('form[name="singleForm"]').find("input[type=file]").val("");
			$('form[name="multiForm"]').find("input[type=file]").val("");
			$('form[name="zipForm"]').find("input[type=file]").val("");
		}
		
		/* END UPLOAD CODE */
		