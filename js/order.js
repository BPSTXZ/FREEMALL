//订单页面返回键
$('.toback').on('touchstart',function(){
	location.href = "user.html";
});

$.ajax({
	type:"get",
	url:"http://h6.duchengjiu.top/shop/api_order.php?token="+localStorage.token,
	data:{},
	success:function(response){
		var data = response.data;
		var str = '';
		if(data.length == 0){
			str += `
			<div class="nothing">
				<img src="imgs/cart/nothing.png">
				<p>你还没有完成的订单,快去购物吧</p>
			</div>`
		}else{
			for(var i = 0;i<data.length;i++){
				str += `
				<div class="order" data-order-id=${data[i].order_id}>
					<div class="order-head">
						<span>
							优才创智旗舰店
						</span>
						<span class="delate glyphicon glyphicon-trash"></span>
					</div>
					<div class="order-body">
						<div class="good-img">
							<img src="${data[i].goods_list[0].goods_thumb}"/>
						</div>
						<div class="good-text">
							<div class="good-msg">
								<p class="good-name">${data[i].goods_list[0].goods_name}</p>
								<p class="good-dec">商品描述</p>
							</div>
							<div class="good-price">
								￥<span>${data[i].goods_list[0].goods_price}</span>
							</div>
							<div class="good-num">
								X<span>${data[i].goods_list[0].goods_number}</span>
							</div>
						</div>
					</div>
					<div class="order-add">
						<span>${data[i].province}</span>
						<span>${data[i].city}</span>
						<span>${data[i].address}</span>
						<span class="order-tel">${data[i].mobile}</span>
					</div>
					<div class="order-foot">
						合计：￥<span>${data[i].goods_list[0].goods_price*data[i].goods_list[0].goods_number}</span>
					</div>
				</div>
				`;
			}
		}
		$('.order-main').html(str);
		$('.delate').on('touchstart',function(){
			if(confirm("确定删除该订单？")){
				alert('杜老师没有写删除订单的api，发红包！');
			}
		});
	}
});