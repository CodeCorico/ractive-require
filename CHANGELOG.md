<a name="0.6.12"></a>
# [0.6.12](https://github.com/CodeCorico/ractive-require/compare/0.6.11...0.6.12) (2016-11-08)

### Bug Fixes
* **contoller:** never stop retry calling controller [#cadaad3](https://github.com/CodeCorico/ractive-require/commit/cadaad3)

<a name="0.6.11"></a>
# [0.6.11](https://github.com/CodeCorico/ractive-require/compare/0.6.10...0.6.11) (2016-11-04)

### Bug Fixes
* **require:** remove the params from the file extension [#a58988b](https://github.com/CodeCorico/ractive-require/commit/a58988b)

<a name="0.6.10"></a>
# 0.6.10 (2016-10-25)

[Release 0.6.10](https://github.com/CodeCorico/ractive-require/releases/tag/0.6.10)

### Breaking changes

- **require**
  - Fire an event and continue the script on load file error.

<a name="0.6.9"></a>
# 0.6.9 (2016-09-22)

[Release 0.6.9](https://github.com/CodeCorico/ractive-require/releases/tag/0.6.9)

### Breaking changes

- **require**
  - Add Require.findRequireByEl() method.

<a name="0.6.8"></a>
# 0.6.8 (2016-08-05)

[Release 0.6.8](https://github.com/CodeCorico/ractive-require/releases/tag/0.6.8)

### Hotfixes

- **require**
  - Fix "data-listen-*" that was a clone of "data-on-*".

<a name="0.6.7"></a>
# 0.6.7 (2016-06-30)

[Release 0.6.7](https://github.com/CodeCorico/ractive-require/releases/tag/0.6.7)

### Breaking changes

- **require**
  - Add data-bindparent-* to only bind the changes from the parent to the child.
  - Add data-bindchild-* to only bind the changes from the child to the parent.

<a name="0.6.6"></a>
# 0.6.6 (2016-06-22)

[Release 0.6.6](https://github.com/CodeCorico/ractive-require/releases/tag/0.6.6)

### Breaking changes

- **require**
  - Remove children required when they have no DOM node parent. Usefull to use requires in a mustache loop.

<a name="0.6.5"></a>
# 0.6.5 (2016-06-20)

[Release 0.6.5](https://github.com/CodeCorico/ractive-require/releases/tag/0.6.5)

### Breaking changes

- **ractive-require**
  - Build distribution files. My bad.

<a name="0.6.4"></a>
# 0.6.4 (2016-06-20)

[Release 0.6.4](https://github.com/CodeCorico/ractive-require/releases/tag/0.6.4)

### Breaking changes

- **require**
  - data-on-* && data-listen-* supports multi events [#11 by @frostbane](https://github.com/CodeCorico/ractive-require/pull/11)

<a name="0.6.3"></a>
# 0.6.3 (2016-06-13)

[Release 0.6.3](https://github.com/CodeCorico/ractive-require/releases/tag/0.6.3)

### Breaking changes

- **require**
  - Add data-listen-* support to bind events between from children to parents [#10 by @frostbane](https://github.com/CodeCorico/ractive-require/pull/10)

<a name="0.6.2"></a>
# 0.6.2 (2016-06-08)

[Release 0.6.2](https://github.com/CodeCorico/ractive-require/releases/tag/0.6.2)

### Breaking changes

- **require**
  - Pass the component as second attribute in data-on-* [#9 by @frostbane](https://github.com/CodeCorico/ractive-require/pull/9)

<a name="0.6.1"></a>
# 0.6.1 (2016-06-08)

[Release 0.6.1](https://github.com/CodeCorico/ractive-require/releases/tag/0.6.1)

### Hotfixes

- **require**
  - Fix .apply() targeting the parent instead of the fire method [#8 by @frostbane](https://github.com/CodeCorico/ractive-require/pull/8)

<a name="0.6.0"></a>
# 0.6.0 (2016-06-06)

[Release 0.6.0](https://github.com/CodeCorico/ractive-require/releases/tag/0.6.0)

### Breaking changes

- **require**
  - Add data-on-* support to bind events from parents to children [#7 by @frostbane](https://github.com/CodeCorico/ractive-require/pull/7)

<a name="0.5.4"></a>
# 0.5.4 (2016-03-20)

[Release 0.5.4](https://github.com/CodeCorico/ractive-require/releases/tag/0.5.4)

### Hotfixes

- **controller**
  - Can force the controller to not waiting registration on firing

<a name="0.5.3"></a>
# 0.5.3 (2016-03-17)

[Release 0.5.3](https://github.com/CodeCorico/ractive-require/releases/tag/0.5.3)

### Hotfixes

- **controller**
  - Wait for the controller registration on firing

- **require**
  - Use teardown event to go back to initial HTML

<a name="0.5.2"></a>
# 0.5.2 (2015-10-25)

[Release 0.5.2](https://github.com/CodeCorico/ractive-require/releases/tag/0.5.2)

### Hotfixes

- **require**
  - Teardown the require children before teardown itself (base on "unrender" event).

<a name="0.5.1"></a>
# 0.5.1 (2015-10-21)

[Release 0.5.1](https://github.com/CodeCorico/ractive-require/releases/tag/0.5.1)

### Hotfixes

- **require**
  - Fix .findChild() and .findParent() instance methods.

### Breaking changes

- **require**
  - Add .findChildren() and .findParents() instance methods.
  - Add .find*() instance methods to the parents that don't have them.

<a name="0.5.0"></a>
# 0.5.0 (2015-09-30)

[Release 0.5.0](https://github.com/CodeCorico/ractive-require/releases/tag/0.5.0)

### Breaking changes

- **require**
  - Reset the rv-require element on teardown. Its controller will be fired again on .require().
  - Add the "rv-require-loaded" CSS class when the rv-require element is active

<a name="0.4.0"></a>
# 0.4.0 (2015-09-09)

[Release 0.4.0](https://github.com/CodeCorico/ractive-require/releases/tag/0.4.0)

### Breaking changes

- **require**
  - Support double data-binding on "data-bind-*" attributes.

<a name="0.3.0"></a>
# 0.3.0 (2015-09-08)

[Release 0.3.0](https://github.com/CodeCorico/ractive-require/releases/tag/0.3.0)

### Breaking changes

- **require**
  - Add findChild() and findParent() methods to a ractive element.

<a name="0.2.4"></a>
# 0.2.4 (2015-06-18)

[Release 0.2.4](https://github.com/CodeCorico/ractive-require/releases/tag/0.2.4)

### Breaking changes

- **require**
  - Return require.then() callback only when all subchildren are required

<a name="0.2.3"></a>
# 0.2.3 (2015-06-03)

[Release 0.2.3](https://github.com/CodeCorico/ractive-require/releases/tag/0.2.3)

### Breaking changes

- **require**
  - Fix rv-require selector by using uerySelectorAll() instead of broken Ractive findAll()

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

- **require**
  - Fix bug when rv-ractive is inside a rv-ractive not loaded

<a name="0.2.0"></a>
# 0.2.0 (2015-04-03)

[Release 0.2.0](https://github.com/CodeCorico/ractive-require/releases/tag/0.2.0)

### Breaking changes

- **require**
  - Add Ractive.require to inject JS and CSS files

<a name="0.1.1"></a>
# 0.1.1 (2015-03-24)

[Release 0.1.1](https://github.com/CodeCorico/ractive-require/releases/tag/0.1.1)

### Breaking changes

- **require**
  - Add header metadata for dist files
  - Observe parent changes with data-bind-*
  - Apply absolute url to all "src" attributes in remote templates

<a name="0.1.0"></a>
# 0.1.0 (2015-03-23)

[Release 0.1.0](https://github.com/CodeCorico/ractive-require/releases/tag/0.1.0)

### Breaking changes

- **ractive-require**
  - Creation
