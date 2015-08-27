module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'public/javascript/app.js': 'public/javascript/src/app.js'
                }
            }
        },
        watch: {
            script: {
                files: 'public/javascript/src/*.js',
                tasks: ['babel'],
            }
        }
    });

    grunt.registerTask('default', ['watch']);
}
