//检验用户名
function checkUserName() {
	$('#realname').parent().next().addClass('text-err');
	if (isNull($('#realname').val())) {
		$("#realname").parent().parent().find(".msg").text('真实姓名不能为空');
        return false;
    }    
	$('#realname').parent().next().removeClass('text-err');
	$("#realname").parent().parent().find(".msg").text('');
}

//检验身份证
function checkIdNo() {
	var idNo = $('#ID').val();
	$('#ID').parent().next().addClass('text-err');
    if (isNull(idNo)) {
        $('#ID').parent().parent().find(".msg").text('身份证号不能为空');
        return false;
    }
    if (!isID(idNo)) {
        $('#ID').parent().parent().find(".msg").text('身份证格式不合法');
        return false;
    }
    $('#ID').parent().next().removeClass('text-err');
    $('#ID').parent().parent().find(".msg").text('');    
    return true;
}

//检验手机号
function checkTel(){
	 var phone = $('#phone').val();
	 $('#phone').parent().next().addClass('text-err');
     if (isNull(phone)) {
         $('#phone').parent().parent().find(".msg").text('手机号不能为空');
//         phone_flag = false;
         return false;
     }else if (!isTel(phone)) {
         $('#phone').parent().parent().find(".msg").text('请输入正确的手机号');
//         phone_flag = false;
         return false;
     }else{
//    	 checkCode();
//    	 phone_flag = true;
    	 $('#phone').parent().next().removeClass('text-err');
         $('#phone').parent().parent().find(".msg").text('');
         return true;
     }
     
}

//检验银行卡
function checkBankCard(bankId) {
	var bankcard = $('#' + bankId).val();
//	$('#' + bankId).parent().next().addClass('text-err');
	$obj = $($('#' + bankId).parent().next().find('.msg')[0]);
	$obj.addClass('text-err');
	$('#' + bankId).parent().next().find('.bankinfo').text("");
    if (isNull(bankcard)) {
        $('#' + bankId).parent().parent().find(".msg").text('银行卡不能为空');
        $("#CVN2").val("");
		$('#CVN2').attr("readonly",true);
        return false;
    }else if(!isBankCard(bankcard)){
    	$('#' + bankId).parent().parent().find(".msg").text('请输入正确的银行卡号');
    	$("#CVN2").val("");
		$('#CVN2').attr("readonly",true);
    	return false;
    } else {
    	//TODO 判断是借记卡还是信用卡（调后台）
//    	$('#' + bankId).parent().next().removeClass('text-err');
    	$obj.removeClass('text-err');
    	getCardInfo(bankId);
    }
}

//获取银行卡信息
var send_flag = true;
function getCardInfo(bankId){
	if (send_flag) {
        cardno = $('#' + bankId).val();
        if(isNull(cardno)){
        	  $('#' + bankId).parent().parent().find(".msg").text('银行卡不能为空');
        	  return false;
        }
        send_flag = false;
        $.ajax({
            url: '/fes/p2p/getCardInfo',
            data: {
                cardno: cardno
            },
            type:'post',
            dataType:'json',
            async: false,
            success: function (data) {
            	//TODO 处理银行卡信息   是否为银行卡，是则查看是否有CVN2
                send_flag = true;
                if($("#bankcard").hasClass("onlydebit")){
                	if(data.cardtype != 1 ){
                		$obj = $($('#' + bankId).parent().next().find('.msg')[0]);
                		$obj.addClass('text-err');
                    	$('#' + bankId).parent().parent().find(".msg").text('请输入借记卡');
                    }else{
                    	$('#' + bankId).parent().parent().find(".msg").text('正确的借记卡号');
                    }
            	}
                
                $('#' + bankId).parent().parent().find(".bankinfo").text(data.msg);
                
                //TODO 如果银行卡正常，则判断是否有CVN2
                getCVN2($("#" + bankId).val());
            }
        });
    }
}

//判断该卡是否有CVN2   
function getCVN2(cardno/*, preCardnoId*/){
	$.ajax({
        url: "/fes/p2p/getCVN2",
        data:{cardno:cardno},
        type:'post',
        dataType:'json',
        async: false,
        success:function(data){
//        	$("#CVN2").val("");
        	if(data.flag){
        		//有CVN2
        		$('#CVN2').attr("readonly",false);
        	}else{
        		$("#CVN2").val("");
        		$('#CVN2').attr("readonly",true);
        	}
           
        	//$("#" + preCardnoId).val(cardno);
        }
    });
}

var countdown=5; 
function settime($obj) { 
	if (countdown == 0) { 
		$obj.removeAttr("disabled");    
		$obj.html("获取验证码"); 
		countdown = 5; 
	} else { 
		$obj.attr("disabled", true); 
		$obj.html("重新发送(" + countdown + "s)"); 
		countdown--; 
		setTimeout(function() { settime($obj); },1000) ;
	} 
} 

function checkCVN2(){
	//如果CVN2只读，则不校验
	$('#CVN2').parent().next().addClass('text-err');
	if(!$("#CVN2").attr("readonly")){
		var CVN2 = $("#CVN2").val();
		if(isNull(CVN2)){
			$('#CVN2').parent().parent().find(".msg").text('CVN2不能为空');
			return false;
		}
		else if( !/^([0-9]{3})$/i.test(CVN2))
		{
			$('#CVN2').parent().parent().find(".msg").text('请输入3位的CVN2');
			return false;
		}
		$('#CVN2').parent().next().removeClass('text-err');
		$('#CVN2').parent().parent().find(".msg").text('');
		return true;
	}
}

//检查验证码
function checkCode(){
	var checkcode = $("#checkcode").val();
	var phone = $("#phone").val();
	$('#checkcode').parent().parent().next().addClass('text-err');
	if(isNull(checkcode)){
		$('#checkcode').parent().parent().parent().find(".msg").text('验证码不能为空');
	}else{
		
		$.ajax({
	        url: "/fes/p2p/chkMobileAuth",
	        data:{phone:phone, checkcode: checkcode},
	        type:'post',
	        dataType:'json',
	        async: false,
	        success:function(data){
	        	if(data.code == 0){
	        		//验证码正确
	        		$('#checkcode').parent().parent().next().removeClass('text-err');
	        		$('#checkcode').parent().parent().parent().find(".msg").text('验证码正确');
	        	}else{
	        		$('#checkcode').parent().parent().next().addClass('text-err');
	        		$('#checkcode').parent().parent().parent().find(".msg").text('验证码错误');
	        	}
	        }
	    });
	}
	
}

$(function(){
	//页面的显示控制
	var trend = $("#trend").val();
	display(trend);
	
	//失去焦点
	$('#realname').blur(function () {
        checkUserName();
    });
    $('#ID').blur(function () {
        var idNo = $('#ID').val();
        checkIdNo(idNo);
    });
    
   /* phone_flag = false;
    if(isTel($('#phone').val())){
    	phone_flag = true;
    }else{
    	phone_flag = false;
    }*/
    $('#phone').blur(function () {
        var phone = $('#phone').val();
        checkTel(phone);
    });
    $('#bankcard').blur(function () {
    	checkBankCard(this.id);
    });
//    $('#creditCard').blur(function () {
//    	checkBankCard(this.id);
//    });
    $("#CVN2").blur(function(){
    	checkCVN2();
    });
    $("#checkcode").blur(function(){
    	checkCode();
    });
    
    //点击事件
    var tim1 = 0;
    $('#checkcodeBtn').click(function(){
    	phone_flag = checkTel();
		tim2 = Date.now();
		if(tim2-tim1 > countdown*1000 && phone_flag){
			tim1 = Date.now();
			$.ajax({
				url:"/fes/p2p/sendMsg",
				type:"POST",
				data:{phone:$("#phone").val()},
				async: false,
				success:function(data){
					//TODO  发送短信成功或是手机号已经验证过
					if(data.code == 0){
						//手机号已被验证过
						alert(data.msg);
						$('#checkcodeBtn').addClass('checkCode-telSubmit-disabled');
						$('#checkcodeBtn').removeClass('checkCode-telSubmit');
						$('#checkcode').parent().parent().next().removeClass('text-err');
		        		$('#checkcode').parent().parent().parent().find(".msg").text('');
						setTimeout(function(){
							$('#checkcodeBtn').removeClass('checkCode-telSubmit-disabled');
							$('#checkcodeBtn').addClass('checkCode-telSubmit');
							tim1 = Date.now();
						},5000);
					}else if(data.code == 1){
						//手机号发送成功
						alert(data.msg);
						settime($("#checkcodeBtn"));
					}
					
				}
			});
			
		}
	});
    $("#openAcctBtn").click(function(){
    	//验证姓名，身份证，手机号，CVN2，银行卡
    	checkUserName();
    	checkIdNo();
    	checkTel();
    	if($("#CVN2").parent().parent().css('display') != 'none'){
    		checkCVN2();
    	}
    	
    	if(!isNull($("#bankcard"))){
    		checkBankCard("bankcard");
    	}
    	
    	var canSubmit = true;
    	
    	$(".text-err").each(function () {
            if ($(this).html().length > 0) {
                canSubmit = false;
            }
        });

    	if(!canSubmit){
    		return false;
    	}

    	//开户
    	$.ajax({
			url:"/fes/p2p/openacct",
			type:"POST",
			data:$('form').serialize(),
			async: false,
			success:function(data){
				if(!isNull(data)){
					window.location.href= data;
				}
			}
		});
    	
    });
    
});


function display(trend){
	var debitCard = $("#debitCard").val();
	if(!isNull(debitCard)){
		$("#debitCard").parent().parent().css("display", "block");
	}
	if(trend == "D"){
		//刚开始时CVN2、信用卡、有效期为空
		$("#CVN2").parent().parent().css("display", "none");
//		$("#validDate").parent().parent().css("display", "none");
		
		$("#bankcard").attr("placeholder", "请输入借记卡");
		$("#bankcard").removeClass("notOnlydebit");
		$("#bankcard").addClass("onlydebit");
		
		//借记卡失去焦点时
		$("#bankcard").blur(function(){
			//卡的值
			var $bankcard = $("#bankcard").val();
			cardBlur($bankcard,"prebankcard");
		});
	}
	else if(trend == "A"){
		/*
		 * 有信用卡的账户验证
		 * 真实姓名，身份证号，借记卡(只读) 
		 * 手机号，信用卡 (可读写)
		 * 
		 * 证件、姓名（只读）、手机号、验证码（可写）、
		 * 借记卡号（文字，并提示手机号验证失败）、
		 * 银行卡输入框（显示信用卡号，并提示可换借记卡或换充信用卡）*/
		 
		$("#realname").attr("readonly", "readonly");	
		$("#ID").attr("readonly", "readonly");	
		$("#bankcard").attr("placeholder", "可换借记卡或换充信用卡");	//提示可换借记卡或换充信用卡
		$("#bankcard").removeClass("onlydebit");
		$("#bankcard").addClass("notOnlydebit");
		
		//cvn2不显示
		$("#CVN2").parent().parent().css("display", "none");

	}else if(trend == "B"){
		
		/* * 有借记卡的账户验证 AND 错误原因是手机号错误
		 * TODO 返回B      
		 * 真实姓名，身份证号(只读) 
		 * 手机号,借记卡, 信用卡 (可读写)*/
		 
		 
		//真实姓名，身份证号(只读) 
		$("#realname").attr("readonly", "readonly");	
		$("#ID").attr("readonly", "readonly");	
		
		//手机号,借记卡, 信用卡 (可读写)
		$("#bankcard").attr("placeholder", "可换借记卡或换充信用卡");	//提示可换借记卡或换充信用卡
		$("#bankcard").removeClass("onlydebit");
		$("#bankcard").addClass("notOnlydebit");
		
		//cvn2不显示
		$("#CVN2").parent().parent().css("display", "none");
		
		$("#bankcard").blur(function(){
			//上次提交时的借记卡号
			var bankcard = $("#bankcard").val();
			var prebankcard = $("#prebankcard").val();
			if(bankcard != prebankcard){
				cardBlur(bankcard, "prebankcard");
				//如果用户修改借记卡号，则隐藏信用卡输入框，并清理信用卡号值
				$("#creditCard").val("");
				$("#validDate").val("");
				$("#creditCard").parent().parent().css("display", "none");	 
				$("#validDate").parent().parent().css("display", "none");	 
			}
		});

	}else if(trend == "C"){
		
		/* * 借记卡的账务验证失败
		 * TODO 返回C      
		 * 真实姓名，身份证号，手机号，借记卡 (可读写)*/
		 
		//真实姓名，身份证号，手机号，借记卡 (可读写)
		$("#realname").removeAttr("readonly");
		$("#ID").removeAttr("readonly");
		$("#bankcard").attr("placeholder", "请输入借记卡");	//提示
		$("#bankcard").removeClass("onlydebit");
		$("#bankcard").addClass("notOnlydebit");

		
		$("#CVN2").parent().parent().css("display", "none");
		
	}
}

/*$(function(){
			//页面的显示控制
			var trend = $("#trend").val();
			
			
			//手机验证码的显示控制：手机号失去焦点时对验证码显示的处理
			$("#phone").blur(function(){
				var phone = $("#phone").val();
				var lastPhone = $("#lastPhone").val();
				var prePhone = $("#prePhone").val();
				if(isNull(phone) || lastPhone == phone){
					if(isNull(phone)){
						$("#phone").parent().parent().find(".msg").text = "手机号不能为空";
					}
					$("#checkCode").parent().parent().parent().css("display","none");
					$("#checkCode").val("");
					$("#checkCodeValid").val("");
				}else if(lastPhone != phone && prePhone != phone){
					$("#checkCode").parent().parent().parent().css("display","block");
					//短信的验证码输入成功时  prePhone != phone
				} 
			});
			
			//验证码输入框失去焦点时
			$("#checkCode").blur(function(){
				var phone = $("#phone").val();
				var checkCode = $("#checkCode").val();
				var checkCodeValid = $("#checkCodeValid").val();
				if(isNull(checkCode)){
					alert("手机验证码不能为空");
				}else if(checkCodeValid != checkCode){
					alert("手机验证码输入错误");
				}else {
					alert("手机验证码正确");
				}
			});
			
			$("#checkcodeBtn").click(function(){
				//TODO 点击获取验证码时，必须手机号和图形验证码已输入且图形验证码必须正确
				var phone = $("#phone").val();
				sendMsgAjax(phone);
			});
		
			if(trend == "D"){
				//刚开始时CVN2、信用卡、有效期为空
				$("#CVN2").parent().parent().css("display", "none");
				$("#creditCard").parent().parent().css("display", "none");
				$("#validDate").parent().parent().css("display", "none");
				
				//借记卡失去焦点时
				$("#bankcard").blur(function(){
					//卡的值
					var $bankcard = $("#bankcard").val();
					cardBlur($bankcard,"prebankcard");
				});
			}
			else if(trend == "A"){
				
				 * 有信用卡的账户验证
				 * 真实姓名，身份证号，借记卡(只读) 
				 * 手机号，信用卡 (可读写)
				 
				$("#realname").attr("readonly", "readonly");	
				$("#ID").attr("readonly", "readonly");	
				$("#bankcard").attr("readonly", "readonly");	
				
				$("#bankcard").blur(function(){
					return false;
				});
				
				//cvn2不显示
				$("#CVN2").parent().parent().css("display", "none");
				
				$("#creditCard").blur(function(){
					//信用卡的值
					var $creditCard = $("#creditCard").val();
					cardBlur($creditCard, "preCreditCard");
					validDateBlur($creditCard, "preCreditCard");
				});
				
				$("#validDate").blur(function(){
					//信用卡的值
					var $creditCard = $("#creditCard").val();
					validDateBlur($creditCard, "preCreditCard");
					
				});
			}else if(trend == "B"){
				
				 * 有借记卡的账户验证 AND 错误原因是手机号错误
				 * TODO 返回B      
				 * 真实姓名，身份证号(只读) 
				 * 手机号,借记卡, 信用卡 (可读写)
				 
				 
				//真实姓名，身份证号(只读) 
				$("#realname").attr("readonly", "readonly");	
				$("#ID").attr("readonly", "readonly");	
				
				//手机号,借记卡, 信用卡 (可读写)
				$("#phone").removeAttr("readonly");
				$("#bankcard").removeAttr("readonly");
				$("#creditCard").parent().parent().css("display", "block");	 
				
				//cvn2不显示
				$("#CVN2").parent().parent().css("display", "none");
				
				//上次提交时的借记卡号保存起来
				$("#prebankcard").val($("#bankcard").val());
				
				$("#bankcard").blur(function(){
					//上次提交时的借记卡号
					var bankcard = $("#bankcard").val();
					var prebankcard = $("#prebankcard").val();
					if(bankcard != prebankcard){
						cardBlur(bankcard, "prebankcard");
						//如果用户修改借记卡号，则隐藏信用卡输入框，并清理信用卡号值
						$("#creditCard").val("");
						$("#validDate").val("");
						$("#creditCard").parent().parent().css("display", "none");	 
						$("#validDate").parent().parent().css("display", "none");	 
					}
				});
				
				$("#creditCard").blur(function(){
					//信用卡号
					var creditCard = $("#creditCard").val();
					cardBlur(creditCard, "preCreditCard");
					validDateBlur(creditCard, "preCreditCard");
				});
				
				$("#validDate").blur(function(){
					//信用卡号
					var creitCard = $("#creditCard").val();
					validDateBlur(creitCard, "preCreditCard");
				});
			}else if(trend == "C"){
				
				 * 借记卡的账务验证失败
				 * TODO 返回C      
				 * 真实姓名，身份证号，手机号，借记卡 (可读写)
				 
				//真实姓名，身份证号，手机号，借记卡 (可读写)
				$("#realname").removeAttr("readonly");
				$("#ID").removeAttr("readonly");
				$("#phone").removeAttr("readonly");
				$("#bankcard").removeAttr("readonly");
				
				//信用卡、CVN2不显示
				$("#creditCard").parent().parent().css("display", "none");	
				$("#validDate").parent().parent().css("display", "none");	
				$("#CVN2").parent().parent().css("display", "none");
				//借记卡失去焦点时
				$("#bankcard").blur(function(){
					//卡的值
					var $bankcard = $("#bankcard").val();
					cardBlur($bankcard, "prebankcard");
				});
			}
		});*/
		
		
		function agree(obj){
			$('#' + obj).css('display', 'none');
			$('#agreementView').css('display', 'block');
		}
		 
		
		//开户
		function openAcct(){
			
	        var realname = $("#realname").val();
	        var ID = $("#ID").val();
	        var phone = $("phone").val();
	        var prePhone = $("#prePhone").val();
	        var bankcard = $("#bankcard").val();
	        var creditCard = $("#creditCard").val();
	        var isChecked = document.getElementById("agreement").checked;
	
	       /*  if(isNull(realname)){
	            //用户名为空
	            alert('请输入真实姓名');
	            return;
	        }
	
	        if(isNull(ID)){
	            //身份证号为空
	            alert('请输入身份证号');
	            return;
	        }else if(!isID(ID)){
	        	//身份证号不合法
	            alert('请输入正确的身份证号');
	            return;
	        }
	        
	        if(isNull(phone)){
	        	//手机号不能为空
	        	alert("手机号不能为空");
	        	return ;
	        }if(!isTel(phone)){
	        	//手机号不合法
	        	alert("手机号不合法");
	        	return;
	        }else if(phone != prePhone){
	        	alert("手机号与发送验证码的手机号不一致");
	        	return;
	        }
	        
	        
	        if(!isBankCard(bankcard) && !isBankCard(creditCard)){
	        	alert("银行卡不合法");
	        	return;
	        } */
	        
	        
		    if($("#bankcard").attr("readonly") != "readonly"){
		    	//借记卡可读写
		    	var $bankcard = $("#bankcard").val();
		    	cardBlur($bankcard, "prebankcard");
		    }else{
		    	//借记卡只读时(也代表信用卡可读写)
		    	var $creditCard = $("#creditCard").val();
		    	cardBlur($creditCard, "precreditCard");
		    }
			
	        document.forms[0].action = "/fes/p2p/openacct";
	        document.forms[0].submit();
	    }
		
		function cardBlur(cardno,preCardnoId){
			//前一次卡的值
			var $preCardno = $("#" + preCardnoId).val();
			var $CVN2 = $("#CVN2").val();
			if(isNull(cardno)){
				$("#CVN2").parent().parent().css("display", "none");
			}else if($("#CVN2").parent().parent().css("display") == "none" || $preCardno != cardno){
				//判断该借记卡是否有CVN2
				getCVN2(cardno, preCardnoId);
			}
		}
		
		function validDateBlur(cardno, preCardnoId){
			//前一次卡的值
			var $preCardno = $("#" + preCardnoId).val();
			var $validDate = $("#validDate").val();
			var $preValidDate = $("#preValidDate").val();
			if(!isNull($validDate) && !isNull(cardno) && ($preCardno != cardno || $preValidDate != $validDate)){
				//判断该信用卡的有效期是否正确
				postValideDateAjax(cardno, $validDate);
			} 
		}

		//发送短信
		function sendMsgAjax(phone){
			$.ajax({
	            url: "/fes/p2p/sendMsg",
	            data:{phone:phone},
	            type:'post',
	            dataType:'json',
	            async: false,
	            success:function(data){
	            	if(data.code == 0){
	            		//发送成功
	            		$("#checkCodeValid").val(data.msg);
	            		$("#prePhone").val(phone);
	            	}
	               
	            },failure: function () {  
	                //TODO 请求ajax失败
	                alert("请求ajax失败");
	            }  
	        });
		}
		
		/*
		 *	验证码比较
		 *	如果验证码为空，返回；
		 *	如果验证码不为空，但校验的验证码为空，提醒先获取验证码
		 *	如果验证码不为空，且校验的验证码不为空，比较验证是否正确
		 */
		function compareCheckCode(){
			var checkCode = $("#checkCode").val();
			var checkCodeValid = $("#checkCodeValid").val();
			if(isNull(checkCode)){
				return;  //不处理
			}else {
				if(isNull(checkCodeValid)){
					return "请先获取验证码";
				}else if(checkCode != checkCodeValid){
					return "验证码错误";
				}else{
					return "验证码正确";
				}
			}
			
		}
		
		function postValideDateAjax(cardno, validDate){
			//判断该卡是否有CVN2
			$.ajax({
	            url: "/fes/p2p/getValidDate",
	            data:{cardno:cardno , validDate: validDate},
	            type:'get',
	            dataType:'json',
	            async: false,
	            success:function(data){
	            	if(data.flag){
	            		//TODO 有效期正确
	            	}else{
	            		//TODO 有效期错误
	            	}
	               
	            	$("#preValidDate").val(validDate);
	            },failure: function () {  
	                //TODO 请求ajax失败
	                alert("请求ajax失败");
	            }  
	        });
		}
		