# iptools-jquery-accordion [![Build Status](http://img.shields.io/travis/interactive-pioneers/iptools-jquery-accordion.svg)](https://travis-ci.org/interactive-pioneers/iptools-jquery-accordion) [![Bower version](https://badge.fury.io/bo/iptools-jquery-accordion.svg)](http://badge.fury.io/bo/iptools-jquery-accordion)

jQuery accordion plugin

## Features

Lightweight and easy to use jQuery accordion plugin.

## Requirements

- jQuery >= 1.11.3

## Example

```html
<div class="accordion">
  <div class="accordion__panel">
    <div class="accordion__trigger"></div>
    <div class="accordion__content"></div>
  </div>
  <!-- panels with panelActiveClass will be opened automatically on plugin initialization -->
  <div class="accordion__panel accordion__panel--active">
    <div class="accordion__trigger"></div>
    <div class="accordion__content"></div>
  </div>
  <!-- panels with data-accordion-panel-activated will also be opened automatically on plugin initialization -->
  <div class="accordion__panel" data-accordion-panel-activated="true">
    <div class="accordion__trigger"></div>
    <div class="accordion__content"></div>
  </div>
  <div class="accordion__panel">
    <div class="accordion__trigger"></div>
    <div class="accordion__content"></div>
  </div>
</div>

<script src="dist/iptools-jquery-accordion.min.js"></script>
<script type="text/javascript">
  $(document).ready(function() {
    $('.accordion').iptAccordion({
      animationSpeed: 500,
      singleOpen: true,
      baseClass: 'accordion',
      initializedClass: 'accordion--initialized',
      panelClass: 'accordion__panel',
      panelActiveClass: 'accordion__panel--active',
      triggerClass: 'accordion__trigger',
      triggerActiveClass: 'accordion__trigger--active',
      contentClass: 'accordion__content',
      contentActiveClass: 'accordion__content--active'
    });
  });
</script>
```

## Options

Name               | Default                      | Type    | Description
:------------------|:-----------------------------|:--------|:-----------
animationSpeed     | `500`                        | int     | Animation speed in miliseconds.
singleOpen         | `true`                       | boolean | Only one open panel at a time.
baseClass          | `accordion`                  | string  | Base class of the accordion.
initializedClass   | `accordion--initialized`     | string  | Class added to the accordion after initialization.
panelClass         | `accordion__panel`           | string  | Class of panel.
panelActiveClass   | `accordion__panel--active`   | string  | Class of active panel.
triggerClass       | `accordion__trigger`         | string  | Class of trigger element.
triggerActiveClass | `accordion__trigger--active` | string  | Class of active trigger element.
contentClass       | `accordion__content`         | string  | Class of content element.
contentActiveClass | `accordion__content--active` | string  | Class of active content element.


## Data attributes

Name               | Type    | Description
:------------------|:--------|:-----------
data-accordion-panel-activated | boolean     | Denotes active panel opened on plugin initilization. See also `panelActiveClass` option.

## Events

Events triggered on accordion wrapper / base element:

- initialized.iptAccordion : fired on successfull plugin initialization

Events triggered on accordion panels:

- beforeOpen.iptAccordion : fired before a panel is opened
- afterOpen.iptAccordion : fired after a panel has been opened (animation complete)
- beforeClose.iptAccordion : fired before a panel is closed
- afterClose.iptAccordion : fired after a panel has been closed (animation complete)

Events that the accordion listens to and can be used to trigger actions on panels:

- open.iptAccordion : opens a panel
- close.iptAccordion : closes a panel
- toggle.iptAccordion : toggles a panel

## Contributions

### Bug reports, suggestions

- File all your issues, feature requests [here](https://github.com/interactive-pioneers/iptools-jquery-accordion/issues)
- If filing a bug report, follow the convention of _Steps to reproduce_ / _What happens?_ / _What should happen?_
- __If you're a developer, write a failing test instead of a bug report__ and send a Pull Request

### Code

1. Fork it ( https://github.com/[my-github-username]/iptools-jquery-accordion/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Develop your feature by concepts of [TDD](http://en.wikipedia.org/wiki/Test-driven_development), see [Tips](#tips)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

### Tips

Following tasks are there to help with development:

- `grunt watch:bdd` listens to tests and source, reruns tests
- `grunt qa` run QA task that includes tests and JSHint
- `grunt build` minify source to dist/

## Licence
Copyright © 2015 Interactive Pioneers GmbH. Licenced under [GPLv3](LICENSE).
