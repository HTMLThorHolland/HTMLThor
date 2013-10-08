/* Encapsulation class. Tag is fed to the encapsulation function within the * instantiated encapsulation class, and is added to an ArrayDeque. The  * encapsulation function is a void function. If errors are desired, the * returnErrors function returns the name of the tag, and various positional * data separated by whitespace as a String. * * Work in progress - need to work out best way to return errors */ import java.util.ArrayDeque;import java.util.ArrayList;import java.util.Arrays;import java.util.Iterator;public class Encapsulation {		class Element {		String name;		int line;		int colStart;		int colEnd;				public Element(String name, int line, int colStart, int colEnd) {			name = this.name;			line = this.line;			colStart = this.colStart;			colEnd = this.colEnd;		}				public String getName() {			return name;		}				public ArrayList<Integer> getPosition() {			ArrayList<Integer> list = new ArrayList<Integer>(3);			list.add(line);			list.add(colStart);			list.add(colEnd);						return list;		}				public String toString() {			StringBuilder sb = new StringBuilder(30);			sb.append(name).append(" ").append(line).append(" ");			sb.append(colStart).append(" ").append(colEnd);						return sb.toString();		}	}		ArrayDeque<Element> deque;	ArrayDeque<Element> errorDeque;	boolean htmlElementExists = false;	boolean headElementExists = false;	boolean titleElementExists = false;	boolean bodyElementExists = false;	boolean headTagOpen = false;	boolean bodyTagOpen = false;	boolean tableOpen = false;	boolean formOpen = false;	String[] formElements = {"fieldset", "legend", "label", "input", "button",			"select", "datalist", "optgroup", "option", "textarea", "keygen",			"output", "progress", "meter"};	String[] tableElements = {"caption", "colgroup", "col", "tbody", "thead",			"tfoot", "tr", "td", "th"};		public Encapsulation() {		deque = new ArrayDeque<Element>();		errorDeque = new ArrayDeque<Element>();	}		private void addElement(Element e) {			if(headTagOpen) {							}						if(bodyTagOpen) {							}						if(formOpen) {							} else if(Arrays.asList(formElements).contains(e.getName())) {							}						if(tableOpen) {				if(e.getName() == "table") {					//return error...table within table				}			} else if(Arrays.asList(tableElements).contains(e.getName())) {				//return error			}						deque.add(e);	}		public void encapsulation(String tag, int line, int colStart, int colEnd) {		Element element = new Element(tag, line, colStart, colEnd);		//if element is not singular, add		addElement(element);	}		public ArrayList<String> returnErrors() {		ArrayList<String> list = new ArrayList<String>(errorDeque.size());		for(Iterator<Element> i = errorDeque.iterator(); i.hasNext();) {			list.add(i.next().toString());		}				return list;	}}