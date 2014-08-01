/**
 * To Top Component
 * Author: Jessica Chan (jessicachanstudios@gmail.com)
 *
 * Constructs a "back to top" UI element in bottom corner of
 * either the window or a scrolling DIV.
 *
 * Requires: JQuery, totop.png (in the same directory as .js file)
 * unless you are specifying your own imgSrc
 *
 * @param el OPTIONAL the id of the element or a reference to 
 * the element that will scroll to the top. Defaults to body.
 * @param imgSrc OPTIONAL override the default image source of
 * toTop element with absolute or relative path
 * @param width, height OPTIONAL override the default width/height
 * of toTop image/element
 */

var Totop = function() {
}

Totop.prototype.init = function(el,imgSrc,width,height) {
    
    // Increments each time an object instance is constructed
    Totop.numberInstances = (Totop.numberInstances || 0) + 1;
    this.el = document.getElementById(el) || window;
    this.imgSrc = imgSrc || 'totop.png';
    this.width = width || 50;
    this.height = height || 50;
    this.renderElements();
    this.initializeEvents();
},

Totop.prototype.renderElements = function() {

    // create toTop box and image
    var toTop = document.createElement('div'),
        toTopImg = document.createElement('img'),
        toTopBox = document.createElement('a');

    // assign box properties
    toTopBox.href = "#";
    toTopBox.className = "totop-box";

    // assign image properties
    toTopImg.src = this.imgSrc;
    toTopImg.className = "totop-image";

    // attach box and image to container
    toTop.appendChild(toTopImg);
    toTop.appendChild(toTopBox);

    // assign container properties
    toTop.className = 'display-none deactivated';
    toTop.id = this.toTopId = 'toTopLink' + Totop.numberInstances; // Making sure IDs are unique
    toTop.style.zIndex = 799;
    toTop.style.width = this.width;
    toTop.style.height = this.height;
    window.document.body.appendChild(toTop);

    // If the container is not the window, position toTop absolute
    if (this.el != window) {
        toTop.style.position = 'absolute';
        toTop.style.left = $(this.el).offset().left + $(this.el).width() - this.width - 15 + 'px';
        toTop.style.top = $(this.el).offset().top + $(this.el).height() - this.height - 15 + 'px';
    } else {
        // Otherwise, position it fixed and start it hidden to the right so it can slide in
        toTop.style.position = 'fixed';
        toTop.style.right = 0 - this.width - 15 + 'px';
        toTop.style.bottom = '60px';
    }
},

Totop.prototype.appear = function() {
    // If container isn't the window, just fade it in
    if (this.el != window) {
        $('#' + this.toTopId).removeClass('display-none deactivated').addClass('activated');
        $('#' + this.toTopId + ' .totop-box').animate({
            opacity: .3
        });
    } else {
        // Otherwise, slide and fade it in
        $('#' + this.toTopId).removeClass('display-none deactivated').addClass('activated').animate({
            right: 25 + 'px'
        });
        $('#' + this.toTopId + ' .totop-box').animate({
            opacity: .3,
        });
    }
},

Totop.prototype.disappear = function() {
    // code that animates top button to disappear
     if (this.el != window) {
        var self = this;
        $('#' + this.toTopId + ' .totop-box').animate(
            {opacity: 0},
            function() {
                $('#' + self.toTopId).addClass('display-none deactivated').removeClass('activated');
        });
    } else {
        $('#' + this.toTopId).animate({
            right: 0 - this.width - 15 + 'px'
        }, function() {
            $(this).addClass('display-none deactivated').removeClass('activated');
        });
        $('#' + this.toTopId + ' .totop-box').animate({
            opacity: 0
        });
    }
},

Totop.prototype.initializeEvents = function() {
    
    // Store "this" for shortcuts and so we can use it when 
    // context changes
    var thisContainer = this.el != window ? this.el : 'html,body';
    var thisTopLink = '#' + this.toTopId;
    var self = this;

    // Check position of window and appear/disappear element
    // when conditions match
    window.setInterval( function() {
        var testHeight = 100;
        var vertPos = null;
        
        if (thisContainer === 'html,body') {

            // Getting cross-browser compatible value of vertical
            // position of scrollbar
            vertPos = (window.pageYOffset !== undefined) ? window.pageYOffset : document.documentElement.scrollTop;
        } else {
            vertPos = $(thisContainer).scrollTop();
        }

        if (vertPos > testHeight && $(thisTopLink).hasClass('deactivated')) {
            self.appear();
        } else if (vertPos < testHeight && $(thisTopLink).hasClass('activated')) {
            self.disappear();
        }
        }, 300);

    $(thisTopLink).click(
            function(e) {
                e.preventDefault();
                $(thisContainer).animate({scrollTop: 0});
        });

    $(thisTopLink).hover(
        function() {
            $(thisTopLink + ' .totop-box').animate({opacity: .8});
        }, 
        function() {
            $(thisTopLink + ' .totop-box').animate({opacity: .3});
    });

}


