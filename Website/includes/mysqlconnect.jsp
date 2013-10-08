<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.*" %>
<html>
<head>
<title>MySQL Database Test</title>
<style>
* { font-size: 12px; font-family: Verdana }
</style>
</head>
<body>

<h2>Test DB Retrieval</h2>

<jsp:declaration>

Statement stmt;
Connection con;
String url = "jdbc:mysql://localhost:3306/htmlthor_db";

</jsp:declaration>

<jsp:scriptlet><![CDATA[

List<String> list = new ArrayList<String>();

Class.forName("com.mysql.jdbc.Driver");
con = DriverManager.getConnection(url, "htmlthor_udb", "test1"); 

String query = "SELECT * FROM Element WHERE EName = 'html'";
Statement stmt = con.createStatement();
ResultSet result = stmt.executeQuery(query);

while(result.next())
	{
	 list.add(result.getString("EName"));
	 list.add(result.getString("IsDeprecated"));
	 list.add(result.getString("CanSelfClose"));
	 list.add(result.getString("IsFormElem"));
	 list.add(result.getString("IsSingular"));
	} 
	
con.close();

out.println(list.toString());


]]></jsp:scriptlet>

</body>
</html>