$(document).ready(function(){

	console.log('reaching js');

	findGifs('happy');



	// createCORSRequest('GET', 'https://api.instagram.com/oembed?url=http://instagr.am/p/fA9uwTtkSN/');

	// $('#myCarousel').carousel({
	//   interval: 10000
	// });

	// $('.carousel .item').each(function(){
	//   var next = $(this).next();
	//   if (!next.length) {
	//     next = $(this).siblings(':first');
	//     nextWidth = next.css('width');
	//   }
	//   // next.children(':first-child').clone().appendTo($(this));

	//   if (next.next().length>0) {
	 
	//       // next.next().children(':first-child').clone().appendTo($(this)).addClass('rightest');
	      
	//   }
	//   else {
	//       // $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
	     
	//   }
	// });

	instaCarousel();

	
    $(window).on('scroll', function(){

		if (isScrolledIntoView('.phone-block')) {
    		$('#phone-image').addClass('phone-image-levitate');
        }

        // setTimeout(function(){ $('.key-point').addClass('fadeUp'); }, 0);

        if (isScrolledIntoView('.key-points-block')) {
    		// $('.key-point').addClass('fadeUp');
    		setTimeout(function(){ $('#key-point-1').addClass('fadeUp'); }, 0);
    		setTimeout(function(){ $('#key-point-2').addClass('fadeUp'); }, 500);
    		setTimeout(function(){ $('#key-point-3').addClass('fadeUp'); }, 1000);
        }

    });



});

function instaCarousel(){
	var innerCarouselWidth = $('.carousel-inner').css('width');
	var winWidth = window.innerWidth;
	var widthAvailable = innerCarouselWidth - winWidth;

	$('.right').on('mousedown', move('right'));

	function move(direction) {
		if (direction == 'right' && widthAvailable > winWidth) {
			$('.carousel-inner').css('margin-left', (winWidth * -1));
		}

		if (direction == 'left' && !(widthAvailable == innerCarouselWidth - winWidth)) {
			$('.carousel-inner').css('margin-left', (winWidth * -1));
		}
	}
 
}

function findGifs(gifType){
	var request = $.get("http://api.giphy.com/v1/gifs/search?q="+ gifType + "&api_key=dc6zaTOxFJmzC");
	request.done(function(data){
		// console.log(data.data.length);
		for (var i = 0; i < data.data.length; i++) {
			console.log(data.data[i]);
			var item = '<div class="item"><div class="col-lg-12"><img src="https://media.giphy.com/media/' + data.data[i].id + '/giphy.gif" class="img-responsive"></div></div>';
			$('.carousel-inner').append(item);
		}
	});
}

function isScrolledIntoView(element) {
    var element = $(element);
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elementTop = parseInt(element.offset().top - 30, 10);
    var elementBottom = parseInt((elementTop + element.height()), 10);
    return ((elementTop <= docViewBottom) && (elementBottom >= docViewTop));
}

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  console.log(xhr);
  return xhr;

}

var xhr = createCORSRequest('GET', 'https://api.instagram.com/oembed?url=http://instagr.am/p/fA9uwTtkSN/');
if (!xhr) {
  throw new Error('CORS not supported');
}