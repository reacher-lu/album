module.exports = function (grunt) {
  "use strict";
  var cm = {
    head : '@@include("../global/head.html", {"title": "xxxx"})',
    top  : '@@include("../global/top.html")',
    foot  : '@@include("../global/foot.html")'
  };

  grunt.initConfig({
    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: /<head[^<]*>([\s\S]*)<\/head>/g,
              replacement: cm.head
            },
            {
              match: /<div class="page-container">([\s\S]*)<\/header>\s*<\/div>/g,
              replacement: cm.top
            },
            {
              match: /<div class="x-dialog" id="sharedAlert" data-position="center" data-mask=true>([\s\S]*)zhuanti-template.js"><\/script>/g,
              replacement: cm.foot
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['module/*.html'], dest: 'replace/'}
        ]
      }
    },

    includereplace: {
      dist: {
        options: {
        },
        // Files to perform replacements and includes with
        src: 'replace/*.html',
        // Destination directory to copy files to
        dest: 'dist/'
      }
    },

    clean: {
      dist: 'dist/*'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-include-replace');

  grunt.registerTask('rep',['clean','replace']);
  grunt.registerTask('inc',['clean','includereplace']);
  grunt.registerTask('default',['rep','inc']);

};
