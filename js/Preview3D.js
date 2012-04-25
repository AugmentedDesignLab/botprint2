function Preview3D(elemID) {
	this.stage = $('#'+elemID);
	var width = this.stage.width();
	var height = this.stage.height();
	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
	this.rotation = Math.PI/2;
	this.scene.add(this.camera);
	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setSize(width, height);
	this.stage.append(this.renderer.domElement);
}

Preview3D.prototype.updateCameraPosition = function() {
	this.camera.position.x = Math.cos(this.rotation)*500;
	this.camera.position.z = Math.sin(this.rotation)*500;
	this.camera.position.y = 150;
	this.camera.lookAt(new THREE.Vector3(0, 0, 0));
};

Preview3D.prototype.animate = function() {
	this.rotation += Math.PI / 200;
	this.render();
	var self = this;
	requestAnimationFrame( function() {self.animate();} );
};

Preview3D.prototype.render = function() {
	this.updateCameraPosition();
	this.renderer.render(this.scene, this.camera);	
};

Preview3D.prototype.setObject = function(mesh) {
	if(this.object) {
		this.scene.remove(this.object);
	}
	this.scene.add(mesh);
	this.object = mesh;
};
