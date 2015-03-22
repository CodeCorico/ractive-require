# Ractive-Require

Require Ractive views on demand in Package by Feature way.

## Follow the project

* [Licence](https://github.com/XavierBoubert/ractive-require/blob/master/LICENSE)
* [Changelog](https://github.com/XavierBoubert/ractive-require/blob/master/CHANGELOG.md)
* [Milestones](https://github.com/XavierBoubert/ractive-require/issues/milestones?state=open)

## Installation

Copy the [dist](https://github.com/XavierBoubert/ractive-require/tree/master/dist) folder into your project and include ```ractive-require.js``` or ```ractive-require.min.js``` (production) file in your HTML page **after** Ractive.

## How to use

 - [Introduction](#introduction)
 - [Require a feature](#require)
 - [Control a feature](#control)
 - [Cache](#cache)
 - [Only HTML](#only-html)

### <a name="introduction"></a> Introduction

Ractive-Require load and make Ractive views on demand. A component describe in this documentation is not a standard Ractive component. It doesn't register to ```Ractive.components``` and it's not a ```Ractive.extend```.

The goal is to define features in the HTML pages (only) then use them when necessary.

### <a name="require"></a> Require a feature

To require a feature, use the HTML tag ```<rv-require>``` in your page with a _name_ and a _src_:

```HTML
<body>

  <rv-require name="button" src="components/button"></rv-require>

</body>
```

The missing file extension is assumed.

At this point, nothing happens, the feature is loaded **on demand**.

To fire the feature, we have to use the Ractive container view:

```javascript

// Create a view from the <body> element

var ractive = new Ractive({
  el: 'body',
  template: document.body.innerHTML
});

// Call the require() method to fire the rv-require injection

ractive.require().then(function() {
  console.log('done');
});

```

Firstly, Ractive-Require add to the ```<head>``` element:
 - ```components/button.css```
 - ```components/button.js```

Then it get the ```components/button.html``` template. The feature is loaded.

The HTML template still continues to be a Mustache template with data-binding.

### <a name="control"></a> Control a feature

When a ```<rv-require>``` is loaded, a ```Ractive.controller``` is fired. You can wrap it for your feature to get the feature definition and other things:

```javascript

// Declare a controller for "button"
Ractive.controller('button', function(Feature, data, el, config, done) {

  // Like a standard component, "Feature" is a pre-configured view
  // It already contains template, partials and the destination element
  var ractive = new Feature({
    data: data
  });

  // When your controller logic is done
  // It's possible de declare many controllers for the same feature
  done();

});

```

Now your feature is totally applied in the DOM and you have its control!

### <a name="cache"></a> Cache

Each feature template is cached by its name. If you declare:

```HTML
<body>

  <rv-require name="button" src="components/button"></rv-require>
  <rv-require name="button" src="components/button"></rv-require>

</body>
```

The second _button_ does not reload the JavasScript and CSS fles in the head and re-use the template content.

### <a name="only-html"></a> Only HTML

To avoid loading the CSS or JavaScript files, you can add ```no-script="true"``` and/or ```no-css="true"```:

```HTML
<body>

  <rv-require name="button" src="components/button" no-script="true" no-css="true"></rv-require>

</body>
```

## Contribute

To contribute to the project, read the [Contribution guidelines](https://github.com/XavierBoubert/ractive-require/blob/master/CONTRIBUTING.md).
After that, you can create your own Pull Requests (PR) and submit them here.

## Lead contribution team

* [Xavier Boubert](http://xavierboubert.fr) [@xavierboubert](http://twitter.com/XavierBoubert)
