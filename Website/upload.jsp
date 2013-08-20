<%@ page contentType="text/html; charset=UTF-8" language="java"
	import="java.*" errorPage=""%>
<%@ page import="java.io.*" %>
<%@ page import="java.util.*" %>
<%-- This is the base jsp file that runs the file upload method.
	 It requires the HTML form section to have ENCTYPE="multipart/form-data" ACTION="upload.jsp" METHOD=POST --%>
	 
<html>
<head>
</head>
<body> 
	 
	
	<%!public List<String> readUploadedFile(String filename) {
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
		%>
	
	
	
<%--
	System.out.println("loaded the page");
    String saveFile = "";
    String contentType = request.getContentType();
	  
    if ((contentType != null) && (contentType.indexOf("multipart/form-data") >= 0)) {
        DataInputStream in = new DataInputStream(request.getInputStream());
        int formDataLength = request.getContentLength();
        byte dataBytes[] = new byte[formDataLength];
        int byteRead = 0;
        int totalBytesRead = 0;
        while (totalBytesRead < formDataLength) {
            byteRead = in.read(dataBytes, totalBytesRead, formDataLength);
            totalBytesRead += byteRead;
        }
        String file = new String(dataBytes);
        saveFile = file.substring(file.indexOf("filename=\"") + 10);
        saveFile = saveFile.substring(0, saveFile.indexOf("\n"));
        saveFile = saveFile.substring(saveFile.lastIndexOf("\\") + 1, saveFile.indexOf("\""));
        int lastIndex = contentType.lastIndexOf("=");
        String boundary = contentType.substring(lastIndex + 1, contentType.length());
        int pos;
        pos = file.indexOf("filename=\"");
        pos = file.indexOf("\n", pos) + 1;
        pos = file.indexOf("\n", pos) + 1;
        pos = file.indexOf("\n", pos) + 1;
        int boundaryLocation = file.indexOf(boundary, pos) - 4;
        int startPos = ((file.substring(0, pos)).getBytes()).length;
        int endPos = ((file.substring(0, boundaryLocation)).getBytes()).length;
        saveFile = "C:/testy/" + saveFile;
        File ff = new File(saveFile);
        FileOutputStream fileOut = new FileOutputStream(ff);
        fileOut.write(dataBytes, startPos, (endPos - startPos));
        fileOut.flush();
        fileOut.close();
			
--%>		
	
	
			
			<%-- Now that the file has been saved appropriately, open the same file (could just reference an earlier component before flushing and closing but it might be best to copy it over first) 
			 and read in the file line by line using java.io.BufferedReader: 
			
		BufferedReader lineRead = new BufferedReader(new FileReader("/" + saveFile));
		String singleLine = "";
		while((singleLine = lineRead.readLine()) != null) {
			//run function to parse each line for tags (tagParse) 
			lineParse(singleLine);
			}
			
			
		public void lineParse(String singleLine) {
		char carr[] = singleLine.toCharArray(); <!-- convert the string to an array of characters for tag checking --!>
			BOOLEAN beginTag = FALSE;
			BOOLEAN endTag = FALSE;
			int beginIndex = 0;
			
			
			for(int i = 0; (i < carr.length); i++) {
				if((carr[i] == "<")&&(endTag == FALSE)){
				beginTag =  TRUE;
				beginIndex = i+1; 
			}
				
				if((carr[i] == ">")&&(beginTag == TRUE)) {
					endTag =  TRUE;
					beginTag = FALSE;
					List<String> tarr = new ArrayList<String>(); 
					// (i - beginIndex) will give the length of the tag, then a loop needs to extract every character into a separate array to be checked in another function? --!>
				for(int j = (i-beginIndex); (j < i); j++) {
					tarr.add(carr[j]);
						<!--  note that this is an ArrayList, not an array, may need to use .toArray later --!>
						tagParse(tarr);
					}
					
					
				}
			
			
			}
			
		
		public void tagParse(tarr) {
			//split by whitespace, grab original tag word, check that for errors, then move on to similar methods for any and all listed attributes of the tag --!>
		
		}
--%>

<br />
<div>
            <%
            	List<String> fileContents = readUploadedFile(getServletContext().getRealPath("/").concat(request.getParameter("path")));
            	for (int i = 0; i < fileContents.size(); i++) {
            	
            		String tempLine = fileContents.get(i);
            		tempLine = tempLine.replaceAll("<", "&lt;");
            		tempLine = tempLine.replaceAll(">", "&gt;");
            		out.println(tempLine.concat("<br />"));
                }
            %>
            
            </div>
</body>
</html>