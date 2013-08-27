<script>console.log("loaded");</script>

<%@ page import="java.io.*,java.util.*, javax.servlet.*" %>
<%@ page import="javax.servlet.http.*" %>
<%@ page import="org.apache.commons.fileupload.*" %>
<%@ page import="org.apache.commons.fileupload.disk.*" %>
<%@ page import="org.apache.commons.fileupload.servlet.*" %>
<%@ page import="org.apache.commons.io.output.*" %>

<%
<<<<<<< HEAD
   out.println( "Upload2 JSP Loaded" );
=======
	out.println( "Upload2 JSP Loaded" );
>>>>>>> c86c2467c91b48593e237e9b5cae81b0595c3721
   File file ;
   int maxFileSize = 5000 * 1024;
   int maxMemSize = 5000 * 1024;
   ServletContext context = pageContext.getServletContext();
<<<<<<< HEAD
   String filePath = getServletContext().getRealPath("/").concat("temp/");
   
        
=======
   String filePath = context.getInitParameter("file-upload");

>>>>>>> c86c2467c91b48593e237e9b5cae81b0595c3721
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
<<<<<<< HEAD
      try{
      	
         // Parse the request to get file items.
         List fileItems = upload.parseRequest(request);
         out.println("List of fileItems: " + fileItems);
         
=======
      try{ 
         // Parse the request to get file items.
         List fileItems = upload.parseRequest(request);
>>>>>>> c86c2467c91b48593e237e9b5cae81b0595c3721

         // Process the uploaded file items
         Iterator i = fileItems.iterator();

         while ( i.hasNext () ) 
         {
            FileItem fi = (FileItem)i.next();
            if ( !fi.isFormField () )	
            {
<<<<<<< HEAD
                // Get the uploaded file parameters
            	String fieldName = fi.getFieldName();
            	String fileName = fi.getName();
            	boolean isInMemory = fi.isInMemory();
            	long sizeInBytes = fi.getSize();
            	// Write the file
            	if( fileName.lastIndexOf("\\") >= 0 ){
            	file = new File( filePath + 
            	fileName.substring( fileName.lastIndexOf("\\"))) ;
            	}
            
            	else{
            	file = new File( filePath + 
            	fileName.substring(fileName.lastIndexOf("\\")+1)) ;
            	}
            	fi.write( file ) ;
            	out.println("Uploaded Filename: " + filePath + 
            	fileName + "<br>");
            	
            	// At the very end of the file, after uploads have occurred, run upload.jsp
   		 		String redirectURL = "upload.jsp?path=".concat(filePath + fileName);
   		 		response.sendRedirect(redirectURL);
            }
         }
         
   		 
=======
            // Get the uploaded file parameters
            String fieldName = fi.getFieldName();
            String fileName = fi.getName();
            boolean isInMemory = fi.isInMemory();
            long sizeInBytes = fi.getSize();
            // Write the file
            if( fileName.lastIndexOf("\\") >= 0 ){
            file = new File( filePath + 
            fileName.substring( fileName.lastIndexOf("\\"))) ;
            }else{
            file = new File( filePath + 
            fileName.substring(fileName.lastIndexOf("\\")+1)) ;
            }
            fi.write( file ) ;
            out.println("Uploaded Filename: " + filePath + 
            fileName + "<br>");
            }
         }
>>>>>>> c86c2467c91b48593e237e9b5cae81b0595c3721
      }catch(Exception ex) {
         System.out.println(ex);
      }
   }else{

      out.println("<p>No file uploaded</p>"); 
<<<<<<< HEAD
   } 
   
   
=======
   }
>>>>>>> c86c2467c91b48593e237e9b5cae81b0595c3721
%>

<script>console.log("finished");</script>