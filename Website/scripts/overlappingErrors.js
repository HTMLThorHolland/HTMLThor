// assumed input is json object of errors (eg. jsonObject[0].errors)
function overlappingErrors(json) {
	var overlappingLine = new Array();
	var overlappingColumn = new Array();
	for (var i = 0; i < json.errorCount; i++) {
		for (var j = 0; j < overlappingArray.length; j++) {
			if (json[i].line == overlappingLine[j] && json[i].col == overlappingColumn[j]) {
				console.log("Found an overlapping error: " + json[i].line + "," + json[i].col);
				return true;
			}
		}
		overlappingLine[i] = json[i].line;
		overlappingColumn[i] = json[i].col;
	}
	return false;
}