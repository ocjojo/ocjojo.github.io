(function(){
	var body = document.querySelector('body'),
		header = document.querySelector('header'),
		menuEntries = [];

	var fixHeader = function() {
		if(body.scrollTop > 0) header.classList.add('fixed');
		else header.classList.remove('fixed');
	};

	var menuActive = function(el) {
		var active = document.querySelector('menu .active');
		if(el === false) {
			if(active)
				active.classList.remove('active');
			return;
		} else if( active && !el.matches('.active')) {
			active.classList.remove('active');
		}
		el.classList.add('active');
	};

	var menuListener = function() {
		var active;
		for(var i in menuEntries){
			if($(menuEntries[i].el).offset().top - 120 <= body.scrollTop) {
				active = menuEntries[i];
				break;
			}
		}
		if(active) menuActive(active.menu);
		else menuActive(false);
	};

	
	$(window).scroll(function(){
		fixHeader();
		menuListener();
	});

	menuEntries = $('menu a')
	.click(function(e) {
		e.preventDefault();
		history.pushState(null, null, e.target.href);
		$(body).animate({
			scrollTop: $(window.location.hash).offset().top - 100
		}, 300);
	})
	.toArray()
	//create menu Entries for hashListener
	.map(function(item) {
		return {
			menu: item,
			el: $(item.href.substring(item.href.indexOf('#')))
		};
	})
	//sort in reverse after offsetTop for hashListener
	.sort(function(a, b){
		return $(b.el).offset().top - $(a.el).offset().top;
	});

})();