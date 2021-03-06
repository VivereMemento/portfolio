var gulp         = require('gulp'), // Подключаем Gulp
    sass         = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync  = require('browser-sync'), // Подключаем Browser Sync
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    spritesmith  = require('gulp.spritesmith');

gulp.task('sass', function() {
	return gulp.src('app/sass/*.scss') // Берем источник
	.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
  .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
	.pipe(gulp.dest('app/css/')) // Выгружаем результата в папку app/css
	.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('scripts', function(){
	return gulp.src([ // Берем все необходимые библиотеки
			'app/bower/jquery/dist/jquery.min.js',
			'app/bower/magnific-popup/dist/jquery.magnific-popup.min.js'
		])
	.pipe(concat('bower.min.js')) // Собираем их в кучу в новом файле bower.min.js
	.pipe(uglify()) // Сжимаем JS файл
	.pipe(gulp.dest('app/js')) // Выгружаем в папку app/js
});

gulp.task('bower-css', ['sass'], function() {
  return gulp.src('app/css/bower-css.css') // Выбираем файл для минификации
    .pipe(cssnano()) // Сжимаем
    .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
    .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'app/' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('clean', function() {
  return del.sync('dist/');
});

gulp.task('img', function() {
  return gulp.src('app/img/**/*')
  .pipe(cache(imagemin({
    interlaced: true,
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  })))
  .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync', 'bower-css', 'scripts'], function() {
	gulp.watch(['app/lib(sass)/**/*.scss', 'app/base/**/*.scss', 'app/blocks/**/*.scss'], ['sass']); // Наблюдение за sass файлами в папке sass
	gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {
  var buildCss = gulp.src(['app/css/main.css', 'app/css/libs.min.css'])
  .pipe(gulp.dest('dist/css'));

  var buildFonts = gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'));

  var buildJs = gulp.src('app/js/**/*')
  .pipe(gulp.dest('dist/js'));

  var buildHtml = gulp.src('app/*.html')
  .pipe(gulp.dest('dist/'));
});

gulp.task('clear', function(callback) {
  return cache.clearAll();
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('app/img/icon/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.scss',
    algorithm: 'top-down'
  }));
  return spriteData.pipe(gulp.dest('app/img/icon/sprites/'));
});