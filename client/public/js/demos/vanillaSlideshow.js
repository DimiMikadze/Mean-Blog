/*
 vanillaSlideshow v0.1
 (c) Dimitri Mikadze
 https://github.com/DimitriMikadze/vanilla-slideshow
 License: MIT
 */
vanillaSlideshow = {

    // default properties
    defaults: {
        delay: 5000,
        arrows: true,
        indicators: true,
        random: false,
        slideshow: true,
        animationSpeed: '1s'
    },

    // container divs
    slideshowContainer: document.getElementById('vanilla-slideshow-container'),
    slideshow: document.getElementById('vanilla-slideshow'),
    slides: document.getElementById('vanilla-slideshow').getElementsByClassName('vanilla-slide'),
    arrowPrevious: 'vanilla-slideshow-previous',
    arrowNext: 'vanilla-slideshow-next',
    indicatorsContainer: 'vanilla-indicators',

    // check properties
    checkProperties: function() {

        var random = (this.defaults.random) ? this.randomInt(0, this.slides.length - 1) : 0;

        for(var i=0; i<this.slides.length; i++) {

            if(this.slides[i].getAttribute('data-src') !== null) {
                this.slides[i].style.backgroundImage  = 'url( ' + this.slides[i].getAttribute('data-src') + ')';
            }

            if(i === random) { this.slides[i].className += ' vanilla-active'; }

            this.setVendor(this.slides[i], 'Transition', this.defaults.animationSpeed);

        }

    },

    // slideshow function
    slideShow: function() {

        var active = document.querySelector('#' + this.slideshow.getAttribute('id') + ' .vanilla-active');
        var next = (this.nextElement(active)) ? this.nextElement(active) : this.slides[0];

        // classes
        active.className = 'vanilla-slide';
        next.className += ' vanilla-active';

        // indicators
        if(this.defaults.indicators) {
            var activePointer = document.querySelector('#' + this.indicatorsContainer + ' .vanilla-active');
            var nextPointer = (this.nextElement(activePointer)) ? this.nextElement(activePointer) : this.indicators[0];
            activePointer.className = activePointer.className.replace(/(?:^|\s)vanilla-active(?!\S)/g, '');
            nextPointer.className += ' vanilla-active';
        }

    },

    // Previous slide
    previousSlide: function() {

        this.stopSlideshow();

        var active = document.querySelector('#' + this.slideshow.getAttribute('id') + ' .vanilla-active');
        var previous = (this.previousElement(active) ? this.previousElement(active) : this.slides[this.slides.length - 1]);

        // classes
        active.className = 'vanilla-slide';
        previous.className += ' vanilla-active';

        // indicators
        if(this.defaults.indicators) {
            var activePointer = document.querySelector('#' + this.indicatorsContainer + ' .vanilla-active');
            var nextPointer = (this.previousElement(activePointer)) ? this.previousElement(activePointer) : this.indicators[this.indicators.length - 1];
            activePointer.className = activePointer.className.replace(/(?:^|\s)vanilla-active(?!\S)/g, '');
            nextPointer.className += ' vanilla-active';
        }

        if(this.defaults.slideshow) {
            this.startSlideshow();
        }

    },

    // indicators click function
    indicatorsClick: function(self) {

        this.stopSlideshow();

        // remove active classes
        for(var i=0; i<this.slides.length; i++) {
            if(this.hasClass(this.indicators[i], 'vanilla-active')) {
                this.indicators[i].className = this.indicators[i].className.replace(/(?:^|\s)vanilla-active(?!\S)/g, '');
            }
            if(this.hasClass(this.slides[i], 'vanilla-active')) {
                this.slides[i].className = 'vanilla-slide';
            }
        }

        // add active class
        var i = Array.prototype.indexOf.call(this.indicators, self);
        this.indicators[i].className += ' vanilla-active';

        // add classes to slide
        this.slides[i].className += ' vanilla-active';

        if(this.defaults.slideshow) {
            this.startSlideshow();
        }

    },

    // Next slide
    nextSlide: function() {

        this.stopSlideshow();

        this.slideShow();

        if(this.defaults.slideshow) {
            this.startSlideshow();
        }

    },

    // create indicators and add event listeners
    createIndicators: function() {

        var that = this;
        for(var i=0; i<this.slides.length; i++) {
            var node = document.createElement("div");
            var indicators = document.getElementById(this.indicatorsContainer).appendChild(node);
            indicators.addEventListener("click", function() {
                that.indicatorsClick(this);
            });
            indicators.className = this.indicatorsContainer;
            if(this.hasClass(this.slides[i], 'vanilla-active')) {
                indicators.className += ' vanilla-active';
            }
        }

        this.indicators = this.slideshowContainer.getElementsByClassName(this.indicatorsContainer);

    },

    // start slideshow
    startSlideshow: function() {

        var that = this;
        that.intervalSliding = setInterval(function() {
            that.slideShow();
        }, this.defaults.delay);
    },

    // stop slideshow
    stopSlideshow: function() {

        clearInterval(this.intervalSliding);
    },

    // init function
    init: function(arguments) {

        // check if options is present
        if(arguments && typeof arguments === "object") {
            this.defaults.arrows = (arguments.arrows !== '') ? arguments.arrows : this.defaults.arrows;
            this.defaults.indicators = (arguments.indicators !== '') ? arguments.indicators : this.defaults.indicators;
            this.defaults.random = (arguments.random !== '') ? arguments.random : this.defaults.random;
            this.defaults.slideshow = (arguments.slideshow !== '') ? arguments.slideshow : this.defaults.slideshow;
            this.defaults.delay = (arguments.delay) ? arguments.delay : this.defaults.delay;
            this.defaults.animationSpeed = (arguments.animationSpeed) ? arguments.animationSpeed : this.defaults.animationSpeed;
        }

        this.checkProperties();

        if(this.slides.length > 1) {

            if(this.defaults.arrows) {

                var that = this;
                document.getElementById(this.arrowNext).addEventListener('click', function() {
                    that.nextSlide();
                });
                document.getElementById(this.arrowPrevious).addEventListener('click', function() {
                    that.previousSlide();
                });
                document.getElementById(this.arrowPrevious).style.display = 'block';
                document.getElementById(this.arrowNext).style.display = 'block';
            }

            if(this.defaults.indicators) {
                this.createIndicators();
            }
            if(this.defaults.slideshow) {
                this.startSlideshow();
            }
        }

    },

    // set browser vendor properties
    setVendor: function(element, property, value) {
        element.style["webkit" + property] = value + ' ease-in-out';
        element.style["Moz" + property] = value + ' ease-in-out';
        element.style["ms" + property] = value + ' ease-in-out';
        element.style["o" + property] = value + ' ease-in-out';
    },

    // has class
    hasClass: function(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    },

    // Next element
    nextElement: function(element) {
        do {
            element = element.nextSibling;
        } while (element && element.nodeType !== 1);

        return element;
    },

    // Previous element
    previousElement: function(element) {
        do {
            element = element.previousSibling;
        } while (element && element.nodeType !== 1);

        return element;
    },

    // Random number
    randomInt: function(min, max) {

        return Math.floor(Math.random() * (max - min + 1) + min);
    }

}