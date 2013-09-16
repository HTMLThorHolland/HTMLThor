package test;

import java.util.concurrent.TimeUnit;

import org.junit.*;

import static net.sourceforge.jwebunit.junit.JWebUnit.*; 

/* 
	These are the front end functional tests
	They include testing the functionality of purely front end components without checking ANY back end functionality
*/

public class baseFrontEnd_Functional_Tests {
	
    @Before
    public void prepare() {
        setBaseUrl("http://www.htmlthor.com/"); // set the base server location
    }

    
    
    
    
    
	// Always begin at index.html (Everything is on this one page)
    @Test
    public void Check_Single_File() {
        beginAt("index.html"); 
        
        
        assertFormPresent("singleUploadForm");
        assertButtonPresent("single");
        
        // Check each attribute for POST, multipart/form-data and the correct action
		String attribute = getElementAttributeByXPath("//*[@id='singleUploadForm']", "action");
		String attributeCheck = "upload.jsp?uploadType=single";
		Assert.assertEquals(attributeCheck, attribute);
		
		attribute = getElementAttributeByXPath("//*[@id='singleUploadForm']", "method");
		attributeCheck = "POST";
		Assert.assertEquals(attributeCheck, attribute);
        
		attribute = getElementAttributeByXPath("//*[@id='singleUploadForm']", "enctype");
		attributeCheck = "multipart/form-data";
		Assert.assertEquals(attributeCheck, attribute);
        
    }
	
    @Test
	// Check that the form allows submission of multiple files (how? assert that an error isn't returned? that the form object contains something afterwards?
	public void Check_Multiple_Files() {
    	beginAt("index.html"); 
        
        
        assertFormPresent("multiUploadForm");
        assertButtonPresent("multi");
        
        // Check each attribute for POST, multipart/form-data and the correct action
		String attribute = getElementAttributeByXPath("//*[@id='multiUploadForm']", "action");
		String attributeCheck = "upload.jsp?uploadType=multi";
		Assert.assertEquals(attributeCheck, attribute);
		
		attribute = getElementAttributeByXPath("//*[@id='multiUploadForm']", "method");
		attributeCheck = "POST";
		Assert.assertEquals(attributeCheck, attribute);
        
		attribute = getElementAttributeByXPath("//*[@id='multiUploadForm']", "enctype");
		attributeCheck = "multipart/form-data";
		Assert.assertEquals(attributeCheck, attribute);
    	
	}
	
    @Test
	// Check that the form allows submission of a ZIP
	public void Check_Zip_File() {
    	beginAt("index.html"); 
        
        
        assertFormPresent("zipUploadForm");
        assertButtonPresent("zip");
        
        // Check each attribute for POST, multipart/form-data and the correct action
		String attribute = getElementAttributeByXPath("//*[@id='zipUploadForm']", "action");
		String attributeCheck = "upload.jsp?uploadType=zip";
		Assert.assertEquals(attributeCheck, attribute);
		
		attribute = getElementAttributeByXPath("//*[@id='singleUploadForm']", "method");
		attributeCheck = "POST";
		Assert.assertEquals(attributeCheck, attribute);
        
		attribute = getElementAttributeByXPath("//*[@id='singleUploadForm']", "enctype");
		attributeCheck = "multipart/form-data";
		Assert.assertEquals(attributeCheck, attribute);
    
	}
	
    @Test
	// Check that the form allows submission of a URL
	public void Check_Url() {
    	beginAt("index.html"); 
        
        assertFormPresent("directInputForm");
        assertElementPresentByXPath("//*[@id='directInputForm']/input");
        assertButtonPresent("urlButton");
        
        // Note that the below checks are also elements of direct input upload and do not need to be rechecked
		String attribute = getElementAttributeByXPath("//*[@id='directInputForm']", "action");
		String attributeCheck = "upload.jsp?uploadType=direct";
		Assert.assertEquals(attributeCheck, attribute);
		
		attribute = getElementAttributeByXPath("//*[@id='directInputForm']", "method");
		attributeCheck = "POST";
		Assert.assertEquals(attributeCheck, attribute);
        
	}
	
    @Test
	// Check that the form allows direct input source 
	public void Check_Direct_Input() {
    	beginAt("index.html"); 
        
        assertElementPresent("input-direct");
        assertButtonPresent("alternativeButton");
    	
	}
	
    @Test
	// Assert whether the Help tab at top of page works
	public void Assert_Help() {
		beginAt("index.html");
		
		// Click help tab, check that box is displayed
		clickElementByXPath("//div[@class='topHelpButt']");
		// Set a small wait for the js function to reset heights etc
		try {
			TimeUnit.MILLISECONDS.sleep(1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		String attribute = getElementAttributeByXPath("//div[@class='topHelpKey']", "style");
		String attributeCheck = "display: block;";
		Assert.assertEquals(attributeCheck, attribute);
		
		
		// Click help tab again, check that box is no longer displayed
		clickElementByXPath("//div[@class='topHelpButt']");
		try {
			TimeUnit.MILLISECONDS.sleep(1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		attribute = getElementAttributeByXPath("//div[@class='topHelpKey']", "style");
		attributeCheck = "display: none;";
		Assert.assertEquals(attributeCheck, attribute);
		
		
	
	}
	
    @Test
	// Assert whether the change page source tab works
	public void Assert_Page_Source_Change_Page() {
    	beginAt("index.html");
    	
    	assertElementPresent("sourceLink");
    	
    	// Originally hidden
    	String attribute = getElementAttributeByXPath("//*[@id='sourceLink']", "style");
		String attributeCheck = "display: none;";
		Assert.assertEquals(attributeCheck, attribute);
		
		// Use direct-input to trigger the hiding links
		setTextField("input-direct", "Testingtesting123");
		clickElementByXPath("//*[@id='alternativeButton']");
		
		// Add in a slight pause to allow the click to take effect
		try {
			TimeUnit.MILLISECONDS.sleep(1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
				
		
		attribute = getElementAttributeByXPath("//*[@id='sourceLink']", "style");
		attributeCheck = "display: list-item;";
		Assert.assertEquals(attributeCheck, attribute);
	}
	
    @Test
	// Assert whether the errors page tab works
	public void Assert_Page_Errors_Change_Page() {
    	beginAt("index.html");
    	
    	assertElementPresent("errorsLink");
    	
    	// Originally hidden
    	String attribute = getElementAttributeByXPath("//*[@id='errorsLink']", "style");
		String attributeCheck = "display: none;";
		Assert.assertEquals(attributeCheck, attribute);
		
		// Use direct-input to trigger the hiding links
		setTextField("input-direct", "Testingtesting123");
		clickElementByXPath("//*[@id='alternativeButton']");
		
		// Add in a slight pause to allow the click to take effect
		try {
			TimeUnit.MILLISECONDS.sleep(1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
				
		
		attribute = getElementAttributeByXPath("//*[@id='errorsLink']", "style");
		attributeCheck = "display: list-item;";
		Assert.assertEquals(attributeCheck, attribute);
    	
    	
    	
	}
	
    @Test
	// Assert that the file structure tab works
	public void Assert_File_Structure_Change_Page() {
    	beginAt("index.html");
    	
    	assertElementPresent("structureLink");
    	
    	// Originally hidden
    	String attribute = getElementAttributeByXPath("//*[@id='structureLink']", "style");
		String attributeCheck = "display: none;";
		Assert.assertEquals(attributeCheck, attribute);
		
		// Use direct-input to trigger the hiding links, should still be hidden
		setTextField("input-direct", "Testingtesting123");
		clickElementByXPath("//*[@id='alternativeButton']");
		
		// Add in a slight pause to allow the click to take effect
		try {
			TimeUnit.MILLISECONDS.sleep(1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
				
		
		attribute = getElementAttributeByXPath("//*[@id='structureLink']", "style");
		attributeCheck = "display: none;";
		Assert.assertEquals(attributeCheck, attribute);
	}
	
    @Test
	// Assert whether the breakdown tab works
	public void Assert_Breakdown_Change_Page() {
    	beginAt("index.html");
    	
    	assertElementPresent("breakdownLink");
    	
    	// Originally hidden
    	String attribute = getElementAttributeByXPath("//*[@id='breakdownLink']", "style");
		String attributeCheck = "display: none;";
		Assert.assertEquals(attributeCheck, attribute);
		
		// Use direct-input to trigger the hiding links
		setTextField("input-direct", "Testingtesting123");
		clickElementByXPath("//*[@id='alternativeButton']");
		
		// Add in a slight pause to allow the click to take effect
		try {
			TimeUnit.MILLISECONDS.sleep(1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
		
		attribute = getElementAttributeByXPath("//*[@id='breakdownLink']", "style");
		attributeCheck = "display: list-item;";
		Assert.assertEquals(attributeCheck, attribute);
	}
	
	
	
}