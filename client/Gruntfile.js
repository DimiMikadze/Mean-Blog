module.exports = function(grunt) {

    grunt.initConfig({
        concat: {
            js: {
                src: [
                    'public/bower/angular/angular.min.js',
                    'public/bower/angular-ui-router/release/angular-ui-router.min.js',
                    'public/bower/textAngular/dist/textAngular-rangy.min.js',
                    'public/bower/textAngular/dist/textAngular-sanitize.min.js',
                    'public/bower/textAngular/dist/textAngular.min.js',
                    'app/app.js',
                    'app/factories.js',
                    'app/controllers.js'
                ],
                dest: 'app/scripts.js'
            },
            css: {
                src: [
                    'public/bower/bootstrap/dist/css/bootstrap.min.css',
                    'public/bower/textAngular/dist/textAngular.css',
                    'public/css/admin/admin.css'
                ],
                dest: 'public/css/admin/bundle.css'
            }
        },
        watch: {
            scripts: {
                files: ['app/**/*.js'],
                tasks: ['concat']
            },
            css: {
                files: ['public/css/admin/**/*.css'],
                tasks: ['concat']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['concat', 'watch']);

};