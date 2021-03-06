# Angular Smart Nav

[![Build Status](https://travis-ci.org/thisissoon/angular-smart-nav.svg?branch=master)](https://travis-ci.org/thisissoon/angular-smart-nav)
[![Coverage Status](https://coveralls.io/repos/thisissoon/angular-smart-nav/badge.svg)](https://coveralls.io/r/thisissoon/angular-smart-nav)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/angular-smart-nav.svg)](https://saucelabs.com/u/angular-smart-nav)

Show or hide a navbar when scrolling in any particular direction and or minimise nav when scrolling pass the navbar

## Install

You can install this module using [bower][bower] like so:

```
bower install angular-smart-nav --save
```

Add the angular-smart-nav library file to your `index.html` file like so:

```html
<script src="path/to/angular-smart-nav/dist/angular-smart-nav.min.js"></script>
```

Then add the module to your angular app:

```javascript
angular.module('myApp', ['sn.smartNav']);
```

## Example Usage

In your html simply add the directive to your nav:

```html
<nav sn-smart-nav>
  <li><a href="#">Item 1</a></li>
  <li><a href="#">Item 2</a></li>
  <li><a href="#">Item 3</a></li>
  <li><a href="#">Item 4</a></li>
</nav>
```

The directive will add the following classes to your nav:
- `sn-nav-scrolling-down`: when the user is scrolling down the page
- `sn-nav-scrolling-up`: when the user is scrolling up the page
- `sn-nav-minimise`: when the user has scrolled beyond the height of the nav
- `sn-nav-affix`: If the element is at the top of the viewport or above it then the class `affix` will be added

You still have to add your own custom styling to the nav to hide, show or minimise the navbar. The following will hide the nav when scrolling down and display it again when scrolling up:

```css
nav {
  opacity: 1;
  transition: opacity .4s ease-in-out .4s;
}
nav.scrolling-down {
  opacity: 0;
}
nav.scrolling-up {
  opacity: 1;
}
```


This project structure is based on the [angular-start](https://github.com/thisissoon/angular-start
) application skeleton for a typical [AngularJS](http://angularjs.org/) web app.

The project is preconfigured to install the Angular framework and a bunch of development and testing tools for instant web development gratification.


## Getting Started

To get you started you can simply clone the repository and install the dependencies:

### Clone the Angular Smart Nav repository

Clone the angular-smart-nav repository using [git][git]:

```
cd path/to/parent/directory
git clone git@github.com:thisissoon/angular-smart-nav.git
cd angular-smart-nav
```


### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code. The tools help us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].
* We run regular tasks like code minification via `grunt`, a [javascript task runner][grunt].


The following tools require super user privileges so you will need to install them separately like so:

```
sudo npm install -g bower grunt-cli
```

Then install all tooling and libraries:

```
npm install
bower install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/components` - contains the angular framework files and other libraries

### Install Libraries

We install our frontend libraries via `bower`, a [client-side code package manager][bower].

All frontend depenancies such as angular will be installed when running `npm install`. To manually install all dependencies run:

```
bower install
```

To install a new library such as bootstrap we can simply do:

```
bower install bootstrap --save
```

And this will download the bootstrap package from bower and also update the `bower.json` file to include that package. You will then need to add the script tag to `app/index.html` like so:

```html
<script src="path/to/bootstrap.js"></script>
```

### Run the Application

We have preconfigured the project with a simple development web server. The simplest way to start
this server is:

```
grunt server
```

Now browse to the app at `http://localhost:8000/app/`.

This command will watch all source files and run tests every time a javascript file is updated, compile less when a less file is updated and lint js/html/less files when they are updated.

### Running the build script

To create a build to deploy for a production environment simply run:

```
grunt build -env production
```

The build files will then be in the `dist/` directory.

### Creating a new release

To create a new release simply run:

```
grunt release --setversion X.Y.Z
```

Where `X.Y.Z` is the new version number. This will update `package.json`
and `bower.json` with the new version number and then run `grunt build` before
committing the changes to git.

The build files will then be in the `dist/` directory.


## Directory Layout

```

app/                    --> all of the files to be used in production
  components/           --> all of our javascript libraries (installed using bower)
  index.html            --> app layout file (the main html template file of the app)
  js/                   --> javascript files
    {app}.js            --> angular module
tests/                  --> test config and source files
  e2e/                  --> end-to-end specs
    specs/
      scenarios.js
    protractor.conf.js  --> config file for running e2e tests with Protractor
  unit/                 --> unit level specs/tests
    {app}/              --> follows the same folder structure as javascript files in app folder

```

### Testing

There are two kinds of tests in the angular-seed application: Unit tests and End to End tests.

### Running Unit Tests

The angular-seed app comes preconfigured with unit tests. These are written in
[Jasmine][jasmine], which we run with [Grunt][grunt].

* the configuration is found in `Gruntfile.js`
* the unit tests are found in `tests/unit/`.

The easiest way to run the unit tests is to do:

```
grunt test:unit:development
```

This script will start the Jasmine test runner to execute the unit tests. You can also run:

```
grunt server
```

Where the grunt watch command will sit and watch the source and test files for changes and then re-run the tests whenever any of them change.
This is the recommended strategy; if your unit tests are being run every time you save a file then
you receive instant feedback on any changes that break the expected code functionality.


### End to end testing

The angular-seed app comes with end-to-end tests, again written in [Jasmine][jasmine]. These tests
are run with the [Protractor][protractor] End-to-End test runner.  It uses native events and has
special features for Angular applications.

* the configuration is found at `tests/e2e/protractor.conf.js`
* the end-to-end tests are found in `tests/e2e/specs/`

Protractor simulates interaction with our web app and verifies that the application responds
correctly. Therefore, our web server needs to be serving up the application, so that Protractor
can interact with it. To run end to end tests we first need to install protractor with global permissions. You may need to run this command with superuser privileges:

```
npm install -g protractor
webdriver-manager update
```

Once you have ensured that the development web server hosting our application is up and running
and WebDriver is updated, you can run the end-to-end tests using the supplied grunt task:

```
grunt test:e2e
```

Behind the scenes this will also run `webdriver-manager update && webdriver-manager start`. This will download and install the latest version of the stand-alone WebDriver tool and start the Selenium web server. This script will execute the end-to-end tests against the application being hosted on the
development server.


## Contact

For more information on AngularJS please check out http://angularjs.org/

[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[grunt]: http://gruntjs.com/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://pivotal.github.com/jasmine/
[travis]: https://travis-ci.org/
