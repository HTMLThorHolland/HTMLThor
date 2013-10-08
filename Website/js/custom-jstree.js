
function createTree() {

	$('#structureContainer').jstree({
		"plugins" : ["themes","html_data","ui","types"],
		"types" : {
			"types" : {
				// The default type
				"default" : {
					// I want this type to have no children (so only leaf nodes)
					// In my case - those are files
					"valid_children" : "none",
					// If we specify an icon for the default type it WILL OVERRIDE the theme icons
					"icon" : {
						"image" : "images/file.png"
					}
				},
				// The `folder` type
				"folder" : {
					"valid_children" : [ "default", "folder" ],
					"icon" : {
						"image" : "images/folder.png"
					}
				},
				// The `folder` type
				"file" : {
					"valid_children" : "none",
					"icon" : {
						"image" : "images/file.png"
					}
				},
				// The `folder` type
				"brokenFile" : {
					"valid_children" : "none",
					"icon" : {
						"image" : "images/brokenFile.png"
					}
				},
			}
		}
	})
	.bind("select_node.jstree", function (event, data) {

		// `data.rslt.obj` is the jquery extended node that was clicked

		//alert(data.rslt.obj.attr("id"));

	})
	.delegate("a", "click", function (event, data) { 
		event.preventDefault();
		$(this.parentNode).children(".jstree-icon").click();
	})

}