// JavaScript Document
function init(){
	navScroll();
	listMenu();
	setInterval(showTime,1000);
	getUserInfo(1);
	getList(1);
	getShop(1);
}
function getList(num){
	var search=$('#searchStaff').val();
	$.ajax({
		type:"post",
		url:"/miniHotel/list.staff",
		dataType:"json",
		data:"currentPage="+num+"&search="+search+"&type=1",
		 beforeSend: function () {
			 $('tbody').html("<tr><td colspan='7' class='text-center'><strong style='color:green'>Fetching Data...</strong>&nbsp;&nbsp;<img src='../../img/login.gif' style='width:40px;height:40px'></td></tr>");
	       },
	       success: function (data) {
	    	   $('tbody').html("");
	    	   if(data){
	    			   $.each(data,function(index,obj){
			        	   var tr=$('<tr></tr>');
			        	   $.each(obj,function(key,value){
			        		   if(key=="staff_type"){
			        			   if(value==0){
			        				   var td=$('<td>staff</td>');
			        			   }else{
			        				   var td=$('<td>Administrator</td>');
			        			   }
			        		   }else if(key=="staff_state"){
			        			   if(value==0){
			        				   var td=$('<td>No Data</td>');
			        			   }else{
			        				   var td=$('<td>Data Found</td>');
			        			   }
			        		   }else{
			        			   var td=$('<td>'+value+'</td>');
			        		   } 
			        		   tr.append(td);
			        	   })
			        	   tr.append('<td><button class="btn btn-success read">View</button> <button  class="btn btn-warning edit">edit</button> <button class="btn btn-danger delete">删除</button></td>');
			        	    $('tbody').append(tr);
			           })
			            bindDo();
			          turnPage(num,search);
	    	   }else{
	    		   $('tbody').html("<strong>Data acquisition failed!</strong>");
	    	   }    
	       },
	       error: function (XMLHttpRequest, textStatus, thrownError) {
	    	   showError("Failed to get data!!");
	       }
	})
}
function turnPage(num,search){
	$.ajax({
		type:"post",
		url:"/miniHotel/page.staff",
		data:"search="+search+"&type=1",
		 beforeSend: function () {
			 $('#pagebox').html("<tr><td colspan='7' class='text-center'><strong style='color:green'>Getting pagination</strong>&nbsp;&nbsp;<img src='../../img/login.gif' style='width:40px;height:40px'></td></tr>");
	       },
	       success: function (msg) {
	    	   
	    	   if(msg=="empty"){
	    		   $('tbody').html("<h4>No Data Found</h4>");
	    		   $('#pagebox').html("");
	    		   $('#totalPage').html(0);
	    		   $('#currentPage').html(0);
	    	   }else{
	    		   var totalpage=msg-0;
	    		   $('#pagebox').pagination({
	                    pageCount:totalpage,
	                    current:num,
	                    callback:function(api){
	                    	var num=api.getCurrent();
	                        getList(num);
	                    }
	                });
	    		   $('#totalPage').html(totalpage);
	    		   $('#currentPage').html(num);
	    		  
	    	   }	 
	       },
	       error: function (XMLHttpRequest, textStatus, thrownError) {
	    	   $('tfoot').html("Failed to obtain pagination!");
	       }
	})
	
}
function bindDo(){
	var arrColumn=new Array('Username','name','role','age','gender','Onboarding time','telephone number','address','state','remark');
	$('.read').on('click',function(){
		var index=0;
		var login=$(this).parents('tr').children('td:first').html();
		$.ajax({
			type:"post",
			url:"/miniHotel/read.staff",
			data:"login="+login,
			dataType:"json",
			 beforeSend: function () {
				 $('#readModal ul').addClass('hidden');
				 $('#readMsg').html("<strong style='color:green'>Fetching Data</strong>&nbsp;&nbsp;<img src='../../img/login.gif' style='width:40px;height:40px'>");	 
			 },
		       success: function (data) {
		    	   if(data){
		    		   if(data=="fail"||data==""){
		    			   showError("Failed to read data！");   
		    		   }else{
		    			   $('#readModal ul').html("");
		    		      $.each(data,function(index,obj){
		    			   $.each(obj,function(key,value){  
		    				   if(key!="staff_pwd"){
		    					   var li=$('<li class="list-group-item  clearfix"></li>');
		    					   var p1=$("<p class='pull-left'>"+arrColumn[index++]+"</p>");
		    					   var p2;
		    					   if(key=="staff_type"){
		    						   if(value==0){
		    							   p2=$("<p class='pull-right'>Staff</p>");
		    						   }else{
		    							   p2=$("<p class='pull-right'>Administrator</p>");
		    						   }			   
		    					   }else if(key=="staff_state"){
		    						   if(value==0){
		    							   p2=$("<p class='pull-right'>No Data</p>");
		    						   }else{
		    							   p2=$("<p class='pull-right'>Data Found</p>");
		    						   }			   
		    					   } else{
		    						   p2=$("<p class='pull-right'>"+value+"</p>");
		    					   }
		    					  
		    					   li.append(p1).append(p2);
			    				   $('#readModal .list-group').append(li);
		    				   }     
		    			   })
		    		   })
		    		   $('#readModal ul').removeClass('hidden');
		    			   $('#readMsg').addClass('hidden');
		    			   $('#readModal').modal();
		    		   }
		    	   }else{
		    		   showError("Failed to read data！");
		    	   }  
		       },
		       error: function (XMLHttpRequest, textStatus, thrownError) {
		    	   showError("Failed to read data！");
		       }
		})
	});	
	$('.edit').on('click',function(){
		$('#editModal').modal();
		var login=$(this).parents('tr').children('td:first').html();
		$.ajax({
			type:"post",
			url:"/miniHotel/read.staff",
			data:"login="+login,
			dataType:"json",
		       success: function (data) {
		    	   if(data){
		    		   if(data=="fail"||data==""){
		    			   showError("Failed to read data！");   
		    		   }else{
		    		      $.each(data,function(index,obj){
		    			   $.each(obj,function(key,value){
		    				  if(key=="staff_login"){
		    					  $('#login').val(value);
		    				  }
		    				  if(key=="staff_name"){
		    					  $('#name').val(value);
		    				  }
		    				  if(key=="staff_age"){
		    					  $('#age').val(value);
		    				  }
		    				  if(key=="staff_sex"){
		    					  var sex=$('input[type=radio]');
		    					  for(var i=0;i<sex.length;i++){
		    						  if(sex[i].value==value){
		    							  sex[i].checked=true;
		    						  }
		    					  } 
		    				  }
		    				  if(key=="staff_time"){
		    					  $('#intime').val(value);
		    				  }
		    				  if(key=="staff_tel"){
		    					  $('#tel').val(value);
		    				  }
		    				  if(key=="staff_address"){
		    					  $('#address').val(value);
		    				  }
		    				  if(key=="staff_remark"){
		    					  $('#remark').val(value);
		    				  }
		    			   })
		    		   })
		    			   $('#editModal').modal();
		    		   }
		    	   }else{
		    		   showError("Failed to read data！");
		    	   }  
		       },
		       error: function (XMLHttpRequest, textStatus, thrownError) {
		    	   showError("Failed to read data！");
		       }
		})
	});	
	$('.delete').on('click',function(){
		var state=$(this).parent().prev().html();
		var type=$(this).parent().prev().prev().prev().html();
		if(type=="Administrator"||state=="Data Found"){
			showError("<div class='text-center'>The record can not be deleted!<div>");
			setTimeout(closeMessage,700);
			return;
		}else{
			var login=$(this).parents('tr').children('td:first').html();
			showMessage("prompt","<h4 color='black'>Are you sure to delete this staff information?</h4>","<button class='btn btn-success' onclick='javascript:sureDelete(\""+login+"\");'>Are you sure</button><button class='btn btn-default' data-dismiss='modal'>Cancel</button>");
		}
	});	
}
function sureDelete(login){
	$.ajax({
		type:"post",
		url:"/miniHotel/delete.staff",
		data:"login="+login,
	       success: function (msg) {
	    	  if(msg=="success"){
	    		  showMessage("prompt","<strong style='color:green'>The deletion is successful！</strong>",null);
	    	    	setTimeout(closeMessage,700);
	    	    	getList(1);
	    	   }else{
	    		   showError("Deletion failed！");
	    	   }  
	       },
	       error: function (XMLHttpRequest, textStatus, thrownError) {
	    	   showError("The operation failed！");
	       }
	})
}
function editStaff(){
	if($('#name').val()==""){
		$('#name').css('border','1px solid red');
		return;
	}
	$('#name').css({'border':'0px','border-bottom':'1px dashed #ccc'});
	var str="<strong style='color:#333'>Are you sure to delete this staff information?</strong>";
	var foot=' <button type="button" class="btn btn-success" onClick="javascript:sureEdit();">Are you sure</button><button class="btn btn-default" data-dismiss="modal">Cancel</button>';
	showMessage('prompt',str,foot);
}
function sureEdit(){
	var sex="";
	var arr=$("input[type=radio]");
	 for(var i=0;i<arr.length;i++){
		  if(arr[i].checked){
			  sex=arr[i].value;
		  }
	  } 
	var data="login="+$('#login').val()+"&name="+$('#name').val()+"&age="+$('#age').val()+"&sex="+sex+"&time="+$('#intime').val()+"&tel="+$('#tel').val()+"&address="+$('#address').val()+"&remark="+$('#remark').val()+"&type=1";
	$.ajax({
		type:"post",
		url:"/miniHotel/update.staff",
		data:data,
		 beforeSend: function () {
			 showMessage("prompt","<strong style='color:green'>Modifying</strong>&nbsp;&nbsp;<img src='../../img/login.gif' style='width:40px;height:40px'>",null);	 
		 },
	       success: function (msg) {
	    	    if(msg=="success"){
	    	    	showMessage("prompt","<strong style='color:green'>The modification was successful！</strong>",null);
	    	    	$('#editModal').modal('hide');
	    	    	setTimeout(closeMessage,700);
	    	    	getList(1);
	    	    }else if(msg=="fail"){
	    	    	showError("The modification failed！");
	    	    	setTimeout(closeMessage,700);
	    	    }else if(msg=="error"){
	    	    	showError("Operational error！");
	    	    	setTimeout(closeMessage,700);
	    	    }
	       },
	       error: function (XMLHttpRequest, textStatus, thrownError) {
	    	   showError("The operation failed！");
	       }
	})	
}
function searchStaff(){
	getList(1);
}
