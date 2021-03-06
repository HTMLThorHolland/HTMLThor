<%@ page contentType="text/html; charset=UTF-8" language="java" import="java.*" errorPage="" %>
<%@ page import="java.io.*" %>
<%@ page import="java.util.*" %>
<%@ page import="java.util.zip.*" %>
<%@ page import="org.apache.commons.fileupload.*" %>
<%@ page import="org.apache.commons.fileupload.disk.*" %>
<%@ page import="org.apache.commons.fileupload.servlet.*" %>
<%@ page import="org.apache.commons.io.output.*" %>
<%@ page import="com.htmlthor.*" %>
<%@ page import="org.json.simple.JSONObject;" %>
	 
<html>

<head>

</head>

<body>
 
	 
	 
	
	
<%!
	/**
	 * Reads a file into a list of strings
	 */
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
				lines.add(" ".concat(tempLine).concat(" "));
			}
		} catch (Exception e) {
			lines.add(e.getMessage());
			return lines;
		}
		return lines;
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
            		
   		 			SectionCheck sc = new SectionCheck();
   		 			
   		 			sc.addFilePath(filename);
   		 			
                	JSONObject jsonFile = new JSONObject();
               		JSONObject jsonErrors = sc.findErrors(fileContents);
               		JSONObject jsonSource = new JSONObject();
               		for (int i = 0; i < fileContents.size(); i++) {
               			jsonSource.put(i, fileContents.get(i));
               		}
               		jsonSource.put("length", fileContents.size());
                	jsonFile.put("filename", filename);
                	jsonFile.put("source", jsonSource);
                	jsonFile.put("errors", jsonErrors);
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
					
            		json.put("filecount", 1);
                	
                	request.getSession(true);
                	Cookie cookie = new Cookie("dirPath", directoryPath);
                	response.addCookie(cookie);
                
                	String redirectURL = "http://htmlthor.com#validated";
                	response.sendRedirect(response.encodeRedirectURL(redirectURL));
   		 		}
   		 		
   		 		
   		 		/* ================ SINGLE FILE CHECKING END ================
				** ========================================================== */
   		 		
   		 		/* ================ MULTI FILE CHECKING START ===============
				** ========================================================== */
            	
            	if (uploadType.equals("multi")) {
   					
   					String fileparam = request.getParameter("path");
   					String[] filenames = fileparam.split(",");
                	JSONObject json = new JSONObject();
   					for (int j = 0; j < filenames.length; j++) {
            			String[] filestring = filenames[j].split("/");
            			String filename = filestring[filestring.length-1];
            		
            			List<String> fileContents = readUploadedFile(filenames[j]);
            		
   		 				SectionCheck sc = new SectionCheck();
   		 				
   		 				sc.addFilePath(filename);
   		 				
                		JSONObject jsonFile = new JSONObject();
               			JSONObject jsonErrors = sc.findErrors(fileContents);
               			JSONObject jsonSource = new JSONObject();
               			for (int i = 0; i < fileContents.size(); i++) {
               				jsonSource.put(i, fileContents.get(i));
               			}
               			jsonSource.put("length", fileContents.size());
                		jsonFile.put("filename", filename);
                		jsonFile.put("source", jsonSource);
                		jsonFile.put("errors", jsonErrors);
                		json.put(Integer.toString(j), jsonFile);
                	}
                
            		json.put("filecount", filenames.length);
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
					
                	
                	request.getSession(true);
                	Cookie cookie = new Cookie("dirPath", directoryPath);
                	response.addCookie(cookie);
                
                	String redirectURL = "http://htmlthor.com#validated";
                	response.sendRedirect(response.encodeRedirectURL(redirectURL));
   		 		}
   		 		
   		 		
   		 		/* ================ MULTI FILE CHECKING END =================
				** ========================================================== */
   		 		
   		 		
   		 		
   		 		/* ================ ZIP FILE CHECKING START =================
				** ========================================================== */
   		 		
   		 		else if (uploadType.equals("zip")) {
   		 		
   		 		
   		 			String debugString = "";
   		 		
   		 			// initialize variables needed for reading the zip
   		 			JSONObject dirJSON = new JSONObject();
   		 			SectionCheck sc = new SectionCheck();
   		 			ZipInputStream zipInput = new ZipInputStream(new FileInputStream(request.getParameter("path")));
            			
            		ZipEntry temp = null;
            		StringBuilder s = new StringBuilder();
					byte[] buffer = new byte[1024];
					int read = 0;
					int fileCount = 0;
					JSONObject json = new JSONObject();
					
					List<String> fileNames = new ArrayList<String>();
					List<List<StructureBreakdown>> structList = new ArrayList<List<StructureBreakdown>>();
					int maxLevel = 0;
					
					
					String[] pathSplit = request.getParameter("path").split("/");
					String path = pathSplit[pathSplit.length-1];
					
					// generate root folder for structure breakdown
					StructureBreakdown root = new StructureBreakdown();
					root.setName(path.substring(0, path.length()-4));
					root.setType("folder");
					root.setPath(path.substring(0, path.length()-4));
					
					// process each entry in the zip file
            		while ((temp = zipInput.getNextEntry()) != null) 
            		{
             			
      					StructureBreakdown fileStruct = new StructureBreakdown();
      					
      					
      					
      					// split into directories and filename
      					String[] filePathSplit = temp.getName().split("/");
      					boolean ignoreFile = false;
      					if (Arrays.asList(filePathSplit).contains("__MACOSX")) {
      						ignoreFile = true;
      					}
      					
      					if (filePathSplit.length > maxLevel && !ignoreFile) {
      						// add more lists to the structure list for the new levels
      						while (filePathSplit.length > maxLevel) {
      							List<StructureBreakdown> levelList = new ArrayList<StructureBreakdown>();
      							structList.add(levelList);
      							maxLevel++;
      						}
      					}
      					
      					if (!ignoreFile) {
             				fileStruct.setName(filePathSplit[filePathSplit.length-1]);
             				fileStruct.setPath(path.substring(0, path.length()-4).concat("/").concat(temp.getName()));
             			}
             			
             			
             			// read next file contents
             			while ((read = zipInput.read(buffer, 0, 1024)) >= 0) {
           					s.append(new String(buffer, 0, read));
      					}
      					
      					// process the file if it's not a directory
      					if (!temp.isDirectory() && !ignoreFile) {
      						fileStruct.setType("file");
      					
      						// ensure the file is a .html or .php
      						if ((temp.getName().toLowerCase().indexOf(".html") == temp.getName().toLowerCase().length() - 5) || (temp.getName().indexOf(".php") == temp.getName().length() - 4)) {
      							// NEED TO CHECK FOR FILE TYPE HERE TO MAKE SURE ONLY HTML IS PROCESSED
      							String str = s.toString().replaceAll("\r", "");
      							String[] tempSourceArr = str.split("\n");
      							List<String> fileContents = new ArrayList<String>();
      							for (int i = 0; i < tempSourceArr.length; i++) {
     								fileContents.add(" ".concat(tempSourceArr[i]).concat(" "));
      							}
      							fileStruct.addSource(fileContents);
                			}
                			
                			
                			// Add to list of files that could avoid broken links errors
      						fileNames.add(temp.getName());
                			
                		} else {
                		// is a directory
                			if (!ignoreFile) {
      							fileStruct.setType("folder");
                			}
                		}
                		s = new StringBuilder();
                		
                		if (!ignoreFile) {
                		
                			int thisFileLevel = filePathSplit.length-1;
                			
                			((ArrayList)structList.get(thisFileLevel)).add(fileStruct);  
                		
                			debugString = debugString + "Adding: " + temp.getName() + " to level " + Integer.toString(thisFileLevel) + " --- \n";
                		}
                				
            		}
            		
            		sc.addAssociatedFiles(fileNames);
            		
            		
            		
            		for (int i = 0; i < structList.size(); i++) {
            			for (int j = 0; j < ((ArrayList)structList.get(i)).size(); j++) {
            				
            				StructureBreakdown thisStruct = (StructureBreakdown)((ArrayList)structList.get(i)).get(j);
            				String structFilePath = thisStruct.getFullPath();
            				List<String> fileContents = thisStruct.getSource();
            				
            				debugString = debugString + " --- " + structFilePath;
            				
            				int brokenLinks = 0;
            				
            				if (fileContents != null) {
            					JSONObject jsonTemp = new JSONObject();
      						
      							sc.addFilePath(structFilePath.substring(structFilePath.indexOf('/')+1));
      						
               					JSONObject jsonErrors = sc.findErrors(fileContents);
               					JSONObject jsonSource = new JSONObject();
               					for (int k = 0; k < fileContents.size(); k++) {
               						jsonSource.put(k, fileContents.get(k));
               					}
               					jsonSource.put("length", fileContents.size());
                				jsonTemp.put("filename", structFilePath.replaceAll(" ", "_"));
                				jsonTemp.put("source", jsonSource);
                				jsonTemp.put("errors", jsonErrors);
      							
                				json.put(Integer.toString(fileCount), jsonTemp);
                				fileCount++;
                				
                				
            					brokenLinks = sc.getBrokenLinks();
            				}
            				
            				thisStruct.setBrokenLinks(brokenLinks);
            				
                			StructureBreakdown prevStruct = root;
                			StructureBreakdown parentStruct = root;
                			
                			String[] filePathSplit = structFilePath.split("/");
                		
                			try {
                		
                			for (int k = 1; k < filePathSplit.length-1; k++) {
                				prevStruct = parentStruct;
                				parentStruct = parentStruct.getSubfile(filePathSplit[k]);
                			}
                		
                			parentStruct.addSubfile(filePathSplit[filePathSplit.length-1], thisStruct);
                			
                			} catch (NullPointerException ex) {
                				throw new RuntimeException(debugString);
                			}
                		
            			}
            		}
            		
            		
            		
            		
            		
            		// RUN THROUGH CHECKING CODE ETC DOWN HERE!
            		//
            		
            		json.put("filecount", fileCount);
            		
            		
            		String directoryPath = getServletContext().getRealPath("/").concat("temp/")
					.concat(directoryID).concat("/");
 					String errFilePath = directoryPath.concat("errors.json");
 					String dirFilePath = directoryPath.concat("directory.json");
                                	
					FileWriter errFile = new FileWriter(errFilePath);
					errFile.write(json.toJSONString());
					errFile.flush();
					errFile.close();
						
					FileWriter dirFile = new FileWriter(dirFilePath);
					dirFile.write(root.toJSON().toJSONString());
					dirFile.flush();
					dirFile.close();
               	
               
               		Cookie cookie = new Cookie("dirPath", directoryPath);
               		response.addCookie(cookie);
               
               
               		String redirectURL = "http://htmlthor.com#validated";
   		 			response.sendRedirect(redirectURL);
       				
   		 		}
   		 		
   		 		/* ================ ZIP FILE CHECKING END ===================
				** ========================================================== */
   		 		
%>
            
            
</div>
</body>
</html>