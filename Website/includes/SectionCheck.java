package com.htmlthor;

import java.io.*;
import java.util.*;
import java.util.zip.*;
import org.json.simple.JSONObject;


public class SectionCheck {
	
	/* Just an empty constructor */
	public SectionCheck() {
	
	}

		/* This is the coding for the NEW error checking */
		public JSONObject findErrors(List<String> fileContents) {
		
			Mysqlfunctions sql = new Mysqlfunctions();
		
			JSONObject errors = new JSONObject();
			boolean openTag = false;
			boolean closeTag =  false;
			boolean startComment = false;
			boolean whiteSpaceFlag = false;
			boolean selfClosing = false;
			boolean openAttr = false;
			int tagStart = 0;
			int attrStart = 0;
			String tag = "";
			int errorCount = 0;
			boolean endTagName = false;
			boolean faultyTag = false;
			boolean tagChecked = false;
			boolean selfClosingError = false;
			JSONObject error;
			
			
			/* Iterates over the lines of the given file. */
			for (int i=0; i<fileContents.size(); i++) {

            	String nextLine = fileContents.get(i);
				
				/* Initialise the character array on the new line. */
				char[] intermediate = nextLine.toCharArray();
				CharArray charArray = new CharArray(nextLine.toCharArray());
			
				
				//Check for open tags
				for(int j=0; j<charArray.getLength(); j++) {
				
				
					if(charArray.getChar(j)=='<') {
						
						openTag = true;
						while (charArray.getChar(j+1) == ' ') {
							j = j+1;
						}
						tagStart = j+1;
						// Check if opened a comment tag
						if (charArray.getLength() >= j+4) {
							if((charArray.getChar(j+1)=='!') && (charArray.getChar(j+2)=='-') && (charArray.getChar(j+3)=='-')) {
								startComment = true;
							}
						}
						j = j+1;
						
						
						
								
						
					}
			
			
								
					
			
			
					// As long as a comment tag is not open, another tag is open and 
					// whitespace has not been reached to signal the end of the tag name:
					if ((startComment==false) && (openTag==true)) {
						if(whiteSpaceFlag==false) {
							if((charArray.getChar(j)==' ')||(charArray.getChar(j)=='>')) {
								if(charArray.getChar(j)==' ') {
									whiteSpaceFlag = true;
								}
								if (openAttr == true) {
									openAttr = false;
									// check attribute stuff here
								}
								if (!endTagName) {
									tag = charArray.getString(tagStart, j-1);
									
									if (tag.substring(0,1).equals("/")) {
										
										tag = tag.substring(1);
									}
									endTagName = true;
								}
								
								
								
								
								
								if (!tagChecked) {
								
								
								
									// If it is not a valid tag
									if(!sql.checkValidTag(tag)) {
										
										// Note that some of these additions should use database references in future
										error = new JSONObject();
										error.put("message", tag + " is not a valid HTML tag");
										error.put("type", "syntax");
										error.put("line", i+1);
										error.put("col", j);
										errors.put(errorCount, error);
										errorCount += 1;
										faultyTag = true;
										
									}	
									// If it a deprecated tag
									else if(!sql.isDeprecated(tag)) {
										error = new JSONObject();
										error.put("message", tag + " tag is a deprecated tag");
										error.put("type", "deprecated");
										error.put("line", i+1);
										error.put("col", j);
										errors.put(errorCount, error);
										errorCount += 1;
										faultyTag = true;
									}
									tagChecked = true;
								}
								
							
								if(charArray.getChar(j)=='>') {
								
								
									/* ################################################# */
								/* ################################################# */
								/* ################################################# */
								/* ################################################# */
								/* ################################################# */
								/*
								error = new JSONObject();
								error.put("message", tagStart + " " + j + " " + tag + " is not a valid HTML tag");
								error.put("type", "syntax");
								error.put("line", i+1);
								error.put("col", j);
								errors.put(errorCount, error);
								errorCount += 1;
								*/
								/* ################################################# */
								/* ################################################# */
								/* ################################################# */
								/* ################################################# */
								/* ################################################# */
								
								
								
									// Check if self closing
									selfClosing = sql.isSelfClosing(tag);
								
								
									int closingChecker = j-1;
									while (charArray.getChar(closingChecker) == ' ' && closingChecker > 0) {
										
										closingChecker = closingChecker-1;
										
									}
								
								
									// Check if comment tag closed
									
									if (selfClosing) { 		
										
										if(charArray.getChar(closingChecker) != '/') {
											
											selfClosingError = true;
											
											if (selfClosingError) {
												error = new JSONObject();
												error.put("message", tag + " is self-closing but is not self closed.");
												error.put("type", "semantic");
												error.put("line", i+1);
												error.put("col", closingChecker);
												errors.put(errorCount, error);
												errorCount += 1;
											}
										} else {
										
											selfClosingError = false;
											if (closingChecker > 0) {
												if (charArray.getChar(closingChecker-1) != ' ') {
													selfClosingError = true;
												}
											}
											
											if (selfClosingError) {
												error = new JSONObject();
												error.put("message", tag + " is self-closing but is not self closed. You may want to include a space before the closing '/'.");
												error.put("type", "semantic");
												error.put("line", i+1);
												error.put("col", closingChecker);
												errors.put(errorCount, error);
												errorCount += 1;
											}
										
										}
										selfClosing = false;
									} else if (!selfClosing) { 						
										if(charArray.getChar(closingChecker) == '/') {
											
											selfClosingError = true;
											
											if (closingChecker > 0) {
												if (charArray.getChar(closingChecker-1) != ' ') {
													selfClosingError = false;
												}
											}
											
											if (selfClosingError) {									
										
												error = new JSONObject();
												error.put("message", tag + " is self-closed but is not allowed to be.");
												error.put("type", "semantic");
												error.put("line", i+1);
												error.put("col", closingChecker);
												errors.put(errorCount, error);
												errorCount += 1;
											}
										}
										selfClosing = false;
									}
							
									/* Resets flag values and tag string */
									closeTag = true;
									openTag = false;
									tag = null;
									endTagName = false;
									tagChecked = false;
									faultyTag = false;
								}	
							}
						
						}
						else {
							if (j != 0) {
									
								if((charArray.getChar(j) != '>')) {
									if ((charArray.getChar(j-1) == ' ') && (charArray.getChar(j) != ' ')) {
										if( (Character.isLetter(charArray.getChar(j))) == true) {
											attrStart = j;
											openAttr = true;
										
										}
									}
								} else {
									j = j - 1;
								}
							}
							whiteSpaceFlag = false;
						}
						
						
					}
					if (startComment == true && j > 2) {
						if((charArray.getChar(j-2)=='-') && (charArray.getChar(j-1)=='-') && (charArray.getChar(j)=='>')) {
							startComment = false;
						}
					}
					
					/* Will need to be moved into the startComment==false if loop */
					/* Checks if attribute has been detected, need to check if
					 * having code such as <img src = "... (space between
					 * attribute and '=' validates). If so, will need to strip
					 * out whitespace after attribute name before throwing it
					 * into check. */
					if(charArray.getChar(j) == '=') {
						if(openAttr == true) {
							String attr = charArray.getString(attrStart, j-1);
							List<String> attrList = new ArrayList<String>();
							attrList = sql.getAttr(tag);
							boolean validAttr = false;
							for (int a = 0; a < attrList.size(); a++) {
								if(attrList.get(a).equals(attr)) {
									validAttr = true;	
								}
							
							}
							if (!validAttr) {
								error = new JSONObject();
								error.put("message", attr + " is not a valid attribute for " + tag);
								error.put("type", "syntax");
								error.put("line", i+1);
								error.put("col", j);
								errors.put(errorCount, error);
								errorCount += 1;
							}
					
						}
					}
					
					/* Will need to be moved into the startComment==false if loop */
					
					
				}
			}
			errors.put("count", errorCount);
			return errors;
		}			
		
		
		
		
		
		/**
		 * Class for accessing the character array of the line of the HTML file
		 * being parsed. 
		 *
		 * @author Ameer Sabri
		 */
		public class CharArray {
				
			private char[] charArray;
				
			/**
			 * Constructor for the CharArray.
			 */
			public CharArray(char[] charArray) {
				this.charArray = charArray;				
			}
					
			/**
			 * Returns the character at the index given.
			 *
			 * @param i the index of the character in the array.
			 * @return the character at the specified index.
			 */
			public char getChar(int i) {
				return charArray[i];
			}
					
			/**
			 * Returns the length of the CharArray.
			 *
			 * @return the length of the CharArray
			 */
			public int getLength() {
				return charArray.length;
			}
					
			/**
			 * Returns a String that returns the tag given between the string
			 * start and end index given in the array.
			 *
			 * @param tagStart the start index of the string
			 * @param tagEnd the end index of the string
			 * @return the string specified by the string's start and end index. 
			 */
			public String getString(int strStart, int strEnd) {
					
				StringBuilder str = new StringBuilder();
				
				/* Iterates through the array between the indices
				 * and adds each character to the tag string. 
				 */
				for(int j=strStart; j < (strEnd + 1); j++) {
					str.append(this.getChar(j));
				}
					
				return str.toString();
			}			
		}

}