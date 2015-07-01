'use strict';
/* jshint undef: false */
(function() {
  describe('iptAccordion', function() {

    var accordion = null;

    describe('init', function() {

      beforeEach(function() {
        accordion = $('.accordion').iptAccordion();
      });

      it('expected to construct object', function() {
        return expect(accordion).to.exist;
      });

    });
  });
})();

