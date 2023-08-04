$(function(){
	'use_strict';
	var winH = $(window).height(),
		upperH = $('.upper-bar').innerHeight(),
		navH = $('.navbar').innerHeight();
	$('.slider, .carousel-item').height(winH - (upperH + navH ));


	//shuffle featuerd
	$('.featuerd ul li').on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
		if($(this).data('class')==='all'){
			$('.imag col-md').css('opacity',1);

		}else{
			$('.imag col-md').css('opacity','.08');
			$($(this).data('class')).parent().css('opacity',1);
		}
	});
});

