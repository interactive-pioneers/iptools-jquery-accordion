/**
 * jQuery accordion plugin
 *
 * Copyright © 2015, David Lehnen, Interactive Pioneers GmbH
 *
 */

;(function($) {

  'use strict';

  var pluginName = 'iptAccordion';

  var baseClass = 'accordion';

  var defaults = {
    animationSpeed: 500,
    singleOpen: true,
    baseClass: baseClass,
    panelClass: baseClass + '__panel',
    triggerClass: baseClass + '__trigger',
    contentClass: baseClass + '__content',
    activeModifier: '--active'
  };

  /**
   * IPTAccordion
   * @constructor
   * @param {object} element - jQuery element
   * @param {object} options - plugin options
   * @returns {void}
   */
  function IPTAccordion(element, options) {

    this.$element = $(element);
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;

    this.init();

  }

  IPTAccordion.prototype = {

    /**
     * initialize accordion
     * @returns {void}
     */
    init: function() {

      this.$element.find('.' + this.settings.contentClass).hide();
      this.addEventListeners();

    },

    /**
     * toggle panel content
     * @param {event} event - jQuery event
     * @returns {void}
     */
    toggle: function(event) {

      var self = event.data;
      var $target = $(event.target);

      var $panel = $target.closest('.' + self.settings.panelClass);
      var panelActiveClass = self.settings.panelClass + self.settings.activeModifier;

      var $content = $panel.find('.' + self.settings.contentClass);

      if (self.settings.singleOpen) {
        self.$element
          .find('.' + self.settings.contentClass)
          .not($content)
          .slideUp(self.settings.animationSpeed);
        self.$element
          .find('.' + self.settings.panelClass)
          .not($panel)
          .removeClass(panelActiveClass);
      }

      $panel.addClass(panelActiveClass);
      $content.slideDown(self.settings.animationSpeed);

    },

    /**
     * adds event listeners
     * @returns {void}
     */
    addEventListeners: function() {

      this.$element.on('click' + '.' + this._name, '.' + this.settings.triggerClass, this, this.toggle);

    },

    /**
     * destroy IPTAccordion
     * @returns {void}
     */
    destroy: function() {
      this.$element.off('click' + '.' + this._name, '.' + this.settings.triggerClass);
      this.$element.removeData();
    }

  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new IPTAccordion(this, options));
      }
    });
  };

})(jQuery);
