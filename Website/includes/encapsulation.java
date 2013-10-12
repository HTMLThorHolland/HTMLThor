package com.htmlthor;

import java.util.ArrayList;

/**
 * Encapsulation class for checking encapsulation errors in HTML code.
 * 
 * Incomplete; do not integrate into error checking code yet.
 * 
 * Work in Progress
 *
 * @author Ameer Sabri
 */
public class Encapsulation extends Mysqlfunctions {
	/* Declarations for error codes. Currently dummy values. */
	public static final int ENCAPSULATION_ERROR = 100;
	public static final int ELEMENT_INSIDE_ITSELF = 200;
	public static final int NOT_TABLE_ELEMENT = 300;
	public static final int TABLE_ELEMENT_OUT_OF_TABLE = 324;
	public static final int NOT_FORM_ELEMENT = 400;
	public static final int FORM_ELEMENT_OUT_OF_FORM = 435;
	public static final int OUTSIDE_HTML_TAGS = 500;
	public static final int INVALID_HEAD_ELEMENT = 600;
	public static final int INVALID_BODY_ELEMENT = 700;
	public static final int UNCLOSED_ELEMENT = 800;
	public static final int STRAY_CLOSE_TAG = 900;
	
	/**
	 * Element class for handling parsed elements and storing their location
	 * values, as well as an error code.
	 * 
	 * @author Ameer Sabri
	 */
	class Element {
		String name;
		int line;
		int colStart;
		int colEnd;
		int error;
		
		public Element(String name, int line, int colStart, int colEnd) {
			name = this.name;
			line = this.line;
			colStart = this.colStart;
			colEnd = this.colEnd;
			error = 0;
		}
		
		public String getName() {
			return name;
		}
		
		public ArrayList<Integer> getPosition() {
			ArrayList<Integer> position = new ArrayList<Integer>(3);
			position.add(line);
			position.add(colStart);
			position.add(colEnd);
			
			return position;
		}
		
		public void setError(int error) {
			error = this.error;
		}
		
		public int getError() {
			return error;
		}
		
		public String toString() {
			StringBuilder sb = new StringBuilder();
			
			sb.append(name).append(" ").append(line).append(" ");
			sb.append(colStart).append(" ").append(colEnd).append(" ");
			if(error != 0) {
				sb.append(getErrMsg(error));
			} else {
				sb.append("none");
			}
			
			return sb.toString();
		}
	}
	/* Flags to check whether certain elements have been opened. */
	boolean htmlElementOpen = false;
	boolean headElementOpen = false;
	boolean bodyElementOpen = false;
	boolean tableElementOpen = false;
	boolean formElementOpen = false;
	
	//ArrayList<Element> elementList;
	ArrayList<Element> openedElements;
	ArrayList<Element> errorList;
	
	public Encapsulation() {
		//elements = new ArrayList<Element>();
		openedElements = new ArrayList<Element>();
		errorList = new ArrayList<Element>();
	}
	
	private boolean isClosingElement(String element) {
		if(element.charAt(0) == '/') {
			return true;
		}
		
		return false;
	}
	
	public ArrayList<String> getErrorList() {
		ArrayList<String> errors = new ArrayList<String>(errorList.size() + openedElements.size());
		addUnclosedElements(errors);
		
		for(int i = 0; i < errorList.size(); i++) {
			errors.add(errorList.get(i).toString());
		}
		
		//still need to sort list by line then colStart
		
		return errors;
	}
	
	/**
	 * Helper function for getErrorList. Adds unclosed elements to the error list.
	 * 
	 * @param errors Error list to be added to
	 * @see getErrorList
	 */
	private void addUnclosedElements(ArrayList<String> errors) {
		if(openedElements.size() > 0) {
			for(int i = 0; i < openedElements.size(); i++) {
				openedElements.get(i).setError(UNCLOSED_ELEMENT);
				errors.add((openedElements.get(i)).toString());
			}
		}
	}
	
	public void encapsulation(String element, int line, int colStart, int colEnd) {
		Element e = new Element(element, line, colStart, colEnd);
		
		if(!htmlElementOpen) {
			if((e.getName() != "!DOCTYPE") || (e.getName() != "html"))
				e.setError(OUTSIDE_HTML_TAGS);
		}
		
		if(headElementOpen) {
			if(!isMeta(e.getName())) {
				e.setError(INVALID_HEAD_ELEMENT);
			}
		}
		
		if(bodyElementOpen) {
			if(isTableElement(e.getName())) {
				e.setError(TABLE_ELEMENT_OUT_OF_TABLE);
			} else if(isFormElement(e.getName())) {
				e.setError(FORM_ELEMENT_OUT_OF_FORM);
			}
		}
		
		if(tableElementOpen) {
			if(!isTableElement(e.getName())) {
				e.setError(NOT_TABLE_ELEMENT);
			}
		}
		
		if(formElementOpen) {
			if(!isFormElement(e.getName())) {
				e.setError(NOT_FORM_ELEMENT);
			}
		}
		
		if(!isClosingElement(e.getName())) {
			openedElements.add(e);
		} else {
			if(e.getName() == "/html") {
				htmlElementOpen = false;
			}
			
			if(e.getName() == "/head") {
				headElementOpen = false;
			}
			
			if(e.getName() == "/body") {
				bodyElementOpen = false;
			}
		}
		
		if(e.getError() != 0) {
			errorList.add(e);
		}
	}
}
