$('.sidebar .image').on('mouseover touchstart', function(){
	$('.sidebar .image img').attr('src', 'img/main/liledix.jpg');
	});
$('.sidebar .image').on('mouseout touchend', function(){
	$('.sidebar .image img').attr('src', 'img/main/liledix4.jpg');
	});


$('#show-bg').click(function(){
	var value = confirm('To return, just click on wallpaper!');
	if (value == true) {
		$('body').addClass('show-bg-animation');
		setTimeout(function(){
			$('body').addClass('show-bg').removeClass('show-bg-animation').attr('title', 'Click here to return content (and finish watching of wallpaper)');
			}, 500);
		}
	});
$('body').mousedown(function(){
	if ($(this).hasClass('show-bg')) {
		$(this).removeClass('show-bg').removeAttr('title').addClass('animation');
		setTimeout(function(){
			$('body').removeClass('animation');
			}, 500);
		}
	});