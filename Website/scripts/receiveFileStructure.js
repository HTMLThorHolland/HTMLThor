
console.log("recieveFileStructure");

var directory = [
	{ "name":"images", "id":"images_0", "children":
		[
			{ "name":"index.html", "id":"index.html_1", "children":"none"},
			{ "name":"testfile.html", "id":"testfile.html_0", "children":"none" }
		]
	},
	{ "name":"about.html", "id":"about.html_0", "children":"none" }
];

/* Loop through each base-level item in the directory */
function getFiles(container) {
	for(var i=0; i<container.length; i++) {
		console.log("loop started with " + container[i].name);
		if(container[i].children != "none") {
			console.log(container[i].name + " has children and is a folder");
			getFiles(container[i]);
		}
		else {
			console.log(container[i].name + " has no children and is a file");
		}
	}
}

getFiles(directory);