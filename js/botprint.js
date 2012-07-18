/**
 * Botprint functionality
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Botprint() {
	var eventBus	= EventBus();
	var self = {
		VERSION: '0.0.2',
		play: function() {
			preview.animate();
		}
	};

	Mixable(self).mix(Bindable());	
	var canvas  	= Canvas2D({elemID: 'canvas2d', app: self});
	var preview 	= Preview3D({elemID:'preview3d', app: self});
	var sidePanel	= SidePanel({elemClass: 'palette-set a', app: self});
	
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
