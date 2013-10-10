package com.htmlthor;import java.util.*;
		/*
		 *	input(tag) = each singular tag in the file
		 *	output(string) = the error message 
		 *
		 *	Description : The function takes each singular tag as an input, adding it to a list, if
		 *	there is more than one instance of a singular tag in the list, return an error.
		 *
		 */

public class SingularTags {
	private List<String> singularList;
	
		public SingularList() {
			singularList = new ArrayList<String>();
		}
	
		
		 
		public String checkSingular(String tag) {
			
			for(int i=0; i<singularList.size(); i++) {
				if(singularList.get(i) == tag) {
					return "This is a singular tag and you've used it more than once! ";
				}
				
				
			}
			singularList.add(tag);
			return "";
		 
		 
		 
		 
		}
		 
		 
}