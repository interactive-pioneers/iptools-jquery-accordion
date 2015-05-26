/**
 * jQuery expandable module
 *
 * http://confluence.interactive-pioneers.de/display/SR/Expandable+Module
 * http://jira.interactive-pioneers.com/browse/SR-137
 *
 */
(function($) {

  'use strict';

  // defaults
  var pluginName = 'expandableModule';
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
   * ExpandableModule
   * @constructor
   * @param {object} element - jQuery element
   * @param {object} options - plugin options
   * @returns {void}
   */
  function ExpandableModule(element, options) {

    this.$element = $(element);
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;

    this.init();

  }

  ExpandableModule.prototype = {

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
     * destroy ExpandableModule
     * @returns {void}
     */
    destroy: function() {
      this.$element.off('click' + this.settings.eventNamespace, '.' + cssClassTrigger);
      this.$element.removeData();
    }

  };

  // a really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[ pluginName ] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new ExpandableModule(this, options));
      }
    });
  };

})(jQuery);
