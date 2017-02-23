mapbox-gl [![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/PolymerVis/mapbox-gl)
==========

### Usage
API documentation and Demos [here](https://www.webcomponents.org/element/PolymerVis/mapbox-gl)


<!---
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.min.js"></script>
    <link href='https://api.mapbox.com/mapbox-gl-js/v0.32.1/mapbox-gl.css' rel='stylesheet'>    
    <link rel="import" href="mapbox-gl.html">
    <style>
      #map {
        height: 300px;
        width: 420px
      }
    </style>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<template is="dom-bind">
  <mapbox-gl id="map"
    interactive
    map="{{map}}"
    map-style="mapbox://styles/mapbox/dark-v9"
    access-token="pk.eyJ1IjoiZXRlcm5hMiIsImEiOiJjaXppZjRoaTIwMmYxMndsNHJ4dzR1eWJsIn0.MvJ5fsV47RHlSAt2fBEKLg"
    latitude=1.3521
    longitude=103.8698
    zoom=16
    pitch=45
    bearing=0></mapbox-gl>

  <mapbox-building-layer layer-id="buildings"
    map="[[map]]"
    fill-extrusion-opacity=0.6
    fill-extrusion-color="#666"></mapbox-building-layer>
</template>
```


### Installation

```
bower install --save mapbox-gl
```

### Summary

[Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/api/) is a JavaScript library
that uses WebGL to render interactive maps from vector tiles and Mapbox styles..

`mapbox-gl` is the Polymer element that wraps around mapbox-gl-js to provide powerful
mapping capabilities to your app as a webcomponent.

<b>Example</b>:
```html
<mapbox-gl id="map"
  interactive
  map="{{map}}"
  script-src="https://api.mapbox.com/mapbox-gl-js/v0.32.1/mapbox-gl.js"
  map-style="mapbox://styles/mapbox/dark-v9"
  access-token="<MAPBOX_ACCESS_TOKEN>"
  latitude=1.3521
  longitude=103.8698
  zoom=16
  pitch=45
  bearing=0></mapbox-gl>
```

### Styling

The following custom properties and mixins are available for styling:

Custom property | Description | Default
--- | --- | ---
`--mapbox-map` | mixin applied to the map div element | `{}`
