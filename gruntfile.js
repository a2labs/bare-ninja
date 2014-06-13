module.exports = function (grunt) {

    'use strict';

    // Load in all Grunt tasks
    require('load-grunt-tasks')(grunt);

    // Display time per task after running Grunt
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Sass
         */
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },

        /**
         * Autoprefixer
         */
        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 8', 'ie 9']
            },
            multiple_files: {
                expand: true,
                flatten: true,
                src: 'css/*.css',
                dest: 'css/'
            }
        },

        /**
         * Uglify
         */
        uglify: {
            modules: {
                files: {
                    'js/bare-ninja.min.js': [
                        'js/modules/accordion.js',
                        'js/modules/carousel.js',
                        'js/modules/modal.js'
                    ]
                }
            }
        },


        /**
         * Watch
         */
        watch: {
            css: {
                files: [
                    'css/bare-ninja.scss',
                    'css/global/*.scss',
                    'css/layout/*.scss',
                    'css/module/*.scss'
                ],
                tasks: ['sass:dist', 'autoprefixer'],
                options: { nospawn: true }
            },
            uglify: {
                files: ['js/modules/*.js'],
                tasks: ['uglify:modules']
            }
        }
    });

    // Register Tasks
    grunt.registerTask('default', [ 'sass', 'autoprefixer', 'uglify' ]);
};