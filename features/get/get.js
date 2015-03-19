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
