(function($) {

	var methods = {
		init: function(options) {
			var options = $.extend({
				showTime: 4000,      
				slideAnimate: 2000,
				slideAnimTime: 1500,
				desSlideTime: 500
			}, options); 

			var el = this, 
			resize = 100,
			lengthSlides = $(el).find('.slider-item').length, 
			widthSlides = lengthSlides * resize + '%', 
			currentSlide = 1;

			var activeSlide = function() {
				for (var a = 1; a <= $(el).find('.slider-item').length; a++){
					$(el).find('.items').append("<li class='item'></li>");
				}
			};

			var manualSlide = function() {
				var index = $(el).find('.item').index(this);
				console.log(index);
				$(el).find('.sliderItemWrapper').animate({
					'left': -index * resize + '%'
				}, options.slideAnimate);
				currentSlide = index + 1;
				slideAnim();
			};

			activeSlide();

			var nextSlide = function() {
				if ( currentSlide == lengthSlides ) 
					currentSlide = 0;
				$(el).find('.sliderItemWrapper').animate({
					'left': -currentSlide * resize + '%'
				}, options.slideAnimate);
				currentSlide++;
				slideAnim();
			};

			var prevSlide = function() {
				currentSlide--;
				if ( currentSlide == 0 )
					currentSlide = lengthSlides;
				$(el).find('.sliderItemWrapper').animate({
					'left': -(currentSlide -1) * resize + '%'
				}, options.slideAnimate);
				slideAnim();
			};

			$(el).find('.sliderItemWrapper').width(widthSlides);
			var inter = setInterval(nextSlide, options.showTime); 
			$(el).hover(function() {
				clearInterval(inter); 
			}, function() {
				inter = setInterval(nextSlide, options.showTime);
			});
			$(el).find('.slider_left').click(prevSlide);
			$(el).find('.slider_right').click(nextSlide);
			$(el).find('.item').click(manualSlide);
			$(el).find('.item:nth-child(1)').addClass('active-item');

			var slideAnim = function() {
				$(el).find('.item').removeClass('active-item', options.slideAnimTime, "easeOutSine");
				$(el).find('.item:nth-child('+currentSlide+')').addClass('active-item', options.slideAnimTime, "easeOutSine");
			};
		}
	};

	$.fn.slide = function(method, options) {
		return this.each(function() {
			if ( methods[method] ) { 
				return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
			} else if ( typeof method === 'object' || ! method ) {
				return methods.init.apply( this, arguments );
			} else {
				$.error( 'Method ' +  method + ' does not exist on jQuery.slide' );
			}    
		});
	};
})(jQuery);