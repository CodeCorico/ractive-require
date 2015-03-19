(function() {
  'use strict';

  function _requireElement(parent, element, callback, forceNoScript, forceNoCSS) {
    forceNoScript = forceNoScript || false;

    var src = element.getAttribute('src'),
        name = element.getAttribute('name') || src,
        noScript = forceNoScript || element.getAttribute('no-script') == 'true',
        noCSS = forceNoCSS || element.getAttribute('no-css') == 'true';

    element.setAttribute('loaded', 'true');

    if (!window.Ractive.templates[name]) {

      if (!noScript) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src + '.js';
        script.onload = function() {
          _requireElement(parent, element, callback, true, noCSS);
        };
        document.getElementsByTagName('head')[0].appendChild(script);

        return;
      }

      if (!noCSS) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = src + '.css';
        link.onload = function() {
          _requireElement(parent, element, callback, noScript, true);
        };
        document.getElementsByTagName('head')[0].appendChild(link);

        return;
      }

      window.Ractive.getHtml(src + '.html')
        .then(function(template) {
          window.Ractive.templates[name] = template;

          _requireElement(parent, element, callback);
        });

      return;
    }

    var template = window.Ractive.templates[name];

    element.innerHTML = '';

    window.Ractive.fireController(name, function Component(config) {
      config = config || {};

      config.el = config.el || element;
      config.template = config.template || template;

      return new window.Ractive(config);
    }, element, template);

    if (callback) {
      callback();
    }
  }

  window.Ractive.templates = window.Ractive.templates || {};

  window.Ractive.prototype.require = function() {
    var _this = this;

    return new window.Ractive.Promise(function(fulfil) {

      var elements = _this.findAll('rv-require[src]:not([loaded="true"])'),
          count = elements.length;

      if (count < 1) {
        return fulfil();
      }

      elements.forEach(function(element) {
        _requireElement(_this, element, function() {
          --count;
          if (count < 1) {
            fulfil();
          }
        });
      });

    });
  };

})();
