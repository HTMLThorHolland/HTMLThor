<%@ page contentType="text/html; charset=UTF-8" language="java"
	import="java.*" errorPage=""%>
<%@ page import="java.io.*" %>
<%@ page import="java.util.*" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.sql.Statement" %>

<html>
<head>


</head>
<body>

<%!
/*


*/

public static ResultSet ConnectDB(String Q) {

	String msg = null;
	String url = "htmlthor.com";
	ResultSet result = null;
	
	//Class.forName("com.mysql.jdbc.Driver");
	Connection con = null;
	try {
		con = DriverManager.getConnection("jdbc:mysql://htmlthor.com/htmlthor_db?" + "user=htmlthor_udb&password=test1");
		Statement stmt = con.createStatement();
		result = stmt.executeQuery(Q);
	
	} catch (SQLException ex) {
		System.out.println("SQLException: " + ex.getMessage());
		System.out.println("SQLState: " + ex.getSQLState());
		System.out.println("VendorError: " + ex.getErrorCode());
	}
	
	
	
	return result;
}


public static String getErrMsg(int eID) {
	
	String msg = null;
	
	String query = new StringBuilder("SELECT * FROM Error WHERE eID = '").append(eID).append("'").toString();
	ResultSet result = ConnectDB(query);
	
	try {
		if (result.next()) {
			msg = result.getString("eMessage");
		}
	} catch (SQLException ex) {
		System.out.println("SQLException: " + ex.getMessage());
		System.out.println("SQLState: " + ex.getSQLState());
		System.out.println("VendorError: " + ex.getErrorCode());
	}
	
   return msg; 
}


//Options for tbl are - dep,elem,att (deprecated element and attribte repesctively)
public static List<String> getDBanswer(String tbl, String tag) {

	List<String> list = new ArrayList<String>();
	
	if (tbl.equals("dep")) {
	
		String query = new StringBuilder("SELECT * FROM Deprecated WHERE depTag = ").append(tag).toString();
		ResultSet result = ConnectDB(query);

		try {
			while(result.next())
			{
			 list.add(result.getString("depTag"));
			 list.add(result.getString("eID"));
			} 
		} catch (SQLException ex) {
		System.out.println("SQLException: " + ex.getMessage());
		System.out.println("SQLState: " + ex.getSQLState());
		System.out.println("VendorError: " + ex.getErrorCode());
		}
		
	} else if  (tbl.equals("elem")) {
	
		
		String query = new StringBuilder("SELECT * FROM Element WHERE EName = ").append(tag).toString();
		ResultSet result = ConnectDB(query);

		
		try {
			while(result.next())
			{
			 list.add(result.getString("EName"));
			 list.add(result.getString("IsDeprecated"));
			 list.add(result.getString("CanSelfClose"));
			 list.add(result.getString("IsFormElem"));
			 list.add(result.getString("IsSingular"));
			}
		} catch (SQLException ex) {
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
		}
	
	} else if  (tbl.equals("att")) {
	
		String query = new StringBuilder("SELECT * FROM RequiredAttributes WHERE EName = ").append(tag).toString();
		ResultSet result = ConnectDB(query);
		
		try {
			while(result.next())
			{
			 list.add(result.getString("EName"));
			 list.add(result.getString("AttributeName"));
			} 
		} catch (SQLException ex) {
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
		}
		
	} else {
		//exit with not a valid table
	}

   return (ArrayList)list; 
}

//Returns a list of Arrays - get deprecated tags * NOTE!
public static ArrayList<String> getTags() {
	
	
	List<String> list = new ArrayList<String>();
	
	String query = "SELECT * FROM Element";
	ResultSet result = ConnectDB(query);
	
	try {
		while (result.next()) {
			list.add(result.getString("eName"));
		}
	} catch (SQLException ex) {
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
	}

   return (ArrayList)list;
}

//Return true or false for deprecated or not
public static boolean isDeprecated(String tagName) {
	
	Boolean msg = false;
	
	String query = new StringBuilder("SELECT * FROM Error WHERE depTag =  ").append(tagName).toString();
	ResultSet result = ConnectDB(query);
	
	try {
		if (result.next()) {
			if (result.getString("eID") != null) {
				msg = true;
			}
		}
	} catch (SQLException ex) {
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
	}

   return msg;
}

//Returns true if tag requires an Attribute
public static boolean requiresAttr(String tagName) {

	boolean msg = false;
	
	String query = new StringBuilder("SELECT * FROM Error WHERE EName =  ").append(tagName).toString();
	ResultSet result = ConnectDB(query);
	
	try {
	
		if (result.next()) {
			if (result.getString("eID") != null) {
				msg = true;
			}
		}
	} catch (SQLException ex) {
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
	}

   return msg;
	
}

//Returns a list of all Attribtes for a tagName
public static ArrayList<String> getAttr(String tagName) {

	List<String> list = new ArrayList<String>();
	
	String query = new StringBuilder("SELECT * FROM RequiredAttributes where EName = ").append(tagName).toString();
	ResultSet result = ConnectDB(query);
	
	try {
	
		while (result.next()) {
			list.add(result.getString("AttributeName"));
		}
	
	}catch (SQLException ex) {
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
	}

   return (ArrayList)list;

}


//If a tag exists
public static boolean checkValidTag(String tagName) {


	List<String> list = new ArrayList<String>();
	list = getTags();
	
	for (int i=0;i<list.size();i++) {
		if (list.get(i).equals(tagName)) {
			return true;
		}
	}
	
	return false;
}


public static boolean isSelfClosing(String tagName) {
	
	boolean msg = false;
	
	String query = new StringBuilder("SELECT * FROM Element WHERE EName = ").append(tagName).toString();
	ResultSet result = ConnectDB(query);
	
	try {
		if (result.next()) {
			if (result.getString("canSelfClose").equals("1")) {
				msg = true;
			}
		}
	} catch (SQLException ex) {
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
	}

   return msg;
}

%>

<%


%>
</body>
</html>