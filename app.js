(function() {
  "use strict";

  var DEFAULT_ROUTE = 'one',  
    d;
  var template = document.querySelector('#t');

  template.responsiveWidth = '900px';
  
  template.addEventListener('template-bound', function(e) {
    var keys = document.querySelector('#keys');

    // Allow selecting pages by num keypad. Dynamically add
    // [1, template.pages.length] to key mappings.
    var keysToAdd = Array.apply(null, template.pages).map(function(x, i) {
      return i + 1;
    }).reduce(function(x, y) {
      return x + ' ' + y;
    });
    keys.keys += ' ' + keysToAdd;

    this.route = this.route || DEFAULT_ROUTE; // Select initial route.
  });
  
  template.nextStep = function(e, detail, sender) {
    var pages = document.querySelector('#pages');

    console.log('ok');

    // Select page by num key. 
    var num = parseInt(detail.key);
    if (!isNaN(num) && num <= this.pages.length) {
      pages.selectIndex(num - 1);
      return;
    }

    pages.selectNext();

  };

  template.prevStep = function(e, detail, sender) {
    var pages = document.querySelector('#pages');

    // Select page by num key. 
    var num = parseInt(detail.key);
    if (!isNaN(num) && num <= this.pages.length) {
      pages.selectIndex(num - 1);
      return;
    }

    pages.selectPrevious();

  };
  
  template.keyHandler = function(e, detail, sender) {
    var pages = document.querySelector('#pages');

    // Select page by num key. 
    var num = parseInt(detail.key);
    if (!isNaN(num) && num <= this.pages.length) {
      pages.selectIndex(num - 1);
      return;
    }

    switch (detail.key) {
      case 'left':
      case 'up':
        pages.selectPrevious();
        break;
      case 'right':
      case 'down':
        pages.selectNext();
        break;
      case 'space':
        detail.shift ? pages.selectPrevious() : pages.selectNext();
        break;
    }
  };
  
  template.cyclePages = function(e, detail, sender) {
    // Click clicks should navigate and not cycle pages.
    if (e.path[0].localName == 'a') {
      return;
    }

    e.shiftKey ? sender.selectPrevious(true) : sender.selectNext(true);
  };

  template.menuItemSelected = function(e, detail, sender) {
    if (detail.isSelected) {
      document.querySelector('#scaffold').closeDrawer();
    }
  };

  template.ploutch = function(e, detail) {
    console.log('Ploutch !');
  };

  template.quizDone = function(e, detail) {
    pages.selectNext();
    /*this.async(function() {
      this.fire('ploutch');
    }, null, parseInt(CoreStyle.g.transitions.duration));*/
  };

})();
