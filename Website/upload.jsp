<%@ page import="java.io.*,java.util.*, javax.servlet.*, java.util.zip.*" %>
<%@ page import="javax.servlet.http.*" %>
<%@ page import="java.net.*" %>
<%@ page import="org.apache.commons.fileupload.*" %>
<%@ page import="org.apache.commons.fileupload.disk.*" %>
<%@ page import="org.apache.commons.fileupload.servlet.*" %>
<%@ page import="org.apache.commons.io.output.*" %>


<%!

	// Generates an ID for the upload in the form of:
	// #####UUUUUlllll
	// where # is an integer, U is an uppercase letter, l is a lowercase letter
	public String generateID() {
		String newID = "";
		for (int i = 0; i < 5; i++) {
			newID = newID.concat(Integer.toString((int)(Math.random()*10)));
		}
		for (int i = 0; i < 5; i++) {
			newID = newID.concat(Character.toString((char)(65+((int)(Math.random()*25)))));
		}
		for (int i = 0; i < 5; i++) {
			newID = newID.concat(Character.toString((char)(97+((int)(Math.random()*25)))));
		}
		return newID;
	}

%>


<%

    request.getSession(true);
	String uploadType = request.getParameter("uploadType");
	
	System.out.println(uploadType);
	
    String directoryID = generateID();
    
    ServletContext context = pageContext.getServletContext();
	String filePath = getServletContext().getRealPath("/").concat("temp/")
			.concat(directoryID).concat("/");
			
	File directories = new File(filePath);
	directories.mkdirs();
	
	
	/* =============== ZIP FILE UPLOAD START ====================
	** ========================================================== */
	
	if (uploadType.equals("zip")) {
	
		out.println("Zip file upload started.");
		
		
    	
		
		File file ;
		int maxFileSize = 5000 * 1024;
		int maxMemSize = 5000 * 1024;
		
		
		
   
        
		// Verify the content type
		String contentType = request.getContentType();
		if ((contentType.indexOf("multipart/form-data") >= 0)) {

			DiskFileItemFactory factory = new DiskFileItemFactory();
    		// maximum size that will be stored in memory
    		factory.setSizeThreshold(maxMemSize);
    		
    		
    		// Location to save data that is larger than maxMemSize.
      		factory.setRepository(new File(getServletContext().getRealPath("/").concat("temp")
      			.concat("/").concat(directoryID)));

      		// Create a new file upload handler
      		ServletFileUpload upload = new ServletFileUpload(factory);
      		// maximum file size to be uploaded.
      		upload.setSizeMax( maxFileSize );
      		try{
      	
         		// Parse the request to get file items.
         		List fileItems = upload.parseRequest(request);
         		out.println("List of fileItems: " + fileItems);
            	out.println("Generated ID: " + directoryID);

         		// Process the uploaded file items
         		Iterator i = fileItems.iterator();

         		while ( i.hasNext () ) {
            		FileItem fi = (FileItem)i.next();
            		if ( !fi.isFormField () ) {
                		// Get the uploaded file parameters
            			String fieldName = fi.getFieldName();
            			String fileName = fi.getName();
            			boolean isInMemory = fi.isInMemory();
            			long sizeInBytes = fi.getSize();
            			// Write the file
            			if( fileName.lastIndexOf("\\") >= 0 ) {
            				file = new File( filePath + 
            				fileName.substring( fileName.lastIndexOf("\\"))) ;
            			}
            
            			else {
            				file = new File( filePath + 
            				fileName.substring(fileName.lastIndexOf("\\")+1)) ;
            			}
            			fi.write( file ) ;
            			out.println("Uploaded Filename: " + filePath + 
            			fileName + "<br>");
            			
            	
            			// At the very end of the file, after uploads have occurred, run check.jsp
   		 				String redirectURL = "check.jsp?type=zip&dirid=".concat(directoryID).concat("&path=").concat(filePath + fileName);
   		 				response.sendRedirect(redirectURL);
   		 				
            		}
         		}
         
   		 
      		} catch(Exception ex) {
         		System.out.println(ex);
      		}
   		} else {
      		out.println("<p>No file uploaded</p>"); 
   		} 
   
	
	}
	
	/* ================ ZIP FILE UPLOAD END =====================
	** ========================================================== */
	
	
	
	/* ============= SINGLE FILE UPLOAD START ===================
	** ========================================================== */
	
	if (uploadType.equals("single")) {
	

		out.println("Single file upload started.");
		File file ;
		int maxFileSize = 5000 * 1024;
		int maxMemSize = 5000 * 1024;
   
        
		// Verify the content type
		String contentType = request.getContentType();
		if ((contentType.indexOf("multipart/form-data") >= 0)) {

			DiskFileItemFactory factory = new DiskFileItemFactory();
    		// maximum size that will be stored in memory
    		factory.setSizeThreshold(maxMemSize);
    		// Location to save data that is larger than maxMemSize.
      		factory.setRepository(new File(getServletContext().getRealPath("/").concat("temp")));

      		// Create a new file upload handler
      		ServletFileUpload upload = new ServletFileUpload(factory);
      		// maximum file size to be uploaded.
      		upload.setSizeMax( maxFileSize );
      		try{
      	
         		// Parse the request to get file items.
         		List fileItems = upload.parseRequest(request);
         		out.println("List of fileItems: " + fileItems);
         

         		// Process the uploaded file items
         		Iterator i = fileItems.iterator();

         		while ( i.hasNext () ) {
            		FileItem fi = (FileItem)i.next();
            		if ( !fi.isFormField () ) {
                		// Get the uploaded file parameters
            			String fieldName = fi.getFieldName();
            			String fileName = fi.getName();
            			boolean isInMemory = fi.isInMemory();
            			long sizeInBytes = fi.getSize();
            			// Write the file
            			if( fileName.lastIndexOf("\\") >= 0 ) {
            				file = new File( filePath + 
            				fileName.substring( fileName.lastIndexOf("\\"))) ;
            			}
            
            			else {
            				file = new File( filePath + 
            				fileName.substring(fileName.lastIndexOf("\\")+1)) ;
            			}
            			fi.write( file ) ;
            			out.println("Uploaded Filename: " + filePath + 
            			fileName + "<br>");
            	
            			// At the very end of the file, after uploads have occurred, run check.jsp
   		 				String redirectURL = "check.jsp?type=single&dirid=".concat(directoryID).concat("&path=").concat(filePath + fileName);
   		 				response.sendRedirect(redirectURL);
            		}
         		}
         
   		 
      		} catch(Exception ex) {
         		System.out.println(ex);
      		}
   		} else {
      		out.println("<p>No file uploaded</p>"); 
   		} 
   
   }
   
	/* ============== SINGLE FILE UPLOAD END ====================
	** ========================================================== */
	
	
	
	/* ================ DIRECT INPUT START ======================
	** ========================================================== */
	if (uploadType.equals("direct")) {
		String fileName = filePath.concat("direct.html");
		String sourceCode = "";
		
		sourceCode = request.getParameter("input-direct");
		out.println(sourceCode);
		
		FileWriter directFile = new FileWriter(fileName);
		directFile.write(sourceCode);
		directFile.flush();
		directFile.close();
		
		String redirectURL = "check.jsp?type=single&dirid=".concat(directoryID).concat("&path=").concat(fileName);
   		response.sendRedirect(redirectURL);
	
	}
	
	/* ================ DIRECT INPUT END ========================
	** ========================================================== */
	
	
	/* ================== URL INPUT START =======================
	** ========================================================== */
	if (uploadType.equals("url")) {
		String sourceCode = "";
		String inputURL = request.getParameter("input-url");
		String fileName = filePath.concat(inputURL);
		if (inputURL.indexOf("http://www.") != 0 && inputURL.indexOf("www.") != 0) {
			inputURL = "http://www.".concat(inputURL);
		}
		else if (inputURL.indexOf("http://") != 0) {
			inputURL = "http://".concat(inputURL);
		}
		else if (inputURL.indexOf("www.") != 7) {
			inputURL = "http://www.".concat(inputURL.substring(7));
		}
		URL url = new URL(inputURL);
		InputStream is = url.openStream();
		int ptr = 0;
		StringBuffer buffer = new StringBuffer();
		while ((ptr = is.read()) != -1) {
   			buffer.append((char)ptr);
		}
		sourceCode = buffer.toString();
		
		FileWriter directFile = new FileWriter(fileName);
		directFile.write(sourceCode);
		directFile.flush();
		directFile.close();
		
		String redirectURL = "check.jsp?type=single&dirid=".concat(directoryID).concat("&path=").concat(fileName);
   		response.sendRedirect(redirectURL);
	
	}
	
	/* ================== URL INPUT END =========================
	** ========================================================== */
	
%>

<script>console.log("finished");</script>