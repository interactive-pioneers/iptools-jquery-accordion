'use strict';
/* jshint undef: false */
(function() {
  describe('iptAccordion', function() {

    var pluginName = 'plugin_iptAccordion';
    var accordion = null;
    var $element = $('.accordion');

    describe('init', function() {

      before(function() {
        accordion = $element.iptAccordion();
      });

      after(function() {
        accordion.data(pluginName).destroy();
      });

      it('expected to construct object', function() {
        return expect(accordion).to.exist;
      });

    });

    describe('destroy', function() {

      before(function() {
        accordion = $element.iptAccordion();
      });

      it('expected to remove data', function() {
        accordion.data(pluginName).destroy();
        return expect(accordion.data(pluginName)).to.not.be.ok;
      });

    });
  });
})();

