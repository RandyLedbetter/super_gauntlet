 function AssetManager() {
    this.successCount = 0;
    this.errorCount = 0;
    this.cache = {};
    this.downloadQueue = [];
}

AssetManager.prototype.queueDownload = function(path) {
    this.downloadQueue.push(path);
}


AssetManager.prototype.downloadAll = function(downloadCallback) {
    if (this.downloadQueue.length === 0) {
        downloadCallback();
    }
    
    
    for (var i = 0; i < this.downloadQueue.length; i++) {
        var path = this.downloadQueue[i];
        var img = new Image();
        var that = this;
        img.addEventListener("load", function() {
            console.log(this.src + ' is loaded');
            that.successCount += 1;
            if (that.isDone()) {
                downloadCallback();
            }
        }, false);
        img.addEventListener("error", function() {
            that.errorCount += 1;
            if (that.isDone()) {
                downloadCallback();
            }
        }, false);
        img.src = path;
        this.cache[path] = img;
    }
}


AssetManager.prototype.getAsset = function(path) {
    return this.cache[path];
}

AssetManager.prototype.isDone = function() {
    return ((this.downloadQueue.length) == this.successCount + this.errorCount);
}

//var canvas = document.getElementById('canvas');
//var ctx = canvas.getContext('2d');
var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload('images/fighter.png');
ASSET_MANAGER.queueDownload('images/archer.png');
ASSET_MANAGER.queueDownload('images/wizard.png');
ASSET_MANAGER.queueDownload('images/cleric.png');

ASSET_MANAGER.downloadAll(function() {
        //alert('All images are loaded');    
});