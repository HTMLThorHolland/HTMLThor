
		/*
		 *	input(tag, attributes) = tags are checked to see that they contain all of the 
		 *							 required attributes, otherwise return an error (some 
		 *							 will be syntax, some best practice)
		 *	output(string) = the error message
		 *
		 *	Description : The function takes each tag as an input along with all attributes for
		 *	said tag and then checks whether required attributes for that tag type are included.
		 *
		 */
		 
		 
// Runs very similar to requiredTags but does not need to deal with position or multiple errors as
// this function will be run for every tag AT the location of the tag.