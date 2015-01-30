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
			cssWithJs: 'assets/less/pages/css-with-js.less',
			noBgSize: 'assets/less/pages/no-bg-size.less'
		}

	};

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
					'assets/css/main.css-with-js.min.css' : config.less.cssWithJs,
					'assets/css/main.no-bg-size.min.css' : config.less.noBgSize
				}
			}
		},

		watch: {

			less: {
				files: [config.paths.built + 'less/**/*.less'],
				tasks: ['less']
			},

			jshint: {
				options: {
					spawn: true
				},
				files: [config.paths.src + '**/*.js'],
				tasks: ['jshint']
			},

			livereload: {
				options: {
					livereload: true
				},
				files: [config.paths.built + 'css/**/*.css', '*.html']
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
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// register custom tasks
	grunt.registerTask('default', ['less']);
};