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
     * @param {object} panel - DOM element or jQuery object
     * @returns {void}
     */
    toggle: function(panel) {

      var $panel = $(panel);
      var $trigger = $panel.children('.' + this.settings.triggerClass);
      var $content = $panel.children('.' + this.settings.contentClass);

      if (this.settings.singleOpen) {
        var $inactivePanels = this.$panels.not($panel);
        $inactivePanels
          .children('.' + this.settings.contentClass)
          .slideUp(this.settings.animationSpeed);
        this.removeActiveClasses($inactivePanels);
      }

      $panel.toggleClass(this.settings.panelActiveClass);
      $trigger.toggleClass(this.settings.triggerActiveClass);
      $content.toggleClass(this.settings.contentActiveClass);
      $content.slideToggle(this.settings.animationSpeed);

    },

    /**
     * add active classes to panel and related trigger and content elements
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
        .on('click' + '.' + this._name, null, this, handleTriggerClicked);

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

  function handleTriggerClicked(event) {

    var self = event.data;
    var $target = $(event.target);
    var $panel = $target.closest('.' + self.settings.panelClass);
    self.toggle($panel);

  }

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new IPTAccordion(this, options));
      }
    });
  };

})(jQuery);
