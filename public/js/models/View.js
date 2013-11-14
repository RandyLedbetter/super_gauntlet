var View = function(leftView, topView, viewWidth, viewHeight) {
	var left = leftView || 0,
		top = topView || 0,
		right = (leftView + viewWidth) || 0,
		bottom = (topView + viewHeight) || 0;

	var set = function(left, top, /*optional*/width, /*optional*/height) {
		this.left = left;
        this.top = top;
        this.width = width || this.width;
        this.height = height || this.height
        this.right = (this.left + this.width);
        this.bottom = (this.top + this.height);
	};
			
	var within = function(r) {
		return (r.left <= this.left && 
			r.right >= this.right &&
			r.top <= this.top && 
			r.bottom >= this.bottom);
	};	
		
	return {
		left: left,
		top: top,
		right: right,
		bottom: bottom,
		set: set,
		within: within
	};
};