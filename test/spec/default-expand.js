'use strict';
/* jshint undef: false */
/* global expect */
(function() {
  describe('iptAccordion', function() {

    var pluginName = 'plugin_iptAccordion';
    var accordion = null;
    var $element = $('.accordion');
    var settings = {
      panelClass: 'accordion__node',
      panelActiveClass: 'accordion__node--active',
      contentClass: 'accordion__node__content'
    };

    describe('init', function() {

      context('with class-based expand', function() {

        context('when last node marked active', function() {

          before(function() {
            var $content1 = $('<div>').addClass(settings.contentClass);
            var $panel1 = $('<div>').addClass(settings.panelClass)
              .append($content1);
            var $content2 = $('<div>').addClass(settings.contentClass);
            var $panel2 = $('<div>').addClass(settings.panelClass)
              .addClass(settings.panelActiveClass)
              .append($content2);
            $element.append($panel1);
            $element.append($panel2);
            accordion = $element.iptAccordion(settings);
          });

          after(function() {
            $element.empty();
            accordion.data(pluginName).destroy();
          });

          it('expected to expand last node', function() {
            var visible = $element
              .children('.' + settings.panelClass)
              .last()
              .children('.' + settings.contentClass)
              .is(':visible');
            return expect(visible).to.be.ok;
          });

        });

        context('when 1st node marked active', function() {

          before(function() {
            var $content1 = $('<div>').addClass(settings.contentClass);
            var $panel1 = $('<div>').addClass(settings.panelClass)
              .addClass(settings.panelActiveClass)
              .append($content1);
            var $content2 = $('<div>').addClass(settings.contentClass);
            var $panel2 = $('<div>').addClass(settings.panelClass)
              .append($content2);
            $element.append($panel1);
            $element.append($panel2);
            accordion = $element.iptAccordion(settings);
          });

          after(function() {
            $element.empty();
            accordion.data(pluginName).destroy();
          });

          it('expected to expand 1st node', function() {
            var visible = $element
              .children('.' + settings.panelClass)
              .first()
              .children('.' + settings.contentClass)
              .is(':visible');
            return expect(visible).to.be.ok;
          });

        });

      });

      context('with data-based expand', function() {

      });

    });

  });
})();
