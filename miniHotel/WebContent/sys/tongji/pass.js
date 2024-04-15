// JavaScript Document
function init(){
	navScroll();
	listMenu();
	setInterval(showTime,1000);
	getUserInfo(2);
	getInitShop();
	$('#shops').on('change',function(){
		var shop=$(this).val();
		getPassData(shop);
	})
}
function getPassData(shop){
	$.ajax({
		type:'post',
		url:'/miniHotel/pass.tongji',
		data:"shop="+shop,
		beforeSend:function(){
			$('#canvas').html("<div class='text-center'><strong style='color:green'>Fetching data</strong>&nbsp;&nbsp;<img src='../../img/login.gif' style='width:40px;height:40px'></div>");
		},
		success:function(data){
			if(data){
				$('#canvas').html("");
				var date=data.split("-")[0];
				var count=data.split("-")[1];
				var dateArr=date.substring(1,date.indexOf(']')).split(',').reverse();
				var countArr=count.substring(1,count.indexOf(']')).split(',').reverse();
				var lineChartData = {
				labels : dateArr,
				datasets : [
					{	
						fillColor : "rgba(200,0,300,0.5)",
						strokeColor : "#000",
						pointColor : "rgba(200,0,300,1);",
						pointStrokeColor : "#fff",
						pointHighlightFill : "red",
						pointHighlightStroke : "red",
						data : countArr
					}
				]

			}
			var ctx = document.getElementById("canvas").getContext("2d");
				window.myLine = new Chart(ctx).Line(lineChartData, {
					responsive: true
				});
			}else{
				$('#canvas').html("<h4>No Data Found</h4>");
			}
		},
		 error: function (XMLHttpRequest, textStatus, thrownError) {
	    	   $('#canvas').html("<h4>Failed to retrieve data.</h4>");
	       }
	})
	
}
function getInitShop(){
		$.ajax({
			type:"post",
			url:"/miniHotel/list.shop",
			dataType:"json",
		       success: function (data) {
		    	   if(data){
		    			   $.each(data,function(index,obj){
		    				   var option=$('<option></option>');
				        	   $.each(obj,function(key,value){
				        		 if(key=="shop_code"){
				        			   option.attr('value',value);
				        		   }
				        		if(key=="shop_name"){
				        			option.html(value);
				        		}
				        	   })
				        	   $('#shops').append(option);
				           })
		    	   }else{
		    		 
		    	   }    
		       },
		       error: function (XMLHttpRequest, textStatus, thrownError) {
		    	   showError("Failed to retrieve data.");
		       }
		})
}