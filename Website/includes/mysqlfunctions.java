 package com.htmlthor;

import java.io.*;
import java.util.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * Class for handling SQL calls to the database. Contains a number of functions
 * used to access the database, and to run checks on various tags.
 */
public class Mysqlfunctions {

	/**
	 * Private class for handling connecting to the database.
	 */
	private class ConnectDB {
	
			ResultSet result = null;
			Connection con = null;
			
			public ConnectDB() {
			
			}
	
			public ResultSet run(String Q) {
				String url = "htmlthor.com";
					
				try {
					Class.forName("com.mysql.jdbc.Driver");
				} catch (Exception ex) {
					
				}
				
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
			
			
			public void close() {
				try {
					con.close();
				} catch (SQLException ex) {
					System.out.println("SQLException: " + ex.getMessage());
					System.out.println("SQLState: " + ex.getSQLState());
					System.out.println("VendorError: " + ex.getErrorCode());
				}
			
				return;
			}
	}

	/**
	 * Given an error ID, the appropriate error message is fetched from the
	 * database.
	 * 
	 * @param eID the error ID corresponding to the error to be fetched
	 * @return the error message string
	 */
	public String getErrMsg(int eID) {
		String msg = null;
		
		/* Creates the query to be run by the database. */
		String query = new StringBuilder("SELECT * FROM Error WHERE eID = '").append(eID).append("'").toString();
		
		ConnectDB con = new ConnectDB();
		ResultSet result = con.run(query);
		
		/* Checks if an error message exists for the error ID. */
		if (result == null) {
			return "No message";
		}
		try {
			if (result.next()) {
				msg = result.getString("eMessage");
			}
		} catch (SQLException ex) {
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
		}
		
	   con.close();
	   
	   return msg;
	}

	/**
	 * Fetches the relevant fields for an attribute, deprecated element or
	 * element for a given tag or attribute.
	 * 
	 * @param tbl a string corresponding to one of three data types;
	 * <code>dep</code> if checking a deprecated element,
	 * <code>elem</code> if checking a non-deprecated element and
	 * <code>att</code> if checking an element
	 * @param tag the tag or attribute to be checked
	 * @return a list containing the relevant fields for the data type specified
	 */
	public List<String> getDBanswer(String tbl, String tag) {
		List<String> list = new ArrayList<String>();
		
		if (tbl.equalsIgnoreCase("dep")) {
			
			/* Creates the query to be run by the database. */
			String query = new StringBuilder("SELECT * FROM Deprecated WHERE depTag = ").append(tag).toString();
			ConnectDB con = new ConnectDB();
			ResultSet result = con.run(query);

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
			
			con.close();
			
		} else if  (tbl.equalsIgnoreCase("elem")) {
		
			/* Creates the query to be run by the database. */
			String query = new StringBuilder("SELECT * FROM Element WHERE EName = ").append(tag).toString();
			ConnectDB con = new ConnectDB();
			ResultSet result = con.run(query);

			
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
			
			con.close();
		
		} else if  (tbl.equalsIgnoreCase("att")) {
		
			/* Creates the query to be run by the database. */
			String query = new StringBuilder("SELECT * FROM RequiredAttributes WHERE EName = ").append(tag).toString();
			ConnectDB con = new ConnectDB();
			ResultSet result = con.run(query);
			
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
			
			con.close();
			
		} else {
			//exit with not a valid table
		}
		return (ArrayList)list; 
	}

	/**
	 * Returns a list of the elements.
	 * 
	 * @return an ArrayList containing the element names
	 */
	public ArrayList<String> getTags() {
		
		List<String> list = new ArrayList<String>();
		
		/* Creates the query to be run by the database. */
		String query = "SELECT * FROM Element";
		ConnectDB con = new ConnectDB();
		ResultSet result = con.run(query);
		
		if (result == null) {
			return (ArrayList<String>) list;
		}
		
		try {
			while (result.next()) {
				list.add(result.getString("eName"));
			}
		} catch (SQLException ex) {
				System.out.println("SQLException: " + ex.getMessage());
				System.out.println("SQLState: " + ex.getSQLState());
				System.out.println("VendorError: " + ex.getErrorCode());
		}
		
		con.close();
		
		return (ArrayList<String>) list;
	}

	/**
	 * Checks if the given tag is deprecated.
	 * 
	 * @param tagName the tag to be checked
	 * @return <code>true</code> if the tag is deprecated; <code>false</code>
	 * otherwise
	 */
	public boolean isDeprecated(String tagName) {
		Boolean msg = false;
		
		/* Creates the query to be run by the database. */
		String query = "SELECT * FROM Element WHERE EName = '" + tagName + "'";
		ConnectDB con = new ConnectDB();
		ResultSet result = con.run(query);
		
		if (result == null) {
			return false;
		}
		
		try {
			if (result.next()) {
				if (result.getInt("IsDeprecated") == 0) {
					msg = true;
				}
			}
		} catch (SQLException ex) {
				System.out.println("SQLException: " + ex.getMessage());
				System.out.println("SQLState: " + ex.getSQLState());
				System.out.println("VendorError: " + ex.getErrorCode());
		}

		con.close();	

	   return msg;
	}
	
	
	/**
	 * Checks if the attribute for the given tag is deprecated.
	 * 
	 * @param attName the attribute to be checked
	 * @param tagName the tag corresponding to the attribute
	 * @return <code>true</code> if the attribute is deprecated;
	 * <code>false</code> otherwise
	 */
	public boolean isDeprecatedAttribute(String attName, String tagName) {
		Boolean msg = false;
		
		/* Creates the query to be run by the database. */
		String query = "SELECT eID FROM Element WHERE EName = '" + tagName + "'";
		ConnectDB con = new ConnectDB();
		ResultSet result = con.run(query);
		
		int eID = 0;
		
		if (result != null) {
			try {
		
				while (result.next()) {
					eID = result.getInt("eID");
				}
		
			}catch (SQLException ex) {
				System.out.println("SQLException: " + ex.getMessage());
				System.out.println("SQLState: " + ex.getSQLState());
				System.out.println("VendorError: " + ex.getErrorCode());
			}
		}
		
		/* Creates the query to be run by the database. */
		query = "SELECT * FROM Attribute WHERE (eID = " + Integer.toString(eID) + " OR isGlobal = 1) AND Name = '" + attName + "'";
		result = con.run(query);
		
		if (result == null) {
			return false;
		}
		
		try {
			if (result.next()) {
				if (result.getInt("isDeprecated") == 1) {
					msg = true;
				}
			}
		} catch (SQLException ex) {
				System.out.println("SQLException: " + ex.getMessage());
				System.out.println("SQLState: " + ex.getSQLState());
				System.out.println("VendorError: " + ex.getErrorCode());
		}

		con.close();
		return msg;
	}

	/**
	 * Not sure what this does
	 *
	 * @param tagName
	 * @return
	 */
	public List<String> requiresAttr(String tagName) {
		List<String> DBRequires = new ArrayList<String>();
		
		/* Creates the query to be run by the database. */
		String query = new StringBuilder("SELECT * FROM Attribute WHERE isRequired = 1 AND eID = (SELECT eID FROM Element WHERE Ename = '" ).append(tagName).append("' )").toString();
		ConnectDB con = new ConnectDB();
		ResultSet result = con.run(query);
		
		if (result == null) {
			return DBRequires;
		}
		
		try {
			while(result.next()) {
				if (result.getString("Name") != null) {
					DBRequires.add(result.getString("Name"));
				}
			}
		} catch (SQLException ex) {
				System.out.println("SQLException: " + ex.getMessage());
				System.out.println("SQLState: " + ex.getSQLState());
				System.out.println("VendorError: " + ex.getErrorCode());
		}

		con.close();	
		return DBRequires;
	}

	/**
	 * Returns a list of all the valid attributes for the given tag.
	 * 
	 * @param tagName the tag to get the attributes for
	 * @return an ArrayList of strings containing the attribute names for the
	 * given tag
	 */
	public ArrayList<String> getAttr(String tagName) {
		List<String> list = new ArrayList<String>();
		
		/* Creates the query to be run by the database. */
		String query = "SELECT * FROM Attribute WHERE eID = (SELECT eID FROM Element WHERE EName = '"+tagName+"') OR isGlobal=1";
		ConnectDB con = new ConnectDB();
		ResultSet result = con.run(query);
				
		if (result == null) {
			return (ArrayList<String>) list;
		}
		try {
		
			while (result.next()) {
				list.add(result.getString("Name"));
			}
		
		}catch (SQLException ex) {
				System.out.println("SQLException: " + ex.getMessage());
				System.out.println("SQLState: " + ex.getSQLState());
				System.out.println("VendorError: " + ex.getErrorCode());
		}

		con.close();	
		return (ArrayList<String>) list;
	}


	/**
	 * Checks if the tag given is a valid tag.
	 * 
	 * @param tagName the tag to be checked
	 * @return <code>true</code> if the tag is a valid tag; <code>false</code>
	 * otherwise
	 */
	public boolean checkValidTag(String tagName) {
		List<String> list = new ArrayList<String>();
		list = getTags();
		
		for (int i=0;i<list.size();i++) {
			if (list.get(i).equalsIgnoreCase(tagName)) {
				return true;
			}
		}
		
		return false;
	}

	/**
	 * Checks if the tag given is a self-closing tag.
	 * 
	 * @param tagName the tag to be checked.
	 * @return <code>true</code if the tag is a self-closing tag;
	 * <code>false</code> otherwise
	 */
	public boolean isSelfClosing(String tagName) {
		boolean msg = false;
		
		/* Creates the query to be run by the database. */
		String query = "SELECT * FROM Element WHERE EName = '" + tagName + "'";
		ConnectDB con = new ConnectDB();
		ResultSet result = con.run(query);
		
		if (result == null) {
			return false;
		}
		
		try {
			if (result.next()) {
				if (result.getInt("CanSelfClose") == 1) {
					return true;
				}
			} 
		} catch (SQLException ex) {
				System.out.println("SQLException: " + ex.getMessage());
				System.out.println("SQLState: " + ex.getSQLState());
				System.out.println("VendorError: " + ex.getErrorCode());
		}
				
		con.close();

		return msg;
	}
	
	/**
	 * Checks whether the tag given is a metadata or script element.
	 * 
	 * @param tagName the tag to be checked
	 * @return <code>true</code> if the tag is a metadata or script element;
	 * <code>false</code> otherwise
	 */
	public boolean isMeta(String tagName) {
		Boolean msg = false;
		
		/* Creates the query to be run by the database. */
		String query = "SELECT * FROM Element WHERE EName = '" + tagName + "'";
		ConnectDB con = new ConnectDB();
		ResultSet result = con.run(query);
		
		if (result == null) {
			return false;
		}
		
		try {
			if (result.next()) {
				if (result.getInt("IsMeta") == 1) {
					msg = true;
				}
			}
		} catch (SQLException ex) {
				System.out.println("SQLException: " + ex.getMessage());
				System.out.println("SQLState: " + ex.getSQLState());
				System.out.println("VendorError: " + ex.getErrorCode());
		}

		con.close();
	
		return msg;
	}
	
	/**
	 * Checks if the tag given is a table element.
	 * 
	 * @param tagName the tag to be checked
	 * @return <code>true</code> if the tag is a table element;
	 * <code>false</code> otherwise
	 */
	public boolean isTableElement(String tagName) {
		Boolean msg = false;
		
		/* Creates the query to be run by the database. */
		String query = "SELECT * FROM Element WHERE EName = '" + tagName + "'";
		ConnectDB con = new ConnectDB();
		ResultSet result = con.run(query);
		
		if (result == null) {
			return false;
		}
		
		try {
			if (result.next()) {
				if (result.getInt("IsTableElem") == 1) {
					msg = true;
				}
			}
		} catch (SQLException ex) {
				System.out.println("SQLException: " + ex.getMessage());
				System.out.println("SQLState: " + ex.getSQLState());
				System.out.println("VendorError: " + ex.getErrorCode());
		}

		con.close();	

		return msg;
	}
	
	/**
	 * Checks whether the tag is a table element that can contain other table
	 * elements.
	 * 
	 * @param tagName the tag to be checked.
	 * @return <code>true</code> if the table element is a table tag container;
	 * <code>false</code> otherwise
	 */
	public boolean isTableContainer(String tagName) {
		Boolean msg = false;
		
		/* Creates the query to be run by the database. */
		String query = "SELECT * FROM Element WHERE EName = '" + tagName + "'";
		ConnectDB con = new ConnectDB();
		ResultSet result = con.run(query);
		
		if (result == null) {
			return false;
		}
		
		try {
			if (result.next()) {
				if (result.getInt("IsTableContainer") == 1) {
					msg = true;
				}
			}
		} catch (SQLException ex) {
				System.out.println("SQLException: " + ex.getMessage());
				System.out.println("SQLState: " + ex.getSQLState());
				System.out.println("VendorError: " + ex.getErrorCode());
		}

		con.close();	

		return msg;
	}
	
	/**
	 * Checks if the given tag is a singular table element.
	 * 
	 * @param tagName the tag to be checked
	 * @return <code>true</code> if the tag is a singular table element;
	 * <code>false</code> otherwise
	 */
	public boolean isTableSingular(String tagName) {
		Boolean msg = false;
		
		/* Creates the query to be run by the database. */
		String query = "SELECT * FROM Element WHERE EName = '" + tagName + "'";
		ConnectDB con = new ConnectDB();
		ResultSet result = con.run(query);
		
		if (result == null) {
			return false;
		}
		
		try {
			if (result.next()) {
				if (result.getInt("IsTableSingular") == 1) {
					msg = true;
				}
			}
		} catch (SQLException ex) {
				System.out.println("SQLException: " + ex.getMessage());
				System.out.println("SQLState: " + ex.getSQLState());
				System.out.println("VendorError: " + ex.getErrorCode());
		}

		con.close();	

		return msg;
	}
	
	/**
	 * Checks if the given tag is a form element.
	 * 
	 * @param tagName the tag to be checked
	 * @return <code>true</code> if the tag is a form element;
	 * <code>false</code> otherwise
	 */
	public boolean isFormElement(String tagName) {
		Boolean msg = false;
		
		/* Creates the query to be run by the database. */
		String query = "SELECT * FROM Element WHERE EName = '" + tagName + "'";
		ConnectDB con = new ConnectDB();
		ResultSet result = con.run(query);
		
		if (result == null) {
			return false;
		}
		
		try {
			if (result.next()) {
				if (result.getInt("IsFormElem") == 1) {
					msg = true;
				}
			}
		} catch (SQLException ex) {
				System.out.println("SQLException: " + ex.getMessage());
				System.out.println("SQLState: " + ex.getSQLState());
				System.out.println("VendorError: " + ex.getErrorCode());
		}

		con.close();	
		
		return msg;
	}
	
	/**
	 * Checks if the given attribute is a boolean attribute.
	 * 
	 * @param attributeName the attribute to be checked
	 * @return <code>true</code> if the attribute is boolean; <code>false</code>
	 * otherwise
	 */
	public boolean isAttrBool(String attributeName) {
		Boolean msg = false;
		
		/* Creates the query to be run by the database. */
		String query = "SELECT * FROM Attribute WHERE Name = '"+attributeName+"'";
		ConnectDB con = new ConnectDB();
		ResultSet result = con.run(query);
		
		if (result == null) {
			return false;
		}
		
		try {
			if (result.next()) {
				if (result.getInt("IsBoolean") == 1) {
					msg = true;
				}
			}
		} catch (SQLException ex) {
				System.out.println("SQLException: " + ex.getMessage());
				System.out.println("SQLState: " + ex.getSQLState());
				System.out.println("VendorError: " + ex.getErrorCode());
		}

		con.close();	

		return msg;
	}
	
}