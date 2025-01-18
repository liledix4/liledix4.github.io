import gulp from 'gulp';
const { dest, src, parallel, series, task } = gulp;
import { deleteAsync } from 'del';
import minify from 'gulp-minify';
import cleanCSS from 'gulp-clean-css';
import htmlmin from 'gulp-htmlmin';
import jsonminify from 'gulp-jsonminify';

const path = {
    json: './json/',
    src: {
        main: './src/',
        css: './src/css/',
        gears: './src/gears/',
        html: './src/html/',
        js: './src/js/'
    },
    static: './static/',
    build: {
        main: './docs/',
        gears: {
            main: './docs/gears/',
            css: './docs/gears/css/',
            js: './docs/gears/js/'
        },
        html: './docs/',
        json: './docs/json/'
    }
}

function del(fPath) {
    return  deleteAsync(fPath, {force: true});
}
function cleanBuild() {
    return  del(path.build.main);
}

function includeHTML() {
    return  src(path.src.html + '**/*.html', { encoding: false })
                .pipe(htmlmin({ collapseWhitespace: true }))
                .pipe(dest(path.build.html));
}
function addCSS() {
    return  src(path.src.css + '**/*.css', { encoding: false })
                .pipe(cleanCSS())
                .pipe(dest(path.build.gears.css));
}
function addJS() {
    return  src(path.src.js + '**/*.js', { encoding: false })
                .pipe(minify({
                    ext: {
                        min: '.js'
                    },
                    noSource: true
                }))
                .pipe(dest(path.build.gears.js));
}
function addJSON() {
    return  src(path.json + '**/*.json', { encoding: false })
                .pipe(jsonminify())
                .pipe(dest(path.build.json));
}
function addGears() {
    return  src(path.src.gears + '**/*', { encoding: false })
                .pipe(dest(path.build.gears.main));
}
function addStatic() {
    return  src(path.static + '**/*', { encoding: false, dot: true })
                .pipe(dest(path.build.main));
}

task('clean', parallel(cleanBuild));
task('default', series(
    cleanBuild,
    parallel(includeHTML, addCSS, addJS, addJSON, addGears, addStatic)
));