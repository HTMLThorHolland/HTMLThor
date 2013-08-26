
console.log("recieveFileStructure");

var directory = [
	{ "name":"images", "id":"images_0", "type":"folder", "errorTypes":
		["brokenLink","locationSuggestion"],
	"errors":
		[
			{ "brokenLink":"starlight.tfi", "locationSuggestion":"" },
			{ "brokenLink":"image.jpg", "locationSuggestion":"" },
		]
	, "children":
		[
			{ "name":"index.html", "id":"index.html_0", "type":"file", "errorTypes":"", "errors":"", "children":""},
			{ "name":"testfile.html", "id":"testfile.html_0", "type":"file", "errorTypes":"", "errors":"", "children":"" },
			{ "name":"sub_images", "id":"sub_images_0", "type":"folder", "errorTypes":"", "errors":"", "children":
				[
					{ "name":"starlight.tif", "id":"starlight.tif_0", "type":"file", "errorTypes":"", "errors":"", "children":""}
				]
			}
		]
	},
	{ "name":"about.html", "id":"about.html_0", "type":"file", "errorTypes":"", "errors":
		[
			{ "brokenLink":"starlight.tfi", "locationSuggestion":"" },
			{ "brokenLink":"image.jpg", "locationSuggestion":"" },
		]
	, "children":"" }
];

/* Loop through each base-level item in the directory */
function getFiles(container) {
	list = "<ul>";
	for(var i = 0, count = container.length; i < count; i++) {
		//console.log("loop started with " + container[i].name + container[i].type);
		list += "<li rel='"+container[i].type+"' "; // CREATE LI TAG WITH ITEM TYPE
		/* Check if the item contains errors */
		if(container[i].errorTypes != null && container[i].errorTypes != "") {
			list +="class='"
			for(var j = 0, count = container[i].errorTypes.length; j < count; j++){
				list += container[i].errorTypes[j] + " ";
			}
			list += "'";
		}
		list += ">"; // CLOSE FIRST LI TAG
		/* Check if the item is a folder */
		if(container[i].children != "" && container[i].children != null) {
			list += "<a href='#'>" + container[i].name + "</a>";
			console.log(container[i].name + " has children and is a folder");
			list += getFiles(container[i].children);
		}
		else {
			list += "<a href='#'>" + container[i].name + "</a>";
			console.log(container[i].name + " has no children and is a file");
		}
		list += "</li>"; // CLOSE LI TAG
	}
	list += "</ul>";
	console.log(list);
	return list;
}

$(document).ready(function() {
	$('#structureContainer').html(getFiles(directory));
	createTree();
});

