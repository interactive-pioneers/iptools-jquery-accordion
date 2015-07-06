'use strict';
/* jshint undef: false */
(function() {
  describe('iptAccordion', function() {

    var accordion = null;

    var $element = $('.accordion');

    describe('init', function() {

      beforeEach(function() {
        accordion = $element.iptAccordion();
      });

      it('expected to construct object', function() {
        return expect(accordion).to.exist;
      });

    });

    describe('destroy', function() {

      beforeEach(function() {
        accordion = $element.iptAccordion();
      });

      it('expected to remove data', function() {
        accordion.data(pluginName).destroy();
        return expect(accordion.data(pluginName)).to.not.be.ok;
      });

    });
  });
})();

