
		/*
		 *	input(tagID) = each id used for tags in the file
		 *	output(string) = the error message
		 *
		 *	Description : The function takes each tag's ID as an input and returns a best
		 *	practice error if identical ID's are used for different tags.
		 *
		 */
		 
public void class SingularID {
	List<String> singularIDList;
	
	
		public void initSingularIDList() {
			List<String> singularIDList = new ArrayList<String>();
		}
	
	
		 
		public String checkIDSingular(tagID) {
			
			for(i=0; i<singularIDList.length; i++) {
				if(singularIDList[i] == tagID) {
					return "This id has already been used in the file. To fix this, use unique ids! ";
				}
				
			
			}
			singularIDList.add(tag);
			return "";
		 
		 
		 
		 
		 
		}
		 
		 
}