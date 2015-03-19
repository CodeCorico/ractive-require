(function() {
  'use strict';

  function _requirePartial(rvPartial, callback) {
    var src = rvPartial.getAttribute('src') || false,
        target = rvPartial.getAttribute('target');

    if (!target) {
      return callback(false);
    }

    if (src) {
      window.Ractive.getHtml(src)
        .then(function(template) {
          callback(target, template);
        });

      return;
    }

    callback(target, rvPartial.innerHTML);
  }

  function _fetchPartials(element) {
    return new window.Ractive.Promise(function(fulfil) {
      var partials = {},
          rvPartials = element.querySelectorAll('rv-partial'),
          count = rvPartials.length;

      Array.prototype.map.call(rvPartials, function(rvPartial) {
        _requirePartial(rvPartial, function(target, template) {
          if (target) {
            partials[target] = template;
          }

          --count;
          if (count < 1) {
            fulfil(partials);
          }
        });
      });
    });
  }

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

    _fetchPartials(element)
      .then(function(partials) {

        console.log(partials);

        element.innerHTML = '';

        window.Ractive.fireController(name, function Component(config) {
          config = config || {};

          config.el = config.el || element;
          config.template = config.template || template;
          if (config.partials) {
            var partial;

            for (partial in config.partials) {
              partials[partial] = config.partials[partial];
            }
          }
          config.partials = partials;

          return new window.Ractive(config);
        }, element, template);

        if (callback) {
          callback();
        }
      });
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
