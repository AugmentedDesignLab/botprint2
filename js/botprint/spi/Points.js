/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
// collection of points
var Points = function() {
	var self 	= this;
	var _points = [];

	self.add = function(point) {
		_points.push(point);
	};

	self.point = function(idx){
		return _points[idx];
	};

	self.size = function(){
		return _points.length;
	};

	self.log = function(){
		console.log(_points);
	};

	self.each = function(callback) {
		var len = _points.length;
		for(var i = 0; i < len; i++){
			var p = _points[i];
			callback.call(p, p, i, i === 0, i === len-1);
		}
	};

	self.backEach = function(callback){
		var len = _points.length;
		for(var i = len - 1; i >= 0; i--){
			var p = _points[i];
			callback.call(p, p, i, i === 0, i === len-1);
		}
	};

};