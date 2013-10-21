package com.htmlthor;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Iterator;

/**
 * Encapsulation class for checking encapsulation errors in HTML code.
 * 
 * Incomplete; do not integrate into error checking code yet.
 * 
 * WORK IN PROGRESS
 * 
 * @author Ameer Sabri
 */
public class Encapsulation extends Mysqlfunctions {
	/* Declarations for error codes. Currently dummy values.
	 * Will add to the database soon. */
	public static final int ENCAPSULATION_ERROR = 101;
	public static final int ELEMENT_INSIDE_ITSELF = 102;
	public static final int NOT_TABLE_ELEMENT = 103;
	public static final int TABLE_ELEMENT_OUT_OF_TABLE = 104;
	public static final int NOT_FORM_ELEMENT = 105;
	public static final int FORM_ELEMENT_OUT_OF_FORM = 106;
	public static final int OUTSIDE_HTML_TAGS = 107;
	public static final int INVALID_HEAD_ELEMENT = 108;
	public static final int INVALID_BODY_ELEMENT = 109;
	public static final int UNCLOSED_ELEMENT = 110;
	public static final int STRAY_CLOSE_TAG = 111;
	
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
		
		/**
		 * Basic null constructor.
		 */
		public Element() {
			name = null;
			line = 0;
			colStart = 0;
			colEnd = 0;
			error = 0;
		}
		
		/**
		 * Constructor.
		 * 
		 * @param name the name of the element
		 * @param line the line in the code the element is on
		 * @param colStart the column where the element's name starts
		 * @param colEnd the column where the element's name ends
		 */
		public Element(String name, int line, int colStart, int colEnd) {
			name = this.name;
			line = this.line;
			colStart = this.colStart;
			colEnd = this.colEnd;
			error = 0;
		}
		
		/**
		 * Getter for the element name.
		 * 
		 * @return the name of the element
		 */
		public String getName() {
			return name;
		}
		
		/**
		 * Getter for the position of the element. Returns the values in an
		 * ArrayList with 3 values, in the order
		 * (line, column start, column end) respectively.
		 * 
		 * @return an ArrayList containing the positional values of the element.
		 */
		public ArrayList<Integer> getPosition() {
			ArrayList<Integer> position = new ArrayList<Integer>(3);
			position.add(line);
			position.add(colStart);
			position.add(colEnd);
			
			return position;
		}
		
		/**
		 * Setter for the error code for the Element.
		 * 
		 * @param error the error code
		 */
		public void setError(int error) {
			error = this.error;
		}
		
		/**
		 * Getter for the error code.
		 * 
		 * @return the error code
		 */
		public int getError() {
			return error;
		}
		
		/**
		 * Creates a string representation of the Element in the form
		 * "name x y z error message" where x, y and z are the positional values
		 * the line, column start, and column end values associated with the
		 * Element.
		 * 
		 * @return String representation of Element
		 */
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
	
	/* Data structures that contain elements and errors. */
	ArrayDeque<Element> openedElements;
	ArrayList<Element> errorList;
	ArrayList<Element> encapErrorList;
	
	/**
	 * Constructor. Initialises the opened elements deque and the error list.
	 */
	public Encapsulation() {
		openedElements = new ArrayDeque<Element>();
		errorList = new ArrayList<Element>();
		encapErrorList = new ArrayList<Element>();
	}
	
	/**
	 * Returns an ArrayList containing the Elements with errors, converted into
	 * Strings. Should only be called after a file has been parsed.
	 * 
	 * @return an ArrayList of the errors
	 */
	public ArrayList<String> getErrorList() {
		/* Creates a new ArrayList big enough for the current error list and
		 * the unclosed elements. */
		ArrayList<String> errors = new ArrayList<String>(errorList.size() + openedElements.size() + encapErrorList.size());
		addUnclosedElements();
		addEncapErrorsToList();
		
		/* Iterates over the error list and adds them to errors. */
		for(int i = 0; i < errorList.size(); i++) {
			errors.add(errorList.get(i).toString());
		}
		
		//sort the errors before returning them?
		
		return errors;
	}
	
	/**
	 * Helper function for getErrorList. Adds unclosed elements to the error 
	 * list.
	 *
	 * @see getErrorList
	 */
	private void addUnclosedElements() {
		Element e = new Element();
		while(!openedElements.isEmpty()) {
			e = openedElements.removeLast();
			addError(e, UNCLOSED_ELEMENT);
		}
	}
	
	/**
	 * Helper function for getErrorList. Adds encapsulation errors to the error 
	 * list.
	 * 
	 * @see getErrorList
	 */
	private void addEncapErrorsToList() {
		errorList.addAll(encapErrorList);
	}
	
	/**
	 * Helper function that takes an element and an error code, and adds it
	 * to the error list.
	 * 
	 * @param e the element with the error to be added
	 * @param errorCode the error code of the error
	 * @see getErrorList
	 * @see encapsulation
	 */
	private void addError(Element e, int errorCode) {
		e.setError(errorCode);
		errorList.add(e);
	}
	
	/**
	 * Adds an error to the encapsulation errors list.
	 * 
	 * @param e the element with the encapsulation error
	 * @param errorCode the error code of the error
	 */
	private void addEncapError(Element e, int errorCode) {
		e.setError(errorCode);
		if(encapErrorList.contains(e)) {
			encapErrorList.add(e);
		}
	}
	
	/**
	 * Encapsulation function that is called on every element parsed into it.
	 * 
	 * @param element the name of the element
	 * @param line the line the element is on
	 * @param colStart the starting column on the line the element name is on
	 * @param colEnd the ending column on the line the element name is on
	 * @see Element
	 */
	public void encapsulation(String element, int line, int colStart, int colEnd) {
		Element e = new Element(element, line, colStart, colEnd);
		
		if(!htmlElementOpen) {
			if((!e.getName().equals("!DOCTYPE")) || (!e.getName().equals("html")))
				addError(e, OUTSIDE_HTML_TAGS);
		}
		
		if(headElementOpen) {
			if(!isMeta(e.getName())) {
				addError(e, INVALID_HEAD_ELEMENT);
			}
		}
		
		if(bodyElementOpen) {
			if(isTableElement(e.getName()) && !tableElementOpen) {
				addError(e, TABLE_ELEMENT_OUT_OF_TABLE);
			} else if(isFormElement(e.getName()) && !formElementOpen) {
				addError(e, FORM_ELEMENT_OUT_OF_FORM);
			}
		}
		
		if(!isSelfClosing(e.getName())) {
			tagEncapsulation(e);
		}
	}
	
	/**
	 * Helper function for the encapsulation function. Handles the ordering of
	 * open and close tags, as well as unclosed opened tags and stray close tags.
	 * 
	 * @param e the element
	 * @see encapsulation
	 */
	private void tagEncapsulation(Element e) {

		Iterator<Element> itr;
		ArrayDeque<Element> deque = new ArrayDeque<Element>();
		
		if(e.getName().charAt(0) != '/') {
			itr = openedElements.iterator();
			
			while(itr.hasNext()) {
				if (e.getName() == itr.next().getName()) {
					addError(e, ELEMENT_INSIDE_ITSELF);
				}
			}
			
			openedElements.push(e);
			
			if(e.getName().equals("html")) {
				htmlElementOpen = true;
			}
			
			if(e.getName().equals("head")) {
				headElementOpen = true;
			}
			
			if(e.getName().equals("body")) {
				bodyElementOpen = true;
			}
			
		} else {
			if(openedElements.isEmpty()) {
				addEncapError(e, STRAY_CLOSE_TAG);
			}
				
			while(!openedElements.isEmpty()) {
				if(e.getName().substring(1).equals(openedElements.peek().getName())) {
					openedElements.pop();
					reAddOpenedElements(deque);
					
					if(e.getName().equals("/html")) {
						htmlElementOpen = false;
					}
						
					if(e.getName().equals("/head")) {
						headElementOpen = false;
					}
						
					if(e.getName().equals("/body")) {
						bodyElementOpen = false;
					}
						
					if(e.getName().equals("/table")) {
						tableElementOpen = false;
						itr = openedElements.iterator();
						while(itr.hasNext()) {
							if (itr.next().getName() == "table") {
								tableElementOpen = true;
							}
						}
					}
						
					if(e.getName().equals("/form")) {
						formElementOpen = false;
						itr = openedElements.iterator();
						while(itr.hasNext()) {
							if (itr.next().getName() == "table") {
								formElementOpen = true;
							}
						}
					}
					
					break;
				} else {
					addEncapError(openedElements.peek(), UNCLOSED_ELEMENT);
					deque.push(openedElements.peek());
					openedElements.pop();
				}
			}
			
			if(openedElements.isEmpty() && !deque.isEmpty()) {
				int size = deque.size();
				reAddOpenedElements(deque);
				removeEncapErrors(size);
				addEncapError(openedElements.peek(), UNCLOSED_ELEMENT);
			}
		}
	}
	
	/**
	 * Helper function for tagEncapsulation. Adds opened elements back to the
	 * opened elements deque.
	 * 
	 * @param deque the deque containing the opened elements
	 * @see tagEncapsulation
	 */
	private void reAddOpenedElements(ArrayDeque<Element> deque) {
		while(!deque.isEmpty()) {
			openedElements.push(deque.pop());
		}
	}
	
	/**
	 * Helper function for encapErrorList. Removes invalid encapsulation errors
	 * from the encapsulation error list.
	 * 
	 * @param size the number of errors to be removed
	 */
	private void removeEncapErrors(int size) {
		for(int i = 0; i < size; i++) {
			encapErrorList.remove(encapErrorList.size() - 1);
		}
	}
}
