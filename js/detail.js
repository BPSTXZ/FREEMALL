//--------------最开始变量---------------
var  xqHeight=document.documentElement.clientHeight;

//---------------------展示商品部分-------------------
var goods_id=xgetQueryString("goods_id");
$.ajax({
	type:"get",
url:"http://h6.duchengjiu.top/shop/api_goods.php",
data:{
	goods_id:goods_id,
},
success:function(datajson){
				var data=datajson.data[0];
				//输出商品信息
        console.dir(data)
        var lunbostr=
        `
        <div class="swiper-wrapper">
			     <div class="swiper-slide">
			        <img src="${data.goods_thumb}"/>
			     </div>
			     <div class="swiper-slide">
			        <img src="${data.goods_thumb}"/>
			     </div>
			     <div class="swiper-slide">
			        <img src="${data.goods_thumb}"/>
			     </div>
	     </div> 
	     <div class="swiper-pagination"></div>
        `
        //获取数据后添加到轮播图盒子中
        $("#xqlunbo").html(lunbostr);
        
        //把商品信息放在商品信息的盒子
        var goodsmessage=
        `
        <h1>商品详情</h1>
        <p class="xiangqing goods_price">${data.price}</p>
          <p class="xiangqing goods_name">${data.goods_name}</p>
          <p class="xiangqing goods_desc" >${data.goods_desc}</p>
          
        `
       $(".goods_message").html(goodsmessage);
       
       //在模态框中显示商品图片
       var motaistr=
       `
          <img src="${data.goods_thumb}"/>
          <p>
              <span>${data.goods_name}</span>
              <span class="xqssss">${data.price}元</span>
          </p>
          <span></span>
       `
       $(".xqxzsp1").html(motaistr);
       
       
                //swiper部分
				var mySwiper = new Swiper('.swiper-container', {
					autoplay: 3000,//可选选项，自动滑动
					loop:true,
					autoplayDisableOnInteraction : false,
					pagination: '.swiper-pagination',
					
				})        
	}
	
});

//获取url后面的参数
function xgetQueryString(name) {
  var search = location.search.substr(1);
  //abc=123&a=&ccc=abc
  //(^|&)   (&|$)
  //abc=([^&]*)
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var result = search.match(reg);
  // if (result === null) return null;
  // return decodeURIComponent(result[2]);
  return result === null ? null : decodeURIComponent(result[2]);
}



//---------------------------店铺部分-----------------------
//修改按钮高度
var xqheight=$(".xqbt a").css("height");

$(".xqbt a").css("line-height",xqheight);
$(".xqbt a span").css({
	"top":"50%",
     "margin-top":"-16px"
});

//------------------------模态框部分----------------------
//把弹出部分放到页面底部
$(".xqxzsp>div").css("top",xqHeight+100);
var x=document.querySelectorAll(".xqxzsp3 div p i");
for(var i=0;i<x.length;i++){
	(function(i){
		x[i].addEventListener("touchstart", function(){
			 var fuhao=x[i].innerHTML;
			 var num=parseInt(document.querySelector(".xqxzsp3 div p span").innerHTML);
			 if(fuhao==="+"){
			 	num++;			 	
			    $(".xqxzsp3 div p span").html(num);
			 }
			 else if(fuhao==="-"){
			 	num--;
			 	if(num<0){
			 		num=0;
			 	}
			 	$(".xqxzsp3 div p span").html(num);
			 }
		});
	})(i)
}
//点击确定按钮
var quedingbox=document.querySelector(".xqxzsp4");
quedingbox.addEventListener("touchstart",function(){
	var num=parseInt(document.querySelector(".xqxzsp3 div p span").innerHTML);
	var x=document.querySelector("#xqnumber");
	x.innerHTML=num+"件";
	changeB();
	$(".xqxzsp>div").animate({"top":xqHeight+100},500,function(){
		$(".xqxzsp").css("display","none");
	});
	
})
//点击关闭按钮
var xqxzsp1span=document.querySelector(".xqxzsp1");
xqxzsp1span.addEventListener("touchstart",function(){
	 $(".xqxzsp>div").animate({"top":xqHeight+100},500,function(){
	 	$(".xqxzsp").css("display","none");
	 });
	 
})

//弹出选择数量模态框
var xqchoose=document.querySelector(".xqchoose");
xqchoose.addEventListener("touchstart",function(){
	$(".xqxzsp").css("display","block");
	$(".xqxzsp>div").animate({"top":xqHeight*0.4},500);
})


//如果已经选择数量,则换背景图
function changeB(){
   var num=parseInt(document.querySelector("#xqnumber").innerHTML);
   if(num>0){
   	  $("#xqchoosepic").css("background-image","url(xiangqingimg/xqchoose2.png)");
   }
   else{
   	$("#xqchoosepic").css("background-image","url(xiangqingimg/xqchoose1.png)");
   }
}

//-------------点击加入购物车---------------
//localStorage.username="xiangweiixing";
//localStorage.username="";
var  jiarugwc=document.querySelector("#xqlj");
//节流锁
var xqlock=true;
jiarugwc.addEventListener("touchstart",function(){
	if(!xqlock){
		return;
	}
    if(!localStorage.username){
    	alert("请登录");
    	localStorage.backurl = location.href;
    	location.href = "login.html";
    	return;
    }
    var num=parseInt(document.querySelector("#xqnumber").innerHTML);
    xqlock=false;
    $.ajax({
    	type:"post",
    	url:"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
    	data:{
    		goods_id:goods_id,
    		number:num
    	},
    	success:function(jsondata){
    		//成功后开锁
    		xqlock=true;
//  		console.log(jsondata);
           //重新更新购物车图片
            xqchangegwc();
    		alert(jsondata.message);
    		
    	}
    });
    
    
})

//--------------------购物车部分-------------
function xqchangegwc(){
	$.ajax({
	type:"get",
	url:"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
	success:function(datajson){
		var data=datajson.data;
		var num=data.length;
		$('#xqgwc em').html(""+num);
	}
   });
}
xqchangegwc();




