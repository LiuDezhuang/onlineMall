
function isNull(str){
	if(str == "" || str == null || str == undefined){
		return true;
	}
	return false;
}


//生成随机6位数
function generateMixed() {
	var chars = ['0','1','2','3','4','5','6','7','8','9',
		'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
		'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
	];
	var res = "";
	for(var i = 0; i < 6 ; i ++) {
		var id = Math.ceil(Math.random()*61);
		res += chars[id];
	}
	return res;
}

//手机号格式校验
function isTel(tel)
{
	if( /^(1[0-9]{10})$/i.test(tel))
	{
		return true;
	}
	return false;
} 

//邮箱校验
function isEmail(email){
	if(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/i.test(email)
			||/^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/i.test(email))
	{
		return true;
	}

	return false;
}

//身份证格式校验: 0 --ID格式错误， 1--ID格式正确， -1 -- ID为空
function isID(identityCode)
{
	var flag ;
	if(isNull(identityCode)){
		flag = -1;
	}
	var _id = identityCode+"";

	if(_id.length==15){
		flag=validate15(_id);
	}else if(_id.length==18){
		flag=validate18(_id);
	}else{
		flag=0;
	}
	
	if(flag == 0){
		return false;
	}else{
		return true;
	}
}

//校验15位的身份证
function validate15(id){
	var _id=id+"";
	for(var i=0;i<_id.length;i++){
		if(_id.charAt(i)<'0'||_id.charAt(i)>'9'){
			return 0;
		}
	}
	
	var year=_id.substr(6,2);
	var month=_id.substr(8,2);
	var day=_id.substr(10,2);
	
	if(year<'00'||year>'99') return 0;
	if(month<'01'||month>'12') return 0;
	if(day<'01'||day>'31') return 0;
	return 1;
}

//校验18位的身份证
function validate18(id){
	var powers=["7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2"];
	var parityBit=["1","0","X","9","8","7","6","5","4","3","2"];
	var _id=id+"";
	var _num=_id.substr(0,17);
	var _parityBit=_id.substr(17);
	//alert(_parityBit);
	var _power=0;
	var i=0;
	for(i=0;i<_id.length-1;i++){
		if(i==id.length-1){
			if(_id.charAt(i)<'0'||_id.charAt(i)>'9')
				return 0;
		}else{
			if(_id.charAt(i)<'0'||_id.charAt(i)>'9'){
				return 0;
			}else{
				_power=_power+parseInt(_num.charAt(i))*parseInt(powers[i]);
			}
		}
		
	}
	var mod=parseInt(_power)%11;
	//alert(mod);
	if(mod!=2){
		if(parityBit[mod]==_parityBit){
			return 1;
		}else{
			return 0;
		}
	}else{
		if(_parityBit=="x"||_parityBit=="X"){
			return 1;
		}else{
			return 0;
		}
	}
	
	var year=_id.substr(8,2);
	var month=_id.substr(10,2);
	var day=_id.substr(12,2);
	//校验年份位
	if(year<'00'||year >'99')return 0;
	//校验月份	
	if(month<'01'||month >'12')return 0;
	//校验日
	if(day<'01'||day >'31')return 0;
}

//银行卡校验  2:银行卡为空     1：银行卡合法   0：银行卡格式错误
function isBankCard(bkCode){
	if(bkCode==null||bkCode==""){
		return 2;
	}
	
	var len=bkCode.length;
	var bkCodeNum=parseInt(bkCode);
	var i=0;
	var odd_sum=0;
	var even_sum=0;
	var sum=0;
	for(i=0;i<len;i++){
		var num=parseInt(bkCode.charAt(len-1-i));
		if(i%2==0){
			odd_sum=odd_sum+num;
		}else{
			num=num*2;
			if(num>=10){
				num=num-9;
			}
			even_sum=even_sum+num;
		}
		sum=odd_sum+even_sum;
	}
	if(sum%10==0){
//		return 1;
		return true;
	}else{
//		return 0;
		return false;
	}
}

//姓名校验
function isName(name){
	return /((^[\u4E00-\u9FA5]{2,5}$)|(^[a-zA-Z]+[\s\.]?([a-zA-Z]+[\s\.]?){0,4}[a-zA-Z]$))/.test(name.trim());
}

//是否同意协议
function isAgree(obj , btn_Id , nextStepBtn){
	var isChecked = obj.checked;
	if(isChecked){
		$("#" + btn_Id).removeAttr("disabled");
		$("#" + btn_Id).css("opacity", 1);
	}else{
		$("#" + btn_Id).attr("disabled", "disabled") ;
		$("#" + btn_Id).css("opacity", 0.6);
	}

	if(!isNull(nextStepBtn)){
		if(isChecked){
			$("#" + nextStepBtn).removeAttr("disabled");
			$("#" + nextStepBtn).css("opacity", 1);
		}else{
			$("#" + nextStepBtn).attr("disabled", "disabled") ;
			$("#" + nextStepBtn).css("opacity", 0.6);
		}
	}
}

//判断是否是微信浏览器
function isMicroMessenger(){
	var result = false;
	var userAgent = navigator.userAgent;
	if(userAgent.indexOf('MicroMessenger') > -1){
		result = true;
	}
	return result;
}

/*-------<生成toast>----------*/
function  toast(msg,opt,left,top){
	if(opt){
		var obj = $("#"+opt);
	}
	new Toast({context:$('body'),message:msg},obj,left,top).show();
}
var Toast = function(config,obj,left,top){
	this.context = config.context==null?$('body'):config.context;//上下文
	this.message = config.message;//显示内容
	this.time = config.time==null?3000:config.time;//持续时间
	this.left = config.left;//距容器左边的距离
	this.top = (screen.availHeight/4)*3;//距容器上方的距离
	if(obj){
		this.left = obj.offset().left + left;
		this.top = obj.offset().top + top;
	}
	this.init();
};
var msgEntity;
Toast.prototype = {
	//初始化显示的位置内容等
	init : function(){
		$("#toastMessage").remove();
		//设置消息体
		var msgDIV = [];
		msgDIV.push('<div id="toastMessage">');
		msgDIV.push('<span>'+this.message+'</span>');
		msgDIV.push('</div>');
		msgEntity = $(msgDIV.join('')).appendTo(this.context);
		//设置消息样式
		var left = this.left == null ? this.context.width()/2 - msgEntity.find('span').width()/2 : this.left;
		var top = this.top == null ? '20px' : this.top;
		msgEntity.css({position:'absolute',top:top,'z-index':'99',left:left,'background-color':'black',color:'white','font-size':'12px',padding:'5px',margin:'5px','border-radius':'4px','-moz-border-radius':'4px','-webkit-border-radius':'4px',opacity:'0.5','font-family':'微软雅黑'});
		//msgEntity.addClass(".toast");
		msgEntity.hide();
	},
	//显示动画
	show :function(){
		msgEntity.fadeIn(this.time/2);
		msgEntity.fadeOut(this.time/2);
	}

};

function openAcct(){
	alert("testsksdlfkfsld;fl;");
}
/*-------</生成toast>----------*/
