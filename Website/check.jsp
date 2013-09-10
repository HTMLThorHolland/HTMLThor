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
	public int isComment(String tag) {
		
		
		int startIndex = tag.indexOf("<!--");
		int endIndex = tag.indexOf("-->");
		
		if (startIndex == 0) {
			return 2;
		}
		return 0;
	}
	
	/**
	 * Class for accessing the character array of the line of the HTML file
	 * being parsed. 
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
				 * Returns a String that returns the tag given between the tag
				 * start and end index given.
				 *
				 * @param tagStart the start index of the tag
				 * @param tagEnd the end index of the tag
				 * @return the tag specified by the tag's start and end index. 
				 */
				public String getTag(int tagStart, int tagEnd) {
				
					StringBuilder tagName = new StringBuilder();
					
					/* Iterates through the array between the indices
					 * and adds each character to the tag string. 
					 */
					for(int j=tagStart; j < (tagEnd + 1); j++) {
						tagName.append(this.getChar(j));
					}
					
					return tagName.toString();
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
			int tagStart = 0;
			int tagEnd = 0;

			for (int i = 0; i < fileContents.size(); i++) {
            	String nextLine = fileContents.get(i);
						
			CharArray charArray = new CharArray(nextLine.toCharArray());
			// char[] charArray = nextLine.toCharArray();
			
			// Import database list of valid tags
			
			for(i=0; i<charArray.getLength(); i++) {
				if(charArray.getChar(i)=='<') {
					openTag = true;
					tagStart = i+1;
					// Check if opened a comment tag
					if((charArray.getChar(i+1)=='!')&&(charArray.getChar(i+2)=='-')&&(charArray.getChar(i+3)=='-')) {
						startComment = true;
					}
				}
			
				if(charArray.getChar(i)=='>') {
					closeTag = true;
					openTag = false;
					// Check if comment tag closed
					if((charArray.getChar(i-1)=='-')&&(charArray.getChar(i-2)=='-')&&(startComment==true)) {
						startComment = false;
					}
				}	
					
				// As long as a comment tag is not open, another tag is open and 
				// whitespace has not been reached to signal the end of the tag name:
				if ((startComment==false)&&(openTag==true)&&(whiteSpaceFlag==false)) {
					if(charArray.getChar(i)==' ') {
						whiteSpaceFlag = true;
						tagEnd = i-1;
						//checkTag(tagStart, tagEnd);
					}
				}
				
				
			}
			}	
			%>
			
			<%!			
			//public String checkTag(int tagStart, int tagEnd) {
				
				//String tagName = charArray.getTag(tagStart, tagEnd);
				
				// Check to see if string tagName is in the array of tag strings
				// (that we got earlier from the database)
				
				// If it is valid:
				//if(isDeprecated(tagName)) {
					//return DeprecatedError
				//}
				//if(requiresAttr(tagName)) {
					//AttrList = getAttr(tagName);
					//checkAttributes(ArrayList); 
				//}
				
				
				// If it isn't valid:
				//return sexyerror;
				
	
			}
				
			
				
			%>
            </div>
</body>
</html>