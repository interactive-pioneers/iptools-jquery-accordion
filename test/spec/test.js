'use strict';
/* jshint undef: false */
(function() {
  describe('iptExpandable', function() {

    var expandableModule = null;

    describe('init', function() {

      beforeEach(function() {
        expandableModule = $('.expandable_module').iptExpandable();
      });

      it('expected to construct object', function() {
        return expect(expandableModule).to.exist;
      });

    });
  });
})();

