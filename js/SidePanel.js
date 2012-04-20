function SidePanel(containerID, canvas, preview) {
	this.canvas2D = canvas;
	this.preview3D = preview;
	
	var gui = new dat.GUI ();
	$('#'+containerID).append(gui.domElement);
	var previewCtr = gui.add(this, 'preview')
	previewCtr.name('Preview');
}

SidePanel.prototype.preview = function() {
	var toShape = new SVG2Shape();
	var svg = this.canvas2D.current;
	if(svg){
		var shape = toShape.convert(svg);
		var mesh = new Chassis(shape, 50);
		mesh.rotation.x = Math.PI/2;
		this.preview3D.setObject(mesh);
	}
};
