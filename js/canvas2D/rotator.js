/**
 * @author Zhongpeng Lin
 */
function rotator(svg) {
	var draw = svg.paper;
	var bBox = svg.getBBox();
	if(!bBox)
		debugger;
	var circle = draw.circle((bBox.x+bBox.x2)/2, bBox.y-14, 5);
	circle.attr({'fill': 'white'});
	
	var that = {};
	that.enable = function(){
		var svgStr, removerStr;
		var oCord, oDeg = 0, deg;
		circle.drag(function(dx, dy, x, y, event){
			/* onDrag, x and y here are both relative to upper-left corner of
			 * the BROWSER!
			 */
			circle.attr({'cx': oCord.x+dx, 'cy': oCord.y+dy});
			var box = svg.getBBox();
			var center = {x: box.x+box.width/2, y: box.y + box.height/2};
		    var rad = Math.atan2(center.x-circle.attrs.cx, circle.attrs.cy-center.y);
		    /* deg: the angle of the positive y and the line between current 
		     * circle position and box center
		     */
			deg = rad/Math.PI*180 - 180; 
			svg.transform(svgStr+'R'+(deg-oDeg));
			svg.remover.transform(removerStr+'R'+(deg-oDeg)+','+center.x+','+center.y);
		}, function(x, y, event){
			// onStart
			svgStr = svg.transform();
			oCord = {x: circle.attrs.cx, y: circle.attrs.cy};
			removerStr = svg.remover.getTransformStr();
		}, function(event) {
			// onEnd
			oDeg = deg;
		});
		
		circle.mouseover(function(){
			this.attr({'fill':'blue'});
		});
		
		circle.mouseout(function(){
			this.attr({'fill':'white'});
		})
		circle.show();
	};
	
	that.disable = function() {
		circle.unbindAll();
		circle.hide();
	};

	that.setCord = function(cord) {
		circle.attr({'cx': cord.x, 'cy': cord.y});
	}
	
	that.getCord = function() {
		return {x: circle.attrs.cy, y: circle.attrs.cy};
	}
	return that;	
}
