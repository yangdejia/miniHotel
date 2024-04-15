// JavaScript Document
function init(){
	formDisabled();
	navScroll();
	setInterval(showTime,1000);
	listMenu();
	initEditPwd();
	getUserInfo(1);
	if($('#pwdMsg').length<=0)
	personInfo();
	getShop(1);
}
function formDisabled(){
	if($('#pwdMsg').length<=0){
		$('.form-group').children().attr('disabled',true);
		$('.radio').children().children().attr('disabled','disabled');
	}
}
function formAbled(){
	$('.form-group').children().removeAttr('disabled');
	$('.radio').children().children().removeAttr('disabled');
}			
function editPwd(){
	var str='<strong style="color:#333">Confirm changing password?</strong>';
	var foot='<button class="btn btn-success" onClick="javascript:sureEditPwd();">confirm</button><button class="btn btn-default" data-dismiss="modal">关闭</button>';
	showMessage('prompt',str,foot);
}
function sureEditPwd(){
	 $.ajax({
	       type: "post",
	       url: "pwd.staff",
	       data:"pwd="+$('#pwdOne').val()+"&type="+1,
	       beforeSend: function () {
	    	   showMessage("prompt","<strong style='color:green'>Modifying</strong>&nbsp;&nbsp;<img src='../../img/login.gif' style='width:40px;height:40px'>",null);
	    	   $('#myModalBody').addClass("text-center");
	       },
	       success: function (msg) {
	           if(msg=="success"){
	        	   showMessage("prompt","<strong style='color:green'>The modification was successful！</strong>",null);  
	        	   setTimeout(closeMessage,800);
	        	   setTimeout("window.location.reload()",800);
	           }else if(msg == "fail"){
	        	   showError("The modification failed！");
	           }
	       },
	       error: function (XMLHttpRequest, textStatus, thrownError) {
	    	   showError("The operation failed！");
	       }
	   });
}
function editPerson(){
	if($('#userName').val()==""){
		$('#userName').css('border','1px solid red');
		return;
	}
	$('#userName').css({'border':'0px','border-bottom':'1px dashed #ccc'});
	var str='<strong style="color:#333">Confirm modifying personal information?</strong>';
	var foot='<button class="btn btn-success" onClick="javascript:sureEditPerson();">Confirm</button><button class="btn btn-default" data-dismiss="modal">Close</button>';
	showMessage('prompt',str,foot);
}
function sureEditPerson(){
	var arr=document.getElementsByName('userSex');
	var sex="";
	for(var i=0;i<arr.length;i++){
		if(arr[i].checked){
			sex=arr[i].value;
		}
	}
	var data="login="+$('#userLogin').val()+"&name="+$('#userName').val()
	+"&age="+$('#userAge').val()+"&sex="+sex
	+"&time="+$('#userTime').val()+"&tel="+$('#userTel').val()
	+"&address="+$('#userAddress').val()+"&remark="+$('#userRemark').val()+"&type="+1;
	 $.ajax({
	       type: "post",
	       url: "update.staff",
	       data:data,
	       beforeSend: function () {
	    	   showMessage("prompt","<strong style='color:green'>Loading</strong>&nbsp;&nbsp;<img src='../../img/login.gif' style='width:40px;height:40px'>",null);
	    	   $('#myModalBody').addClass("text-center");
	       },
	       success: function (msg) {
	           if(msg=="success"){
	        	   personInfo();
	        	   showMessage("prompt","<strong style='color:green'>The modification was successful！</strong>",null);
	        	   setTimeout(closeMessage,700);
	        	   formDisabled();
	           }else if(msg == "fail"){
	        	   showError("The modification failed！");
	           }
	       },
	       error: function (XMLHttpRequest, textStatus, thrownError) {
	    	   showError("The operation failed！");
	       }
	   });
}
function cancelEdit(){
	window.location.reload();
}
function initEditPwd(){
	$('#pwdOk').attr('disabled',true);
	$('#pwdOne').keyup(function(){
		if($(this).val()!=null&&$(this).val()!=''){
			if($(this).val()!=$('#pwdTwo').val()){
				$('#pwdMsg').css('display','inline-block');
				$('#pwdOk').attr('disabled',true);
			}
			else{
				$('#pwdMsg').css('display','none');
				$('#pwdOk').removeAttr('disabled');
			}
		}
	})
	$('#pwdTwo').keyup(function(){
		if($(this).val()!=null&&$(this).val()!=''){
			if($(this).val()!=$('#pwdOne').val()){
				$('#pwdMsg').css('display','inline-block');
				$('#pwdOk').attr('disabled',true);
			}
			else{
				$('#pwdMsg').css('display','none');
				$('#pwdOk').removeAttr('disabled');
			}
		}
	})
}
function personInfo(){
	$.ajax({
	       type: "post",
	       url: "person.staff",
	       dataType:"json",
	       data:"type="+1,
	       beforeSend: function () {
	    	   $('.login-form').addClass('hidden');
	       },
	       success: function (data) {
	    	   if(data){
	    		   $.each(data,function(index,obj){
	    			   $.each(obj,function(key,value){
							
							if(key=="staff_login"){
								$("#userLogin").val(value);
							}
							if(key=="staff_pwd"){
								$("#userPwd").val(value);
							}
							if(key=="staff_name"){
								$("#userName").val(value);
							}
							if(key=="staff_age"){
								if(value!=0){
									$("#userAge").val(value);
								}else{
									$("#userAge").val("");
								}
							}
							if(key=="staff_sex"){
								var arr=$("input[type='radio']");
								for(var i=0;i<arr.length;i++){
									if(arr[i].value==value){
										arr[i].checked=true;
									}
								}
							}
							if(key=="staff_time"){
								$("#userTime").val(value);
							}
							if(key=="staff_tel"){
								$("#userTel").val(value);
							}
							if(key=="staff_address"){
								$("#userAddress").val(value);
							}
							if(key=="staff_remark"){
								$("#userRemark").val(value);
							}
							
						})
						$('.login-form').removeClass('hidden');
	    			    $('#msg').addClass('hidden');
	    		   })

	    	   }else{
	    		   showError("Loading failed!");
	    	   }     
	       },
	       error: function (XMLHttpRequest, textStatus, thrownError) {
	    	  // showError("The operation failed！");
	       }
	   });
}