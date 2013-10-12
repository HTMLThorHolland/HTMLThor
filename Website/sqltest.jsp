<%@ page import="java.io.*" %>
<%@ page import="java.util.*" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.Statement" %>

	 
<html>

<head>

</head>

<body>

<%
		String url = "htmlthor.com";
		ResultSet result = null;
		String query = "SELECT * FROM Element";
		out.println(query);
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (Exception ex) {
			
		}
		Connection con = null;
		try {
			con = DriverManager.getConnection("jdbc:mysql://htmlthor.com/htmlthor_db?" + "user=htmlthor_udb&password=test1");
			Statement stmt = con.createStatement();
			result = stmt.executeQuery(query);
		
		} catch (SQLException ex) {
			out.println("SQLException: " + ex.getMessage());
			out.println("SQLState: " + ex.getSQLState());
			out.println("VendorError: " + ex.getErrorCode());
		}
		
		Boolean msg = false;
		
		
		
		List<String> list = new ArrayList<String>();
		
		
		try {
			while (result.next()) {
				list.add(result.getString("eName"));
			}
		} catch (SQLException ex) {
				System.out.println("SQLException: " + ex.getMessage());
				System.out.println("SQLState: " + ex.getSQLState());
				System.out.println("VendorError: " + ex.getErrorCode());
		}
		String listString = "";
		for (String s : list)
		{
			listString += s + "\t";
		}

		out.println(listString);
	%>	
		</body>
		
		</html>