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

	 
<html>
<head>
</head>
<body> 
	 
	 
	
	
	<%!
	
	public List<String> readUploadedFile(String filename) {
		BufferedReader br = null;
		String tempLine = null;
		List<String> lines = new ArrayList<String>();
		try {
			br = new BufferedReader(new InputStreamReader(new FileInputStream(
					filename)));
		} catch (Exception e) {
			lines.add(e.getMessage());
			return lines;
		}
		//Have opened the file okay
		
		try {
			while ((tempLine = br.readLine()) != null) {
				lines.add(tempLine);
			}
		} catch (Exception e) {
			lines.add(e.getMessage());
			return lines;
		}
		return lines;
	}
		
		
	// returns 1 if valid comment tag
	// returns 2 if invalid comment tag (unended)
	// Why is this code up here?
	public int isComment(String tag) {
		int startIndex = tag.indexOf("<!--");
		int endIndex = tag.indexOf("-->");
		
		if (startIndex == 0) {
			return 2;
		}
		return 0;
	}
	
	/** 
	 * Class for storing string representations of various errors and
	 * final variables for easy reference.
	 *
	 * Only HTML code validation errors; other errors should be in other places.
	 *
	 * Not sure what form they should be (Strings, ints, some custom Object...)
	 *
	 * @author Ameer Sabri
	 */
	public class Error {
		/* Declarations of static error variables used by the class. */
		public static final int DEPRECATED_TAG;
		public static final int NON_EXISTENT_TAG;
		public static final int DUPLICATE_SINGULAR_TAG;
		public static final int FORM_TAG_OUT_OF_FORM;
		public static final int TABLE_TAG_OUT_OF_TABLE;
		public static final int MISSING_REQUIRED_TAG;
		public static final int NOT_CLOSED_TAG;
		public static final int FRAME_USED;
		public static final int TABLE_USED_FOR_LAYOUT;
		public static final int MISSING_DOCTYPE;
		
		public static final int NON_EXISTENT_ATTR;
		public static final int BAD_ATTR_VALUE;
		public static final int DUPLICATE_ATTR;
		public static final int MISSING_ATTR;
		
		int errorCode;
		String errorMsg;
		
		/**
		 * Constructor for Errors that are not associated with a particular
		 * tag or attribute.
		 *
		 * @param errorCode the error code
		 */
		public Error(int errorCode) {
			this.errorCode = errorCode;
			errorMsg = createErrorMsg(errorCode);
		}
		
		/**
		 * Constructor for Errors that are associated with a particular tag or
		 * attribute.
		 *
		 * @param errorCode the error code
		 * @param tagOrAttr the name of the tag or attribute
		 */
		public Error(int errorCode, String tagOrAttr) {
			this.errorCode = errorCode;
			errorMsg = createErrorMsg(errorCode, tagOrAttr);
		}
		
		/**
		 * Getter for the error message of the Error.
		 *
		 * @return the error message
		 */
		public String getErrorMsg() {
			return errorMsg;
		}
		
		/**
		 * Getter for the error code of the Error.
		 *
		 * @return the error code
		 */
		public int getErrorCode() {
			return errorCode;
		}
		
		/**
		 * Constructs an appropriate error message for the error code given,
		 * using the tag or attribute given, and adding it with the error
		 * message template.
		 *
		 * @param errorCode the error code
		 * @param tagOrAttr the name of the tag or attribute
		 * @return an appropriate error message utilising the name of the
		 * tag or attribute
		 */
		private String createErrorMsg(int errorCode, String tagOrAttr) {
			switch {
				/* will contain all the various error messages */
			}
			
			return ""; //placeholder
		}
		
		/**
		 * Overloaded method for construction of error messages that are not
		 * associated with a particular tag or attribute.
		 *
		 * @return an appropriate error message
		 */
		private String createErrorMsg(int errorCode) {
			createErrorMsg(errorCode, "");
		}
	}
	
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
	
	// Takes the source code as a string and returns a complete JSONObject
	// with source code as well as all errors found in the code
	public JSONObject findErrors(List<String> fileContents) {
	
		JSONObject json = new JSONObject();
		JSONObject errors = new JSONObject();
		JSONObject sourceLines = new JSONObject();
	
		String sourceCode = "";
		sourceLines.put("length", fileContents.size());
        for (int i = 0; i < fileContents.size(); i++) {
            String tempLine = fileContents.get(i);
            sourceLines.put(Integer.toString(i), tempLine);
            sourceCode = sourceCode.concat(tempLine);
        }
	
		json.put("source", sourceLines);
		
		String checkedCode = "";
		
		// do the error processing here
		int errorCount = 0;
		int tagCount = 0;
		int tagStartIndex = sourceCode.indexOf("<"); // finds first tag
		int tagEndIndex;
		String tag;
		while (tagStartIndex != -1) {
			// keeps looping until no "<" are left
			
		
			// -------------------------------------------------------------------------------------
			// --------------- CHECKING COMMENT IN THIS SECTION ------------------------------------
			// -------------------------------------------------------------------------------------
			
			if (sourceCode.indexOf("<!--") == tagStartIndex) {
				// ------- IGNORE THIS FOR NOW ---------
				// tag is start of a comment
				// find comment ending tag
				// ------- This needs to be done -------
			}
			
			// -------------------------------------------------------------------------------------
			// --------------- COMMENT CHECK FINISHED ----------------------------------------------
			// -------------------------------------------------------------------------------------
		
			// first ">" after "<" - not fool proof
			tagEndIndex = sourceCode.indexOf(">", tagStartIndex);
			
			
			// all code before current tag stored in checkedCode
			checkedCode = checkedCode.concat(sourceCode.substring(0, tagStartIndex));
			
			// basically anything between "<" and ">"
			tag = sourceCode.substring(tagStartIndex+1, tagEndIndex);
			String[] tagSplit = tag.split("\\s+"); // splits by whitespace
			
			
			
			
			// -------------------------------------------------------------------------------------
			// --------------- CHECKING DOCTYPE IN THIS SECTION ------------------------------------
			// -------------------------------------------------------------------------------------
			
			if (tagCount == 0) {
			// first tag should be doctype
				int errorCheck = checkDoctype(tagSplit);
				if (errorCheck == 1) {
					JSONObject error = new JSONObject();
					error.put("line", 1);
					error.put("col", 1);
					error.put("type", tagSplit[0]); // retrieve from DB
					error.put("message", "First element should be doctype"); // retrieve from DB
					errors.put(Integer.toString(errorCount), error);
					errorCount++;
				}
				if (errorCheck == 2) {
					JSONObject error = new JSONObject();
					error.put("line", 1);
					error.put("col", 1);
					error.put("type", tag); // retrieve from DB
					error.put("message", "Your doctype is not HTML 5"); // retrieve from DB
					errors.put(Integer.toString(errorCount), error);
					errorCount++;
				}
			}
			
			// -------------------------------------------------------------------------------------
			// --------------- DOCTYPE CHECK FINISHED ----------------------------------------------
			// -------------------------------------------------------------------------------------
			
			
			
			// removes anything up to and including the tag we just checked
			sourceCode = sourceCode.substring(tagEndIndex+1);
			
			// searches for start of next tag before looping
			tagStartIndex = sourceCode.indexOf("<");
			tagCount++;
		}
		
		errors.put("count", errorCount);
		json.put("errors", errors);
		
		return json;
	}
	
	
	// checks whether the first tag is a valid HTML5 doctype declaration
	// returns 0 if no error
	// returns 1 if not doctype
	// returns 2 if not HTML5 doctype
	private int checkDoctype(String[] firstTag) {
		if (firstTag.length > 0) {
			if (!firstTag[0].equals("!DOCTYPE")) {
				return 1;
			}
			else {
				if (firstTag.length != 2) {
					return 2;
				}
				else {
					if (!firstTag[1].equals("html")) {
						return 2;
					}
				}
			}
			return 0;
		}
		return 0;
	}
		
	%>
	
	
	
	<br />
	<div>
	
            <%
            	String uploadType = request.getParameter("type");
            	String directoryID = request.getParameter("dirid");
            	
            	/* ================ SINGLE FILE CHECKING START ==============
				** ========================================================== */
            	
            	if (uploadType.equals("single")) {
   					List<String> fileContents = readUploadedFile(request.getParameter("path"));
   					String fileparam = request.getParameter("path");
            		String[] filestring = fileparam.split("/");
            		String filename = filestring[filestring.length-1];
                
               		JSONObject jsonFile = findErrors(fileContents);
                	jsonFile.put("filename", filename);
                	JSONObject json = new JSONObject();
                	json.put("0", jsonFile);
                
                
 					String directoryPath = getServletContext().getRealPath("/").concat("temp/")
						.concat(directoryID).concat("/");
 					String outFilePath = directoryPath.concat("errors.json");
                
                	try {
 					
						FileWriter file = new FileWriter(outFilePath);
						file.write(json.toJSONString());
						file.flush();
						file.close();
 
					} catch (IOException e) {
						e.printStackTrace();
					}
                	
                
                	Cookie cookie = new Cookie("dirPath", directoryPath);
                	response.addCookie(cookie);
                
                
                	String redirectURL = "http://www.htmlthor.com";
   		 			response.sendRedirect(redirectURL);
   		 		}
   		 		
   		 		
   		 		/* ================ SINGLE FILE CHECKING END ================
				** ========================================================== */
   		 		
   		 		
   		 		/* ================ ZIP FILE CHECKING START =================
				** ========================================================== */
   		 		
   		 		else if (uploadType.equals("zip")) {
   		 		
   		 			JSONObject dirJSON = new JSONObject;
   		 				
   		 			ZipInputStream zipInput = new ZipInputStream(new FileInputStream(request.getParameter("path")));
      				try	{
            			ZipEntry temp = null;
            			StringBuilder s = new StringBuilder();
						byte[] buffer = new byte[1024];
						int read = 0;
						int fileCount = 0;
						JSONObject json = new JSONObject();
						// process each entry in the zip file
            			while ((temp = zipInput.getNextEntry()) != null ) 
            			{
             				
             				while ((read = zipInput.read(buffer, 0, 1024)) >= 0) {
           						s.append(new String(buffer, 0, read));
      						}
      						if (!temp.isDirectory()) {
      						// process the file if it's not a directory
      						// NEED TO CHECK FOR FILE TYPE HERE TO MAKE SURE ONLY HTML IS PROCESSED
      							String[] tempSourceArr = s.toString().split("\n");
      							List<String> fileContents = new ArrayList<String>();
      							for (int i = 0; i < tempSourceArr.length; i++) {
     								fileContents.add(tempSourceArr[i]);
      							}
      						
      							JSONObject jsonTemp = findErrors(fileContents);
                				jsonTemp.put("filename", temp.getName());
      						
                				json.put(Integer.toString(fileCount), jsonTemp);
                				fileCount++;
                			}      						
            			}
            			
            			
            			String directoryPath = getServletContext().getRealPath("/").concat("temp/")
						.concat(directoryID).concat("/");
 						String errFilePath = directoryPath.concat("errors.json");
 						String dirFilePath = directoryPath.concat("directory.json");
                
                	
						FileWriter errFile = new FileWriter(errFilePath);
						errFile.write(json.toJSONString());
						errFile.flush();
						errFile.close();
							
						FileWriter dirFile = new FileWriter(dirFilePath);
						dirFile.write(dirJSON.toJSONString());
						dirFile.flush();
						dirFile.close();
                	
                
                		Cookie cookie = new Cookie("dirPath", directoryPath);
                		response.addCookie(cookie);
                
                
                		String redirectURL = "http://www.htmlthor.com";
   		 				response.sendRedirect(redirectURL);
       				} catch(Exception ex) {
       					out.println(ex.getMessage()); 
       				}
       				
   		 		}
   		 		
   		 		/* ================ ZIP FILE CHECKING END ===================
				** ========================================================== */
   		 		
            %>
            
            <%
			boolean openTag = false;
			boolean closeTag =  false;
			boolean startComment = false;
			boolean whiteSpaceFlag = false;
			boolean selfClosing = false;
			boolean openAttr = false;
			int tagStart = 0;
			int attrStart = 0;
			String tag = '';
			
			/* Iterates over the lines of the given file. */
			for (int i=0; i<fileContents.size(); i++) {
            	String nextLine = fileContents.get(i);
				
				/* Initialise the character array on the new line. */
				CharArray charArray = new CharArray(nextLine.toCharArray());
			
				// Import database list of valid tags
			
				for(j=0; j<charArray.getLength(); j++) {
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
								if(isSelfClosing(tag)) {
									selfClosing = true;
								}
							}
						}
						else {
							if((charArray.getChar(j-1) == ' ') && (charArray.getChar(j) != ' ')) {
								if(Character.isLetter(charArray.getChar(j) == true) {
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
						tag = '';
						// Check if comment tag closed
						if((charArray.getChar(j-1)=='-') && (charArray.getChar(j-2)=='-') && (startComment==true)) {
							startComment = false;
						}
						else if(selfClosingTag) { 						
							if(charArray.getChar(j-1) != '/') {
								//return notSelfClosedError;
							}
							selfClosing = false;
						}
						
					}	
					
				}
			}	
			%>
			
			<%!
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
				//return true;
				
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
            </div>
</body>
</html>