$(document).ready(function()
{
 $("#alertSuccess").hide();
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
	 var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";

	 $.ajax(
			 {
			  url : "ItemsAPI",
			  type : type,
			  data : $("#formItem").serialize(),
			  dataType : "text",
			  complete : function(response, status)
			  {
			  onItemSaveComplete(response.responseText, status);
			  }
			 });
});

function onItemSaveComplete(response, status)
{
if (status == "success")
 {
 var resultSet = JSON.parse(response);
 if (resultSet.status.trim() == "success")
 {
 $("#alertSuccess").text("Successfully saved.");
 $("#alertSuccess").show();
 $("#divItemsGrid").html(resultSet.data);
 } else if (resultSet.status.trim() == "error")
 {
 $("#alertError").text(resultSet.data);
 $("#alertError").show();
 }
 } else if (status == "error")
 {
 $("#alertError").text("Error while saving.");
 $("#alertError").show();
 } else
 {
 $("#alertError").text("Unknown error while saving..");
 $("#alertError").show();
 }
 $("#hidItemIDSave").val("");
 $("#formItem")[0].reset();
}

// UPDATE =========================================
$(document).on("click", ".btnUpdate", function(event)
		{
		 $("#hidItemIDSave").val($(this).closest("tr").find('#hidItemIDUpdate').val());
		 $("#itemCode").val($(this).closest("tr").find('td:eq(0)').text());
		 $("#itemName").val($(this).closest("tr").find('td:eq(1)').text());
		 $("#itemPrice").val($(this).closest("tr").find('td:eq(2)').text());
		 $("#itemDesc").val($(this).closest("tr").find('td:eq(3)').text());
		});
// REMOVE =========================

$(document).on("click", ".btnRemove", function(event)
		{
		 $.ajax(
		 {
		 url : "ItemsAPI",
		 type : "DELETE",
		 data : "itemID=" + $(this).data("itemid"),
		 dataType : "text",
		 complete : function(response, status)
		 {
		 onItemDeleteComplete(response.responseText, status);
		 }
		 });
		});
// DELETE ====================================

function onItemDeleteComplete(response, status)
{
if (status == "success")
 {
 var resultSet = JSON.parse(response);
 if (resultSet.status.trim() == "success")
 {
 $("#alertSuccess").text("Successfully deleted.");
 $("#alertSuccess").show();
 $("#divItemsGrid").html(resultSet.data);
 } else if (resultSet.status.trim() == "error")
 {
 $("#alertError").text(resultSet.data);
 $("#alertError").show();
 }
 } else if (status == "error")
 {
 $("#alertError").text("Error while deleting.");
 $("#alertError").show();
 } else
 {
 $("#alertError").text("Unknown error while deleting..");
 $("#alertError").show();
 }
}


//CLIENTMODEL=========================================================================
function validateItemForm()
{
// CODE
if ($("#itemCode").val().trim() == "")
 {
 return "Insert Item Code.";
 }
// NAME
if ($("#itemName").val().trim() == "")
 {
 return "Insert Item Name.";
 } 
//PRICE-------------------------------
if ($("#itemPrice").val().trim() == "")
 {
 return "Insert Item Price.";
 }
// is numerical value
var tmpPrice = $("#itemPrice").val().trim();
if (!$.isNumeric(tmpPrice))
 {
 return "Insert a numerical value for Item Price.";
 }
// convert to decimal price
 $("#itemPrice").val(parseFloat(tmpPrice).toFixed(2));
// DESCRIPTION------------------------
if ($("#itemDesc").val().trim() == "")
 {
 return "Insert Item Description.";
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


