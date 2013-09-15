import org.junit.*;

import static net.sourceforge.jwebunit.junit.JWebUnit.* 

/* 
	These are the front end functional tests
	They include testing the functionality of purely front end components without checking ANY back end functionality
	i.e. A test for the page source section will check that SOMETHING is there after upload, regardless of whether it is even the correct source code.
*/

public class baseFrontEnd_Functional_Tests {
	
    @Before
    public void prepare() {
        setBaseUrl("http://"); // set the base server location (do we want to run this ON the server as local?
    }

	// Always begin at index.html (Everything is on this one page)
    @Test
    public void Upload_Single_File() {
        beginAt("index.html"); //Open the browser on http://Whatever we put above.index.html
        // Begin testing methods
	
    }
	
	// Check that the form allows submission of multiple files (how? assert that an error isn't returned? that the form object contains something afterwards?
	public void Upload_Multiple_Files() {
	
	}
	
	// Check that the form allows submission of a ZIP
	public void Upload_Zip_File() {
	
	}
	
	// Check that the form allows submission of a URL
	public void Upload_Url() {
	
	}
	
	// Check that the form allows direct input source 
	public void Upload_Direct_Input() {
	
	}
	
	// Assert whether the Help tab at top of page works
	public void Assert_Help() {
	
	}
	
	// Assert whether the change page tab works
	public void Assert_Page_Source_Change_Page() {
	
	}
	
	// Assert whether the change page tab works
	public void Assert_Page_Errors_Change_Page() {
	
	}
	
	// Assert that the file structure shows SOMETHING after upload
	public void Assert_File_Structure() {
	
	}
	
	// Assert whether the page source shows SOMETHING after upload
	public void Assert_Page_Source() {
	
	}
	
	// Assert whether the error page shows SOMETHING after upload
	public void Assert_Page_Errors() {
	
	}
	
	
}


/* 
	These are the back end functional tests
	They include testing the actual output of particular inputs in order to test the check.jsp functionality
	i.e. A test for the page source section will check not just that SOMETHING is there after upload (as public void Assert_Page_Source() does),
		 but that the source code from the original file is uploaded. (and then various checks on the correct highlighting of errors.


*/


// This class includes all tag checks, is missing the checks on attribute particulars
public class baseBackEnd_Functional_Tests {

	@Before
    public void prepare() {
        setBaseUrl("http://"); // set the base server location (do we want to run this ON the server as local?
    }

    @Test
	// Nested classes of required, singular and self-closing elements
	
	// for each of the functions in this class check that code with multiple of them correctly displays the isSingular error
	public class singularTags {

		public void Check_Singular_Doctype() {
			beginAt("index.html"); //Open the browser on http://Whatever we put above.index.html
			// Begin testing methods
			

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
	
	public class isRequired {
	
		// Check that a doctype error is both returned and not returned (i.e when a file with this error and without this error are uploaded)
		public void Check_Exists_Doctype() {
		
		}
	
		// Check that there is an error for not having any html tags
		public void Check_Exists_html() {
		
		}
		
		// Check that there is an error for not having any head tags
		public void Check_Exists_head() {
		
		}
		
		// Check that there is an error for not having any body tags
		public void Check_Exists_body() {
		
		}
		
		// Check that there is a warning for not having any title tags
		public void Check_Exists_title() {
		
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

public class attrBackEnd_Functional_Tests {
	/*
		Do 5 tests here:
		A BASE test that any attributes are actually existing attributes
		
		1 for something that should have no global attributes or specific attributes
		1 for something that could have globals but should have no specific attributes
		1 for something that could have specific attributes but not globals (Does this even exist? Or do globals apply to everything that has attributes?)
		1 for something that could have either
	*/
}