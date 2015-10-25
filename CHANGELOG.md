# Ractive-Require - Changelog

<a name="0.5.2"></a>
# 0.5.2 (2015-10-25)

[Release 0.5.2](https://github.com/CodeCorico/ractive-require/releases/tag/0.5.2)

### Hotfixes

- **ractive-require**
  - Teardown the require children before teardown itself (base on "unrender" event).

<a name="0.5.1"></a>
# 0.5.1 (2015-10-21)

[Release 0.5.1](https://github.com/CodeCorico/ractive-require/releases/tag/0.5.1)

### Hotfixes

- **ractive-require**
  - Fix .findChild() and .findParent() instance methods.

### Breaking changes

- **ractive-require**
  - Add .findChildren() and .findParents() instance methods.
  - Add .find*() instance methods to the parents that don't have them.

<a name="0.5.0"></a>
# 0.5.0 (2015-09-30)

[Release 0.5.0](https://github.com/CodeCorico/ractive-require/releases/tag/0.5.0)

### Breaking changes

- **ractive-require**
  - Reset the rv-require element on teardown. It's controller will be fired again on .require().
  - Add the "rv-require-loaded" CSS class when the rv-require element is active

<a name="0.4.0"></a>
# 0.4.0 (2015-09-09)

[Release 0.4.0](https://github.com/CodeCorico/ractive-require/releases/tag/0.4.0)

### Breaking changes

- **ractive-require**
  - Support double data-binding on "data-bind-*" attributes.

<a name="0.3.0"></a>
# 0.3.0 (2015-09-08)

[Release 0.3.0](https://github.com/CodeCorico/ractive-require/releases/tag/0.3.0)

### Breaking changes

- **ractive-require**
  - Add findChild() and findParent() methods to a ractive element.

<a name="0.2.4"></a>
# 0.2.4 (2015-06-18)

[Release 0.2.4](https://github.com/CodeCorico/ractive-require/releases/tag/0.2.4)

### Breaking changes

- **ractive-require**
  - Return require.then() callback only when all subchildren are required

<a name="0.2.3"></a>
# 0.2.3 (2015-06-03)

[Release 0.2.3](https://github.com/CodeCorico/ractive-require/releases/tag/0.2.3)

### Breaking changes

- **ractive-require**
  - Fix rv-require selector qby using uerySelectorAll() instead of broken Ractive findAll()

<a name="0.2.2"></a>
# 0.2.2 (2015-05-27)

[Release 0.2.2](https://github.com/CodeCorico/ractive-require/releases/tag/0.2.2)

### Breaking changes

- **ractive-require**
  - Build distribution files. My bad.

<a name="0.2.1"></a>
# 0.2.1 (2015-05-27)

[Release 0.2.1](https://github.com/CodeCorico/ractive-require/releases/tag/0.2.1)

### Breaking changes

- **ractive-require**
  - Fix bug when rv-ractive is inside a rv-ractive not loaded

<a name="0.2.0"></a>
# 0.2.0 (2015-04-03)

[Release 0.2.0](https://github.com/CodeCorico/ractive-require/releases/tag/0.2.0)

### Breaking changes

- **ractive-require**
  - Add Ractive.require to inject JS and CSS files

<a name="0.1.1"></a>
# 0.1.1 (2015-03-24)

[Release 0.1.1](https://github.com/CodeCorico/ractive-require/releases/tag/0.1.1)

### Breaking changes

- **ractive-require**
  - Add header metadata for dist files
  - Observe parent changes with data-bind-*
  - Apply absolute url to all "src" attributes in remote templates

<a name="0.1.0"></a>
# 0.1.0 (2015-03-23)

[Release 0.1.0](https://github.com/CodeCorico/ractive-require/releases/tag/0.1.0)

### Breaking changes

- **ractive-require**
  - Creation
