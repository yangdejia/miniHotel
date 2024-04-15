// JavaScript Document
function init(){
	navScroll();
	setInterval(showTime,1000);
	listMenu();
	getUserInfo(0);
	getList(1);
	getShop(0);
}
function getList(num){
	var search=$('#searchOrder').val();
	$.ajax({
		type:"post",
		url:"/miniHotel/list.roomAllList",
		dataType:"json",
		data:"currentPage="+num+"&search="+search+"&type=1",
		 beforeSend: function () {
			 $('tbody').html("<tr><td colspan='7' class='text-center'><strong style='color:green'>Getting data</strong>&nbsp;&nbsp;<img src='../../img/login.gif' style='width:40px;height:40px'></td></tr>");
	       },
	       success: function (data) {
	    	   $('tbody').html("");
	    	   if(data){
	    			   $.each(data,function(index,obj){
			        	   var tr=$('<tr></tr>');
			        	   $.each(obj,function(key,value){
			        		   if(key=="room_state"){
			        			   if(value==0){
			        				   var td=$('<td>free time</td>');
			        			   }else{
			        				   var td=$('<td>There are guests</td>');
			        			   }
			        		   }else if(key=="room_shop"){
			        		    	if(value=='S20170523125608'){
				        				   var td=$('<td>Liuzhou Hotel</td>');
				        			   }else{
				        				   var td=$('<td>Queen‘s hotel</td>');
				        			   }
			        		   } else if(key=="room_price"){
			        			   var td=$('<td>'+value+' RMB</td>');
			        		   }else{
			        			   var td=$('<td>'+value+'</td>');
			        		   } 
			        		   
			        		   tr.append(td);
			        	   })
			        	    $('tbody').append(tr);
			           })
			          turnPage(num,search);
	    	   }else{
	    		   $('tbody').html("<strong>Data acquisition failed!</strong>");
	    	   }    
	       },
	       error: function (XMLHttpRequest, textStatus, thrownError) {
	    	   $('tbody').html("<h4>Data acquisition failed!</h4>");
	       }
	})
}
function turnPage(num,search){
	$.ajax({
		type:"post",
		url:"/miniHotel/page.roomAllList",
		data:"search="+search+"&type=1",
		 beforeSend: function () {
			 $('#pagebox').html("<tr><td colspan='7' class='text-center'><strong style='color:green'>Data acquisition failed!</strong>&nbsp;&nbsp;<img src='../../img/login.gif' style='width:40px;height:40px'></td></tr>");
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
	    		  
	    		   $('#totalPage').html(num);
	    		   $('#currentPage').html(num);
	    		  
	    	   }	 
	       },
	       error: function (XMLHttpRequest, textStatus, thrownError) {
	    	   $('tfoot').html("Failed to obtain pagination!");
	       }
	})
	
}
function searchOrder(){
	getList(1);
}
function readInfo(){
	$('#readModal').modal();	
}