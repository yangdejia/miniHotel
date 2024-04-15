function init(){

    var stre = getCookie("emp"); 
    var stra=getCookie("admin"); 
    var strs=getCookie("sys"); 
    var name="";
    var pwd="";
    if(stre!=null&&stre!=""){
    	name = stre.split("%2C")[0];
    	pwd = stre.split("%2C")[1];
	    $('#login').val(name);
	    if((typeof pwd)!="undefined")
	    $('#pwd').val(pwd);
    }
    if(stra!=null&&stra!=""){
    	name = stra.split("%2C")[0];
    	pwd = stra.split("%2C")[1];
	    $('#alogin').val(name);
	    if((typeof pwd)!="undefined")
	    $('#apwd').val(pwd);
    }
    if(strs!=null&&strs!=""){
    	name = strs.split("%2C")[0];
    	pwd = strs.split("%2C")[1];
	    $('#slogin').val(name);
	    if((typeof pwd)!="undefined")
	    $('#spwd').val(pwd);
    }
    initPwd();
    
}

function staffLogin(num){
	var data="";
	if(num==0){
		 if($("#stafflogin").val() == ""){
		        showError('Please enter your username!');
		        return;
		   }
		    if( $("#staffpwd").val() == ""){
		   	 showError('Please enter your password!');
		        return;
		   }  
		   if($("#remember").is(':checked')){
			   data="login=" + $('#stafflogin').val()+ "&pwd=" + $('#staffpwd').val()+"&type="+"emp"+"&remember=1";
		   }else{
			   data="login=" + $('#stafflogin').val()+ "&pwd=" + $('#staffpwd').val()+"&type="+"emp";
		   }
	 }
	else if(num == 1){
		if($("#adminlogin").val() == ""){
	        showError('Please enter your username!');
	        return;
	   }
	    if( $("#adminpwd").val() == ""){
	   	 showError('Please enter your password!');
	        return;
	   }  
		  if($("#adminremember").is(':checked')){
			  data="login=" + $('#adminlogin').val()+ "&pwd=" + $('#adminpwd').val()+"&type="+"admin"+"&remember=1";
		  }else{
			  data="login=" + $('#adminlogin').val()+ "&pwd=" + $('#adminpwd').val()+"&type="+"admin";
		}
		 
	}
	else if(num == 2){
		if($("#bookerlogin").val() == ""){
	        showError('Please enter your username!');
	        return;
	   }
	    if( $("#bookerpwd").val() == ""){
	   	 showError('Please enter your password!');
	        return;
	   }  
	
		  if($("#sremember").is(':checked')){
			  data="login=" + $('#bookerlogin').val()+ "&pwd=" + $('#bookerpwd').val()+"&type="+"booker"+"&remember=1";
		  }else{
			  data="login=" + $('#bookerlogin').val()+ "&pwd=" + $('#bookerpwd').val()+"&type="+"booker";
			   }
		 
	}
   $.ajax({
       type: "POST",
       url: "LoginServlet",
       data: data,
       beforeSend: function () {
    	   showMessage("Tips","<strong style='color:green'>Logining</strong>&nbsp;&nbsp;<img src='img/login.gif' style='width:40px;height:40px'>",null); 
    	   $('#myModalBody').addClass("text-center");
       },
       success: function (msg) {
    	   if (msg == "success") {
    		   if(num==0){
    		   showMessage(" Hint ","<strong style='color:green'> Login successful! </strong>",null); 
    		   setTimeout("window.location.href=\"employee/index.html\"",1200);
    		   }else if(num==1){
    		   showMessage(" Hint ","<strong style='color:green'> Login successful! </strong>",null);
    		   setTimeout("window.location.href=\"admin/index.html\"",1200);
    		   }else if(num==2){
    		   showMessage(" Hint ","<strong style='color:green'> Login successful! </strong>",null);
    		   setTimeout("window.location.href=\"sys/index.html\"",1200);
    		   }
           }
     
           if (msg == "fail") {
               showError("Incorrect username or password!"); 
               setTimeout(closeMessage,700);
           }
           if(msg == "error"){
        	   showError("Operation failed! ");  
        	   setTimeout(closeMessage,700);
           }
       },
       error: function (XMLHttpRequest, textStatus, thrownError) {
    	   showError("Operation failed! ");
       }
   });
}

function register()
{
	data="type=" + $('#regType').val() + "&login=" + $('#loginname').val() + "&username=" + $('#username').val() + "&pwd=" + $('#userpwd').val() + "&pwd2="+$('#userpwd2').val();
	$.ajax({
	       type: "POST",
	       url: "RegisterServlet",
	       data: data,
	       beforeSend: function () {
	    	   showMessage("Tips","<strong style='color:green'>waiting</strong>&nbsp;&nbsp;<img src='img/login.gif' style='width:40px;height:40px'>",null); 
	    	   $('#myModalBody').addClass("text-center");
	       },
	       success: function (msg) {
	    	   if (msg == "success") {
	    		   showMessage(" Hint ","<strong style='color:green'> register successful! </strong>",null);
	    		   setTimeout("window.location.href=\"login.html\"",1200);
	           }
	     
	           if (msg == "fail") {
	               showError("password not matched!"); 
	               setTimeout(closeMessage,700);
	           }
	           if(msg == "exist"){
	        	   showError("User exists!");  
	        	   setTimeout(closeMessage,700);
	           }
	       },
	       error: function (XMLHttpRequest, textStatus, thrownError) {
	    	   showError("Operation failed! ");
	       }
	   });
	
}

function sureLogin(str){
	if(str==0)
	window.location.href="employee/index.html";
	else if(str==1){
		window.location.href="admin/index.html";
	}
}
function getCookie(cname) {
	var name = cname + "=";
	
    var ca = document.cookie.split(';')
    
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ')
        	c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

function cantEmpty(){
	var flag=true;
	if($('#staffLogin').val()==""){
		$('#staffLogin').css('border','1px solid red');
		flag=false;
	}
	if($('#staffName').val()==""){
		$('#staffName').css('border','1px solid red');
		flag=false;
	}
	if($('#staffPwd').val()==""){
		$('#staffPwd').css('border','1px solid red');
		flag=false;
	}
	if($('#staffPwd2').val()==""){
		$('#staffPwd2').css('border','1px solid red');
		flag=false;
	}
	return flag;
}
function initPwd(){
	$('#staffPwd').keyup(function(){
		if($(this).val()!=null&&$(this).val()!=''){
			if($(this).val()!=$('#staffPwd2').val()){
				$('#staffPwd2').css('border','1px solid red');
			}
			else{
				$('#staffPwd2').css('border','1px solid #ccc');
			}
		}
	})
	$('#staffPwd2').keyup(function(){
		if($(this).val()!=null&&$(this).val()!=''){
			if($(this).val()!=$('#staffPwd').val()){
				$('#staffPwd2').css('border','1px solid red');
			}
			else{
				$('#staffPwd2').css('border','1px solid #ccc');
			}
		}
	})
}