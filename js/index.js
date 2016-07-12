require("../less/index.less");
var $ = require('zepto');
var tpl = require("./template/index.html");
/*万事开头难*/
$('body').append(tpl);
window.onload = function(){
	$('.figure-sub-btn').tap(function(event){
			var self = this;
			if (!(self.disabled)){
				self.disabled = 'disabled';
				$(self).css('opacity',0.5);
				if ($(self).attr('data-btn') == 'sub'){
				 	var tempSrc = $('.temp-img').find('img').eq(1).attr('src');
					var checkphone = checkPhone(self);
						if(checkphone === false){
							return;
						}
				// console.log(tempSrc);
					// $.ajax({
					// 	type : '',
					// 	url : '',
					// 	data : {},
					// 	success: function(){
						setTimeout(function(){
							$('.figure-text').hide();	
							 $('#replace-bg').attr('src',tempSrc);
							 $(self).attr('data-btn','get').parent().css('bottom','10%');
							 $(self).text('立即领取');
							 $(self).removeAttr('disabled');
							 $(self).css('opacity',1);	

						},500)
							 
					// 	},
					// 	error : function(){
					// 	 	$(self).removeAttr('disabled');

					// 	}
					// })
				}

				if ($(self).attr('data-btn') == 'get'){
					var temp_Src = $('.temp-img').find('img').eq(2).attr('src');
					// $.ajax({
					// 	type : '',
					// 	url : '',
					// 	data : {},
					// 	success: function(){
							setTimeout(function(){
								$('#replace-bg').attr('src',temp_Src);
								$(self).attr('data-btn','sure');
								$(self).text('确认');
								$(self).removeAttr('disabled');
								$(self).css('opacity',1);
								$('.success-infor').animate({
									opacity : 1,
									rotateZ : '360deg'
								},500,'ease-out')	
							},5000) 	
					// 	},
					// 	error : function(){
					// 	 	$(self).removeAttr('disabled');	
					// 	}
					// })

				}
				if ($(self).attr('data-btn') == 'sure'){
						$('.figure-bg-screen').hide();
						$(self).css('opacity',1);
					    $(self).removeAttr('disabled');
				}
			}

	});
	
	$('.get-Codes').tap(function(){

		var self = this;
		var checkphone = checkPhone(self);
			if(checkphone === false){
				return;
			}
			// checkPhone(self).call(this);
			// $.ajax({
			// 	type : '',
			// 	url : '',
			// 	data : {},
			// 	success: function(){

			  if(!(self.disabled)){
			  	 var num = 60;
			  	 var Time = setInterval(function(){
			  	 			num --;
			  	 			$(self).find('span').text(num);
			  				if(num <= 0){
			  					clearInterval(Time);
			  					$(self).removeAttr('disabled');
			  					$(self).find('span').text('获取验证码');
			  				}
			  			},1000);	
			  }
			// 	},
			// 	error : function(){
			// 	 	$(self).removeAttr('disabled');	
			// 	}
			// })
				self.disabled = 'disabled';



	});

	var checkPhone = function (self){
		var phone = $('.figure-phone').find('input').val();
		var reg = /^1[3|4|5|7|8]\d{9}$/;
			if (!(reg.test(phone))){
				$('.erro-infor').text('电话号码有误，重新输入');
				setTimeout(function(){
					$('.erro-infor').text('');
					$(self).removeAttr('disabled');	
					$(self).css('opacity',1);

				},2000)
				return false;
			}
	};

	$('.figure-close').tap(function(){
		$('.figure-bg-screen').hide();
	    $('.figure-sub-btn').removeAttr('disabled');
	    $('.figure-sub-btn').css('opacity',1);

	});

	$('.figure-sure').tap(function(){
		var subSrc = $('.temp-img').find('img').eq(0).attr('src');
		$('.figure-bg-screen').show();
		$('.figure-text').show();
		$('.success-infor').css({'opacity':0,'transform':'rotateZ(0deg)'});	
		$('.figure-sub-btn').attr('data-btn','sub').parent().css('bottom','16%');
		$('.figure-sub-btn').text('提交');
		$('#replace-bg').attr('src',subSrc);
	});
	
}
