		
		/*
		 *	input(tag) = each tag in the file
		 *	output(string, typeoferror, lineno, colstart, colend) = the error message and
		 *															its type and location
		 *
		 *	Description : The function takes each tag and its location in the file,
		 *	and adds it to a list. at the end of the file, check to see if all required tags
		 *	are present in this list. IF NOT, add an error message to the location of the 
		 *	parent container of the missing tags.
		 *
		 *
		 *	CHANGES: Function no longer inputs location, uses a function in the encapsulation class
		 *			 to retrieve location for highlighting reference on errors
		 *
		 */
		 
public void class requiredTags {
	// An array of length (each element that is required) in Boolean format
	Boolean[] presenttags = new Boolean[5];
	// Order - Doctype, html, head, body, title
	
	
		public void initrequiredList() {
			// set presenttags to all false
			for(i=0; i<5; i++) {
				presenttags[i] = false;
			}
		}
	
	
		 
		public void addRequired(tag) {
			if(tag == "!DOCTYPE") {
			
				presenttags[0] = true;
			}
			
			else if(tag == "html") {
			
				presenttags[1] = true;
			}
			
			else if(tag == "head") {
			
				presenttags[2] = true;
			}
			
			else if(tag == "body") {
			
				presenttags[3] = true;
			}
			
			else if(tag == "title") {
			
				presenttags[4] = true;
			}
			
			else {
				return;
			}
			
			
			return;
			
		}
		
		public List<List<String>> eofCheckRequired() {
			List<List<String>> errorMessages = new ArrayList<List<String>>();
			List<String> errorString = new ArrayList<String>();
			
			for(i=0; i<5; i++) {
				errorString.clear();
				if(presenttags[i] == false) {
				// Following highlighting needs to be done and referenced in main code after
				// utilising the encapsulations locate method for location 
				
				// errorString messages need to reference the database for returned error messages.
					if(i==0) {
						// no parent container for doctype
						// return string of error, highlighting line 1
						errorString.add("!DOCTYPE");
						//errorString.add("You are missing a !DOCTYPE declaration at the beginning of your code! ");
						errorMessages.add(errorString);
					}
					else if(i==1) {
						// no parent container for html
						// return string of error on element after doctype
						errorString.add("html");
						//errorString.add("You are missing the <html> </html> tags that should encapsulate your HTML code! ");
						errorMessages.add(errorString);
					}
					else if(i==2) {
						// html container for head
						// return string of error on beggining of body
						errorString.add("head");
						//errorString.add("You are missing the <head> </head> tags that comprise the header of your HTML code! ");
						errorMessages.add(errorString);
					}
					else if(i==3) {
						// html container for body
						// return string of error on head
						errorString.add("body");
						//errorString.add("You are missing the <body> </body> tags that should encapsulate all of your site's displayable components! ");
						errorMessages.add(errorString);
					}
					else if(i==4) {
						// head container for title
						// return string of error on head
						errorString.add("title");
						//errorString.add("You are missing <title> </title> tags in your header. Please include a title for best practice! ");
						errorMessages.add(errorString);
					}
					
				}
			}
			
			return errorMessages;
		 
		}
		 
		 
}