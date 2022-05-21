import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer.js';
/**
 * `mapbox-gl-control`
 * Mapbox Elements for Polymer 3
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class MapboxGlControl extends PolymerElement {
    static get template() {
        return html `
      <style>
        :host {
          display: block;
        }
      </style>
      <slot></slot>
    `;
    }
    static get properties() {
        return {
            /**
             * The mapbox `map` object to add the control to.
             * @type {Mapbox.map}
             */
            map: {
                type: Object,
                observer: "_mapObject"
            },
            /**
             * Where to position the control: `top-left` ,  `top-right`,
             * `bottom-left`, and  `bottom-right`.
             * @type {String}
             */
            position: {
                type: String,
                value: null
            },
            /**
             * The name of the IControl (e.g. `NavigationControl`) to add to the map.
             * Alternatively, you can pass in the actual reference to a custom IControl
             * with the `icontrol` property.
             * @type {String}
             */
            icontrolName: {
                type: String
            },
            /**
             * The options to pass to the constructor for `icontrol`.
             * @type {Object}
             */
            icontrolOptions: {
                type: Object,
                value: null
            },
            /**
             * Reference to the IControl instance to add to the map. If this is
             * provided, `icontrol-name` and `icontrol-options` will be ignored.
             * @type {Mapbox.IControl}
             */
            icontrol: {
                type: Object,
                notify: true
            },
            /**
             * Apply to custom IControl only. Whether the control can be interacted
             * with.
             * @type {Boolean}
             */
            interactive: {
                type: Boolean,
                value: false
            },
            _container: Object,
            _childrenObserver: Object
        };
    }
    _mapObject(map) {
        console.log(map);
    }
    static get observers() {
        return [
            '_createIControl(map, icontrolName, icontrolOptions)',
            '_addControl(map, icontrol, position)'
        ];
    }
    connectedCallback() {
        super.connectedCallback();
        var slot = this.shadowRoot.querySelector('slot');
        this._childrenObserver = new FlattenedNodesObserver(
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
    }

    _slotChanged({ addedNodes }) {
        var nodes = this.shadowRoot
            .querySelector('slot')
            .assignedNodes({ flatten: true });

        if (nodes.length === 0 || this.icontrol) return;

        var self = this;

        // create custom IControl
        var CustomIControl = function() {};
        CustomIControl.prototype.onAdd = function(map) {
            if (nodes.length == 1) {
                this._container = nodes[0];
            } else {
                this._container = document.createElement('div');
                nodes.forEach(n => this._container.appendChild(n));
            }
            // apply mapbox gl default control style
            this._container.classList.toggle('interactive', self.interactive);
            this._container.classList.toggle('slotted-icontrol', true)
            self._container = this._container;
            return this._container;
        };
        CustomIControl.prototype.onRemove = function() {
            this._container.parentNode.removeChild(this._container);
            self._container = null;
        };

        this.icontrol = new CustomIControl();
    }

    _createIControl(map, icontrol, icontrolOptions) {
        if (!map || !icontrol || this.icontrol) return;
        // name of the control
        if (typeof icontrol === 'string') {
            this.icontrol = new mapboxgl[icontrol](icontrolOptions);
        } else {
            this.icontrol = new icontrol(icontrolOptions);
        }
    }

    _addControl(map, icontrol, position) {
        if (!map || !icontrol) return;
        map.addControl(icontrol, position);
    }
}

window.customElements.define('mapbox-gl-control', MapboxGlControl);