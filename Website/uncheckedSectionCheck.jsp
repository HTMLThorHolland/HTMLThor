<%@ page contentType="text/html; charset=UTF-8" language="java"
	import="java.*" errorPage=""%>
<%@ page import="java.io.*" %>
<%@ page import="java.util.*" %>
<%@ page import="java.util.zip.*" %>
<%@ page import="org.apache.commons.fileupload.*" %>
<%@ page import="org.apache.commons.fileupload.disk.*" %>
<%@ page import="org.apache.commons.fileupload.servlet.*" %>
<%@ page import="org.apache.commons.io.output.*" %>
<%@ page import="org.json.simple.JSONObject;" %>		
<%@include file="mysqlfunctions.jsp" %>


<html>
<head>
</head>
<body> 

<%!

	/**
	 * Class for accessing the character array of the line of the HTML file
	 * being parsed. 
	 *
	 * @author Ameer Sabri
	 */
	public class CharArray {
			
		private char[] charArray;
			
		/**
		 * Constructor for the CharArray.
		 */
		public CharArray(char[] charArray) {
			this.charArray = charArray;				
		}
				
		/**
		 * Returns the character at the index given.
		 *
		 * @param i the index of the character in the array.
		 * @return the character at the specified index.
		 */
		public char getChar(int i) {
			return charArray[i];
		}
				
		/**
		 * Returns the length of the CharArray.
		 *
		 * @return the length of the CharArray
		 */
		public int getLength() {
			return charArray.length;
		}
				
		/**
		 * Returns a String that returns the tag given between the string
		 * start and end index given in the array.
		 *
		 * @param tagStart the start index of the string
		 * @param tagEnd the end index of the string
		 * @return the string specified by the string's start and end index. 
		 */
		public String getString(int strStart, int strEnd) {
				
			StringBuilder str = new StringBuilder();
			
			/* Iterates through the array between the indices
			 * and adds each character to the tag string. 
			 */
			for(int j=strStart; j < (strEnd + 1); j++) {
				str.append(this.getChar(j));
			}
				
			return str.toString();
		}			
	}

%>
		<!-- This is the coding for the NEW error checking. Was commented out ---
		---- for the user testing as it contained errors and would not run. ---->
		
		<%
			boolean openTag = false;
			boolean closeTag =  false;
			boolean startComment = false;
			boolean whiteSpaceFlag = false;
			boolean selfClosing = false;
			boolean openAttr = false;
			int tagStart = 0;
			int attrStart = 0;
			String tag = null;
			
			String uploadType = request.getParameter("type");
			String directoryID = request.getParameter("dirid");
			List<String> fileContents = readUploadedFile(request.getParameter("path"));
			
			/* Iterates over the lines of the given file. */
			for (int i=0; i<fileContents.size(); i++) {

            	String nextLine = fileContents.get(i);
				
				/* Initialise the character array on the new line. */
				CharArray charArray = new CharArray(nextLine.toCharArray());
			
				// Import database list of valid tags
			
				//Check for open tags
				for(int j=0; j<charArray.getLength(); j++) {
					if(charArray.getChar(j)=='<') {
						openTag = true;
						tagStart = j+1;
						// Check if opened a comment tag
						if((charArray.getChar(j+1)=='!') && (charArray.getChar(j+2)=='-') && (charArray.getChar(j+3)=='-')) {
							startComment = true;
						}
					}
			
					// As long as a comment tag is not open, another tag is open and 
					// whitespace has not been reached to signal the end of the tag name:
					if ((startComment==false) && (openTag==true)) {
						if(whiteSpaceFlag==false) {
							if(charArray.getChar(j)==' ') {
								whiteSpaceFlag = true;
								tag = charArray.getString(tagStart, j-1);
								checkValidTag(tag);
								selfClosing = isSelfClosing(tag);
							}
						}
						else {
							if((charArray.getChar(j-1) == ' ') && (charArray.getChar(j) != ' ')) {
								if( (Character.isLetter(charArray.getChar(j))) == true) {
									attrStart = j;
									openAttr = true;
								}
							}
						}
					}
					
					/* Will need to be moved into the startComment==false if loop */
					/* Checks if attribute has been detected, need to check if
					 * having code such as <img src = "... (space between
					 * attribute and '=' validates). If so, will need to strip
					 * out whitespace after attribute name before throwing it
					 * into check. */
					if(charArray.getChar(j) == '=') {
						if(openAttr == true) {
							String attr = charArray.getString(attrStart, j-1);
							checkValidAttr(attr, tag);
						}
					}
					
					/* Will need to be moved into the startComment==false if loop */
					if(charArray.getChar(j)=='>') {
						/* Resets flag values and tag string */
						closeTag = true;
						openTag = false;
						tag = null;
						// Check if comment tag closed
						if((charArray.getChar(j-1)=='-') && (charArray.getChar(j-2)=='-') && (startComment==true)) {
							startComment = false;
						}
						else if (selfClosing) { 						
							if(charArray.getChar(j-1) != '/') {
								//return notSelfClosedError;
							}
							selfClosing = false;
						}
						
					}	
					
				}
			}
			%>			
			<%
			
			/**
			 * Checks if the given tag exists and returns a boolean value.
			 *
			 * @param tag the tag being checked
			 * @return <code>true</code> if the tag exists; <code>false</code>
			 * otherwise
			 */
			public boolean existingTag(String tag) {
				ArrayList<String> tagList = getTags();
				if(tagList.contains(tag)) {
					return true;
				}
				else {
					return false;
				}
			}
			
			/**
			 * Checks if the given tag is deprecated and returns a boolean value.
			 *
			 * @param tag the tag being checked
			 * @return <code>true</code> if the tag is deprecated; 
			 * <code>false</code> otherwise
			 */
			public boolean deprecatedTag(String tag) {
				return isDeprecated(tag);
			}
			
			/**
			 * Checks if the given tag is singular, and if so, if it has already
			 * been entered.
			 *
			 * @param tag the tag being checked
			 * @return <code>true</code> if the tag is singular and has already been added; 
			 * <code>false</code> otherwise
			 */
			public boolean singularTagExists(String tag) {
				//if the given tag is a singular tag and has already been entered
				return true;
				
				//else return false;
			}
			
			/**
			 * Checks the tag given against a number of validity checks.
			 * @param tag the name of the tag to be checked
			 */
			public void checkValidTag(String tag) {
				if (!existingTag(tag)) {
				//	return NonExistentTagError;
				}
				else if(deprecatedTag(tag)) {
				//	return DeprecatedTagError;
				}
				else if(singularTagExists(tag) {
				// return DuplicateSingularTagError;
				}
			}
			
			/**
			 * Takes the attribute given and checks whether it is valid.
			 * @param attr the name of the attribute to be checked
			 * @param tag the name of the tag the attribute is part of
			 */
			public void checkValidAttr(String attr, String tag) {
				//fetch list of valid attributes for the given tag
				//if attribute not in list of valid attributes
				// return NonExistentAttrError;
			}
			/**
			 * Takes the value given, and checks whether the value entered
			 * is correct for the attribute associated with the value.
			 * DATABASE NEEDS ATTRIBUTE TABLE, WILL GET CREATED SOON - Ameer
			 * 
			 * Cannot be done until we have an attribute table, and functions
			 * to fetch the variables needed.
			 *
			 * @param attr the name of the attribute associated with the value
			 * @param value the value to be checked
			 */
			public void validAttrValue(String attr, String value) {
				
			}	
%>
</body>
</html>