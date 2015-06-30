/**
 * jQuery expandable box, expandable list and accordion plugin
 *
 * Copyright © 2015, Georg Meyer, David Lehnen, Interactive Pioneers GmbH
 *
 */

;(function($) {

  'use strict';

  // defaults
  var pluginName = 'iptExpandable';
  var defaults = {
    eventNamespace: '.' + pluginName
  };

  // base css class
  var cssClassBase = 'expandable-module';

  // components css classes
  var cssClassPanel = cssClassBase + '__panel';
  var cssClassTrigger = cssClassBase + '__trigger';
  var cssClassContent = cssClassBase + '__content';

  // modifier css classes
  var cssClassRelated = cssClassBase + '--related';
  var cssClassContentVisible = cssClassBase + '__content--visible';

  /**
   * IPTExpandableModule
   * @constructor
   * @param {object} element - jQuery element
   * @param {object} options - plugin options
   * @returns {void}
   */
  function IPTExpandable(element, options) {

    this.$element = $(element);
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;

    this.init();

  }

  IPTExpandable.prototype = {

    /**
     * initialize ExpandableModule
     * @returns {void}
     */
    init: function() {
      var self = this;

      this.settings.related = this.$element.hasClass(cssClassRelated);

      this.$element.on('click' + this.settings.eventNamespace, '.' + cssClassTrigger, function(event) {
        self.toggle(event);
      });
    },

    /**
     * toggle panel content
     * @param {event} event - jQuery event
     * @returns {void}
     */
    toggle: function(event) {
      var $target = $(event.target);
      var $panel = $target.closest('.' + cssClassPanel);
      var $content = $panel.find('.' + cssClassContent);

      // if related, close all panels except triggered panel
      if (this.settings.related) {
        this.$element.find('.' + cssClassContentVisible).not($content).removeClass(cssClassContentVisible);
      }

      $content.toggleClass(cssClassContentVisible);
    },

    /**
     * destroy IPTExpandableModule
     * @returns {void}
     */
    destroy: function() {
      this.$element.off('click' + this.settings.eventNamespace, '.' + cssClassTrigger);
      this.$element.removeData();
    }

  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new IPTExpandable(this, options));
      }
    });
  };

})(jQuery);
