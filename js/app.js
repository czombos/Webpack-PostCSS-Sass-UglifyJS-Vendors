import $ from 'jquery';

import(/* webpackChunkName: "fontawesome-free" */ '@fortawesome/fontawesome-free');
import(/* webpackChunkName: "free-solid-svg-icons" */ '@fortawesome/fontawesome-free/js/solid');
import(/* webpackChunkName: "free-regular-svg-icons" */ '@fortawesome/fontawesome-free/js/regular');
import(/* webpackChunkName: "free-brands-svg-icons" */ '@fortawesome/fontawesome-free/js/brands');

import(/* webpackChunkName: "cookieconsent" */ 'cookieconsent');

$(function() {
	import(/* webpackChunkName: "lazysizes" */ 'lazysizes').then(result => {
		window.lazySizesConfig = window.lazySizesConfig || {};
		lazySizesConfig.expFactor = 4;
		lazySizesConfig.loadMode = 1;
		lazySizesConfig.preloadAfterLoad = true;
	});

	import(/* webpackChunkName: "bootstrap" */ 'bootstrap').then(({ default: Bootstrap }) => {
		$('[data-toggle="tooltip"]').tooltip();
	}).catch(error => 'An error occurred while loading the component');

	import(/* webpackChunkName: "jquery-bridget" */ 'jquery-bridget').then(({ default: jQueryBridget }) => {
		import(/* webpackChunkName: "imagesloaded" */ 'imagesloaded').then(({ default: imagesLoaded }) => {
			imagesLoaded.makeJQueryPlugin($);
			import(/* webpackChunkName: "flickity" */ 'flickity').then(({ default: Flickity }) => {
				Flickity.setJQuery($);		
				jQueryBridget('flickity', Flickity, $);
				var $slider = $('.carousel').flickity({
					autoPlay: 8000,
					pauseAutoPlayOnHover: false,
					wrapAround: true,
					pageDots: false
				});
			}).catch(error => 'An error occurred while loading the component');
			import(/* webpackChunkName: "masonry-layout" */ 'masonry-layout').then(({ default: Masonry }) => {
				Masonry.setJQuery($);
				jQueryBridget('masonry', Masonry, $);
				var $grid = $('.grid').masonry({
					itemSelector: '.grid-item',
					columnWidth: '.grid-sizer',
					percentPosition: true
				});
				$grid.imagesLoaded().progress(function () {
					$grid.masonry();
				});
			}).catch(error => 'An error occurred while loading the component');
		}).catch(error => 'An error occurred while loading the component');
	}).catch(error => 'An error occurred while loading the component');
});