var gulp=require('gulp');
var coffee=require('gulp-coffee');
var jade=require('gulp-jade');
var less=require('gulp-less');
var plumber=require('gulp-plumber');
var path=require('path');

gulp.task('default',[
	'coffee',
	'jade',
	'less',
	'other'
]);

gulp.task('coffee',function(){
	gulp.src(path.join(__dirname,'source/**/*.coffee'))
	.pipe(plumber())
	.pipe(coffee({bare:true}))
	.pipe(gulp.dest('build'))
});

gulp.task('jade',function(){
	gulp.src(path.join(__dirname,'source/**/*.jade'))
	.pipe(plumber())
	.pipe(jade())
	.pipe(gulp.dest('build'))
});

gulp.task('less',function(){
	gulp.src(path.join(__dirname,'source/**/*.less'))
	.pipe(plumber())
	.pipe(less())
	.pipe(gulp.dest('build'))
});

gulp.task('other',function(){
	gulp.src(path.join(__dirname,'source/**/*.*'))
	.pipe(plumber())
	.pipe(gulp.dest('build'))
});