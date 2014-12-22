/*
 * grunt-htmlurlrev
 * https://github.com/jbuiss0n/grunt-htmlurlrev
 * 
 * Created from grunt-cssurlrev
 * https://github.com/richardbolt/grunt-cssurlrev
 * From Richard Bolt who deserve all the credit for the following code
 *
 * Copyright (c) 2014 Jérémy Buisson
 * Licensed under the MIT license.
 */

'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.htmlurlrev = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/default.html');
    var expected = grunt.file.read('test/expected/default.html');
    test.equal(actual, expected, 'should update paths in html file based on grunt.filerev.summary.');

    test.done();
  },
  custom_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/custom.html');
    var expected = grunt.file.read('test/expected/custom.html');
    test.equal(actual, expected, 'should update paths in html file based on an assets json file.');

    test.done();
  },
  hashmap_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/hashmap.html');
    var expected = grunt.file.read('test/expected/hashmap.html');
    test.equal(actual, expected, 'should update paths in html file based on an assets json file and hashmap format');

    test.done();
  },
  prefix_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/prefix.html');
    var expected = grunt.file.read('test/expected/prefix.html');
    test.equal(actual, expected, 'should update paths in html file based on an assets json file and a prefix');

    test.done();
  },
};
