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

  function selectorFromClass(className) {

    return '.' + className;

  }

  function getNamespacedEvent(eventName) {

    return eventName + '.' + pluginName;

  }

  function handleTriggerClicked(event) {

    var self = event.data;
    var $target = $(event.target);
    var $panel = $target.closest('.' + self.settings.panelClass);
    self.toggle($panel);

  }

  function handlePanelOpenEvent(event) {

    event.data.open($(event.target));

  }

  function handlePanelCloseEvent(event) {

    event.data.close($(event.target));

  }

  function handlePanelToggleEvent(event) {

    event.data.close(event.target);

  }

  IPTAccordion.prototype = {

    /**
     * initialize accordion
     * @returns {void}
     */
    init: function() {

      this.$panels = this.$element.children(selectorFromClass(this.settings.panelClass));
      var $activePanels = this.$panels
        .filter(selectorFromClass(this.settings.panelActiveClass))
        .add(this.$panels.filter('[data-accordion-panel-activated="true"]'));
      if (this.settings.singleOpen) {
        $activePanels = $activePanels.first();
      }
      $activePanels
        .children(selectorFromClass(this.settings.contentClass))
        .show();
      this.addActiveClasses($activePanels);
      var $inactivePanels = this.$panels.not($activePanels);
      $inactivePanels
        .children(selectorFromClass(this.settings.contentClass))
        .hide();
      this.removeActiveClasses($inactivePanels);
      this.addEventListeners();
      this.$element
        .addClass(this.settings.initializedClass)
        .trigger(getNamespacedEvent('initialized'));

    },

    /**
     * toggle panel
     * @param {object} panel - DOM element or jQuery object
     * @returns {void}
     */
    toggle: function(panel) {

      var $panel = $(panel);
      if ($panel.length === 1 && $panel.hasClass(this.settings.panelActiveClass)) {
        this.close($panel);
      } else {
        this.open($panel);
      }

    },

    /**
     * open panels
     * @param {object} $panels - jQuery object
     * @returns {void}
     */
    open: function($panels) {

      if ($panels.length > 0) {
        if (this.settings.singleOpen) {
          $panels = $panels.first();
        }
        $panels
          .trigger(getNamespacedEvent('beforeOpen'))
          .children('.' + this.settings.contentClass)
          .slideDown(this.settings.animationSpeed, function() {
            $panels.trigger(getNamespacedEvent('afterOpen'));
          });
        this.addActiveClasses($panels);
        if (this.settings.singleOpen) {
          this.$panels
            .not($panels)
            .filter(selectorFromClass(this.settings.panelActiveClass))
            .trigger(getNamespacedEvent('close'));
        }
      }

    },

    /**
     * close panels
     * @param {object} $panels - jQuery object
     * @returns {void}
     */
    close: function($panels) {

      if ($panels.length > 0) {
        $panels
          .trigger(getNamespacedEvent('beforeClose'))
          .children('.' + this.settings.contentClass)
          .slideUp(this.settings.animationSpeed, function() {
            $panels.trigger(getNamespacedEvent('afterClose'));
          });
        this.removeActiveClasses($panels);
      }

    },

    /**
     * add active classes to given panels and related trigger and content elements
     * @param {object} $panels - jQuery object
     * @returns {void}
     */
    addActiveClasses: function($panels) {

      $panels
        .addClass(this.settings.panelActiveClass)
        .children(selectorFromClass(this.settings.triggerClass))
        .addClass(this.settings.triggerActiveClass);
      $panels
        .children(selectorFromClass(this.settings.contentClass))
        .addClass(this.settings.contentActiveClass);

    },

    /**
     * remove active classes from given panels and related trigger and content elements
     * @param {object} $panels - jQuery object
     * @returns {void}
     */
    removeActiveClasses: function($panels) {

      $panels
        .removeClass(this.settings.panelActiveClass)
        .children(selectorFromClass(this.settings.triggerClass))
        .removeClass(this.settings.triggerActiveClass);
      $panels
        .children(selectorFromClass(this.settings.contentClass))
        .removeClass(this.settings.contentActiveClass);

    },

    /**
     * adds event listeners
     * @returns {void}
     */
    addEventListeners: function() {

      this.$panels
        .children(selectorFromClass(this.settings.triggerClass))
        .on(getNamespacedEvent('click'), null, this, handleTriggerClicked);
      this.$panels
        .on(getNamespacedEvent('open'), null, this, handlePanelOpenEvent)
        .on(getNamespacedEvent('close'), null, this, handlePanelCloseEvent)
        .on(getNamespacedEvent('toggle'), null, this, handlePanelToggleEvent);

    },

    /**
     * destroy IPTAccordion
     * @returns {void}
     */
    destroy: function() {

      this.$panels
        .children('.' + this.settings.triggerClass)
        .off(getNamespacedEvent('click'))
        .off(getNamespacedEvent('open'))
        .off(getNamespacedEvent('close'))
        .off(getNamespacedEvent('toggle'));
      this.$panels
        .children('.' + this.settings.contentClass)
        .show();
      this.$element.removeData('plugin_' + pluginName);

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
