ImageLoader = function() {
    this.images = [];
    this.imagesLoaded = 0;
    this.callback = null;
    _self = this;
}

ImageLoader.prototype.addImage = function(name, url) {
    this.images.push({'name':name, 'url':url}); 
}

ImageLoader.prototype.getImage = function(name) {

    for (var i = 0; i < this.images.length; i++) {
        if (this.images[i].name == name) {
            return this.images[i].img;
        }
    }

    return null;
}

ImageLoader.prototype.loadImages = function(callback) {
    console.log('load images');
    console.log(this.images);
    this.callback = callback;
    for (var i = 0; i < this.images.length; i++) {
        img = new Image();
        img.addEventListener('load', this.onLoaded);
        img.addEventListener('error', this.onError);
        img.src = this.images[i].url;
        console.log('loading:' + img.src);
        this.images[i].img = img; 
    }
}

ImageLoader.prototype.onLoaded = function(e) {
    _self.imagesLoaded++;
    if (_self.imagesLoaded >= _self.images.length) {
        _self.callback();
    }
}

ImageLoader.prototype.onError = function(e) {
    console.log(e);
}
