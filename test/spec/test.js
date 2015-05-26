'use strict';
/* jshint undef: false */
(function($) {
  describe('iptoolsExpandableModule', function() {

    var expandableModule = null;

    describe('init', function() {

      beforeEach(function() {
        expandableModule = $('.expandable_module').expandableModule();
      });

      it('expected to construct object', function() {
        return expect(expandableModule).to.exist;
      });

    });
  });
})(jQuery);
