<%@ page contentType="text/html; charset=UTF-8" language="java"
	import="java.*" errorPage=""%>
<%@ page import="java.io.*" %>
<%@ page import="java.util.*" %>
<%@ page import="org.json.simple.JSONObject;" %>
<%-- This is the base jsp file that runs the file upload method.
	 It requires the HTML form section to have ENCTYPE="multipart/form-data" ACTION="upload.jsp" METHOD=POST --%>
	 
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
            
            
   List<String> fileContents = readUploadedFile(request.getParameter("path"));
   				String fileparam = request.getParameter("path");
            	String[] filestring = fileparam.split("/");
            	String filename = filestring[filestring.length-1];
                
                JSONObject jsonFile = findErrors(fileContents);
                jsonFile.put("filename", filename);
                JSONObject json = new JSONObject();
                json.put("0", jsonFile);
                
                
                
                Cookie cookie = new Cookie("jsonObjectHtml", json.toString());
                response.addCookie(cookie);
                
                
                String redirectURL = "index.html";
   		 		response.sendRedirect(redirectURL);
   		 		
            %>
            
            
            </div>
</body>
</html>