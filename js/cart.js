window.onload = function(){
	/* ��ʾ��ر� */
	closeWelf();
	/* ��ѡ��ѡ ���ﳵ�Ӽ���ʵ�ּ۸�����ͳ��*/
	allin();
	/* ɾ����ʾ */
	deleteBounce();
};
/* ��ʾ��ر� */
function closeWelf(){
	/**
	 * ����ر�������ʾ��
	 */
	var closeBtn = document.querySelector('.top_close');
	var welfBox = document.querySelector('.hm_welfareTip');
	closeBtn.onclick = function(){
		welfBox.style.display ="none";
	}
}
/* ��ѡ��ѡ ���ﳵ�Ӽ���ʵ�ּ۸�����ͳ��*/
function allin(){
	//�����ܼ�
	var total = null;
	//��¼ѡ�м�����Ʒ��
	var pitchOn = null;
	//��ȡ����
	var shops = document.querySelectorAll('.hm_shop');
	// ��ȡ���̸�ѡ��
	var titList = document.querySelectorAll('.hm_shop_tit_left a');
	//��ȡ��Ʒ��
	var prodcList = document.querySelectorAll('.hm_product_left a'); 
	//��ȡ���и�ѡ��
	var productChk = document.querySelectorAll('.hm_check_box');
	
	/**
	 * ������̸�ѡ��ȫѡ
	 */
	for(var i=0;i<titList.length;i++){
		titList[i].index = i;
		titList[i].onclick = function(){
			//�������飬���ڴ��valueֵ
			var numArr = [];
			//�������飬���ڴ�ż۸�
			var priceNum = [];
			//��ȡ��Ʒ����input��
			var cots = shops[this.index].querySelectorAll('.cot');
			//��ȡ��ǰ���̵���Ʒ�۸�����
			var price = shops[this.index].querySelectorAll('.price');
			// ��ȡ��ǰ���̵���Ʒ������
			var shopProdct = shops[this.index].querySelectorAll('.hm_product_left a');
			for(var i=0;i<price.length;i++){
				//����ȡ�ļ۸���push��ӵ�numb����
				var iprice = parseInt(price[i].innerHTML);
				priceNum.push(iprice);
				//����ȡ��valueֵ��push��ӵ�numArr����
				var vcots = parseInt(cots[i].value);
				numArr.push(vcots);	
			}
			//������̿�ѡ�У����Ƴ���ʽ������ȫ������check_back
			if(this.classList.contains('check_back')){
				this.classList.remove('check_back');
				// �����ǰ��ѡ������������ܼۣ�����ҳ��
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
				//�ύ���������ʾ��Ʒ����
				document.querySelector('.piece_num').innerHTML = pitchOn;
				//����ҳ�棬�ϼƼ�Ǯ
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
	
	
	// ��Ʒ��ѡ
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
				//����
				if(document.querySelector('.piece_num').innerHTML>=0){
					pitchOn = pitchOn+1;
				}

				console.log(pitchOn);
				//�۸�
				total += sum;
				// console.log(account);
				document.querySelector('.piece_num').innerHTML = pitchOn;
				document.querySelector('.total_text').innerHTML = total;
				
				console.log(total);
			}
			//this.classList.toggle('check_back');
		}
	}
	//��ȡ�۸�
	var priceList = document.querySelectorAll('.price');
	var prinum = [];
	
	for(var i=0;i<priceList.length;i++){
		var iprice = parseInt(priceList[i].innerHTML);
		prinum.push(iprice);
	}
	
	//��ȡ����input��
	var cots = document.querySelectorAll('.cot');
	//�������飬���ڴ��valueֵ
	var numArr = [];
	for(var i=0;i<cots.length;i++){
		//����ȡ��valueֵ��push��ӵ�numArr����
		var vcots = parseInt(cots[i].value);
		numArr.push(vcots);	
	}
	// �ײ�ȫѡ�����¼�
	document.querySelector('#all').onclick = function(){
		//�ж�ȫѡ���Ƿ�ѡ��,�����ǰΪѡ��״̬����ȡ������֮���ѡ����ʽ
		if(this.classList.contains('check_back')){
			this.classList.remove('check_back');
			for(var i=0;i<productChk.length;i++){
				productChk[i].classList.remove('check_back');
			}
			// �����ǰ��ѡ������������ҳ��
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
	* ���ﳵ�Ӽ�����
	*/
	//����һ��count�����������valueֵ
	var count = null;
	//��ȡ���м��Ű�ť
	var subtracts = document.querySelectorAll('.reduce');
	//��ȡ���мӺŰ�ť
	var adplus = document.querySelectorAll('.add');
	
	//�������ʱ
	for(var i=0;i<subtracts.length;i++){
		//��ȡ���鵱ǰ������ֵ 
		subtracts[i].index = i;
		subtracts[i].onclick = function(){
			//��ȡ����input��
			var cots = document.querySelectorAll('.cot');
			//�������飬���ڴ��valueֵ
			var numArr = [];
			for(var i=0;i<cots.length;i++){
				//����ȡ��valueֵ��push��ӵ�numArr����
				var vcots = parseInt(cots[i].value);
				numArr.push(vcots);	
			}

			//������һ
			count = parseInt(numArr[this.index])-1;
			//�ж���Ʒ����
			if(count<=0){
				alert("�����ټ��ˣ�");
				return;
			}
			console.log(count);
			//��ʾ��ҳ��
			document.querySelectorAll('.cot')[this.index].value = count;
		} 
	}
	//����Ӻ�ʱ
	for(var i=0;i<adplus.length;i++){
		//��ȡ���鵱ǰ������ֵ 
		adplus[i].index = i;
		adplus[i].onclick = function(){
			//��ȡ����input��
			var cots = document.querySelectorAll('.cot');
			//�������飬���ڴ��valueֵ
			var numArr = [];
			for(var i=0;i<cots.length;i++){
				//����ȡ��valueֵ��push��ӵ�numArr����
				var vcots = parseInt(cots[i].value);
				numArr.push(vcots);	
			}
			//������һ
			count = parseInt(numArr[this.index])+1;
			//�ж���Ʒ����
			if(count>10){
				alert("���ţ����ټ��ˣ�");
				return;
			}
			//��ʾ��ҳ��
			document.querySelectorAll('.cot')[this.index].value = count;
		} 
	}
}
/* ɾ����ʾ */
function deleteBounce(){
	/*
	* 1.��ʾ������
	* 2.������
	* 3.ɾ��������Ҫ��
	* 4.���ȡ����ť  �ر�  ������
	* */
	
	
	/*��ȡ������*/
	var hmWin = document.querySelector('.hm_win');
	/*��ȡ��*/
	var hmWinBox = hmWin.querySelector('.hm_win_box');
	/*��ȡ���е�ɾ����ť*/
	var deleteList = document.querySelectorAll('.deleteBox');
	
	/*��¼��ǰ��������ĸ���ť*/
	var deleteBtn = null;
	
	for(var i = 0 ; i < deleteList.length ; i ++){
	    deleteList[i].onclick = function(){
	        /*1.��ʾ������*/
	        hmWin.style.display = "block";
	        /*2.������*/
	        hmWinBox.classList.add('bounceInDown');
	        /*ɾ��������Ҫ��*/
	        console.log(this);
	
	        deleteBtn = this;
	        var up = deleteBtn.querySelector('.up');
	        console.log(up);
	        /*�ӹ���*/
	        up.style.webkitTransition = "all 1s";
	        up.style.transition = "all 1s";
	        /*������תԭ��*/
	        up.style.webkitTransformOrigin = "0 5px";
	        up.style.transformOrigin = "0 5px";
	        /*�Ӹı�*/
	        up.style.webkitTransform = "rotate(-30deg) translateY(2px)";
	        up.style.transform = "rotate(-30deg) translateY(2px)";
	    }
	}
	
	/*4.���ȡ����ť  �ر�  ������*/
	hmWinBox.querySelector('.cancel').onclick = function(){
	    hmWin.style.display = "none";
	    hmWinBox.classList.remove('bounceInDown');
	
	    /*��ǰ�����*/
	    if(deleteBtn){
	        var up = deleteBtn.querySelector('.up');
	        up.style.webkitTransform = "none";
	        up.style.transform = "none";
	    }
	}
	/*4.���ȡ����ť  �ر�  ������*/
	hmWinBox.querySelector('.submit').onclick = function(){
	    hmWin.style.display = "none";
	    hmWinBox.classList.remove('bounceInDown');
	
	    /*��ǰ�����*/
	    if(deleteBtn){
	        var up = deleteBtn.querySelector('.up');
	        up.style.webkitTransform = "none";
	        up.style.transform = "none";
			
	    }
	}
}



