module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	sass: {
	    dist:{
		options: {
		    style: 'expanded',
		    loadPath: [],
		},
		files: {
		    'build/main.css': 'style/main.scss',
		},
	    },
	},

    });

    // Load the plugin that provides the "uglify" task.

    // Default task(s).
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('default', ['sass:dist']);

};
