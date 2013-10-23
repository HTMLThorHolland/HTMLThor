package com.htmlthor;

import java.io.*;
import java.util.*;
import java.util.zip.*;
import org.json.simple.JSONObject;

/**
 * Structure breakdown class used for generating the JSON Object
 * for the front end to display structure breakdown with all associated
 * errors (new suggested location and broken links).
 * Each instance of StructureBreakdown represents one file or folder.
 * 
 * @author Thorbjoern Kappel Hansen
 */
public class StructureBreakdown {

	private Map<String, StructureBreakdown> subfiles;
	private String type = "";
	private String name = "";
	private String fullPath = "";
	private int errorCount = 0;
	private List<String> source;


	/**
	 * Just an empty constructor
	 */
	public StructureBreakdown() {
		subfiles = new HashMap<String, StructureBreakdown>();
	}
	
	/**
	 * Generates the JSON object representing the folder/file and all subfolder/subfiles.
	 * Should only be called on the root folder to generate a comprehensive breakdown.
	 * @return A JSON Object representing the structure of the folder/file
	 */
	public JSONObject toJSON() {
		JSONObject json = new JSONObject();
		json.put("name", name.replaceAll(" ", "_"));
		if (type.equals("file")) {
			String suggestLoc = getSuggestedFileLocation();
			
			
			if (suggestLoc != null) {
				json.put("newLocation", suggestLoc);
			} else {
				json.put("newLocation", "");
			}
		} else {
			json.put("newLocation", "");
		}
		
		json.put("totalErrors", errorCount);
		if (errorCount > 0) {
			json.put("type", "brokenFile");
		} else {
			json.put("type", type);
		}
		json.put("fullPath", fullPath.replaceAll(" ", "_"));
		
		JSONObject children = new JSONObject();
		
		int counter = 0;
		for (Map.Entry subfile : subfiles.entrySet()) {
			JSONObject subjson = ((StructureBreakdown)subfile.getValue()).toJSON();
			children.put(counter, subjson);
			counter++;
		}
		children.put("count", counter);
		
		json.put("children", children);
		
		return json;
	}
	
	/**
	 * Adds a subfile. Should only be used on a StructureBreakdown with type 'folder'
	 * @param filename The name of the file to add as a child
	 * @param file A StructureBreakdown representation of the subfile
	 */
	public void addSubfile(String filename, StructureBreakdown file) {
		subfiles.put(filename, file);
	}
	
	/**
	 * Gets a StructureBreakdown representation matching a string
     * @param filename The name of the file to get
     * @return The StructureBreakdown representation of the subfile
     */
	public StructureBreakdown getSubfile(String filename) {
		return subfiles.get(filename);
	}
	
	/**
	 * Gets a StructureBreakdown representation matching a string
     * @param t The type to set as. Should be 'file', 'folder' or 'brokenFile'.
     */
	public void setType(String t) {
		type = t;
	}
	
	/**
	 * Sets the name of the StructureBreakdown. Should be the full file name including extension,
	 * but excluding any parent folders.
     * @param n The name to set as.
     */
	public void setName(String n) {
		name = n;
	}
	
	/**
	 * Sets the full path of the StructureBreakdown. Should be the full file name including extension,
	 * and also including any parent folders.
     * @param p The path to set as.
     */
	public void setPath(String p) {
		fullPath = p;
	}

	/**
	 * Adds source code to the StructureBreakdown. Should only be added for files that are due to be
	 * checked (eg. .php or .html files).
	 * @param sourceCode The source code by lines.
	 */
	public void addSource(List<String> sourceCode) {
		source = sourceCode;
	}
	
	/**
	 * Gets the source code associated with the StructureBreakdown. Will only be set for files that
	 * are due to be checked (eg. .php or .html files).
	 */
	public List<String> getSource() {
		return source;
	}

	/**
	 * Gets the suggested file location for this file. The file will only be suggested a new location
	 * if it is inside the root folder. The 3 criteria are as follows:
	 * Image files should be inside the /images/ folder.
	 * CSS files should be inside the /css/ folder.
	 * JavaScript files should be inside the /js/ folder.
	 * @return The path of where the file should be. Returns null if current location is fine.
	 */
	private String getSuggestedFileLocation() {
		String[] fullPathSplit = fullPath.split("/");
		if (fullPathSplit.length != 2) {
			return null;
		}
		String[] extensionSplit = fullPath.split("\\.");
		
		if (isImage(extensionSplit[extensionSplit.length-1])) {
			String returnString = fullPathSplit[0] + "/images/"+ name;
			return returnString;
		}
		else if (isJS(extensionSplit[extensionSplit.length-1])) {
			String returnString = fullPathSplit[0] + "/js/"+ name;
			return returnString;
		}
		else if (isCSS(extensionSplit[extensionSplit.length-1])) {
			String returnString = fullPathSplit[0] + "/css/"+ name;
			return returnString;
		} else {
			return null;
		}
	}
	
	/**
	 * Checks whether the file is an image.
	 * @return true if the file has extension .jpg .jpeg .gif or .png - otherwise false
	 */
	private boolean isImage(String extension) {
		
		if (extension.equalsIgnoreCase("jpg") || extension.equalsIgnoreCase("jpeg") || extension.equalsIgnoreCase("png") || extension.equalsIgnoreCase("gif")) {
			return true;
		}
		return false;
	}
	
	/**
	 * Checks whether the file is a javascript file.
	 * @return true if the file has extension .js - otherwise false
	 */
	private boolean isJS(String extension) {
		if (extension.equalsIgnoreCase("js")) {
			return true;
		}
		return false;
	}
	
	/**
	 * Checks whether the file is a style file.
	 * @return true if the file has extension .css - otherwise false
	 */
	private boolean isCSS(String extension) {
		if (extension.equalsIgnoreCase("css")) {
			return true;
		}
		return false;
	}

}