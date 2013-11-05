// global integer to track the total broken links associated with the uploaded .zip
var allBrokenLinksTotal = 0;

/**
 *	
 *	Generate the file structure. Set the file structure feedback.				
 *	
 */
function generateFileStructure() {
	$('#structureContainer').html(getFiles(directoryJSON.children));
	createTree(); // executes JSTree
	$('#totalBroken').text(allBrokenLinksTotal);
	if(allBrokenLinksTotal != 0) {
		$('#totalBroken').addClass("broken");
	}
	if(allBrokenLinksTotal > 15) {
		$("#brokenFeedback p").text("We've detected heaps of broken links within your uploaded .zip folder. Broken links are caused when the file you're linking to can't be found.");
	}
	else if(allBrokenLinksTotal <= 15 && allBrokenLinksTotal > 5) {
		$("#brokenFeedback p").text("We've detected a lot of broken links within your uploaded .zip folder. Broken links are caused when the file you're linking to can't be found.");
	}
	else if(allBrokenLinksTotal <= 5 && allBrokenLinksTotal > 0) {
		$("#brokenFeedback p").text("We've detected a few broken links within your uploaded .zip folder. Broken links are caused when the file you're linking to can't be found.");
	}
	else {
		$("#brokenFeedback p").text("No broken links have been detected in your uploaded .zip folder. Congratulations!");
	}
	
}

/**
 *	
 *	Recursive function to loop through the supplied container and generate an unordered list formatted specifically to enable the plugin jsTree to convert it
 *	to an interactive file structure.
 *			
 *	@param		container		JSON Object		Contains child files and folders.	
 *			
 *	@return		list			String			The generated HTML to be input into the site.	
 *	
 */
function getFiles(container) {
	//console.log("beginning structure: "+container + " first child is: "+container[0].name);
	list = "<ul>";
	for(var i = 0; i < Object.size(container) - 1; i++) { // have to - 1 as .size is returning 1 too many
		//console.log("i is: " + i + " and the object size is: " + Object.size(container) + " and the name is: "+container[i].name);
		////console.log("loop started with " + container[i].name + container[i].type + " i = "+i+" container length is "+container.length);
		
		var fullPath = container[i].fullPath.replace(/\./g,"_");
		
		list += "<li id='"+fullPath+"' rel='"+container[i].type+"' "; // CREATE LI TAG WITH ID AND ITEM TYPE
		/* Check if the item contains errors */
		//console.log("This file has a new location at: "+container[i].newLocation);
		if(container[i].totalErrors != 0) {
			// call function to generate a broken file in the overall broken files list
			if(container[i].newLocation != "") {
				generateBrokenFile(container[i].name, container[i].totalErrors, container[i].fullPath, container[i].newLocation);
			}
			else {
				generateBrokenFile(container[i].name, container[i].totalErrors, container[i].fullPath);
			}
			allBrokenLinksTotal += parseInt(container[i].totalErrors);
		}
		else if(container[i].newLocation != "") {
			generateBrokenFile(container[i].name, container[i].totalErrors, container[i].fullPath, container[i].newLocation);
		}
		list += ">"; // CLOSE OPENING LI TAG
		/* Check if the item is a folder */
		if(container[i].children.count != 0) {
			list += "<a href='#'>" + container[i].name + "</a>";
			//console.log(container[i].name + " has children and is a folder with these children: "+container[i].children);
			list += getFiles(container[i].children);
		}
		else {
			list += "<a href='#'>" + container[i].name + "</a>";
			////console.log(container[i].name + " has no children and is a file");
		}
		list += "</li>"; // CLOSE OVERALL LI TAG
	}
	////console.log("end of loop");
	list += "</ul>";
	////console.log(list);
	return list;
}

/**
 *	
 *	Get the size of the supplied JSON object.
 *	
 *	@param		obj		JSON Object				
 *	
 *	@return		size	Integer					
 *	
 */
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

/**
 *	
 *	Generate a broken file html element and append it to the appropriate container.
 *	
 *	@param		name			String			The name of the file.
 *	@param		total			Integer			The total number of broken links associated with the file.
 *	@param		filePath		String			The file path of the file. (Based upon the uploaded .zip)
 *	@param		location		String			Optional. The suggestion for where this file should be located.	
 *	
 */
function generateBrokenFile(name, total, filePath, location) {
	brokenFile = "<div class='structureBrokenFile' data-fileId='"+filePath+"'>";
	brokenFile += "<span class='brokenLinkIcon'></span>";
	brokenFile += "<p class='fileLocation'><span class='fileName'>"+name+"</span></p>";
	brokenFile += "<p class='brokenLinksNumber'>Broken Links: "+total+"</p>";
	if(location) {
		brokenFile += "<p class='fileLocationWarning'>New Location: This file should be placed in <span class='highlight'>"+location+"</span></p>"
	}
	brokenFile += "<div style='clear: both'></div>";
	brokenFile += "</div>";
	$('.structureBrokenFilesList').append(brokenFile);
}

/**
 * When the user clicks on the file name, open up the appropriate source code.
 */
$(document).delegate('.structureBrokenFile .fileLocation', 'click', function(event) {

	id = $(this).closest('.structureBrokenFile').attr('data-fileId');
	openSourceFile(id+"_Pre"); // in the pagesource.js file
	changeFile(id);
	removeLocation();
	$('#sourceLink').addClass('currentLocation');
	
});

/**
 * When the user clicks on the broken link number, open up the appropriate errors container.
 */
$(document).delegate('.structureBrokenFile .brokenLinksNumber', 'click', function(event) {
	changeFile($(this).closest('.structureBrokenFile').attr('data-fileId'));
	removeLocation();
	$('#errorsLink').addClass('currentLocation');
	$('html, body').animate({
		scrollTop: $("#errorsList .errorCategory.broken").offset().top
	}, 600);
});