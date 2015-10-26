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
    panelActiveClass: baseClass + '__panel--active',
    triggerClass: baseClass + '__trigger',
    triggerActiveClass: baseClass + '__trigger--active',
    contentClass: baseClass + '__content',
    contentActiveClass: baseClass + '__content--active'
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

      this.$panels = this.$element.children('.' + this.settings.panelClass);
      this.$panels.children('.' + this.settings.contentClass).hide();
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
      var $trigger = $panel.children('.' + self.settings.triggerClass);
      var $content = $panel.children('.' + self.settings.contentClass);

      if (self.settings.singleOpen) {
        self.$panels
          .children('.' + self.settings.contentClass)
          .not($content)
          .slideUp(self.settings.animationSpeed);
        self.$panels.not($panel).removeClass(self.settings.panelActiveClass);
        self.$panels.not($panel).find('.' + self.settings.triggerClass).removeClass(self.settings.triggerActiveClass);
        self.$panels.not($panel).find('.' + self.settings.contentClass).removeClass(self.settings.contentActiveClass);
      }

      $panel.toggleClass(self.settings.panelActiveClass);
      $trigger.toggleClass(self.settings.triggerActiveClass);
      $content.toggleClass(self.settings.contentActiveClass);
      $content.slideToggle(self.settings.animationSpeed);

    },

    /**
     * adds event listeners
     * @returns {void}
     */
    addEventListeners: function() {

      this.$panels
        .children('.' + this.settings.triggerClass)
        .on('click' + '.' + this._name, null, this, this.toggle);

    },

    /**
     * destroy IPTAccordion
     * @returns {void}
     */
    destroy: function() {

      this.$panels
        .children('.' + this.settings.triggerClass)
        .off('click' + '.' + this._name);
      this.$panels.children('.' + this.settings.contentClass).show();
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
