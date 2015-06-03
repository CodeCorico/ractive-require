# Ractive-Require

Require Ractive views on demand in Package by Feature way.

## Follow the project

* [Licence](https://github.com/XavierBoubert/ractive-require/blob/master/LICENSE)
* [Changelog](https://github.com/XavierBoubert/ractive-require/blob/master/CHANGELOG.md)
* [Milestones](https://github.com/XavierBoubert/ractive-require/issues/milestones?state=open)

## Installation

Use the CDN version:
```HTML
<script src="https://cdnjs.cloudflare.com/ajax/libs/ractive-require/0.2.3/ractive-require.min.js"></script>
```

Or copy the [dist](https://github.com/XavierBoubert/ractive-require/tree/master/dist) folder into your project and include ```ractive-require.js``` or ```ractive-require.min.js``` (production) file in your HTML page **after** Ractive.

## How to use

 - [Introduction](#introduction)
 - [Require a feature](#require)
 - [Require a file](#require-file)
 - [Control a feature](#control)
 - [Cache](#cache)
 - [Only HTML](#only-html)
 - [On demand](#on-demand)
 - [Passing arguments](#arguments)
 - [Partials](#partials)
 - [Sub requires](#sub-requires)
 - [Paths](#paths)
 - [Scopes](#scopes)
 - [Teardown](#teardown)

### <a name="introduction"></a> Introduction

Ractive-Require loads and makes Ractive features on demand. A feature is composed by a HTML template file, and its JavaScript and CSS assets. They are not loaded on the page as long as we don't ask for it.

The final goal is to create large webapps that load and use features when necessary.

### <a name="require"></a> Require a feature

To require a feature, use the HTML tag ```<rv-require>``` in your page with a _name_ and a _src_:

```HTML
<body>

  <rv-require name="button" src="components/button"></rv-require>

</body>
```

The missing file extension is assumed.

At this point, nothing happens, the feature is loaded **on demand**.

To fire the feature, you have to use the Ractive container view:

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

Firstly, Ractive-Require adds to the ```<head>``` element:
 - ```components/button.css```
 - ```components/button.js```

Then it gets the ```components/button.html``` template. The feature is loaded.

The HTML template will still continues to be a Mustache template with data-binding, but for now, it's just a string.

### <a name="require-file"></a> Require a file

In your JavaScript files, you can require an other JavaScript file or a CSS file. Just continue to use ```Ractive.require()``` but with a file path:

```javascript

// Inject the js file
Ractive.require('/public/jquery.js');

// The return is a Promise
Ractive.require('/public/jquery.js').then(function() {
  // ...
});

// You can add a name to avoid many injections of the same file.
// Otherwise, it's the filename wich is used as name.
Ractive.require('jquery', /public/jquery.js');

// It works for JS and CSS files
Ractive.require('/public/styles.css');
```

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

  // You can get the pre-configured details with the "config" object

  // When your controller logic is complete, call done()
  // because it's possible to declare many controllers for the same feature
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

The second _button_ does not reload the JavasScript and CSS files in the head and it re-use the template content previously loaded.

### <a name="only-html"></a> Only HTML

To avoid loading the CSS or JavaScript files, you can add ```no-script="true"``` and/or ```no-css="true"```:

```HTML
<body>

  <rv-require name="button" src="components/button" no-script="true" no-css="true">
  </rv-require>

</body>
```

### <a name="on-demand"></a> On demand

With ```Ractive.require()``` all of the ```<rv-require>``` are fired.
To have the ability to require only some of features, you can use the ```ondemand``` parameter:

```HTML
<body>

  <rv-require name="button" src="components/button" ondemand="button1">
  </rv-require>

</body>
```

```Ractive.require()``` has no effect on the button. To fire it, you have to specify ```Ractive.require('button1')```.

With the same name, you can make groups of features loaded together.

### <a name="arguments"></a> Passing arguments

You can pass two types of arguments in a ```<rv-require>```:

 - Direct value with the ```data-*``` parameter.
 - Binding value of the parent view with the ```data-bind-*``` parameter.

The ```*``` is the property name getted in _data_.

```HTML
<body>

  <rv-require name="button" src="components/button" data-id="5"></rv-require>
  <rv-require name="button" src="components/button" data-bind-id="model.id"></rv-require>

</body>
```

```javascript

Ractive.controller('button', function(Feature, data, el, config, done) {

  console.log(data.id);

  // With the first button, data.id gets the 5 direct value.
  // With the second, data.id gets the value of the parent view "ractive.data.model.id"
  // If the parent value "model.id" changes, the value is directly changed in the child too.
  // If you pass an object, it will not be cloned but directly sent.

});

```

### <a name="partials"></a> Partials

It's possible to define partials for a ```<rv-require>``` that are used only on it.
A partial is a ```<rv-partial>``` element defined inside the ```<rv-require>```.
It can takes a ```src``` attribute or directly a HTML code. It must have a ```target```
attribute with the name of the partial Mustache tag.

If no partial is defined in the ```<rv-require>```, it takes the parent partial inclusion.

Inside the feature template, use the standard ```{{> partial}}``` partial include:

```HTML
<body>

  <script type="text/ractive" id="content">
    <div>My generic content</div>
  </script>

  <rv-require name="button" src="components/button">

    <!-- A partial can be a HTML page -->
    <rv-partial target="content" src="components/content.html"></rv-partial>

    <!-- Or a direct HTML content -->
    <rv-partial target="footer">
      <div>The footer</div>
    </rv-partial>
  </rv-require>

  <!-- No "content" partial defined for this button, so it takes the parent script -->
  <rv-require name="button" src="components/button">
  </rv-require>

</body>
```

### <a name="sub-requires"></a> Sub requires

Inside a feature or partial template, it's possible to call other features. It works exactly the same as require a feature
in the page, you have to call ```ractive.require()``` for the parent feature.

The sub-feature starts with the partials of its parent.

### <a name="scopes"></a> Scopes

Each ```<rv-require>``` has its own scope. When you call ```ractive.require()``` it doesn't look at the DOM parent or the children of the ```<rv-require>``` on it.

When you create your feature with ```ractive = new Feature()```, _ractive_ contains two new properties:

 - _ractive.parentRequire_: Instance of the parent feature.
 - _ractive.childrenRequire_: Array with all of the children features.

### <a name="paths"></a> Paths

In a feature or partial template, all of the next ```src``` attributes of the ```<rv-require>``` and ```<rv-partial>``` elements are relative of the actual file:

```HTML
<!-- /index.html -->
<body>
  <rv-require name="button" src="components/button"></rv-require>
</body>

<!-- /components/button.html -->
<!-- "src" start at /components/ -->
<rv-require name="icon" src="icon"></rv-require>

<!-- /components/icon.html -->
<div>Icon</div>
```

### <a name="teardown"></a> Teardown

When you fire a ```ractive.teardown()``` of a feature, it fires all of its children teardown after it cleans the DOM.

But your ```<rv-require>``` is still there. So you can re-use ```ractive = new Feature()``` on it.

## Contribute

To contribute to the project, read the [Contribution guidelines](https://github.com/XavierBoubert/ractive-require/blob/master/CONTRIBUTING.md).
After that, you can create your own Pull Requests (PR) and submit them here.

## Lead contribution team

* [Xavier Boubert](http://xavierboubert.fr) [@xavierboubert](http://twitter.com/XavierBoubert)
