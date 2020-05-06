package com;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

public class register {
	
	private Connection connect()  
	{
		Connection con = null; 
	
	 
	  try   
	  {   
		  Class.forName("com.mysql.jdbc.Driver"); 
		  //Provide the correct details: DBServer/DBName, username, password    
		  con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/healthcare", "root", "");   
	 }
	  catch (Exception e)  
	  {
		  e.printStackTrace();
	  }
	 
	  return con; 
	}
	 
	 public String insertItem(String name, String nic, String phone, String email)  
	 {
		 String output = ""; 
	 
	 try  
	 {    
		 Connection con = connect(); 
	 
	 
	   if (con == null)   
	   {
		   return "Error while connecting to the database for inserting.";
		    
	   }
	 
	   // create a prepared statement    
	   String query = " insert into regist(`UCode`,`UName`,`NIC`,`userPhon`,`email`)"+ " values (?, ?, ?, ?, ?)"; 
	 
	   PreparedStatement preparedStmt = con.prepareStatement(query); 
	 
	   // binding values    
	   preparedStmt.setInt(1, 0);    
	   preparedStmt.setString(2, name);    
	   preparedStmt.setString(3, nic);    
	   preparedStmt.setString(4, phone);   
	   preparedStmt.setString(5, email);
	   
	   // execute the statement   
	   preparedStmt.execute();   
	   con.close(); 
	   
	   output = "Inserted successfully";   
	  }  
	   catch (Exception e)   
	  {
		   output = "Error while inserting the item.";  
		   System.err.println(e.getMessage());  
		   
	  }
	 
	  return output;  
	  }
	 
	//read start 
		 public String readItems()
		 {
		  String output = "";
		 try
		  {
		  Connection con = connect();
		  if (con == null)
		  {
		  return "Error while connecting to the database for reading.";
		  }
		  // Prepare the html table to be displayed
		  output = "<table border=\"1\"><tr>"
		  		+ "<th>User Name</th> "
		  		+ "<th>NIC</th>"
		  		+ "<th>User Phon</th>"
		  		+ "<th>Email</th> "
		  		+ "<th>Update</th><th>Remove</th></tr>";
		  String query = "select * from regist";
		  Statement stmt = con.createStatement();
		  ResultSet rs = stmt.executeQuery(query);
		  // iterate through the rows in the result set
		  while (rs.next())
		  {
		  String UCode = Integer.toString(rs.getInt("UCode"));
		  String UName = rs.getString("UName");
		  String NIC = rs.getString("NIC");
		  String userPhon = Integer.toString(rs.getInt("userPhon"));
		  String email = rs.getString("email");
		  // Add into the html table
		  output += "<tr><td><input id=\"hidUCodeUpdate\"name=\"hidUCodeUpdate\"type=\"hidden\" value=\"" + UCode + "\">"
		  + UName + "</td>";
		  output += "<td>" + NIC + "</td>";
		  output += "<td>" + userPhon + "</td>";
		  output += "<td>" + email + "</td>";
		  // buttons
		  output += "<td><input name=\"btnUpdate\"type=\"button\" value=\"Update\"class=\" btnUpdate btn btn-secondary\"></td>"
		  		+ "<td><form method=\"post\" "
		  		+ "action=\"register.jsp\"> "
		  		+ "<input name=\"btnRemove\" type=\"submit\""
		  		+ "value=\"Remove\" class=\"btn btn-danger\">"
		  		+ "<input name=\"hidUCodeDelete\" type=\"hidden\""
		  		+ "value=\"" + UCode + "\">" + "</form></td></tr>";
		  }
		  con.close();
		  // Complete the html table
		  output += "</table>";
		  } 
		 catch (Exception e)
		 {
		 output = "Error while reading the items.";
		 System.err.println(e.getMessage());
		 }
		return output;
		}
		
		// read end
		  public String updateItem(String ucode, String name, String nic, String phone, String email)  
		  {
			  String output = ""; 
		  
		       try   
		       {
			      Connection con = connect(); 
		 
		          if (con == null)    
		          {
			        return "Error while connecting to the database for updating."; 
			      } 
		 
		   // create a prepared statement    
		       String query = "UPDATE regist SET UName=?,NIC=?,userPhon=?,email=?WHERE UCode=?"; 
		 
		       PreparedStatement preparedStmt = con.prepareStatement(query); 
		 
		   // binding values    
		       preparedStmt.setString(1, name);    
		       preparedStmt.setString(2, nic);   
		       preparedStmt.setString(3, (phone));    
		       preparedStmt.setString(4, email);    
		       preparedStmt.setInt(5, Integer.parseInt(ucode)); 
		 
		   // execute the statement    
		      preparedStmt.execute();    
		      con.close(); 
		 
		      output = "Updated successfully";   
		      }   
		      catch (Exception e)   
		      {   
			     output = "Error while updating the item.";    
		         System.err.println(e.getMessage());   
		      } 
		 
		      return output;  
		  }
		  
		  public String deleteItem(String UCode)  
		  {
			  String output = ""; 
		  
		  try  
		  {
			    Connection con = connect(); 
		 
		        if (con == null)    
		        {
		        	return "Error while connecting to the database for deleting."; 
		        } 
		 
		   // create a prepared statement    
		        String query = "delete from regist where UCode=?"; 
		 
		        PreparedStatement preparedStmt = con.prepareStatement(query); 
		 
		   // binding values    
		        preparedStmt.setInt(1, Integer.parseInt(UCode)); 
		 
		   // execute the statement    
		        preparedStmt.execute();   
		        con.close(); 
		 
		        output = "Deleted successfully";   
		        }   
		        catch (Exception e)  
		        {    output = "Error while deleting the item.";    
		            System.err.println(e.getMessage());   
		        } 
		 
		  return output;  
		  } 
		  
	 

}
