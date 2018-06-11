class MapboxGlPopup extends Polymer.Element {
  static get is() {
    return 'mapbox-gl-popup';
  }

  static get properties() {
    return {
      /**
       * The mapbox `map` object to add the control to.
       * @type {Mapbox.map}
       */
      map: {
        type: Object
      },
      /**
       * Reference to the current `Mapbox.Popup` object.
       * @type {Mapbox.Popup}
       */
      popup: {
        type: Object,
        notify: true,
        computed:
          '_createPopup(map, closeButton, closeOnClick, offset, top, topLeft, topRight, bottom, bottomLeft, bottomRight, left, right)'
      },
      /**
       * The id of the `mapbox-gl-marker` element that the popup is attached to.
       * This element must be a sibling of the popup.
       * @type {String}
       */
      for: {
        type: String,
        value: null
      },
      /**
       * The specified `Mapbox.Marker` object or `mapbox-gl-marker` element that
       * the popup is attached to. Will overwrite `for` property.
       * @type {Mapbox.Marker}
       */
      attachToMarker: {
        type: Object,
        value: null
      },
      /**
       * Set to `true` to show the popup (i.e. attach the popup to the map)
       * @type {Boolean}
       */
      opened: {
        type: Object,
        notify: true,
        value: false
      },
      /**
       * latitude to anchor the popup to.
       * @type {Number}
       */
      latitude: {
        type: Number
      },
      /**
       * longitude to anchor the popup to.
       * @type {Number}
       */
      longitude: {
        type: Number
      },
      /**
       * If  true , a close button will appear in the top right corner of the
       * popup.
       * @type {Boolean}
       */
      closeButton: {
        type: Boolean,
        value: false
      },
      /**
       * If  true , the popup will closed when the map is clicked.
       * @type {Boolean}
       */
      closeOnClick: {
        type: Boolean,
        value: false
      },
      /**
       * Sets the popup's content to a string of text.
       *
       * This function creates a Text node in the DOM, so it cannot insert raw
       * HTML. Use this method for security against XSS if the popup content is
       * user-provided.
       * @type {String}
       */
      text: {
        type: String,
        value: null,
        observer: 'setText'
      },
      /**
       * Sets the popup's content to the HTML provided as a string.
       *
       * This method does not perform HTML filtering or sanitization, and must
       * be used only with trusted content. Consider `test` if the content is
       * an untrusted text string.
       * @type {String}
       */
      html: {
        type: String,
        value: null,
        observer: 'setHTML'
      },
      /**
       * A string indicating the part of the Popup that should be positioned
       * closest to the coordinate set via Popup#setLngLat.
       *
       * Options are  'top' ,  'bottom' ,  'left' , 'right' ,  'top-left' ,
       * 'top-right' ,  'bottom-left' , and  'bottom-right' .
       *
       * If unset the anchor will be dynamically set to ensure the popup falls
       * within the map container with a preference for  'bottom' .
       * @type {String}
       */
      anchor: {
        type: String,
        value: null
      },
      /**
       * A single number specifying a distance from the popup's location.
       * @type {Number}
       */
      offsetDistance: {
        type: Number,
        value: null
      },
      /**
       * A constant x-y offset from the popup's location. Overwrites
       * `offset-distance`.
       * @type {[Number, Number]}
       */
      offset: {
        type: Array,
        value: null
      },
      /**
       * A x-y offset from the popup's `top` location.
       * @type {[Number, Number]}
       */
      top: {
        type: Array,
        value: null
      },
      /**
       * A x-y offset from the popup's `top-left` location.
       * @type {[Number, Number]}
       */
      topLeft: {
        type: Array,
        value: null
      },
      /**
       * A x-y offset from the popup's `top-right` location.
       * @type {[Number, Number]}
       */
      topRight: {
        type: Array,
        value: null
      },
      /**
       * A x-y offset from the popup's `bottom` location.
       * @type {[Number, Number]}
       */
      bottom: {
        type: Array,
        value: null
      },
      /**
       * A x-y offset from the popup's `bottom-left` location.
       * @type {[Number, Number]}
       */
      bottomLeft: {
        type: Array,
        value: null
      },
      /**
       * A x-y offset from the popup's `bottom-right` location.
       * @type {[Number, Number]}
       */
      bottomRight: {
        type: Array,
        value: null
      },
      /**
       * A x-y offset from the popup's `left` location.
       * @type {[Number, Number]}
       */
      left: {
        type: Array,
        value: null
      },
      /**
       * A x-y offset from the popup's `right` location.
       * @type {[Number, Number]}
       */
      right: {
        type: Array,
        value: null
      },
      _childrenObserver: Polymer.FlattenedNodesObserver,
      _container: Object,
      _closeListener: Object
    };
  }

  static get template() {
    return Polymer.html`
    <style>
      :host { display: block; }
    </style>
    <slot name="popup-content"></slot>
    `;
  }

  static get observers() {
    return [
      '_attachedPopup(popup, opened, attachToMarker, for)',
      'setLngLat(longitude, latitude)'
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    var slot = this.shadowRoot.querySelector('slot');
    this._childrenObserver = new Polymer.FlattenedNodesObserver(
      slot,
      this._slotChanged.bind(this)
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._childrenObserver) {
      this._childrenObserver.disconnect();
      this._childrenObserver = null;
    }
    if (this.popup) {
      this.popup.remove();
      this.popup.off(this._closeListener);
      this.popup = null;
    }
  }

  _createPopup(
    map,
    closeButton,
    closeOnClick,
    offset,
    top,
    topLeft,
    topRight,
    bottom,
    bottomLeft,
    bottomRight,
    left,
    right
  ) {
    if (!window.mapboxgl) return null;
    if (this.popup) {
      this.popup.remove();
      this.popup.off(this._closeListener);
    }

    offset = offset || {
      top,
      topLeft,
      topRight,
      bottom,
      bottomLeft,
      bottomRight,
      left,
      right
    };
    var popup = new window.mapboxgl.Popup({
      offset,
      closeButton,
      closeOnClick
    });
    this._closeListener = () => {
      this.opened = false;
    };
    popup.on('close', this._closeListener);
    return popup;
  }

  _attachedPopup(popup, opened, attachToMarker, id) {
    if (!popup) return;

    if (id) {
      attachToMarker =
        this.parentNode.querySelector(`#${id}`) || attachToMarker;
    }

    if (attachToMarker) {
      this._updatePopup();
      attachToMarker.setPopup(this.popup);
    } else if (opened) {
      this._updatePopup();
      this.popup.addTo(this.map);
    } else {
      this.popup.remove();
    }
  }

  _updatePopup() {
    //this.setText(this.text);
    this.setHTML(this.html);
    this.setLngLat(this.longitude, this.latitude);
    this._slotChanged();
  }

  show() {
    this.opened = true;
    return this;
  }

  setText(text) {
    if (!this.popup || text == null) return this;
    return this.popup.setText(text);
  }

  setHTML(html) {
    if (!this.popup || html == null) return this;
    return this.popup.setHTML(html);
  }

  setLngLat(longitude, latitude) {
    if (!this.popup || this.latitude == null || this.longitude == null)
      return this;
    return this.popup.setLngLat([longitude, latitude]);
  }

  _slotChanged() {
    if (!this.popup) return;
    var nodes = this.shadowRoot
      .querySelector('slot[name=popup-content]')
      .assignedNodes({ flatten: true });

    if (!nodes || nodes.length == 0) {
      return;
    }

    if (nodes.length == 1) {
      this._container = nodes[0];
    } else {
      this._container = document.createElement('div');
      nodes.forEach(n => this._container.appendChild(n));
    }
    this.popup.setDOMContent(this._container);
  }
}

window.customElements.define(MapboxGlPopup.is, MapboxGlPopup);
