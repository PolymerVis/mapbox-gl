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
<mapbox-gl id="map"
  interactive
  script-src="https://api.mapbox.com/mapbox-gl-js/v0.32.1/mapbox-gl.js"
  access-token="pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpbG10dnA3NzY3OTZ0dmtwejN2ZnUycjYifQ.1W5oTOnWXQ9R1w8u3Oo1yA"
  latitude=1.3521 longitude=103.8198
  zoom=10 pitch=60
  bearing=0></mapbox-gl>
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
```
<mapbox-gl id="map" access-token="[[key]]"
  latitude="{{lat}}" longitude="{{lng}}"
  zoom="{{zoom}}" pitch="{{pitch}}"
  bearing="{{bearing}}"></mapbox-gl>
```

### Styling

The following custom properties and mixins are available for styling:

Custom property | Description | Default
--- | --- | ---
`--mapbox-map` | mixin applied to the map div element | `{}`
