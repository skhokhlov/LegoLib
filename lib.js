(function (window, Promise) {
    'use strict';

    /**
     * LegoLib
     * @type {{}}
     * @version 1.0.0
     */
    var lego = {};


    /* Promises
     */
    if (typeof Promise.prototype.done !== 'function') {
        Promise.prototype.done = function (onFulfilled, onRejected) {
            var self = arguments.length ? this.then.apply(this, arguments) : this;
            self.then(null, function (err) {
                setTimeout(function () {
                    throw err;
                }, 0);
            });
        };
    }

    /**
     * Sets cookie
     *
     * @param name
     * @param value
     * @param time
     */
    lego.setCookie = function (name, value, time) {
        var age = new Date(new Date().getTime() + time * 100000);
        document.cookie = name + '=' + value + '; expires=' + age.toUTCString();
    };

    /**
     * Reads value of cookie
     *
     * @param name
     * @returns {string}
     */
    lego.getCookie = function (name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };

    /**
     * Gets value of URL parameter
     *
     * @param name
     * @returns {string|null}
     */
    lego.getURLParameter = function (name) {
        //return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    };

    /**
     * Gets user locale
     * @returns {string}
     */
    lego.getLocale = function () {
        return window.navigator.language ? window.navigator.language : window.navigator.userLanguage;
    };

    /**
     * XHR GET async request to url with Promises
     * @param url
     * @returns {Promise}
     */
    lego.request = function (url) {
        return new Promise(function (resolve, reject) {
            var Request = new XMLHttpRequest();
            Request.open('GET', url, true);
            Request.onload = function () {
                if (Request.status === 200) {
                    resolve(Request.response);
                } else {
                    reject(Error(Request.statusText));
                }
            };
            Request.onerror = function () {
                reject(Error("Network Error"));
            };
            Request.send(null);
        });
    };

    /**
     * Blob constructor
     * @param content
     * @param type
     * @param id
     * @constructor
     */
    lego.BlobConstructor = function (content, type, id) {
        window.URL = window.URL || window.webkitURL;

        var blob = new Blob(content, {type: type});

        if (type === 'text/css') {
            var link = document.createElement('link');
            link.id = id;
            link.rel = 'stylesheet';
            link.href = window.URL.createObjectURL(blob);
            document.head.appendChild(link);
        } else if (type === 'text/javascript') {
            var script = document.createElement('script');
            script.id = id;
            script.src = window.URL.createObjectURL(blob);
            document.head.appendChild(script);
        }
    };

})(window, Promise);