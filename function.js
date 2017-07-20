;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);

	$doc.ready(function() {
		var visibleItemsPerBP = {
			'desktop' : 5,
			'tablet'  : 2,
			'mobile'  : 1
		};

		var winW    			= $win.width();
		var currentBreakpoint	= winW > 1024 ? 'desktop' : winW > 767 ? 'tablet' : 'mobile';
		var visibleItemsPerRow	= visibleItemsPerBP[currentBreakpoint];

		$win.on('resize', function(){
			winW    			= $win.width();
			currentBreakpoint	= winW > 1024 ? 'desktop' : winW > 767 ? 'tablet' : 'mobile';
			visibleItemsPerRow	= visibleItemsPerBP[currentBreakpoint];
		});

		var activeTabClass 		= 'current';
		var activeRowIndex 		= 0;
		var isOpen 				= false;
		var animationDuration 	= 150;

		$('.tabs-nav a').on('click', function(event) {
			event.preventDefault();
			var $tabLink 		= $(this);
			var $targetTab 		= $($tabLink.attr('href'));
			var $contentHolder 	= $('.tabs-body');

			$tabLink
				.parent() // go up to the <li> element
				.add($targetTab)
				.addClass(activeTabClass)
					.siblings()
					.removeClass(activeTabClass);

			var thisIndex 				= $tabLink.data('index') - 1;
			var totalElements 			= $('.tabs-nav > ul > li  > a').length;
			var rowIndexLast 			= Math.ceil((totalElements) / visibleItemsPerRow);
			var rowIndex 				= Math.floor((thisIndex) / visibleItemsPerRow) + 1;
			var insertAfterThisIndex 	= rowIndex * visibleItemsPerRow;
			var insertAfterThis 		= $('.tabs-nav li').eq(insertAfterThisIndex - 1);

			//open for first time
			if ( !isOpen ) {
				if ( rowIndex == rowIndexLast && activeRowIndex != rowIndex ) {
					$contentHolder.insertAfter($('.tabs-nav > ul > li').eq(totalElements - 1))
				} else  {
					$contentHolder.insertAfter(insertAfterThis);
				}

				$contentHolder.slideDown(animationDuration);

				isOpen = true;
			} else {
				if ( isOpen && activeRowIndex != rowIndex ) {
					//close tabs body
					$contentHolder.slideUp(animationDuration);

					//move tabs body after current item
					setTimeout(function() {
						if ( rowIndex == rowIndexLast ) {
							$contentHolder.insertAfter($('.tabs-nav > ul > li').eq(totalElements - 1))
						} else  {
							$contentHolder.insertAfter(insertAfterThis);
						}
					}, animationDuration);

					//show current tabs body
					setTimeout(function() {
						$contentHolder.slideDown(animationDuration);
					}, animationDuration * 2);
				}
			}

			activeRowIndex = rowIndex;
		});
	});
})(jQuery, window, document);