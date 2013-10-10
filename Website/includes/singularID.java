package com.htmlthor;import java.util.*;
		/*
		 *	input(tagID) = each id used for tags in the file
		 *	output(string) = the error message
		 *
		 *	Description : The function takes each tag's ID as an input and returns a best
		 *	practice error if identical ID's are used for different tags.
		 *
		 */
		 
public class SingularID {
	private List<String> singularIDList;
	
	
		public SingularID() {
			singularIDList = new ArrayList<String>();
		}
	
	
		 
		public String checkIDSingular(String tagID) {
			
			for(int i=0; i<singularIDList.size(); i++) {
				if(singularIDList.get(i) == tagID) {
					return "This id has already been used in the file. To fix this, use unique ids! ";
				}
				
			
			}
			singularIDList.add(tagID);
			return "";
		 
		 
		 
		 
		 
		}
		 
		 
}