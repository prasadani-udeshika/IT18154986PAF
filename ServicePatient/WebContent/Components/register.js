$(document).ready(function()
{
if ($("#alertSuccess").text().trim() == "")
 {
 $("#alertSuccess").hide();
 }
 $("#alertError").hide();
});

$(document).on("click", "#btnSave", function(event)
{
	// Clear alerts---------------------
	 $("#alertSuccess").text("");
	 $("#alertSuccess").hide();
	 $("#alertError").text("");
	 $("#alertError").hide(); 
	 
	// Form validation-------------------
	 var status = validateItemForm();
	 if (status != true)
	  {
	  $("#alertError").text(status);
	  $("#alertError").show();
	  return;
	  }
	 // If valid-------------------------
	  $("#formItem").submit(); 
});

$(document).on("click", ".btnUpdate", function(event)
		{
		 $("#hidUCodeSave").val($(this).closest("tr").find('#hidUCodeUpdate').val());
		 $("#UName").val($(this).closest("tr").find('td:eq(0)').text());
		 $("#NIC").val($(this).closest("tr").find('td:eq(1)').text());
		 $("#userPhon").val($(this).closest("tr").find('td:eq(2)').text());
		 $("#email").val($(this).closest("tr").find('td:eq(3)').text());
		});
//CLIENTMODEL=========================================================================
function validateItemForm()
{
// CODE
if ($("#UName").val().trim() == "")
 {
 return "Please insert User Name.";
 }
// NAME
if ($("#NIC").val().trim() == "")
 {
 return "Please Insert NIC .";
 } 
//PRICE-------------------------------
if ($("#userPhon").val().trim() == "")
 {
 return "Please Insert user Phone Number.";
 }
// is numerical value
var tmpPrice = $("#userPhon").val().trim();
if (!$.isNumeric(tmpPrice))
 {
 return "Insert a numerical value for Item Price.";
 }
// convert to decimal price
 $("#userPhon").val(parseFloat(tmpPrice).toFixed(2));
// DESCRIPTION------------------------
if ($("#email").val().trim() == "")
 {
 return "Please Insert Email Address.";
 }
return true;
}

$(document).ready(function(){
	
	 $('.flexslider').flexslider({
       animation: "slide",
       start: function(slider){
         $('body').removeClass('loading');
       }
     });

});
/**
* Handles toggling the navigation menu for small screens.
*/
( function() {
	var button = document.getElementById( 'topnav' ).getElementsByTagName( 'div' )[0],
	    menu   = document.getElementById( 'topnav' ).getElementsByTagName( 'ul' )[0];

	if ( undefined === button )
		return false;

	// Hide button if menu is missing or empty.
	if ( undefined === menu || ! menu.childNodes.length ) {
		button.style.display = 'none';
		return false;
	}

	button.onclick = function() {
		if ( -1 == menu.className.indexOf( 'srt-menu' ) )
			menu.className = 'srt-menu';

		if ( -1 != button.className.indexOf( 'toggled-on' ) ) {
			button.className = button.className.replace( ' toggled-on', '' );
			menu.className = menu.className.replace( ' toggled-on', '' );
		} else {
			button.className += ' toggled-on';
			menu.className += ' toggled-on';
		}
	};
} )();


