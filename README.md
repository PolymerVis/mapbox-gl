mapbox-gl [![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/PolymerVis/mapbox-gl)
==========

<!---
```
<custom-element-demo>
    <template is="dom-bind" id="demo">
      <script src="https://api.mapbox.com/mapbox-gl-js/v0.32.1/mapbox-gl.js"></script>
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
  <!-- please use your own mapbox access token!! -->
  <mapbox-gl id="map"
    interactive
    map="{{map}}"
    map-style-url="mapbox://styles/mapbox/dark-v9"
    script-src="https://api.mapbox.com/mapbox-gl-js/v0.32.1/mapbox-gl.js"
    access-token="pk.eyJ1IjoiZXRlcm5hMiIsImEiOiJjaXppZjRoaTIwMmYxMndsNHJ4dzR1eWJsIn0.MvJ5fsV47RHlSAt2fBEKLg"
    zoom=10
    pitch=45
    bearing=0></mapbox-gl>
```

### Usage
You can find more examples and documentations at [`mapbox-gl` webcomponents page](https://www.webcomponents.org/element/PolymerVis/mapbox-gl).

### Installation

```
bower install --save mapbox-gl
```

### Disclaimers
PolymerVis is a personal project and is NOT in any way affliated with Mapbox, Polymer or Google.

### Summary

[Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/api/) is a JavaScript library
that uses WebGL to render interactive maps from vector tiles and Mapbox styles..

`mapbox-gl` is the Polymer element that wraps around mapbox-gl-js to provide powerful mapping capabilities to your app as a webcomponent.

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

Alternatively, you can bind the data directly to the `mapbox-layer` via
`source-data` attribute with the format `{type: String, data: String|Object}`.

Then you can render the geojson via the `mapbox-layer`
(e.g. rendering-type = line or fill).

Note that you will need to bind the corresponding `map` object from
`mapbox-gl` element to both `geojson-source` element and `mapbox-layer` element.

<b>Example</b>

```html
<mapbox-gl id="map"
  interactive
  map="{{map}}"
  map-style-url="mapbox://styles/mapbox/dark-v9"
  access-token="<MAPBOX_ACCESS_TOKEN>"
  latitude=1.3521
  longitude=103.8698
  zoom=2></mapbox-gl>

<!-- reference source from geojson-source -->
<mapbox-layer
  map="[[map]]"
  layer-id="coastline_fill"
  rendering-type="fill"
  source="geojsonsrc"
  color="#009688"
  opacity=0.7></mapbox-layer>

<!-- input source directly into layer -->
<mapbox-layer
  map="[[map]]"
  layer-id="coastline_outline"
  rendering-type="line"
  source-data='{"type": "geojson", "data": "SOME_URL.geojson"}'
  color="#eee"
  line-width=2></mapbox-layer>

<geojson-source
  map="[[map]]"
  source-id="geojsonsrc"
  source-url="https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_land.geojson"></geojson-source>
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

### Add a Geocoder control
To add a search input to `mapbox-gl`, you can use the `mapbox-gl-geocoder` element
which uses the Mapbox Geocoding API to search for places. You just need to ensure
the `mapbox-gl-geocoder` is a child of `mapbox-gl`.

<b>Example</b>
```html
<mapbox-gl interactive access-token="[accessToken]">

  <mapbox-gl-geocoder
    fly-to
    limit=5
    placeholder="Type to search"></mapbox-gl-geocoder>

</mapbox-gl>
```

### Handling events
To handle `click` event on a specific `map-layer`, you can listen for the
`mapbox-layer-click` event. The event will return the feature of the geometry
that is clicked upon.
```html
<mapbox-layer
  map="[[map]]"
  layer-id="coastline_fill"
  rendering-type="fill"
  source-data="[[geojsonsrc]]"
  color="#009688"
  opacity=0.7
  events-to-watch="click"
  on-mapbox-layer-click="handleClick"></mapbox-layer>
```
```js
function handleClick(e, {features}) {
  if (features.length > 0) {
    alert(features[0].properties.COSTAL_NAM);
  }
}
```

### Data-driven styling
To create a data-driven style for a attribute, just pass in a JSON object
instead of a constant variable.

more details @ https://www.mapbox.com/mapbox-gl-js/style-spec/#types-function

<b>Example</b>
```html

  <mapbox-gl id="map"
    interactive
    map="{{map}}"
    map-style="mapbox://styles/mapbox/dark-v9"
    access-token="<MAPBOX_ACCESS_TOKEN>"
    latitude=40.66995747013945
    longitude=-103.59179687498357
    zoom=3></mapbox-gl>

  <mapbox-layer
    map="[[map]]"
    layer-id="country"
    rendering-type="fill"
    source="geojsonsrc"
    color="[[color]]"
    filter="[[filter]]"></mapbox-layer>

  <geojson-source
    map="[[map]]"
    source-id="geojsonsrc"
    source-url="https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson"></geojson-source>
```
color
```js
{
  property: 'continent',
  type: 'categorical',
  stops: [
    ['Africa', '#FAA'],
    ['Asia', '#AAF']
  ]
}
```
filter
```js
['in', 'continent', 'Africa', 'Asia']
```

### Create a heatmap
To create a heatmap, create a `geojson-source` with `cluster` to loaded a
clustered data. Then create a `mapbox-heatmap-layer` with the corresponding
`source`.

<b>Example</b>
```html

  <mapbox-gl id="map"
    interactive
    map="{{map}}"
    map-style="mapbox://styles/mapbox/dark-v9"
    access-token="<MAPBOX_ACCESS_TOKEN>"
    latitude=40.66995747013945
    longitude=-103.59179687498357
    zoom=3></mapbox-gl>

  <mapbox-heatmap-layer
    map="[[map]]"
    layer-id="heatmap"
    source="geojsonsrc"
    radius=80
    color="rgba(0, 200, 0, 0.3)"
    opacity=0.2
    levels="[[levels]]"></mapbox-heatmap-layer>

  <geojson-source
    cluster
    cluster-max-zoom=15
    cluster-radius=20
    map="[[map]]"
    source-id="geojsonsrc"
    source-url="https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_parks_and_protected_lands_point.geojson"></geojson-source>
```

```javascript
levels = [{"count": 0, "color": "#EEEEEE", "radius": 2, "opacity": 0.5},
          {"count": 5, "color": "#2196F3"},
          {"count": 8, "color": "#FFC107"},
          {"count": 10, "color": "#F44336"}];

```


### Styling

The following custom properties and mixins are available for styling:

Custom property | Description | Default
--- | --- | ---
`--mapbox-map` | mixin applied to the map div element | `{}`
`--mapbox-canvas` | mixin applied to the canvas element for the map | `{}`
`--mapbox-gl-marker` | mixin applied to the marker element | `{}`
