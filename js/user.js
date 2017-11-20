var oLogin =document.querySelector("#login")
if(localStorage.username){
	oLogin.innerText = localStorage.username;
	
}else{
	oLogin.innerText = "未登录";
	$("#login").on('touchstart',function(){
		localStorage.backurl = location.href;
		location.href = "login.html";
	})
}

$('.quit').parent().on('touchstart',function(){
	if(confirm("确定退出本账号？")){
		localStorage.clear();
		location.href = "login.html";
	}
});
