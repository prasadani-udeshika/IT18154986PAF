<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
     <%@ page import ="com.register" %>
<%
session.setAttribute("statusMsg","");
System.out.println("Try to process...");
if (request.getParameter("UName") != null)
{
 register itemObj = new register();
 String stsMsg = "";
//Insert--------------------------
if (request.getParameter("hidUCodeSave") == "")
{
stsMsg = itemObj.insertItem(request.getParameter("UName"),
request.getParameter("NIC"),
request.getParameter("userPhon"),
request.getParameter("email"));
}
else
	//Update----------------------
	 {
	 stsMsg = itemObj.updateItem(request.getParameter("hidUCodeSave"),
	 request.getParameter("UName"),
	 request.getParameter("NIC"),
	 request.getParameter("userPhon"),
	 request.getParameter("email"));
	 }
	 session.setAttribute("statusMsg", stsMsg);
	}
//Delete-----------------------------
if (request.getParameter("hidUCodeDelete") != null)
{
register itemObj = new register();
String stsMsg =
itemObj.deleteItem(request.getParameter("hidUCodeDelete"));
session.setAttribute("statusMsg", stsMsg);
}

%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/register.js"></script>
</head>
<body>
<div class="container">
 <div class="row">
 <div class="col-8">
 <h1 class="m-3">Item Test details</h1>
 <form id="formItem" name="formItem" method="post" action="register.jsp">

User Name :
 <input id="UName" name="UName" type="text" class="form-control form-control-sm">
 <br> NIC:
 <input id="NIC" name="NIC" type="text" class="form-control form-control-sm">
 <br> User Phone Number :
 <input id="userPhon" name="userPhon" type="text" class="form-control form-control-sm">
 <br> email:
 <input id="email" name="email" type="text" class="form-control form-control-sm">
 <br>
 <input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary">
 <input type="hidden" id="hidUCodeSave" name="hidUCodeSave" value="">

 </form>
 <div id="alertSuccess" class="alert alert-success">
  <%
 out.print(session.getAttribute("statusMsg"));
 %>
 </div>
 
<div id="alertError" class="alert alert-danger"></div>
<br>
<%
 register itemObj = new register();
 out.print(itemObj.readItems());
%>
 </div>
 </div>
 </div>

</body>
</html>