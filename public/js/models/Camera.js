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
		//console.log(gameObject)
		this.followed = gameObject;	
		this.xDeadZone = xDeadZone;
		this.yDeadZone = yDeadZone;
	};
	
	var update = function(axis) {
		if(this.followed != null)
		{	
			//console.log(this.xView);
			//console.log(this.yView);
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
		
		//console.log();

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

	var reset = function() {
		this.xView = 0;
		this.yView = 0;
	}

	return {
		xView: xView,
		yView: yView,
		xDeadZone: xDeadZone,
		yDeadZone: yDeadZone,
		followed: followed,
		follow: follow,
		reset: reset,
		update: update,
		wView: wView,
		hView: hView,
		viewPort: viewPort,
		worldView: worldView
	};
};

// // gameObject needs to have "x" and "y" properties (as world(or room) position)
// 		Camera.prototype.follow = function(gameObject, xDeadZone, yDeadZone)
// 		{		
// 			this.followed = gameObject;	
// 			this.xDeadZone = xDeadZone;
// 			this.yDeadZone = yDeadZone;
// 		}					
		
// 		Camera.prototype.update = function()
// 		{
// 			// keep following the player (or other desired object)
// 			if(this.followed != null)
// 			{		
// 				if(this.axis == AXIS.HORIZONTAL || this.axis == AXIS.BOTH)
// 				{		
// 					// moves camera on horizontal axis based on followed object position
// 					if(this.followed.x - this.xView + this.xDeadZone > this.wView)
// 						this.xView = this.followed.x - (this.wView - this.xDeadZone);
// 					else if(this.followed.x  - this.xDeadZone < this.xView)
// 						this.xView = this.followed.x  - this.xDeadZone;
					
// 				}
// 				if(this.axis == AXIS.VERTICAL || this.axis == AXIS.BOTH)
// 				{
// 					// moves camera on vertical axis based on followed object position
// 					if(this.followed.y - this.yView + this.yDeadZone > this.hView)
// 						this.yView = this.followed.y - (this.hView - this.yDeadZone);
// 					else if(this.followed.y - this.yDeadZone < this.yView)
// 						this.yView = this.followed.y - this.yDeadZone;
// 				}						
				
// 			}		
			
// 			// update viewportRect
// 			this.viewportRect.set(this.xView, this.yView);
			
// 			// don't let camera leaves the world's boundary
// 			if(!this.viewportRect.within(this.worldRect))
// 			{
// 				if(this.viewportRect.left < this.worldRect.left)
// 					this.xView = this.worldRect.left;
// 				if(this.viewportRect.top < this.worldRect.top)					
// 					this.yView = this.worldRect.top;
// 				if(this.viewportRect.right > this.worldRect.right)
// 					this.xView = this.worldRect.right - this.wView;
// 				if(this.viewportRect.bottom > this.worldRect.bottom)					
// 					this.yView = this.worldRect.bottom - this.hView;
// 			}
			
// 		}	
