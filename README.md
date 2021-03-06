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

### Emitted events

Event                      | Emitter                | Description
:-----                     | :--------              | :-----------
`initialized.iptAccordion` | wrapper / base element | On successful plugin initialization              |
`beforeOpen.iptAccordion`  | individual panel       | Before panel is opened                           |
`afterOpen.iptAccordion`   | individual panel       | After panel has been opened (animation complete) |
`beforeClose.iptAccordion` | individual panel       | Before a panel is closed                         |
`afterClose.iptAccordion`  | individual panel       | After panel has been closed (animation complete) |

### Subscribed events

Event                 | Action
:-----                | :-----------
`open.iptAccordion`   | Opens panel   |
`close.iptAccordion`  | Closes panel  |
`toggle.iptAccordion` | Toggles panel |

## Licence

Copyright © 2015-2016 Interactive Pioneers GmbH. Licenced under [GPL-3](LICENSE).
