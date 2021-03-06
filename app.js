(function() {
  "use strict";

  var DEFAULT_ROUTE = 'splash',  
    d;
  var template = document.querySelector('#t');

  template.responsiveWidth = '900px';
  
  template.addEventListener('template-bound', function(e) {
    this.route = this.route || DEFAULT_ROUTE;
  });

  /* DEBUG 
  template.ready = function(){
    console.log('page-dialog ready');
  };
  */
  
  template.nextStep = function(e, detail, sender) {
    var pages = document.querySelector('#pages');

    pages.selectNext();

  };

  template.prevStep = function(e, detail, sender) {
    var pages = document.querySelector('#pages');

    pages.selectPrevious();

  };

  template.clickMenu = function(e, detail, sender) {
    template.$.core_scaffold.togglePanel();
  };
  
  template.cyclePages = function(e, detail, sender) {
    // Click clicks should navigate and not cycle pages.
    // 
    console.log('click');
    if (e.path[0].localName == 'a') {
      return;
    }

    e.shiftKey ? sender.selectPrevious(true) : sender.selectNext(true);
  };

  template.ploutch = function(e, detail) {
    console.log('Ploutch !');
  };

  template.quizDone = function(e, detail) {
    var pages = document.querySelector('#pages');
    pages.selectNext();
    /*this.async(function() {
      this.fire('ploutch');
    }, null, parseInt(CoreStyle.g.transitions.duration));*/
  };

})();
