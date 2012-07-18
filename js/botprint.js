/**
 * Botprint functionality
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Botprint() {
	var radio	= Bindable();
	var canvas  	= Canvas2D({elemID: 'canvas2d', app: radio});
	var preview 	= Preview3D({elemID:'preview3d', app: radio});
	var sidePanel	= SidePanel({elemClass: 'palette-set a', app: radio});

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
