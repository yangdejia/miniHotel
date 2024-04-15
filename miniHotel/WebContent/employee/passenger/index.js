// JavaScript Document
function init(){
	listMenu();
	navScroll();
	setInterval(showTime,1000);
	getUserInfo(0);
	getList(1);
	getShop(0);
}
function getList(num){
	var search=$('#searchPass').val();
	$.ajax({
		type:"post",
		url:"/miniHotel/list.pass",
		dataType:"json",
		data:"currentPage="+num+"&search="+search,
		 beforeSend: function () {
			 $('tbody').html("<tr><td colspan='7' class='text-center'><strong style='color:green'>Getting data</strong>&nbsp;&nbsp;<img src='../../img/login.gif' style='width:40px;height:40px'></td></tr>");
	       },
	       success: function (data) {
	    	   $('tbody').html("");
	    	   if(data){
	    			   $.each(data,function(index,obj){
			        	   var tr=$('<tr></tr>');
			        	   $.each(obj,function(key,value){
			        		   if(key=="pass_state"){
			        			   if(value==0){
			        				   var td=$('<td>No-show</td>');
			        			   }else{
			        				   var td=$('<td>Occupied</td>');
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
		url:"/miniHotel/page.pass",
		data:"search="+search,
		 beforeSend: function () {
			 $('#pagebox').html("<tr><td colspan='7' class='text-center'><strong style='color:green'>Getting pagination</strong>&nbsp;&nbsp;<img src='../../img/login.gif' style='width:40px;height:40px'></td></tr>");
	       },
	       success: function (msg) {
	    	   
	    	   if(msg=="empty"){
	    		   $('tbody').html("<h4>No Data</h4>");
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
	var arrColumn=new Array('encode','name','age','sex','Identification number','Contact number','state','remark');
	$('.read').on('click',function(){
		var index=0;
		var code=$(this).parents('tr').children('td:first').html();
		$.ajax({
			type:"post",
			url:"/miniHotel/read.pass",
			data:"code="+code,
			dataType:"json",
			 beforeSend: function () {
				 $('#readModal ul').addClass('hidden');
				 $('#readMsg').html("<strong style='color:green'>Getting data</strong>&nbsp;&nbsp;<img src='../../img/login.gif' style='width:40px;height:40px'>");	 
			 },
		       success: function (data) {
		    	   if(data){
		    		   if(data=="fail"||data==""){
		    			   showError("Failed to read data！");   
		    		   }else{
		    			   $('#readModal ul').html("");
		    		      $.each(data,function(index,obj){
		    			   $.each(obj,function(key,value){
		    				   var li=$('<li class="list-group-item  clearfix"></li>');
		    				   var p1=$("<p class='pull-left'>"+arrColumn[index++]+"</p>");
		    				   if(key=="pass_state"){
		    					   if(value==0){
		    						   var p2=$("<p class='pull-right'>No-show</p>");
		    					   }else{
		    						   var p2=$("<p class='pull-right'>Occupied</p>");
		    						   }
		    				   }else{
		    					   var p2=$("<p class='pull-right'>"+value+"</p>");
		    				   } 
		    				   li.append(p1).append(p2);
		    				   $('#readModal .list-group').append(li);
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
		var code=$(this).parents('tr').children('td:first').html();
		$.ajax({
			type:"post",
			url:"/miniHotel/read.pass",
			data:"code="+code,
			dataType:"json",
		       success: function (data) {
		    	   if(data){
		    		   if(data=="fail"||data==""){
		    			   showError("Failed to read data！");   
		    		   }else{
		    		      $.each(data,function(index,obj){
		    			   $.each(obj,function(key,value){
		    				  if(key=="pass_code"){
		    					  $('#code').val(value);
		    				  }
		    				  if(key=="pass_name"){
		    					  $('#name').val(value);
		    				  }
		    				  if(key=="pass_age"){
		    					  $('#age').val(value);
		    				  }
		    				  if(key=="pass_sex"){
		    					  var sex=$('input[type=radio]');
		    					  for(var i=0;i<sex.length;i++){
		    						  if(sex[i].value==value){
		    							  sex[i].checked=true;
		    						  }
		    					  } 
		    				  }
		    				  if(key=="pass_idcard"){
		    					  $('#idcard').val(value);
		    				  }
		    				  if(key=="pass_tel"){
		    					  $('#tel').val(value);
		    				  }
		    				  if(key=="pass_remark"){
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
		if(state=="Occupied"){
			showError("<div class='text-center'>The traveler information cannot be deleted！<div>");
			setTimeout(closeMessage,700);
			return;
		}else{
			var code=$(this).parents('tr').children('td:first').html();
			showMessage("prompt","<h4 style='color:#333'>Decide to delete the traveler message？</h4>","<button class='btn btn-success' onclick='javascript:sureDelete(\""+code+"\");'>Are you sure</button><button class='btn btn-default' data-dismiss='modal'>Cancel</button>");
		}
	});	
}
function sureDelete(code){
	$.ajax({
		type:"post",
		url:"/miniHotel/delete.pass",
		data:"code="+code,
	       success: function (msg) {
	    	  if(msg=="success"){
	    		  showMessage("prompt","<strong style='color:green'>The deletion is successful！</strong>",null);
	    	    	setTimeout(closeMessage,800);
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
function editPassenger(){
	if($('#name').val()==""){
		$('#name').css('border','1px solid red');
		return;
	}
	if($('#idcard').val()==""){
		$('#idcard').css('border','1px solid red');
		return;
	}
	if($('#tel').val()==""){
		$('#tel').css('border','1px solid red');
		return;
	}
	$('#name').css({'border':'0px','border-bottom':'1px dashed #ccc'});
	$('#idcard').css({'border':'0px','border-bottom':'1px dashed #ccc'});
	$('#tel').css({'border':'0px','border-bottom':'1px dashed #ccc'});
	var str="<strong style='color:#333'>Are you sure you want to modify the Traveler information?</strong>";
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
	var data="code="+$('#code').val()+"&name="+$('#name').val()+"&age="+$('#age').val()+"&sex="+sex+"&idcard="+$('#idcard').val()+"&tel="+$('#tel').val()+"&remark="+$('#remark').val();
	$.ajax({
		type:"post",
		url:"/miniHotel/update.pass",
		data:data,
		 beforeSend: function () {
			 showMessage("prompt","<strong style='color:green'>Modifying</strong>&nbsp;&nbsp;<img src='../../img/login.gif' style='width:40px;height:40px'>",null);	 
		 },
	       success: function (msg) {
	    	    if(msg=="success"){
	    	    	showMessage("prompt","<strong style='color:green'>The modification was successful！</strong>",null);
	    	    	$('#editModal').modal('hide');
	    	    	setTimeout(closeMessage,800);
	    	    	getList(1);
	    	    }else if(msg=="fail"){
	    	    	showError("The modification failed！");
	    	    	setTimeout(closeMessage,800);
	    	    }else if(msg=="error"){
	    	    	showError("Operational error！");
	    	    	setTimeout(closeMessage,800);
	    	    }
	       },
	       error: function (XMLHttpRequest, textStatus, thrownError) {
	    	   showError("The operation failed！");
	       }
	})	
}
function searchPass(){
	getList(1);
}
