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
	var search=$('#searchGoods').val();
	$.ajax({
		type:"post",
		url:"/miniHotel/list.goods",
		dataType:"json",
		data:"currentPage="+num+"&search="+search,
		 beforeSend: function () {
			 $('#goodsList').html("<div class='text-center'><strong style='color:green'>Fetching data</strong>&nbsp;&nbsp;<img src='../../img/login.gif' style='width:40px;height:40px'></div>");
	       },
	       success: function (data) {
	    	   $('#goodsList').html("");
	    	   if(data){
	    			   $.each(data,function(index,obj){
			        	   var div=$('<div class="col-md-4 col-sm-6 col-xs-12"></div>');
			        	   var div1=$('<div class="media"></div>');
			        	   var a=$('<a href="" class="media-left"></a>');
			        	   var body=$('<div class="media-body"></div>');
			        	   $.each(obj,function(key,value){	
			        		   if(key=="goods_code"){
			        			   var img=$('<img src="../../img/'+value+'.jpg" alt="'+value+'" width="100px" height="120px" />');
			        			   a.append(img);  
			        		   }
			        		   if(key=="goods_name"){
			        			   var h4=$('<h4 class="media-heading text-center">'+value+'</h4>');
			        			   body.append(h4);
			        		   }
			        		   if(key=="goods_price"){
			        			   var p1=$('<p class="text-muted text-center">unit price：<span>'+value+'</span>$</p>');
			        			   body.append(p1);
			        		   } 
			        	   })
			        	    var p2=$('<p class="text-muted text-center"><a class="btn btn-success buy">purchase</a></p>');
			        		   body.append(p2);
			        	   div1.append(a).append(body);
			        	   div.append(div1);
			        	   $('#goodsList').append(div);
			           })
			         buyGoods();
			          turnPage(num,search);
	    	   }else{
	    		   $('#goodsList').html("<strong>failed to fetch data</strong>");
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
		url:"/miniHotel/page.goods",
		data:"search="+search,
		 beforeSend: function () {
			 $('#pagebox').html("<div class='text-center'><strong style='color:green'>Getting pagination</strong>&nbsp;&nbsp;<img src='../../img/login.gif' style='width:40px;height:40px'></div>");
	       },
	       success: function (msg) {
	    	   
	    	   if(msg=="empty"){
	    		   $('#goodsList').html("<h4>No Data Found</h4>");
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
	    	   $('#pagebox').html("Failed to obtain pagination!");
	       }
	})
	
}
function searchGoods(){
	getList(1);
}
function buyGoods(){
	$('.buy').on('click',function(){
		var name=$(this).parent().prev().prev().html();
		var price=$(this).parent().prev().children().html();
		var code=$(this).parent().parent().siblings('a').children('img').attr('alt');
		$('#goodsCode').html(code);
		$('#goodsName').html(name);
		$('#goodsPrice').html(price);
		$('#buyGoodNum').val('');
		$('#buyModal').modal();
	})
}
function addGoods(){
	if($('#buyGoodNum').val()==""){
		$('#buyGoodNum').css('border','1px solid red');
		return;
	}
	$('#buyGoodNum').css({'border':'0px','border-bottom':'1px dashed #ccc'});
	var str='<strong style="color:#333">Confirm purchase?</strong>';
	var foot='<button type="button" class="btn btn-success" onClick="javascript:sureGoods();">Are you sure</button><button class="btn btn-default" data-dismiss="modal">Cancel</button>';
	showMessage('prompt',str,foot);
}
function sureGoods(){
	var price=parseInt($('#buyGoodNum').val())*parseInt($('#goodsPrice').html());
	var data="goods="+$('#goodsCode').html()+"&num="+$('#buyGoodNum').val()+"&price="+price+"&type="+1;
	$.ajax({
		type:'post',
		url:'/miniHotel/update.order',
		data:data,
		beforeSend:function(){
			showMessage("prompt", "<div class='text-center'><strong style='color:green'>Getting data</strong>&nbsp;&nbsp;<img src='../../img/login.gif' style='width:40px;height:40px'></div>",null);
		},
		success:function(msg){
			if(msg=="fail"){
				showError("Purchase failed!");
				setTimeout(closeMessage,700);
			}else if(msg=="error"){
				showError("Purchase failed!");
				setTimeout(closeMessage,700);
			}else{
				showMessage("prompt","<strong style='color:green'>Purchase successful!</strong>",null);
				setTimeout(closeMessage,700);
				$('#buyModal').modal('hide');
			}	
		},
		error: function (XMLHttpRequest, textStatus, thrownError) {
	    	 showError("The operation failed！！");
	    	 setTimeout(closeMessage,700);
	    }
	})
}