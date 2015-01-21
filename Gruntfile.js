module.exports = function(grunt) {

	/*-------------------------------------------- */
	/** Browserify bundle config */
	/*-------------------------------------------- */

	var config = {
		
		paths: {
			src: 'assets/js/src/',
			vendor: 'assets/js/vendor/',
			built: 'assets/',
		},

		less: {
			main: 'assets/less/main.less',
			purecss: 'assets/less/pages/purecss.less',
			cssWithJs: 'assets/less/pages/css-with-js.less'
		},

		js: {
			cssWithJs: 'assets/js/src/css-with-js.js'
		}

	};

	var vendorExternal = ['jquery'];

	grunt.initConfig({
		
		less: {

			default: {
				options: {
					sourceMap: true,
					outputSourceFiles: true,
					sourceMapFilename: 'tmp/main.min.css.map',
					sourceMapRootpath: '/',
					cleancss: true
				},
				files: {
					'assets/css/main.min.css' : config.less.main,
					'assets/css/main.purecss.min.css' : config.less.purecss,
					'assets/css/main.css-with-js.min.css' : config.less.cssWithJs
				}
			}
		},

		browserify: {

			src: {
				options: {
					external: vendorExternal
				},
				files: {
					'assets/js/src.bundle.js': [config.paths.src + 'main.js'],
					'assets/js/cssWithJs.bundle.js' : [config.js.cssWithJs]
				}
			},

			vendor: {
				options: {
					shim: {
						'jquery': {
							path: 'node_modules/jquery/dist/jquery.min.js', exports: '$'
						}
					}
				},
				files: {
					'assets/js/vendor.bundle.js' : [config.paths.vendor + '**/*.js']
				}
			}

		},

		watch: {

			less: {
				files: [config.paths.built + 'less/**/*.less'],
				tasks: ['less']
			},

			browserify: {
				files: [config.paths.src + '**/*.js'],
				tasks: ['browserify:src']
			},

			jshint: {
				options: {
					spawn: true
				},
				files: [config.paths.src + '**/*.js'],
				tasks: ['jshint']
			},

			concat: {
				files: ['assets/js/vendor.bundle.js', 'assets/js/src.bundle.js'],
				tasks: ['concat:build']
			},

			livereload: {
				options: {
					livereload: true
				},
				files: [config.paths.built + 'css/**/*.css', 'assets/js/bundle.js', 'index.php', 'partials/*.php']
			}
		},

		concat: {
			options: {
				separator: ';',
			},
			build: {
				src: ['assets/js/vendor.bundle.js', 'assets/js/src.bundle.js'],
				dest: 'assets/js/bundle.js'
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: {
				src: [config.paths.src + '**/*.js', '!' + config.paths.src + 'vendor/**/*.js']
			}
		}

	});

	// only jshint the changed files during watch
	grunt.event.on('watch', function(action, filePath) {
		if (filePath.indexOf('src') != -1 && filePath.indexOf('.js') != -1) {
			grunt.config('jshint.all.src', filePath);
		}
	});

	// load NPM tasks
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');

	// register custom tasks
	grunt.registerTask('default', ['less', 'browserify:src', 'browserify:vendor', 'concat:build']);
};