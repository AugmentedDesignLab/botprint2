function SidePanel(containerID, canvas, preview) {
	this.canvas2D = canvas;
	this.preview3D = preview;
	
	var gui = new dat.GUI ();
	$('#'+containerID).append(gui.domElement);
	
	// General folder
	var general = gui.addFolder('General');
	general.open();
	var previewCtr = general.add(this, 'preview')
	previewCtr.name('Preview');
	
	// Tool folder
	var tools = gui.addFolder('Drawing Tools');
	tools.open();
	var freeShape = tools.add(this, 'freeShape');
	freeShape.name('Free Shape');
	
	var rectangle = tools.add(this, 'rectangle');
	rectangle.name('Rectangle');

	var rectangle = tools.add(this, 'polygon');
	rectangle.name('Polygon');
	
	var ellipse = tools.add(this, 'ellipse');
	ellipse.name('Ellipse');
}

SidePanel.prototype.preview = function() {
	var toShape = new SVG2Shape();
	var svg = this.canvas2D.getCurrentShape();
	if(svg){
		var shape = toShape.convert(svg);
		var mesh = new Chassis(shape, 50);
		mesh.rotation.x = Math.PI/2;
		this.preview3D.setObject(mesh);
	}
};

SidePanel.prototype.freeShape = function() {
	this.canvas2D.setHandler(FreeShapeHandler);
};

SidePanel.prototype.rectangle = function() {
	this.canvas2D.setHandler(RectangleHandler);	
};

SidePanel.prototype.polygon = function() {
	this.canvas2D.setHandler(PolygonHandler);
};

SidePanel.prototype.ellipse = function() {
	this.canvas2D.setHandler(EllipseHandler);
};
