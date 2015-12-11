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
    initializedClass: baseClass + '--initialized',
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
      var $activePanels = this.$panels.filter('.' + this.settings.panelActiveClass);
      if (this.settings.singleOpen) {
        $activePanels = $activePanels.first();
      }
      $activePanels
        .children('.' + this.settings.contentClass)
        .show();
      this.addActiveClasses($activePanels);
      var $inactivePanels = this.$panels.not($activePanels);
      $inactivePanels
        .children('.' + this.settings.contentClass)
        .hide();
      this.removeActiveClasses($inactivePanels);
      this.addEventListeners();
      this.$element.addClass(this.settings.initializedClass);

    },

    /**
     * toggle panel
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
        var $inactivePanels = self.$panels.not($panel);
        $inactivePanels
          .children('.' + self.settings.contentClass)
          .slideUp(self.settings.animationSpeed);
        self.removeActiveClasses($inactivePanels);
      }

      $panel.toggleClass(self.settings.panelActiveClass);
      $trigger.toggleClass(self.settings.triggerActiveClass);
      $content.toggleClass(self.settings.contentActiveClass);
      $content.slideToggle(self.settings.animationSpeed);
    },

    /**
     * add active classes from panel and related trigger and content elements
     * @param {jQuery} $panels
     * @returns {void}
     */
    addActiveClasses: function($panels) {
      $panels
        .addClass(this.settings.panelActiveClass)
        .children('.' + this.settings.triggerClass)
        .addClass(this.settings.triggerActiveClass);
      $panels
        .children('.' + this.settings.contentClass)
        .addClass(this.settings.contentActiveClass);
    },

    /**
     * remove active classes from panel and related trigger and content elements
     * @param {jQuery} $panels
     * @returns {void}
     */
    removeActiveClasses: function($panels) {
      $panels
        .removeClass(this.settings.panelActiveClass)
        .children('.' + this.settings.triggerClass)
        .removeClass(this.settings.triggerActiveClass);
      $panels
        .children('.' + this.settings.contentClass)
        .removeClass(this.settings.contentActiveClass);
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
