function listMenu(){
	$('.list-tooltip').tooltip();
		$("a.list-btn").click(function(e){
			e.preventDefault();
			if(!($(this).hasClass("active"))){
				$(".listMenu-list").animate({
					height: "135px",
					opacity: "1"
				});
				$(this).addClass("active");
			}
			else{
				$(".listMenu-list").animate({
					height: "0px",
					opacity: "0"
				});
				$(this).removeClass("active");
			}
		});
		$("#myCarousel").carousel({interval:4000});
}
function showTel(){
	$('#telWay').fadeToggle(200);
}
function openMessage(){
	$('#myModal').modal();
}
function showMessage(title,str,footer){
	$('#myModalLabel').html('');
	$('#myModalFooter').html('');
	if(title!=null){
		
		$('#myModalLabel').html(title);
	}
	
	if(footer!=null){	
		$('#myModalFooter').html(footer);
	}
	$('#myModalBody').html('');
	$('#myModalBody').html(str);
	openMessage();
}
function showError(str){
	$('#myModalLabel').html('');
	$('#myModalLabel').html('<h4>Error message：</h4>');
	$('#myModalBody').html('');
	$('#myModalBody').html(str);
	$('#myModalFooter').html("<button type='button' class='btn btn-success' data-dismiss='modal'>Are you sure</button>");
	$('#myModalBody').css('color','red');
	openMessage();
}

function closeMessage(){
	$('#myModal').modal('hide');
}
function navScroll(){
	var a = $("#nav").offset().top;
$(window).scroll(function() {	
    var obj_height = document.documentElement.scrollTop || document.body.scrollTop;
    if(obj_height >= a)
    {
        $("#nav").addClass('navbar-fixed-top');
    }
    else
    {
        $("#nav").removeClass('navbar-fixed-top');
    }
});
}
function showTime(){
	var date=new Date();
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	var day=date.getDate();
	var week=date.getDay();
	var hour=date.getHours();
	var minute=date.getMinutes();
	var second=date.getSeconds();
	if(month<10){
		month='0'+month;
	}
	if(day<10){
		day='0'+day;
	}
	switch(week){
		case 0:week='Sun';break;
		case 1:week='Mon';break;
		case 2:week='Tue';break;
		case 3:week='Wed';break;
		case 4:week='Thu';break;
		case 5:week='Fri';break;
		case 6:week='Sat';break;
	}
	if(minute<10){
		minute='0'+minute;
	}
	if(second<10){
		second='0'+second;
	}
	$('#time').html(year+'-'+month+'-'+day+'- '+week+' '+hour+'：'+minute+'：'+second);
}
function hiddenAlert(){
	$('#alert').css('display','none');
}
function getUserInfo(num){
	 $.ajax({
	       type: "post",
	       url: "/miniHotel/info.staff",
	       data:"type="+num,
	       success: function (msg) {
	           if(msg=="fail"){
	        	   $('#userInfo').html("Not logged in!");
	        	   showMessage("prompt","<h4 style='color:green'>Not logged in! Automatically redirect to login page</h4>",null);
	        	   setTimeout("window.location.href=\"/miniHotel/login.html\"",1500);   
	           }else{
	        	   var arr=new Array();
		           arr=msg.split(",");
		           $('#userInfo').html(arr[1]);
		           $('#userInfo').attr("alt",arr[0]);
		           $('#mainUser').html(arr[1]);
		           $('#mainUser').val(arr[1]);
		           $('#mainUser').attr("alt",arr[0]);
	           }
	       },
	       error: function (XMLHttpRequest, textStatus, thrownError) {
	    	   $('#userInfo').html("Not logged in"); 
	    	   showMessage("prompt","<h4 style='color:green'>Not logged in! Automatically redirect to login page</h4>",null);
        	   setTimeout("window.location.href=\"/miniHotel/login.html\"",2000);  
	       }
	   });
}
function exit(num){
	showMessage("prompt","Are you sure to exit？","<button class='btn btn-success' onclick='javascript:sureExit("+num+");'>Are you sure</button><button class='btn btn-default' data-dismiss='modal'>Cancel</button>");
}
function sureExit(num){
	$.ajax({
		type:"post",
		url:"sessionDel.staff",
		data:"type="+num,
		 success: function (msg) {
	           if(msg=="fail"){
	        	   showError("<h4 style='color:#ff0000'>Exit error!</h4>");
	           }else if(msg=="success"){
	        	   window.location.href="/miniHotel/login.html";
	           }
	       },
	       error: function (XMLHttpRequest, textStatus, thrownError) {
	    	   showError("<h4 style='color:red'>Exit exception!</h4>"); 
	       }
	})
	window.location.href="/miniHotel/login.html";
}
function getShop(num){
	$.ajax({
		type:"post",
		url:"shop.staff",
		data:"type="+num,
		 success: function (msg) {
			 if(msg!='fail')
	          $('#shopName').html(msg.substr(msg.indexOf('-')+1));
	       },
	       error: function (XMLHttpRequest, textStatus, thrownError) {
	    	   $('#shopName').html("Data acquisition failed"); 
	       }
	})
}