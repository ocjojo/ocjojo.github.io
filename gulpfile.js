var config = {
	/**
	 * Only add dependencies from node_modules or lib folder
	 * everything else is read automatically
	 */
	jsDeps: [
		//javascript dependencies
	],
	cssDeps: [
		//css dependencies
		'node_modules/normalize.css/normalize.css'
	],
	htmlDeps: [
		//html dependencies
	]
};

//error
function errorlog(err) {
	console.log(err);
	this.emit('end');
}

function ignoreFunc(file, stats) {
  // `file` is the absolute path to the file, and `stats` is an `fs.Stats` 
  // object returned from `fs.lstat()`. 
  return stats.isDirectory() && path.basename(file) == "lib";
}

// Required
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	readdir = require('recursive-readdir'),
	path = require('path'),
	exec = require('child_process').exec,
	fs = require('fs');

// Scripts Task
gulp.task('scripts', function(){
	//ignore timInit.js, tim.js as they need to be in a specific order
	//ignoreFunc ignores lib files
	readdir('src/js', [ignoreFunc], function (err, files) {
		// files is an array of filename 
		files = config.jsDeps.concat(files);

	  	//concat and copy all other scripts according to config above
		gulp.src(files)
		.pipe(concat('script.js'))
		// .pipe(uglify())
		.on('error', errorlog)
		.pipe(gulp.dest('bin'));
	});
});

//html task: concatenate html
gulp.task('html', function(){

	gulp.src('src/html/index.html')
	.pipe(gulp.dest('bin'));

	readdir('src/html/blog', [ignoreFunc], function (err, files) {
		files = config.htmlDeps.concat(files);

		gulp.src(files)
		.pipe(concat('blog.html'))
		.on('error', errorlog)
		.pipe(gulp.dest('bin'));
	});
});

//css task: concatenate css
gulp.task('css', function(){
	readdir('src/css', [ignoreFunc], function (err, files) {
		files = config.cssDeps.concat(files);

		gulp.src(files)
		.pipe(concat('style.css'))
		.on('error', errorlog)
		.pipe(gulp.dest('bin'));
	});
});

// Watch Task
gulp.task('watch', function(){
	gulp.watch('src/js/**/*.js', ['scripts']);
	gulp.watch('src/css/**/*.css', ['css']);
	gulp.watch('src/html/**/*.html', ['html']);
});

// Default Task
gulp.task('default', ['scripts', 'css', 'html', 'watch']);
