
		/*
		 *	input(tag) = each singular tag in the file
		 *	output(string) = the error message 
		 *
		 *	Description : The function takes each singular tag as an input, adding it to a list, if
		 *	there is more than one instance of a singular tag in the list, return an error.
		 *
		 */

public void class singularTags {
	List<String> singularList;
	
		public initSingularList() {
			List<String> singularList = new ArrayList<String>();
		}
	
		
		 
		public String checkSingular(tag) {
			
			for(i=0; i<singularList.length; i++) {
				if(singularList[i] == tag) {
					return "This is a singular tag and you've used it more than once! ";
				}
				
				
			}
			singularList.add(tag);
			return "";
		 
		 
		 
		 
		}
		 
		 
}