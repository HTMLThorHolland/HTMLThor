package htmlthor.com;import java.util.*;
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
		 
		 
public class ValidAtrributes {
	private List<String> validAttrList;
	
	
		public ValidAttributes() {
			validAttrList = new ArrayList<String>();
		}
	
		 
		public String checkAttrValid(String tag, String attribute) {
			// Fill validAttrList with valid attributes for particular tag from database
			
			for(int i=0; i<validAttrList.size(); i++) {
				if(validAttrList.get(i) == attribute) {
					return "";
				}
			}
			return "This is not a valid attribute for this tag";
		 
		 
		}
		 
		 
}