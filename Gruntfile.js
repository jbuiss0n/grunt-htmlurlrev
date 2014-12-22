/*
 * grunt-htmlurlrev
 * https://github.com/jbuiss0n/grunt-htmlurlrev
 * 
 * Created from grunt-cssurlrev
 * https://github.com/richardbolt/grunt-cssurlrev
 * From Richard Bolt & Theo Ephraim who deserve all the credit for the following code
 *
 * Copyright (c) 2014 Jérémy Buisson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    copy: {
      tests: {
        files: { 
          'tmp/default.html':  'test/fixtures/test.html',
          'tmp/custom.html':   'test/fixtures/test.html',
          'tmp/hashmap.html':   'test/fixtures/test.html',
          'tmp/prefix.html':   'test/fixtures/test.html',
        }
      }
    },

    // Configuration to be run (and then tested).
    htmlurlrev: {
      default_options: {
        src: 'tmp/default.html'
      },
      custom_options: {
        options: {
          assets: 'test/fixtures/assets.json'
        },
        src: 'tmp/custom.html'
      },
      hashmap_mode: {
        options: {
          assets: 'test/fixtures/hashmap.json',
          hashmap_rename: '#{= dirname}/#{= hash}.#{= basename}#{= extname}'
        },
        src: 'tmp/hashmap.html'
      },
      prefix_mode: {
        options: {
          prefix: 'dist/'
        },
        src: 'tmp/prefix.html'
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });
  
  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Load the fixtures into the object that filerev_assets expects.
  grunt.registerTask('filerev_setup', 'Mock grunt.filerev.summary', function(){
    grunt.filerev = grunt.file.readJSON('test/fixtures/filerev.json');
  });

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'copy', 'filerev_setup', 'htmlurlrev', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
