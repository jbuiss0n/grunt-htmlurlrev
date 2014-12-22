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

var path = require('path');

var default_hashmap_rename_format = '#{= dirname}/#{= basename}_#{= hash}#{= extname}';

module.exports = function (grunt) {
  grunt.registerMultiTask('htmlurlrev', 'Replace file urls in html files with urls that include revision hashes', function () {
    // Merge task-specific and/or target-specific options with these defaults.
    var self = this,
      options = self.options({
        assets: ''  // Assets file - false or empty to use grunt.filerev.summary
      });

    var url_map;
    if (options.assets && grunt.file.isFile(options.assets)) {
      url_map = grunt.file.readJSON(options.assets);
    } else {
      // We must have run filerev in some manner if we're not
      // passing in an assets json file to use.
      if (!grunt.filerev) {
        grunt.fail.fatal([
          'Could not find grunt.filerev.summary.',
          'Run "filerev" first or provide a options.assets JSON file.'
        ].join('\n'));
      }
      url_map = grunt.filerev.summary;
    }

    var hashmap_rename_format;
    if (options.hashmap_rename) {
      grunt.template.addDelimiters('#{ }', '#{', '}');
      var tmpl_option = {
        delimiters: '#{ }',
      };
      // use the default renaming scheme if hashmapRename is just set to true
      hashmap_rename_format = typeof options.hashmap_rename === true ? default_hashmap_rename_format : options.hashmap_rename;
    }

    self.filesSrc.forEach(function (file) {
      var html = grunt.file.read(file);
      var original = html;
      // find urls, do not inlude inlined data URIs
      var matches = html.match(/<img[^\>]*[^\>\S]+src=['"]([^'"\)#]+)(#.+)?["']/gm);

      if (!matches) {
        return;
      }

      matches.forEach(function (original_url) {
        // url matches need to be trimmed
        // possible example: "url('../fonts/iconfont/iconfont.eot?#iefix')"
        // trim the beginning and end, potentially leading slashes and ../
        original_url = original_url.replace(/<img[^\>]*[^\>\S]+src=['"](\.\.\/)*\/?([^'"\)#]+)(#.+)?["']/, '$2');
        if (original_url in url_map) {
          var new_url = url_map[original_url];
          if (options.hashmap_rename) {
            new_url = hashmapRename(original_url);
          }
          if (options.prefix) {
            new_url = options.prefix + new_url;
          }
          html = html.replace(original_url, new_url);
        }
      });
      if (original !== html) {
        grunt.log.writeln('✔ '.green + file + (' was changed.').grey);
        grunt.file.write(file, html);
      }
    });

    function hashmapRename(filepath) {
      if (hashmap_rename_format) {
        var hash = url_map[filepath];
        var extname = path.extname(filepath);
        tmpl_option['data'] = {
          // dest: dest,
          // cwd: cwd,
          hash: hash,
          extname: extname,
          dirname: path.dirname(filepath),
          basename: path.basename(filepath, extname),
        };
        filepath = grunt.template.process(hashmap_rename_format, tmpl_option);
      }
      return filepath;
    }
  });
};
