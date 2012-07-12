/**
 * Botprint functionality
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Botprint() {
	var eventBus	= EventBus();
	var canvas  	= Canvas2D({elemID: 'canvas2d', bus: eventBus});
	var preview 	= Preview3D({elemID:'preview3d', bus: eventBus});
	var sidePanel	= SidePanel({elemClass: 'palette-set a', bus: eventBus});
	
	var self = {
		VERSION: '0.0.2',
		play: function() {
			preview.animate();
		}
	};
	
	return self;
}


// Surfaceize!
$(document).ready(function(){
	if(window.WebGLRenderingContext) {
		// Go!
		$('#palette').addClass('live');
		var main = Botprint();
		main.play();
	}else{
		$('html').removeClass('webgl').addClass('no-webgl');
	}
});
