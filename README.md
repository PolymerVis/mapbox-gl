mapbox-gl [![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/PolymerVis/mapbox-gl)
==========

### Usage
API documentation and Demos [here](https://www.webcomponents.org/element/PolymerVis/mapbox-gl)


<!---
```
<custom-element-demo>
  <template is="dom-bind">
    <script src="../webcomponentsjs/webcomponents-lite.min.js"></script>
    <script src="https://api.mapbox.com/mapbox-gl-js/v0.32.1/mapbox-gl.js"></script>
    <link href='https://api.mapbox.com/mapbox-gl-js/v0.32.1/mapbox-gl.css' rel='stylesheet'>    
    <link rel="import" href="mapbox-gl.html">
    <style>
      #map {
        height: 300px;
        width: 420px
      }

      div.textbox {
        background-color: #eee;
        color: #444;
        padding: 5px;
        line-height: 20px;
        width: 128px;
        height: 20px;
        border-radius: 5px;
        text-align: center;
      }

      div.arrow-down {
        margin-left: 60px;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 10px solid #eee;
      }

      mapbox-gl-marker.big_kitten {
        background-image: url('https://placekitten.com/g/64/64');
        border: 2px solid #eee;
        border-radius: 50%;
        padding: 0;
        width: 64px;
        height: 64px;
      }

    </style>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
  <!-- please use your own mapbox access token!! -->
  <mapbox-gl id="map"
    interactive
    map="{{map}}"
    map-style="mapbox://styles/mapbox/dark-v9"
    script-src="https://api.mapbox.com/mapbox-gl-js/v0.32.1/mapbox-gl.js"
    access-token="pk.eyJ1IjoiZXRlcm5hMiIsImEiOiJjaXppZjRoaTIwMmYxMndsNHJ4dzR1eWJsIn0.MvJ5fsV47RHlSAt2fBEKLg"
    latitude=1.3521
    longitude=103.8698
    zoom=16
    pitch=45
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

### Add geojson layer
To add a geojson layer, you first need to create a `geojson-source` element to
load the geojson. The data can be a JSON object or the url to a GeoJSON file.

Then you can render the geojson via the `mapbox-layer`
(e.g. rendering-type = line or fill).

Note that you will need to bind the corresponding `map` object from
`mapbox-gl` element to both `geojson-source` element and `mapbox-layer` element.

<b>Example</b>

```html
<mapbox-gl id="map"
  interactive
  map="{{map}}"
  map-style="mapbox://styles/mapbox/dark-v9"
  access-token="<MAPBOX_ACCESS_TOKEN>"
  latitude=1.3521
  longitude=103.8698
  zoom=2></mapbox-gl>

<mapbox-layer
  map="[[map]]"
  layer-id="coastline_fill"
  rendering-type="fill"
  source="geojsonsrc"
  color="#009688"
  opacity=0.7></mapbox-layer>

<mapbox-layer
  map="[[map]]"
  layer-id="coastline_outline"
  rendering-type="line"
  source="geojsonsrc"
  color="#eee"
  line-width=2></mapbox-layer>

<geojson-source
  map="[[map]]"
  source-id="geojsonsrc"
  source-data="https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_land.geojson"></geojson-source>
```

### Add building layer
To add a building layer, just bind the corresponding `map` object from
`mapbox-gl` selement to the `mapbox-building-layer` element.

<b>Example</b>:
```html
<mapbox-building-layer layer-id="buildings"
  map="[[map]]"
  fill-extrusion-opacity=0.6
  fill-extrusion-color="#666"></mapbox-building-layer>
```

### Add marker
To add a marker layer, just include the `mapbox-gl-marker` element as a child
of the `mapbox-gl` element.

<b>Example</b>:
```html
<mapbox-gl id="map"
  interactive
  map="{{map}}"
  map-style="mapbox://styles/mapbox/dark-v9"
  access-token="<MAPBOX_ACCESS_TOKEN>"
  latitude=1.3521
  longitude=103.8698
  zoom=16
  pitch=45
  bearing=0>

    <mapbox-gl-marker class="big_kitten"
      latitude=1.3521 longitude=103.8698
      offset-left=-32 offset-top=-32>
    </mapbox-gl-marker>

    <mapbox-gl-marker
      latitude=1.3541 longitude=103.8718
      offset-left=-64 offset-top=-30>
      <div class="textbox">Some text here</div>
      <div class="arrow-down"></div>
    </mapbox-gl-marker>

</mapbox-gl>
```

### Styling

The following custom properties and mixins are available for styling:

Custom property | Description | Default
--- | --- | ---
`--mapbox-map` | mixin applied to the map div element | `{}`
