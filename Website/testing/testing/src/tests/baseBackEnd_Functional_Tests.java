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
	public static class selfClosingTags {

		@Test
		public void Check_Closing_base() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<base href=\"http://www.test.com\">");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type is stored
			Assert.assertEquals("syntax", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("type"));
			//assert correct error message is stored
			Assert.assertEquals("base tags should be self-closed", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("message"));
			//assert error is on correct line
			Assert.assertEquals(7, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("line"));

		}

		@Test
		public void Check_Closing_base_control() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<base href=\"http://www.test.com\" />");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(0, ((JSONObject) testingResult.get("errors")).get("count"));

		}

		@Test
		public void Check_Closing_link() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<link href=\"test.css\">");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type is stored
			Assert.assertEquals("syntax", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("type"));
			//assert correct error message is stored
			Assert.assertEquals("link tags should be self-closed", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("message"));
			//assert error is on correct line
			Assert.assertEquals(7, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("line"));
		}

		@Test
		public void Check_Closing_link_control() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<link href=\"test.css\" />");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(0, ((JSONObject) testingResult.get("errors")).get("count"));
		}

		@Test
		public void Check_Closing_meta() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Test</title>");
			testingSource.add("<meta charset=\"utf-8\">");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type is stored
			Assert.assertEquals("syntax", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("type"));
			//assert correct error message is stored
			Assert.assertEquals("meta tags should be self-closed", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("message"));
			//assert error is on correct line
			Assert.assertEquals(5, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("line"));		
		}

		@Test
		public void Check_Closing_meta_control() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Test</title>");
			testingSource.add("<meta charset=\"utf-8\" />");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(0, ((JSONObject) testingResult.get("errors")).get("count"));		
		}

		@Test
		public void Check_Closing_hr() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<hr>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type is stored
			Assert.assertEquals("syntax", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("type"));
			//assert correct error message is stored
			Assert.assertEquals("hr tags should be self-closed", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("message"));
			//assert error is on correct line
			Assert.assertEquals(7, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("line"));	
		}

		@Test
		public void Check_Closing_hr_control() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<hr />");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(0, ((JSONObject) testingResult.get("errors")).get("count"));
		}

		@Test
		public void Check_Closing_br() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<br>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type is stored
			Assert.assertEquals("syntax", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("type"));
			//assert correct error message is stored
			Assert.assertEquals("br tags should be self-closed", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("message"));
			//assert error is on correct line
			Assert.assertEquals(7, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("line"));		
		}

		@Test
		public void Check_Closing_br_control() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<br />");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(0, ((JSONObject) testingResult.get("errors")).get("count"));
		}

		@Test
		public void Check_Closing_wbr() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<wbr>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type is stored
			Assert.assertEquals("syntax", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("type"));
			//assert correct error message is stored
			Assert.assertEquals("wbr tags should be self-closed", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("message"));
			//assert error is on correct line
			Assert.assertEquals(7, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("line"));		
		}

		@Test
		public void Check_Closing_wbr_control() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<wbr />");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(0, ((JSONObject) testingResult.get("errors")).get("count"));		
		}

		@Test
		public void Check_Closing_img() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<img src=\"test.jpg\" alt=\"test\">");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type is stored
			Assert.assertEquals("syntax", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("type"));
			//assert correct error message is stored
			Assert.assertEquals("img tags should be self-closed", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("message"));
			//assert error is on correct line
			Assert.assertEquals(7, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("line"));		
		}

		@Test
		public void Check_Closing_img_control() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<img src=\"test.jpg\" alt=\"test\" />");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(0, ((JSONObject) testingResult.get("errors")).get("count"));	
		}

		@Test
		public void Check_Closing_param() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<object data=\"test.swf\" type=\"application/x-shockwave-flash\">");
			testingSource.add("<param name=\"test\">");
			testingSource.add("</object>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(11, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type is stored
			Assert.assertEquals("syntax", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("type"));
			//assert correct error message is stored
			Assert.assertEquals("param tags should be self-closed", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("message"));
			//assert error is on correct line
			Assert.assertEquals(8, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("line"));		
		}

		@Test
		public void Check_Closing_param_control() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<object data=\"test.swf\" type=\"application/x-shockwave-flash\">");
			testingSource.add("<param name=\"test\" />");
			testingSource.add("</object>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(11, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(0, ((JSONObject) testingResult.get("errors")).get("count"));
		}

		@Test
		public void Check_Closing_source() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<video>");
			testingSource.add("<source src=\"test.mov\">");
			testingSource.add("</video>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(11, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type is stored
			Assert.assertEquals("syntax", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("type"));
			//assert correct error message is stored
			Assert.assertEquals("source tags should be self-closed", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("message"));
			//assert error is on correct line
			Assert.assertEquals(8, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("line"));				
		}

		@Test
		public void Check_Closing_source_control() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<video>");
			testingSource.add("<source src=\"test.mov\" />");
			testingSource.add("</video>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(11, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(0, ((JSONObject) testingResult.get("errors")).get("count"));				
		}

		@Test
		public void Check_Closing_track() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<video>");
			testingSource.add("<track src=\"test.srt\">");
			testingSource.add("</video>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(11, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type is stored
			Assert.assertEquals("syntax", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("type"));
			//assert correct error message is stored
			Assert.assertEquals("track tags should be self-closed", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("message"));
			//assert error is on correct line
			Assert.assertEquals(8, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("line"));			
		}

		@Test
		public void Check_Closing_track_control() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<video>");
			testingSource.add("<track src=\"test.srt\" />");
			testingSource.add("</video>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(11, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(0, ((JSONObject) testingResult.get("errors")).get("count"));		
		}

		@Test
		public void Check_Closing_input() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<form action=\"test.php\">");
			testingSource.add("<input type=\"text\">");
			testingSource.add("</form>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(11, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type is stored
			Assert.assertEquals("syntax", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("type"));
			//assert correct error message is stored
			Assert.assertEquals("input tags should be self-closed", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("message"));
			//assert error is on correct line
			Assert.assertEquals(8, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("line"));			
		}

		@Test
		public void Check_Closing_input_control() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<form action=\"test.php\">");
			testingSource.add("<input type=\"text\" />");
			testingSource.add("</form>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(11, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(0, ((JSONObject) testingResult.get("errors")).get("count"));			
		}

		@Test
		public void Check_Closing_keygen() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<form action=\"test.php\">");
			testingSource.add("<keygen name=\"test\">");
			testingSource.add("</form>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(11, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type is stored
			Assert.assertEquals("syntax", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("type"));
			//assert correct error message is stored
			Assert.assertEquals("keygen tags should be self-closed", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("message"));
			//assert error is on correct line
			Assert.assertEquals(8, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("line"));			
		}

		@Test
		public void Check_Closing_keygen_control() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<form action=\"test.php\">");
			testingSource.add("<keygen name=\"test\" />");
			testingSource.add("</form>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(11, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(0, ((JSONObject) testingResult.get("errors")).get("count"));		
		}

		@Test
		public void Check_Closing_menuitem() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<menu label=\"test\">");
			testingSource.add("<menuitem type=\"command\">");
			testingSource.add("</menu>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(11, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type is stored
			Assert.assertEquals("syntax", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("type"));
			//assert correct error message is stored
			Assert.assertEquals("menuitem tags should be self-closed", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("message"));
			//assert error is on correct line
			Assert.assertEquals(8, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("0")).get("line"));			
		}

		@Test
		public void Check_Closing_menuitem_control() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<menu label=\"test\">");
			testingSource.add("<menuitem type=\"command\" />");
			testingSource.add("</menu>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(11, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(0, ((JSONObject) testingResult.get("errors")).get("count"));		
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

	public static class Nonexistent_Tags {

		// Test the error associated with using nonexistent tags
		@Test
		public void Non_Existing_Tags1() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Just a test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<nonexistent> </nonexistent>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type for second error is stored
			Assert.assertEquals("syntax", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("type"));
			//assert correct error message for second error is stored
			Assert.assertEquals("You are using a nonexistent tag", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("message"));
			//assert second error is on correct line
			Assert.assertEquals(7, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("line"));
		}

		// Test the error associated with using nonexistent tags
		@Test
		public void Non_Existing_Tags2() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Just a test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<anotherone> </anotherone>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type for second error is stored
			Assert.assertEquals("syntax", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("type"));
			//assert correct error message for second error is stored
			Assert.assertEquals("You are using a nonexistent tag", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("message"));
			//assert second error is on correct line
			Assert.assertEquals(7, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("line"));
		}

		// Test the error associated with using nonexistent tags
		@Test
		public void Non_Existing_Tags3() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Just a test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<athirdtag> </athirdtag>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type for second error is stored
			Assert.assertEquals("syntax", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("type"));
			//assert correct error message for second error is stored
			Assert.assertEquals("You are using a nonexistent tag", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("message"));
			//assert second error is on correct line
			Assert.assertEquals(7, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("line"));
		}

	}

	// Test the warning/error associated with deprecated tags
	public static class Deprecated_Tags {

		@Test
		public void Check_Deprecated_acronym() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Just a test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<acronym> </acronym>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type for second error is stored
			Assert.assertEquals("deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("type"));
			//assert correct error message for second error is stored
			Assert.assertEquals("<acronym> is deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("message"));
			//assert second error is on correct line
			Assert.assertEquals(7, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("line"));
		}

		@Test
		public void Check_Deprecated_applet() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Just a test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<applet> </applet>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type for second error is stored
			Assert.assertEquals("deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("type"));
			//assert correct error message for second error is stored
			Assert.assertEquals("<applet> is deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("message"));
			//assert second error is on correct line
			Assert.assertEquals(7, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("line"));
		}

		@Test
		public void Check_Deprecated_basefont() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Just a test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<basefont> </basefont>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type for second error is stored
			Assert.assertEquals("deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("type"));
			//assert correct error message for second error is stored
			Assert.assertEquals("<basefont> is deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("message"));
			//assert second error is on correct line
			Assert.assertEquals(7, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("line"));
		}

		@Test
		public void Check_Deprecated_big() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Just a test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<big> </big>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type for second error is stored
			Assert.assertEquals("deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("type"));
			//assert correct error message for second error is stored
			Assert.assertEquals("<big> is deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("message"));
			//assert second error is on correct line
			Assert.assertEquals(7, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("line"));
		}

		@Test
		public void Check_Deprecated_blackface() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Just a test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<blackface> </blackface>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type for second error is stored
			Assert.assertEquals("deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("type"));
			//assert correct error message for second error is stored
			Assert.assertEquals("<blackface> is deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("message"));
			//assert second error is on correct line
			Assert.assertEquals(7, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("line"));
		}

		@Test
		public void Check_Deprecated_center() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Just a test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<center> </center>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type for second error is stored
			Assert.assertEquals("deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("type"));
			//assert correct error message for second error is stored
			Assert.assertEquals("<center> is deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("message"));
			//assert second error is on correct line
			Assert.assertEquals(7, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("line"));
		}

		@Test
		public void Check_Deprecated_dir() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Just a test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<dir> </dir>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type for second error is stored
			Assert.assertEquals("deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("type"));
			//assert correct error message for second error is stored
			Assert.assertEquals("<dir> is deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("message"));
			//assert second error is on correct line
			Assert.assertEquals(7, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("line"));
		}

		@Test
		public void Check_Deprecated_font() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Just a test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<font> </font>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type for second error is stored
			Assert.assertEquals("deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("type"));
			//assert correct error message for second error is stored
			Assert.assertEquals("<font> is deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("message"));
			//assert second error is on correct line
			Assert.assertEquals(7, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("line"));
		}

		@Test
		public void Check_Deprecated_frame() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Just a test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<frame> </frame>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type for second error is stored
			Assert.assertEquals("deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("type"));
			//assert correct error message for second error is stored
			Assert.assertEquals("<frame> is deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("message"));
			//assert second error is on correct line
			Assert.assertEquals(7, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("line"));
		}

		@Test
		public void Check_Deprecated_frameset() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Just a test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<frameset> </frameset>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type for second error is stored
			Assert.assertEquals("deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("type"));
			//assert correct error message for second error is stored
			Assert.assertEquals("<frameset> is deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("message"));
			//assert second error is on correct line
			Assert.assertEquals(7, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("line"));
		}

		@Test
		public void Check_Deprecated_isindex() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Just a test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<isindex> </isindex>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type for second error is stored
			Assert.assertEquals("deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("type"));
			//assert correct error message for second error is stored
			Assert.assertEquals("<isindex> is deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("message"));
			//assert second error is on correct line
			Assert.assertEquals(7, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("line"));
		}

		@Test
		public void Check_Deprecated_noframe() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Just a test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<noframe> </noframe>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type for second error is stored
			Assert.assertEquals("deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("type"));
			//assert correct error message for second error is stored
			Assert.assertEquals("<noframe> is deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("message"));
			//assert second error is on correct line
			Assert.assertEquals(7, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("line"));
		}

		@Test
		public void Check_Deprecated_strike() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Just a test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<strike> </strike>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type for second error is stored
			Assert.assertEquals("deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("type"));
			//assert correct error message for second error is stored
			Assert.assertEquals("<strike> is deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("message"));
			//assert second error is on correct line
			Assert.assertEquals(7, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("line"));
		}

		@Test
		public void Check_Deprecated_tt() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Just a test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<tt> </tt>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type for second error is stored
			Assert.assertEquals("deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("type"));
			//assert correct error message for second error is stored
			Assert.assertEquals("<tt> is deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("message"));
			//assert second error is on correct line
			Assert.assertEquals(7, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("line"));
		}

		@Test
		public void Check_Deprecated_xmp() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Just a test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<xmp> </xmp>");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(9, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type for second error is stored
			Assert.assertEquals("deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("type"));
			//assert correct error message for second error is stored
			Assert.assertEquals("<xmp> is deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("message"));
			//assert second error is on correct line
			Assert.assertEquals(7, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("line"));
		}

	}

	// Check that statements in comments are not checked for errors (by passing in errors within comment tags)
	public static class Check_Comments {
		

		@Test
		public void Check_Deprecated_inComments() {
			List<String> testingSource = new ArrayList<String>();

			//create html input to error check
			testingSource.add("<!DOCTYPE html>");
			testingSource.add("<html>");
			testingSource.add("<head>");
			testingSource.add("<title>Just a test</title>");
			testingSource.add("</head>");
			testingSource.add("<body>");
			testingSource.add("<xmp> </xmp>");
			testingSource.add("<!--");
			testingSource.add("<xmp> </xmp>");
			testingSource.add("-->");
			testingSource.add("</body>");
			testingSource.add("</html>");

			JSONObject testingResult = Check.findErrors(testingSource);

			//assert correct number of lines are stored
			Assert.assertEquals(12, ((JSONObject) testingResult.get("source")).get("length"));
			//assert correct number of errors are stored
			Assert.assertEquals(1, ((JSONObject) testingResult.get("errors")).get("count"));

			//assert correct error type for second error is stored
			Assert.assertEquals("deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("type"));
			//assert correct error message for second error is stored
			Assert.assertEquals("<xmp> is deprecated", ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("message"));
			//assert second error is on correct line
			Assert.assertEquals(7, ((JSONObject) ((JSONObject) testingResult.get("errors")).get("1")).get("line"));
		}

	}

	// Check a couple of elements that are not self closing (i.e. upload file that does not close an element properly, check error is returned)
	public void Check_Not_Self_Closing() {

	}

	// Check that a warning is returned for the use of tables (i.e. DO NOT use tables for layout, bad practice)
	public void Check_Use_of_Tables() {

	}
}
