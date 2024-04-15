// JavaScript Document
function init(){
	navScroll();
	listMenu();
	setInterval(showTime,1000);
	getUserInfo(1);
	getShop(1);
	var date=new Date();
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	var day=date.getDate();
	if(month<10){
		month="0"+month;
	}
	if(day<10){
		day="0"+day;
	}
	$('#intime').val(year+"-"+month+"-"+day);
}
function addEmp(){
	if($('#login').val()==""){
		$('#login').css('border','1px solid red');
		return;
	}
	if($('#name').val()==""){
		$('#name').css('border','1px solid red');
		return;
	}
	if($('#pwd').val()==""){
		$('#pwd').css('border','1px solid red');
		return;
	}
	$('#login').css({'border':'0px','border-bottom':'1px dashed #ccc'});
	$('#name').css({'border':'0px','border-bottom':'1px dashed #ccc'});
	$('#pwd').css({'border':'0px','border-bottom':'1px dashed #ccc'});
	var str="<strong style='color:#333'>Are you sure you want to add this staff?</strong>";
	var foot=' <button type="button" class="btn btn-success" onClick="javascript:sureAdd();">Are you sure</button><button class="btn btn-default" data-dismiss="modal">Cancel</button>';
	showMessage('prompt',str,foot);
}
function sureAdd(){
	var arr=$('input[type=radio]');
	var sex="";
	for(var i=0;i<arr.length;i++){
		if(arr[i].checked){
			sex=arr[i].value;
		}
	}
	var data="login="+$('#login').val()+"&name="+$('#name').val()+"&pwd="+$('#pwd').val()+"&age="+$('#age').val()+"&sex="+sex+"&time="+$('#intime').val()+"&tel="+$('#tel').val()+"&address="+$('#address').val()+"&remark="+$('#remark').val()+"&type=1";
	$.ajax({
		type:"post",
		url:"/miniHotel/add.staff",
		data:data,
		 beforeSend: function () {
	    	   showMessage("prompt","<strong style='color:green'>Adding Now，please Wait</strong>&nbsp;&nbsp;<img src='../../img/login.gif' style='width:40px;height:40px'>",null);
	    	   $('#myModalBody').addClass("text-center");
	       },
	       success: function (msg) {
	           if(msg=="success"){
	        	   showMessage("prompt","<strong style='color:green'>Staff Added Successfully</strong>",null);  
	        	   setTimeout("window.location.reload()",700);
	           }else if(msg == "fail"){
	        	   showError("Added fail");
	        	   setTimeout(closeMessage,700);
	           }else if(msg =="exist"){
	        	   showError("Username exists");
	        	   setTimeout(closeMessage,700);
	           }else if(msg=="error"){
	        	   showError("Operational error！");
	        	   setTimeout(closeMessage,700);
	           }
	           setTimeout(closeMessage,700);
	       },
	       error: function (XMLHttpRequest, textStatus, thrownError) {
	    	   showError("The operation failed！");
	       }
	})
}