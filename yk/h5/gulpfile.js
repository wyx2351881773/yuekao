var gulp=require('gulp');
var webserver=require('gulp-webserver');
gulp.task('web',function(){
	return gulp.src('./src')
	.pipe(webserver({
		port:8989,
		open:true,
		livereload:true,
		proxies:[
			{source:"/api/xuan",target:"http://localhost:3000/api/xuan"},
			{source:"/api/creat",target:"http://localhost:3000/api/creat"},
			{source:"/api/found",target:"http://localhost:3000/api/found"}
		]
	}))
})
