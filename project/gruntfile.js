module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: ['src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
            _: false,
            $: false,
            jasmine: false,
            describe: false,
            it: false,
            expect: false,
            beforeEach: false,
            afterEach: false,
            sinon: false
        },
        browser: true,
        devel: true
      }
    },
    testem: {
      unit: {
        options: {
          framework: 'jasmine2',
          launch_in_dev: ['PhantomJS'],
          before_tests: 'grunt jshint',
          serve_files: [
              'node_modules/sinon/pkg/sinon.js',
              'bower_components/requirejs-plugins/lib/require.js',
              'src/require.config.js',
              'test/main.test.js',
              'src/js/main.js'
          ],
          watch_files: [
            'src/**/*.js',
            'test/**/*.js'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-testem');

  grunt.registerTask('default',['testem:run:unit'])

};