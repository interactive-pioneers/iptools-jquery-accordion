'use strict';
/* jshint undef: false */
/* global expect */
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

  });
})();

