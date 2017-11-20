
	//判断是否登录
	
	if(localStorage.username){
	$.ajax({
		type:"get",
		url:"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
		data:{},
		success:function(response){
			var data = response.data;
			var str = '';
			if(data.length == 0){
				str += `
				<div class="nothing">
					<img src="imgs/cart/nothing.png">
					<p>空空如也,快去首页添加商品吧</p>
				</div>`
			}else{
				for(var i = 0;i<data.length;i++){
					str += `
					<li class="cart-good" data-id=${data[i].goods_id} >
					<input type="checkbox" class="good-check" name="" id="" />
					<a class="c-g-img">
						<img src="${data[i].goods_thumb}"/>
					</a>
					<div class="c-g-text">
						<h4>${data[i].goods_name}</h4>
						<span class="delate">删除</span>					
						<div class="c-g-price">
							<div class="prices">
								￥<span>${data[i].goods_price}</span>
							</div>
							<div class="num">
								<a href="javascript:;" class="min-btn">-</a>
								<span>${data[i].goods_number}</span>
								<a href="javascript:;" class="add-btn">+</a>
							</div>
						</div>
					</div>
				</li>`
				}
			}
			$("#cart-goods").html(str);
			showSum();
			//增加数量
			$('.add-btn').on("touchstart",function(){
				updataNum($(this),"+1");
			})
			//减少数量
			$('.min-btn').on('touchstart',function(){
				updataNum($(this),"-1");
			})
			
			//判断是否选中
			$('.good-check').on("touchstart",function(){
				setTimeout(function(){		
					showSum();
				},200);
			});
			
			//全选
			var allcheckstate = 0;
			$('#allcheck').on('touchstart',function(){
				var inputs = $('.good-check');
				allcheckstate = allcheckstate === 0 ? 1:0;
				var str = allcheckstate === 0 ? "" : "checked";
				for (var i = 0; i < inputs.length; i++) {
			        inputs[i].checked = str;
			      }
				showSum();
			});
			//删除键事件
			$('.delate').on('touchstart',function(){
				if(confirm("确定要删除该购物车商品？")){
					alert("杜老师没写删除购物车商品的API！发红包！");
				}
			});
		}
	});
	$.get("http://h6.duchengjiu.top/shop/api_useraddress.php?token="+localStorage.token,{},function(response){
		var data = response.data;
		var str = '';
		for(var i = 0;i<data.length;i++){
			str += `
			<li data-id=${data[i].address_id}><span class="c-m-prov">${data[i].province}</span>
						<span class="c-m-city">${data[i].city}</span>
						<span class="c-m-county">${data[i].district}</span>
						<span class="c-m-address">${data[i].address}</span>
					</li>`
		}
		$("#c-m-main").html(str);
		//选择地址
		$('.c-m-main li').on('touchstart',function(){
			$(this).addClass('active').siblings().removeClass('active');
		});
	});
	}else{
		alert("请先登录");
		localStorage.backurl = location.href;
		location.href = "login.html";
	}

//更新数量
function updataNum(obj,num){
	
	var goodnum = $(obj).parent().children("span");
	var good_value = parseInt(goodnum.text());
	if(goodnum.text() <= 1 && num === "-1"){
		return;
	}
	if(goodnum.text() >= 10 && num === "+1"){
		return;
	}
	if(num === "+1"){
		good_value ++;
	}else if(num === "-1"){
		good_value --;
	}
	goodnum.text(good_value);
	showSum();
}
//更新总价
function showSum(){
	var $goods = $('.cart-good');
	var sum = 0;
	for(var i = 0;i<$goods.length;i++){
		var goodsS = $goods[i];
		
		if($(goodsS).children('.good-check').is(':checked')){
			
			var good_price = parseFloat($(goodsS).children(".c-g-text").children(".c-g-price").children(".prices").children("span").text()).toFixed(2);
			var good_num = parseFloat($(goodsS).children(".c-g-text").children(".c-g-price").children(".num").children("span").text());
			sum += (good_price*good_num);
		}
	}
	
	$("#total").text(sum.toFixed(2));
}


//点击返回键
$(".toback").on('touchstart',function(){
	window.history.back();
});
//点击结算，弹出模态框
$('#balance').on('touchstart',function(){
	if($("#total").text() == 0){
		alert("请选择商品后再结算");
	}else{
		$('.cart-modal').css('display','block');
		$('.cart-modal-body').animate({
			bottom : "3rem",
		},300,"linear");
		$('body').css("overflow-y","hidden")
		$(".cart-main").css('overflow-y',"hidden");
		$("#entotal").text($("#total").text());
	}
});

//$('.cart-modal').click(modalmiss);
$('#modal-close').on('touchstart',modalmiss);

//模态框消失
function modalmiss(){
	$('.cart-modal-body').animate({
		bottom : "-100%",
	},400,"linear",function(){
		$('.cart-modal').css('display','none');
	});
	$('body').css("overflow-y","auto")
	$(".cart-main").css('overflow-y',"auto");
}

//确认结算，传递数据
$("#enbalance").on("touchstart",function(){
	var address_id;
	var $address = $("#c-m-main").children("li");
	console.log($address);
	for(var i=0;i<$address.length;i++){
		console.log($address[i]);
		if($($address[i]).hasClass("active")){
			address_id = $($address[i]).data("id");
			console.log(address_id);
		}
	}
	
	$.ajax({
		type:"post",
		url:"http://h6.duchengjiu.top/shop/api_order.php?token="+localStorage.token+"&status=add&debug=1",
		data:{
			address_id:address_id,
			total_prices:$("#entotal").text(),
		},
		success:function(response){
			alert(response.message);
			location.reload(true);
		}
	});
});
