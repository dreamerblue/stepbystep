// Powered by: http://blog.csdn.net/xiebaochun/article/details/38676457

$(function() {
	$(function () {
		$(window).scroll(function() {
			if ($(window).scrollTop()>320) {
				$("#back-to-top").fadeIn(250);
			}
			else {
				$("#back-to-top").fadeOut(250);
			}
		});
		$("#back-to-top").click(function() {
			$('body,html').animate({scrollTop:0},1000);
			return false;
		});
	});
});
