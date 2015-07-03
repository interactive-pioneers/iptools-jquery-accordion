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

    describe('destroy', function() {

      beforeEach(function() {
        object = $element.iptAccordion(config);
      });

      it('expected to remove data', function() {
        object.data(pluginName).destroy();
        return expect(object.data(pluginName)).to.not.be.ok;
      });

    });
  });
})();

