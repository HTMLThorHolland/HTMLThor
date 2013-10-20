package com.htmlthor;

import java.io.*;
import java.util.*;
import java.util.zip.*;
import org.json.simple.JSONObject;


public class StructureBreakdown {

	private Map<String, StructureBreakdown> subfiles;
	private String type = "";
	private String name = "";
	private String fullPath = "";
	private int errorCount = 0;


	/* Constructor */
	public StructureBreakdown() {
		subfiles = new HashMap<String, StructureBreakdown>();
	}
	
	public JSONObject toJSON() {
		JSONObject json = new JSONObject();
		json.put("name", name.replaceAll(" ", "_"));
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
	
	/* adds a file to the structure */
	public void addSubfile(String filename, StructureBreakdown file) {
		subfiles.put(filename, file);
	}
	
	/* gets a subfile/subfolder */
	public StructureBreakdown getSubfile(String filename) {
		return subfiles.get(filename);
	}
	
	/* set type - should be either "file" or "folder" */
	public void setType(String t) {
		type = t;
	}
	
	public void setName(String n) {
		name = n;
	}
	
	public void setPath(String p) {
		fullPath = p;
	}



}