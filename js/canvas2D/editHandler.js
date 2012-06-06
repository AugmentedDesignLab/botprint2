/**
 * @author Zhongpeng Lin
 */
var editHandler = function(spec) {
	var handler = spec;
	
	handler.enable = function() {
		var draw = handler.canvas.draw;
		$.each(handler.canvas.svgs, function(index, svg){
			if(svg.type === 'path'){
				var path = svg.attrs.path;
				svg.controlPoints = new Array();
				$.each(path, function(index, action){
					if(action.length == 3){
						// draw a circle for each point along the path
						var circle = draw.circle(action[1], action[2], 4);
						circle.attr({fill: 'blue'});
						// when the circle is dragged, update coordinates
						// of the point at the same time
						var startX, startY;
						circle.drag(function(dx, dy, x, y, event){
							// onmove
							var newX = startX+dx, newY = startY+dy;
							this.attr({cx: newX, cy: newY});
							action[1] = newX;
							action[2] = newY;
							svg.attr({path: path});
						}, function(x, y, event){
							// onstart
							startX = this.attrs.cx;
							startY = this.attrs.cy;
						});
						circle.hover(function(){
							// hover in
							this.attr({r: 8});
						}, function(){
							// hover out
							this.attr({r: 4});
						});
						svg.controlPoints[index] = circle;
					}
				});
			}
		});
			
	};
	
	handler.disable = function() {
		$.each(handler.canvas.svgs, function(index, svg){
			if(svg.type === 'path'){
				var path = svg.attrs.path;
				$.each(path, function(index, action){
					var control = svg.controlPoints[index];
					if(control){
						control.remove();
					}
				});
			}
			svg.unbindAll();
		});
	};
	return handler;
};
