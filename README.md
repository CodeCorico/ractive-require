# Ractive-Require

[![Join the chat at https://gitter.im/CodeCorico/ractive-require](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/CodeCorico/ractive-require?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Require Ractive views on demand in Package by Feature way.

Ractive-Require is an extension to [Ractive.js](http://ractivejs.org) that provides the support to require features on demand. A feature is composed by a HTML template file, and its JavaScript and CSS assets. They are not loaded on the page as long as the user does't need to use it.

## Installation

Use the CDN version:
```HTML
<script src="https://cdnjs.cloudflare.com/ajax/libs/ractive-require/0.6.5/ractive-require.min.js"></script>
```

Or copy the [dist](https://github.com/CodeCorico/ractive-require/tree/master/dist) folder into your project and include ```ractive-require.js``` or ```ractive-require.min.js``` (production) file in your HTML page **after** Ractive.

## Documentation

Go to [ractive-require.codecorico.com](http://ractive-require.codecorico.com)

## Contribute

To contribute to the project, read the [Contribution guidelines](https://github.com/CodeCorico/ractive-require/blob/master/CONTRIBUTING.md).
After that, you can create your own Pull Requests (PR) and submit them here.

## Build the distribution files

If you want to hack on Ractive-Require, the first step is to clone the repo and install all its development dependencies:

```
git clone https://github.com/CodeCorico/ractive-require   # or your fork
ractive-require
npm install
```

You have to install **gulp**
```
npm install gulp -g
```

Then you can build the distribution files with:
```
gulp build
```


## Lead contribution team

* [Xavier Boubert](http://xavierboubert.fr) [@xavierboubert](http://twitter.com/XavierBoubert)
