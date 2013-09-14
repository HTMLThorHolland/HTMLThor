package tests;

import java.util.*;

import net.sourceforge.jwebunit.junit.WebTester;

import org.json.simple.JSONObject;
import org.junit.*;

import static net.sourceforge.jwebunit.junit.JWebUnit.*; 

/* 
	These are the back end functional tests
	They include testing the actual output of particular inputs in order to test the check.jsp functionality
	i.e. A test for the page source section will check not just that SOMETHING is there after upload (as public void Assert_Page_Source() does),
		 but that the source code from the original file is uploaded. (and then various checks on the correct highlighting of errors.


*/


// This class includes all tag checks, is missing the checks on attribute particulars
public class baseBackEnd_Functional_Tests {

	
	

    
	// Nested classes of required, singular and self-closing elements
	
	// for each of the functions in this class check that code with multiple of them correctly displays the isSingular error
	public static class singularTags {
		
		@Before
	    public void prepare() {
	        
	    }
		
		@Test
		public void Check_Singular_Doctype() {
			
		}
		
		public void Check_Singular_html() {
		
		}
		
		public void Check_Singular_head() {
		
		}
		
		public void Check_Singular_body() {
		
		}
		
		public void Check_Singular_title() {
		
		}
		
		public void Check_Singular_base() {
		
		}
		
		public void Check_Singular_main() {
		
		}
		
	}
	
	// All of the functions in the following class should check whether ? (self closing is done or not done? Recommend which one?)
	public class selfClosingTags {
		
		public void Check_Closing_base() {
		
		}
		
		public void Check_Closing_link() {
		
		}
		
		public void Check_Closing_meta() {
		
		}
		
		public void Check_Closing_hr() {
		
		}
		
		public void Check_Closing_br() {
		
		}
		
		public void Check_Closing_wbr() {
		
		}
		
		public void Check_Closing_img() {
		
		}
		
		public void Check_Closing_param() {
		
		}
		
		public void Check_Closing_source() {
		
		}
		
		public void Check_Closing_track() {
		
		}
		
		public void Check_Closing_input() {
		
		}
		
		public void Check_Closing_keygen() {
		
		}
		
		public void Check_Closing_menutitem() {
		
		}
		
	}
	
	public static class isRequired {
		
		@Before
	    public void prepare() {
			
	    }
	
		// Check that a doctype error is both returned and not returned (i.e when a file with this error and without this error are uploaded)
		@Test
		public void Check_Exists_Doctype() {
			
			List<String> testingSource = new ArrayList<String>();
			
			//create html input to error check
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Just a test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("</body>");
			testingSource.add("</html>");
			
			JSONObject testingResult = Check.findErrors(testingSource);
			
			//assert correct number of lines are stored
			Assert.assertEquals(7, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));
			
			//assert correct error type is stored
			Assert.assertEquals("syntax", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("type"));
			//assert correct error message is stored
			Assert.assertEquals("First element should be doctype", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("message"));
			//assert error is on correct line
			Assert.assertEquals(1, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("line"));
			
		}
	
		// Check that there is an error for not having any html tags
		@Test
		public void Check_Exists_html() {
		
			List<String> testingSource = new ArrayList<String>();
			
			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<head>");
			testingSource.add("<title>Just a test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("</body>");
			
			JSONObject testingResult = Check.findErrors(testingSource);
			
			//assert correct number of lines are stored
			Assert.assertEquals(6, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));
			
			//assert correct error type is stored
			Assert.assertEquals("syntax", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("type"));
			//assert correct error message is stored
			Assert.assertEquals("You are missing html tag", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("message"));
			//assert error is on correct line
			Assert.assertEquals(2, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("line"));
			
		}
		
		// Check that there is an error for not having any head tags
		@Test
		public void Check_Exists_head() {
			

			List<String> testingSource = new ArrayList<String>();
			
			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<title>Just a test</title>");
			testingSource.add("<body>");
			testingSource.add("</body>");
			testingSource.add("</html>");
			
			JSONObject testingResult = Check.findErrors(testingSource);
			
			//assert correct number of lines are stored
			Assert.assertEquals(6, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));
			
			//assert correct error type is stored
			Assert.assertEquals("syntax", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("type"));
			//assert correct error message is stored
			Assert.assertEquals("You are missing head tag", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("message"));
			//assert error is on correct line
			Assert.assertEquals(3, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("line"));
			
		}
		
		// Check that there is an error for not having any body tags
		@Test
		public void Check_Exists_body() {

			List<String> testingSource = new ArrayList<String>();
			
			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Just a test</title>");
			testingSource.add("</head>");
			testingSource.add("</html>");
			
			JSONObject testingResult = Check.findErrors(testingSource);
			
			//assert correct number of lines are stored
			Assert.assertEquals(6, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));
			
			//assert correct error type is stored
			Assert.assertEquals("syntax", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("type"));
			//assert correct error message is stored
			Assert.assertEquals("You are missing body tag", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("message"));
			//assert error is on correct line
			Assert.assertEquals(6, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("line"));
		}
		
		// Check that there is a warning for not having any title tags
		@Test
		public void Check_Exists_title() {

			List<String> testingSource = new ArrayList<String>();
			
			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("</body>");
			testingSource.add("</html>");
			
			JSONObject testingResult = Check.findErrors(testingSource);
			
			//assert correct number of lines are stored
			Assert.assertEquals(7, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));
			
			//assert correct error type is stored
			Assert.assertEquals("warning", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("type"));
			//assert correct error message is stored
			Assert.assertEquals("You are missing title tag", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("message"));
			//assert error is on correct line
			Assert.assertEquals(4, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("line"));
		}
	
		// A file with all required tags to ensure no unexpected errors are present.
		@Test
		public void Check_Control_required_tags() {
			
			List<String> testingSource = new ArrayList<String>();
			
			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Just a test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("</body>");
			testingSource.add("</html>");
			
			JSONObject testingResult = Check.findErrors(testingSource);
			
			//assert correct number of lines are stored
			Assert.assertEquals(8, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(0, ((JSONObject) testingResult.get("errors")).get("count"));
		}
		
		// A file with all required tags to ensure no unexpected errors are present.
		@Test
		public void Check_multiple_missing_required() {

			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(6, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(2, ((JSONObject) testingResult.get("errors")).get("count"));
			
			//assert correct error type for first error is stored
			Assert.assertEquals("syntax", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("type"));
			//assert correct error message for first error is stored
			Assert.assertEquals("First element should be doctype", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("message"));
			//assert first error is on correct line
			Assert.assertEquals(1, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("line"));
			
			//assert correct error type for second error is stored
			Assert.assertEquals("warning", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("type"));
			//assert correct error message for second error is stored
			Assert.assertEquals("You are missing title tag", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("message"));
			//assert second error is on correct line
			Assert.assertEquals(3, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("line"));
		}
	}
	
	// Test the error associated with using nonexistent tags
	public void Existing_Tags() {
	
	}
	
	// Test the warning/error associated with deprecated tags
	public void Deprecated_Tags() {
	
	}
	
	// Check that statements in comments are not checked for errors (by passing in errors within comment tags)
	public void Check_Comments() {
		
	}
	
	// Check a couple of elements that are not self closing (i.e. upload file that does not close an element properly, check error is returned)
	public void Check_Not_Self_Closing() {
	
	}
	
	// Check that a warning is returned for the use of tables (i.e. DO NOT use tables for layout, bad practice)
	public void Check_Use_of_Tables() {
	
	}
}
