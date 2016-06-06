/*! Ractive-Require (0.6.0). (C) 2015 CodeCorico. MIT @license: en.wikipedia.org/wiki/MIT_License */
(function() {
  // Source: https://github.com/ractivejs/ractive-load/blob/master/src/utils/get.js
  // Author: Rich-Harris (https://github.com/Rich-Harris)

  'use strict';

  var getHtml;

  // Test for XHR to see if we're in a browser...
  if (typeof XMLHttpRequest !== 'undefined') {
    getHtml = function(url) {
      return new window.Ractive.Promise(function(fulfil, reject) {
        var xhr, onload, loaded;

        xhr = new XMLHttpRequest();
        xhr.open('GET', url);

        onload = function() {
          if ((xhr.readyState !== 4) || loaded) {
            return;
          }

          fulfil(xhr.responseText);
          loaded = true;
        };

        xhr.onload = xhr.onreadystatechange = onload;
        xhr.onerror = reject;
        xhr.send();

        if (xhr.readyState === 4) {
          onload();
        }
      });
    };
  }

  // ...or in node.js
  else {
    getHtml = function(url) {
      return new window.Ractive.Promise(function(fulfil, reject) {
        require('fs').readFile(url, function(err, result) {
          if (err) {
            return reject(err);
          }

          fulfil(result.toString());
        });
      });
    };
  }

  window.Ractive.getHtml = getHtml;

})();

(function() {
  'use strict';

  var _controllers = {};

  window.Ractive.controller = function(name, controller) {
    _controllers[name] = _controllers[name] || [];

    if (typeof controller == 'function') {
      _controllers[name].push(controller);
    }
  };

  function _callControllers(controllers, component, data, el, config, i, callback) {
    if (i < controllers.length) {
      controllers[i](component, data, el, config, function done() {
        _callControllers(controllers, component, data, el, config, ++i, callback);
      });
    }
    else if (callback) {
      callback();
    }
  }

  window.Ractive.fireController = function(name, component, data, el, config, callback, tries) {
    tries = tries === false ? tries : (tries || 0) + 1;

    if (_controllers[name]) {
      _callControllers(_controllers[name], component, data, el, config, 0, callback);
    }
    else if (tries !== false && tries < 500) {
      setTimeout(function() {
        window.Ractive.fireController(name, component, data, el, config, callback, tries);
      }, 10);
    }
    else if (callback) {
      callback();
    }
  };

})();

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
          template = _applyAbsolutePath(template, src);

          callback(target, template);
        });

      return;
    }

    callback(target, rvPartial.innerHTML);
  }

  function _fetchPartials(element, parent) {
    return new window.Ractive.Promise(function(fulfil) {
      var partials = {},
          rvPartials = element.querySelectorAll('rv-partial'),
          count = rvPartials.length,
          partialName;

      for (partialName in parent.partials) {
        partials[partialName] = parent.partials[partialName];
      }

      if (!count) {
        return fulfil(partials);
      }

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

  function _fetchDataBinding(element, parent) {
    var data = {},
        binds = {},
        events = {},
        attr,
        name;

    for (var i = 0; i < element.attributes.length; i++) {
      attr = element.attributes[i];

      if (attr.name.indexOf('data-on-') === 0) {
        name = attr.name.substr(8, attr.name.length - 8);
        events[name] = attr.value;
      }
      else if (attr.name.indexOf('data-bind-') === 0) {
        name = attr.name.substr(10, attr.name.length - 10);
        data[name] = parent.get(attr.value);
        binds[name] = attr.value;
      }
      else if (attr.name.indexOf('data-') === 0) {
        name = attr.name.substr(5, attr.name.length - 5);
        data[name] = attr.value;
      }
    }

    return {
      data: data,
      binds: binds,
      events: events
    };
  }

  function _applyAbsolutePath(template, src) {
    var newSrc = src.split('/'),
        a = document.createElement('a'),
        host = window.location.protocol + '//' + window.location.host;

    return template.replace(/[^-]src="(.*?)"/g, function(match, elementSrc) {
      if (
        elementSrc.indexOf('{') === 0 ||
        elementSrc.indexOf('/') === 0 ||
        elementSrc.indexOf('http://') === 0 ||
        elementSrc.indexOf('https://') === 0
      ) {
        return match;
      }

      newSrc.pop();
      newSrc.push(elementSrc);

      a.href = newSrc.join('/');

      return match.replace(elementSrc, a.href.substr(host.length, a.href.length - host.length));
    });
  }

  function _createObserver(parent, view, bind, keypath) {
    return parent.observe(keypath, function(value) {
      view.set(bind, value);
    });
  }

  function _findChilden(ractive, attribute, value, onlyOne) {
    var children = [];

    if (ractive.childrenRequire && ractive.childrenRequire.length) {
      for (var i = 0; i < ractive.childrenRequire.length; i++) {
        if (ractive.childrenRequire[i].el.getAttribute(attribute) == value) {
          if (onlyOne) {
            return ractive.childrenRequire[i];
          }

          children.push(ractive.childrenRequire[i]);
        }

        var nextChildren = _findChilden(ractive.childrenRequire[i], attribute, value, onlyOne);
        if (onlyOne && nextChildren) {
          return nextChildren;
        }
        else if (!onlyOne && nextChildren.length) {
          children = children.concat(nextChildren);
        }
      }
    }

    return onlyOne ? null : children;
  }

  function _findParents(ractive, attribute, value, onlyOne) {
    var parents = [];

    if (ractive.parentRequire) {
      if (ractive.parentRequire.el.getAttribute(attribute) == value) {
        if (onlyOne) {
          return ractive.parentRequire;
        }

        parents.push(ractive.parentRequire);
      }

      var nextParent = _findParents(ractive.parentRequire, attribute, value, onlyOne);
      if (onlyOne && nextParent) {
        return nextParent;
      }
      else if (!onlyOne && nextParent.length) {
        parents = parents.concat(nextParent);
      }
    }

    return onlyOne ? null : parents;
  }

  function _cleanCls(element, cls, add, remove) {
    var className = element.className || '',
        newClassName = [];

    className.split(' ').map(function(clsName) {
      clsName = clsName.trim();
      if (clsName && ((!add && !remove) || clsName != cls)) {
        newClassName.push(clsName);
      }
    });

    if (add) {
      newClassName.push(cls);
    }

    element.className = newClassName.join(' ');
  }

  function _addCls(element, cls) {
    _cleanCls(element, cls, true);
  }

  function _removeCls(element, cls) {
    _cleanCls(element, cls, false, true);
  }

  function _requireElement(parent, element, callback, forceNoScript, forceNoCSS) {
    forceNoScript = forceNoScript || false;

    var src = element.getAttribute('src'),
        name = element.getAttribute('name'),
        noScript = forceNoScript || element.getAttribute('no-script') == 'true',
        noCSS = forceNoCSS || element.getAttribute('no-css') == 'true';

    if (!src) {
      throw new Error('nv-require needs to have a "src" attrbute');
    }

    if (!name) {
      throw new Error('nv-require needs to have a "name" attrbute');
    }

    element.setAttribute('loaded', 'true');
    _addCls(element, 'rv-require-loaded');

    if (!window.Ractive.templates[name]) {

      if (!noCSS) {
        return window.Ractive.require(src + '.css').then(function() {
          _requireElement(parent, element, callback, noScript, true);
        });
      }

      if (!noScript) {
        return window.Ractive.require(src + '.js').then(function() {
          _requireElement(parent, element, callback, true, noCSS);
        });
      }

      window.Ractive.getHtml(src + '.html')
        .then(function(template) {
          template = _applyAbsolutePath(template, src);

          window.Ractive.templates[name] = template;

          _requireElement(parent, element, callback);
        });

      return;
    }

    var template = window.Ractive.templates[name],
        databinding = _fetchDataBinding(element, parent),
        initialHTML = element.innerHTML;

    _fetchPartials(element, parent)
      .then(function(partials) {

        element.innerHTML = '';

        window.Ractive.fireController(name, function component(config) {
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
          config.parentRequire = parent;

          var ractive = new window.Ractive(config),
              observers = [],
              bind;

          for (bind in databinding.binds) {
            observers.push(_createObserver(parent, ractive, bind, databinding.binds[bind]));
            observers.push(_createObserver(ractive, parent, databinding.binds[bind], bind));
          }

          ractive.on('unrender', function() {
            element.removeAttribute('loaded');
            _removeCls(element, 'rv-require-loaded');

            ractive.parentRequire = null;

            var i;

            if (observers && observers.length) {
              for (i = 0; i < observers.length; i++) {
                observers[i].cancel();
              }
            }

            observers = null;

            if (parent && parent.childrenRequire) {
              for (i = 0; i < parent.childrenRequire.length; i++) {
                if (parent.childrenRequire[i] === ractive) {
                  parent.childrenRequire.splice(i, 1);
                  break;
                }
              }
            }

            if (ractive.childrenRequire && ractive.childrenRequire.length) {
              for (i = ractive.childrenRequire.length - 1; i >= 0; i--) {
                ractive.childrenRequire[i].teardown();
              }
            }
          });

          ractive.on('teardown', function() {
            element.innerHTML = initialHTML;
          });

          ractive.childrenRequire = [];

          var methodsToElements = [ractive];
          if (!parent.findParents) {
            methodsToElements.push(parent);
          }

          methodsToElements.forEach(function(methodsToElement) {
            methodsToElement.findParents = function(attribute, value) {
              return _findParents(methodsToElement, attribute, value);
            };

            methodsToElement.findParent = function(attribute, value) {
              return _findParents(methodsToElement, attribute, value, true);
            };

            methodsToElement.findChildren = function(attribute, value) {
              return _findChilden(methodsToElement, attribute, value);
            };

            methodsToElement.findChild = function(attribute, value) {
              return _findChilden(methodsToElement, attribute, value, true);
            };
          });

          _fireBindedEvent(parent, ractive, databinding);

          parent.childrenRequire.push(ractive);

          return ractive;
        }, databinding.data, element, {
          template: template,
          partials: partials
        }, function() {
          if (callback) {
            callback();
          }
        });

      });
  }

  function _fireBindedEvent(parent, ractive, databinding) {
    var fireevent = function(event, name) {
      ractive.on(event, function() {
        Array.prototype.unshift.call(arguments, name);

        parent.apply(parent, arguments);
      });
    };

    for (var event in databinding.events) {
      if (!databinding.events.hasOwnProperty(event)) {
        continue;
      }

      fireevent(event, databinding.events[event]);
    }
  }

  function _inScope(element, parent) {
    if (element.parentNode != parent) {
      if (element.parentNode.tagName.toLowerCase() == 'rv-require') {
        return false;
      }

      return _inScope(element.parentNode, parent);
    }

    return true;
  }

  function _inject(name, file, elementConstructor, callback) {
    name = name.split('/').pop();

    if (window.Ractive.injects.indexOf(name) > -1) {
      return callback();
    }

    var element = elementConstructor();
    element.onload = callback;

    window.Ractive.injects.push(name);
    document.getElementsByTagName('head')[0].appendChild(element);
  }

  function _injectJS(name, file, callback) {
    _inject(name, file, function() {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = file;

      return script;
    }, callback);
  }

  function _injectCSS(name, file, callback) {
    _inject(name, file, function() {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = file;

      return link;
    }, callback);
  }

  window.Ractive.templates = window.Ractive.templates || {};
  window.Ractive.injects = window.Ractive.injects || [];

  window.Ractive.require = function(name, file) {
    var extension = null;

    if (!name) {
      throw new Error('You have to specify a file/name');
    }

    file = file || name;

    extension = (file.split('.').pop() || '').toLowerCase();
    if (extension == 'js') {
      return new window.Ractive.Promise(function(fulfil) {
        _injectJS(name, file, fulfil);
      });
    }
    else if (extension == 'css') {
      return new window.Ractive.Promise(function(fulfil) {
        _injectCSS(name, file, fulfil);
      });
    }
  };

  window.Ractive.prototype.require = function(name) {
    name = name || null;

    var _this = this;

    this.childrenRequire = this.childrenRequire || [];

    return new window.Ractive.Promise(function(fulfil) {

      var elements = name ?
            _this.el.querySelectorAll('rv-require[src][ondemand="' + name + '"]:not([loaded="true"])') :
            _this.el.querySelectorAll('rv-require[src]:not([loaded="true"]):not([ondemand])'),
          count = elements.length;

      if (count < 1) {
        return fulfil();
      }

      [].forEach.call(elements, function(element) {

        if (_inScope(element, _this.el)) {
          _requireElement(_this, element, function() {
            --count;
            if (count < 1) {
              fulfil();
            }
          });
        }
        else {
          --count;
          if (count < 1) {
            fulfil();
          }
        }
      });

    });
  };

})();
