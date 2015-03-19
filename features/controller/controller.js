(function() {
  'use strict';

  var _controllers = {};

  window.Ractive.controller = function(name, controller) {
    _controllers[name] = _controllers[name] || [];

    if (typeof controller == 'function') {
      _controllers[name].push(controller);
    }
  };

  function _callControllers(controllers, Component, data, el, config, i) {
    i = i || 0;

    if (i < controllers.length) {
      controllers[i](Component, data, el, config, function() {
        _callControllers(controllers, Component, data, el, config, ++i);
      });
    }
  }

  window.Ractive.fireController = function(name, Component, data, el, config) {
    if (_controllers[name]) {
      _callControllers(_controllers[name], Component, data, el, config);
    }
  };

})();
