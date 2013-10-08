
		/*
		 *	input(tag, attribute) = each attribute is checked (as it comes so as to make identifying
		 *							location easier) to see that it is a valid attribute for the 
		 *							given tag.
		 *	output(string) = the error message
		 *
		 *	Description : The function takes each tag as an input along with a single attribute for
		 *	said tag and then checks whether the tag can have that attribute.
		 *
		 */
		 
		 
public void class validAtrributes {
	List<String> validAttrList;
	
	
		public void initValidAttrList() {
			List<String> validAttrList = new ArrayList<String>();
		}
	
	
		 
		public String checkAttrValid(tag, attribute) {
			// Fill validAttrList with valid attributes for particular tag from database
			
			for(i=0; i<validAttrList.length; i++) {
				if(validAttrList[i] == attribute) {
					return ""
				}
			}
			return "This is not a valid attribute for this tag";
		 
		 
		}
		 
		 
}