(function() {
  'use strict';

  var _controllers = {};

  window.Ractive.controller = function(name, controller) {
    _controllers[name] = _controllers[name] || [];

    if (typeof controller == 'function') {
      _controllers[name].push(controller);
    }
  };

  function _callControllers(controllers, Component, el, template, i) {
    i = i || 0;

    if (i < controllers.length) {
      controllers[i](Component, el, template, function() {
        _callControllers(controllers, Component, el, template, ++i);
      });
    }
  }

  window.Ractive.fireController = function(name, Component, el, template) {
    if (_controllers[name]) {
      _callControllers(_controllers[name], Component, el, template);
    }
  };

})();
