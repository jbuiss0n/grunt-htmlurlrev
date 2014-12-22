# grunt-htmlurlrev

[![Build Status](https://travis-ci.org/jbuiss0n/grunt-htmlurlrev.png?branch=master)](https://travis-ci.org/jbuiss0n/grunt-htmlurlrev)
[![NPM version](http://img.shields.io/npm/v/grunt-htmlurlrev.svg?style=flat)](https://www.npmjs.org/package/grunt-htmlurlrev)
[![Dependency Status](https://david-dm.org/jbuiss0n/grunt-htmlurlrev.svg?style=flat)](https://david-dm.org/jbuiss0n/grunt-htmlurlrev)

> Change asset paths inside html files based on output from grunt-filerev, grunt-hashmap, or other similar plugins

> Created from [grunt-cssurlrev](https://github.com/richardbolt/grunt-cssurlrev), from [Richard Bolt](https://github.com/richardbolt) & [Theo Ephraim](https://github.com/theoephraim) who deserve all the credit for this module, as i just managed to handle html files and parse <img /> tags

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-htmlurlrev --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-htmlurlrev');
```

## The "htmlurlrev" task

### Overview
This plugin will replace file urls within html files to be compatible with static asset versioning plugins -- plugins that rename your files based on a short hash of the file contents (for cache busting purposes).

The two that are directly compatible are [`grunt.filerev`](https://github.com/yeoman/grunt-filerev) and [`grunt.hashmap`](https://github.com/ktmud/grunt-hashmap), but most others will probably work as well, as long as they output a json file of lookups from original filenames to the new filename or just it's hash.

Please note that it modifies files in place at present.

### Creating the htmlurlrev task

In your project's Gruntfile, add a section named `htmlurlrev` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  htmlurlrev: {
    options: {
      assets: 'path/to/assets.json'
    },
    your_target: {
      src: ['public/views/*.html']
    },
  },
})
```

### Options

#### options.assets
Type: `String`
Default value: `null`

A file path that is used to load a json object from. If empty (default), then `grunt.filerev.summary` is used to modify url paths.

#### options.prefix
Type: `String`
Default value: `null`

A prefix to add to each url as it is replaced. Useful for complex build processes where files are moved around after revving.

#### options.hashmap_rename
Type: `String` or `Boolean`
Default value: `null`

This option enables compatibility with `grunt.hashmap`. If set to `true`, the default renaming scheme will be used. Otherwise, it should be set to the same naming scheme used for `grunt.hashmap`. It makes sense to use a template tag to use it directly (see example below).



### Usage Examples

#### Default Options
In this example, files matching `public/views/*.html` are modified to have any links to assets modified with `grunt.filerev.summary` updated.

```js
grunt.initConfig({
  htmlurlrev: {
    files: {
      src: ['public/views/*.html'],
    },
  },
})
```

#### Hashmap Example
This example shows how to use it with `grunt.hashmap` and a more customized file renaming scheme.

```js
grunt.initConfig({
  hashmap: {
    options: {
      output: 'assets/hashmap.json',
      rename: '#{= dirname}/#{= hash}.#{= basename}#{= extname}',
      keep: false,
      hashlen: 6
    },
    all: {
      cwd: 'public',
      src: '**/*.{css,js,pdf,eps,png,jpg,jpeg,gif,eot,svg,ttf,woff}',
      dest: 'public'
    }
  },
  htmlurlrev: {
    options: {
      assets: '<%= hashmap.options.output %>',
      hashmap_rename: '<%= hashmap.options.rename %>'
    },
    files: {
      src: ['public/views/*.html'],
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
