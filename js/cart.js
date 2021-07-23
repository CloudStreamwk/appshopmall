window.onload = function(){
	/* 提示框关闭 */
	closeWelf();
	/* 单选多选 购物车加减，实现价格、数量统计*/
	allin();
	/* 删除提示 */
	deleteBounce();
};
/* 提示框关闭 */
function closeWelf(){
	/**
	 * 点击关闭隐藏提示框
	 */
	var closeBtn = document.querySelector('.top_close');
	var welfBox = document.querySelector('.hm_welfareTip');
	closeBtn.onclick = function(){
		welfBox.style.display ="none";
	}
}
/* 单选多选 购物车加减，实现价格、数量统计*/
function allin(){
	//计算总价
	var total = null;
	//记录选中几个商品框
	var pitchOn = null;
	//获取店铺
	var shops = document.querySelectorAll('.hm_shop');
	// 获取店铺复选框
	var titList = document.querySelectorAll('.hm_shop_tit_left a');
	//获取商品框
	var prodcList = document.querySelectorAll('.hm_product_left a'); 
	//获取所有复选框
	var productChk = document.querySelectorAll('.hm_check_box');
	
	/**
	 * 点击店铺复选框全选
	 */
	for(var i=0;i<titList.length;i++){
		titList[i].index = i;
		titList[i].onclick = function(){
			//定义数组，用于存放value值
			var numArr = [];
			//定义数组，用于存放价格
			var priceNum = [];
			//获取商品数量input框
			var cots = shops[this.index].querySelectorAll('.cot');
			//获取当前店铺的商品价格，数组
			var price = shops[this.index].querySelectorAll('.price');
			// 获取当前店铺的商品，数组
			var shopProdct = shops[this.index].querySelectorAll('.hm_product_left a');
			for(var i=0;i<price.length;i++){
				//将获取的价格用push添加到numb数组
				var iprice = parseInt(price[i].innerHTML);
				priceNum.push(iprice);
				//将获取的value值用push添加到numArr数组
				var vcots = parseInt(cots[i].value);
				numArr.push(vcots);	
			}
			//如果店铺框被选中，就移除样式，否则全部加上check_back
			if(this.classList.contains('check_back')){
				this.classList.remove('check_back');
				// 清除当前复选框数量，清楚总价，传回页面
				pitchOn -= shopProdct.length;
				
				for(var i=0;i<shopProdct.length;i++){
					shopProdct[i].classList.remove('check_back');
					var sum = priceNum[i]*numArr[i];
					total -= sum;
				}
				
				if(pitchOn<=0 || total<=0){
					total = 0;
					pitchOn = 0;
				}
				//提交到结算框，显示商品总量
				document.querySelector('.piece_num').innerHTML = pitchOn;
				//传到页面，合计价钱
				document.querySelector('.total_text').innerHTML = total;
			}else{
				pitchOn += shopProdct.length;
				this.classList.add('check_back');
				document.querySelector('.piece_num').innerHTML = pitchOn;
				for(var i=0;i<shopProdct.length;i++){
					shopProdct[i].classList.add('check_back');
					var sum = priceNum[i]*numArr[i];
					total += sum;
					
				}
				document.querySelector('.total_text').innerHTML = total;
			}
			
		}
	}
	
	
	// 商品单选
	for(var i=0;i<prodcList.length;i++){
		prodcList[i].index = i;
		prodcList[i].onclick = function(){
			var sum = prinum[this.index]*numArr[this.index];
			if(this.classList.contains('check_back')){
				this.classList.remove('check_back');
				if(document.querySelector('.piece_num').innerHTML>=0){
					pitchOn = pitchOn-1;
				}else{
					return;
				}
				
				// console.log(pitchOn);
				total -= sum;
				document.querySelector('.piece_num').innerHTML = pitchOn;
				document.querySelector('.total_text').innerHTML = total;
			}else{
				this.classList.add('check_back');
				//数量
				if(document.querySelector('.piece_num').innerHTML>=0){
					pitchOn = pitchOn+1;
				}

				console.log(pitchOn);
				//价格
				total += sum;
				// console.log(account);
				document.querySelector('.piece_num').innerHTML = pitchOn;
				document.querySelector('.total_text').innerHTML = total;
				
				console.log(total);
			}
			//this.classList.toggle('check_back');
		}
	}
	//获取价格
	var priceList = document.querySelectorAll('.price');
	var prinum = [];
	
	for(var i=0;i<priceList.length;i++){
		var iprice = parseInt(priceList[i].innerHTML);
		prinum.push(iprice);
	}
	
	//获取数量input框
	var cots = document.querySelectorAll('.cot');
	//定义数组，用于存放value值
	var numArr = [];
	for(var i=0;i<cots.length;i++){
		//将获取的value值用push添加到numArr数组
		var vcots = parseInt(cots[i].value);
		numArr.push(vcots);	
	}
	// 底部全选框点击事件
	document.querySelector('#all').onclick = function(){
		//判断全选框是否选中,如果当前为选中状态，则取消，反之添加选中样式
		if(this.classList.contains('check_back')){
			this.classList.remove('check_back');
			for(var i=0;i<productChk.length;i++){
				productChk[i].classList.remove('check_back');
			}
			// 清除当前复选框数量，传回页面
			pitchOn = 0;
			total = 0;
			document.querySelector('.piece_num').innerHTML = 0;
			document.querySelector('.total_text').innerHTML = 0;
		}else{
			this.classList.add('check_back');
			document.querySelector('.piece_num').innerHTML = prodcList.length;
			for(var i=0;i<productChk.length;i++){
				productChk[i].classList.add('check_back');
				
			}
			for(var i=0;i<prodcList.length;i++){
				var sum = prinum[i]*numArr[i];
				total += sum;
			}
			document.querySelector('.total_text').innerHTML = total;
		}
		
	}
	
	/*
	* 购物车加减数量
	*/
	//设置一个count存放运算完后的value值
	var count = null;
	//获取所有减号按钮
	var subtracts = document.querySelectorAll('.reduce');
	//获取所有加号按钮
	var adplus = document.querySelectorAll('.add');
	
	//点击减号时
	for(var i=0;i<subtracts.length;i++){
		//获取数组当前的索引值 
		subtracts[i].index = i;
		subtracts[i].onclick = function(){
			//获取数量input框
			var cots = document.querySelectorAll('.cot');
			//定义数组，用于存放value值
			var numArr = [];
			for(var i=0;i<cots.length;i++){
				//将获取的value值用push添加到numArr数组
				var vcots = parseInt(cots[i].value);
				numArr.push(vcots);	
			}

			//数量减一
			count = parseInt(numArr[this.index])-1;
			//判断商品数量
			if(count<=0){
				alert("不能再减了！");
				return;
			}
			console.log(count);
			//显示到页面
			document.querySelectorAll('.cot')[this.index].value = count;
		} 
	}
	//点击加号时
	for(var i=0;i<adplus.length;i++){
		//获取数组当前的索引值 
		adplus[i].index = i;
		adplus[i].onclick = function(){
			//获取数量input框
			var cots = document.querySelectorAll('.cot');
			//定义数组，用于存放value值
			var numArr = [];
			for(var i=0;i<cots.length;i++){
				//将获取的value值用push添加到numArr数组
				var vcots = parseInt(cots[i].value);
				numArr.push(vcots);	
			}
			//数量加一
			count = parseInt(numArr[this.index])+1;
			//判断商品数量
			if(count>10){
				alert("富婆，别再加了！");
				return;
			}
			//显示到页面
			document.querySelectorAll('.cot')[this.index].value = count;
		} 
	}
}
/* 删除提示 */
function deleteBounce(){
	/*
	* 1.显示弹出层
	* 2.做动画
	* 3.删除盒子需要做
	* 4.点击取消按钮  关闭  弹出层
	* */
	
	
	/*获取弹出层*/
	var hmWin = document.querySelector('.hm_win');
	/*获取框*/
	var hmWinBox = hmWin.querySelector('.hm_win_box');
	/*获取所有的删除按钮*/
	var deleteList = document.querySelectorAll('.deleteBox');
	
	/*记录当前点击的是哪个按钮*/
	var deleteBtn = null;
	
	for(var i = 0 ; i < deleteList.length ; i ++){
	    deleteList[i].onclick = function(){
	        /*1.显示弹出层*/
	        hmWin.style.display = "block";
	        /*2.做动画*/
	        hmWinBox.classList.add('bounceInDown');
	        /*删除盒子需要做*/
	        console.log(this);
	
	        deleteBtn = this;
	        var up = deleteBtn.querySelector('.up');
	        console.log(up);
	        /*加过渡*/
	        up.style.webkitTransition = "all 1s";
	        up.style.transition = "all 1s";
	        /*定义旋转原点*/
	        up.style.webkitTransformOrigin = "0 5px";
	        up.style.transformOrigin = "0 5px";
	        /*加改变*/
	        up.style.webkitTransform = "rotate(-30deg) translateY(2px)";
	        up.style.transform = "rotate(-30deg) translateY(2px)";
	    }
	}
	
	/*4.点击取消按钮  关闭  弹出层*/
	hmWinBox.querySelector('.cancel').onclick = function(){
	    hmWin.style.display = "none";
	    hmWinBox.classList.remove('bounceInDown');
	
	    /*当前点击过*/
	    if(deleteBtn){
	        var up = deleteBtn.querySelector('.up');
	        up.style.webkitTransform = "none";
	        up.style.transform = "none";
	    }
	}
	/*4.点击取消按钮  关闭  弹出层*/
	hmWinBox.querySelector('.submit').onclick = function(){
	    hmWin.style.display = "none";
	    hmWinBox.classList.remove('bounceInDown');
	
	    /*当前点击过*/
	    if(deleteBtn){
	        var up = deleteBtn.querySelector('.up');
	        up.style.webkitTransform = "none";
	        up.style.transform = "none";
			
	    }
	}
}



