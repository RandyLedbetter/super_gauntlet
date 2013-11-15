var Camera = function(x, y, canvasWidth, canvasHeight, worldWidth, worldHeight) {

	var xView = x || 0,
		yView = y || 0,
		xDeadZone = 0,
		yDeadZone = 0,
		followed = null,
		wView = canvasWidth,
		hView = canvasHeight,
		viewPort = new View(xView, yView, wView, hView),
		worldView = new View(0, 0, worldWidth, worldHeight);

	var follow = function(gameObject, xDeadZone, yDeadZone) {
		
		this.followed = gameObject;	
		this.xDeadZone = xDeadZone;
		this.yDeadZone = yDeadZone;
	};
	
	var update = function(axis) {
		if(this.followed != null)
		{	

			if(axis == 2 || axis == 3)
			{	
				// moves camera on horizontal axis based on followed object position
				if(this.followed.get("x") - this.xView + this.xDeadZone > this.wView)
					this.xView = this.followed.get("x") - (this.wView - this.xDeadZone);
				else if(this.followed.get("x")  - this.xDeadZone < this.xView)
					this.xView = this.followed.get("x")  - this.xDeadZone;
			}
			if(axis == 1 || axis == 3)
			{
				// moves camera on vertical axis based on followed object position
				if(this.followed.get("y") - this.yView + this.yDeadZone > this.hView) 
					this.yView = this.followed.get("y") - (this.hView - this.yDeadZone);
				else if(this.followed.get("y") - this.yDeadZone < this.yView) 
					this.yView = this.followed.get("y") - this.yDeadZone;
			}						
		}

		// update viewPort
		this.viewPort.set(this.xView, this.yView);
		
	

		// Don't let camera leaves the world's boundary
		if(!this.viewPort.within(this.worldView))
		{
			if(this.viewPort.left < this.worldView.left)
				this.xView = this.worldView.left;
			if(this.viewPort.top < this.worldView.top) 				
				this.yView = this.worldView.top;
			if((this.viewPort.left + this.wView) > this.worldView.right) 
				this.xView = this.worldView.right - this.wView;
			if((this.viewPort.top + this.hView) > this.worldView.bottom)				
				this.yView = this.worldView.bottom - this.hView;
		}	
	};

	return {
		xView: xView,
		yView: yView,
		xDeadZone: xDeadZone,
		yDeadZone: yDeadZone,
		followed: followed,
		follow: follow,
		update: update,
		wView: wView,
		hView: hView,
		viewPort: viewPort,
		worldView: worldView
	};
};


