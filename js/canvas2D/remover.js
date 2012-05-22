/**
 * @author Zhongpeng Lin
 */

var remover = function(svg, canvas) {
	var that = {svg:svg};
	var draw = svg.paper;
	var bBox = svg.getBBox();
	if(!bBox)
		debugger;
	// Path taken from http://raphaeljs.com/icons/#cross
	that.cross = draw.path('M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z');
	that.cross.attr({'fill': 'white'});
	// TODO to be adjusted after resize box is done
	that.cross.transform('T'+bBox.x2+','+bBox.y);
	
	that.enable = function() {
		that.cross.click(function() {
			var color = svg.attrs.fill;
			svg.attr('fill', '#0000FF');
			if(confirm('Are you sure you want to delete this shape?'))
			{
				var index = canvas.svgs.indexOf(svg);
				canvas.svgs.splice(index, 1);
				svg.unbindAll();
				svg.rotator.disable();
				svg.rotator.circle.remove();
				
				that.disable();
				that.cross.remove();
				
				/* After removing svg, all its attributes become null
				 * so it needs to be removed at last
				 */
				svg.remove();
			}
			else
				svg.attr('fill', color);
		});
		
		that.cross.mouseover(function(){
			this.attr({'fill':'blue'});
		});
		
		that.cross.mouseout(function(){
			this.attr({'fill':'white'});
		});
		
		that.cross.show();
	};
	
	that.disable = function() {
		that.cross.unbindAll();
		that.cross.hide();
	};
	
	return that;
};
