

FILE DIRECTORY STRUCTURE:

"directory" contains the items located at the root level.
Each item has three attributes, name, id and children.
When a folder exists, it will have children, and these children will be contained 
within square brackets. Each item is contained within curly braces.

"directory" : [
	{ "name":"index.html", "id":"index.html_0", "children":
		[
			{ "name":"index.html", "id":"index.html_1", "children":"none"},
			{ "name":"testfile.html", "id":"testfile.html_0", "children":"none" }
		]
	},
	{ "name":"about.html", "id":"about.html_0", "children":"none" }
]