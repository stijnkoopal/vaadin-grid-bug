# vaadin-grid-bug
Bug report for vaadin-grid and polymer-webpack-loader

## Starting app
 1. `yarn`
 2. `bower install`
 3. `yarn start`
 4. open `http://localhost:9011` in Chrome (`64.x`)
 
## Stacktrace 
```
vaadin-grid-selection-mixin.html?6b4c:80 Uncaught TypeError: Cannot read property 'items' of undefined
    at HTMLElement._selectedItemsChanged (vaadin-grid-selection-mixin.html?6b4c:80)
    at Object.runMethodEffect [as fn] (property-effects.html?af9b:813)
    at runEffectsForProperty (property-effects.html?af9b:159)
    at runEffects (property-effects.html?af9b:125)
    at HTMLElement._propertiesChanged (property-effects.html?af9b:1703)
    at HTMLElement._flushProperties (properties-changed.html?0a1e:324)
    at HTMLElement._flushProperties (property-effects.html?af9b:1551)
    at HTMLElement.ready (property-effects.html?af9b:1656)
    at HTMLElement.ready (element-mixin.html?5cf0:549)
    at HTMLElement.ready (dir-mixin.html?6ee1:140)
```

## Root-cause

In `vaadin-themable-mixin.html`:`18`, `super.template` is null for `GridElement`.
The `super.template` call eventually invokes `static get template()` in `class.html`.
The `this` in this function is `function DataProviderMixin`, so `this.is` resolves to `vaadin-grid-scroller` (instead of `vaadin-grid`).
Hence, the `template` cannot be imported properly.

## Issue

https://github.com/vaadin/vaadin-grid/issues/1167

