/**
 * PolymerVis is a suite of Polymer elements for visualizations.
 * @name PolymerVis
 * @module PolymerVis
 */

(function(PolymerVis) {
    /**
     * Convenience method for dynamically loading a script.
     *
     * This method creates a new `<script>` element with the provided URL and
     * appends it to the document to start loading. In the onload callback, the
     * import property of the link element will contain the imported document
     * contents.
     *
     * @alias module:loadScript
     * @param {string} src The url to the script to load.
     * @param {Function} onload callback when script is loaded.
     * @param {Function} onerror callback when error loading script.
     * @param {boolean} optAsync whether to execute the script asynchronously.
     * @return {HTMLScriptElement}
     */
    PolymerVis.loadScript = function(src, onload, onerror, optAsync = true) {
        var ele = document.createElement('script');
        ele.src = src;
        ele.async = optAsync;
        if (onload) ele.onload = onload;
        if (onerror) ele.onerror = onerror;
        document.body.appendChild(ele);
        return ele;
    };

    /**
     * Convenience method for dynamically loading a stylesheet.
     *
     * This method creates a new `<link rel="stylesheet">` element with the
     * provided URL and appends it to the document to start loading. In the onload
     * callback, the import property of the link element will contain the
     * imported document contents.
     *
     * @alias module:loadStylesheet
     * @param {string} href The url to the script to load.
     * @param {Function} onload callback when script is loaded.
     * @param {Function} onerror callback when error loading script.
     * @param {boolean} optAsync whether to execute the script asynchronously.
     * @return {HTMLLinkElement}
     */
    PolymerVis.loadStylesheet = function(href, onload, onerror, optAsync = true) {
        var ele = document.createElement('link');
        ele.href = href;
        ele.rel = 'stylesheet';
        ele.async = optAsync;
        if (onload) ele.onload = onload;
        if (onerror) ele.onerror = onerror;
        document.body.appendChild(ele);
        return ele;
    };

    /**
     * Load an external CSS file, and insert a `style` element
     * into the shadowRoot.
     * @alias module:insertCssIntoShadowRoot
     * @param {String} cssSrc url to the css file
     * @param {String} shadowRoot Node to insert the `style` element
     * @param {Function} onload callback when CSS is inserted
     * @param {String} id id for style element
     * @example
     * PolymerVis.insertCssIntoShadowRoot('https://some.css', ele.shadowRoot, 'custom');
     */
    PolymerVis.insertCssIntoShadowRoot = function insertCssIntoShadowRoot(
        cssSrc,
        shadowRoot,
        onload,
        id = 'custom'
    ) {
        var httpRequest = new XMLHttpRequest();
        if (!httpRequest) {
            console.warn(`cannot create XMLHttpRequest to load ${cssSrc}`);
            return;
        }
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    var style =
                        shadowRoot.querySelector(`#${id}`) ||
                        document.createElement('style');
                    style.id = id;
                    style.textContent = httpRequest.responseText;
                    shadowRoot.appendChild(style);
                    if (onload) onload(style);
                } else {
                    console.warn(`cannot load ${cssSrc}`);
                }
            }
        };
        httpRequest.open('GET', cssSrc);
        httpRequest.send();
    };

    /**
     * Check if the node is inside a [`shadowRoot`](https://developer.mozilla.org/en-US/docs/Web/API/shadowRoot) or not.
     * Return the `shadowRoot` otherwise return `false`.
     * @alias module:isInShadowRoot
     * @param {Node} node the node to check
     * @return {Node}
     */
    PolymerVis.isInShadowRoot = function isInShadowRoot(node) {
        while (node) {
            if (node.toString() === '[object ShadowRoot]') {
                return node;
            }
            node = node.parentNode;
        }
        return false;
    };
})((window.PolymerVis = window.PolymerVis || {}));