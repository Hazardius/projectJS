module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: [
                'modules/config/*.js',
                'modules/create/*.js',
                'modules/emailView/*.js',
                'modules/inbox/*.js',
                'modules/sent/*.js',
                'modules/sentView/*.js'
            ],
            options: {
                // options here to override JSHint defaults
                jshintrc: true
            }
        },
        less: {
            development: {
                options: {
                    paths: ["assets/less"]
                },
                files: {
                    "assets/css/main.css": "assets/less/main.less"
                }
            },
            production: {
                options: {
                    paths: ["assets/less"]
                },
                files: {
                    "assets/css/main.css": "assets/less/main.less"
                }
            }
        },
        injector: {
            options: {},
                local_dependencies: {
                files: {
                'index.html': [
                    'assets/js/angular.js',
                    'assets/js/jquery-2.1.3.min.js',
                    'assets/js/angular-messages.js',
                    'app.[m, r , p]*.js',
                    'app.f*.js',
                    'app.c*.js',
                    'app.d*.js',
                    'assets/js/*.js',
                    'modules/config/*.js',
                    'modules/create/*.js',
                    'modules/emailView/*.js',
                    'modules/inbox/*.js',
                    'modules/inbox/customFolder/*.js',
                    'modules/sent/*.js',
                    'modules/sentView/*.js',
                    'assets/css/b*.css',
                    'assets/css/main.css'
                ]
                }
            }
        },
        watch: {
            files: ['**/*'],
            tasks: ['jshint']
        }
  });

  // Load the plugin
     grunt.loadNpmTasks('grunt-contrib-jshint'); // detect errors and potential problems in JavaScript code
     grunt.loadNpmTasks('grunt-injector');       // inject references to files into other files
     grunt.loadNpmTasks('grunt-contrib-less');   // CSS pre-processor
     grunt.loadNpmTasks('grunt-contrib-watch');  // Simple config to run jshint any time a file is added, changed or deleted


     grunt.registerTask('all', ['jshint', 'less', 'injector']);
     grunt.registerTask('def', ['jshint', 'less']);
};
