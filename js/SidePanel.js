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
	
	// Drawing Tool folder
	var draw = gui.addFolder('Drawing Tools');
	draw.open();
	var freeShape = draw.add(this, 'freeShape');
	freeShape.name('Free Shape');
	
	var rectangle = draw.add(this, 'rectangle');
	rectangle.name('Rectangle');

	var rectangle = draw.add(this, 'polygon');
	rectangle.name('Polygon');
	
	var ellipse = draw.add(this, 'ellipse');
	ellipse.name('Ellipse');
	
	// Editing Tool folder
	var edit = gui.addFolder('Editing Tools');
	edit.open();
	var del = edit.add(this, 'del');
	del.name('Delete');
}

SidePanel.prototype.preview = function() {
	var svgs = this.canvas2D.svgs;
	if(svgs.length > 0){
		var mesh = new Chassis(svgs, 50);
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

SidePanel.prototype.del = function() {
	this.canvas2D.setHandler(DeleteHandler);
};
