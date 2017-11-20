//模态框出现
$("#bottom-btn").on("touchstart",function(){
	$("#out-box").css("display","block");
	$("#address-modal").css("display","block").animate({
		bottom:"3rem",
	},300,"linear")
});
//模态框消失
$("#modal-disappear").on("touchstart",function () {
	$("#out-box").css("display","none");
	$("#address-modal").animate({bottom:"-100%",},300,"linear",function(){
		$("#address-modal").css("display","none");
	});
});
var oFinish = document.querySelector("#finish")
var oModal = document.querySelector("#address-modal")
var oBox = document.querySelector("#out-box")
var oList = document.querySelector(".address-list")
oFinish.addEventListener("touchstart",function () {
	var shr = document.querySelector(".list-botm").value;
	var phone = document.querySelector("#list-phone").value;
	var prov = document.querySelector(".list-prov").value;
	var place = document.querySelector(".list-place").value;
	var detail = document.querySelector(".detail").value;
$.post("http://h6.duchengjiu.top/shop/api_useraddress.php?status=add&token="+localStorage.token,{
		address_name:shr,
		mobile:phone,
		province:prov,
		city:place,
		address:detail
	},
	function(json) {
		alert("添加成功");
		oModal.style.display = "none";
		oBox.style.display = "none";
		  location.reload(true) ;
	});
});
if (localStorage.token=="") {
	alert(json.message);
	localStorage.backurl = location.href;
	location.href="login.html";
}else{
	$.get("http://h6.duchengjiu.top/shop/api_useraddress.php?token="+localStorage.token,{},
	function (json) {
		var data = json.data;
		var str = "";
		if(data.length == 0){
			str += `
			<div class="nothing">
				<img src="imgs/cart/nothing.png">
				<p>你还没有添加收货地址,快去添加吧</p>
			</div>`
		}else{
			for (var i =0;i<data.length;i++) {
				var obj = data[i];
				str +=`
		<li class="add-li" data-address-id=${obj.address_id}>
			<p class="add-nav">
			<span class="add-name">${obj.address_name}</span>
			<span class="add-phone">${obj.mobile}</span>
			</p>
			<p class="add-address">${obj.province}${obj.city}${obj.address} </p>
			<i class="iconfont">&#xe601;<p class="add-delect">删除</p></i>
		</li>`
			}
		}
		oList.innerHTML = str;
		$(".add-delect").on("touchstart",function () {
			var address_id = $(this).parent().parent().data("address-id");
			console.log(address_id);
			$.get("http://h6.duchengjiu.top/shop/api_useraddress.php?status=delete&address_id="+address_id+"&token="+localStorage.token,{},function(json){
				alert(json.message);
				location.reload(true);
			});
		});
	});
}

