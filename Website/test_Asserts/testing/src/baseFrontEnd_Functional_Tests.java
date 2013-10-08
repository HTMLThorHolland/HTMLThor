import net.sourceforge.jwebunit.junit.JWebUnit;

import org.junit.*;

import static net.sourceforge.jwebunit.junit.JWebUnit.*; 

/* 
	These are the front end functional tests
	They include testing the functionality of purely front end components without checking ANY back end functionality
	i.e. A test for the page source section will check that SOMETHING is there after upload, regardless of whether it is even the correct source code.
*/

public class baseFrontEnd_Functional_Tests {
	
    @Before
    public void prepare() {
        setBaseUrl("http://www.htmlthor.com/"); // set the base server location (do we want to run this ON the server as local?
    }

	// Always begin at index.html (Everything is on this one page)
    @Test
    public void Upload_Single_File() {
        //beginAt("index.html"); //Open the browser on http://Whatever we put above.index.html
        // Begin testing methods    
	
    }
	
    @Test
	// Check that the form allows submission of multiple files (how? assert that an error isn't returned? that the form object contains something afterwards?
	public void Upload_Multiple_Files() {
	
	}
	
    @Test
	// Check that the form allows submission of a ZIP
	public void Upload_Zip_File() {
	
	}
	
    @Test
	// Check that the form allows submission of a URL
	public void Upload_Url() {
	
	}
	
    @Test
	// Check that the form allows direct input source 
	public void Upload_Direct_Input() {
	
	}
	
    @Test
	// Assert whether the Help tab at top of page works
	public void Assert_Help() {
		beginAt("index.html");
		
		
		clickElementByXPath("//div[@class='topHelpButt']");
		

		String attribute = getElementAttributeByXPath("//div[@class='topHelpKey']", "display");
		String attributeCheck = "block";

		Assert.assertEquals(attributeCheck, attribute);
		

		clickElementByXPath("//div[@class='topHelpButt']");

		attribute = getElementAttributeByXPath("//div[@class='topHelpKey']", "display");
		attributeCheck = "none";

		Assert.assertEquals(attributeCheck, attribute);
		
		
	
	}
	
    @Test
	// Assert whether the change page tab works
	public void Assert_Page_Source_Change_Page() {
    	//beginAt("index.html");
	}
	
    @Test
	// Assert whether the change page tab works
	public void Assert_Page_Errors_Change_Page() {
	
	}
	
    @Test
	// Assert that the file structure shows SOMETHING after upload
	public void Assert_File_Structure() {
	
	}
	
    @Test
	// Assert whether the page source shows SOMETHING after upload
	public void Assert_Page_Source() {
	
	}
	
    @Test
	// Assert whether the error page shows SOMETHING after upload
	public void Assert_Page_Errors() {
	
	}
	
	
}