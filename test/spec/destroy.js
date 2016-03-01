'use strict';
/* jshint undef: false */
/* global expect */
(function() {
  describe('iptAccordion', function() {

    var pluginName = 'plugin_iptAccordion';
    var accordion = null;
    var $element = $('.accordion');

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

